const ecosystemData = {
  "entities": [
    {
      "id": "org_esa",
      "type": "Organization",
      "is_synthetic": true,
      "name": "European Space Agency (ESA)"
    },
    {
      "id": "org_isar",
      "type": "Organization",
      "is_synthetic": true,
      "name": "Isar Aerospace",
      "hq": "Germany"
    },
    {
      "id": "org_rfa",
      "type": "Organization",
      "is_synthetic": false,
      "name": "Rocket Factory Augsburg",
      "hq": "Germany"
    },
    {
      "id": "lv_spectrum",
      "type": "LaunchVehicle",
      "is_synthetic": false,
      "name": "Spectrum"
    },
    {
      "id": "lv_rfa_one",
      "type": "LaunchVehicle",
      "is_synthetic": false,
      "name": "RFA One"
    },
    {
      "id": "fund_isar_esa",
      "type": "FundingEvent",
      "is_synthetic": false,
      "value": "1500000 EUR",
      "name": "ESA Boost! Isar"
    },
    {
      "id": "fund_rfa_esa",
      "type": "FundingEvent",
      "is_synthetic": false,
      "value": "500000 EUR",
      "name": "ESA Boost! RFA"
    },
    {
      "id": "person_synthetic",
      "type": "Person",
      "is_synthetic": true,
      "name": "John Doe (Demo)"
    },
    {
      "id": "news_1",
      "type": "NewsItem",
      "is_synthetic": true,
      "title": "[SYNTHETIC] ESA announces new SATCOM initiative",
      "summary": "Simulated news article demonstrating news layer connected to core entities.",
      "date": "2024-05-01",
      "topic": "Satellites"
    },
    {
      "id": "tech_satcom",
      "type": "Technology",
      "is_synthetic": true,
      "name": "Satellite Communications"
    },
    {
      "id": "path_satcom",
      "type": "LearningPath",
      "is_synthetic": true,
      "title": "SATCOM Fundamentals"
    },
    {
      "id": "lesson_satcom_1",
      "type": "Lesson",
      "is_synthetic": true,
      "title": "Link Budgets",
      "xp": 50
    },
    {
      "id": "quiz_satcom_1",
      "type": "Quiz",
      "is_synthetic": true,
      "title": "RF Fundamentals Quiz",
      "xp": 100
    },
    {
      "id": "proj_satcom_1",
      "type": "Project",
      "is_synthetic": true,
      "title": "Build a Yagi Antenna",
      "xp": 500
    },
    {
      "id": "opp_satcom",
      "type": "Opportunity",
      "is_synthetic": true,
      "title": "SATCOM Graduate Fellowship",
      "status": "Open"
    },
    {
      "id": "lv_retired_demo",
      "type": "LaunchVehicle",
      "is_synthetic": false,
      "name": "Old Rocket"
    }
  ],
  "relationships": [
    {
      "source": "org_isar",
      "target": "lv_spectrum",
      "type": "MANUFACTURES",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "is_synthetic": false,
        "evidence": "ESA is supporting the development of Isar Aerospace's Spectrum launch vehicle",
        "source_id": "src_esa_isar_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Isar_Aerospace_Spectrum_launch_vehicle"
      }
    },
    {
      "source": "org_isar",
      "target": "fund_isar_esa",
      "type": "RECEIVED_FUNDING",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "is_synthetic": false,
        "evidence": "ESA is supporting... The contract is worth \u20ac1.5M.",
        "source_id": "src_esa_isar_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Isar_Aerospace_Spectrum_launch_vehicle"
      }
    },
    {
      "source": "org_esa",
      "target": "fund_isar_esa",
      "type": "PROVIDED_FUNDING",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "is_synthetic": false,
        "evidence": "ESA is supporting... The contract is worth \u20ac1.5M.",
        "source_id": "src_esa_isar_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Isar_Aerospace_Spectrum_launch_vehicle"
      }
    },
    {
      "source": "org_rfa",
      "target": "lv_rfa_one",
      "type": "MANUFACTURES",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "is_synthetic": false,
        "evidence": "Rocket Factory Augsburg's RFA One launch vehicle",
        "source_id": "src_esa_rfa_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Rocket_Factory_Augsburg_launch_vehicle"
      }
    },
    {
      "source": "org_rfa",
      "target": "fund_rfa_esa",
      "type": "RECEIVED_FUNDING",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "is_synthetic": false,
        "evidence": "ESA is co-funding Rocket Factory Augsburg... The support is \u20ac500K.",
        "source_id": "src_esa_rfa_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Rocket_Factory_Augsburg_launch_vehicle"
      }
    },
    {
      "source": "org_esa",
      "target": "fund_rfa_esa",
      "type": "PROVIDED_FUNDING",
      "properties": {
        "confidence": "SOURCE_BACKED",
        "is_synthetic": false,
        "evidence": "ESA is co-funding Rocket Factory Augsburg... The support is \u20ac500K.",
        "source_id": "src_esa_rfa_boost",
        "source_url": "https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Rocket_Factory_Augsburg_launch_vehicle"
      }
    },
    {
      "source": "person_synthetic",
      "target": "org_isar",
      "type": "EMPLOYS",
      "properties": {
        "confidence": "SYNTHETIC",
        "is_synthetic": true,
        "evidence": null,
        "source_id": null,
        "source_url": null
      }
    },
    {
      "source": "news_1",
      "target": "org_esa",
      "type": "MENTIONS",
      "properties": {
        "confidence": "SYNTHETIC",
        "is_synthetic": true,
        "evidence": null,
        "source_id": null,
        "source_url": null
      }
    },
    {
      "source": "path_satcom",
      "target": "tech_satcom",
      "type": "COVERS",
      "properties": {
        "confidence": "SYNTHETIC",
        "is_synthetic": true,
        "evidence": null,
        "source_id": null,
        "source_url": null
      }
    },
    {
      "source": "path_satcom",
      "target": "lesson_satcom_1",
      "type": "INCLUDES_LESSON",
      "properties": {
        "confidence": "SYNTHETIC",
        "is_synthetic": true,
        "evidence": null,
        "source_id": null,
        "source_url": null
      }
    },
    {
      "source": "path_satcom",
      "target": "quiz_satcom_1",
      "type": "INCLUDES_QUIZ",
      "properties": {
        "confidence": "SYNTHETIC",
        "is_synthetic": true,
        "evidence": null,
        "source_id": null,
        "source_url": null
      }
    },
    {
      "source": "path_satcom",
      "target": "proj_satcom_1",
      "type": "RELATES_TO_PROJECT",
      "properties": {
        "confidence": "SYNTHETIC",
        "is_synthetic": true,
        "evidence": null,
        "source_id": null,
        "source_url": null
      }
    },
    {
      "source": "org_esa",
      "target": "opp_satcom",
      "type": "OFFERS_OPPORTUNITY",
      "properties": {
        "confidence": "SYNTHETIC",
        "is_synthetic": true,
        "evidence": null,
        "source_id": null,
        "source_url": null
      }
    }
  ]
};