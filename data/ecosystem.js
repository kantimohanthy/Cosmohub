const ecosystemData = {
  "entities": [
    { "id": "org_1", "type": "Organization", "name": "ESA", "orgType": "Agency", "description": "European Space Agency" },
    { "id": "org_2", "type": "Organization", "name": "Technical University of Munich", "orgType": "University", "description": "Leading research university in Germany" },
    { "id": "org_3", "type": "Organization", "name": "Isar Aerospace", "orgType": "Company", "description": "Launch service provider based in Munich" },

    { "id": "person_1", "type": "Person", "name": "Dr. Sarah Chen", "role": "Propulsion Lead", "bio": "Expert in liquid propulsion systems." },
    { "id": "person_2", "type": "Person", "name": "Marcus Weber", "role": "PhD Candidate", "bio": "Researching autonomous GNC for smallsats." },

    { "id": "mission_1", "type": "Mission", "name": "Hera", "status": "Active", "objective": "Planetary defense demonstration." },
    { "id": "mission_2", "type": "Mission", "name": "Spectrum Maiden Flight", "status": "Planned", "objective": "First orbital launch of Spectrum vehicle." },

    { "id": "research_1", "type": "Research", "name": "Autonomous Optical Navigation", "domain": "GNC", "url": "#" },
    { "id": "tech_1", "type": "Technology", "name": "Aquila Engine", "category": "Hardware", "description": "LOX/Propane rocket engine." },

    { "id": "opp_1", "type": "Opportunity", "title": "GNC Engineer", "oppType": "Job", "status": "Open" },
    { "id": "opp_2", "type": "Opportunity", "title": "Space Systems Fellowship", "oppType": "Fellowship", "status": "Open" }
  ],
  "relationships": [
    { "source": "person_1", "target": "org_3", "type": "WORKS_AT" },
    { "source": "person_1", "target": "tech_1", "type": "BUILDS" },
    { "source": "org_3", "target": "tech_1", "type": "BUILDS" },
    { "source": "org_3", "target": "mission_2", "type": "PARTICIPATES_IN" },
    { "source": "person_2", "target": "org_2", "type": "STUDIES_AT" },
    { "source": "person_2", "target": "research_1", "type": "RESEARCHES" },
    { "source": "org_1", "target": "mission_1", "type": "FUNDS" },
    { "source": "org_3", "target": "opp_1", "type": "OFFERS" },
    { "source": "org_1", "target": "opp_2", "type": "OFFERS" }
  ]
};
