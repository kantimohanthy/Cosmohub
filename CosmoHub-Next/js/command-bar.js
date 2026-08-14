class CommandBar {
    constructor() {
        this.initDOM();
        this.bindEvents();
        this.selectedIndex = -1;
        this.results = [];
    }

    initDOM() {
        if(document.getElementById('command-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'command-overlay';
        overlay.innerHTML = `
            <div class="command-palette">
                <div class="command-input-container">
                    <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    <input type="text" class="command-input" placeholder="Search the ecosystem... (Cmd+K)" autocomplete="off" spellcheck="false" id="cmd-input">
                </div>
                <div class="command-results" id="cmd-results"></div>
                <div class="command-footer">
                    <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
                    <span><kbd>↵</kbd> to select</span>
                    <span><kbd>esc</kbd> to close</span>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        this.overlay = overlay;
        this.input = document.getElementById('cmd-input');
        this.resultsContainer = document.getElementById('cmd-results');
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }

            if (this.isOpen()) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigate(1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigate(-1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.selectCurrent();
                }
            }
        });

        this.input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }

    isOpen() {
        return this.overlay.classList.contains('active');
    }

    toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.overlay.classList.add('active');
        this.input.value = '';
        this.handleSearch('');
        this.input.focus();
    }

    close() {
        this.overlay.classList.remove('active');
    }

    handleSearch(query) {
        if (!window.api || !window.api.searchSvc) return;

        if (query.trim() === '') {
            this.renderEmptyState();
            return;
        }

        // Search across all entities
        const results = window.api.searchSvc.search(query, {});

        // Group results by type
        const grouped = results.reduce((acc, entity) => {
            if (!acc[entity.entityType]) acc[entity.entityType] = [];
            acc[entity.entityType].push(entity);
            return acc;
        }, {});

        this.results = [];
        this.selectedIndex = -1;
        this.resultsContainer.innerHTML = '';

        if (Object.keys(grouped).length === 0) {
            this.resultsContainer.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--terminal-muted); font-family: var(--terminal-mono); font-size: 12px;">NO RESULTS FOUND</div>';
            return;
        }

        Object.keys(grouped).forEach(type => {
            const groupTitle = document.createElement('div');
            groupTitle.className = 'command-group-title';
            groupTitle.textContent = type;
            this.resultsContainer.appendChild(groupTitle);

            grouped[type].slice(0, 5).forEach(entity => {
                this.results.push(entity);
                const idx = this.results.length - 1;

                const item = document.createElement('div');
                item.className = 'command-item';
                item.dataset.index = idx;

                let icon = '❖';
                if(type === 'Organization') icon = '🏢';
                if(type === 'Mission') icon = '🚀';
                if(type === 'Technology') icon = '⚙️';
                if(type === 'Person') icon = '👤';

                item.innerHTML = `
                    <div class="command-item-icon">${icon}</div>
                    <div class="command-item-details">
                        <span class="command-item-title">${entity.canonicalName}</span>
                        <span class="command-item-desc mono">${entity.id}</span>
                    </div>
                `;

                item.addEventListener('mouseenter', () => this.highlight(idx));
                item.addEventListener('click', () => { this.selectedIndex = idx; this.selectCurrent(); });

                this.resultsContainer.appendChild(item);
            });
        });

        if (this.results.length > 0) {
            this.highlight(0);
        }
    }

    renderEmptyState() {
        this.resultsContainer.innerHTML = `
            <div class="command-group-title">SUGGESTED</div>
            <div class="command-item" onclick="document.getElementById('cmd-input').value='NASA'; document.getElementById('cmd-input').dispatchEvent(new Event('input'))">
                <div class="command-item-icon">🔍</div>
                <div class="command-item-details">
                    <span class="command-item-title">Search NASA</span>
                    <span class="command-item-desc mono">Organization</span>
                </div>
            </div>
            <div class="command-item" onclick="document.getElementById('cmd-input').value='Satcom'; document.getElementById('cmd-input').dispatchEvent(new Event('input'))">
                <div class="command-item-icon">🔍</div>
                <div class="command-item-details">
                    <span class="command-item-title">Search Satellite Communications</span>
                    <span class="command-item-desc mono">Technology</span>
                </div>
            </div>
        `;
        this.results = [];
        this.selectedIndex = -1;
    }

    navigate(dir) {
        if (this.results.length === 0) return;
        let nextIndex = this.selectedIndex + dir;
        if (nextIndex < 0) nextIndex = this.results.length - 1;
        if (nextIndex >= this.results.length) nextIndex = 0;
        this.highlight(nextIndex);
    }

    highlight(index) {
        const items = this.resultsContainer.querySelectorAll('.command-item');
        items.forEach(el => el.classList.remove('selected'));
        this.selectedIndex = index;

        const selectedEl = this.resultsContainer.querySelector(`.command-item[data-index="${index}"]`);
        if (selectedEl) {
            selectedEl.classList.add('selected');
            selectedEl.scrollIntoView({ block: 'nearest' });
        }
    }

    selectCurrent() {
        if (this.selectedIndex >= 0 && this.selectedIndex < this.results.length) {
            const entity = this.results[this.selectedIndex];
            this.close();
            if (window.openEntityDrawer) {
                window.openEntityDrawer(entity.id);
            }
        }
    }
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    window.commandBar = new CommandBar();
});
