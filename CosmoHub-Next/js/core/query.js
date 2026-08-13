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
        // Fallback simple search if resolver isn't used
        const lower = nameStr.toLowerCase();
        for (const [id, e] of this.entities) {
            if (e.canonicalName.toLowerCase() === lower) return e;
            if (e.aliases && e.aliases.map(a => a.toLowerCase()).includes(lower)) return e;
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
                related.push({ predicate: c.predicate, entity: this.getEntity(c.objectId), claim: c });
            } else if (c.objectId === entityId) {
                related.push({ predicate: `<- ${c.predicate}`, entity: this.getEntity(c.subjectId), claim: c });
            }
        }
        return related;
    }

    getProvenanceForClaim(claimId) {
        const claim = this.claims.get(claimId);
        if (!claim) return null;

        const doc = this.documents.get(claim.sourceDocumentId);
        const src = doc ? this.sources.get(doc.sourceId) : null;

        return {
            claim: claim,
            document: doc,
            source: src
        };
    }

    getEntitiesByType(typeStr) {
        const results = [];
        for (const [id, e] of this.entities) {
            if (e.entityType === typeStr) results.push(e);
        }
        return results;
    }
}

if (typeof module !== 'undefined') {
    module.exports = { QueryEngine };
}
