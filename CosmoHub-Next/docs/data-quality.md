# CosmoHub Data Quality & Trust

## Source Priority Model
Not all sources are equal. Claims inherit priority metadata to resolve disputes:
1. `PRIMARY_OFFICIAL`: Registries and APIs directly managed by the entity.
2. `GOVERNMENT`: Federal databases.
3. `COMPANY`: Corporate disclosures and PR.

## Conflict Modeling
When sources disagree (e.g. different founding years), CosmoHub creates a `Conflict` object linking the diverging `Claims`. It does not arbitrarily resolve uncertain data silently. The UI is designed to render `[CONFLICTED]` provenances allowing manual intelligence review.

## Temporal Boundaries
Facts are bound by `validFrom` and `validUntil`. Old data is marked `SUPERSEDED` rather than deleted, preserving infinite historical auditability.
