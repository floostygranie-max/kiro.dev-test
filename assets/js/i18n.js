/**
 * I18N — Internationalization system for Pustynia Błędowska
 *
 * Usage:
 *   I18n.t("nav.home")            → "Strona główna" or "Home"
 *   I18n.setLang("en")            → switches language and re-renders
 *   I18n.localized(item, "name")  → returns item.name_en if EN active, else item.name
 *
 * Adding translations:
 *   1. Add a new key in DICT.pl AND DICT.en below
 *   2. Use data-i18n="key" on any HTML element OR I18n.t("key") in JS
 *   3. For dynamic content with _en variants, use I18n.localized(item, "name")
 */

(function (global) {
  "use strict";

  const STORAGE_KEY = "pustynia_lang";

  const DICT = {
    pl: {
      // ============ CHROME / NAV ============
      "nav.home":        "Strona główna",
      "nav.news":        "Aktualności",
      "nav.events":      "Wydarzenia",
      "nav.about":       "Polska Sahara",
      "nav.projects":    "Projekty",
      "nav.bikes":       "Trasy rowerowe",
      "nav.pricing":     "Cennik",
      "nav.gallery":     "Galeria",
      "nav.map":         "Mapa",
      "nav.contact":     "Kontakt",
      "nav.partners":    "Partnerzy",

      // Top bar
      "topbar.openNow":  "Otwarte teraz",
      "topbar.closed":   "Zamknięte",
      "topbar.hours":    "Pn–Nd: 8:00–20:00",

      // Footer
      "footer.about":          "Największy obszar lotnych piasków w Europie Środkowej. Unikalny rezerwat przyrody, który od wieków fascynuje przyrodników, artystów i podróżników.",
      "footer.visit":          "Zwiedzanie",
      "footer.tickets":        "Cennik i bilety",
      "footer.mapTrails":      "Mapa i szlaki",
      "footer.events":         "Wydarzenia",
      "footer.gallery":        "Galeria",
      "footer.about_section":  "O pustyni",
      "footer.about_link":     "Polska Sahara",
      "footer.news":           "Aktualności",
      "footer.projects":       "Projekty",
      "footer.contact":        "Kontakt",
      "footer.newsletter":     "Newsletter",
      "footer.newsletterText": "Zapisz się — otrzymasz info o wydarzeniach.",
      "footer.email":          "Twój email",
      "footer.subscribe":      "Zapisz",
      "footer.allRights":      "Wszelkie prawa zastrzeżone.",
      "footer.privacy":        "Polityka prywatności",
      "footer.terms":          "Regulamin",
      "footer.cookies":        "Cookies",
      "footer.admin":          "Panel administratora",

      // Common buttons / labels
      "btn.readMore":     "Czytaj więcej",
      "btn.viewAll":      "Zobacz wszystkie",
      "btn.details":      "Szczegóły",
      "btn.book":         "Zapisz się",
      "btn.share":        "Udostępnij",
      "btn.copy":         "Kopiuj",
      "btn.copied":       "Skopiowano!",
      "btn.back":         "Wróć",
      "btn.send":         "Wyślij",
      "btn.cancel":       "Anuluj",
      "btn.save":         "Zapisz",
      "btn.delete":       "Usuń",
      "btn.edit":         "Edytuj",
      "btn.search":       "Szukaj",
      "btn.filter":       "Filtruj",
      "btn.allCategories":"Wszystkie kategorie",

      // Page hero titles
      "page.news.title":      "Aktualności",
      "page.news.lead":       "Najnowsze wiadomości, ogłoszenia i ciekawostki z naszego rezerwatu.",
      "page.events.title":    "Wydarzenia",
      "page.events.lead":     "Rekonstrukcje, biegi, warsztaty, obserwacje gwiazd.",
      "page.about.title":     "Polska Sahara",
      "page.about.lead":      "Pustynia Błędowska — największy obszar lotnych piasków w Europie Środkowej.",
      "page.projects.title":  "Projekty",
      "page.projects.lead":   "Inwestycje w infrastrukturę, ochronę przyrody, edukację i nowe technologie.",
      "page.bikes.title":     "Trasy rowerowe",
      "page.bikes.lead":      "6 oznakowanych szlaków o łącznej długości 73 km.",
      "page.pricing.title":   "Cennik",
      "page.pricing.lead":    "Bilety, atrakcje, udostępnianie terenu, parking, toalety.",
      "page.gallery.title":   "Galeria",
      "page.gallery.lead":    "Pustynia w obiektywie najlepszych fotografów.",
      "page.map.title":       "Interaktywna mapa pustyni",
      "page.map.lead":        "Punkty widokowe, parkingi, gastronomia, toalety, punkty fotograficzne.",
      "page.contact.title":   "Kontakt",
      "page.contact.lead":    "Wybierz dział do którego chcesz się odezwać.",
      "page.partners.title":  "Partnerzy i sponsorzy",
      "page.partners.lead":   "Pustynia Błędowska to projekt zbiorowy.",

      // Hero
      "hero.title1":          "Pustynia Błędowska",
      "hero.subtitle":        "· Polska Sahara ·",
      "hero.lead":            "Największy obszar lotnych piasków w Europie Środkowej. 32 km² niezwykłego krajobrazu, rezerwat Natura 2000 — miejsce, w którym Polska wygląda jak Afryka.",
      "hero.cta.plan":        "Zaplanuj wizytę",
      "hero.cta.history":     "Poznaj historię",
      "hero.cta.gallery":     "Zobacz galerię",
      "hero.scroll":          "Przewiń",

      // Sections
      "sec.whyVisit.eyebrow": "Dlaczego warto",
      "sec.whyVisit.title":   "Miejsce, którego nie zapomnisz",
      "sec.whyVisit.lead":    "Sześć powodów, dla których Pustynia Błędowska przyciąga ponad 100 tysięcy odwiedzających rocznie",
      "sec.nextEvent.eyebrow":"Najbliższe wydarzenie",
      "sec.nextEvent.title":  "Nie przegap!",
      "sec.news.eyebrow":     "Aktualności",
      "sec.news.title":       "Co nowego na pustyni?",
      "sec.gallery.eyebrow":  "Galeria",
      "sec.gallery.title":    "Pustynia w obiektywie",
      "sec.partners.eyebrow": "Partnerzy i fundatorzy",
      "sec.partners.title":   "Razem dbamy o pustynię",
      "sec.partners.viewAll": "Wszyscy partnerzy",
      "sec.testimonials.eyebrow": "Opinie odwiedzających",
      "sec.testimonials.title":   "Co mówią nasi goście",

      // Time/dates
      "time.now":     "Teraz",
      "time.days":    "dni",
      "time.hours":   "godz",
      "time.min":     "min",
      "time.sec":     "sek",
      "time.starts":  "Rozpoczyna się",

      // Toast / messages
      "toast.subscribed":   "Dziękujemy za zapisanie się!",
      "toast.linkCopied":   "Link skopiowany!",
      "toast.gpsCopied":    "Współrzędne skopiowane!",
      "toast.messageSent":  "Wiadomość wysłana! Odpowiemy w ciągu 24h.",

      // Misc
      "label.author":  "Autor",
      "label.date":    "Data",
      "label.views":   "Wyświetlenia",
      "label.tags":    "Tagi",
      "label.category":"Kategoria",
      "label.location":"Lokalizacja",
      "label.price":   "Cena",
      "label.from":    "Od",
      "label.until":   "Do",
      "label.duration":"Czas trwania",
      "label.distance":"Długość",
      "label.difficulty":"Trudność"
    },

    en: {
      // ============ CHROME / NAV ============
      "nav.home":        "Home",
      "nav.news":        "News",
      "nav.events":      "Events",
      "nav.about":       "Polish Sahara",
      "nav.projects":    "Projects",
      "nav.bikes":       "Bike trails",
      "nav.pricing":     "Pricing",
      "nav.gallery":     "Gallery",
      "nav.map":         "Map",
      "nav.contact":     "Contact",
      "nav.partners":    "Partners",

      "topbar.openNow":  "Open now",
      "topbar.closed":   "Closed",
      "topbar.hours":    "Mon–Sun: 8:00 AM – 8:00 PM",

      "footer.about":          "The largest area of shifting sands in Central Europe. A unique nature reserve that has fascinated naturalists, artists and travellers for centuries.",
      "footer.visit":          "Visit",
      "footer.tickets":        "Pricing & tickets",
      "footer.mapTrails":      "Map & trails",
      "footer.events":         "Events",
      "footer.gallery":        "Gallery",
      "footer.about_section":  "About the desert",
      "footer.about_link":     "Polish Sahara",
      "footer.news":           "News",
      "footer.projects":       "Projects",
      "footer.contact":        "Contact",
      "footer.newsletter":     "Newsletter",
      "footer.newsletterText": "Subscribe and get event updates.",
      "footer.email":          "Your email",
      "footer.subscribe":      "Subscribe",
      "footer.allRights":      "All rights reserved.",
      "footer.privacy":        "Privacy policy",
      "footer.terms":          "Terms",
      "footer.cookies":        "Cookies",
      "footer.admin":          "Admin panel",

      "btn.readMore":     "Read more",
      "btn.viewAll":      "View all",
      "btn.details":      "Details",
      "btn.book":         "Sign up",
      "btn.share":        "Share",
      "btn.copy":         "Copy",
      "btn.copied":       "Copied!",
      "btn.back":         "Back",
      "btn.send":         "Send",
      "btn.cancel":       "Cancel",
      "btn.save":         "Save",
      "btn.delete":       "Delete",
      "btn.edit":         "Edit",
      "btn.search":       "Search",
      "btn.filter":       "Filter",
      "btn.allCategories":"All categories",

      "page.news.title":      "News",
      "page.news.lead":       "The latest announcements and stories from our reserve.",
      "page.events.title":    "Events",
      "page.events.lead":     "Reenactments, races, workshops, stargazing.",
      "page.about.title":     "Polish Sahara",
      "page.about.lead":      "Błędów Desert — the largest area of shifting sands in Central Europe.",
      "page.projects.title":  "Projects",
      "page.projects.lead":   "Investments in infrastructure, conservation, education and new technologies.",
      "page.bikes.title":     "Bike trails",
      "page.bikes.lead":      "6 marked trails with a total length of 73 km.",
      "page.pricing.title":   "Pricing",
      "page.pricing.lead":    "Tickets, attractions, area rentals, parking, restrooms.",
      "page.gallery.title":   "Gallery",
      "page.gallery.lead":    "The desert through the lens of the best photographers.",
      "page.map.title":       "Interactive desert map",
      "page.map.lead":        "Viewpoints, parking, food, restrooms, photo spots.",
      "page.contact.title":   "Contact",
      "page.contact.lead":    "Choose the department you want to reach.",
      "page.partners.title":  "Partners & sponsors",
      "page.partners.lead":   "Błędów Desert is a collective project.",

      "hero.title1":          "Błędów Desert",
      "hero.subtitle":        "· Polish Sahara ·",
      "hero.lead":            "The largest area of shifting sands in Central Europe. 32 km² of breathtaking landscape, a Natura 2000 reserve — where Poland looks like Africa.",
      "hero.cta.plan":        "Plan your visit",
      "hero.cta.history":     "Discover history",
      "hero.cta.gallery":     "View gallery",
      "hero.scroll":          "Scroll",

      "sec.whyVisit.eyebrow": "Why visit",
      "sec.whyVisit.title":   "A place you won't forget",
      "sec.whyVisit.lead":    "Six reasons why Błędów Desert attracts over 100 000 visitors a year",
      "sec.nextEvent.eyebrow":"Next event",
      "sec.nextEvent.title":  "Don't miss out!",
      "sec.news.eyebrow":     "News",
      "sec.news.title":       "What's happening in the desert?",
      "sec.gallery.eyebrow":  "Gallery",
      "sec.gallery.title":    "The desert in pictures",
      "sec.partners.eyebrow": "Partners & funders",
      "sec.partners.title":   "Together we care for the desert",
      "sec.partners.viewAll": "All partners",
      "sec.testimonials.eyebrow": "Visitor reviews",
      "sec.testimonials.title":   "What our guests say",

      "time.now":     "Now",
      "time.days":    "days",
      "time.hours":   "hrs",
      "time.min":     "min",
      "time.sec":     "sec",
      "time.starts":  "Starts",

      "toast.subscribed":   "Thanks for subscribing!",
      "toast.linkCopied":   "Link copied!",
      "toast.gpsCopied":    "Coordinates copied!",
      "toast.messageSent":  "Message sent! We'll reply within 24h.",

      "label.author":  "Author",
      "label.date":    "Date",
      "label.views":   "Views",
      "label.tags":    "Tags",
      "label.category":"Category",
      "label.location":"Location",
      "label.price":   "Price",
      "label.from":    "From",
      "label.until":   "Until",
      "label.duration":"Duration",
      "label.distance":"Length",
      "label.difficulty":"Difficulty"
    }
  };

  let currentLang = "pl";

  const I18n = {
    /** Current language code: "pl" or "en" */
    get lang() { return currentLang; },

    /** Initialise from localStorage (or browser default if first visit) */
    init() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (stored === "pl" || stored === "en")) {
        currentLang = stored;
      } else {
        // Detect from browser
        const browser = (navigator.language || "pl").slice(0, 2).toLowerCase();
        currentLang = (browser === "en") ? "en" : "pl";
      }
      document.documentElement.setAttribute("lang", currentLang);
      return currentLang;
    },

    /** Translate by key. Falls back to PL or to the key itself. */
    t(key, fallback) {
      const v = (DICT[currentLang] && DICT[currentLang][key]) || (DICT.pl && DICT.pl[key]);
      if (v) return v;
      return fallback != null ? fallback : key;
    },

    /** Switch language (persists, re-renders DOM) */
    setLang(lang) {
      if (lang !== "pl" && lang !== "en") return;
      currentLang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.setAttribute("lang", lang);
      this.applyAll();
      // Notify listeners
      window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
    },

    /** Replace all [data-i18n] / [data-i18n-attr] elements in the DOM */
    applyAll(scope = document) {
      scope.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = this.t(key);
      });
      // For attributes: data-i18n-attr="placeholder:btn.search,title:btn.share"
      scope.querySelectorAll("[data-i18n-attr]").forEach(el => {
        el.dataset.i18nAttr.split(",").forEach(pair => {
          const [attr, key] = pair.split(":").map(s => s.trim());
          if (attr && key) el.setAttribute(attr, this.t(key));
        });
      });
      // Update active state of language buttons
      document.querySelectorAll("[data-lang]").forEach(b => {
        b.classList.toggle("active", b.dataset.lang === currentLang);
      });
    },

    /** Get a localized field from a data item.
     *  Returns item.field_en when EN is active and exists, else item.field. */
    localized(item, field) {
      if (!item) return "";
      if (currentLang === "en" && item[field + "_en"]) return item[field + "_en"];
      return item[field] || "";
    },

    /** Wire up the lang switch buttons in header */
    bindLangSwitch() {
      document.querySelectorAll("[data-lang]").forEach(btn => {
        btn.addEventListener("click", () => {
          this.setLang(btn.dataset.lang);
        });
      });
    }
  };

  // Auto-init on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    I18n.init();
    // Run after App.injectChrome (header is built by app.js DOMContentLoaded handler)
    // Use a microtask to ensure chrome is in DOM
    setTimeout(() => {
      I18n.applyAll();
      I18n.bindLangSwitch();
    }, 0);
  });

  global.I18n = I18n;
})(window);
