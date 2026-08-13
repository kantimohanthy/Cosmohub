const assert = require('assert');
const crypto = require('crypto');
const { EntityNormalizer, AdvancedEntityResolver, Validator } = require('../js/ingestion/pipeline.js');
const { FixtureConnector, HttpConnector } = require('../js/ingestion/connectors.js');
const { Entity, MatchStatus, Conflict, Claim, Source } = require('../js/core/models.js');
const { InMemoryRepository } = require('../js/core/repository.js');

async function testPipeline() {
    console.log("Running Extended Ingestion Pipeline Tests...");

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

    // Validation - Temporal Logic
    const repo = new InMemoryRepository();
    repo.saveEntity(isar);
    const validClaim = new Claim("c_temp_1", "org_isar", "TEST", null, "doc_1", "SOURCE_BACKED", "ev", "test", null, null, null, "2020-01-01", "2024-01-01", "ACTIVE");
    const invalidClaim = new Claim("c_temp_2", "org_isar", "TEST", null, "doc_1", "SOURCE_BACKED", "ev", "test", null, null, null, "2024-01-01", "2020-01-01", "ACTIVE");
    const validator = new Validator();
    assert.strictEqual(validator.validateClaim(validClaim, repo), true, "Valid temporal claim rejected");
    assert.strictEqual(validator.validateClaim(invalidClaim, repo), false, "Invalid temporal claim accepted");
    console.log("✔ Temporal Validation passed");

    // Connector Hashing and HTTP Errors
    const dummySrc = new Source("src_dummy", "Pub", "Title", "http://fake.url", "2024-01-01", "API");
    const httpConn = new HttpConnector(dummySrc, 1); // 1ms timeout
    const fetchErr = await httpConn.fetch();
    assert.strictEqual(fetchErr.status, "FAILED", "HttpConnector failed to return FAILED status on error");
    assert.ok(fetchErr.errorType === "TIMEOUT" || fetchErr.errorType === "NETWORK_FAILURE", "HttpConnector returned incorrect error type");
    console.log("✔ HttpConnector error handling passed");
}

testPipeline().catch(err => {
    console.error(err);
    process.exit(1);
});
