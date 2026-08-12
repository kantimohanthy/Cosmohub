import json
from pipeline.models import KnowledgeGraph, Confidence

def export_to_ui(kg: KnowledgeGraph, filepath="data/ecosystem.js"):
    ui_entities = []
    for e_id, e in kg.entities.items():
        # Do not export synthetic entities if they are only connected to synthetic claims
        # For simplicity, we just export all and filter relationships
        ent_data = {
            "id": e.id,
            "type": e.type.value,
            **e.properties
        }
        ui_entities.append(ent_data)

    ui_relationships = []
    for c_id, c in kg.claims.items():
        if c.status == "ACTIVE" and c.confidence != Confidence.SYNTHETIC:
            source_doc = kg.sources.get(c.source_id) if c.source_id else None
            ui_relationships.append({
                "source": c.subject,
                "target": c.object,
                "type": c.predicate,
                "properties": {
                    "confidence": c.confidence.value,
                    "evidence": c.evidence,
                    "source_id": c.source_id,
                    "source_url": source_doc.url if source_doc else None
                }
            })

    export_data = {
        "entities": ui_entities,
        "relationships": ui_relationships
    }

    js_content = f"const ecosystemData = {json.dumps(export_data, indent=2)};"
    with open(filepath, "w") as f:
        f.write(js_content)
