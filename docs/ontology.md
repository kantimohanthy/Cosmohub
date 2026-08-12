# CosmoHub Ontology v0.1

This ontology defines the foundational entities and relationships required for the CosmoHub Space Intelligence infrastructure.

## Core Philosophy: Provenance & Trust
Every relationship (edge) in the graph MUST be backed by a verifiable source. The system does not deal in "truths", only in *claims* made by *sources*.

## Entities

1. **Organization**
   - `id`: Unique identifier
   - `name`: Official name
   - `orgType`: Government, Commercial, Academic, Military
   - `hq_location`: Country or region

2. **Person**
   - `id`: Unique identifier
   - `name`: Full name

3. **Asset**
   - `id`: Unique identifier
   - `name`: Name of the asset
   - `assetClass`: LaunchVehicle, Spacecraft, Payload, GroundSegment
   - `status`: Active, InDevelopment, Retired

4. **Technology**
   - `id`: Unique identifier
   - `name`: Name of the technology
   - `domain`: Broad category (e.g., Propulsion, RF, GNC)

5. **Publication**
   - `id`: Unique identifier
   - `title`: Title of the document
   - `pubType`: Paper, Patent, PressRelease, GovernmentFiling
   - `date`: Publication date
   - `url`: Verifiable source link

6. **FinancialEvent**
   - `id`: Unique identifier
   - `eventType`: Grant, Contract, Investment
   - `value`: Monetary value (optional, if public)
   - `date`: Date of the event

## Relationships (Edges)

All edges inherently possess provenance properties:
- `source_id`: Pointer to the `Publication` or source entity verifying this claim.
- `confidence`: VERIFIED, SOURCE-BACKED, INFERRED.
- `valid_from` / `valid_to`: Temporal bounds (optional).

* **AFFILIATED_WITH**: Person -> Organization (Properties: `role`)
* **MANUFACTURES**: Organization -> Asset
* **OPERATES**: Organization -> Asset
* **AUTHOR_OF**: Person/Organization -> Publication
* **FUNDS**: Organization -> FinancialEvent -> Organization/Asset/Research
* **INVOLVES_TECH**: Publication/Asset/Grant -> Technology
* **CLAIMS_CAPABILITY**: Publication -> Asset/Technology
