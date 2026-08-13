// Exporting the raw structured data for the v0.2 Query Engine to consume
const rawData = {
    sources: [
        {
            id: "src_esa",
            publisher: "European Space Agency",
            title: "ESA Official Portal",
            url: "https://www.esa.int",
            publicationDate: "2024-01-01",
            sourceType: "Primary Institutional"
        },
        {
            id: "src_isar",
            publisher: "Isar Aerospace",
            title: "Isar Aerospace Corporate Site",
            url: "https://www.isaraerospace.com",
            publicationDate: "2024-01-01",
            sourceType: "Company Publication"
        }
    ],
    documents: [
        {
            id: "doc_esa_1",
            sourceId: "src_esa",
            title: "ESA Directory",
            url: "https://www.esa.int/About_Us",
            contentReference: "HQ Location",
            publicationDate: "2024-01-01"
        }
    ],
    entities: [
        {
            id: "org_esa",
            canonicalName: "European Space Agency",
            entityType: "Organization",
            aliases: ["ESA", "European Space Agency (ESA)"],
            metadata: { mission: "Shape the development of Europe's space capability" },
            provenanceReferences: []
        },
        {
            id: "org_isar",
            canonicalName: "Isar Aerospace",
            entityType: "Organization",
            aliases: ["Isar", "Isar Aerospace Technologies GmbH"],
            metadata: { hq: "Germany" },
            provenanceReferences: []
        },
        {
            id: "lv_spectrum",
            canonicalName: "Spectrum",
            entityType: "LaunchVehicle",
            aliases: [],
            metadata: { status: "In Development" },
            provenanceReferences: []
        },
        {
            id: "tech_prop",
            canonicalName: "LOX/Propane Propulsion",
            entityType: "Technology",
            aliases: [],
            metadata: { domain: "Propulsion" },
            provenanceReferences: []
        },
        {
            id: "news_1",
            canonicalName: "ESA awards new contract",
            entityType: "NewsItem",
            aliases: [],
            metadata: { summary: "Simulated news article", date: "2024-05-20" },
            provenanceReferences: []
        },
        {
            id: "path_satcom",
            canonicalName: "Satellite Communications",
            entityType: "LearningPath",
            aliases: ["SATCOM"],
            metadata: { description: "Master RF links and ground stations.", xp: 1000 },
            provenanceReferences: []
        },
        {
            id: "opp_1",
            canonicalName: "ESA Research Fellowship",
            entityType: "Opportunity",
            aliases: [],
            metadata: { type_opp: "Fellowship", status: "Open" },
            provenanceReferences: []
        }
    ],
    claims: [
        {
            id: "c_esa_name",
            subjectId: "org_esa",
            predicate: "HAS_NAME",
            objectId: "European Space Agency",
            sourceDocumentId: "doc_esa_1",
            confidence: "SOURCE_BACKED",
            evidence: "Direct text extraction",
            publicationDate: "2024-01-01",
            extractedDate: new Date().toISOString(),
            provenanceStatus: "ACTIVE",
            validFrom: "1975-01-01",
            validUntil: null
        },
        {
            id: "c_isar_mfg",
            subjectId: "org_isar",
            predicate: "MANUFACTURES",
            objectId: "lv_spectrum",
            sourceDocumentId: null,
            confidence: "SYNTHETIC",
            evidence: null,
            publicationDate: null,
            extractedDate: new Date().toISOString(),
            provenanceStatus: "ACTIVE",
            validFrom: null,
            validUntil: null
        },
        {
            id: "c_news_esa",
            subjectId: "news_1",
            predicate: "MENTIONS",
            objectId: "org_esa",
            sourceDocumentId: null,
            confidence: "SYNTHETIC",
            evidence: null,
            publicationDate: null,
            extractedDate: new Date().toISOString(),
            provenanceStatus: "ACTIVE",
            validFrom: null,
            validUntil: null
        },
        {
            id: "c_esa_opp",
            subjectId: "org_esa",
            predicate: "OFFERS",
            objectId: "opp_1",
            sourceDocumentId: null,
            confidence: "SYNTHETIC",
            evidence: null,
            publicationDate: null,
            extractedDate: new Date().toISOString(),
            provenanceStatus: "ACTIVE",
            validFrom: null,
            validUntil: null
        }
    ]
};

// Assign for browser inclusion
if (typeof window !== 'undefined') {
    window.rawData = rawData;
}
// Assign for node testing inclusion
if (typeof module !== 'undefined') {
    module.exports = rawData;
}
