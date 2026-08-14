// Initialize Engine
let engine = null;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rawData !== 'undefined' && typeof productData !== 'undefined' && typeof QueryEngine !== 'undefined') {
      const mergedEntities = rawData.entities.concat(productData.entities);
      const mergedClaims = rawData.claims.concat(productData.claims);

      engine = new QueryEngine(mergedEntities, mergedClaims, rawData.sources, rawData.documents);

      if (typeof InMemoryRepository !== 'undefined') {
          const repo = new InMemoryRepository(mergedEntities, mergedClaims, rawData.sources, rawData.documents);
          window.searchSvc = new SearchService(repo);
          window.api = new CosmoHubAPI(engine, window.searchSvc);
      }

      document.getElementById('global-xp').textContent = userState.xp + ' XP';
      document.getElementById('global-level').textContent = 'LVL ' + userState.level;


  }
});

const userState = {
    xp: 2450,
    level: 7,
    streak: 12
};

// renderHome handled by dashboard.js


function renderInstitutions(container) {
    container.innerHTML = '<div class="dashboard-grid"><div class="dashboard-panel col-12"><h1 style="color:var(--terminal-accent); font-family:var(--terminal-display);">INSTITUTION INDEX</h1><p>Use Global Map or Command Bar for navigation.</p></div></div>';
}
function renderMissions(container) {
    container.innerHTML = '<div class="dashboard-grid"><div class="dashboard-panel col-12"><h1 style="color:var(--terminal-accent); font-family:var(--terminal-display);">MISSION CONTROL</h1><p>Active tracking system.</p></div></div>';
}
function renderResearch(container) {
    container.innerHTML = '<div class="dashboard-grid"><div class="dashboard-panel col-12"><h1 style="color:var(--terminal-accent); font-family:var(--terminal-display);">RESEARCH TERMINAL</h1><p>Knowledge extraction pending.</p></div></div>';
}
function renderNews(container) {
    container.innerHTML = '<div class="dashboard-grid"><div class="dashboard-panel col-12"><h1 style="color:var(--terminal-accent); font-family:var(--terminal-display);">INTELLIGENCE FEED</h1><p>Live stream inactive.</p></div></div>';
}
function renderLearn(container) {
    container.innerHTML = '<div class="dashboard-grid"><div class="dashboard-panel col-12"><h1 style="color:var(--terminal-accent); font-family:var(--terminal-display);">TRAINING SIMULATOR</h1><p>Level ' + userState.level + ' Access Granted.</p></div></div>';
}
function renderProjects(container) {
    container.innerHTML = '<div class="dashboard-grid"><div class="dashboard-panel col-12"><h1 style="color:var(--terminal-accent); font-family:var(--terminal-display);">PROJECT REPOSITORY</h1><p>No active deployments.</p></div></div>';
}
function renderOpportunities(container) {
    container.innerHTML = '<div class="dashboard-grid"><div class="dashboard-panel col-12"><h1 style="color:var(--terminal-accent); font-family:var(--terminal-display);">OPPORTUNITY MATRIX</h1><p>Awaiting calibration.</p></div></div>';
}

function closeEntityModal() {
    // legacy support
}
