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