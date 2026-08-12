from pipeline.models import KnowledgeGraph, Source, Document, Entity, Claim, SourceType, Confidence, EntityType
import time

def ingest_esa_boost_data() -> KnowledgeGraph:
    kg = KnowledgeGraph()
    timestamp = str(int(time.time()))

    # 1. Source Model
    src_isar = Source(
        id="src_esa_isar_boost",
        title="Boost! support for Isar Aerospace Spectrum launch vehicle",
        publisher="European Space Agency",
        url="https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Isar_Aerospace_Spectrum_launch_vehicle",
        published_at="2020-11-03",
        retrieved_at=timestamp,
        source_type=SourceType.PRIMARY_INSTITUTIONAL,
        source_quality=1
    )
    kg.add_source(src_isar)

    src_rfa = Source(
        id="src_esa_rfa_boost",
        title="Boost! support for Rocket Factory Augsburg launch vehicle",
        publisher="European Space Agency",
        url="https://www.esa.int/Enabling_Support/Space_Transportation/Boost!_support_for_Rocket_Factory_Augsburg_launch_vehicle",
        published_at="2020-11-03",
        retrieved_at=timestamp,
        source_type=SourceType.PRIMARY_INSTITUTIONAL,
        source_quality=1
    )
    kg.add_source(src_rfa)

    # 2. Document Model
    doc_isar = Document(
        id="doc_isar_1",
        source_id="src_esa_isar_boost",
        raw_content="ESA is supporting the development of Isar Aerospace's Spectrum launch vehicle. The contract is worth €1.5M.",
        parsed_at=timestamp
    )
    kg.add_document(doc_isar)

    doc_rfa = Document(
        id="doc_rfa_1",
        source_id="src_esa_rfa_boost",
        raw_content="ESA is co-funding Rocket Factory Augsburg's RFA One launch vehicle. The support is €500K.",
        parsed_at=timestamp
    )
    kg.add_document(doc_rfa)

    # 4. Entity Model
    # Entities - Orgs
    esa = Entity(id="org_esa", type=EntityType.Organization, properties={"name": "European Space Agency (ESA)"})
    isar = Entity(id="org_isar", type=EntityType.Organization, properties={"name": "Isar Aerospace", "hq": "Germany"})
    rfa = Entity(id="org_rfa", type=EntityType.Organization, properties={"name": "Rocket Factory Augsburg", "hq": "Germany"})

    # Entities - Vehicles
    spectrum = Entity(id="lv_spectrum", type=EntityType.LaunchVehicle, properties={"name": "Spectrum"})
    rfa_one = Entity(id="lv_rfa_one", type=EntityType.LaunchVehicle, properties={"name": "RFA One"})

    # Entities - Funding
    fund_isar = Entity(id="fund_isar_esa", type=EntityType.FundingEvent, properties={"value": "1500000 EUR", "name": "ESA Boost! Isar"})
    fund_rfa = Entity(id="fund_rfa_esa", type=EntityType.FundingEvent, properties={"value": "500000 EUR", "name": "ESA Boost! RFA"})

    for e in [esa, isar, rfa, spectrum, rfa_one, fund_isar, fund_rfa]:
        kg.add_entity(e)

    # 3 & 5 & 6. Claim & Relationship Model with Evidence

    # Isar manufactures Spectrum
    kg.add_claim(Claim(
        id="c_isar_mfg_spec",
        subject="org_isar",
        predicate="MANUFACTURES",
        object="lv_spectrum",
        source_id=src_isar.id,
        evidence="ESA is supporting the development of Isar Aerospace's Spectrum launch vehicle",
        confidence=Confidence.SOURCE_BACKED,
        status="ACTIVE",
        observed_at=timestamp,
        valid_from="2020-11-03"
    ))

    # Isar received funding
    kg.add_claim(Claim(
        id="c_isar_recv_fund",
        subject="org_isar",
        predicate="RECEIVED_FUNDING",
        object="fund_isar_esa",
        source_id=src_isar.id,
        evidence="ESA is supporting... The contract is worth €1.5M.",
        confidence=Confidence.SOURCE_BACKED,
        status="ACTIVE",
        observed_at=timestamp,
        valid_from="2020-11-03"
    ))

    # ESA provided funding
    kg.add_claim(Claim(
        id="c_esa_prov_fund_isar",
        subject="org_esa",
        predicate="PROVIDED_FUNDING",
        object="fund_isar_esa",
        source_id=src_isar.id,
        evidence="ESA is supporting... The contract is worth €1.5M.",
        confidence=Confidence.SOURCE_BACKED,
        status="ACTIVE",
        observed_at=timestamp,
        valid_from="2020-11-03"
    ))

    # RFA manufactures RFA One
    kg.add_claim(Claim(
        id="c_rfa_mfg_one",
        subject="org_rfa",
        predicate="MANUFACTURES",
        object="lv_rfa_one",
        source_id=src_rfa.id,
        evidence="Rocket Factory Augsburg's RFA One launch vehicle",
        confidence=Confidence.SOURCE_BACKED,
        status="ACTIVE",
        observed_at=timestamp,
        valid_from="2020-11-03"
    ))

    # RFA received funding
    kg.add_claim(Claim(
        id="c_rfa_recv_fund",
        subject="org_rfa",
        predicate="RECEIVED_FUNDING",
        object="fund_rfa_esa",
        source_id=src_rfa.id,
        evidence="ESA is co-funding Rocket Factory Augsburg... The support is €500K.",
        confidence=Confidence.SOURCE_BACKED,
        status="ACTIVE",
        observed_at=timestamp,
        valid_from="2020-11-03"
    ))

    # ESA provided funding
    kg.add_claim(Claim(
        id="c_esa_prov_fund_rfa",
        subject="org_esa",
        predicate="PROVIDED_FUNDING",
        object="fund_rfa_esa",
        source_id=src_rfa.id,
        evidence="ESA is co-funding Rocket Factory Augsburg... The support is €500K.",
        confidence=Confidence.SOURCE_BACKED,
        status="ACTIVE",
        observed_at=timestamp,
        valid_from="2020-11-03"
    ))

    # Synthetic demo data to isolate and demonstrate UX product layers
    kg.add_entity(Entity(id="person_synthetic", type=EntityType.Person, properties={"name": "John Doe (Demo)"}))
    kg.add_claim(Claim(
        id="c_synth_1",
        subject="person_synthetic",
        predicate="EMPLOYS",
        object="org_isar",
        source_id=None,
        evidence=None,
        confidence=Confidence.SYNTHETIC,
        status="ACTIVE",
        observed_at=timestamp
    ))

    # Synthetic News
    kg.add_entity(Entity(id="news_1", type=EntityType.NewsItem, properties={
        "title": "[SYNTHETIC] ESA announces new SATCOM initiative",
        "summary": "Simulated news article demonstrating news layer connected to core entities.",
        "date": "2024-05-01",
        "topic": "Satellites"
    }))
    kg.add_claim(Claim(id="c_synth_news_1", subject="news_1", predicate="MENTIONS", object="org_esa", source_id=None, evidence=None, confidence=Confidence.SYNTHETIC, status="ACTIVE", observed_at=timestamp))

    # Synthetic Learning Path (connected to core tech)
    kg.add_entity(Entity(id="tech_satcom", type=EntityType.Technology, properties={"name": "Satellite Communications"}))
    kg.add_entity(Entity(id="path_satcom", type=EntityType.LearningPath, properties={"title": "SATCOM Fundamentals"}))
    kg.add_entity(Entity(id="lesson_satcom_1", type=EntityType.Lesson, properties={"title": "Link Budgets", "xp": 50}))
    kg.add_entity(Entity(id="quiz_satcom_1", type=EntityType.Quiz, properties={"title": "RF Fundamentals Quiz", "xp": 100}))
    kg.add_entity(Entity(id="proj_satcom_1", type=EntityType.Project, properties={"title": "Build a Yagi Antenna", "xp": 500}))
    kg.add_entity(Entity(id="opp_satcom", type=EntityType.Opportunity, properties={"title": "SATCOM Graduate Fellowship", "status": "Open"}))

    kg.add_claim(Claim(id="c_synth_path_tech", subject="path_satcom", predicate="COVERS", object="tech_satcom", source_id=None, evidence=None, confidence=Confidence.SYNTHETIC, status="ACTIVE", observed_at=timestamp))
    kg.add_claim(Claim(id="c_synth_path_les", subject="path_satcom", predicate="INCLUDES_LESSON", object="lesson_satcom_1", source_id=None, evidence=None, confidence=Confidence.SYNTHETIC, status="ACTIVE", observed_at=timestamp))
    kg.add_claim(Claim(id="c_synth_path_quiz", subject="path_satcom", predicate="INCLUDES_QUIZ", object="quiz_satcom_1", source_id=None, evidence=None, confidence=Confidence.SYNTHETIC, status="ACTIVE", observed_at=timestamp))
    kg.add_claim(Claim(id="c_synth_path_proj", subject="path_satcom", predicate="RELATES_TO_PROJECT", object="proj_satcom_1", source_id=None, evidence=None, confidence=Confidence.SYNTHETIC, status="ACTIVE", observed_at=timestamp))
    kg.add_claim(Claim(id="c_synth_esa_opp", subject="org_esa", predicate="OFFERS_OPPORTUNITY", object="opp_satcom", source_id=None, evidence=None, confidence=Confidence.SYNTHETIC, status="ACTIVE", observed_at=timestamp))

    # 7. Temporal Model example (Superseded fact)
    # E.g. A claim that is no longer valid
    kg.add_entity(Entity(id="lv_retired_demo", type=EntityType.LaunchVehicle, properties={"name": "Old Rocket"}))
    kg.add_claim(Claim(
        id="c_isar_mfg_old",
        subject="org_isar",
        predicate="MANUFACTURES",
        object="lv_retired_demo",
        source_id=src_isar.id, # Pretend it was in the source
        evidence="Isar manufactures Old Rocket",
        confidence=Confidence.SOURCE_BACKED,
        status="SUPERSEDED",
        observed_at=timestamp,
        valid_from="2018-01-01",
        valid_to="2020-01-01" # No longer valid
    ))

    return kg
