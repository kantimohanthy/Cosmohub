const fs = require('fs');
const crypto = require('crypto');
const { Source, Document } = require('../core/models.js');

class IngestionError {
    constructor(status, errorType, sourceUrl, retryable) {
        this.status = status; // e.g. "FAILED"
        this.errorType = errorType; // e.g. "TIMEOUT", "404", "INVALID_JSON"
        this.sourceUrl = sourceUrl;
        this.retryable = retryable;
    }
}

class SourceConnector {
    constructor(sourceModel) {
        this.source = sourceModel;
    }

    // Virtual
    async fetch() {
        throw new Error("fetch() must be implemented by subclass");
    }

    _generateDocument(rawContent, contentType) {
        const hash = crypto.createHash('sha256').update(rawContent).digest('hex');
        return {
            document: new Document(
                `doc_${Date.now()}_${hash.substring(0, 8)}`,
                this.source.id,
                this.source.title,
                this.source.url,
                rawContent,
                this.source.publicationDate,
                contentType,
                hash
            ),
            hash: hash
        };
    }
}

class FixtureConnector extends SourceConnector {
    constructor(sourceModel, filepath) {
        super(sourceModel);
        this.filepath = filepath;
    }

    async fetch() {
        try {
            const rawContent = fs.readFileSync(this.filepath, 'utf8');
            // Validate JSON
            JSON.parse(rawContent);
            return this._generateDocument(rawContent, "JSON");
        } catch (e) {
            return new IngestionError("FAILED", "INVALID_JSON", this.filepath, false);
        }
    }
}

class HttpConnector extends SourceConnector {
    constructor(sourceModel, timeoutMs = 5000) {
        super(sourceModel);
        this.timeoutMs = timeoutMs;
    }

    async fetch() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

        try {
            const response = await fetch(this.source.url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) {
                const retryable = response.status === 429 || response.status >= 500;
                return new IngestionError("FAILED", `HTTP_${response.status}`, this.source.url, retryable);
            }

            const text = await response.text();

            // Check if expecting JSON and got HTML (common portal redirect issue)
            if (text.trim().startsWith('<html') || text.trim().startsWith('<!DOCTYPE')) {
                return new IngestionError("FAILED", "UNEXPECTED_HTML", this.source.url, false);
            }

            try {
                JSON.parse(text);
                return this._generateDocument(text, "JSON");
            } catch (err) {
                return new IngestionError("FAILED", "INVALID_JSON", this.source.url, false);
            }

        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                return new IngestionError("FAILED", "TIMEOUT", this.source.url, true);
            }
            return new IngestionError("FAILED", "NETWORK_FAILURE", this.source.url, true);
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = { SourceConnector, FixtureConnector, HttpConnector, IngestionError };
}
