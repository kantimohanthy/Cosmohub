const productData = {
  "entities": [
    {
      "id": "path_satcom",
      "canonicalName": "Satellite Communications",
      "entityType": "LearningPath",
      "aliases": [
        "SATCOM"
      ],
      "metadata": {
        "description": "Master RF links and ground stations.",
        "xp": 1000
      },
      "provenanceReferences": []
    },
    {
      "id": "les_link",
      "canonicalName": "Link Budgets",
      "entityType": "Lesson",
      "aliases": [],
      "metadata": {
        "xp": 50
      },
      "provenanceReferences": []
    },
    {
      "id": "proj_yagi",
      "canonicalName": "Build a Yagi-Uda Antenna",
      "entityType": "Project",
      "aliases": [],
      "metadata": {
        "xp": 500
      },
      "provenanceReferences": []
    },
    {
      "id": "opp_rf_eng",
      "canonicalName": "RF Systems Engineer",
      "entityType": "Opportunity",
      "aliases": [],
      "metadata": {
        "type_opp": "Job",
        "status": "Open"
      },
      "provenanceReferences": []
    },
    {
      "id": "opp_esa_fellow",
      "canonicalName": "ESA Research Fellowship",
      "entityType": "Opportunity",
      "aliases": [],
      "metadata": {
        "type_opp": "Fellowship",
        "status": "Open"
      },
      "provenanceReferences": []
    },
    {
      "id": "news_1",
      "canonicalName": "ESA awards new contract",
      "entityType": "News",
      "aliases": [],
      "metadata": {
        "summary": "Simulated news article",
        "date": "2024-05-20"
      },
      "provenanceReferences": []
    },
    {
      "id": "opp_nasa_intern",
      "canonicalName": "NASA Pathways Internship",
      "entityType": "Opportunity",
      "aliases": [],
      "metadata": {
        "type_opp": "Internship",
        "status": "Open"
      },
      "provenanceReferences": []
    }
  ],
  "claims": [
    {
      "id": "c_synth_1",
      "subjectId": "path_satcom",
      "predicate": "COVERS",
      "objectId": "tech_prop",
      "sourceDocumentId": null,
      "confidence": "SYNTHETIC",
      "evidence": null,
      "extractionMethod": "Manual",
      "publicationDate": null,
      "extractedDate": "2026-08-14T01:24:32.202Z",
      "observedAt": "2026-08-14T01:24:32.202Z",
      "validFrom": null,
      "validUntil": null,
      "provenanceStatus": "ACTIVE"
    },
    {
      "id": "c_synth_2",
      "subjectId": "news_1",
      "predicate": "MENTIONS",
      "objectId": "org_esa",
      "sourceDocumentId": null,
      "confidence": "SYNTHETIC",
      "evidence": null,
      "extractionMethod": "Manual",
      "publicationDate": null,
      "extractedDate": "2026-08-14T01:24:32.202Z",
      "observedAt": "2026-08-14T01:24:32.202Z",
      "validFrom": null,
      "validUntil": null,
      "provenanceStatus": "ACTIVE"
    },
    {
      "id": "c_esa_opp",
      "subjectId": "org_esa",
      "predicate": "OFFERS",
      "objectId": "opp_esa_fellow",
      "sourceDocumentId": null,
      "confidence": "SYNTHETIC",
      "evidence": null,
      "extractionMethod": "Manual",
      "publicationDate": null,
      "extractedDate": "2026-08-14T01:24:32.202Z",
      "observedAt": "2026-08-14T01:24:32.202Z",
      "validFrom": null,
      "validUntil": null,
      "provenanceStatus": "ACTIVE"
    },
    {
      "id": "c_nasa_opp",
      "subjectId": "org_nasa",
      "predicate": "OFFERS",
      "objectId": "opp_nasa_intern",
      "sourceDocumentId": null,
      "confidence": "SYNTHETIC",
      "evidence": null,
      "extractionMethod": "Manual",
      "publicationDate": null,
      "extractedDate": "2026-08-14T01:24:32.202Z",
      "observedAt": "2026-08-14T01:24:32.202Z",
      "validFrom": null,
      "validUntil": null,
      "provenanceStatus": "ACTIVE"
    }
  ]
};

if (typeof window !== 'undefined') {
    window.productData = productData;
}
if (typeof module !== 'undefined') {
    module.exports = productData;
}