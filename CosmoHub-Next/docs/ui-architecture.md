# CosmoHub UI Architecture (v0.5 Terminal)

The user interface for CosmoHub-Next is explicitly designed around the "Bloomberg for Space" design philosophy. The UI is not merely a styling layer, but an integral part of the Intelligence Engine, exposing underlying topological patterns to the user.

## Principles
1. **Information Density:** Avoid excess white space. Favor tabular data, monospace indexing, and multi-faceted intelligence views.
2. **Keyboard First:** Power users operate without mice. The `CommandBar` (Cmd+K) allows rapid global navigation.
3. **Explorable Graphs:** There are no dead ends. The `EntityDrawer` ensures that clicking an edge (Relationship) always pivots the view context to the target node (Entity) without requiring full page loads.

## Core Components
- `js/ui.js` / `js/dashboard.js`: The central terminal dashboard exposing timelines and network health metrics.
- `js/entity-drawer.js`: A right-aligned sliding panel for inspecting canonical entities and their metadata/edges. Replaces traditional modal dialogs to preserve underlying visual context.
- `js/command-bar.js`: An overlay search interface directly hooking into the `SearchService` for real-time querying.
- `js/graph-vis.js`: A lightweight HTML Canvas force-directed topology simulation, avoiding heavy WebGL overheads for simple summaries.
- `js/map.js`: A geospatial projection system rendering organizations against their metadata latitude/longitude properties.

## Design System Tokens
All styling stems from `css/style.css` using strict CSS Custom Properties mapping to the technical identity.
- Primary Backgrounds: Heavy darks (`#04070a`, `#0a0d14`)
- Interaction Accents: Tech-Cyan (`#33ffcc`), Amber/Warning (`#ffcc00`), Primary/Tech (`#3399ff`).
- Typefaces: `Space Grotesk` (Display), `IBM Plex Sans` (Legibility), `IBM Plex Mono` (Data / Coordinates).

## State Management
- **Persistent State:** Managed via local `history` API routing (`router.js`) and `LocalStorage` (Watchlist functionality).
- **In-Memory State:** Handled entirely by the `QueryEngine` passing objects to the rendering pipeline.
