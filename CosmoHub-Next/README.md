# CosmoHub-Next (v0.4.1 Ingestion Hardening)

> **INFORMATION IS EVERYWHERE. INTELLIGENCE IS NOWHERE.**

CosmoHub-Next is the experimental next-generation product prototype for the CosmoHub space intelligence ecosystem. It is evolving from a discovery prototype into the definitive **Intelligence Layer for the Global Space Ecosystem**.

## Core Vision
`EDUCATION → DISCOVERY → SPACE INTELLIGENCE → KNOWLEDGE INFRASTRUCTURE → AI SYSTEMS → DEEP-TECH SPACE TECHNOLOGY`

## Architecture
Built on a strict two-layer architecture:
1. **Intelligence Core**: A central property graph mapping entities (Institutions, Missions, Tech) and provenanced claims driven by rigorous ingestion pipelines parsing external sources.
2. **Product Experience**: A lightweight Single Page Application (SPA) providing specialized lenses over the core graph.

## Data Stratification
To preserve strict technical honesty, CosmoHub-Next enforces clear data categorizations:
*   **LIVE**: Successfully parsed responses from the `HttpConnector` retrieving public intelligence from network targets.
*   **SOURCE_FIXTURE**: Verifiable real-world data payloads retrieved and saved locally (e.g. `fixtures/esa_source.json`) allowing the parser pipeline to execute reproducibly without requiring live network access during development/testing.
*   **SYNTHETIC**: Fictionalized product/learning elements (`data/product.js`) strictly separated from the Intelligence Core (`data/core.js`) but explicitly mapped via reference IDs.

## How to Run
1. Navigate to the root directory.
2. Start a local server: `python -m http.server 8000`
3. Open `http://localhost:8000` in your browser.
4. Run the data ingestion pipeline: `node js/ingestion/pipeline.js`
5. Run tests: `node tests/core.test.js` & `node tests/pipeline.test.js`

## Current Limitations & Simulated Elements
- **Simulated Storage**: The underlying API layer (`js/core/api.js`) and database (`js/core/repository.js`) are simulated in-memory abstractions mapping to JSON payloads.
- **Entity Resolution**: `AdvancedEntityResolver` executes deterministic matching and flagging of `POSSIBLE_MATCH`. It does not execute ML/Fuzzy extraction yet.

See the `docs/` folder for deeper architectural guidelines.
