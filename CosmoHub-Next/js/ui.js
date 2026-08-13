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
  const allNodes = ecosystemData.entities;
  container.innerHTML = `
    <div class="wrap">
      <h2 style="margin-bottom:24px;">Ecosystem Graph Explorer</h2>
      <div class="grid grid-3">
        ${allNodes.map(n => `
          <div class="card" onclick="openEntity('${n.id}')">
             <div class="card-meta"><span>${n.type.toUpperCase()}</span> ${n.is_synthetic ? '<span class="synthetic-badge">SYNTHETIC</span>' : ''}</div>
             <h3 style="margin-top:12px;">${n.name}</h3>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderInstitutions(container) {
  const orgs = ecosystemData.entities.filter(e => e.type === 'Organization');
  container.innerHTML = `
    <div class="wrap">
      <h2 style="margin-bottom:24px;">Institution Intelligence</h2>
      <div class="grid grid-2">
        ${orgs.map(o => `
          <div class="card" onclick="openEntity('${o.id}')" style="border-left: 4px solid var(--cyan);">
             <h3>${o.name} ${o.is_synthetic ? '<span class="synthetic-badge">SYNTHETIC</span>' : ''}</h3>
             <p>${o.mission || o.hq || 'Intelligence Dossier'}</p>
             <button class="btn">VIEW DOSSIER</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMissions(container) {
  const items = ecosystemData.entities.filter(e => e.type === 'Mission');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Missions</h2><div class="grid grid-3">${items.map(m => `<div class="card" onclick="openEntity('${m.id}')"><h3>${m.name}</h3><p>Status: ${m.status}</p></div>`).join('')}</div></div>`;
}

function renderResearch(container) {
  const items = ecosystemData.entities.filter(e => e.type === 'Research' || e.type === 'Person');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Research Intelligence</h2><div class="grid grid-3">${items.map(r => `<div class="card" onclick="openEntity('${r.id}')"><div class="card-meta"><span>${r.type.toUpperCase()}</span></div><h3 style="margin-top:12px;">${r.name}</h3></div>`).join('')}</div></div>`;
}

function renderNews(container) {
  const items = ecosystemData.entities.filter(e => e.type === 'News');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Space News Feed</h2><div class="grid grid-2">${items.map(n => `<div class="card" onclick="openEntity('${n.id}')"><h3>${n.name}</h3><p>${n.summary}</p><div class="card-meta"><span>${n.date}</span></div></div>`).join('')}</div></div>`;
}

function renderProjects(container) {
  const items = ecosystemData.entities.filter(e => e.type === 'Project');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Builder Projects</h2><div class="grid grid-3">${items.map(p => `<div class="card" onclick="openEntity('${p.id}')"><h3>${p.name}</h3><p class="xp-badge">+${p.xp} XP</p></div>`).join('')}</div></div>`;
}

function renderOpportunities(container) {
  const items = ecosystemData.entities.filter(e => e.type === 'Opportunity');
  container.innerHTML = `<div class="wrap"><h2 style="margin-bottom:24px;">Opportunities</h2><div class="grid grid-3">${items.map(o => `<div class="card" onclick="openEntity('${o.id}')"><h3>${o.name}</h3><p>${o.type_opp} | ${o.status}</p></div>`).join('')}</div></div>`;
}

function renderLearn(container) {
  const paths = ecosystemData.entities.filter(e => e.type === 'Learning');
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
        ${paths.map(p => `
          <div class="card" onclick="openEntity('${p.id}')" style="border:1px solid var(--amber-dim);">
             <h3>${p.name}</h3>
             <p>${p.description}</p>
             <div class="card-meta"><span style="color:var(--amber);">PATH REWARD: +${p.xp} XP</span><button class="btn btn-amber">START PATH</button></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Entity Detail Modal Logic
function openEntity(id) {
  const entity = ecosystemData.entities.find(e => e.id === id);
  if(!entity) return;

  // Find related claims
  const outClaims = ecosystemData.claims.filter(c => c.source === id);
  const inClaims = ecosystemData.claims.filter(c => c.target === id);

  let html = `
    <div class="entity-header">
       <span class="eyebrow">${entity.type} ${entity.is_synthetic ? '<span class="synthetic-badge">SYNTHETIC</span>' : ''}</span>
       <h2>${entity.name}</h2>
       <p style="color:var(--muted);">${entity.hq || entity.summary || entity.description || entity.mission || entity.role || ''}</p>
    </div>
  `;

  if(entity.type === "Lesson" || entity.type === "Project" || entity.type === "Quiz") {
     html += `<button class="btn btn-amber" onclick="awardXP(${entity.xp})" style="margin-bottom:24px; width:100%;">COMPLETE ACTIVITY (+${entity.xp} XP)</button>`;
  }

  if(outClaims.length > 0) {
    html += `<div class="relationship-group"><div class="relationship-title">Connections (Outbound)</div>`;
    outClaims.forEach(c => {
      const target = ecosystemData.entities.find(e => e.id === c.target);
      html += `<div class="relationship-item" onclick="openEntity('${target.id}')">
        <span>${c.predicate} <strong style="color:var(--text);">${target.name}</strong></span>
        <span class="prov">[${c.confidence}]</span>
      </div>`;
    });
    html += `</div>`;
  }

  if(inClaims.length > 0) {
    html += `<div class="relationship-group"><div class="relationship-title">Connections (Inbound)</div>`;
    inClaims.forEach(c => {
      const source = ecosystemData.entities.find(e => e.id === c.source);
      html += `<div class="relationship-item" onclick="openEntity('${source.id}')">
        <span><strong style="color:var(--text);">${source.name}</strong> ${c.predicate}</span>
        <span class="prov">[${c.confidence}]</span>
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

// Initialise global trackers
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('global-xp').textContent = userState.xp + ' XP';
    document.getElementById('global-level').textContent = 'LVL ' + userState.level;
});
