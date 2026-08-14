// Map Projection for Geographic Institutions (Replaces the generic explore view)
function renderExplore(container) {
    const html = `
        <div class="dashboard-grid">
            <div class="dashboard-panel col-12" style="background: transparent; border: none; padding-left: 0; padding-bottom: 0;">
                <h1 style="font-size: 24px; color: var(--terminal-accent); text-transform: uppercase;">GLOBAL INTELLIGENCE MAP</h1>
                <p class="mono" style="color: var(--terminal-muted); font-size: 12px; margin-top: 4px;">GEOSPATIAL ECOSYSTEM PROJECTION</p>
            </div>

            <div class="dashboard-panel col-9" style="height: 600px; padding: 0; overflow: hidden; position: relative; background: radial-gradient(circle at center, #0a1118 0%, #04070a 100%);">
                <!-- Extremely simplified SVG Map placeholder. Real implementation would use D3/TopoJSON -->
                <svg width="100%" height="100%" viewBox="-180 -90 360 180" style="position: absolute; top:0; left:0; transform: scale(1.1) translate(0, 10px);">
                    <g id="map-paths" stroke="rgba(51, 255, 204, 0.1)" stroke-width="0.5" fill="none">
                        <!-- Pseudo grid to represent a digital map surface -->
                        <line x1="-180" y1="0" x2="180" y2="0" stroke="rgba(51,255,204,0.3)" stroke-dasharray="2,2"/>
                        <line x1="0" y1="-90" x2="0" y2="90" stroke="rgba(51,255,204,0.3)" stroke-dasharray="2,2"/>
                    </g>
                    <g id="map-nodes"></g>
                </svg>

                <div style="position: absolute; bottom: 16px; left: 16px; background: rgba(10,13,20,0.8); padding: 8px 12px; border: 1px solid var(--terminal-border); border-radius: 4px;">
                    <div class="mono" style="color: var(--terminal-muted); font-size: 10px; margin-bottom: 4px;">COORDINATE OVERLAY</div>
                    <div style="color: var(--terminal-accent); font-size: 12px;" id="map-status">ACTIVE</div>
                </div>
            </div>

            <div class="dashboard-panel col-3">
                <div class="panel-header">
                    <span class="panel-title">MY WATCHLIST</span>
                </div>
                <div id="watchlist-container" style="display: flex; flex-direction: column; gap: 8px;">
                    <!-- Populated via JS -->
                </div>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--terminal-border-light);">
                    <div class="mono" style="color: var(--terminal-muted); font-size: 10px; margin-bottom: 8px;">WORKSPACE STATUS</div>
                    <div style="font-size: 12px; color: var(--terminal-text);">LocalStorage Sync: <span style="color: var(--terminal-accent);">ONLINE</span></div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Draw Nodes on Map
    if(window.api) {
        const nodesGroup = document.getElementById('map-nodes');
        const orgs = Array.from(window.api.searchSvc.repo.entities.values())
                          .filter(e => e.entityType === 'Organization' && e.metadata.latitude && e.metadata.longitude);

        orgs.forEach(org => {
            const lat = org.metadata.latitude;
            const lng = org.metadata.longitude;

            // Note: SVG viewBox is -180 to +180 (x) and -90 to 90 (y). Y is inverted in SVG.
            const x = lng;
            const y = -lat;

            // Create blip
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 1.5);
            circle.setAttribute("fill", "#33ffcc");
            circle.setAttribute("class", "map-blip");
            circle.style.cursor = "pointer";

            // Add click listener
            circle.addEventListener("click", () => {
                if(window.openEntityDrawer) window.openEntityDrawer(org.id);
            });

            nodesGroup.appendChild(circle);

            // Label
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", x + 3);
            text.setAttribute("y", y + 1.5);
            text.setAttribute("fill", "#e0e5ed");
            text.setAttribute("font-family", "'IBM Plex Mono', monospace");
            text.setAttribute("font-size", "3");
            text.textContent = org.canonicalName;
            nodesGroup.appendChild(text);
        });

        // Initialize Watchlist
        renderWatchlist();
    }
}

// Watchlist Logic using LocalStorage
function getWatchlist() {
    try {
        const stored = localStorage.getItem('cosmohub_watchlist');
        return stored ? JSON.parse(stored) : ['org_european_space_agency', 'tech_satcom']; // default seeds
    } catch(e) {
        return [];
    }
}

function renderWatchlist() {
    const container = document.getElementById('watchlist-container');
    if(!container) return;

    const wlist = getWatchlist();
    container.innerHTML = '';

    if(wlist.length === 0) {
        container.innerHTML = '<div style="color: var(--terminal-muted); font-size: 12px; font-style: italic;">Watchlist is empty.</div>';
        return;
    }

    wlist.forEach(id => {
        const entity = window.api.searchSvc.repo.getEntity(id);
        if(entity) {
            let badgeClass = 'institution';
            if(entity.entityType === 'Mission') badgeClass = 'mission';
            else if(entity.entityType === 'Technology') badgeClass = 'technology';

            container.innerHTML += `
                <div style="background: var(--terminal-panel-hover); border: 1px solid var(--terminal-border); border-radius: 4px; padding: 10px; cursor: pointer; display: flex; flex-direction: column; gap: 4px;" onclick="openEntityDrawer('${entity.id}')">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500; font-size: 13px; color: var(--terminal-text);">${entity.canonicalName}</span>
                        <span class="type-badge ${badgeClass}" style="font-size: 9px;">${entity.entityType}</span>
                    </div>
                    <div class="mono" style="font-size: 10px; color: var(--terminal-muted);">${entity.id}</div>
                </div>
            `;
        }
    });
}
