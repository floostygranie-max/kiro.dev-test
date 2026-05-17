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
      ["trasy-rowerowe.html", "Trasy rowerowe"],
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

  // ---------------- SUN — sunrise/sunset calculation (NOAA-based) ----------------
  // Lat/Lon for Pustynia Błędowska (Klucze, MŚ): 50.346°N, 19.487°E
  function sunTimes(date = new Date(), lat = 50.346, lon = 19.487) {
    const rad = Math.PI / 180;
    const start = new Date(date.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((date - start) / 86400000);
    // Solar declination (Spencer formula simplified)
    const gamma = 2 * Math.PI / 365 * (dayOfYear - 1);
    const decl = 0.006918 - 0.399912*Math.cos(gamma) + 0.070257*Math.sin(gamma)
                - 0.006758*Math.cos(2*gamma) + 0.000907*Math.sin(2*gamma)
                - 0.002697*Math.cos(3*gamma) + 0.00148*Math.sin(3*gamma);
    // Hour angle (zenith 90.833° accounts for atmospheric refraction)
    const zenith = 90.833 * rad;
    const cosH = (Math.cos(zenith) - Math.sin(lat*rad)*Math.sin(decl)) / (Math.cos(lat*rad)*Math.cos(decl));
    if (cosH < -1) return { sunrise: "—", sunset: "—", dayLength: "24:00", polarDay: true };
    if (cosH > 1)  return { sunrise: "—", sunset: "—", dayLength: "00:00", polarNight: true };
    const H = Math.acos(cosH);
    // UTC times in hours
    const sunriseUTC = 12 - H * 12 / Math.PI - lon / 15;
    const sunsetUTC  = 12 + H * 12 / Math.PI - lon / 15;
    // Local timezone offset (Poland: CET=+1 / CEST=+2)
    const offset = -date.getTimezoneOffset() / 60;
    return {
      sunrise: hoursToHM(sunriseUTC + offset),
      sunset:  hoursToHM(sunsetUTC + offset),
      dayLength: hoursToHM((sunsetUTC - sunriseUTC + 24) % 24),
      sunriseHours: (sunriseUTC + offset + 24) % 24,
      sunsetHours:  (sunsetUTC + offset + 24) % 24
    };
  }
  function hoursToHM(h) {
    if (h < 0) h += 24;
    if (h >= 24) h -= 24;
    const hh = Math.floor(h);
    const mm = Math.round((h - hh) * 60);
    return String(hh).padStart(2, "0") + ":" + String(mm % 60).padStart(2, "0");
  }

  // ---------------- WEATHER simulator (deterministic by date) ----------------
  // No external API — generates pseudo-realistic weather based on month + day.
  function getWeather(date = new Date()) {
    const month = date.getMonth(); // 0–11
    const dayKey = date.toISOString().slice(0,10);
    // Climate base for Pustynia Błędowska (continental, dry, sunny)
    const baseTemp = [
      -2, 0, 5, 11, 16, 20, 22, 21, 16, 10, 4, 0   // monthly avg max
    ][month];
    // Seeded "random" using day key (consistent within the same day)
    const seed = [...dayKey].reduce((s,c) => s + c.charCodeAt(0), 0);
    const rng = (n) => {
      const x = Math.sin(seed + n) * 10000;
      return x - Math.floor(x);
    };
    const tempVar = (rng(1) - 0.5) * 8;
    const temp = Math.round(baseTemp + tempVar);
    const conditions = [
      { code: "sunny",   label: "Słonecznie",      icon: "☀️", emoji: "☀️" },
      { code: "partly",  label: "Częściowe zachmurzenie", icon: "⛅", emoji: "⛅" },
      { code: "cloudy",  label: "Pochmurno",       icon: "☁️", emoji: "☁️" },
      { code: "rain",    label: "Przelotne opady", icon: "🌧️", emoji: "🌧️" },
      { code: "storm",   label: "Burza",           icon: "⛈️", emoji: "⛈️" },
      { code: "snow",    label: "Opady śniegu",    icon: "❄️", emoji: "❄️" },
      { code: "fog",     label: "Mgła",            icon: "🌫️", emoji: "🌫️" }
    ];
    // Weather distribution by month — desert area = mostly sunny
    let pool;
    if (month >= 11 || month <= 1) pool = ["snow","cloudy","cloudy","fog","partly","sunny"];
    else if (month <= 3) pool = ["cloudy","partly","sunny","rain","fog"];
    else if (month <= 8) pool = ["sunny","sunny","partly","partly","cloudy","storm","rain"];
    else pool = ["sunny","partly","cloudy","cloudy","rain","fog"];
    const cond = conditions.find(c => c.code === pool[Math.floor(rng(2) * pool.length)]) || conditions[0];

    const wind = Math.round(8 + rng(3) * 18); // 8–26 km/h (windy region!)
    const humidity = Math.round(40 + rng(4) * 40); // 40–80%
    const feels = temp - Math.round(rng(5) * 3);
    const uv = Math.max(0, Math.round((1 - Math.abs(month - 6) / 6) * 10 - rng(6) * 2));

    // Recommendation
    let recommendation;
    if (cond.code === "storm" || cond.code === "snow") recommendation = "Lepiej zostań w domu — niesprzyjająca pogoda!";
    else if (cond.code === "rain") recommendation = "Weź pelerynę i odkryj pustynię w deszczu.";
    else if (temp >= 25 && cond.code === "sunny") recommendation = "Idealna pogoda na sandboarding! Pamiętaj o wodzie.";
    else if (temp >= 18) recommendation = "Świetne warunki na zwiedzanie i fotografię.";
    else if (temp >= 10) recommendation = "Ubierz się ciepło — w sam raz na spacery.";
    else if (temp >= 0)  recommendation = "Zimowy klimat — pustynia zaśnieżona wygląda magicznie.";
    else recommendation = "Mróz — wybierz krótszy szlak i ciepłą herbatę w kawiarni.";

    // 24h forecast (hourly)
    const hourly = Array.from({ length: 24 }, (_, h) => {
      // Day curve: peak ~ 14:00, min ~ 5:00
      const tHour = baseTemp + tempVar + Math.cos((h - 14) / 12 * Math.PI) * 7;
      return Math.round(tHour);
    });

    // 5-day forecast
    const days = ["Pn","Wt","Śr","Cz","Pt","Sb","Nd"];
    const forecast = Array.from({ length: 5 }, (_, i) => {
      const d = new Date(date); d.setDate(d.getDate() + i);
      const dKey = d.toISOString().slice(0,10);
      const dSeed = [...dKey].reduce((s,c) => s + c.charCodeAt(0), 0);
      const dRng = (n) => { const x = Math.sin(dSeed + n) * 10000; return x - Math.floor(x); };
      const dTemp = Math.round(baseTemp + (dRng(1) - 0.5) * 8);
      const dCond = conditions.find(c => c.code === pool[Math.floor(dRng(2) * pool.length)]) || conditions[0];
      return {
        day: i === 0 ? "Dziś" : days[(d.getDay() + 6) % 7],
        date: d.getDate() + "." + String(d.getMonth() + 1).padStart(2, "0"),
        temp: dTemp,
        tempMin: dTemp - 4 - Math.round(dRng(7) * 4),
        cond: dCond
      };
    });

    return { temp, feels, condition: cond, wind, humidity, uv, recommendation, hourly, forecast };
  }

  // ---------------- Init ----------------
  document.addEventListener("DOMContentLoaded", () => {
    injectChrome();
    setupReveal();
    animateCounters();
  });

  // ---------------- PARTNER LOGOS — stylized SVG generator ----------------
  function partnerLogoSVG(partner) {
    const size = 200;
    const colors = (partner.logo && partner.logo.colors) || ["#8B5A2B","#1F1F1F"];
    const kind = (partner.logo && partner.logo.kind) || "circle";
    const initials = partner.name.split(/\s+/).slice(0, 2).map(w => w[0]).filter(Boolean).join("").toUpperCase();

    let shape = "";
    switch (kind) {
      case "shield":
        shape = `<path d="M${size/2} 30 L${size-30} 60 L${size-30} 130 Q${size-30} 165 ${size/2} 180 Q30 165 30 130 L30 60 Z" fill="url(#g)"/>`;
        break;
      case "key":
        shape = `<circle cx="${size/2-20}" cy="${size/2}" r="55" fill="url(#g)"/><circle cx="${size/2-20}" cy="${size/2}" r="22" fill="white"/><rect x="${size/2+25}" y="${size/2-12}" width="60" height="24" fill="url(#g)" rx="4"/><rect x="${size/2+60}" y="${size/2-22}" width="14" height="14" fill="url(#g)"/><rect x="${size/2+60}" y="${size/2+8}" width="14" height="14" fill="url(#g)"/>`;
        break;
      case "leaf":
        shape = `<path d="M${size/2} 40 Q40 60 35 110 Q60 160 ${size/2} 165 Q140 160 165 110 Q160 60 ${size/2} 40 Z" fill="url(#g)"/><path d="M${size/2} 50 L${size/2} 165" stroke="white" stroke-width="3" opacity=".6"/>`;
        break;
      case "tree":
        shape = `<path d="M${size/2} 30 L${size/2-50} 120 L${size/2-30} 120 L${size/2-65} 165 L${size/2+65} 165 L${size/2+30} 120 L${size/2+50} 120 Z" fill="url(#g)"/><rect x="${size/2-10}" y="160" width="20" height="20" fill="${colors[1]}"/>`;
        break;
      case "drop":
        shape = `<path d="M${size/2} 35 Q40 100 50 130 Q60 175 ${size/2} 175 Q140 175 150 130 Q160 100 ${size/2} 35 Z" fill="url(#g)"/>`;
        break;
      case "stars":
        shape = `<rect x="20" y="40" width="${size-40}" height="${size-80}" fill="url(#g)" rx="6"/>` +
          `<g fill="${colors[1]}">` +
          [[60,90],[105,80],[150,90],[60,135],[105,145],[150,135],[80,110],[130,110]]
            .map(([cx,cy]) => `<polygon points="${cx},${cy-8} ${cx+2.5},${cy-3} ${cx+8},${cy-3} ${cx+3.5},${cy+1} ${cx+5},${cy+8} ${cx},${cy+4} ${cx-5},${cy+8} ${cx-3.5},${cy+1} ${cx-8},${cy-3} ${cx-2.5},${cy-3}"/>`).join("") +
          `</g>`;
        break;
      case "wave":
        shape = `<rect x="20" y="40" width="${size-40}" height="${size-80}" fill="url(#g)" rx="${size/2}"/>` +
          `<g fill="white" opacity=".7">` +
          `<path d="M40 100 Q60 80 80 100 T120 100 T160 100" stroke="white" stroke-width="4" fill="none"/>` +
          `<path d="M40 120 Q60 100 80 120 T120 120 T160 120" stroke="white" stroke-width="3" fill="none" opacity=".6"/>` +
          `</g>`;
        break;
      case "rect":
        shape = `<rect x="20" y="40" width="${size-40}" height="${size-80}" fill="url(#g)" rx="6"/>`;
        break;
      case "circle":
      default:
        shape = `<circle cx="${size/2}" cy="${size/2}" r="${size/2-20}" fill="url(#g)"/>`;
    }

    const initialsText = `<text x="${size/2}" y="${size/2+10}" text-anchor="middle" fill="white" font-family="Georgia, serif" font-weight="800" font-size="42" letter-spacing="2">${escapeHtml(initials)}</text>`;
    const skipInitials = ["leaf","key","tree","drop","stars","wave"].includes(kind);

    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" class="partner-logo-svg" aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors[0]}"/>
          <stop offset="100%" stop-color="${colors[1] || colors[0]}"/>
        </linearGradient>
      </defs>
      ${shape}
      ${skipInitials ? '' : initialsText}
    </svg>`;
  }

  // Public API
  window.App = { toast, fmtDate, fmtDateShort, escapeHtml, animateCounters, subscribeNewsletter, sunTimes, getWeather, partnerLogoSVG };
})();
