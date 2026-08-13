// CosmoHub Intelligence Core - v0.3 Models (Global Institutions)

class Source {
    constructor(id, publisher, title, url, publicationDate, sourceType, trustLevel) {
        this.id = id;
        this.publisher = publisher;
        this.title = title;
        this.url = url;
        this.publicationDate = publicationDate;
        this.sourceType = sourceType;
        this.trustLevel = trustLevel;
    }
}

class Document {
    constructor(id, sourceId, title, url, contentReference, publicationDate, documentType) {
        this.id = id;
        this.sourceId = sourceId;
        this.title = title;
        this.url = url;
        this.contentReference = contentReference;
        this.publicationDate = publicationDate;
        this.documentType = documentType;
    }
}

class Entity {
    constructor(id, canonicalName, entityType, aliases = [], metadata = {}, provenanceReferences = []) {
        this.id = id;
        this.canonicalName = canonicalName;
        this.entityType = entityType; // Organization, University, Mission, Technology, Event, News, etc.
        this.aliases = aliases;
        this.metadata = metadata; // Handles dynamic schemas: latitude, longitude, founded, status, description, logo, etc.
        this.provenanceReferences = provenanceReferences;
    }
}

class Claim {
    constructor(id, subjectId, predicate, objectId, sourceDocumentId, confidence, evidence, extractionMethod, publicationDate, extractedDate, observedAt, validFrom, validUntil, provenanceStatus) {
        this.id = id;
        this.subjectId = subjectId;
        this.predicate = predicate; // HAS_SUBSIDIARY, ACHIEVED, DEVELOPS, FUNDS
        this.objectId = objectId;
        this.sourceDocumentId = sourceDocumentId;
        this.confidence = confidence;
        this.evidence = evidence;
        this.extractionMethod = extractionMethod;
        this.publicationDate = publicationDate;
        this.extractedDate = extractedDate;
        this.observedAt = observedAt || new Date().toISOString();
        this.validFrom = validFrom || null;
        this.validUntil = validUntil || null;
        this.provenanceStatus = provenanceStatus;
    }
}

if (typeof module !== 'undefined') {
    module.exports = { Source, Document, Entity, Claim };
}
