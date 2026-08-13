// SearchService Abstraction

class SearchService {
    constructor(repository) {
        this.repo = repository;
    }

    searchInstitutions(query, typeFilter, regionFilter) {
        const results = [];
        const qNorm = query ? query.toLowerCase().trim() : "";
        for (const e of this.repo.getAllEntities()) {
            if (e.entityType !== 'Organization') continue;

            let match = true;
            if (typeFilter && typeFilter !== 'All Types') {
                if (e.metadata.institution_type !== typeFilter) match = false;
            }
            if (regionFilter && regionFilter !== 'All Regions') {
                if (e.metadata.continent !== regionFilter && e.metadata.region !== regionFilter && e.metadata.country !== regionFilter) match = false;
            }
            if (qNorm) {
                const nameNorm = e.canonicalName ? e.canonicalName.toLowerCase() : "";
                const aliases = e.aliases ? e.aliases.map(a => a.toLowerCase()).join(" ") : "";
                if (!nameNorm.includes(qNorm) && !aliases.includes(qNorm)) match = false;
            }
            if (match) results.push(e);
        }
        return results;
    }
}

if (typeof module !== 'undefined') {
    module.exports = { SearchService };
}
