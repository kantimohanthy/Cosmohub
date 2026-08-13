# Global Institution Intelligence Architecture

## Overview
Institution Intelligence is a core product of CosmoHub, designed to eventually catalog every relevant institution in the global space ecosystem without manual duplication.

## Global Institution Model
The canonical entity is `Organization`. Sub-categorization (e.g., Space Agency, University, Laboratory, Startup) is handled via `metadata.institution_type` to preserve a singular, extensible graph node.

**Core Metadata Fields:**
- `institution_type`
- `country`, `continent`, `region`, `city`
- `latitude`, `longitude` (for spatial graph visualization)
- `founded`
- `status` (ACTIVE, MERGED, ACQUIRED, DISSOLVED)

## Hierarchical & Capability Graph
Institutions do not store isolated arrays of data. They connect to the CosmoHub ecosystem via strict `Claims`:
- `PARENT_OF` / `SUBSIDIARY_OF`: Maps organizational hierarchy.
- `ACHIEVED`: Links to specific historical milestones (e.g. `Event` nodes).
- `MANUFACTURES` / `DEVELOPS`: Links to `Mission` or `Technology` nodes.

## Global Ingestion Architecture
To scale to millions of organizations without manual entry, CosmoHub employs an explicit ingestion pipeline capable of parsing authoritative sources:
1. **SOURCE**: E.g., CORDIS dataset, Space-Track, Corporate Registries.
2. **DOCUMENT / API**: The raw payload retrieved.
3. **PARSER**: Extracts raw JSON/XML strings into raw claims.
4. **ENTITY EXTRACTION**: Identifies Subjects and Objects.
5. **ENTITY NORMALIZATION**: Lowercases, strips punctuation, normalizes whitespaces.
6. **ENTITY RESOLUTION**:
   - `MATCH`: Normalization perfectly matches canonical alias (Safe auto-merge).
   - `POSSIBLE_MATCH`: Graph similarity hints at overlap (Flags for human/expert-system review).
   - `NO_MATCH`: New Canonical Entity created.
7. **VALIDATION**: Enforces schema rules.
8. **GRAPH MUTATION**: Writes canonical `Claim` edges with explicit `SOURCE_BACKED` provenance to the core database.
