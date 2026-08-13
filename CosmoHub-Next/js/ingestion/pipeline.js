const fs = require('fs');
const path = require('path');
const { Source, Document, Entity, Claim, SourcePriority, MatchStatus } = require('../core/models.js');
const { InMemoryRepository } = require('../core/repository.js');
const { EntityResolver } = require('../core/resolver.js');

class SourceConnector {
    constructor(sourceId, publisher, title, url, priority) {
        this.source = new Source(sourceId, publisher, title, url, new Date().toISOString(), "API", priority);
    }
}

class DocumentFetcher {
    fetchLocalFixture(filepath, sourceConnector) {
        const raw = fs.readFileSync(filepath, 'utf8');
        return new Document(
            `doc_${Date.now()}`,
            sourceConnector.source.id,
            "Local Fixture Dump",
            "filepath://" + filepath,
            raw,
            new Date().toISOString(),
            "JSON"
        );
    }
}

class DocumentParser {
    parse(document) {
        return JSON.parse(document.contentReference);
    }
}

class EntityNormalizer {
    normalize(text) {
        if (!text) return "";
        return text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ").replace(/\s{2,}/g, " ").trim();
    }
}

class AdvancedEntityResolver extends EntityResolver {
    resolveAdvanced(mention) {
        if (!mention) return { matchStatus: MatchStatus.NO_MATCH, id: null, reasons: [] };

        if (this.idMap.has(mention)) {
            return { matchStatus: MatchStatus.MATCH, id: this.idMap.get(mention).id, reasons: ["Exact ID match"] };
        }

        const norm = this.normalize(mention);

        if (this.aliasMap.has(norm)) {
            return { matchStatus: MatchStatus.MATCH, id: this.aliasMap.get(norm), reasons: ["Exact normalized alias/name match"] };
        }

        for (const [alias, id] of this.aliasMap.entries()) {
            if (alias.includes(norm) || norm.includes(alias)) {
                return { matchStatus: MatchStatus.POSSIBLE_MATCH, id: id, reasons: ["Substring overlap"] };
            }
        }

        return { matchStatus: MatchStatus.NO_MATCH, id: null, reasons: ["No similarity found"] };
    }
}

class ClaimBuilder {
    build(subjectId, predicate, objectId, doc, evidence) {
        return new Claim(
            `c_${Date.now()}_${Math.floor(Math.random()*1000)}`,
            subjectId, predicate, objectId, doc.id, "SOURCE_BACKED", evidence,
            "JSON Parser", doc.publicationDate, new Date().toISOString(), new Date().toISOString(),
            null, null, "ACTIVE"
        );
    }
}

class InstitutionIngestionPipeline {
    constructor() {
        this.repo = new InMemoryRepository();
        this.resolver = new AdvancedEntityResolver();
        this.normalizer = new EntityNormalizer();
        this.claimBuilder = new ClaimBuilder();
    }

    runFixturePipeline(fixturePath) {
        const connector = new SourceConnector("src_esa_api", "European Space Agency", "ESA Public API", "esa.int/api", SourcePriority.PRIMARY_OFFICIAL);
        this.repo.saveSource(connector.source);

        const fetcher = new DocumentFetcher();
        const doc = fetcher.fetchLocalFixture(fixturePath, connector);
        this.repo.saveDocument(doc);

        const parser = new DocumentParser();
        const parsedData = parser.parse(doc);

        parsedData.response.forEach(item => {
            const resolution = this.resolver.resolveAdvanced(item.org_name);
            let entityId = null;

            if (resolution.matchStatus === MatchStatus.NO_MATCH) {
                entityId = `org_${this.normalizer.normalize(item.org_name).replace(/\s/g, '_')}`;
                const entity = new Entity(
                    entityId,
                    item.org_name,
                    "Organization",
                    item.aliases || [],
                    {
                        institution_type: item.type,
                        continent: item.location?.continent,
                        country: item.location?.country,
                        city: item.location?.city,
                        latitude: item.location?.lat,
                        longitude: item.location?.lng,
                        founded: item.founded,
                        mission: item.mission
                    }
                );
                this.repo.saveEntity(entity);
                this.resolver.registerEntity(entity);
            } else if (resolution.matchStatus === MatchStatus.MATCH) {
                entityId = resolution.id;
            } else {
                console.log(`[WARNING] Possible duplicate detected for ${item.org_name}. Skipping automatic merge.`);
                return;
            }

            if (item.recent_activities) {
                item.recent_activities.forEach(act => {
                    if (act.type === "funding") {
                        let recRes = this.resolver.resolveAdvanced(act.recipient);
                        let recId = recRes.id;
                        if (recRes.matchStatus === MatchStatus.NO_MATCH) {
                             recId = `org_${this.normalizer.normalize(act.recipient).replace(/\s/g, '_')}`;
                             const newOrg = new Entity(recId, act.recipient, "Organization");
                             this.repo.saveEntity(newOrg);
                             this.resolver.registerEntity(newOrg);
                        }

                        const claim = this.claimBuilder.build(
                            entityId, "FUNDS", recId, doc,
                            `ESA funding: ${act.amount} to ${act.recipient} for ${act.project}`
                        );
                        this.repo.saveClaim(claim);
                    }
                });
            }
        });

        this._addSyntheticProductLayers();
        this._exportEcosystem();
    }

    _addSyntheticProductLayers() {
        const e1 = new Entity("path_satcom", "Satellite Communications", "LearningPath", [], { xp: 1000 });
        this.repo.saveEntity(e1);
        const e2 = new Entity("news_1", "ESA funds Isar", "News", [], { summary: "[SAMPLE] News snippet", date: "2024-05-20" });
        this.repo.saveEntity(e2);

        this.repo.saveClaim(new Claim("c_synth_1", "path_satcom", "COVERS", "org_european_space_agency", null, "SYNTHETIC", null, "Manual", null, null, null, null, null, "ACTIVE"));
        this.repo.saveClaim(new Claim("c_synth_2", "news_1", "MENTIONS", "org_isar_aerospace", null, "SYNTHETIC", null, "Manual", null, null, null, null, null, "ACTIVE"));
    }

    _exportEcosystem() {
        const payload = {
            entities: this.repo.getAllEntities(),
            claims: this.repo.getAllClaims(),
            sources: Array.from(this.repo.sources.values()),
            documents: Array.from(this.repo.documents.values())
        };
        const script = `const rawData = ${JSON.stringify(payload, null, 2)};\nif(typeof window !== 'undefined') window.rawData = rawData;\nif(typeof module !== 'undefined') module.exports = rawData;`;
        fs.writeFileSync(path.join(__dirname, '../../data/ecosystem.js'), script);
        console.log("Successfully ran ingestion pipeline and generated ecosystem.js");
    }
}

if (typeof module !== 'undefined') {
    module.exports = { InstitutionIngestionPipeline, EntityNormalizer, AdvancedEntityResolver };
}

// Execute Pipeline only if run directly
if (require.main === module) {
    const pipeline = new InstitutionIngestionPipeline();
    pipeline.runFixturePipeline(path.join(__dirname, '../../fixtures/esa_source.json'));
}
