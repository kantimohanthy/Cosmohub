# CosmoHub Product Architecture

## Overview
CosmoHub is designed with a strict two-layer architecture separating intelligence extraction from user experience.

### 1. INTELLIGENCE CORE
The underlying system of record.
- **ONTOLOGY**: Defines the allowed schema (`Organization`, `Technology`, `Publication`, `LearningPath`).
- **PROVENANCE**: Enforces that facts (`Claims`) are derived from a verifiable `Source`.
- **DATA INTEGRITY**: Validates temporal bounds, explicit references, and isolates `SYNTHETIC` mock data.
- **OUTPUT**: An exported property graph representing the truth of the ecosystem (currently exported as `data/ecosystem.js`).

### 2. PRODUCT LAYERS
The UX applications that consume the unified Core.
- **INSTITUTION INTELLIGENCE**: Displays the `Organization` nodes and aggregates their connected `Mentions`, `Missions`, and `Technologies`.
- **SPACE NEWS**: Consumes `NewsItem` nodes. A news item is not an isolated string; it is a node connected directly to the ontology (e.g., News -> Mentions -> ESA).
- **RESEARCH INTELLIGENCE**: Consumes `Publication` nodes linked via the `CLAIMS_CAPABILITY` or `AUTHOR_OF` predicates to technologies and institutions.
- **GAMIFIED LEARNING**: The "Learn" entry point. Consumes `LearningPath`, `Lesson`, `Quiz`, and `Project` nodes.

## The Core Product Principle
CosmoHub is not a course marketplace. The learning system is the **Entry Point** to the deep-tech infrastructure.

**Flow:**
DISCOVER (News) → LEARN (Quizzes, Paths) → EXPLORE (Ontology/Missions) → BUILD (Projects) → RESEARCH (Publications) → CONNECT (Opportunities).

Because all product layers consume the *same* Intelligence Core, an entity like "ESA" is never duplicated. It exists once in the graph, and the News, Gamification, and Institution views simply project different edges connected to that central canonical node.
