// Entity Detail Drawer (Replaces the generic modal)
function initEntityDrawer() {
    if(document.getElementById('entity-drawer')) return;

    const drawer = document.createElement('div');
    drawer.id = 'entity-drawer';
    drawer.innerHTML = `
        <div class="drawer-header">
            <div>
                <div class="mono" style="color: var(--terminal-muted); font-size: 10px; margin-bottom: 4px;" id="drawer-id">ID</div>
                <h2 id="drawer-title" style="color: var(--terminal-accent); font-size: 18px; margin-bottom: 8px;">Entity Name</h2>
                <span class="type-badge" id="drawer-type">TYPE</span>
            </div>
            <button class="drawer-close" onclick="closeEntityDrawer()">×</button>
        </div>
        <div class="drawer-content" id="drawer-content">
            <!-- Details populated here -->
        </div>
        <div class="drawer-actions">
            <button class="btn-primary" onclick="alert('Full Profile view planned for v0.6')">OPEN INTELLIGENCE PROFILE</button>
            <button class="btn-outline" onclick="toggleWatchlist()">★ TRACK ENTITY</button>
        </div>
    `;
    document.body.appendChild(drawer);
}

window.currentDrawerEntity = null;

window.openEntityDrawer = function(entityId) {
    initEntityDrawer();
    const drawer = document.getElementById('entity-drawer');
    const content = document.getElementById('drawer-content');

    if(!window.api) return;
    const entity = window.api.searchSvc.repo.getEntity(entityId);
    if(!entity) return;

    window.currentDrawerEntity = entity;

    document.getElementById('drawer-id').textContent = entity.id;
    document.getElementById('drawer-title').textContent = entity.canonicalName;
    document.getElementById('drawer-type').textContent = entity.entityType;

    // Fetch Relationships (Graph Engine Traversal)
    const relationships = window.api.engine.getRelationships(entityId);

    // Metadata rendering
    let metaHtml = '<div style="margin-bottom: 24px;">';
    if(Object.keys(entity.metadata).length > 0) {
        metaHtml += '<div class="mono" style="color: var(--terminal-muted); font-size: 10px; margin-bottom: 8px; text-transform: uppercase;">Metadata Properties</div>';
        metaHtml += '<table class="terminal-table" style="font-size: 12px; margin-bottom: 16px;"><tbody>';
        for(const [k, v] of Object.entries(entity.metadata)) {
            metaHtml += `<tr>
                <td style="color: var(--terminal-muted); width: 40%; font-family: var(--terminal-mono);">${k}</td>
                <td style="color: var(--terminal-text);">${v}</td>
            </tr>`;
        }
        metaHtml += '</tbody></table>';
    }
    metaHtml += '</div>';

    // Relationship Rendering
    let relHtml = '<div><div class="mono" style="color: var(--terminal-muted); font-size: 10px; margin-bottom: 8px; text-transform: uppercase;">Knowledge Graph Connections</div>';

    if(relationships.length === 0) {
        relHtml += '<div style="color: var(--terminal-muted); font-size: 12px; font-style: italic;">No known edges.</div>';
    } else {
        relHtml += '<div style="display: flex; flex-direction: column; gap: 8px;">';
        relationships.forEach(rel => {
            // Determine if entity is subject or object in this claim
            const isSubject = rel.claim.subjectId === entityId;
            const targetId = isSubject ? rel.claim.objectId : rel.claim.subjectId;
            const targetEntity = window.api.searchSvc.repo.getEntity(targetId);

            if(targetEntity) {
                // Formatting predicate direction
                let predDisplay = isSubject ? rel.claim.predicate : `<-[${rel.claim.predicate}]-`;
                if(isSubject) predDisplay = `-[${predDisplay}]->`;

                let targetBadge = '';
                if(targetEntity.entityType === 'Organization') targetBadge = 'institution';
                else if(targetEntity.entityType === 'Mission') targetBadge = 'mission';
                else if(targetEntity.entityType === 'Technology') targetBadge = 'technology';

                relHtml += `
                    <div style="background: var(--terminal-panel-hover); border: 1px solid var(--terminal-border); border-radius: 4px; padding: 10px; font-size: 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;" onclick="openEntityDrawer('${targetId}')">
                        <div>
                            <span class="mono" style="color: var(--terminal-muted); font-size: 10px; margin-right: 8px;">${predDisplay}</span>
                            <span style="font-weight: 500; color: var(--terminal-text);">${targetEntity.canonicalName}</span>
                        </div>
                        <span class="type-badge ${targetBadge}" style="font-size: 9px;">${targetEntity.entityType}</span>
                    </div>
                `;
            }
        });
        relHtml += '</div>';
    }
    relHtml += '</div>';

    content.innerHTML = metaHtml + relHtml;

    drawer.classList.add('open');
};

window.closeEntityDrawer = function() {
    const drawer = document.getElementById('entity-drawer');
    if(drawer) drawer.classList.remove('open');
    window.currentDrawerEntity = null;
};

window.toggleWatchlist = function() {
    if(!window.currentDrawerEntity) return;
    try {
        let wlist = [];
        const stored = localStorage.getItem('cosmohub_watchlist');
        if(stored) wlist = JSON.parse(stored);

        if(!wlist.includes(window.currentDrawerEntity.id)) {
            wlist.push(window.currentDrawerEntity.id);
            localStorage.setItem('cosmohub_watchlist', JSON.stringify(wlist));
            alert('[SYSTEM] ' + window.currentDrawerEntity.canonicalName + ' added to Watchlist.');
            if(typeof renderWatchlist === 'function') renderWatchlist();
        } else {
            alert('[SYSTEM] ' + window.currentDrawerEntity.canonicalName + ' is already tracked.');
        }
    } catch(e) {
        console.error('Watchlist Error', e);
    }
};
