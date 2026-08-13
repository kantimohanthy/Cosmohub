// CosmoHub Intelligence Core - v0.2 Models

class Source {
    constructor(id, publisher, title, url, publicationDate, sourceType) {
        this.id = id;
        this.publisher = publisher;
        this.title = title;
        this.url = url;
        this.publicationDate = publicationDate;
        this.sourceType = sourceType;
    }
}

class Document {
    constructor(id, sourceId, title, url, contentReference, publicationDate) {
        this.id = id;
        this.sourceId = sourceId;
        this.title = title;
        this.url = url;
        this.contentReference = contentReference; // snippet or ref
        this.publicationDate = publicationDate;
    }
}

class Entity {
    constructor(id, canonicalName, entityType, aliases = [], metadata = {}, provenanceReferences = []) {
        this.id = id;
        this.canonicalName = canonicalName;
        this.entityType = entityType;
        this.aliases = aliases;
        this.metadata = metadata;
        this.provenanceReferences = provenanceReferences; // claim IDs
    }
}

class Claim {
    constructor(id, subjectId, predicate, objectId, sourceDocumentId, confidence, evidence, publicationDate, extractedDate, provenanceStatus, validFrom = null, validUntil = null, observedAt = null) {
        this.id = id;
        this.subjectId = subjectId;
        this.predicate = predicate;
        this.objectId = objectId;
        this.sourceDocumentId = sourceDocumentId;
        this.confidence = confidence;
        this.evidence = evidence;
        this.publicationDate = publicationDate;
        this.extractedDate = extractedDate;
        this.provenanceStatus = provenanceStatus; // e.g. "SOURCE_BACKED", "SYNTHETIC"
        this.validFrom = validFrom;
        this.validUntil = validUntil;
        this.observedAt = observedAt || new Date().toISOString();
    }
}

if (typeof module !== 'undefined') {
    module.exports = { Source, Document, Entity, Claim };
}
