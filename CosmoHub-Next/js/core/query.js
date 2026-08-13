class QueryEngine {
    constructor(entities, claims, sources, documents) {
        this.entities = new Map(entities.map(e => [e.id, e]));
        this.claims = new Map(claims.map(c => [c.id, c]));
        this.sources = new Map(sources.map(s => [s.id, s]));
        this.documents = new Map(documents.map(d => [d.id, d]));
    }

    getEntity(id) {
        return this.entities.get(id) || null;
    }

    findEntityByName(nameStr) {
        if(!nameStr) return null;
        const lower = nameStr.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ").replace(/\s{2,}/g, " ");
        for (const [id, e] of this.entities) {
            if(!e.canonicalName) continue;
            const canonicalNorm = e.canonicalName.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ").replace(/\s{2,}/g, " ");
            if (canonicalNorm === lower) return e;
            if (e.aliases) {
                 const aliasesNorm = e.aliases.map(a => a.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ").replace(/\s{2,}/g, " "));
                 if (aliasesNorm.includes(lower)) return e;
            }
        }
        return null;
    }

    getClaimsForEntity(entityId) {
        const results = [];
        for (const [id, claim] of this.claims) {
            if (claim.subjectId === entityId || claim.objectId === entityId) {
                results.push(claim);
            }
        }
        return results;
    }

    getRelatedEntities(entityId) {
        const claims = this.getClaimsForEntity(entityId);
        const related = [];
        for (const c of claims) {
            if (c.subjectId === entityId && c.objectId) {
                related.push({ predicate: c.predicate, entity: this.getEntity(c.objectId), claim: c, direction: 'out' });
            } else if (c.objectId === entityId) {
                related.push({ predicate: c.predicate, entity: this.getEntity(c.subjectId), claim: c, direction: 'in' });
            }
        }
        return related;
    }

    getEvidenceForClaim(claimId) {
        const claim = this.claims.get(claimId);
        return claim ? claim.evidence : null;
    }

    getProvenanceForClaim(claimId) {
        const claim = this.claims.get(claimId);
        if (!claim) return null;

        const doc = this.documents.get(claim.sourceDocumentId);
        const src = doc ? this.sources.get(doc.sourceId) : null;
        const ev = claim.evidence;

        return {
            claim: claim,
            document: doc,
            source: src,
            evidence: ev
        };
    }

    getEntitiesByType(typeStr) {
        const results = [];
        for (const [id, e] of this.entities) {
            if (e.entityType === typeStr) results.push(e);
        }
        return results;
    }

    // Advanced filtering for Discovery interface
    searchEntities(query, typeFilter, regionFilter, subtypeFilter) {
        const results = [];
        const qNorm = query ? query.toLowerCase().trim() : "";
        for (const [id, e] of this.entities) {
            let match = true;
            if (typeFilter && typeFilter !== 'All') {
                if (e.entityType !== typeFilter) match = false;
            }
            if (subtypeFilter && subtypeFilter !== 'All') {
                if (e.metadata.institution_type !== subtypeFilter && e.metadata.type_opp !== subtypeFilter) match = false;
            }
            if (regionFilter && regionFilter !== 'Global') {
                if (e.metadata.continent !== regionFilter && e.metadata.region !== regionFilter && e.metadata.country !== regionFilter) match = false;
            }
            if (qNorm) {
                const nameNorm = e.canonicalName ? e.canonicalName.toLowerCase() : "";
                if (!nameNorm.includes(qNorm)) match = false;
            }
            if (match) results.push(e);
        }
        return results;
    }
}

if (typeof module !== 'undefined') {
    module.exports = { QueryEngine };
}
