/**
 * STORE — Data layer for Pustynia Błędowska website
 * Uses localStorage as a simple database. Used by public site (read) and admin (CRUD).
 *
 * Collections:
 *   - news, events, projects, prices
 *   - galleryFolders, photos
 *   - poi (map points), trails
 *   - messages, subscribers
 *   - settings (site config), users (admin auth)
 */

(function (global) {
  "use strict";

  const KEY = "pustynia_db_v1";
  const SESSION_KEY = "pustynia_session";

  // ---- Default seed data ----
  const SEED = {
    settings: {
      siteName: "Pustynia Błędowska",
      tagline: "Polska Sahara",
      description: "Największy obszar lotnych piasków w Europie Środkowej. Unikalny rezerwat przyrody między Dąbrową Górniczą a Olkuszem.",
      contact: {
        phone: "+48 32 642 03 02",
        email: "kontakt@pustynia-bledowska.eu",
        address: "Klucze, woj. małopolskie",
        hours: "Pn–Nd: 8:00–20:00 (sezon letni)"
      },
      social: {
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        youtube: "https://youtube.com/"
      },
      stats: [
        { value: 32, suffix: " km²", label: "Powierzchnia pustyni" },
        { value: 30, suffix: " m", label: "Wysokość najwyższych wydm" },
        { value: 13, suffix: " w.", label: "Wieku, w którym powstała" },
        { value: 100, suffix: "k+", label: "Odwiedzających rocznie" }
      ]
    },

    news: [
      {
        id: "n1",
        title: "Nowy szlak edukacyjny już otwarty!",
        slug: "nowy-szlak-edukacyjny-juz-otwarty",
        excerpt: "Z radością informujemy o otwarciu nowego szlaku edukacyjnego prowadzącego przez najpiękniejsze zakątki Pustyni Błędowskiej.",
        content: "<p>Z ogromną radością informujemy o oficjalnym otwarciu nowego, w pełni oznakowanego szlaku edukacyjnego, który prowadzi przez najpiękniejsze zakątki Pustyni Błędowskiej.</p><p>Szlak liczy <strong>7,2 km</strong> i obejmuje 12 stacji edukacyjnych z tablicami informacyjnymi opisującymi historię, geologię oraz unikalną florę i faunę naszego rezerwatu. Trasa została zaprojektowana tak, aby była dostępna dla całej rodziny — dzieci, dorośli, a nawet osoby z ograniczoną mobilnością znajdą tu coś dla siebie.</p><h3>Co czeka na zwiedzających?</h3><ul><li>Punkt widokowy „Czubatka” na wysokości 382 m n.p.m.</li><li>Replikę dawnego osadnictwa</li><li>Strefa obserwacji ptaków</li><li>Interaktywne tablice z kodami QR</li></ul><p>Szlak dostępny jest codziennie od godziny 8:00 do zmierzchu. Wstęp bezpłatny.</p>",
        cover: "linear-gradient(135deg,#F4A340 0%,#8B5A2B 100%)",
        author: "Redakcja",
        date: "2026-05-10",
        category: "Infrastruktura",
        tags: ["szlak", "edukacja", "rodzina"],
        gallery: ["p1","p2","p3","p4","p7"],
        views: 1247,
        featured: true,
        published: true
      },
      {
        id: "n2",
        title: "Wiosenne kwitnienie szczotlichy siwej",
        slug: "wiosenne-kwitnienie-szczotlichy",
        excerpt: "Już niedługo będziemy mogli podziwiać niezwykłe zjawisko kwitnienia szczotlichy siwej — endemicznej rośliny pustyni.",
        content: "<p>Maj i czerwiec to wyjątkowy czas na pustyni. Zakwita wówczas <em>szczotlicha siwa</em> — gatunek trawy idealnie przystosowany do warunków pustynnych.</p><p>Roślina ta tworzy charakterystyczne srebrzysto-zielone kępy, które w blasku porannego słońca wyglądają jak diamenty rozsypane na piasku. Zapraszamy na poranne spacery o wschodzie słońca.</p>",
        cover: "linear-gradient(135deg,#A8C49B 0%,#3F5E32 100%)",
        author: "dr Anna Kowalska",
        date: "2026-05-05",
        category: "Przyroda",
        tags: ["flora", "wiosna", "fotografia"],
        gallery: ["p8","p9","p10"],
        views: 854,
        featured: true,
        published: true
      },
      {
        id: "n3",
        title: "Inwazja Pustynna 2026 — zapisy otwarte",
        slug: "inwazja-pustynna-2026",
        excerpt: "Doroczna rekonstrukcja historyczna z udziałem czołgów i pojazdów wojskowych. Zapisy dla uczestników i widzów.",
        content: "<p>Już 14–16 sierpnia 2026 odbędzie się <strong>XXII Inwazja Pustynna</strong> — największa rekonstrukcja historyczna w południowej Polsce.</p><p>W tym roku spodziewamy się ponad 200 rekonstruktorów oraz 30 historycznych pojazdów wojskowych, w tym czołgów T-34, Sherman i pojazdów Wehrmachtu.</p><p>Bilety w sprzedaży od 1 czerwca. Zapraszamy całe rodziny!</p>",
        cover: "linear-gradient(135deg,#8B5A2B 0%,#1F1F1F 100%)",
        author: "Komitet Organizacyjny",
        date: "2026-04-28",
        category: "Wydarzenia",
        tags: ["historia", "rekonstrukcja", "lato"],
        gallery: ["p11","p12","p15","p16"],
        views: 3421,
        featured: true,
        published: true
      },
      {
        id: "n4",
        title: "Punkt widokowy Czubatka — remont zakończony",
        slug: "czubatka-remont-zakonczony",
        excerpt: "Zakończyliśmy modernizację najpopularniejszego punktu widokowego na pustyni.",
        content: "<p>Po trzech miesiącach prac modernizacyjnych <strong>Punkt Widokowy Czubatka</strong> jest ponownie otwarty dla zwiedzających.</p><p>Nowa platforma widokowa o powierzchni 120 m² oferuje zapierający dech w piersiach widok na całą pustynię. Zainstalowane zostały nowoczesne lornetki, tablice interaktywne oraz ławki.</p>",
        cover: "linear-gradient(135deg,#D9BC8E 0%,#6B4422 100%)",
        author: "Zarząd",
        date: "2026-04-15",
        category: "Infrastruktura",
        tags: ["punkt widokowy", "modernizacja"],
        gallery: ["p1","p5","p6"],
        views: 612,
        featured: false,
        published: true
      },
      {
        id: "n5",
        title: "Jak fotografować pustynię? Warsztaty dla amatorów",
        slug: "warsztaty-fotograficzne",
        excerpt: "Zapisy na warsztaty fotograficzne pod okiem znanego fotografa krajobrazu Marcina Lewandowskiego.",
        content: "<p>Zapraszamy na trzydniowe warsztaty fotograficzne na Pustyni Błędowskiej. Trener: Marcin Lewandowski — laureat National Geographic Poland 2023.</p>",
        cover: "linear-gradient(135deg,#FFD27A 0%,#C56812 100%)",
        author: "Redakcja",
        date: "2026-04-02",
        category: "Edukacja",
        tags: ["fotografia", "warsztaty"],
        gallery: ["p2","p3","p4","p5","p6","p7"],
        views: 432,
        featured: false,
        published: true
      },
      {
        id: "n6",
        title: "Nowe tablice informacyjne w 4 językach",
        slug: "tablice-w-4-jezykach",
        excerpt: "Dla naszych zagranicznych gości zainstalowaliśmy tablice informacyjne w językach: angielskim, niemieckim, czeskim i ukraińskim.",
        content: "<p>W ramach projektu „Pustynia bez barier” zainstalowaliśmy 24 nowe tablice informacyjne dostępne w 4 językach.</p>",
        cover: "linear-gradient(135deg,#8FC6E0 0%,#234567 100%)",
        author: "Redakcja",
        date: "2026-03-20",
        category: "Infrastruktura",
        tags: ["dostępność", "turystyka"],
        gallery: [],
        views: 289,
        featured: false,
        published: true
      }
    ],

    events: [
      {
        id: "e1",
        seriesId: "inwazja",
        title: "Inwazja Pustynna 2026",
        slug: "inwazja-pustynna-2026",
        description: "Największa rekonstrukcja historyczna w południowej Polsce. Czołgi, pojazdy wojskowe, prelekcje, food trucki, koncerty.",
        startDate: "2026-08-14",
        endDate: "2026-08-16",
        time: "10:00 - 20:00",
        location: "Główne pole pustyni, sektor A",
        category: "Rekonstrukcja",
        capacity: 5000,
        registered: 1834,
        price: "30 zł",
        cover: "linear-gradient(135deg,#8B5A2B 0%,#1F1F1F 100%)",
        published: true
      },
      {
        id: "e2",
        seriesId: "perseidy",
        title: "Noc spadających gwiazd — Perseidy",
        slug: "perseidy-2026",
        description: "Wspólna obserwacja roju Perseidów z najlepszego miejsca w okolicy. Zerowe zanieczyszczenie świetlne, ciepła czekolada w cenie biletu.",
        startDate: "2026-08-12",
        endDate: "2026-08-13",
        time: "21:00 - 03:00",
        location: "Punkt widokowy Czubatka",
        category: "Astronomia",
        capacity: 200,
        registered: 156,
        price: "25 zł",
        cover: "linear-gradient(135deg,#1F1F1F 0%,#4A9BC4 100%)",
        published: true
      },
      {
        id: "e3",
        seriesId: "maraton",
        title: "Maraton Pustynny — bieg uliczny 21 km",
        slug: "maraton-pustynny-2026",
        description: "Półmaraton z metą na szczycie najwyższej wydmy. Trasa atestowana PZLA. Pakiety startowe z medalem.",
        startDate: "2026-09-05",
        endDate: "2026-09-05",
        time: "08:00",
        location: "Start: Klucze, Meta: Czubatka",
        category: "Sport",
        capacity: 800,
        registered: 421,
        price: "120 zł",
        cover: "linear-gradient(135deg,#F4A340 0%,#C56812 100%)",
        published: true
      },
      {
        id: "e4",
        title: "Warsztaty fotografii krajobrazu",
        slug: "warsztaty-fotografii",
        description: "Trzydniowe warsztaty pod okiem Marcina Lewandowskiego. Wschody, zachody, fotografia astro.",
        startDate: "2026-06-12",
        endDate: "2026-06-14",
        time: "różnie",
        location: "Cała pustynia",
        category: "Edukacja",
        capacity: 30,
        registered: 22,
        price: "850 zł",
        cover: "linear-gradient(135deg,#FFD27A 0%,#8B5A2B 100%)",
        published: true
      },
      {
        id: "e5",
        seriesId: "dziecko",
        title: "Dzień Dziecka na Pustyni",
        slug: "dzien-dziecka-2026",
        description: "Gry, zabawy, jazda quadami, animacje, dmuchańce, lody. Wstęp dla dzieci do 12 lat bezpłatny!",
        startDate: "2026-06-01",
        endDate: "2026-06-01",
        time: "10:00 - 18:00",
        location: "Strefa rodzinna",
        category: "Rodzinne",
        capacity: 1500,
        registered: 423,
        price: "Bezpłatne",
        cover: "linear-gradient(135deg,#A8C49B 0%,#F4A340 100%)",
        published: true
      },
      {
        id: "e6",
        title: "Nocna obserwacja nietoperzy",
        slug: "obserwacja-nietoperzy",
        description: "Z biologiem dr. Pawłem Mazurem. Wykorzystamy detektory ultradźwiękowe. Limit 25 osób.",
        startDate: "2026-07-18",
        endDate: "2026-07-18",
        time: "21:30 - 23:30",
        location: "Wschodnia strona pustyni",
        category: "Przyroda",
        capacity: 25,
        registered: 25,
        price: "40 zł",
        cover: "linear-gradient(135deg,#3F5E32 0%,#1F1F1F 100%)",
        published: true
      },
      // ----- Past editions -----
      {
        id: "e_inv25",
        seriesId: "inwazja",
        title: "Inwazja Pustynna 2025",
        slug: "inwazja-pustynna-2025",
        description: "XXI edycja największej rekonstrukcji w południowej Polsce. Frekwencja: 4 600 osób.",
        startDate: "2025-08-15",
        endDate: "2025-08-17",
        time: "10:00 - 20:00",
        location: "Główne pole pustyni",
        category: "Rekonstrukcja",
        capacity: 5000,
        registered: 4623,
        price: "25 zł",
        cover: "linear-gradient(135deg,#6B4422 0%,#1F1F1F 100%)",
        gallery: ["p11","p12","p15","p16"],
        published: true
      },
      {
        id: "e_inv24",
        seriesId: "inwazja",
        title: "Inwazja Pustynna 2024",
        slug: "inwazja-pustynna-2024",
        description: "XX jubileuszowa edycja. Po raz pierwszy z udziałem czołgów Sherman z muzeum w Poznaniu.",
        startDate: "2024-08-16",
        endDate: "2024-08-18",
        time: "10:00 - 20:00",
        location: "Główne pole pustyni",
        category: "Rekonstrukcja",
        capacity: 4000,
        registered: 3854,
        price: "20 zł",
        cover: "linear-gradient(135deg,#8B5A2B 0%,#4A2F18 100%)",
        gallery: ["p11","p15"],
        published: true
      },
      {
        id: "e_per25",
        seriesId: "perseidy",
        title: "Perseidy 2025",
        slug: "perseidy-2025",
        description: "Obserwacja roju Perseidów z udziałem astronoma dr. Macieja Mikołajewskiego. Ponad 240 obserwacji w 4 godziny.",
        startDate: "2025-08-12",
        endDate: "2025-08-13",
        time: "21:00 - 03:00",
        location: "Punkt widokowy Czubatka",
        category: "Astronomia",
        capacity: 180,
        registered: 178,
        price: "20 zł",
        cover: "linear-gradient(135deg,#1F1F1F 0%,#234567 100%)",
        gallery: ["p13"],
        published: true
      },
      {
        id: "e_mar25",
        seriesId: "maraton",
        title: "Maraton Pustynny 2025",
        slug: "maraton-pustynny-2025",
        description: "Półmaraton z rekordową frekwencją 712 startujących. Zwycięzca: Bartłomiej Kowalik (1:18:23).",
        startDate: "2025-09-06",
        endDate: "2025-09-06",
        time: "08:00",
        location: "Start: Klucze, Meta: Czubatka",
        category: "Sport",
        capacity: 800,
        registered: 712,
        price: "100 zł",
        cover: "linear-gradient(135deg,#E8841E 0%,#8B5A2B 100%)",
        gallery: ["p12"],
        published: true
      },
      {
        id: "e_dz25",
        seriesId: "dziecko",
        title: "Dzień Dziecka 2025",
        slug: "dzien-dziecka-2025",
        description: "Świetna pogoda i 1 200 odwiedzających rodzin. Specjalna atrakcja: pokaz wielbłądzich wyścigów!",
        startDate: "2025-06-01",
        endDate: "2025-06-01",
        time: "10:00 - 18:00",
        location: "Strefa rodzinna",
        category: "Rodzinne",
        capacity: 1500,
        registered: 1247,
        price: "Bezpłatne",
        cover: "linear-gradient(135deg,#A8C49B 0%,#FFD27A 100%)",
        gallery: [],
        published: true
      }
    ],

    // ---- Series of recurring events ----
    eventSeries: [
      {
        id: "inwazja",
        name: "Inwazja Pustynna",
        description: "Doroczna rekonstrukcja historyczna z udziałem czołgów i pojazdów wojskowych",
        firstEdition: 2003,
        editions: 22,
        category: "Rekonstrukcja"
      },
      {
        id: "perseidy",
        name: "Noc Perseidów",
        description: "Wspólna obserwacja roju Perseidów ze szczytu Czubatki",
        firstEdition: 2015,
        editions: 11,
        category: "Astronomia"
      },
      {
        id: "maraton",
        name: "Maraton Pustynny",
        description: "Półmaraton biegowy z metą na szczycie najwyższej wydmy",
        firstEdition: 2017,
        editions: 9,
        category: "Sport"
      },
      {
        id: "dziecko",
        name: "Dzień Dziecka na Pustyni",
        description: "Coroczna impreza rodzinna 1 czerwca",
        firstEdition: 2010,
        editions: 16,
        category: "Rodzinne"
      }
    ],

    galleryFolders: [
      { id: "g1", name: "Wydmy o świcie", slug: "wydmy-o-swicie", description: "Magiczne wschody słońca nad pustynią", cover: "linear-gradient(135deg,#FFD27A,#F4A340,#8B5A2B)", order: 1 },
      { id: "g2", name: "Drone & lotnicze", slug: "drone", description: "Pustynia z lotu ptaka", cover: "linear-gradient(135deg,#8FC6E0,#4A9BC4,#234567)", order: 2 },
      { id: "g3", name: "Flora i fauna", slug: "flora-fauna", description: "Życie na pustyni", cover: "linear-gradient(135deg,#A8C49B,#6E9A5C,#3F5E32)", order: 3 },
      { id: "g4", name: "Wydarzenia 2025", slug: "wydarzenia-2025", description: "Najciekawsze momenty zeszłego sezonu", cover: "linear-gradient(135deg,#F4A340,#C56812,#6B4422)", order: 4 },
      { id: "g5", name: "Zima na pustyni", slug: "zima", description: "Niesamowita biel, niesamowita cisza", cover: "linear-gradient(135deg,#DCEEF5,#8FC6E0,#4A9BC4)", order: 5 },
      { id: "g6", name: "Zdjęcia historyczne", slug: "historyczne", description: "Archiwalne zdjęcia z XX wieku", cover: "linear-gradient(135deg,#D9BC8E,#8B5A2B,#1F1F1F)", order: 6 }
    ],

    photos: [
      // Wydmy o świcie
      { id: "p1",  folderId: "g1", title: "Świt nad Czubatką",       cover: "linear-gradient(135deg,#FFD27A 0%,#F4A340 60%,#8B5A2B 100%)", author: "Tomasz Nowak", date: "2026-05-01", tags: ["świt","panorama"] },
      { id: "p2",  folderId: "g1", title: "Pierwsze promienie",      cover: "linear-gradient(180deg,#FFD27A 0%,#E8841E 50%,#6B4422 100%)", author: "Tomasz Nowak", date: "2026-05-02", tags: ["świt"] },
      { id: "p3",  folderId: "g1", title: "Złota godzina",            cover: "linear-gradient(135deg,#F4A340 0%,#C56812 100%)", author: "Anna Wiśniewska", date: "2026-04-22", tags: ["zachód"] },
      { id: "p4",  folderId: "g1", title: "Mgła w dolinie wydm",      cover: "linear-gradient(180deg,#F4E9D4 0%,#D9BC8E 50%,#8B5A2B 100%)", author: "Tomasz Nowak", date: "2026-04-15", tags: ["mgła","poranek"] },
      // Drone
      { id: "p5",  folderId: "g2", title: "Lot nad pustynią",         cover: "linear-gradient(135deg,#8FC6E0 0%,#4A9BC4 50%,#D9BC8E 100%)", author: "Drone Studio PL", date: "2026-03-12", tags: ["drone"] },
      { id: "p6",  folderId: "g2", title: "Spirala wydm z 200m",      cover: "radial-gradient(circle at 30% 70%,#F4A340 0%,#8B5A2B 60%,#1F1F1F 100%)", author: "Drone Studio PL", date: "2026-03-12", tags: ["drone","abstrakcja"] },
      { id: "p7",  folderId: "g2", title: "Granica las-pustynia",     cover: "linear-gradient(90deg,#3F5E32 0%,#A8C49B 30%,#D9BC8E 60%,#8B5A2B 100%)", author: "Marcin Lewandowski", date: "2026-02-20", tags: ["drone","granice"] },
      // Flora & Fauna
      { id: "p8",  folderId: "g3", title: "Szczotlicha siwa",         cover: "linear-gradient(135deg,#A8C49B 0%,#6E9A5C 100%)", author: "dr Anna Kowalska", date: "2026-05-05", tags: ["flora"] },
      { id: "p9",  folderId: "g3", title: "Skowronek borowy",         cover: "linear-gradient(135deg,#D9BC8E 0%,#6B4422 100%)", author: "dr Anna Kowalska", date: "2026-04-22", tags: ["fauna","ptaki"] },
      { id: "p10", folderId: "g3", title: "Mrówka sahara",            cover: "linear-gradient(135deg,#F4A340 0%,#1F1F1F 100%)", author: "dr Paweł Mazur", date: "2026-04-10", tags: ["fauna","makro"] },
      // Wydarzenia 2025
      { id: "p11", folderId: "g4", title: "Inwazja Pustynna 2025",    cover: "linear-gradient(135deg,#8B5A2B 0%,#1F1F1F 100%)", author: "Foto Express", date: "2025-08-15", tags: ["rekonstrukcja"] },
      { id: "p12", folderId: "g4", title: "Maraton 2025 — start",     cover: "linear-gradient(135deg,#F4A340 0%,#E8841E 100%)", author: "Foto Express", date: "2025-09-05", tags: ["sport"] },
      // Zima
      { id: "p13", folderId: "g5", title: "Pierwszy śnieg",            cover: "linear-gradient(180deg,#FFFFFF 0%,#DCEEF5 50%,#8FC6E0 100%)", author: "Tomasz Nowak", date: "2025-12-10", tags: ["zima","śnieg"] },
      { id: "p14", folderId: "g5", title: "Mróz na wydmach",           cover: "linear-gradient(135deg,#DCEEF5 0%,#D9BC8E 100%)", author: "Tomasz Nowak", date: "2025-12-22", tags: ["zima"] },
      // Historyczne
      { id: "p15", folderId: "g6", title: "Pustynia 1925 (rekonstr.)", cover: "linear-gradient(135deg,#D9BC8E 0%,#4A2F18 100%)", author: "Archiwum", date: "1925-06-01", tags: ["archiwum"] },
      { id: "p16", folderId: "g6", title: "Manewry wojskowe 1965",     cover: "linear-gradient(135deg,#8B5A2B 0%,#1F1F1F 100%)", author: "Archiwum MON", date: "1965-09-15", tags: ["wojsko","archiwum"] }
    ],

    projects: [
      {
        id: "pr1",
        title: "Pustynia bez barier",
        description: "Kompleksowa modernizacja infrastruktury dla osób z niepełnosprawnościami: rampy, ścieżki sensoryczne, audio przewodniki.",
        status: "in-progress",
        progress: 65,
        budget: "2 400 000 zł",
        funding: "EFRR / NFOŚiGW",
        fundingCodes: ["efrr", "nfos"],
        startDate: "2025-03-01",
        endDate: "2026-12-31",
        cover: "linear-gradient(135deg,#A8C49B 0%,#6E9A5C 100%)",
        gallery: [],
        docs: [
          { name: "Karta projektu (PDF)", url: "#" },
          { name: "Sprawozdanie 2025", url: "#" }
        ]
      },
      {
        id: "pr2",
        title: "Centrum Edukacji Pustynnej",
        description: "Budowa nowoczesnego centrum z salami warsztatowymi, planetarium i interaktywnym muzeum geologii.",
        status: "planned",
        progress: 15,
        budget: "8 200 000 zł",
        funding: "Fundusz Spójności UE",
        fundingCodes: ["coh"],
        startDate: "2026-09-01",
        endDate: "2028-06-30",
        cover: "linear-gradient(135deg,#F4A340 0%,#8B5A2B 100%)",
        gallery: [],
        docs: [
          { name: "Studium wykonalności", url: "#" },
          { name: "Wizualizacje", url: "#" }
        ]
      },
      {
        id: "pr3",
        title: "Renaturyzacja północnego sektora",
        description: "Przywrócenie naturalnego ekosystemu pustynnego w sektorze północnym poprzez wycinkę inwazyjnej sosny.",
        status: "completed",
        progress: 100,
        budget: "950 000 zł",
        funding: "LIFE+ UE",
        fundingCodes: ["life"],
        startDate: "2023-04-01",
        endDate: "2025-10-31",
        cover: "linear-gradient(135deg,#3F5E32 0%,#A8C49B 100%)",
        gallery: [],
        docs: [
          { name: "Raport końcowy LIFE+", url: "#" },
          { name: "Mapa przed/po", url: "#" }
        ]
      },
      {
        id: "pr4",
        title: "System monitoringu przyrodniczego",
        description: "Sieć kamer przyrodniczych i czujników środowiskowych do monitoringu fauny i klimatu w czasie rzeczywistym.",
        status: "in-progress",
        progress: 40,
        budget: "1 100 000 zł",
        funding: "WFOŚiGW Małopolska",
        fundingCodes: ["wfos"],
        startDate: "2025-06-01",
        endDate: "2027-05-31",
        cover: "linear-gradient(135deg,#4A9BC4 0%,#1F1F1F 100%)",
        gallery: [],
        docs: [
          { name: "Specyfikacja techniczna", url: "#" }
        ]
      },
      {
        id: "pr5",
        title: "Aplikacja mobilna „Pustynia AR”",
        description: "Aplikacja z rozszerzoną rzeczywistością — ożywia historyczne i przyrodnicze obiekty na trasie zwiedzania.",
        status: "planned",
        progress: 5,
        budget: "480 000 zł",
        funding: "Fundusz Innowacji",
        fundingCodes: ["inn"],
        startDate: "2026-11-01",
        endDate: "2027-08-31",
        cover: "linear-gradient(135deg,#8FC6E0 0%,#4A9BC4 100%)",
        gallery: [],
        docs: []
      },
      {
        id: "pr6",
        title: "Odnowa szlaków pieszych",
        description: "Modernizacja 24 km istniejących szlaków pieszych: tablice, ławki, kosze, oznakowanie.",
        status: "completed",
        progress: 100,
        budget: "320 000 zł",
        funding: "Program Rozwoju Obszarów Wiejskich",
        fundingCodes: ["prow"],
        startDate: "2024-04-01",
        endDate: "2024-11-30",
        cover: "linear-gradient(135deg,#D9BC8E 0%,#8B5A2B 100%)",
        gallery: [],
        docs: [
          { name: "Mapa szlaków po modernizacji", url: "#" }
        ]
      }
    ],

    fundingSources: [
      { code: "efrr", name: "EFRR — Europejski Fundusz Rozwoju Regionalnego", org: "Unia Europejska", description: "Wspiera rozwój regionalny — infrastruktura, innowacje, środowisko.", totalReceived: "8 600 000 zł", projects: 1 },
      { code: "life", name: "LIFE+", org: "Komisja Europejska", description: "Program ochrony środowiska i klimatu UE — czynna ochrona siedlisk Natura 2000.", totalReceived: "1 200 000 zł", projects: 1 },
      { code: "coh",  name: "Fundusz Spójności", org: "Unia Europejska", description: "Duże inwestycje infrastrukturalne i ochrona środowiska.", totalReceived: "8 200 000 zł", projects: 1 },
      { code: "nfos", name: "NFOŚiGW", org: "Narodowy Fundusz Ochrony Środowiska", description: "Krajowy fundusz finansujący ochronę przyrody i edukację ekologiczną.", totalReceived: "2 400 000 zł", projects: 1 },
      { code: "wfos", name: "WFOŚiGW Małopolska", org: "Wojewódzki Fundusz Ochrony Środowiska", description: "Regionalny fundusz wspierający lokalne projekty ekologiczne.", totalReceived: "1 100 000 zł", projects: 1 },
      { code: "prow", name: "PROW", org: "Program Rozwoju Obszarów Wiejskich", description: "Wsparcie rozwoju obszarów wiejskich — turystyka, infrastruktura, dziedzictwo.", totalReceived: "320 000 zł", projects: 1 },
      { code: "inn",  name: "Fundusz Innowacji", org: "PARP / Narodowe Centrum Badań", description: "Wsparcie projektów cyfrowych i innowacyjnych w turystyce i kulturze.", totalReceived: "480 000 zł", projects: 1 },
      { code: "nca",  name: "Granty NCN", org: "Narodowe Centrum Nauki", description: "Granty badawcze — m.in. inwentaryzacja gatunków na pustyni.", totalReceived: "180 000 zł", projects: 0 }
    ],

    prices: [
      { id: "pc1", category: "Bilety wstępu", name: "Bilet normalny", price: 15, unit: "os.", description: "Dorośli powyżej 18 lat", order: 1 },
      { id: "pc2", category: "Bilety wstępu", name: "Bilet ulgowy", price: 8, unit: "os.", description: "Dzieci 7–18 lat, studenci, seniorzy", order: 2 },
      { id: "pc3", category: "Bilety wstępu", name: "Dzieci do 7 lat", price: 0, unit: "os.", description: "Bezpłatnie", order: 3 },
      { id: "pc4", category: "Bilety wstępu", name: "Bilet rodzinny", price: 35, unit: "rodzina", description: "2 dorosłych + do 3 dzieci", order: 4 },
      { id: "pc5", category: "Bilety wstępu", name: "Karnet sezonowy", price: 120, unit: "sezon", description: "Nieograniczona liczba wejść 1.04 – 31.10", order: 5 },
      { id: "pc6", category: "Bilety wstępu", name: "Karnet roczny", price: 220, unit: "rok", description: "Cały rok + zniżki na wydarzenia", order: 6 },

      { id: "pc7", category: "Przewodnicy", name: "Przewodnik PL", price: 180, unit: "grupa do 25", description: "1.5h zwiedzania z ekspertem", order: 7 },
      { id: "pc8", category: "Przewodnicy", name: "Przewodnik EN/DE", price: 240, unit: "grupa do 25", description: "Język angielski lub niemiecki", order: 8 },
      { id: "pc9", category: "Przewodnicy", name: "Audio przewodnik", price: 12, unit: "os.", description: "PL/EN/DE/UA, 4h wypożyczenia", order: 9 },

      { id: "pc10", category: "Atrakcje", name: "Quad — 30 min", price: 80, unit: "os.", description: "Z instruktorem, dla osób 16+", order: 10 },
      { id: "pc11", category: "Atrakcje", name: "Sandboarding", price: 35, unit: "os./h", description: "Wypożyczenie deski + lekcja podstawowa", order: 11 },
      { id: "pc12", category: "Atrakcje", name: "Przejażdżka konna", price: 120, unit: "os./h", description: "Z przewodnikiem, kask zapewniony", order: 12 },
      { id: "pc13", category: "Atrakcje", name: "Wielbłąd — sesja foto", price: 50, unit: "os.", description: "15 min, profesjonalne zdjęcie w cenie", order: 13 },

      { id: "pc14", category: "Parking", name: "Samochód osobowy", price: 10, unit: "doba", description: "Parking duży, monitoring 24h", order: 14 },
      { id: "pc15", category: "Parking", name: "Autokar", price: 30, unit: "doba", description: "Wydzielona strefa", order: 15 },
      { id: "pc16", category: "Parking", name: "Rower / motocykl", price: 0, unit: "doba", description: "Bezpłatnie", order: 16 }
    ],

    // ---- Strukturalne dane cennikowe — szczegółowe tabele ----
    pricingDetailed: {
      // Udostępnianie terenu
      areaUsage: [
        { no: 1,  name: "Impreza masowa",                                                              price: 4000, unit: "wydarzenie",   featured: true },
        { no: 2,  name: "Impreza firmowa",                                                             price: 2500, unit: "wydarzenie" },
        { no: 3,  name: "Trening sportowy z wykorzystaniem pojazdów",                                  price: 300,  unit: "pojazd" },
        { no: 4,  name: "Przejazd turystyczny z wykorzystaniem pojazdów",                              price: 60,   unit: "pojazd",       footnote: "*" },
        { no: 5,  name: "Loty widokowe i skoki spadochronowe",                                         price: 300,  unit: "przelot/zrzut" },
        { no: 6,  name: "Sesja zdjęciowa w celach reklamowych",                                        price: 700,  unit: "sesja",        group: "Sesje zdjęciowe" },
        { no: 6, name: "Sesja zdjęciowa w celach niekomercyjnych",                                     price: 300,  unit: "sesja",        group: "Sesje zdjęciowe" },
        { no: 6, name: "Sesja zdjęciowa uroczystości rodzinnych",                                      price: 100,  unit: "sesja",        group: "Sesje zdjęciowe" },
        { no: 6, name: "Sesja zdjęciowa w celach prasowych i reportażowych",                           price: 0,    unit: "—",            group: "Sesje zdjęciowe", priceLabel: "bez opłat" },
        { no: 7, name: "Filmy komercyjne, fabularne i reklamowe",                                      price: 2500, unit: "produkcja",    group: "Działalność filmowa" },
        { no: 7, name: "Filmy rozrywkowe i teledyski",                                                 price: 1000, unit: "produkcja",    group: "Działalność filmowa" },
        { no: 7, name: "Filmy edukacyjne i rekreacyjne",                                               price: 300,  unit: "produkcja",    group: "Działalność filmowa" },
        { no: 7, name: "Filmy promocyjne i reportaże",                                                 price: 0,    unit: "—",            group: "Działalność filmowa", priceLabel: "bez opłat" },
        { no: 8,  name: "Używanie bezzałogowych statków powietrznych (drony)",                         price: 500,  unit: "lot/dzień" },
        { no: 9, name: "Nocleg — do 10 osób",                                                          price: 50,   unit: "nocleg",       group: "Biwakowanie" },
        { no: 9, name: "Rozpalenie ogniska/grilla w wyznaczonym miejscu",                              price: 50,   unit: "ognisko",      group: "Biwakowanie" },
        { no: 9, name: "Rozpalenie ogniska/grilla — dodatkowo do aktywności z poz. 1–16",              price: 100,  unit: "ognisko",      group: "Biwakowanie" },
        { no: 9, name: "Rozpalenie ogniska/grilla w miejscu innym niż wyznaczone",                     price: 300,  unit: "ognisko",      group: "Biwakowanie" },
        { no: 10, name: "Wynajęcie altany turystycznej na wyłączność",                                 price: 250,  unit: "altana/dzień" },
        { no: 11, name: "Wynajęcie przewodnika turystycznego",                                         price: 300,  unit: "wycieczka" },
        { no: 12, name: "Wynajęcie powierzchni do 50 m² pod usługi handlowe",                          price: 200,  unit: "1 dzień" },
        { no: 13, name: "Wynajęcie długoterminowe (>30 dni do 3 lat) — 1 m² pod usługi handlowe",      price: 1,    unit: "1 m²/dzień" },
        { no: 14, name: "Udostępnienie mediów — wydarzenia do 500 osób",                               price: 50,   unit: "wydarzenie",   group: "Media (opcja)" },
        { no: 14, name: "Udostępnienie mediów — wydarzenia powyżej 500 osób",                          price: 100,  unit: "wydarzenie",   group: "Media (opcja)" },
        { no: 15, name: "Wynajęcie miejsca postojowego na wyłączność",                                 price: 50,   unit: "doba" },
        { no: 16, name: "Inne rodzajowo podobne imprezy/typy aktywności (poza pkt. 1–15)",             price: 500,  unit: "wydarzenie" }
      ],
      areaUsageNote: "* Pozycja 4: stawka za pojedynczy pojazd. Wszystkie ceny brutto. Ceny mogą podlegać negocjacji dla wydarzeń długoterminowych.",

      // Parking
      parking: [
        { name: "Pierwsze 15 minut",                  price: 0,  unit: "—",   priceLabel: "Darmowe", featured: true },
        { name: "Samochody osobowe i motocykle",      price: 5,  unit: "godz." },
        { name: "Autobusy",                           price: 15, unit: "godz." },
        { name: "Kampery i przyczepy kempingowe",     price: 15, unit: "godz." }
      ],

      // Toilets
      toilets: {
        price: 3,
        currency: "zł",
        payment: "karta / gotówka",
        locations: [
          {
            name: "Toaleta przy kasach parkingowych",
            availability: "Cały rok",
            type: "męska / damska / dla niepełnosprawnych",
            features: [
              "Przewijak dla dzieci w toalecie dla niepełnosprawnych",
              "Dzieci do 120 cm wzrostu — bez opłat",
              "Płatność BLIK / karta / gotówka"
            ]
          },
          {
            name: "Toaleta przy strefie Food Truck Park",
            availability: "Cały rok poza sezonem zimowym",
            type: "męska / damska / dla niepełnosprawnych",
            features: [
              "Czynna 8:00 – 22:00 w sezonie",
              "Płatność BLIK / karta / gotówka"
            ]
          }
        ]
      }
    },

    poi: [
      { id: "poi1", name: "Punkt widokowy Czubatka", type: "viewpoint", x: 65, y: 35, description: "Najwyższy punkt pustyni — 382 m n.p.m. Panorama 360°." },
      { id: "poi2", name: "Parking główny", type: "parking", x: 25, y: 60, description: "200 miejsc, monitoring." },
      { id: "poi3", name: "Centrum informacji", type: "info", x: 28, y: 58, description: "Bilety, mapy, pamiątki, toalety." },
      { id: "poi4", name: "Strefa rodzinna", type: "family", x: 35, y: 55, description: "Plac zabaw, dmuchańce, food trucki." },
      { id: "poi5", name: "Punkt widokowy Wschód", type: "viewpoint", x: 80, y: 50, description: "Idealne miejsce na wschody słońca." },
      { id: "poi6", name: "Wypożyczalnia rowerów", type: "rental", x: 30, y: 62, description: "Rowery MTB i elektryczne." },
      { id: "poi7", name: "Stajnia pustynna", type: "horse", x: 45, y: 75, description: "Przejażdżki konne i wielbłądy." },
      { id: "poi8", name: "Pole namiotowe", type: "camping", x: 55, y: 78, description: "Camping z prysznicami i kuchnią." },
      { id: "poi9", name: "Strefa quadów", type: "quad", x: 70, y: 65, description: "Tor crossowy 2,4 km." },
      { id: "poi10", name: "Toalety publiczne #1", type: "wc", x: 32, y: 60, description: "Dostępne 24/7" },
      { id: "poi11", name: "Toalety publiczne #2", type: "wc", x: 65, y: 40, description: "Dostępne w sezonie" },
      { id: "poi12", name: "Strefa fotograficzna", type: "photo", x: 50, y: 30, description: "Najpiękniejsze ujęcia wydm." }
    ],

    trails: [
      { id: "t1", name: "Szlak edukacyjny zielony", color: "#6E9A5C", length: "7,2 km", difficulty: "łatwy", time: "2h 30min", points: "25,60 35,55 50,30 65,35 80,50" },
      { id: "t2", name: "Trasa rowerowa czerwona", color: "#C0392B", length: "12,4 km", difficulty: "średni", time: "1h 30min", points: "30,62 45,75 70,65 80,50 65,35 50,30 35,55 30,62" },
      { id: "t3", name: "Szlak panoramiczny niebieski", color: "#4A9BC4", length: "4,8 km", difficulty: "łatwy", time: "1h 30min", points: "65,40 50,30 35,30 25,40 25,60" },
      { id: "t4", name: "Szlak ekstremalny czarny", color: "#1F1F1F", length: "18,6 km", difficulty: "trudny", time: "5h", points: "30,62 45,75 55,78 70,65 80,50 65,35 50,30 35,30 25,40 25,60 30,62" }
    ],

    bikeTrails: [
      {
        id: "bt1",
        name: "Pętla wydmowa",
        color: "#6E9A5C",
        difficulty: "łatwy",
        length: 8.4,
        elevationGain: 65,
        time: "45 min - 1h",
        surface: "Twarda nawierzchnia + piasek",
        startPoint: "Parking główny",
        description: "Idealna trasa dla początkujących i rodzin z dziećmi. Prowadzi obrzeżem pustyni przez utwardzone ścieżki, omijając najbardziej miękkie odcinki piasku. W trakcie trasy mijasz dwa punkty widokowe i strefę rodzinną.",
        highlights: ["Punkt widokowy Czubatka", "Strefa rodzinna", "Centrum informacji"],
        points: "30,62 35,55 50,30 65,35 70,50 60,55 45,65 30,62",
        elevation: [318, 322, 340, 358, 368, 372, 365, 350, 332, 320, 318],
        recommended: ["dzieci", "rodziny", "MTB"]
      },
      {
        id: "bt2",
        name: "Trasa Czerwona — przez serce pustyni",
        color: "#C0392B",
        difficulty: "średni",
        length: 14.6,
        elevationGain: 145,
        time: "1h 30min - 2h",
        surface: "Mieszana — szuter, piasek, single-track",
        startPoint: "Wypożyczalnia rowerów",
        description: "Klasyczna trasa średniozaawansowana, przebiegająca przez najbardziej charakterystyczne miejsca pustyni. Wymaga roweru MTB lub gravelowego z szerszymi oponami. Trzy sekcje przez czysty piasek (~2 km łącznie).",
        highlights: ["Wydmy parabolicze", "Niecka deflacyjna", "Punkt fotograficzny", "Punkt widokowy Wschód"],
        points: "30,62 25,55 35,40 50,30 70,30 80,40 80,55 65,70 45,75 30,68 30,62",
        elevation: [320, 325, 345, 365, 380, 378, 360, 340, 325, 318, 322, 320],
        recommended: ["MTB", "gravel", "doświadczeni"]
      },
      {
        id: "bt3",
        name: "Maraton Pustynny — szlak treningowy",
        color: "#1F1F1F",
        difficulty: "trudny",
        length: 28.2,
        elevationGain: 380,
        time: "3h - 5h",
        surface: "MTB — głównie piasek i szuter",
        startPoint: "Klucze, wjazd główny",
        description: "Pełna pętla okołopustynna dla doświadczonych rowerzystów. Trasa wymaga dobrej kondycji i sprzętu MTB. Pokrywa się częściowo ze szlakiem maratońskim. UWAGA: weź minimum 2L wody i przekąski!",
        highlights: ["Wszystkie szczyty wydm", "Stara wieża obserwacyjna", "Granica las/pustynia", "Pole namiotowe"],
        points: "30,62 20,50 25,35 40,25 55,20 70,25 85,35 88,55 80,70 65,80 50,82 35,78 25,70 20,60 30,62",
        elevation: [320, 335, 360, 382, 378, 360, 348, 340, 325, 320, 332, 350, 365, 348, 320],
        recommended: ["MTB", "trening", "ekstremum"]
      },
      {
        id: "bt4",
        name: "Family Loop — trasa rodzinna",
        color: "#F4A340",
        difficulty: "bardzo łatwy",
        length: 3.6,
        elevationGain: 18,
        time: "20 - 40 min",
        surface: "Utwardzona, dostępna dla dzieci",
        startPoint: "Strefa rodzinna",
        description: "Krótka, w pełni utwardzona pętla idealna dla najmłodszych rowerzystów (5+) i osób na rowerach miejskich. Bez piaszczystych odcinków, z tablicami edukacyjnymi co 500 m.",
        highlights: ["Plac zabaw", "5 tablic edukacyjnych", "Strefa fotograficzna"],
        points: "32,60 38,55 45,55 50,58 50,65 42,68 35,65 32,60",
        elevation: [318, 322, 326, 330, 328, 322, 320, 318],
        recommended: ["dzieci", "rower miejski", "rodziny"]
      },
      {
        id: "bt5",
        name: "Trasa zachodnia — leśne ścieżki",
        color: "#4A9BC4",
        difficulty: "średni",
        length: 11.8,
        elevationGain: 95,
        time: "1h - 1h 30min",
        surface: "Single-track leśny + szuter",
        startPoint: "Parking zachodni",
        description: "Trasa głównie przez bory sosnowe otaczające pustynię, z wjazdem na wydmy w 2 punktach. Idealna w upalne dni — większość pod cieniem drzew.",
        highlights: ["Leśne single-tracki", "Pola lessowe", "Punkt widokowy Zachód"],
        points: "20,50 18,40 25,30 38,28 45,35 40,48 28,55 20,50",
        elevation: [328, 340, 352, 358, 362, 348, 332, 328],
        recommended: ["MTB", "leśne ścieżki", "lato"]
      },
      {
        id: "bt6",
        name: "Sunset Tour — wieczorny przejazd",
        color: "#E8841E",
        difficulty: "łatwy",
        length: 6.5,
        elevationGain: 42,
        time: "40 min - 1h",
        surface: "Mieszana — utwardzona + krótkie odcinki piasku",
        startPoint: "Parking główny (start 1h przed zachodem)",
        description: "Specjalna trasa zaplanowana tak, by wjechać na najwyższy punkt widokowy dokładnie podczas zachodu słońca. Dostępna z usługą przewodnika i e-bike.",
        highlights: ["Czubatka — wschód słońca", "Strefa fotograficzna", "Powrót przez podświetlone ścieżki"],
        points: "30,62 40,55 55,40 65,35 70,42 60,55 45,62 30,62",
        elevation: [318, 328, 358, 380, 365, 340, 328, 318],
        recommended: ["fotografowie", "pary", "e-bike"]
      }
    ],

    messages: [],
    subscribers: [],

    users: [
      { id: "u1", username: "admin", password: "admin123", role: "admin", name: "Administrator" }
    ]
  };

  // ---- Core API ----
  const Store = {
    _data: null,

    init() {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        try { this._data = JSON.parse(raw); } catch (e) { this._data = null; }
      }
      if (!this._data) {
        this._data = JSON.parse(JSON.stringify(SEED));
        this._save();
      }
      // Migrate: ensure all top-level keys exist
      Object.keys(SEED).forEach(k => {
        if (!(k in this._data)) this._data[k] = SEED[k];
      });

      // Seed reactions on first run (only if no reactions data exists yet)
      if (!localStorage.getItem("pustynia_reactions_v1")) {
        const seedReactions = {
          n1: { heart: 47, thumb: 23, love: 12, fire: 8, clap: 31 },
          n2: { heart: 92, thumb: 18, love: 64, fire: 4, clap: 22 },
          n3: { heart: 156, thumb: 87, love: 41, fire: 73, clap: 102 },
          n4: { heart: 28, thumb: 19, love: 7, fire: 2, clap: 15 },
          n5: { heart: 14, thumb: 11, love: 8, fire: 3, clap: 9 },
          n6: { heart: 9, thumb: 7, love: 4, fire: 1, clap: 5 }
        };
        localStorage.setItem("pustynia_reactions_v1", JSON.stringify(seedReactions));
      }

      return this._data;
    },

    _save() {
      try {
        localStorage.setItem(KEY, JSON.stringify(this._data));
      } catch (e) {
        console.error("Failed to save data", e);
      }
    },

    reset() {
      localStorage.removeItem(KEY);
      this._data = null;
      this.init();
      return this._data;
    },

    export() {
      return JSON.stringify(this._data, null, 2);
    },

    import(json) {
      try {
        this._data = JSON.parse(json);
        this._save();
        return true;
      } catch (e) {
        return false;
      }
    },

    // ----- Generic collection helpers -----
    all(coll) {
      this.init();
      return [...(this._data[coll] || [])];
    },

    get(coll, id) {
      return this.all(coll).find(x => x.id === id);
    },

    add(coll, item) {
      this.init();
      if (!item.id) item.id = coll[0] + Date.now() + Math.floor(Math.random() * 999);
      this._data[coll].push(item);
      this._save();
      return item;
    },

    update(coll, id, patch) {
      this.init();
      const idx = this._data[coll].findIndex(x => x.id === id);
      if (idx < 0) return null;
      this._data[coll][idx] = { ...this._data[coll][idx], ...patch };
      this._save();
      return this._data[coll][idx];
    },

    remove(coll, id) {
      this.init();
      const before = this._data[coll].length;
      this._data[coll] = this._data[coll].filter(x => x.id !== id);
      this._save();
      return before !== this._data[coll].length;
    },

    setSettings(patch) {
      this.init();
      this._data.settings = { ...this._data.settings, ...patch };
      this._save();
      return this._data.settings;
    },

    settings() {
      this.init();
      return this._data.settings;
    },

    // ----- Convenience getters -----
    publishedNews() { return this.all("news").filter(n => n.published).sort((a,b) => b.date.localeCompare(a.date)); },
    featuredNews() { return this.publishedNews().filter(n => n.featured).slice(0, 3); },
    upcomingEvents() {
      const today = new Date().toISOString().slice(0,10);
      return this.all("events")
        .filter(e => e.published && e.endDate >= today)
        .sort((a,b) => a.startDate.localeCompare(b.startDate));
    },
    nextEvent() { return this.upcomingEvents()[0]; },
    photosByFolder(folderId) { return this.all("photos").filter(p => p.folderId === folderId); },

    // ----- Reactions (per news/event item) -----
    reactionsKey: "pustynia_reactions_v1",
    userReactionsKey: "pustynia_user_reactions_v1",

    getReactions(itemId) {
      const raw = localStorage.getItem(this.reactionsKey);
      const all = raw ? JSON.parse(raw) : {};
      return all[itemId] || { heart: 0, thumb: 0, love: 0, fire: 0, clap: 0 };
    },

    getUserReaction(itemId) {
      const raw = localStorage.getItem(this.userReactionsKey);
      const all = raw ? JSON.parse(raw) : {};
      return all[itemId] || null;
    },

    toggleReaction(itemId, type) {
      const raw = localStorage.getItem(this.reactionsKey);
      const all = raw ? JSON.parse(raw) : {};
      const current = all[itemId] || { heart: 0, thumb: 0, love: 0, fire: 0, clap: 0 };

      const userRaw = localStorage.getItem(this.userReactionsKey);
      const userAll = userRaw ? JSON.parse(userRaw) : {};
      const previousUser = userAll[itemId];

      // If user already reacted with this type — toggle off
      if (previousUser === type) {
        current[type] = Math.max(0, (current[type] || 0) - 1);
        delete userAll[itemId];
      } else {
        // If they reacted with another type — switch
        if (previousUser) {
          current[previousUser] = Math.max(0, (current[previousUser] || 0) - 1);
        }
        current[type] = (current[type] || 0) + 1;
        userAll[itemId] = type;
      }

      all[itemId] = current;
      localStorage.setItem(this.reactionsKey, JSON.stringify(all));
      localStorage.setItem(this.userReactionsKey, JSON.stringify(userAll));
      return { counts: current, userReaction: userAll[itemId] || null };
    },

    totalReactions(itemId) {
      const r = this.getReactions(itemId);
      return Object.values(r).reduce((s, n) => s + n, 0);
    },

    // ----- Auth -----
    login(username, password) {
      this.init();
      const user = this._data.users.find(u => u.username === username && u.password === password);
      if (user) {
        const session = { userId: user.id, username: user.username, name: user.name, role: user.role, ts: Date.now() };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return session;
      }
      return null;
    },
    logout() { sessionStorage.removeItem(SESSION_KEY); },
    session() {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      try { return JSON.parse(raw); } catch { return null; }
    },
    requireAuth() {
      const s = this.session();
      if (!s) {
        window.location.href = "/admin/login.html";
        return false;
      }
      return s;
    }
  };

  global.Store = Store;
  Store.init();
})(window);
