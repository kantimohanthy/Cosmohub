// Lightweight Vanilla JS Node Graph Visualization for the Dashboard
function renderGraphVisualization(containerId) {
    const container = document.getElementById(containerId);
    if(!container || !window.api) return;

    // Clear idle state
    container.innerHTML = '';

    const entities = Array.from(window.api.searchSvc.repo.entities.values());
    const claims = window.api.searchSvc.repo.claims;

    if(entities.length === 0) return;

    // Very basic force-directed / spring layout approximation in canvas
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Map entities to nodes
    const nodes = entities.map(e => ({
        id: e.id,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        type: e.entityType,
        name: e.canonicalName
    }));

    const edges = [];
    claims.forEach(c => {
        const source = nodes.find(n => n.id === c.subjectId);
        const target = nodes.find(n => n.id === c.objectId);
        if(source && target) {
            edges.push({ source, target });
        }
    });

    // Simulation loop
    let animationId;
    let ticks = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw edges
        ctx.strokeStyle = 'rgba(107, 119, 140, 0.3)'; // terminal-muted dim
        ctx.lineWidth = 1;
        edges.forEach(e => {
            ctx.beginPath();
            ctx.moveTo(e.source.x, e.source.y);
            ctx.lineTo(e.target.x, e.target.y);
            ctx.stroke();
        });

        // Draw nodes
        nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);

            if(n.type === 'Organization') ctx.fillStyle = '#33ffcc';
            else if(n.type === 'Mission') ctx.fillStyle = '#ffcc00';
            else if(n.type === 'Technology') ctx.fillStyle = '#3399ff';
            else ctx.fillStyle = '#e0e5ed';

            ctx.fill();

            // Hover labels omitted for brevity; this is a topological summary
        });
    }

    function simulate() {
        const k = Math.sqrt((canvas.width * canvas.height) / nodes.length);
        const repulse = k * k;

        // Forces
        for(let i=0; i<nodes.length; i++) {
            for(let j=i+1; j<nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy) || 0.1;

                // Repulsion
                const force = repulse / dist;
                const fx = (dx/dist) * force;
                const fy = (dy/dist) * force;

                nodes[i].vx += fx * 0.05;
                nodes[i].vy += fy * 0.05;
                nodes[j].vx -= fx * 0.05;
                nodes[j].vy -= fy * 0.05;
            }
        }

        // Attraction
        edges.forEach(e => {
            const dx = e.target.x - e.source.x;
            const dy = e.target.y - e.source.y;
            const dist = Math.sqrt(dx*dx + dy*dy) || 0.1;

            const force = (dist * dist) / k;
            const fx = (dx/dist) * force;
            const fy = (dy/dist) * force;

            e.source.vx += fx * 0.05;
            e.source.vy += fy * 0.05;
            e.target.vx -= fx * 0.05;
            e.target.vy -= fy * 0.05;
        });

        // Center gravity and velocity update
        nodes.forEach(n => {
            const dx = canvas.width/2 - n.x;
            const dy = canvas.height/2 - n.y;
            n.vx += dx * 0.01;
            n.vy += dy * 0.01;

            n.x += n.vx;
            n.y += n.vy;
            n.vx *= 0.85; // friction
            n.vy *= 0.85;
        });

        draw();

        ticks++;
        if(ticks < 150) { // Settle down
            animationId = requestAnimationFrame(simulate);
        }
    }

    simulate();
}
