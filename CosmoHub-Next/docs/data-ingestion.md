# CosmoHub Data Ingestion Pipeline

## Architecture Flow
The global ingestion pipeline is highly modular to safely map chaotic external sources into the strict Intelligence Core ontology.
`SOURCE -> FETCH -> DOCUMENT -> PARSE -> EXTRACT -> NORMALIZE -> RESOLVE -> CLAIM -> PROVENANCE -> CANONICAL INSTITUTION`

## 1. Source Connectors
The pipeline relies on distinct abstraction patterns:
*   **HttpConnector**: Fetches real HTTP payloads subject to timeout and error modeling (404, 429, timeouts). Generates `RawDocument` wrapping.
*   **FixtureConnector**: Allows deterministic running of the pipeline against valid external payloads without live networking. Identifies sources with `sourceType: "SOURCE_FIXTURE"`.

## 2. Document Fetching & Parsing
Downloads the raw API response and wraps it in a verifiable `Document` object storing a deterministic cryptographic SHA-256 hash. If a future fetch yields the same hash, the pipeline flags `DUPLICATE_DOCUMENT` and safely bypasses extraction logic, preventing resource bloat.

## 3. Extraction & Normalization
Converts strings like "European Space Agency (ESA) " into canonical stripped formats like `"european space agency esa"`.

## 4. Entity Resolution
Attempts to map the normalized string against the existing graph. Returns `MATCH`, `POSSIBLE_MATCH`, or `NO_MATCH`. Overlapping substrings trigger `POSSIBLE_MATCH` to prevent silent hallucinated merges.

## 5. Graph Mutation
Generates `Claims` wrapping relationships (e.g., `FUNDS`) ensuring no temporal collision (rejects `validFrom > validUntil`). Verified graphs are exported strictly to `data/core.js` separating them from the gamification `data/product.js` layer.
