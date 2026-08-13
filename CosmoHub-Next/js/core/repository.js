// Storage Abstraction for future migration to Postgres/Neo4j

class InMemoryRepository {
    constructor(entities = [], claims = [], sources = [], documents = []) {
        this.entities = new Map(entities.map(e => [e.id, e]));
        this.claims = new Map(claims.map(c => [c.id, c]));
        this.sources = new Map(sources.map(s => [s.id, s]));
        this.documents = new Map(documents.map(d => [d.id, d]));
        this.conflicts = new Map();
    }

    saveEntity(entity) { this.entities.set(entity.id, entity); }
    getEntity(id) { return this.entities.get(id) || null; }
    getAllEntities() { return Array.from(this.entities.values()); }

    saveClaim(claim) { this.claims.set(claim.id, claim); }
    getClaim(id) { return this.claims.get(id) || null; }
    getAllClaims() { return Array.from(this.claims.values()); }

    saveSource(source) { this.sources.set(source.id, source); }
    getSource(id) { return this.sources.get(id) || null; }

    saveDocument(doc) { this.documents.set(doc.id, doc); }
    getDocument(id) { return this.documents.get(id) || null; }

    saveConflict(conflict) { this.conflicts.set(conflict.id, conflict); }
}

if (typeof module !== 'undefined') {
    module.exports = { InMemoryRepository };
}
