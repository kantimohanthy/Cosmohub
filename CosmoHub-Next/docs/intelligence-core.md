# CosmoHub Intelligence Core Architecture v0.2

This document details the underlying system of record powering CosmoHub-Next.

## 1. Ontology
The schema strictly models actors, hardware, information, and capital flows in the space ecosystem:
`Organization`, `Person`, `Mission`, `Technology`, `ResearchProject`, `Publication`, `Funding`, `Opportunity`, `News`, `LearningPath`, `Lesson`, `Project`.

## 2. Entity Model
Entities are abstract canonical representations.
*   `id`: Unique identifier (e.g., `org_esa`).
*   `canonicalName`: Official string.
*   `aliases`: Arrays used by the Entity Resolver.
*   `metadata`: Arbitrary flexible data (mission statements, HQ locations).

## 3. Claim Model
No relationship is assumed absolute. All relationships are mapped as a **Claim** connecting a `subjectId` and `objectId` via a `predicate`.
*   Claims capture `validFrom` and `validUntil`.
*   Claims contain `confidence` indicators (`SOURCE_BACKED`, `SYNTHETIC`).

## 4. Provenance
Every claim points to a `sourceDocumentId`.
*   `Document`: Represents a discrete parsed file, mapped to a `Source`.
*   `Source`: Represents the publisher identity and trustworthiness (`sourceType`).
*   The `QueryEngine` traces: `Claim` -> `Document` -> `Source`.

## 5. Entity Resolution
Uses a deterministic `aliasMap` mapping strings like "European Space Agency (ESA)" down to the canonical `org_esa`. This isolates the messy extraction step from the clean graph backend.

## 6. Temporal Reasoning
Facts change. A CEO leaves; a mission launches.
*   `validFrom` and `validUntil` dictate the real-world temporal validity.
*   `provenanceStatus` marks claims as `ACTIVE` or `SUPERSEDED`.

## 7. Query Layer
The UI layers interact ONLY with the `QueryEngine` API, abstracting away graph traversal logic:
*   `getEntity(id)`
*   `getRelatedEntities(id)`
*   `getClaimsForEntity(id)`
*   `getProvenanceForClaim(claimId)`

## 8. Future Backend Architecture
Currently, `data/ecosystem.js` instantiates these classes in memory for prototype validation.
The target state is migrating the `Entity`, `Claim`, and `Source` models into a bitemporal graph database (e.g., XTDB or Datomic) to natively handle infinite historical tracking and provenance resolution at scale without blocking the node runtime.
