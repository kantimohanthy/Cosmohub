// Deterministic Entity Resolution

class EntityResolver {
    constructor() {
        this.aliasMap = new Map(); // map alias (lowercase) -> canonical ID
        this.idMap = new Map();    // map ID -> Entity object
    }

    registerEntity(entity) {
        this.idMap.set(entity.id, entity);

        // Register canonical name
        this.aliasMap.set(entity.canonicalName.toLowerCase(), entity.id);

        // Register aliases
        if (entity.aliases) {
            for (const alias of entity.aliases) {
                this.aliasMap.set(alias.toLowerCase(), entity.id);
            }
        }
    }

    resolve(mention) {
        if (!mention) return null;

        // 1. Try resolving by explicit ID first
        if (this.idMap.has(mention)) {
            return this.idMap.get(mention).id;
        }

        // 2. Try resolving by deterministic alias mapping
        const lower = mention.toLowerCase();
        if (this.aliasMap.has(lower)) {
            return this.aliasMap.get(lower);
        }

        // Return null if unresolved (strict deterministic mapping, no fake AI)
        return null;
    }
}

if (typeof module !== 'undefined') {
    module.exports = { EntityResolver };
}
