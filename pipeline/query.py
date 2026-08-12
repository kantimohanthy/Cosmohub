from pipeline.models import KnowledgeGraph, Confidence, EntityType

class QueryEngine:
    def __init__(self, kg: KnowledgeGraph):
        self.kg = kg

    def run_query_orgs_developing_launch_vehicles(self):
        """Which European organizations are developing small launch vehicles?"""
        results = []
        for c_id, claim in self.kg.claims.items():
            if claim.predicate == "MANUFACTURES" and claim.status == "ACTIVE" and claim.confidence != Confidence.SYNTHETIC:
                subj = self.kg.entities.get(claim.subject)
                obj = self.kg.entities.get(claim.object)

                if subj and obj and obj.type == EntityType.LaunchVehicle:
                    # Also check if it's European (has hq property)
                    if "Germany" in subj.properties.get("hq", "") or "Europe" in subj.properties.get("hq", ""):
                        source = self.kg.sources.get(claim.source_id) if claim.source_id else None
                        results.append({
                            "organization": subj.properties.get("name"),
                            "launch_vehicle": obj.properties.get("name"),
                            "provenance": {
                                "source_url": source.url if source else None,
                                "evidence": claim.evidence,
                                "confidence": claim.confidence.name
                            }
                        })
        return results

    def run_query_orgs_received_funding(self):
        """Which organizations received funding?"""
        results = []
        for c_id, claim in self.kg.claims.items():
            if claim.predicate == "RECEIVED_FUNDING" and claim.status == "ACTIVE" and claim.confidence != Confidence.SYNTHETIC:
                subj = self.kg.entities.get(claim.subject)
                obj = self.kg.entities.get(claim.object)

                if subj and obj and obj.type == EntityType.FundingEvent:
                    source = self.kg.sources.get(claim.source_id) if claim.source_id else None
                    results.append({
                        "organization": subj.properties.get("name"),
                        "funding_event": obj.properties.get("name"),
                        "value": obj.properties.get("value"),
                        "provenance": {
                            "source_url": source.url if source else None,
                            "evidence": claim.evidence,
                            "confidence": claim.confidence.name
                        }
                    })
        return results

    def run_query_source_backed_claims(self):
        """Which claims are source-backed?"""
        results = []
        for c_id, claim in self.kg.claims.items():
            if claim.confidence == Confidence.SOURCE_BACKED and claim.status == "ACTIVE":
                source = self.kg.sources.get(claim.source_id) if claim.source_id else None
                subj = self.kg.entities.get(claim.subject)
                obj = self.kg.entities.get(claim.object)
                results.append({
                    "claim_id": claim.id,
                    "fact": f"{subj.properties.get('name', claim.subject)} {claim.predicate} {obj.properties.get('name', claim.object) if obj else claim.object}",
                    "provenance": {
                        "source_url": source.url if source else None,
                        "evidence": claim.evidence,
                        "confidence": claim.confidence.name
                    }
                })
        return results
