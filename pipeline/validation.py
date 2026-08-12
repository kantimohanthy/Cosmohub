from pipeline.models import KnowledgeGraph, Confidence, EntityType

class ValidationError(Exception):
    pass

# Permitted predicates for v0.1
VALID_PREDICATES = {
    "MANUFACTURES",
    "RECEIVED_FUNDING",
    "PROVIDED_FUNDING",
    "EMPLOYS",
    "IMPLEMENTS_TECHNOLOGY",
    "HAS_PROPERTY" # for assigning direct properties like names
}

def validate_graph(kg: KnowledgeGraph):
    errors = []

    for claim_id, claim in kg.claims.items():
        # Check valid predicate
        if claim.predicate not in VALID_PREDICATES:
            errors.append(f"Claim {claim_id}: Invalid predicate '{claim.predicate}'.")

        # Check dangling subject
        if claim.subject not in kg.entities:
            errors.append(f"Claim {claim_id}: References missing subject entity '{claim.subject}'.")

        # Check dangling object (if it's not a HAS_PROPERTY claim)
        if claim.predicate != "HAS_PROPERTY" and claim.object not in kg.entities:
            errors.append(f"Claim {claim_id}: References missing object entity '{claim.object}'.")

        # Check missing source for source-backed claims
        if claim.confidence == Confidence.SOURCE_BACKED:
            if not claim.source_id:
                errors.append(f"Claim {claim_id}: SOURCE_BACKED claim missing source_id.")
            elif claim.source_id not in kg.sources:
                errors.append(f"Claim {claim_id}: References missing source '{claim.source_id}'.")
            if not claim.evidence:
                errors.append(f"Claim {claim_id}: SOURCE_BACKED claim must have evidence.")

        # Check valid entity types
        try:
            if claim.subject in kg.entities:
                EntityType(kg.entities[claim.subject].type)
            if claim.predicate != "HAS_PROPERTY" and claim.object in kg.entities:
                EntityType(kg.entities[claim.object].type)
        except ValueError as e:
             errors.append(f"Invalid EntityType found: {str(e)}")

    if errors:
        raise ValidationError("\n".join(errors))
    return True
