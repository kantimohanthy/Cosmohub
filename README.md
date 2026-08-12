# CosmoHub

> "CosmoHub is the ontology-first bridge between space institutes and space talent — the Palantir Gotham of the space economy."

CosmoHub is a foundational intelligence platform designed to connect people, organizations, missions, research, and technology in the space ecosystem through a structured knowledge graph.

## Current State: Space Intelligence MVP

This repository contains the **Space Intelligence MVP**, an early-stage demonstration of the ontology-first approach to space sector intelligence. It moves beyond a static presentation into a structured, queryable data prototype.

### Key Features
*   **Ontology Data Layer**: A structured JSON dataset modeling core entities (Organization, Person, Mission, Research, Technology, Opportunity) and their relationships.
*   **Interactive Knowledge Graph**: Visualizes the relationships between entities, allowing users to explore the interconnected space ecosystem.
*   **Intelligence Feed**: Displays structured data based on the underlying ontology rather than purely hardcoded HTML.
*   **"Bloomberg Terminal" UX**: Maintains the focused, data-dense visual identity of an intelligence terminal.

## Architecture

The current architecture is intentionally lightweight and focused on demonstrating the core **Ontology First** principle without unnecessary infrastructure overhead.

*   **Data Layer**: A local JSON-based structured dataset (`data/ecosystem.js`) that defines entities and relationships.
*   **Presentation Layer**: Vanilla HTML/CSS/JavaScript. No complex frameworks, ensuring the prototype remains understandable and easy to iterate upon.
*   **Ontology Schema**: The underlying data model is documented in `docs/ontology.md`.

## Building Towards the Vision

The long-term vision for CosmoHub is to become the definitive trust and reasoning layer for the global space domain.

**Strategic Progression:**
1.  **Current MVP**: Local, structured data demonstration of the ontology.
2.  **Building**: Real data ingestion pipelines, automated entity extraction from unstructured sources, and a robust graph database backend.
3.  **Long-Term Vision**: The verifiable knowledge and reasoning substrate for the entire space domain, serving institutions, governments, and commercial space actors.

## Developer Experience

### Setup Instructions

1.  Clone the repository: `git clone https://github.com/kantimohanthy/Cosmohub.git`
2.  Open `index.html` in your web browser. No build steps or server required for the current MVP.

### Known Limitations

*   **Static Data**: The current MVP uses a local, static dataset. It is not yet connected to live APIs or a backend database.
*   **Client-Side Rendering**: All graph rendering and data filtering happen client-side. This will need to transition to server-side processing as the dataset scales.

### Roadmap

*   **Next Engineering Milestone**: Integrate a lightweight graph database (e.g., Neo4j or a simple triplestore) and build a basic API layer to replace the static JSON file.
*   **Data Ingestion**: Develop scrapers and APIs to ingest real-world data from public space databases and research publications.
