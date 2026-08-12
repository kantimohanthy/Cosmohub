from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any
from enum import Enum

class SourceType(Enum):
    PRIMARY_INSTITUTIONAL = "PRIMARY_INSTITUTIONAL"
    GOVERNMENT_DOCUMENT = "GOVERNMENT_DOCUMENT"
    PRESS_RELEASE = "PRESS_RELEASE"
    COMPANY_PUBLICATION = "COMPANY_PUBLICATION"
    NEWS_ARTICLE = "NEWS_ARTICLE"

class Confidence(Enum):
    SOURCE_BACKED = "SOURCE_BACKED"
    INFERRED = "INFERRED"
    UNVERIFIED = "UNVERIFIED"
    SYNTHETIC = "SYNTHETIC"
    VERIFIED = "VERIFIED"

class EntityType(Enum):
    Organization = "Organization"
    Person = "Person"
    LaunchVehicle = "LaunchVehicle"
    Technology = "Technology"
    Mission = "Mission"
    FundingEvent = "FundingEvent"

@dataclass
class Source:
    id: str
    title: str
    publisher: str
    url: str
    published_at: str
    retrieved_at: str
    source_type: SourceType
    source_quality: int # 1 (highest) to 5 (lowest)

@dataclass
class Document:
    # Represent the source document independently from claims
    id: str
    source_id: str
    raw_content: str
    parsed_at: str

@dataclass
class Entity:
    id: str
    type: EntityType
    properties: Dict[str, Any] = field(default_factory=dict)

@dataclass
class Claim:
    id: str
    subject: str # Entity ID
    predicate: str
    object: str # Entity ID or literal value depending on schema
    source_id: Optional[str]
    evidence: Optional[str]
    confidence: Confidence
    status: str # e.g. ACTIVE, RETRACTED, CONFLICTED
    observed_at: str
    valid_from: Optional[str] = None
    valid_to: Optional[str] = None

@dataclass
class KnowledgeGraph:
    sources: Dict[str, Source] = field(default_factory=dict)
    documents: Dict[str, Document] = field(default_factory=dict)
    entities: Dict[str, Entity] = field(default_factory=dict)
    claims: Dict[str, Claim] = field(default_factory=dict)

    def add_source(self, source: Source):
        self.sources[source.id] = source

    def add_document(self, document: Document):
        self.documents[document.id] = document

    def add_entity(self, entity: Entity):
        self.entities[entity.id] = entity

    def add_claim(self, claim: Claim):
        self.claims[claim.id] = claim
