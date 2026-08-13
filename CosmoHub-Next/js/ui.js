// Initialize Engine
let engine = null;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rawData !== 'undefined' && typeof QueryEngine !== 'undefined') {
      engine = new QueryEngine(rawData.entities, rawData.claims, rawData.sources, rawData.documents);
      document.getElementById('global-xp').textContent = userState.xp + ' XP';
      document.getElementById('global-level').textContent = 'LVL ' + userState.level;
  }
});

// View Renderers
function renderHome(container) {
  container.innerHTML = `
    <section class="hero">
      <div class="wrap">
        <span class="eyebrow">CosmoHub Core</span>
        <h1>INFORMATION IS EVERYWHERE.<br><span>INTELLIGENCE IS NOWHERE.</span></h1>
        <p>A unified knowledge infrastructure for the global space ecosystem.</p>
        <button class="btn btn-amber" onclick="navigateTo('explore')">ENTER THE TERMINAL</button>
      </div>
    </section>
    <section class="wrap">
      <h2 style="margin-bottom: 24px;">Discover the Ecosystem</h2>
      <div class="grid grid-4">
         <div class="card" onclick="navigateTo('institutions')"><h3>Institutions</h3><p>Dossiers on agencies and companies.</p></div>
         <div class="card" onclick="navigateTo('missions')"><h3>Missions</h3><p>Hardware in orbit and in development.</p></div>
         <div class="card" onclick="navigateTo('research')"><h3>Research</h3><p>The science powering capability.</p></div>
         <div class="card" onclick="navigateTo('learn')"><h3>Learn</h3><p>Gamified learning tracks.</p></div>
      </div>
    </section>
  `;
}

function renderExplore(container) {
  if (!engine) return;
  const allNodes = engine.entities;
  const nodesHtml = Array.from(allNodes.values()).map(n => {
      const isSynth = engine.getClaimsForEntity(n.id).some(c => c.confidence === "SYNTHETIC");
      return `
      <div class="card" onclick="openEntity('${n.id}')">
         <div class="card-meta"><span>${n.entityType.toUpperCase()}</span> ${isSynth ? '<span class="synthetic-badge">SYNTHETIC</span>' : ''}</div>
         <h3 style="margin-top:12px;">${n.canonicalName}</h3>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="wrap">
      <h2 style="margin-bottom:24px;">Ecosystem Graph Explorer</h2>
      <div class="grid grid-3">
        ${nodesHtml}
      </div>
    </div>
  `;
}

function renderInstitutions(container) {
  if (!engine) return;
  const orgs = engine.getEntitiesByType('Organization');
  const orgsHtml = orgs.map(o => {
      const isSynth = engine.getClaimsForEntity(o.id).some(c => c.confidence === "SYNTHETIC");
      return `
      <div class="card" onclick="openEntity('${o.id}')" style="border-left: 4px solid var(--cyan);">
         <h3>${o.canonicalName} ${isSynth ? '<span class="synthetic-badge">SYNTHETIC</span>' : ''}</h3>
         <p>${o.metadata.mission || o.metadata.hq || 'Intelligence Dossier'}</p>
         <button class="btn">VIEW DOSSIER</button>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="wrap">
      <h2 style="margin-bottom:24px;">Institution Intelligence</h2>
      <div class="grid grid-2">
        ${orgsHtml}
      </div>
    </div>
  `;
}

function renderMissions(container) {
  if (!engine) return;
  const items = engine.getEntitiesByType('Mission');
  const itemsHtml = items.map(m => `<div class="card" onclick="openEntity('${m.id}')"><h3>${m.canonicalName}</h3><p>Status: ${m.metadata.status || 'Unknown'}</p></div>`).join('');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Missions</h2><div class="grid grid-3">${itemsHtml}</div></div>`;
}

function renderResearch(container) {
  if (!engine) return;
  const items = engine.getEntitiesByType('Publication').concat(engine.getEntitiesByType('Person'));
  const itemsHtml = items.map(r => `<div class="card" onclick="openEntity('${r.id}')"><div class="card-meta"><span>${r.entityType.toUpperCase()}</span></div><h3 style="margin-top:12px;">${r.canonicalName}</h3></div>`).join('');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Research Intelligence</h2><div class="grid grid-3">${itemsHtml}</div></div>`;
}

function renderNews(container) {
  if (!engine) return;
  const items = engine.getEntitiesByType('News');
  const itemsHtml = items.map(n => `<div class="card" onclick="openEntity('${n.id}')"><h3>${n.canonicalName}</h3><p>${n.metadata.summary || ''}</p><div class="card-meta"><span>${n.metadata.date || 'Verified Record'}</span></div></div>`).join('');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Space News Feed</h2><div class="grid grid-2">${itemsHtml}</div></div>`;
}

function renderProjects(container) {
  if (!engine) return;
  const items = engine.getEntitiesByType('Project');
  const itemsHtml = items.map(p => `<div class="card" onclick="openEntity('${p.id}')"><h3>${p.canonicalName}</h3><p class="xp-badge">+${p.metadata.xp || 0} XP</p></div>`).join('');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Builder Projects</h2><div class="grid grid-3">${itemsHtml}</div></div>`;
}

function renderOpportunities(container) {
  if (!engine) return;
  const items = engine.getEntitiesByType('Opportunity');
  const itemsHtml = items.map(o => `<div class="card" onclick="openEntity('${o.id}')"><h3>${o.canonicalName}</h3><p>${o.metadata.type_opp || 'Opportunity'} | ${o.metadata.status || 'Open'}</p></div>`).join('');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Opportunities</h2><div class="grid grid-3">${itemsHtml}</div></div>`;
}

function renderLearn(container) {
  if (!engine) return;
  const paths = engine.getEntitiesByType('LearningPath');
  const pathsHtml = paths.map(p => `
    <div class="card" onclick="openEntity('${p.id}')" style="border:1px solid var(--amber-dim);">
       <h3>${p.canonicalName}</h3>
       <p>${p.metadata.description || 'Learning Path'}</p>
       <div class="card-meta"><span style="color:var(--amber);">PATH REWARD: +${p.metadata.xp || 0} XP</span><button class="btn btn-amber">START PATH</button></div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="wrap">
      <div style="display:flex; justify-content:space-between; margin-bottom:40px;">
        <h2>Gamified Learning Paths</h2>
        <div style="text-align:right;">
          <div class="level-badge" style="font-size:24px; font-weight:700;">LEVEL ${userState.level}</div>
          <div class="xp-badge">${userState.xp} / 2000 XP</div>
          <div class="progress-bar"><div class="progress-fill" style="width: ${(userState.xp / 2000)*100}%;"></div></div>
        </div>
      </div>
      <div class="grid grid-2">
        ${pathsHtml}
      </div>
    </div>
  `;
}

// Entity Detail Modal Logic
function openEntity(id) {
  if (!engine) return;
  const entity = engine.getEntity(id);
  if(!entity) return;

  const related = engine.getRelatedEntities(id);
  const isSynth = engine.getClaimsForEntity(id).some(c => c.confidence === "SYNTHETIC");

  let html = `
    <div class="entity-header">
       <span class="eyebrow">${entity.entityType} ${isSynth ? '<span class="synthetic-badge">SYNTHETIC</span>' : ''}</span>
       <h2>${entity.canonicalName}</h2>
       <p style="color:var(--muted);">${entity.metadata.hq || entity.metadata.summary || entity.metadata.description || entity.metadata.mission || ''}</p>
    </div>
  `;

  if(entity.entityType === "Lesson" || entity.entityType === "Project" || entity.entityType === "Quiz") {
     html += `<button class="btn btn-amber" onclick="awardXP(${entity.metadata.xp || 100})" style="margin-bottom:24px; width:100%;">COMPLETE ACTIVITY (+${entity.metadata.xp || 100} XP)</button>`;
  }

  if(related.length > 0) {
    html += `<div class="relationship-group"><div class="relationship-title">Connections</div>`;
    related.forEach(r => {
      const prov = engine.getProvenanceForClaim(r.claim.id);
      let provText = r.claim.confidence;
      if (prov && prov.source) {
          provText += ` <a href="${prov.source.url}" target="_blank" style="color:var(--cyan); text-decoration:underline;">[Source]</a>`;
      }

      const ev = engine.getEvidenceForClaim(r.claim.id);
      if (ev) {
          provText += ` <span style="font-size:9px;">Evidence: "${ev}"</span>`;
      }

      html += `<div class="relationship-item" onclick="openEntity('${r.entity.id}')">
        <span>${r.predicate} <strong style="color:var(--text);">${r.entity.canonicalName}</strong></span>
        <span class="prov">[${provText}]</span>
      </div>`;
    });
    html += `</div>`;
  }

  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('entity-modal').classList.add('active');
}

function closeEntityModal() {
  const modal = document.getElementById('entity-modal');
  if(modal) modal.classList.remove('active');
}

function awardXP(amount) {
  userState.xp += amount;
  if(userState.xp >= 2000) {
    userState.level++;
    userState.xp = 0;
    alert("LEVEL UP! You reached Level " + userState.level);
  }
  document.getElementById('global-xp').textContent = userState.xp + ' XP';
  document.getElementById('global-level').textContent = 'LVL ' + userState.level;
  closeEntityModal();
  if(document.querySelector('.navlinks a[data-route="learn"]').classList.contains('active')) {
      navigateTo('learn');
  } else {
      alert(`Earned ${amount} XP!`);
  }
}

// Global Gamification State mock
const userState = {
  xp: 1250,
  level: 4,
  completed: []
};
