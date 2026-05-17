/**
 * ADMIN — Shared shell, auth, sidebar
 */

(function () {
  "use strict";

  const LOGO_SVG = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <polygon points="100,8 180,52 180,148 100,192 20,148 20,52" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
    <g fill="currentColor">
      <polygon points="100,20 110,95 100,100 90,95"/><polygon points="100,180 110,105 100,100 90,105"/>
      <polygon points="22,100 95,90 100,100 95,110"/><polygon points="178,100 105,90 100,100 105,110"/>
      <polygon points="42,42 96,96 100,100 90,90"/><polygon points="158,42 104,96 100,100 110,90"/>
      <polygon points="42,158 96,104 100,100 90,110"/><polygon points="158,158 104,104 100,100 110,110"/>
    </g>
  </svg>`;

  // Predefined gradient presets for cover images
  const GRADIENT_PRESETS = [
    "linear-gradient(135deg,#FFD27A 0%,#F4A340 60%,#8B5A2B 100%)",
    "linear-gradient(135deg,#F4A340 0%,#C56812 100%)",
    "linear-gradient(135deg,#8B5A2B 0%,#1F1F1F 100%)",
    "linear-gradient(135deg,#A8C49B 0%,#3F5E32 100%)",
    "linear-gradient(135deg,#8FC6E0 0%,#4A9BC4 100%)",
    "linear-gradient(135deg,#D9BC8E 0%,#6B4422 100%)",
    "linear-gradient(135deg,#FFD27A 0%,#1F1F1F 100%)",
    "linear-gradient(135deg,#FFFFFF 0%,#DCEEF5 50%,#8FC6E0 100%)",
    "linear-gradient(180deg,#FFD27A 0%,#E8841E 50%,#6B4422 100%)",
    "radial-gradient(circle at 30% 70%,#F4A340 0%,#8B5A2B 60%,#1F1F1F 100%)",
    "linear-gradient(90deg,#3F5E32,#A8C49B,#D9BC8E,#8B5A2B)",
    "linear-gradient(135deg,#C0392B 0%,#1F1F1F 100%)",
    "linear-gradient(135deg,#A8C49B 0%,#F4A340 100%)",
    "linear-gradient(135deg,#FFD27A,#F4A340,#8B5A2B,#1F1F1F)",
    "linear-gradient(180deg,#F4E9D4 0%,#D9BC8E 50%,#8B5A2B 100%)",
    "linear-gradient(135deg,#3F5E32 0%,#1F1F1F 100%)"
  ];

  // ---------------- Sidebar markup ----------------
  function buildSidebar() {
    const session = Store.session() || { name: "Admin", username: "admin" };
    const initials = session.name.split(" ").map(s => s[0]).join("").slice(0,2).toUpperCase();

    const path = location.pathname.split("/").pop() || "index.html";
    const newMessages = Store.all("messages").filter(m => !m.read).length;

    const navItems = [
      { section: "Główne" },
      { href: "index.html", label: "Dashboard", icon: '<path d="M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z"/>' },
      { href: "analytics.html", label: "Analityka", icon: '<path d="M3 3v18h18"/><path d="m7 12 4-4 4 4 5-5"/>' },
      { href: "news.html", label: "Aktualności", icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>' },
      { href: "events.html", label: "Wydarzenia", icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
      { href: "gallery.html", label: "Galeria", icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>' },
      { section: "Treści" },
      { href: "projects.html", label: "Projekty", icon: '<path d="M2 6a2 2 0 0 1 2-2h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/>' },
      { href: "biketrails.html", label: "Trasy rowerowe", icon: '<circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="m12 17-3-7 4-3 4 7"/>' },
      { href: "prices.html", label: "Cennik", icon: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
      { href: "poi.html", label: "Mapa / POI", icon: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>' },
      { href: "partners.html", label: "Partnerzy", icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m17 11 2 2 4-4"/>' },
      { href: "faq.html", label: "FAQ", icon: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>' },
      { href: "pages.html", label: "Strony stałe", icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>' },
      { section: "Komunikacja" },
      { href: "messages.html", label: "Wiadomości", icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', badge: newMessages },
      { href: "departments.html", label: "Działy kontaktowe", icon: '<path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>' },
      { href: "subscribers.html", label: "Subskrybenci", icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>' },
      { section: "System" },
      { href: "activity.html", label: "Logi aktywności", icon: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>' },
      { href: "settings.html", label: "Ustawienia", icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
      { href: "backup.html", label: "Backup / Eksport", icon: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>' },
      { href: "users.html", label: "Użytkownicy", icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>' }
    ];

    const navHtml = navItems.map(item => {
      if (item.section) return `<div class="admin-nav-section">${item.section}</div>`;
      const active = item.href === path;
      return `
        <a href="${item.href}" class="${active ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
          <span>${item.label}</span>
          ${item.badge ? `<span class="badge-count">${item.badge}</span>` : ''}
        </a>
      `;
    }).join("");

    return `
      <aside class="admin-sidebar" id="adminSidebar">
        <a href="index.html" class="admin-sidebar-brand">
          <span class="brand-logo">${LOGO_SVG}</span>
          <div>
            <strong>Pustynia Bł.</strong>
            <small>Panel admina</small>
          </div>
        </a>
        <nav class="admin-nav">${navHtml}</nav>
        <div class="admin-sidebar-footer">
          <div class="admin-user-avatar">${initials}</div>
          <div class="admin-user-info">
            <strong>${session.name || 'Administrator'}</strong>
            <small>${session.role || 'admin'}</small>
          </div>
          <button class="admin-logout" id="adminLogout" title="Wyloguj">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
          </button>
        </div>
      </aside>
    `;
  }

  function buildTopbar(title) {
    return `
      <div class="admin-topbar">
        <div style="display:flex;align-items:center;gap:12px">
          <button class="admin-mobile-toggle row-action-btn" id="adminMobileToggle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <h1>${title}</h1>
        </div>
        <div class="admin-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="search" id="globalSearch" placeholder="Szukaj...">
        </div>
        <div style="display:flex;gap:8px">
          <a href="../index.html" class="btn btn-outline btn-sm" target="_blank">Zobacz stronę →</a>
        </div>
      </div>
    `;
  }

  // ---------------- Init ----------------
  function init(opts = {}) {
    if (!Store.requireAuth()) return false;

    document.body.classList.add("admin-body");

    const sidebarSlot = document.getElementById("admin-sidebar-slot");
    const topbarSlot = document.getElementById("admin-topbar-slot");
    if (sidebarSlot) sidebarSlot.outerHTML = buildSidebar();
    if (topbarSlot) topbarSlot.outerHTML = buildTopbar(opts.title || "Admin");

    document.getElementById("adminLogout")?.addEventListener("click", () => {
      if (confirm("Czy na pewno chcesz się wylogować?")) {
        Store.logout();
        location.href = "login.html";
      }
    });

    document.getElementById("adminMobileToggle")?.addEventListener("click", () => {
      document.getElementById("adminSidebar").classList.toggle("open");
    });

    // Close sidebar on link click (mobile)
    document.querySelectorAll(".admin-nav a").forEach(a => {
      a.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          document.getElementById("adminSidebar").classList.remove("open");
        }
      });
    });

    // Wire global search
    setupGlobalSearch();
    // Keyboard shortcuts
    setupKeyboardShortcuts();

    return true;
  }

  // ---------------- Activity log ----------------
  // Stores entries in localStorage (separate key, capped to 500 entries)
  const ACT_KEY = "pustynia_activity_v1";
  function logActivity(action, target, details) {
    try {
      const raw = localStorage.getItem(ACT_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const session = Store.session() || { username: "system", name: "System" };
      list.unshift({
        id: "a" + Date.now() + Math.floor(Math.random() * 999),
        action,           // "create" | "update" | "delete" | "login" | "logout" | "publish" | etc
        target,           // collection name or section
        details: details || "",
        username: session.username,
        userName: session.name,
        date: new Date().toISOString()
      });
      // Cap at 500
      if (list.length > 500) list.length = 500;
      localStorage.setItem(ACT_KEY, JSON.stringify(list));
    } catch (e) { /* ignore */ }
  }
  function getActivities() {
    try {
      const raw = localStorage.getItem(ACT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
  function clearActivities() {
    localStorage.removeItem(ACT_KEY);
  }

  // ---------------- Global search ----------------
  // Searches across news, events, projects, partners, photos, POI
  function buildSearchIndex() {
    const idx = [];
    Store.all("news").forEach(n => idx.push({
      type: "Aktualność", icon: "📰", title: n.title, sub: n.category,
      href: "news.html?edit=" + n.id, _hay: (n.title + " " + n.excerpt + " " + n.category).toLowerCase()
    }));
    Store.all("events").forEach(e => idx.push({
      type: "Wydarzenie", icon: "📅", title: e.title, sub: e.startDate,
      href: "events.html?edit=" + e.id, _hay: (e.title + " " + e.description).toLowerCase()
    }));
    Store.all("projects").forEach(p => idx.push({
      type: "Projekt", icon: "🚧", title: p.title, sub: p.status,
      href: "projects.html?edit=" + p.id, _hay: (p.title + " " + p.description).toLowerCase()
    }));
    Store.all("partners").forEach(p => idx.push({
      type: "Partner", icon: "🤝", title: p.name, sub: p.category,
      href: "partners.html?edit=" + p.id, _hay: (p.name + " " + p.description).toLowerCase()
    }));
    Store.all("bikeTrails").forEach(b => idx.push({
      type: "Trasa rowerowa", icon: "🚴", title: b.name, sub: b.difficulty,
      href: "biketrails.html?edit=" + b.id, _hay: (b.name + " " + b.description).toLowerCase()
    }));
    Store.all("poi").forEach(p => idx.push({
      type: "Punkt mapy", icon: "📍", title: p.name, sub: p.type,
      href: "poi.html", _hay: (p.name + " " + p.description).toLowerCase()
    }));
    Store.all("photos").forEach(ph => idx.push({
      type: "Zdjęcie", icon: "🖼", title: ph.title, sub: ph.author,
      href: "gallery.html", _hay: (ph.title + " " + (ph.author || "")).toLowerCase()
    }));
    return idx;
  }

  function setupGlobalSearch() {
    const input = document.getElementById("globalSearch");
    if (!input) return;

    const dropdown = document.createElement("div");
    dropdown.className = "admin-search-dropdown";
    dropdown.style.display = "none";
    input.parentElement.appendChild(dropdown);

    let cache = null;
    function doSearch(q) {
      q = (q || "").trim().toLowerCase();
      if (q.length < 2) { dropdown.style.display = "none"; return; }
      if (!cache) cache = buildSearchIndex();
      const results = cache.filter(x => x._hay.includes(q)).slice(0, 12);
      if (!results.length) {
        dropdown.innerHTML = `<div class="search-empty">Brak wyników dla „${escapeHtml(q)}"</div>`;
      } else {
        dropdown.innerHTML = results.map(r => `
          <a class="search-result" href="${r.href}">
            <span class="ico">${r.icon}</span>
            <div>
              <strong>${highlight(r.title, q)}</strong>
              <small>${r.type} · ${escapeHtml(r.sub || "")}</small>
            </div>
          </a>
        `).join("");
      }
      dropdown.style.display = "block";
    }

    let timer;
    input.addEventListener("input", e => {
      clearTimeout(timer);
      timer = setTimeout(() => doSearch(e.target.value), 150);
    });
    input.addEventListener("focus", e => { if (e.target.value) doSearch(e.target.value); });
    document.addEventListener("click", e => {
      if (!input.parentElement.contains(e.target)) dropdown.style.display = "none";
    });
  }

  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
    return escapeHtml(text).replace(re, "<mark>$1</mark>");
  }
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }

  // ---------------- Keyboard shortcuts ----------------
  function setupKeyboardShortcuts() {
    document.addEventListener("keydown", e => {
      // Ignore when in input/textarea
      if (e.target.matches("input, textarea, select, [contenteditable]")) return;

      if (e.key === "/") {
        e.preventDefault();
        const search = document.getElementById("globalSearch");
        if (search) search.focus();
      } else if (e.key === "n" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // Trigger "+ New" button if present
        const btn = document.getElementById("btnNew") || document.getElementById("btnNewF") || document.getElementById("btnNewP");
        if (btn) { e.preventDefault(); btn.click(); }
      } else if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        showShortcutsHelp();
      } else if (e.key === "g") {
        // Wait for next key — like "go to" navigation
        e.preventDefault();
        window.__pendingG = true;
        setTimeout(() => { window.__pendingG = false; }, 1000);
      } else if (window.__pendingG) {
        const map = {
          "h": "index.html",      // home (dashboard)
          "n": "news.html",
          "e": "events.html",
          "p": "projects.html",
          "g": "gallery.html",
          "m": "messages.html",
          "s": "settings.html",
          "a": "analytics.html"
        };
        const target = map[e.key.toLowerCase()];
        if (target) { e.preventDefault(); window.__pendingG = false; location.href = target; }
      }
    });
  }

  function showShortcutsHelp() {
    modal({
      title: "⌨️ Skróty klawiszowe",
      body: `
        <table style="width:100%;font-size:.9rem">
          <tr><td><kbd>/</kbd></td><td>Skup się na wyszukiwarce</td></tr>
          <tr><td><kbd>n</kbd></td><td>Dodaj nowy element (na stronach z listą)</td></tr>
          <tr><td><kbd>?</kbd></td><td>Pokaż tę pomoc</td></tr>
          <tr><td><kbd>Esc</kbd></td><td>Zamknij okno modalne</td></tr>
          <tr><td colspan="2" style="padding-top:16px;font-weight:700;color:var(--sand-700)">Nawigacja (g + ...)</td></tr>
          <tr><td><kbd>g</kbd> + <kbd>h</kbd></td><td>Dashboard</td></tr>
          <tr><td><kbd>g</kbd> + <kbd>n</kbd></td><td>Aktualności</td></tr>
          <tr><td><kbd>g</kbd> + <kbd>e</kbd></td><td>Wydarzenia</td></tr>
          <tr><td><kbd>g</kbd> + <kbd>g</kbd></td><td>Galeria</td></tr>
          <tr><td><kbd>g</kbd> + <kbd>p</kbd></td><td>Projekty</td></tr>
          <tr><td><kbd>g</kbd> + <kbd>m</kbd></td><td>Wiadomości</td></tr>
          <tr><td><kbd>g</kbd> + <kbd>a</kbd></td><td>Analityka</td></tr>
          <tr><td><kbd>g</kbd> + <kbd>s</kbd></td><td>Ustawienia</td></tr>
        </table>
      `,
      footer: `<button class="btn btn-primary" data-close>OK</button>`
    });
  }

  // ---------------- Drag & drop sortable ----------------
  // Usage: Admin.makeSortable(containerEl, onReorder, itemSelector)
  // onReorder receives the new array of element data-id values.
  function makeSortable(container, onReorder, itemSelector = "[data-id]") {
    if (!container) return;
    let dragged = null;

    container.querySelectorAll(itemSelector).forEach(item => {
      item.draggable = true;

      item.addEventListener("dragstart", e => {
        dragged = item;
        item.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", item.dataset.id);
      });
      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        container.querySelectorAll(itemSelector).forEach(i => i.classList.remove("drag-over"));
        const ids = [...container.querySelectorAll(itemSelector)].map(i => i.dataset.id);
        onReorder && onReorder(ids);
      });
      item.addEventListener("dragover", e => {
        e.preventDefault();
        if (!dragged || dragged === item) return;
        const rect = item.getBoundingClientRect();
        const before = (e.clientY - rect.top) < rect.height / 2;
        container.insertBefore(dragged, before ? item : item.nextSibling);
      });
      item.addEventListener("dragenter", () => item.classList.add("drag-over"));
      item.addEventListener("dragleave", () => item.classList.remove("drag-over"));
    });
  }

  // ---------------- Image editor (canvas-based) ----------------
  // Edits a CSS gradient OR data: URL image. Returns new gradient/dataURL.
  function imageEditor(currentValue, onSave) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="img-editor">
        <div class="img-editor-preview" id="ie-preview" style="background:${currentValue || GRADIENT_PRESETS[0]}"></div>
        <div class="img-editor-controls">
          <label>Filtr</label>
          <select id="ie-filter">
            <option value="none">Brak</option>
            <option value="grayscale(1)">Czarno-biały</option>
            <option value="sepia(1)">Sepia</option>
            <option value="hue-rotate(180deg)">Inwersja barw</option>
            <option value="brightness(1.3)">Jaśniejszy</option>
            <option value="brightness(.7)">Ciemniejszy</option>
            <option value="contrast(1.5)">Kontrast +</option>
            <option value="blur(4px)">Blur</option>
            <option value="saturate(1.8)">Saturate +</option>
            <option value="saturate(.4)">Pastel</option>
          </select>
          <label>Obrót: <span id="ie-rot-val">0°</span></label>
          <input type="range" id="ie-rot" min="0" max="360" step="15" value="0">
          <label>Skala: <span id="ie-sc-val">100%</span></label>
          <input type="range" id="ie-sc" min="80" max="200" step="5" value="100">
          <label>Nakładka koloru</label>
          <div style="display:flex;gap:6px">
            <input type="color" id="ie-overlay-color" value="#000000" style="width:50px;flex-shrink:0">
            <input type="range" id="ie-overlay-op" min="0" max="80" value="0" style="flex:1">
            <span id="ie-overlay-val" style="width:40px;text-align:right">0%</span>
          </div>
          <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="btn btn-ghost btn-sm" id="ie-reset">↺ Reset</button>
            <button type="button" class="btn btn-primary btn-sm" id="ie-save">💾 Zastosuj</button>
          </div>
        </div>
      </div>
    `;

    const preview = div.querySelector("#ie-preview");
    let baseBg = currentValue || GRADIENT_PRESETS[0];
    function repaint() {
      const filter = div.querySelector("#ie-filter").value;
      const rot = +div.querySelector("#ie-rot").value;
      const sc = +div.querySelector("#ie-sc").value / 100;
      const oc = div.querySelector("#ie-overlay-color").value;
      const op = +div.querySelector("#ie-overlay-op").value / 100;
      div.querySelector("#ie-rot-val").textContent = rot + "°";
      div.querySelector("#ie-sc-val").textContent = (sc * 100).toFixed(0) + "%";
      div.querySelector("#ie-overlay-val").textContent = (op * 100).toFixed(0) + "%";

      // Compose
      preview.style.background = op > 0
        ? `linear-gradient(${oc}${Math.round(op*255).toString(16).padStart(2,"0")}, ${oc}${Math.round(op*255).toString(16).padStart(2,"0")}), ${baseBg}`
        : baseBg;
      preview.style.filter = filter === "none" ? "" : filter;
      preview.style.transform = `rotate(${rot}deg) scale(${sc})`;
    }
    div.querySelectorAll("input, select").forEach(el => el.addEventListener("input", repaint));
    div.querySelector("#ie-reset").addEventListener("click", () => {
      div.querySelector("#ie-filter").value = "none";
      div.querySelector("#ie-rot").value = 0;
      div.querySelector("#ie-sc").value = 100;
      div.querySelector("#ie-overlay-color").value = "#000000";
      div.querySelector("#ie-overlay-op").value = 0;
      repaint();
    });
    div.querySelector("#ie-save").addEventListener("click", () => {
      // Compose final value as a CSS background string
      const filter = div.querySelector("#ie-filter").value;
      const oc = div.querySelector("#ie-overlay-color").value;
      const op = +div.querySelector("#ie-overlay-op").value / 100;
      const composed = op > 0
        ? `linear-gradient(${oc}${Math.round(op*255).toString(16).padStart(2,"0")}, ${oc}${Math.round(op*255).toString(16).padStart(2,"0")}), ${baseBg}`
        : baseBg;
      // Note: filter and transform are not part of CSS background, so they're cosmetic only.
      // For a real demo, we just pass the composed bg.
      onSave && onSave(composed, { filter, rot: +div.querySelector("#ie-rot").value, scale: +div.querySelector("#ie-sc").value });
    });
    repaint();
    return div;
  }

  // ---------------- Charts (SVG-based, no dependencies) ----------------
  // bar chart
  function barChart(data, opts = {}) {
    // data: [{label, value, color?}]
    const w = opts.width || 600;
    const h = opts.height || 200;
    const pad = { top: 20, right: 10, bottom: 30, left: 40 };
    const innerW = w - pad.left - pad.right;
    const innerH = h - pad.top - pad.bottom;
    const max = Math.max(...data.map(d => d.value), 1);
    const barW = innerW / data.length;
    const barGap = barW * 0.2;

    const bars = data.map((d, i) => {
      const x = pad.left + i * barW + barGap / 2;
      const bw = barW - barGap;
      const bh = (d.value / max) * innerH;
      const y = pad.top + innerH - bh;
      const color = d.color || "var(--sun-400)";
      return `
        <g class="bar-chart-bar">
          <rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="4" fill="${color}">
            <title>${escapeHtml(d.label)}: ${d.value}</title>
          </rect>
          <text x="${x + bw/2}" y="${y - 4}" text-anchor="middle" font-size="10" fill="var(--text)" font-weight="700">${d.value}</text>
          <text x="${x + bw/2}" y="${pad.top + innerH + 16}" text-anchor="middle" font-size="9" fill="var(--text-muted)">${escapeHtml(d.label)}</text>
        </g>
      `;
    }).join("");

    // Y-axis ticks
    let yTicks = "";
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + innerH - (i / 4) * innerH;
      const v = Math.round((i / 4) * max);
      yTicks += `
        <line x1="${pad.left}" y1="${y}" x2="${pad.left + innerW}" y2="${y}" stroke="var(--border)" stroke-dasharray="2 2"/>
        <text x="${pad.left - 6}" y="${y + 3}" text-anchor="end" font-size="9" fill="var(--text-muted)">${v}</text>
      `;
    }

    return `<svg viewBox="0 0 ${w} ${h}" class="chart" style="width:100%;height:auto">${yTicks}${bars}</svg>`;
  }

  // line chart (sparkline)
  function lineChart(data, opts = {}) {
    const w = opts.width || 600;
    const h = opts.height || 100;
    const pad = 20;
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const range = max - min || 1;
    const stepX = (w - pad * 2) / (data.length - 1 || 1);
    const points = data.map((v, i) => {
      const x = pad + i * stepX;
      const y = pad + (h - pad * 2) - ((v - min) / range) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
    const fillPoints = `${pad},${h-pad} ${points} ${w-pad},${h-pad}`;
    return `<svg viewBox="0 0 ${w} ${h}" class="chart" style="width:100%;height:auto">
      <defs>
        <linearGradient id="lc-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--sun-400)" stop-opacity=".4"/>
          <stop offset="100%" stop-color="var(--sun-400)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon fill="url(#lc-grad)" points="${fillPoints}"/>
      <polyline fill="none" stroke="var(--sun-500)" stroke-width="2" points="${points}" stroke-linecap="round" stroke-linejoin="round"/>
      ${data.map((v, i) => {
        const x = pad + i * stepX;
        const y = pad + (h - pad * 2) - ((v - min) / range) * (h - pad * 2);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2" fill="var(--sun-500)"/>`;
      }).join("")}
    </svg>`;
  }

  // donut chart
  function donutChart(data, opts = {}) {
    // data: [{label, value, color}]
    const size = opts.size || 200;
    const r = size / 2 - 10;
    const cx = size / 2, cy = size / 2;
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    let cum = 0;
    const slices = data.map(d => {
      const start = cum / total * Math.PI * 2 - Math.PI / 2;
      cum += d.value;
      const end = cum / total * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + Math.cos(start) * r;
      const y1 = cy + Math.sin(start) * r;
      const x2 = cx + Math.cos(end) * r;
      const y2 = cy + Math.sin(end) * r;
      const large = (end - start) > Math.PI ? 1 : 0;
      return `<path d="M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="${d.color || 'var(--sun-400)'}" opacity=".9">
        <title>${escapeHtml(d.label)}: ${d.value} (${(d.value/total*100).toFixed(0)}%)</title>
      </path>`;
    }).join("");
    return `<svg viewBox="0 0 ${size} ${size}" class="chart" style="width:100%;max-width:${size}px;height:auto">
      ${slices}
      <circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="var(--surface)"/>
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="800" fill="var(--text)">${total}</text>
      <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="10" fill="var(--text-muted)">razem</text>
    </svg>`;
  }

  // ---------------- Bulk select helper ----------------
  // Adds checkboxes to table rows, manages "select all", returns selected IDs
  function bulkSelect(table, onSelectionChange) {
    if (!table) return { selected: () => [] };
    const state = new Set();

    function addCheckboxes() {
      // Header
      const thead = table.querySelector("thead tr");
      if (thead && !thead.querySelector(".bulk-th")) {
        const th = document.createElement("th");
        th.className = "bulk-th";
        th.style.width = "32px";
        th.innerHTML = `<input type="checkbox" class="bulk-all" aria-label="Zaznacz wszystkie">`;
        thead.insertBefore(th, thead.firstChild);
      }
      // Rows
      table.querySelectorAll("tbody tr").forEach(tr => {
        if (!tr.dataset.id || tr.querySelector(".bulk-cb")) return;
        const td = document.createElement("td");
        td.innerHTML = `<input type="checkbox" class="bulk-cb" data-id="${tr.dataset.id}">`;
        tr.insertBefore(td, tr.firstChild);
      });
    }
    addCheckboxes();

    table.addEventListener("change", e => {
      if (e.target.matches(".bulk-all")) {
        table.querySelectorAll(".bulk-cb").forEach(cb => {
          cb.checked = e.target.checked;
          if (e.target.checked) state.add(cb.dataset.id);
          else state.delete(cb.dataset.id);
        });
        onSelectionChange && onSelectionChange([...state]);
      } else if (e.target.matches(".bulk-cb")) {
        if (e.target.checked) state.add(e.target.dataset.id);
        else state.delete(e.target.dataset.id);
        onSelectionChange && onSelectionChange([...state]);
      }
    });

    return { selected: () => [...state], reset: () => { state.clear(); table.querySelectorAll(".bulk-cb,.bulk-all").forEach(cb => cb.checked = false); onSelectionChange && onSelectionChange([]); }, refresh: addCheckboxes };
  }

  // ---------------- Modal helper ----------------
  function modal({ title, body, footer, onClose }) {
    const wrap = document.createElement("div");
    wrap.className = "admin-modal-backdrop";
    wrap.innerHTML = `
      <div class="admin-modal">
        <div class="admin-modal-head">
          <h3>${title || ''}</h3>
          <button class="row-action-btn" data-close>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="admin-modal-body">${typeof body === 'string' ? body : ''}</div>
        ${footer ? `<div class="admin-modal-foot">${footer}</div>` : ''}
      </div>
    `;
    document.body.appendChild(wrap);
    if (typeof body !== 'string') wrap.querySelector(".admin-modal-body").appendChild(body);

    requestAnimationFrame(() => wrap.classList.add("open"));
    function close() {
      wrap.classList.remove("open");
      setTimeout(() => wrap.remove(), 300);
      onClose && onClose();
    }
    wrap.addEventListener("click", e => {
      if (e.target === wrap || e.target.closest("[data-close]")) close();
    });
    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
    });
    return { close, root: wrap };
  }

  function confirmDialog(message) {
    return new Promise(resolve => {
      const m = modal({
        title: "Potwierdzenie",
        body: `<p>${message}</p>`,
        footer: `
          <button class="btn btn-ghost" data-close>Anuluj</button>
          <button class="btn btn-danger" id="cf-yes">Usuń</button>
        `
      });
      m.root.querySelector("#cf-yes").addEventListener("click", () => {
        m.close();
        resolve(true);
      });
      m.root.addEventListener("click", e => {
        if (e.target === m.root || e.target.matches("[data-close]")) resolve(false);
      });
    });
  }

  // Gradient picker widget
  function gradientPicker(currentValue, onChange) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="gradient-preview" id="gp-preview" style="background:${currentValue || GRADIENT_PRESETS[0]}"></div>
      <div class="gradient-presets" id="gp-presets">
        ${GRADIENT_PRESETS.map(g => `<div data-grad="${g}" style="background:${g}" class="${g === currentValue ? 'active' : ''}"></div>`).join("")}
      </div>
      <input type="text" id="gp-custom" placeholder="lub własny CSS gradient/kolor" value="${currentValue || ''}" style="font-family:monospace;font-size:.85rem">
    `;
    div.querySelector("#gp-presets").addEventListener("click", e => {
      const el = e.target.closest("[data-grad]");
      if (!el) return;
      div.querySelectorAll("#gp-presets > *").forEach(n => n.classList.remove("active"));
      el.classList.add("active");
      const val = el.dataset.grad;
      div.querySelector("#gp-preview").style.background = val;
      div.querySelector("#gp-custom").value = val;
      onChange && onChange(val);
    });
    div.querySelector("#gp-custom").addEventListener("input", e => {
      div.querySelector("#gp-preview").style.background = e.target.value;
      onChange && onChange(e.target.value);
    });
    return div;
  }

  // Mini WYSIWYG (contentEditable + execCommand)
  function richEditor(initialHtml = "") {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="editor-toolbar">
        <button type="button" data-cmd="bold" title="Pogrubienie"><b>B</b></button>
        <button type="button" data-cmd="italic" title="Kursywa"><i>I</i></button>
        <button type="button" data-cmd="underline" title="Podkreślenie"><u>U</u></button>
        <button type="button" data-cmd="formatBlock" data-arg="h3">H3</button>
        <button type="button" data-cmd="formatBlock" data-arg="p">P</button>
        <button type="button" data-cmd="insertUnorderedList">• Lista</button>
        <button type="button" data-cmd="insertOrderedList">1. Lista</button>
        <button type="button" data-cmd="createLink">🔗 Link</button>
        <button type="button" data-cmd="removeFormat" title="Wyczyść">⌫</button>
      </div>
      <div class="editor-content" contenteditable="true">${initialHtml}</div>
    `;
    div.querySelector(".editor-toolbar").addEventListener("click", e => {
      const btn = e.target.closest("button[data-cmd]");
      if (!btn) return;
      e.preventDefault();
      const cmd = btn.dataset.cmd;
      let arg = btn.dataset.arg;
      if (cmd === "createLink") {
        arg = prompt("URL:", "https://");
        if (!arg) return;
      }
      document.execCommand(cmd, false, arg);
      div.querySelector(".editor-content").focus();
    });
    div.getValue = () => div.querySelector(".editor-content").innerHTML;
    return div;
  }

  // Slugify helper
  function slugify(text) {
    return (text || "")
      .toLowerCase()
      .replace(/ą/g,"a").replace(/ć/g,"c").replace(/ę/g,"e").replace(/ł/g,"l")
      .replace(/ń/g,"n").replace(/ó/g,"o").replace(/ś/g,"s").replace(/ź/g,"z").replace(/ż/g,"z")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Public API
  window.Admin = {
    init,
    modal,
    confirmDialog,
    gradientPicker,
    richEditor,
    slugify,
    GRADIENT_PRESETS,
    logActivity,
    getActivities,
    clearActivities,
    makeSortable,
    imageEditor,
    barChart,
    lineChart,
    donutChart,
    bulkSelect,
    showShortcutsHelp
  };
})();
