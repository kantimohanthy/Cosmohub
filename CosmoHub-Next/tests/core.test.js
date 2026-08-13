const assert = require('assert');
const { Entity, Claim, Source, Document } = require('../js/core/models.js');
const { EntityResolver } = require('../js/core/resolver.js');
const { QueryEngine } = require('../js/core/query.js');

function runTests() {
    console.log("Running Core Architecture v0.2.1 Tests...");

    // 1. Entity Resolution Normalization Test
    const resolver = new EntityResolver();
    const isar = new Entity("org_isar", "Isar Aerospace", "Organization", ["Isar Aerospace GmbH", " Isar   "]);
    resolver.registerEntity(isar);

    assert.strictEqual(resolver.resolve("Isar Aerospace"), "org_isar", "Failed canonical resolution");
    assert.strictEqual(resolver.resolve("isar aerospace gmbh"), "org_isar", "Failed punctuation stripping alias resolution");
    assert.strictEqual(resolver.resolve("ISAR"), "org_isar", "Failed whitespace and case normalization");
    assert.strictEqual(resolver.resolve("SpaceX"), null, "Failed to return null for unresolved entity");
    console.log("✔ Entity Resolution Normalization passed");

    // 2. Query Engine & Extended Provenance Test
    const src = new Source("src_1", "ESA", "Press Release", "http://esa.int", "2024-01-01", "Primary", "High Trust");
    const doc = new Document("doc_1", "src_1", "Doc Title", "http://esa.int/doc", "Text snippet", "2024-01-01", "Report");
    const claim = new Claim("c_1", "org_esa", "FUNDS", "proj_1", "doc_1", "SOURCE_BACKED", "ESA funded Project 1", "Manual", "2024-01-01", "2024-05-01", "2024-05-02", "2024-01-01", null, "ACTIVE");

    // Add Entities to test type querying and shared refs
    const org = new Entity("org_esa", "ESA", "Organization");
    const proj = new Entity("proj_1", "Project 1", "Project");

    const engine = new QueryEngine([org, proj], [claim], [src], [doc]);

    const fetchedClaim = engine.getClaimsForEntity("org_esa")[0];
    assert.strictEqual(fetchedClaim.predicate, "FUNDS", "Failed to fetch claim");

    const prov = engine.getProvenanceForClaim("c_1");
    assert.strictEqual(prov.document.id, "doc_1", "Failed to fetch provenance document");
    assert.strictEqual(prov.source.publisher, "ESA", "Failed to fetch provenance source");
    assert.strictEqual(prov.evidence, "ESA funded Project 1", "Failed to fetch provenance evidence");

    const ev = engine.getEvidenceForClaim("c_1");
    assert.strictEqual(ev, "ESA funded Project 1", "Failed standalone evidence query");

    const projects = engine.getEntitiesByType("Project");
    assert.strictEqual(projects.length, 1, "Failed type query");
    assert.strictEqual(projects[0].id, "proj_1", "Failed type query content");

    console.log("✔ Query Engine & Provenance Chain passed");

    // 3. Temporal Model Validation
    assert.strictEqual(claim.validUntil, null, "Failed to capture temporal end date");
    assert.strictEqual(claim.provenanceStatus, "ACTIVE", "Failed to capture temporal status");
    console.log("✔ Temporal Modeling passed");

    console.log("All tests passed successfully.");
}

runTests();

function runGlobalInstitutionTests() {
    console.log("Running Global Institution Tests...");
    const { Entity, Claim, Source, Document } = require('../js/core/models.js');
    const { QueryEngine } = require('../js/core/query.js');

    const tum = new Entity("org_tum", "TUM", "Organization", [], { latitude: 48.1496, longitude: 11.5683 });
    const isar = new Entity("org_isar", "Isar Aerospace", "Organization");
    const parentClaim = new Claim("c_tum_parent", "org_tum", "PARENT_OF", "org_isar", null, "SYNTHETIC", null, null, null, null, null, null, null, "ACTIVE");

    const engine = new QueryEngine([tum, isar], [parentClaim], [], []);

    // Test Geography Fields
    const fetchedTum = engine.getEntity("org_tum");
    assert.strictEqual(fetchedTum.metadata.latitude, 48.1496, "Failed to retrieve correct latitude");
    assert.strictEqual(fetchedTum.metadata.longitude, 11.5683, "Failed to retrieve correct longitude");

    // Test Parent/Subsidiary Traversal
    const isarRels = engine.getRelatedEntities("org_isar");
    const parentRel = isarRels.find(r => r.predicate === "PARENT_OF" && r.direction === "in");
    assert.ok(parentRel, "Failed to resolve inbound subsidiary relationship");
    assert.strictEqual(parentRel.entity.id, "org_tum", "Failed to resolve correct parent entity");

    console.log("✔ Global Institution Tests passed");
}

runGlobalInstitutionTests();
