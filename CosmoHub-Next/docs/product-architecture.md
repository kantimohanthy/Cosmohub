# CosmoHub Product Architecture

## Overview
CosmoHub-Next strictly separates intelligence extraction from user experience. The UX layers consume the exact same underlying entities to guarantee that a `Technology` mentioned in `News` is the exact same graph node users study in `LearningPath`.

## The Pipeline
1. **SOURCE**: Verifiable publishers (e.g., ESA).
2. **DOCUMENT**: Specific publications (e.g., Press Releases).
3. **CLAIM**: Subject-Predicate-Object triples with specific extraction confidence and temporal bounding.
4. **ENTITY**: Distinct canonical actors, organizations, and capabilities.
5. **RELATIONSHIP**: Traversed connections resulting from claims.
6. **PROVENANCE**: Tracing evidence back through the graph from an Entity down to a Source.
7. **QUERY**: The deterministic `QueryEngine` acting as the bridge.
8. **PRODUCT LAYERS**: The UX components (News, Institutions, Learning).

## Product Layer Integration
- **Institutions**: Dossier views grouping claims by Organization without duplicating data.
- **Space News**: Connects `News` nodes directly to the core ontology via `MENTIONS` predicates.
- **Gamified Learning**: The "Learn" entry point. Consumes `LearningPath`, `Lesson`, `Quiz`, and `Project` nodes linking directly to underlying concepts (e.g. SATCOM paths linking to specific real-world `Technology` nodes).

*Note: The current architecture utilizes a simulated static data array (`data/ecosystem.js`) loaded in client memory to prove the pipeline architecture without relying on a deployed cloud graph database.*
