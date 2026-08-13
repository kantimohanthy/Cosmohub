# CosmoHub Data Ingestion Pipeline

## Architecture Flow
The global ingestion pipeline is highly modular to safely map chaotic external sources into the strict Intelligence Core ontology.
`SOURCE -> FETCH -> DOCUMENT -> PARSE -> EXTRACT -> NORMALIZE -> RESOLVE -> CLAIM -> PROVENANCE -> CANONICAL INSTITUTION`

## 1. Source Connection
Identifies the provider (e.g. ESA Public API) and assigns a `SourcePriority`.
## 2. Document Fetching & Parsing
Downloads the raw API response and wraps it in a verifiable `Document` object to trace evidence.
## 3. Extraction & Normalization
Converts strings like "European Space Agency (ESA) " into canonical stripped formats like `"european space agency esa"`.
## 4. Entity Resolution
Attempts to map the normalized string against the existing graph. Returns `MATCH`, `POSSIBLE_MATCH`, or `NO_MATCH`. Overlapping substrings trigger `POSSIBLE_MATCH` to prevent silent hallucinated merges.
## 5. Graph Mutation
Generates `Claims` wrapping relationships (e.g., `FUNDS`) and exports them safely to the `KnowledgeGraph` storage payload alongside explicit `Confidence.SOURCE_BACKED` flags.
