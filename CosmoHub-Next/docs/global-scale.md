# Scaling the Intelligence Core

## Path to 1,000,000+ Entities
The current prototype stores the canonical graph entirely in browser memory (`data/ecosystem.js`) to demonstrate the UI interactions dynamically without server overhead.

**Scaling Roadmap:**
1. **Repository Abstraction**: The `InMemoryRepository` created in v0.4 acts as the interface. It will be replaced seamlessly by a `PostgresRepository` or `DatomicRepository` to handle SQL/Datalog queries.
2. **Search Abstraction**: The `SearchService` executes array scans locally. In production, this maps to an Elasticsearch or Typesense cluster, indexing the normalized canonical aliases for sub-millisecond autocomplete across millions of institutions.
3. **API Layer**: The `CosmoHubAPI` abstraction intercepts the UI layer commands. It will switch from calling local functions to issuing `GET /institutions/search?q=ESA` calls.
