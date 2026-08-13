const assert = require('assert');
const { EntityNormalizer, AdvancedEntityResolver } = require('../js/ingestion/pipeline.js');
const { Entity, MatchStatus, Conflict } = require('../js/core/models.js');

function testPipeline() {
    console.log("Running Ingestion Pipeline & Resolution Tests...");

    // Normalization testing
    const normalizer = new EntityNormalizer();
    assert.strictEqual(normalizer.normalize(" European Space Agency (ESA) "), "european space agency esa", "Normalization failed");
    assert.strictEqual(normalizer.normalize("Isar-Aerospace GmbH"), "isar aerospace gmbh", "Punctuation stripping failed");
    console.log("✔ Normalization passed");

    // Advanced Resolution Testing (Match/Possible/No Match)
    const resolver = new AdvancedEntityResolver();
    const isar = new Entity("org_isar", "Isar Aerospace", "Organization", ["Isar Aerospace GmbH"]);
    resolver.registerEntity(isar);

    // MATCH
    const res1 = resolver.resolveAdvanced("Isar Aerospace GmbH");
    assert.strictEqual(res1.matchStatus, MatchStatus.MATCH);
    assert.strictEqual(res1.id, "org_isar");

    // POSSIBLE MATCH (Substring)
    const res2 = resolver.resolveAdvanced("Isar");
    assert.strictEqual(res2.matchStatus, MatchStatus.POSSIBLE_MATCH);
    assert.strictEqual(res2.id, "org_isar");

    // NO MATCH
    const res3 = resolver.resolveAdvanced("SpaceX");
    assert.strictEqual(res3.matchStatus, MatchStatus.NO_MATCH);
    assert.strictEqual(res3.id, null);
    console.log("✔ Advanced Resolution passed");

    // Conflict Model test
    const conflict = new Conflict("conf_1", "claim_a", "claim_b", "Differing foundation dates");
    assert.strictEqual(conflict.status, "UNRESOLVED");
    console.log("✔ Conflict Model initialized");
}

testPipeline();
