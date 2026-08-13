// Deterministic Entity Resolution

class EntityResolver {
    constructor() {
        this.aliasMap = new Map(); // map alias (normalized) -> canonical ID
        this.idMap = new Map();    // map ID -> Entity object
    }

    normalize(text) {
        if (!text) return "";
        return text
            .toLowerCase()
            .trim()
            // remove punctuation entirely for standard matching (e.g. "Space-X" -> "space x")
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
            // collapse multiple spaces into single space
            .replace(/\s{2,}/g, " ");
    }

    registerEntity(entity) {
        this.idMap.set(entity.id, entity);

        // Register canonical name
        this.aliasMap.set(this.normalize(entity.canonicalName), entity.id);

        // Register aliases
        if (entity.aliases) {
            for (const alias of entity.aliases) {
                this.aliasMap.set(this.normalize(alias), entity.id);
            }
        }
    }

    resolve(mention) {
        if (!mention) return null;

        // 1. Try resolving by explicit ID first
        if (this.idMap.has(mention)) {
            return this.idMap.get(mention).id;
        }

        // 2. Try resolving by deterministic alias mapping (normalized)
        const norm = this.normalize(mention);
        if (this.aliasMap.has(norm)) {
            return this.aliasMap.get(norm);
        }

        // Return null if unresolved (strict deterministic mapping, no fake AI)
        return null;
    }
}

if (typeof module !== 'undefined') {
    module.exports = { EntityResolver };
}
