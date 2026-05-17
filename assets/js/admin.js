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
      { href: "news.html", label: "Aktualności", icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>' },
      { href: "events.html", label: "Wydarzenia", icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
      { href: "gallery.html", label: "Galeria", icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>' },
      { section: "Treści" },
      { href: "projects.html", label: "Projekty", icon: '<path d="M2 6a2 2 0 0 1 2-2h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/>' },
      { href: "prices.html", label: "Cennik", icon: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
      { href: "poi.html", label: "Mapa / POI", icon: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>' },
      { href: "pages.html", label: "Strony stałe", icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>' },
      { section: "Komunikacja" },
      { href: "messages.html", label: "Wiadomości", icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', badge: newMessages },
      { href: "subscribers.html", label: "Subskrybenci", icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>' },
      { section: "System" },
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

    return true;
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
    GRADIENT_PRESETS
  };
})();
