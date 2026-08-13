const fs = require('fs');
const path = require('path');
const { Source, Document, Entity, Claim, SourcePriority, MatchStatus, Conflict } = require('../core/models.js');
const { InMemoryRepository } = require('../core/repository.js');
const { EntityResolver } = require('../core/resolver.js');
const { FixtureConnector, HttpConnector } = require('./connectors.js');

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

class Validator {
    validateClaim(claim, repo) {
        if (!claim.subjectId || !repo.getEntity(claim.subjectId)) return false;
        if (claim.objectId && !repo.getEntity(claim.objectId)) return false;
        if (!claim.predicate) return false;
        if (claim.confidence === "SOURCE_BACKED" && (!claim.sourceDocumentId || !claim.evidence)) return false;
        if (claim.validFrom && claim.validUntil && new Date(claim.validFrom) > new Date(claim.validUntil)) return false;
        return true;
    }
}

class InstitutionIngestionPipeline {
    constructor() {
        this.repo = new InMemoryRepository();
        this.resolver = new AdvancedEntityResolver();
        this.normalizer = new EntityNormalizer();
        this.claimBuilder = new ClaimBuilder();
        this.validator = new Validator();
    }

    async runPipeline(connector) {
        this.repo.saveSource(connector.source);

        // Fetch & Duplicate Doc Detection
        const fetchResult = await connector.fetch();
        if (fetchResult.status === "FAILED") {
            console.error("Ingestion failed:", fetchResult);
            return;
        }

        const doc = fetchResult.document;
        // Check hash
        const existingDocs = Array.from(this.repo.documents.values());
        if (existingDocs.some(d => d.hash === fetchResult.hash)) {
            console.log("DUPLICATE_DOCUMENT detected. Skipping.");
            return;
        }
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

                        if (this.validator.validateClaim(claim, this.repo)) {
                            this.repo.saveClaim(claim);
                        } else {
                            console.log("Validation failed for claim:", claim.id);
                        }
                    }
                });
            }
        });

        this._exportEcosystem();
    }

    _exportEcosystem() {
        // Output CORE payload exclusively without Synthetic Product pollution natively appended
        const payload = {
            entities: this.repo.getAllEntities(),
            claims: this.repo.getAllClaims(),
            sources: Array.from(this.repo.sources.values()),
            documents: Array.from(this.repo.documents.values())
        };
        const script = `const rawData = ${JSON.stringify(payload, null, 2)};\nif(typeof window !== 'undefined') window.rawData = rawData;\nif(typeof module !== 'undefined') module.exports = rawData;`;
        fs.writeFileSync(path.join(__dirname, '../../data/core.js'), script);
        console.log("Successfully ran ingestion pipeline and generated core.js");
    }
}

if (typeof module !== 'undefined') {
    module.exports = { InstitutionIngestionPipeline, EntityNormalizer, AdvancedEntityResolver, Validator };
}

// Execute Pipeline only if run directly
if (require.main === module) {
    (async () => {
        const { Source } = require('../core/models.js');
        const sourceModel = new Source("src_esa_api", "European Space Agency", "ESA Public API", "esa.int/api", new Date().toISOString(), "SOURCE_FIXTURE", 1);
        const connector = new FixtureConnector(sourceModel, path.join(__dirname, '../../fixtures/esa_source.json'));

        const pipeline = new InstitutionIngestionPipeline();
        await pipeline.runPipeline(connector);
    })();
}
