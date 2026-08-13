const rawData = {
    sources: [
        {
            id: "src_esa",
            publisher: "European Space Agency",
            title: "ESA Official Portal",
            url: "https://www.esa.int",
            publicationDate: "2024-01-01",
            sourceType: "Primary Institutional",
            trustLevel: 1
        },
        {
            id: "src_isar",
            publisher: "Isar Aerospace",
            title: "Isar Aerospace Corporate Site",
            url: "https://www.isaraerospace.com",
            publicationDate: "2024-01-01",
            sourceType: "Company Publication",
            trustLevel: 2
        }
    ],
    documents: [
        {
            id: "doc_esa_1",
            sourceId: "src_esa",
            title: "ESA Directory",
            url: "https://www.esa.int/About_Us",
            contentReference: "HQ Location",
            publicationDate: "2024-01-01",
            documentType: "Report"
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
            entityType: "Mission", // Mapping LaunchVehicle abstraction conceptually to Mission for the prototype UX
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
            id: "person_1",
            canonicalName: "Dr. Elena Rostova",
            entityType: "Person",
            aliases: [],
            metadata: { role: "Head of GNC" },
            provenanceReferences: []
        },
        {
            id: "pub_1",
            canonicalName: "Advances in Autonomous Rendezvous",
            entityType: "Publication",
            aliases: [],
            metadata: { date: "2024-03-12" },
            provenanceReferences: []
        },
        {
            id: "news_1",
            canonicalName: "ESA awards new contract",
            entityType: "News",
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
            id: "les_link",
            canonicalName: "Link Budgets",
            entityType: "Lesson",
            aliases: [],
            metadata: { xp: 50 },
            provenanceReferences: []
        },
        {
            id: "proj_yagi",
            canonicalName: "Build a Yagi-Uda Antenna",
            entityType: "Project",
            aliases: [],
            metadata: { xp: 500 },
            provenanceReferences: []
        },
        {
            id: "opp_rf_eng",
            canonicalName: "RF Systems Engineer",
            entityType: "Opportunity",
            aliases: [],
            metadata: { type_opp: "Job", status: "Open" },
            provenanceReferences: []
        },
        {
            id: "opp_esa_fellow",
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
            extractionMethod: "Manual",
            publicationDate: "2024-01-01",
            extractedDate: new Date().toISOString(),
            observedAt: new Date().toISOString(),
            validFrom: "1975-01-01",
            validUntil: null,
            provenanceStatus: "ACTIVE"
        },
        {
            id: "c_isar_mfg",
            subjectId: "org_isar",
            predicate: "DEVELOPS",
            objectId: "lv_spectrum",
            sourceDocumentId: null,
            confidence: "SYNTHETIC",
            evidence: null,
            extractionMethod: "Simulated",
            publicationDate: null,
            extractedDate: new Date().toISOString(),
            observedAt: new Date().toISOString(),
            validFrom: null,
            validUntil: null,
            provenanceStatus: "ACTIVE"
        },
        {
            id: "c_news_esa",
            subjectId: "news_1",
            predicate: "MENTIONS",
            objectId: "org_esa",
            sourceDocumentId: null,
            confidence: "SYNTHETIC",
            evidence: null,
            extractionMethod: "Simulated",
            publicationDate: null,
            extractedDate: new Date().toISOString(),
            observedAt: new Date().toISOString(),
            validFrom: null,
            validUntil: null,
            provenanceStatus: "ACTIVE"
        },
        {
            id: "c_esa_opp",
            subjectId: "org_esa",
            predicate: "OFFERS",
            objectId: "opp_esa_fellow",
            sourceDocumentId: null,
            confidence: "SYNTHETIC",
            evidence: null,
            extractionMethod: "Simulated",
            publicationDate: null,
            extractedDate: new Date().toISOString(),
            observedAt: new Date().toISOString(),
            validFrom: null,
            validUntil: null,
            provenanceStatus: "ACTIVE"
        },
        // Learning Path Integration (Product -> Core)
        {
            id: "c_path_tech",
            subjectId: "path_satcom",
            predicate: "COVERS",
            objectId: "tech_prop", // Demonstrating connection to core ontology
            sourceDocumentId: null,
            confidence: "SYNTHETIC",
            evidence: null,
            extractionMethod: "Simulated",
            publicationDate: null,
            extractedDate: new Date().toISOString(),
            observedAt: new Date().toISOString(),
            validFrom: null,
            validUntil: null,
            provenanceStatus: "ACTIVE"
        },
        {
            id: "c_path_les",
            subjectId: "path_satcom",
            predicate: "INCLUDES",
            objectId: "les_link",
            sourceDocumentId: null,
            confidence: "SYNTHETIC",
            evidence: null,
            extractionMethod: "Simulated",
            publicationDate: null,
            extractedDate: new Date().toISOString(),
            observedAt: new Date().toISOString(),
            validFrom: null,
            validUntil: null,
            provenanceStatus: "ACTIVE"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.rawData = rawData;
}
if (typeof module !== 'undefined') {
    module.exports = rawData;
}
