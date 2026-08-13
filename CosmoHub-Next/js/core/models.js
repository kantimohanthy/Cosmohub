// CosmoHub Intelligence Core - v0.2.1 Models

class Source {
    constructor(id, publisher, title, url, publicationDate, sourceType, trustLevel) {
        this.id = id;
        this.publisher = publisher;
        this.title = title;
        this.url = url;
        this.publicationDate = publicationDate;
        this.sourceType = sourceType;
        this.trustLevel = trustLevel; // e.g. "Primary Institutional", "High Trust Secondary"
    }
}

class Document {
    constructor(id, sourceId, title, url, contentReference, publicationDate, documentType) {
        this.id = id;
        this.sourceId = sourceId;
        this.title = title;
        this.url = url;
        this.contentReference = contentReference; // snippet or ref location
        this.publicationDate = publicationDate;
        this.documentType = documentType; // e.g. "Press Release", "Patent", "Report"
    }
}

class Entity {
    constructor(id, canonicalName, entityType, aliases = [], metadata = {}, provenanceReferences = []) {
        this.id = id;
        this.canonicalName = canonicalName;
        // Valid types: Organization, University, ResearchInstitute, Person, Mission, Technology, ResearchProject, Publication, Funding, Opportunity, Event, News, LearningPath, Lesson, Quiz, Project
        this.entityType = entityType;
        this.aliases = aliases;
        this.metadata = metadata;
        this.provenanceReferences = provenanceReferences; // claim IDs
    }
}

class Claim {
    constructor(id, subjectId, predicate, objectId, sourceDocumentId, confidence, evidence, extractionMethod, publicationDate, extractedDate, observedAt, validFrom, validUntil, provenanceStatus) {
        this.id = id;
        this.subjectId = subjectId;
        this.predicate = predicate;
        this.objectId = objectId;
        this.sourceDocumentId = sourceDocumentId;
        this.confidence = confidence;
        this.evidence = evidence;
        this.extractionMethod = extractionMethod; // e.g. "Manual", "Regex Pipeline"
        this.publicationDate = publicationDate; // Real-world pub date
        this.extractedDate = extractedDate; // When the pipeline processed it
        this.observedAt = observedAt || new Date().toISOString(); // When CosmoHub observed/indexed it
        this.validFrom = validFrom || null; // Real-world truth start
        this.validUntil = validUntil || null; // Real-world truth end
        this.provenanceStatus = provenanceStatus; // e.g. "ACTIVE", "SUPERSEDED", "CONFLICTED"
    }
}

if (typeof module !== 'undefined') {
    module.exports = { Source, Document, Entity, Claim };
}
