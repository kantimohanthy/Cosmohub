# CosmoHub-Next

CosmoHub-Next is the experimental next-generation product prototype for the CosmoHub space intelligence ecosystem.

> **INFORMATION IS EVERYWHERE. INTELLIGENCE IS NOWHERE.**

## Core Vision
CosmoHub begins as an education and discovery platform for the space ecosystem, but education is only the entry point. The fundamental product loop is:
`DISCOVER → LEARN → EXPLORE → BUILD → RESEARCH → CONNECT → OPPORTUNITY`

## Architecture
Built on a strict two-layer architecture:
1. **Intelligence Core**: A central property graph (`data/ecosystem.js`) mapping entities (Institutions, Missions, Tech) and provenanced claims.
2. **Product Experience**: A lightweight Single Page Application (SPA) providing specialized lenses over the core graph (Institution Intelligence, Space News, Gamified Learning, Mission Discovery). Every view consumes the shared ontology without duplicating data.

## How to Run
1. Navigate to the root directory.
2. Start a local server: `python -m http.server 8000`
3. Open `http://localhost:8000` in your browser.

## Current Limitations & Simulated Elements
- **Simulated Data**: The underlying `ecosystem.js` is manually constructed to simulate the output of a data extraction pipeline. Synthetic elements are explicitly marked with `SYNTHETIC` badges in the UI.
- **Client-Side Gamification**: XP and Level tracking occur purely in local browser memory and reset on refresh. There is no backend user-profile infrastructure yet.
- **Static Export**: The UI relies on static JSON; it does not connect to Neo4j or a live REST API to keep the prototype fast and extensible.

See the `docs/` folder for deeper architectural guidelines.
