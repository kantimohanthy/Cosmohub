# CosmoHub Ontology

## Core Entities

1.  **Organization**
    *   `id`: Unique identifier
    *   `name`: Name of the organization
    *   `type`: University, Company, Agency, Research Institute
    *   `description`: Brief summary

2.  **Person**
    *   `id`: Unique identifier
    *   `name`: Full name
    *   `role`: Current role (e.g., Researcher, Engineer, Student)
    *   `bio`: Brief background

3.  **Mission**
    *   `id`: Unique identifier
    *   `name`: Mission name
    *   `status`: Active, Planned, Completed
    *   `objective`: Primary goal

4.  **Research**
    *   `id`: Unique identifier
    *   `title`: Title of the research paper/project
    *   `domain`: Technology domain (e.g., Propulsion, GNC)
    *   `url`: Link to publication

5.  **Technology**
    *   `id`: Unique identifier
    *   `name`: Technology name
    *   `category`: Category (e.g., Hardware, Software)
    *   `description`: What it does

6.  **Opportunity**
    *   `id`: Unique identifier
    *   `title`: Role/Opportunity title
    *   `type`: Job, Fellowship, Grant
    *   `status`: Open, Closed

## Relationships

*   **WORKS_AT**: Person -> Organization
*   **STUDIES_AT**: Person -> Organization (University)
*   **PART_OF**: Organization -> Organization (e.g., Lab part of University)
*   **RESEARCHES**: Person/Organization -> Research/Technology
*   **BUILDS**: Person/Organization -> Technology/Mission
*   **FUNDS**: Organization -> Mission/Research/Organization
*   **PARTICIPATES_IN**: Person/Organization -> Mission
*   **RELATED_TO**: Research/Technology -> Research/Technology/Mission
*   **REQUIRES**: Mission/Opportunity -> Technology/Skill
*   **OFFERS**: Organization -> Opportunity
