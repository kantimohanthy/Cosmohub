const ecosystemData = {
  "entities": [
    // Real Data subset (simulated output from pipeline)
    { "id": "org_esa", "type": "Organization", "name": "European Space Agency", "hq": "Europe", "mission": "Shape the development of Europe's space capability.", "is_synthetic": false },
    { "id": "org_isar", "type": "Organization", "name": "Isar Aerospace", "hq": "Germany", "mission": "Affordable access to space.", "is_synthetic": false },
    { "id": "lv_spectrum", "type": "Mission", "name": "Spectrum", "status": "In Development", "is_synthetic": false },
    { "id": "tech_prop", "type": "Technology", "name": "LOX/Propane Propulsion", "domain": "Propulsion", "is_synthetic": false },

    // Expanded Product Data (Synthetic/Sample for demonstration)
    { "id": "person_1", "type": "Person", "name": "Dr. Elena Rostova", "role": "Head of GNC", "is_synthetic": true },
    { "id": "pub_1", "type": "Research", "name": "Advances in Autonomous Rendezvous", "date": "2024-03-12", "is_synthetic": true },
    { "id": "news_1", "type": "News", "name": "ESA awards new satellite integration contract", "date": "2024-05-20", "summary": "A major step forward in earth observation architectures.", "is_synthetic": true },

    { "id": "path_satcom", "type": "Learning", "name": "Satellite Communications", "description": "Master RF links, orbital ground stations, and telemetry.", "xp": 1000, "is_synthetic": true },
    { "id": "les_link", "type": "Lesson", "name": "Link Budgets", "xp": 50, "is_synthetic": true },
    { "id": "proj_yagi", "type": "Project", "name": "Build a Yagi-Uda Antenna", "xp": 500, "is_synthetic": true },

    { "id": "opp_rf_eng", "type": "Opportunity", "name": "RF Systems Engineer", "type_opp": "Job", "status": "Open", "is_synthetic": true },
    { "id": "opp_esa_fellow", "type": "Opportunity", "name": "ESA Research Fellowship", "type_opp": "Fellowship", "status": "Open", "is_synthetic": true }
  ],
  "claims": [
    { "source": "org_isar", "predicate": "DEVELOPS", "target": "lv_spectrum", "confidence": "SOURCE_BACKED", "evidence": "ESA Boost! PR", "is_synthetic": false },
    { "source": "lv_spectrum", "predicate": "IMPLEMENTS", "target": "tech_prop", "confidence": "SOURCE_BACKED", "evidence": "Isar Tech Specs", "is_synthetic": false },
    { "source": "person_1", "predicate": "RESEARCHES", "target": "tech_prop", "confidence": "SYNTHETIC", "is_synthetic": true },
    { "source": "person_1", "predicate": "AUTHOR_OF", "target": "pub_1", "confidence": "SYNTHETIC", "is_synthetic": true },
    { "source": "news_1", "predicate": "MENTIONS", "target": "org_esa", "confidence": "SYNTHETIC", "is_synthetic": true },

    { "source": "path_satcom", "predicate": "INCLUDES", "target": "les_link", "confidence": "SYNTHETIC", "is_synthetic": true },
    { "source": "path_satcom", "predicate": "CULMINATES_IN", "target": "proj_yagi", "confidence": "SYNTHETIC", "is_synthetic": true },
    { "source": "path_satcom", "predicate": "PREPARES_FOR", "target": "opp_rf_eng", "confidence": "SYNTHETIC", "is_synthetic": true },
    { "source": "org_esa", "predicate": "OFFERS", "target": "opp_esa_fellow", "confidence": "SYNTHETIC", "is_synthetic": true }
  ]
};

// Global Gamification State mock
const userState = {
  xp: 1250,
  level: 4,
  completed: []
};
