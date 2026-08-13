const assert = require('assert');
const { Entity, Claim, Source, Document } = require('../js/core/models.js');
const { EntityResolver } = require('../js/core/resolver.js');
const { QueryEngine } = require('../js/core/query.js');

function runTests() {
    console.log("Running Core Architecture Tests...");

    // 1. Entity Resolution Test
    const resolver = new EntityResolver();
    const esa = new Entity("org_esa", "European Space Agency", "Organization", ["ESA", "European Space Agency (ESA)"]);
    resolver.registerEntity(esa);

    assert.strictEqual(resolver.resolve("ESA"), "org_esa", "Failed to resolve acronym alias");
    assert.strictEqual(resolver.resolve("european space agency (esa)"), "org_esa", "Failed to resolve case-insensitive long alias");
    assert.strictEqual(resolver.resolve("org_esa"), "org_esa", "Failed to resolve direct ID");
    assert.strictEqual(resolver.resolve("NASA"), null, "Failed to return null for unknown entity");
    console.log("✔ Entity Resolution passed");

    // 2. Query Engine & Provenance Test
    const src = new Source("src_1", "ESA", "Press Release", "http://esa.int", "2024-01-01", "Primary");
    const doc = new Document("doc_1", "src_1", "Doc Title", "http://esa.int/doc", "Text snippet", "2024-01-01");
    const claim = new Claim("c_1", "org_esa", "FUNDS", "proj_1", "doc_1", "SOURCE_BACKED", "ESA funded Project 1", "2024-01-01", "2024-05-01", "ACTIVE");

    const engine = new QueryEngine([esa], [claim], [src], [doc]);

    const fetchedClaim = engine.getClaimsForEntity("org_esa")[0];
    assert.strictEqual(fetchedClaim.predicate, "FUNDS", "Failed to fetch claim");

    const prov = engine.getProvenanceForClaim("c_1");
    assert.strictEqual(prov.document.id, "doc_1", "Failed to fetch provenance document");
    assert.strictEqual(prov.source.publisher, "ESA", "Failed to fetch provenance source");
    console.log("✔ Provenance Traversal passed");

    // 3. Temporal Model Validation
    const oldClaim = new Claim("c_2", "org_esa", "EMPLOYS", "p_1", null, "SYNTHETIC", null, null, null, "SUPERSEDED", "2010", "2020");
    assert.strictEqual(oldClaim.validUntil, "2020", "Failed to capture temporal end date");
    assert.strictEqual(oldClaim.provenanceStatus, "SUPERSEDED", "Failed to capture temporal status");
    console.log("✔ Temporal Modeling passed");

    console.log("All tests passed successfully.");
}

runTests();
