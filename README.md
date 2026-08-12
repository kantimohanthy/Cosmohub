# CosmoHub

> "CosmoHub is the ontology-first bridge between space institutes and space talent — the Palantir Gotham of the space economy."

CosmoHub is a foundational intelligence platform designed to connect people, organizations, missions, research, and technology in the space ecosystem through a structured knowledge graph.

## Current State: Space Intelligence MVP (v0.1 Pipeline & Product Layers)

This repository contains the **Space Intelligence MVP**, an early-stage demonstration of the ontology-first approach to space sector intelligence. It moves beyond a static presentation into a structured, queryable data prototype, consisting of two main layers.

### 1. Intelligence Core
The underlying system of record enforcing a strict bitemporal provenance pipeline.
*   **Ontology Data Layer**: A structured dataset modeling core entities (`Organization`, `Person`, `Asset`, `Publication`, `Technology`, `FinancialEvent`, etc.) and their relationships.
*   **Provenance Pipeline**: Extracts real-world evidence from Sources into Documents, and derives Claims explicitly linked back to the Source. Enforces verification rules (e.g., Confidence levels like `SOURCE_BACKED` vs. `SYNTHETIC`).

### 2. Product Layers
The Single Page Application (SPA) UX built on top of the Intelligence Core. These layers consume the same underlying graph without duplicating data.
*   **Institution Intelligence**: Deep dossier views into Organizations.
*   **Space News**: Connects verifiable news to the underlying graph entities.
*   **Gamified Learning**: A bridge to the platform that uses tracks, lessons, quizzes, and XP seamlessly connected to the core intelligence elements (Missions, Companies, Research).
*   **Research Intelligence**: Connects Publications to Researchers, Institutions, and Tech.

## Architecture

The current architecture is intentionally lightweight and focused on demonstrating the core **Ontology First** principle without unnecessary infrastructure overhead.

*   **Pipeline & Validation**: Python scripts (`pipeline/`) demonstrating extraction, temporal handling, data integrity validation, and querying.
*   **Data Export**: The pipeline exports a structured JSON dataset (`data/ecosystem.js`) that powers the UI.
*   **Presentation Layer**: Vanilla HTML/CSS/JavaScript SPA (`index.html`). No complex frameworks, ensuring the prototype remains understandable and easy to iterate upon.
*   **Documentation**: See `docs/product-architecture.md` and `docs/v0.1-pipeline.md`.

## Building Towards the Vision

The long-term vision for CosmoHub is to become the definitive trust and reasoning layer for the global space domain.

**Strategic Progression:**
1.  **Current MVP**: Python-based pipeline validating and exporting provenanced data to a client-side SPA with Gamified learning entry points.
2.  **Building**: Real data ingestion pipelines connected to external authorities (e.g. CORDIS), LLM-based structured entity extraction, and a dedicated temporal Graph Database.
3.  **Long-Term Vision**: The verifiable knowledge and reasoning substrate for the entire space domain, serving institutions, governments, and commercial space actors.

## Developer Experience

### Setup Instructions

1.  Clone the repository: `git clone https://github.com/kantimohanthy/Cosmohub.git`
2.  To view the application, open `index.html` in your web browser or run `python -m http.server 8000`.
3.  To run the backend extraction/validation pipeline, run `python -m unittest discover tests` from the root directory.

### Known Limitations

*   **Simulated Pipeline**: The Python extraction pipeline currently populates hardcoded data structures to demonstrate graph construction, temporal logic, and synthetic isolation.
*   **Client-Side UI Routing**: The SPA uses simple client-side JS routing mapped directly to the exported JSON.

### Roadmap

*   **Next Engineering Milestone**: Implement an `Agent/User Profile` ontology allowing users to track progress over the learning graph and generate verifiable XP/achievement claims, providing bidirectional graph traversal connecting talent back to the ecosystem.
