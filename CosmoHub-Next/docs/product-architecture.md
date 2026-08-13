# Product Architecture

## 1. INTELLIGENCE CORE
The single source of truth. Defines entities (Orgs, People, Tech) and claims (edges). No product-specific duplicates exist. For instance, "ESA" is stored once and rendered everywhere.

## 2. PRODUCT EXPERIENCE
* **Home**: Concept hub.
* **Explore**: The raw graph interface for navigating edges.
* **Institutions**: Dossier views grouping claims by Organization.
* **Missions**: Hardware capability tracking.
* **Research**: Publication and patent tracking.
* **News**: Time-series claims connected to graph entities.
* **Learn**: Educational paths directly connected to the ontology (e.g. learning SATCOM links you to SATCOM missions). Gamification layers on top of this.
