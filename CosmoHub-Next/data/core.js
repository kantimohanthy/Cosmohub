const rawData = {
  "entities": [
    {
      "id": "org_european_space_agency",
      "canonicalName": "European Space Agency",
      "entityType": "Organization",
      "aliases": [
        "ESA"
      ],
      "metadata": {
        "institution_type": "SPACE_AGENCY",
        "continent": "Europe",
        "country": "France",
        "city": "Paris",
        "latitude": 48.8566,
        "longitude": 2.3522,
        "founded": "1975",
        "mission": "Shape the development of Europe's space capability"
      },
      "provenanceReferences": [],
      "createdAt": "2026-08-13T22:48:04.936Z",
      "updatedAt": "2026-08-13T22:48:04.936Z"
    },
    {
      "id": "org_isar_aerospace",
      "canonicalName": "Isar Aerospace",
      "entityType": "Organization",
      "aliases": [],
      "metadata": {},
      "provenanceReferences": [],
      "createdAt": "2026-08-13T22:48:04.936Z",
      "updatedAt": "2026-08-13T22:48:04.936Z"
    },
    {
      "id": "org_rocket_factory_augsburg",
      "canonicalName": "Rocket Factory Augsburg",
      "entityType": "Organization",
      "aliases": [],
      "metadata": {},
      "provenanceReferences": [],
      "createdAt": "2026-08-13T22:48:04.936Z",
      "updatedAt": "2026-08-13T22:48:04.936Z"
    },
    {
      "id": "tech_satcom",
      "canonicalName": "Satellite Communications",
      "entityType": "Technology",
      "aliases": [
        "SATCOM"
      ],
      "metadata": {
        "description": "Telecommunications using artificial satellites.",
        "maturity": "High",
        "domain": "Communications"
      },
      "provenanceReferences": [],
      "createdAt": "2026-08-14T01:22:56.531Z",
      "updatedAt": "2026-08-14T01:22:56.535Z"
    },
    {
      "id": "miss_artemis",
      "canonicalName": "Artemis",
      "entityType": "Mission",
      "aliases": [],
      "metadata": {
        "status": "Active",
        "type": "Lunar Exploration",
        "launch_date": "2022-11-16",
        "country": "USA"
      },
      "provenanceReferences": [],
      "createdAt": "2026-08-14T01:22:56.535Z",
      "updatedAt": "2026-08-14T01:22:56.535Z"
    },
    {
      "id": "org_nasa",
      "canonicalName": "NASA",
      "entityType": "Organization",
      "aliases": [
        "National Aeronautics and Space Administration"
      ],
      "metadata": {
        "institution_type": "SPACE_AGENCY",
        "continent": "North America",
        "country": "USA",
        "city": "Washington, D.C.",
        "latitude": 38.883,
        "longitude": -77.016,
        "founded": "1958",
        "mission": "Explore the unknown in air and space"
      },
      "provenanceReferences": [],
      "createdAt": "2026-08-14T01:22:56.535Z",
      "updatedAt": "2026-08-14T01:22:56.535Z"
    },
    {
      "id": "res_lunar_comm",
      "canonicalName": "Lunar Orbital Communications Network",
      "entityType": "Research",
      "aliases": [],
      "metadata": {
        "field": "Communications",
        "publication_date": "2023-01-15",
        "summary": "Study on establishing robust high-bandwidth comms around the Moon."
      },
      "provenanceReferences": [],
      "createdAt": "2026-08-14T01:22:56.535Z",
      "updatedAt": "2026-08-14T01:22:56.535Z"
    },
    {
      "id": "per_jane_doe",
      "canonicalName": "Dr. Jane Doe",
      "entityType": "Person",
      "aliases": [
        "J. Doe"
      ],
      "metadata": {
        "role": "Lead Systems Engineer",
        "field": "Telecommunications"
      },
      "provenanceReferences": [],
      "createdAt": "2026-08-14T01:22:56.535Z",
      "updatedAt": "2026-08-14T01:22:56.535Z"
    }
  ],
  "claims": [
    {
      "id": "c_1786661284936_666",
      "subjectId": "org_european_space_agency",
      "predicate": "FUNDS",
      "objectId": "org_isar_aerospace",
      "sourceDocumentId": "doc_1786661284935_2be5268b",
      "confidence": "SOURCE_BACKED",
      "evidence": "ESA funding: 1.5M EUR to Isar Aerospace for Spectrum",
      "extractionMethod": "JSON Parser",
      "publicationDate": "2026-08-13T22:48:04.932Z",
      "extractedDate": "2026-08-13T22:48:04.936Z",
      "observedAt": "2026-08-13T22:48:04.936Z",
      "validFrom": null,
      "validUntil": null,
      "provenanceStatus": "ACTIVE"
    },
    {
      "id": "c_1786661284936_600",
      "subjectId": "org_european_space_agency",
      "predicate": "FUNDS",
      "objectId": "org_rocket_factory_augsburg",
      "sourceDocumentId": "doc_1786661284935_2be5268b",
      "confidence": "SOURCE_BACKED",
      "evidence": "ESA funding: 500K EUR to Rocket Factory Augsburg for RFA One",
      "extractionMethod": "JSON Parser",
      "publicationDate": "2026-08-13T22:48:04.932Z",
      "extractedDate": "2026-08-13T22:48:04.936Z",
      "observedAt": "2026-08-13T22:48:04.936Z",
      "validFrom": null,
      "validUntil": null,
      "provenanceStatus": "ACTIVE"
    },
    {
      "id": "c_nasa_operates_artemis",
      "subjectId": "org_nasa",
      "predicate": "OPERATES",
      "objectId": "miss_artemis",
      "confidence": "HIGH",
      "provenanceStatus": "ACTIVE",
      "extractedDate": "2026-08-14T01:22:56.535Z",
      "observedAt": "2026-08-14T01:22:56.535Z"
    },
    {
      "id": "c_artemis_uses_satcom",
      "subjectId": "miss_artemis",
      "predicate": "USES",
      "objectId": "tech_satcom",
      "confidence": "HIGH",
      "provenanceStatus": "ACTIVE",
      "extractedDate": "2026-08-14T01:22:56.535Z",
      "observedAt": "2026-08-14T01:22:56.535Z"
    },
    {
      "id": "c_esa_partners_artemis",
      "subjectId": "org_european_space_agency",
      "predicate": "PARTNERS_WITH",
      "objectId": "miss_artemis",
      "confidence": "HIGH",
      "provenanceStatus": "ACTIVE",
      "extractedDate": "2026-08-14T01:22:56.535Z",
      "observedAt": "2026-08-14T01:22:56.535Z"
    },
    {
      "id": "c_lunar_comm_research_satcom",
      "subjectId": "res_lunar_comm",
      "predicate": "ADVANCES",
      "objectId": "tech_satcom",
      "confidence": "HIGH",
      "provenanceStatus": "ACTIVE",
      "extractedDate": "2026-08-14T01:22:56.535Z",
      "observedAt": "2026-08-14T01:22:56.535Z"
    },
    {
      "id": "c_jane_doe_authors_lunar_comm",
      "subjectId": "per_jane_doe",
      "predicate": "AUTHORED",
      "objectId": "res_lunar_comm",
      "confidence": "HIGH",
      "provenanceStatus": "ACTIVE",
      "extractedDate": "2026-08-14T01:22:56.535Z",
      "observedAt": "2026-08-14T01:22:56.535Z"
    },
    {
      "id": "c_jane_doe_works_at_nasa",
      "subjectId": "per_jane_doe",
      "predicate": "WORKS_AT",
      "objectId": "org_nasa",
      "confidence": "HIGH",
      "provenanceStatus": "ACTIVE",
      "extractedDate": "2026-08-14T01:22:56.535Z",
      "observedAt": "2026-08-14T01:22:56.535Z"
    }
  ],
  "sources": [
    {
      "id": "src_esa_api",
      "publisher": "European Space Agency",
      "title": "ESA Public API",
      "url": "esa.int/api",
      "publicationDate": "2026-08-13T22:48:04.932Z",
      "sourceType": "SOURCE_FIXTURE",
      "priority": 1
    }
  ],
  "documents": [
    {
      "id": "doc_1786661284935_2be5268b",
      "sourceId": "src_esa_api",
      "title": "ESA Public API",
      "url": "esa.int/api",
      "contentReference": "{\n  \"request_url\": \"https://www.esa.int/api/missions/v1\",\n  \"response\": [\n    {\n      \"org_name\": \"European Space Agency\",\n      \"aliases\": [\"ESA\"],\n      \"type\": \"SPACE_AGENCY\",\n      \"location\": { \"continent\": \"Europe\", \"country\": \"France\", \"city\": \"Paris\", \"lat\": 48.8566, \"lng\": 2.3522 },\n      \"founded\": \"1975\",\n      \"mission\": \"Shape the development of Europe's space capability\",\n      \"recent_activities\": [\n        { \"type\": \"funding\", \"recipient\": \"Isar Aerospace\", \"amount\": \"1.5M EUR\", \"project\": \"Spectrum\" },\n        { \"type\": \"funding\", \"recipient\": \"Rocket Factory Augsburg\", \"amount\": \"500K EUR\", \"project\": \"RFA One\" }\n      ]\n    },\n    {\n      \"org_name\": \"Isar Aerospace\",\n      \"type\": \"COMPANY\",\n      \"location\": { \"continent\": \"Europe\", \"country\": \"Germany\", \"city\": \"Munich\", \"lat\": 48.1351, \"lng\": 11.5820 },\n      \"mission\": \"Affordable access to space for small and medium satellites.\"\n    }\n  ]\n}\n",
      "publicationDate": "2026-08-13T22:48:04.932Z",
      "documentType": "JSON",
      "hash": "2be5268b12e2e8aeace7727773bbe668c41d9ec6be819996fe1ef4cde307b081"
    }
  ]
};
if(typeof window !== 'undefined') window.rawData = rawData;
if(typeof module !== 'undefined') module.exports = rawData;
