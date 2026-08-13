# Canonical Ontology (v0.2.1)

CosmoHub's Intelligence Core relies on strict canonical types to map the global space ecosystem deterministically.

## Canonical Entity Types
- `Organization`
- `University`
- `ResearchInstitute`
- `Person`
- `Mission`
- `Technology`
- `ResearchProject`
- `Publication`
- `Funding`
- `Opportunity`
- `Event`
- `News`
- `LearningPath`
- `Lesson`
- `Quiz`
- `Project`

*Note: Rather than generating conflicting top-level entities (e.g., `LaunchVehicle`), subclasses like launch vehicles or payloads are modeled as subtypes or metadata properties of a `Mission` or `Technology` entity to enforce a simpler baseline topology for queries.*

## Claim Model
Every edge in the system is a `Claim`. Claims assert facts between a `Subject` and `Object` through a `Predicate`.

**Required Properties:**
- `id`
- `subjectId`
- `predicate`
- `objectId`
- `confidence` (e.g., `SOURCE_BACKED`, `SYNTHETIC`)
- `provenanceStatus` (e.g., `ACTIVE`, `SUPERSEDED`, `CONFLICTED`)
- `observedAt`

**Provenance & Temporal Properties:**
- `sourceDocumentId` (Pointer to the exact document parsed)
- `evidence` (Extracted text validating the claim)
- `extractionMethod`
- `publicationDate`
- `extractedDate`
- `validFrom`
- `validUntil`
