# CosmoHub-Next Ontology v0.1

This ontology defines the foundational entities and relationships required for the CosmoHub-Next Space Intelligence infrastructure.

## Entities
* **Organization**: Government, Commercial, Academic
* **Person**: Researchers, Engineers, Executives
* **Asset**: LaunchVehicle, Spacecraft, Payload
* **Technology**: Capability domains
* **Publication**: Papers, Patents, Press Releases
* **FinancialEvent**: Grants, Contracts
* **Learning**: Learning Paths, Lessons, Quizzes
* **Opportunity**: Jobs, Fellowships

## Relationships (Claims)
All edges are modeled as Claims with provenance (Source, Confidence).
* **MANUFACTURES**: Org -> Asset
* **DEVELOPS**: Org -> Tech/Asset
* **IMPLEMENTS**: Asset -> Tech
* **RESEARCHES**: Person -> Tech
* **AUTHOR_OF**: Person -> Publication
* **MENTIONS**: News/Pub -> Entity
* **INCLUDES**: Path -> Lesson/Quiz
* **OFFERS**: Org -> Opportunity
