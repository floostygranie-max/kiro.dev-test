/**
 * APP — Shared UI behaviors: header injection, footer, theme, scroll, toast, etc.
 */

(function () {
  "use strict";

  // ---------------- Logo SVG (inlined for instant render) ----------------
  const LOGO_SVG = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="100,8 180,52 180,148 100,192 20,148 20,52" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
    <g fill="currentColor">
      <polygon points="100,20 110,95 100,100 90,95"/>
      <polygon points="100,180 110,105 100,100 90,105"/>
      <polygon points="22,100 95,90 100,100 95,110"/>
      <polygon points="178,100 105,90 100,100 105,110"/>
      <polygon points="42,42 96,96 100,100 90,90"/>
      <polygon points="158,42 104,96 100,100 110,90"/>
      <polygon points="42,158 96,104 100,100 90,110"/>
      <polygon points="158,158 104,104 100,100 110,110"/>
    </g>
  </svg>`;

  // ---------------- Header markup ----------------
  function buildHeader() {
    const path = location.pathname.split("/").pop() || "index.html";
    const links = [
      ["index.html", "Strona główna"],
      ["aktualnosci.html", "Aktualności"],
      ["wydarzenia.html", "Wydarzenia"],
      ["polska-sahara.html", "Polska Sahara"],
      ["projekty.html", "Projekty"],
      ["cennik.html", "Cennik"],
      ["galeria.html", "Galeria"],
      ["mapa.html", "Mapa"],
      ["kontakt.html", "Kontakt"]
    ];

    const isOpen = (() => {
      const h = new Date().getHours();
      return h >= 8 && h < 20;
    })();

    return `
    <div class="top-bar">
      <div class="container-wide">
        <div class="top-bar-left">
          <a href="kontakt.html">📞 +48 32 642 03 02</a>
          <a href="kontakt.html">✉ kontakt@pustynia-bledowska.eu</a>
        </div>
        <div class="top-bar-right">
          <span class="open-status"><span class="dot"></span> ${isOpen ? "Otwarte teraz" : "Zamknięte"}</span>
          <span>Pn–Nd: 8:00–20:00</span>
        </div>
      </div>
    </div>
    <header class="site-header" id="siteHeader">
      <div class="container-wide">
        <a href="index.html" class="brand">
          <span class="brand-logo">${LOGO_SVG}</span>
          <span class="brand-text">
            PUSTYNIA BŁĘDOWSKA
            <small>POLSKA SAHARA</small>
          </span>
        </a>

        <nav class="main-nav" id="mainNav">
          ${links.map(([href, label]) => `
            <a href="${href}" class="${href === path ? "active" : ""}">${label}</a>
          `).join("")}
        </nav>

        <div class="header-tools">
          <div class="lang-switch" role="group" aria-label="Język">
            <button class="active" data-lang="pl">PL</button>
            <button data-lang="en">EN</button>
          </div>
          <button class="icon-btn theme-btn" id="themeBtn" aria-label="Przełącz motyw">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <button class="menu-toggle" id="menuToggle" aria-label="Menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    `;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    return `
    <footer class="site-footer">
      <div class="container-wide">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="brand">
              <span class="brand-logo" style="color:#FBF6EE">${LOGO_SVG}</span>
              <span class="brand-text">PUSTYNIA BŁĘDOWSKA<small>POLSKA SAHARA</small></span>
            </a>
            <p>Największy obszar lotnych piasków w Europie Środkowej. Unikalny rezerwat przyrody, który od wieków fascynuje przyrodników, artystów i podróżników.</p>
            <div class="social-links">
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.4V22A10 10 0 0 0 22 12z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.2-1.5-.9-2.2c-.8-.9-1.7-.9-2.1-1C17 3.5 12 3.5 12 3.5s-5 0-8 .3c-.4.1-1.3.1-2.1 1C1.2 5.5 1 7 1 7S.8 8.7.8 10.5v1.6c0 1.8.2 3.5.2 3.5s.2 1.5.9 2.2c.8.9 1.9.9 2.4 1 1.7.2 7.7.3 7.7.3s5 0 8-.3c.4-.1 1.3-.1 2.1-1 .7-.7.9-2.2.9-2.2s.2-1.7.2-3.5v-1.6c0-1.8-.2-3.5-.2-3.5zM9.7 14.6V8.4l5.3 3.1-5.3 3.1z"/></svg></a>
              <a href="#" aria-label="TripAdvisor"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="7" cy="14" r="3.5"/><circle cx="17" cy="14" r="3.5"/><circle cx="7" cy="14" r="1" fill="#1F1F1F"/><circle cx="17" cy="14" r="1" fill="#1F1F1F"/><path d="M12 7c2 0 4 .5 5 1H7c1-.5 3-1 5-1z"/></svg></a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Zwiedzanie</h4>
            <ul>
              <li><a href="cennik.html">Cennik i bilety</a></li>
              <li><a href="mapa.html">Mapa i szlaki</a></li>
              <li><a href="wydarzenia.html">Wydarzenia</a></li>
              <li><a href="galeria.html">Galeria</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>O pustyni</h4>
            <ul>
              <li><a href="polska-sahara.html">Polska Sahara</a></li>
              <li><a href="aktualnosci.html">Aktualności</a></li>
              <li><a href="projekty.html">Projekty</a></li>
              <li><a href="kontakt.html">Kontakt</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Newsletter</h4>
            <p style="font-size:.85rem;color:var(--sand-300);margin-bottom:8px">Zapisz się — otrzymasz info o wydarzeniach.</p>
            <form class="newsletter-form" onsubmit="App.subscribeNewsletter(event)">
              <input type="email" placeholder="Twój email" required aria-label="Email">
              <button type="submit">Zapisz</button>
            </form>
            <p style="margin-top:16px;font-size:.85rem;color:var(--sand-300)">📍 Klucze, woj. małopolskie<br>📞 +48 32 642 03 02</p>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© ${year} Pustynia Błędowska. Wszelkie prawa zastrzeżone.</span>
          <div class="footer-bottom-links">
            <a href="#">Polityka prywatności</a>
            <a href="#">Regulamin</a>
            <a href="#">Cookies</a>
            <a href="admin/login.html">Panel administratora</a>
          </div>
        </div>
      </div>
    </footer>

    <button class="back-to-top" id="backToTop" aria-label="Wróć na górę">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
    `;
  }

  // ---------------- Inject & wire up ----------------
  function injectChrome() {
    const headerSlot = document.getElementById("header-slot");
    const footerSlot = document.getElementById("footer-slot");
    if (headerSlot) headerSlot.outerHTML = buildHeader();
    if (footerSlot) footerSlot.outerHTML = buildFooter();

    // Mobile menu
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open);
      });
    }

    // Scroll behaviors
    const header = document.getElementById("siteHeader");
    const back = document.getElementById("backToTop");
    function onScroll() {
      const y = window.scrollY;
      if (header) header.classList.toggle("scrolled", y > 50);
      if (back) back.classList.toggle("show", y > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (back) back.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Theme toggle
    const themeBtn = document.getElementById("themeBtn");
    const stored = localStorage.getItem("pustynia_theme") || "light";
    document.documentElement.setAttribute("data-theme", stored);
    if (themeBtn) themeBtn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("pustynia_theme", next);
    });
  }

  // ---------------- Reveal-on-scroll ----------------
  function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    els.forEach(el => io.observe(el));
  }

  // ---------------- Toast ----------------
  function ensureToastRoot() {
    let root = document.querySelector(".toast-container");
    if (!root) {
      root = document.createElement("div");
      root.className = "toast-container";
      document.body.appendChild(root);
    }
    return root;
  }
  function toast(msg, type = "") {
    const root = ensureToastRoot();
    const el = document.createElement("div");
    el.className = "toast " + (type === "ok" ? "toast-ok" : type === "err" ? "toast-err" : "");
    el.textContent = msg;
    root.appendChild(el);
    setTimeout(() => {
      el.style.transition = "opacity .3s, transform .3s";
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      setTimeout(() => el.remove(), 300);
    }, 2800);
  }

  // ---------------- Helpers ----------------
  const fmtDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
  };
  const fmtDateShort = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" });
  };
  const escapeHtml = (s) => String(s == null ? "" : s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");

  // Stat counter animation
  function animateCounters(scope = document) {
    scope.querySelectorAll("[data-counter]").forEach(el => {
      const target = parseFloat(el.dataset.counter);
      const dur = 1500;
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString("pl-PL");
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // Newsletter
  function subscribeNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector("input").value.trim();
    if (!email) return;
    if (window.Store) Store.add("subscribers", { email, date: new Date().toISOString() });
    e.target.reset();
    toast("Dziękujemy za zapisanie się!", "ok");
  }

  // ---------------- Init ----------------
  document.addEventListener("DOMContentLoaded", () => {
    injectChrome();
    setupReveal();
    animateCounters();
  });

  // Public API
  window.App = { toast, fmtDate, fmtDateShort, escapeHtml, animateCounters, subscribeNewsletter };
})();
