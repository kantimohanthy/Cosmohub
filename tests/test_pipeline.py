import unittest
import time
from pipeline.models import KnowledgeGraph, Source, Entity, Claim, SourceType, Confidence, EntityType
from pipeline.validation import validate_graph, ValidationError
from pipeline.ingestion import ingest_esa_boost_data
from pipeline.query import QueryEngine

class TestCosmoHubPipeline(unittest.TestCase):
    def setUp(self):
        self.kg = KnowledgeGraph()
        self.timestamp = str(int(time.time()))

    def test_entity_validation_invalid_type(self):
        # Create entity with invalid type string disguised as enum value to test enum wrapper in validation
        e = Entity(id="e1", type="InvalidType", properties={})
        self.kg.add_entity(e)
        self.kg.add_claim(Claim(id="c1", subject="e1", predicate="HAS_PROPERTY", object="val", source_id=None, evidence=None, confidence=Confidence.UNVERIFIED, status="ACTIVE", observed_at=self.timestamp))
        with self.assertRaises(ValidationError) as ctx:
            validate_graph(self.kg)
        self.assertIn("Invalid EntityType found", str(ctx.exception))

    def test_claim_validation_dangling_references(self):
        self.kg.add_claim(Claim(id="c1", subject="missing", predicate="MANUFACTURES", object="missing2", source_id=None, evidence=None, confidence=Confidence.UNVERIFIED, status="ACTIVE", observed_at=self.timestamp))
        with self.assertRaises(ValidationError) as ctx:
            validate_graph(self.kg)
        self.assertIn("missing subject entity", str(ctx.exception))
        self.assertIn("missing object entity", str(ctx.exception))

    def test_provenance_validation(self):
        self.kg.add_entity(Entity(id="e1", type=EntityType.Organization))
        self.kg.add_entity(Entity(id="e2", type=EntityType.LaunchVehicle))
        # SOURCE_BACKED claim without source_id
        self.kg.add_claim(Claim(id="c1", subject="e1", predicate="MANUFACTURES", object="e2", source_id=None, evidence=None, confidence=Confidence.SOURCE_BACKED, status="ACTIVE", observed_at=self.timestamp))
        with self.assertRaises(ValidationError) as ctx:
            validate_graph(self.kg)
        self.assertIn("SOURCE_BACKED claim missing source_id", str(ctx.exception))

        # SOURCE_BACKED claim with source_id but missing evidence
        self.kg.sources["src1"] = Source(id="src1", title="", publisher="", url="", published_at="", retrieved_at="", source_type=SourceType.PRIMARY_INSTITUTIONAL, source_quality=1)
        self.kg.claims["c1"].source_id = "src1"
        with self.assertRaises(ValidationError) as ctx:
            validate_graph(self.kg)
        self.assertIn("SOURCE_BACKED claim must have evidence", str(ctx.exception))

    def test_temporal_fields_and_synthetic_isolation(self):
        # Using real ingested data
        kg = ingest_esa_boost_data()
        validate_graph(kg) # Should pass

        engine = QueryEngine(kg)

        # Test query 1
        q1 = engine.run_query_orgs_developing_launch_vehicles()
        self.assertEqual(len(q1), 2)
        orgs = [res["organization"] for res in q1]
        self.assertIn("Isar Aerospace", orgs)
        self.assertIn("Rocket Factory Augsburg", orgs)

        # Check that the temporal (SUPERSEDED) "Old Rocket" is not in the active query results
        for res in q1:
            self.assertNotEqual(res["launch_vehicle"], "Old Rocket")

        # Check synthetic data is isolated
        synth_found = False
        for c_id, c in kg.claims.items():
            if c.confidence == Confidence.SYNTHETIC:
                synth_found = True
        self.assertTrue(synth_found, "Synthetic data should be in graph")

        # but shouldn't leak into specific queries due to filters
        q_sb = engine.run_query_source_backed_claims()
        for res in q_sb:
            self.assertNotEqual(res["provenance"]["confidence"], "SYNTHETIC")

if __name__ == '__main__':
    unittest.main()
