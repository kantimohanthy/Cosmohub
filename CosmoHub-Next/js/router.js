function navigateTo(route) {
  const container = document.getElementById('app-container');
  if (window.routes && window.routes[route]) {
    document.querySelectorAll('.navlinks a').forEach(a => a.classList.remove('active'));
    const activeLink = document.querySelector(`.navlinks a[data-route="${route}"]`);
    if(activeLink) activeLink.classList.add('active');

    // Clear current modal
    if(typeof closeEntityModal === 'function') closeEntityModal();

    // Render view
    container.innerHTML = '';
    window.routes[route](container);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.routes = {
    home: renderHome,
    explore: renderExplore,
    institutions: renderInstitutions,
    missions: renderMissions,
    research: renderResearch,
    news: renderNews,
    learn: renderLearn,
    projects: renderProjects,
    opportunities: renderOpportunities
  };

  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(el.dataset.route);
    });
  });

  // Initialize
  if(typeof ecosystemData !== 'undefined') {
    navigateTo('home');
  } else {
    document.getElementById('app-container').innerHTML = '<div class="wrap"><h1>Error: Intelligence Core Not Loaded</h1></div>';
  }
});
