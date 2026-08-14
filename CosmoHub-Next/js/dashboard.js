// High-density terminal dashboard view replacing the old hero page

function renderTerminalDashboard(container) {
    const html = `
        <div class="dashboard-grid">
            <div class="dashboard-panel col-12" style="background: transparent; border: none; padding-left: 0;">
                <h1 style="font-size: 24px; color: var(--terminal-accent); text-transform: uppercase;">GLOBAL SPACE INTELLIGENCE TERMINAL</h1>
                <p class="mono" style="color: var(--terminal-muted); font-size: 12px; margin-top: 4px;">CONNECTION ESTABLISHED. KNOWLEDGE GRAPH ACTIVE.</p>
            </div>

            <!-- Global Activity Feed -->
            <div class="dashboard-panel col-4">
                <div class="panel-header">
                    <span class="panel-title live">SYSTEM ACTIVITY</span>
                </div>
                <div class="timeline" id="dash-timeline">
                    <!-- populated via js -->
                </div>
            </div>

            <!-- Graph Topology Summary -->
            <div class="dashboard-panel col-8">
                <div class="panel-header">
                    <span class="panel-title">TOPOLOGY OVERVIEW</span>
                </div>
                <div class="dashboard-grid" style="padding:0; gap: 12px; margin-bottom: 16px;">
                    <div style="grid-column: span 3; background: var(--terminal-panel-hover); padding: 12px; border-radius: 4px; border: 1px solid var(--terminal-border);">
                        <div class="mono" style="font-size: 10px; color: var(--terminal-muted); margin-bottom: 4px;">ENTITIES</div>
                        <div style="font-size: 20px; color: var(--terminal-accent); font-weight: 500;" id="stat-entities">--</div>
                    </div>
                    <div style="grid-column: span 3; background: var(--terminal-panel-hover); padding: 12px; border-radius: 4px; border: 1px solid var(--terminal-border);">
                        <div class="mono" style="font-size: 10px; color: var(--terminal-muted); margin-bottom: 4px;">CLAIMS (EDGES)</div>
                        <div style="font-size: 20px; color: #3399ff; font-weight: 500;" id="stat-claims">--</div>
                    </div>
                    <div style="grid-column: span 6; background: var(--terminal-panel-hover); padding: 12px; border-radius: 4px; border: 1px solid var(--terminal-border);">
                         <div class="mono" style="font-size: 10px; color: var(--terminal-muted); margin-bottom: 4px;">CORE PROTOCOL</div>
                         <div style="font-size: 12px; font-family: var(--terminal-sans);">
                            <span style="color: var(--terminal-danger)">[+]</span> Ingestion Hardened<br>
                            <span style="color: var(--terminal-danger)">[+]</span> Temporal Engine Active
                         </div>
                    </div>
                </div>
                <div class="graph-container" id="dash-graph" style="height: 200px;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--terminal-muted); font-family: var(--terminal-mono); font-size: 11px;">[ GRAPH VISUALIZATION RENDERER IDLE ]</div>
                </div>
            </div>

            <!-- Dense Entity Table -->
            <div class="dashboard-panel col-12">
                <div class="panel-header">
                    <span class="panel-title">PRIORITY ENTITY INDEX</span>
                    <button class="btn-outline" onclick="window.commandBar.open()">Search Network (Cmd+K)</button>
                </div>
                <table class="terminal-table" id="dash-table">
                    <thead>
                        <tr>
                            <th>ID / Canonical Name</th>
                            <th>Class</th>
                            <th>Aliases</th>
                            <th>Relationships</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- populated via js -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Populate Data
    setTimeout(() => { if (window.api) {
        // Stats
        document.getElementById('stat-entities').textContent = window.api.searchSvc.repo.entities.size;
        document.getElementById('stat-claims').textContent = window.api.searchSvc.repo.claims.size;
        setTimeout(() => { if(typeof renderGraphVisualization === 'function') renderGraphVisualization('dash-graph'); }, 100);

        // Timeline (Synthetic Activity)
        const timeline = document.getElementById('dash-timeline');
        timeline.innerHTML = `
            <div class="timeline-item">
                <div class="timeline-date">Just Now</div>
                <div class="timeline-title">Graph Synchronized</div>
                <div class="timeline-desc">Ontology layer initialized locally.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-date">-2 mins</div>
                <div class="timeline-title">Entity Resolution</div>
                <div class="timeline-desc">NASA and ESA records reconciled.</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-date">-12 mins</div>
                <div class="timeline-title">Claim Ingestion</div>
                <div class="timeline-desc">New edges mapped from [src_esa_api].</div>
            </div>
        `;

        // Table
        const tbody = document.querySelector('#dash-table tbody');
        const entities = Array.from(window.api.searchSvc.repo.entities.values()).slice(0, 8); // top 8

        entities.forEach(ent => {
            const tr = document.createElement('tr');

            // Calculate edge count
            const edges = window.api.engine.claims.filter(c => c.subjectId === ent.id || c.objectId === ent.id).length;

            let badgeClass = '';
            if(ent.entityType === 'Organization') badgeClass = 'institution';
            else if(ent.entityType === 'Mission') badgeClass = 'mission';
            else if(ent.entityType === 'Technology') badgeClass = 'technology';

            tr.innerHTML = `
                <td>
                    <div style="font-family: var(--terminal-mono); font-size: 10px; color: var(--terminal-muted); margin-bottom: 2px;">${ent.id}</div>
                    <a href="#" class="entity-link" onclick="openEntityDrawer('${ent.id}'); return false;">${ent.canonicalName}</a>
                </td>
                <td><span class="type-badge ${badgeClass}">${ent.entityType}</span></td>
                <td style="color: var(--terminal-muted); font-size: 12px;">${ent.aliases.join(', ') || '-'}</td>
                <td style="font-family: var(--terminal-mono); color: var(--terminal-accent);">${edges} edges</td>
            `;
            tbody.appendChild(tr);
        });
    } }, 200);
}
