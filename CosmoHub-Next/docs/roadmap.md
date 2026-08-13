# CosmoHub Roadmap

## The Vision
CosmoHub begins as an education and discovery platform, acting as the entry point for the space ecosystem. The long-term evolution is:
**EDUCATION → DISCOVERY → SPACE INTELLIGENCE → KNOWLEDGE INFRASTRUCTURE → AI SYSTEMS → DEEP-TECH SPACE TECHNOLOGY**

## Current Prototype State
* **IMPLEMENTED**: The two-layer architecture separating the intelligence core (provenance/temporal models) from the product SPA layers. A deterministic entity resolution module and robust Query API.
* **SIMULATED**: The "Live" ingestion of documents and extraction of claims via NLP/AI. Currently, `data/ecosystem.js` instantiates the knowledge graph manually in memory for prototype product validation.
* **PLANNED**: Real-world backend data ingestion pipelines and a persistent graph database.

## Next Backend Milestone
Migrate the static in-memory `ecosystem.js` to a real knowledge graph database (e.g., Datomic, Neo4j) backing a REST/GraphQL API. Implement the ingestion pipeline fetching real JSON structures from public institutional endpoints to automatically build the graph, replacing the synthetic seeds.
