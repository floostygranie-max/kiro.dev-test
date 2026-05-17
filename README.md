# 🏜️ Pustynia Błędowska — Strona oficjalna

Nowoczesna, rozbudowana strona internetowa dla Pustyni Błędowskiej („Polska Sahara") wraz z pełnym panelem administracyjnym.

## ✨ Funkcje

### Strona publiczna (9 podstron)

- **Strona główna** — hero z animowanym słońcem i wydmami, animowane statystyki, najbliższe wydarzenie z odliczaniem, polecane aktualności, podgląd galerii, opinie, partnerzy
- **Aktualności** — lista z wyszukiwarką, filtrami (kategorie + tagi), sortowaniem, paginacją + szczegółowy widok artykułu z licznikiem wyświetleń, share buttons, powiązane artykuły
- **Wydarzenia** — 3 widoki (Lista / Kalendarz / Karty), filtry (nadchodzące/przeszłe/wszystkie), modalne okno z odliczaniem, paskiem zapisów, eksportem do .ics
- **Polska Sahara** — historia, oś czasu (9 wydarzeń), geologia, flora & fauna (12 gatunków), 9 ciekawostek
- **Projekty** — przegląd statystyk, filtry statusów, karty projektów z progress barami
- **Cennik** — 4 kategorie (bilety/przewodnicy/atrakcje/parking), interaktywny kalkulator kosztów wizyty, metody płatności
- **Galeria** — 6 albumów, lightbox z nawigacją klawiaturą i pokazem slajdów, filtrowanie po tagach
- **Mapa** — interaktywna mapa SVG z 12 POI, 4 szlakami, info popupami, eksportem GPX, sterowaniem warstwami
- **Kontakt** — formularz, FAQ (10 Q&A), godziny otwarcia, kontakt alarmowy, lokalizacja

### Panel administratora (14 podstron)

Logowanie: `admin` / `admin123` (panel: `/admin/login.html`)

- **Dashboard** — KPI cards (aktualności, wydarzenia, zdjęcia, wiadomości), aktywność, top news, nadchodzące wydarzenia, szybkie akcje
- **Aktualności** — pełen CRUD z edytorem WYSIWYG (B/I/U/H3/listy/linki), wybór gradientu okładki, tagi, kategorie, status (publik./szkic), wyróżnione na home
- **Wydarzenia** — CRUD z polami daty/godziny/lokalizacji/limitu/zapisów/ceny
- **Galeria** — zarządzanie albumami i zdjęciami (folder + photo CRUD, przypisywanie zdjęć do albumów)
- **Projekty** — CRUD ze statusem (planowany/w trakcie/zakończony), progress %, budżet, finansowanie
- **Cennik** — CRUD pozycji cennika z kategoriami i sortowaniem
- **Mapa / POI** — CRUD punktów (10 typów) i szlaków (kolor, długość, trudność, współrzędne)
- **Strony stałe** — przegląd wszystkich stron witryny
- **Wiadomości** — odbieranie wiadomości z formularza kontaktowego, oznaczanie jako przeczytane
- **Subskrybenci** — lista newslettera, eksport CSV, kompozycja newslettera (mock)
- **Ustawienia** — nazwa serwisu, dane kontaktowe, social media, statystyki na home
- **Backup / Eksport** — pełny eksport JSON, CSV (newsy), ICS (wydarzenia), import z pliku, reset do domyślnych
- **Użytkownicy** — CRUD użytkowników panelu z rolami (admin/redaktor/moderator)

## 🚀 Uruchomienie

To **statyczna strona** — bez kompilacji, bez serwera, bez `npm install`. Wystarczy otworzyć w przeglądarce lub wystawić jako pliki statyczne.

### Lokalnie

```bash
# Otwórz index.html w przeglądarce, lub uruchom prosty serwer:
python3 -m http.server 8000
# albo
npx serve .
```

Następnie wejdź na:
- **Strona publiczna:** http://localhost:8000/
- **Panel admina:** http://localhost:8000/admin/login.html (admin / admin123)

### Hosting

Możesz wystawić tę stronę gdziekolwiek:
- **GitHub Pages** — push na `main`, włącz Pages → koniec
- **Netlify / Vercel / Cloudflare Pages** — drag & drop folderu
- **Dowolny hosting** — wgraj pliki przez FTP

## 🏗️ Architektura

### Stack

- **HTML5** — semantyczne tagi, ARIA dla dostępności
- **CSS3** — design system (zmienne CSS), animacje, dark mode, responsywność, brak frameworków
- **Vanilla JavaScript** — moduły: `Store` (data layer), `App` (UI helpers), `Admin` (panel admin)
- **localStorage** — przechowywanie danych (klucz: `pustynia_db_v1`)

### Struktura plików

```
.
├── index.html                    # Strona główna
├── aktualnosci.html              # Lista newsów
├── news.html                     # Szczegół newsa (?id=...)
├── wydarzenia.html               # Wydarzenia (lista/kalendarz/karty)
├── polska-sahara.html            # O pustyni
├── projekty.html                 # Projekty
├── cennik.html                   # Cennik + kalkulator
├── galeria.html                  # Galeria + lightbox
├── mapa.html                     # Mapa SVG + POI
├── kontakt.html                  # Kontakt + FAQ
│
├── admin/                        # Panel administratora
│   ├── login.html
│   ├── index.html                # Dashboard
│   ├── news.html
│   ├── events.html
│   ├── gallery.html              # Albumy + zdjęcia
│   ├── projects.html
│   ├── prices.html
│   ├── poi.html                  # POI + szlaki
│   ├── pages.html
│   ├── messages.html
│   ├── subscribers.html
│   ├── users.html
│   ├── backup.html               # Import/Eksport
│   └── settings.html
│
└── assets/
    ├── css/
    │   ├── main.css              # Design system, layout, komponenty
    │   ├── header.css            # Header + footer
    │   ├── home.css              # Strona główna
    │   ├── pages.css             # Wspólne style podstron
    │   └── admin.css             # Panel admina
    ├── js/
    │   ├── store.js              # Data layer (CRUD + auth + seed data)
    │   ├── app.js                # UI: header/footer, theme, scroll, toast
    │   └── admin.js              # Admin shell, modal, gradientPicker, WYSIWYG
    └── img/
        ├── logo.svg              # Logo pustyni
        └── favicon.svg
```

## 🎨 Design system

### Paleta kolorów (klimat pustyni)

```
Sand:  #FBF6EE → #F4E9D4 → #E8D5B7 → #D9BC8E → #C49A66 → #A87A4A → #8B5A2B → #6B4422 → #4A2F18 → #1F1F1F
Sun:   #FFD27A → #F4A340 → #E8841E → #C56812
Sky:   #DCEEF5 → #8FC6E0 → #4A9BC4
Green: #A8C49B → #6E9A5C → #3F5E32
```

### Typografia

- **Display:** Playfair Display, Georgia (nagłówki, eleganckie)
- **Body:** system font stack (czytelność)

### Motywy

- ☀️ Light (domyślny)
- 🌙 Dark (przełącznik w nagłówku, zapisany w localStorage)

## 📊 Dane testowe (seed)

Po pierwszym otwarciu witryna automatycznie ładuje dane testowe:

- **6 newsów** z różnymi kategoriami i tagami
- **6 wydarzeń** (Inwazja Pustynna, Perseidy, Maraton, warsztaty, Dzień Dziecka, nietoperze)
- **6 albumów galerii** z **16 zdjęciami**
- **6 projektów** w 3 statusach
- **16 pozycji cennika** w 4 kategoriach
- **12 POI** + **4 szlaki** turystyczne
- **1 użytkownik** admina

Reset do danych domyślnych: Panel admina → Backup → "Resetuj wszystkie dane".

## 🔧 Rozszerzanie

### Dodanie prawdziwych zdjęć

Obecnie używamy gradientów CSS jako placeholderów. Aby podpiąć rzeczywiste zdjęcia:

1. Wgraj zdjęcia do `assets/img/gallery/` lub do CDN
2. W panelu admina (`gallery.html`) zamień pole `cover` z gradientu na URL: `url("/assets/img/gallery/foto.jpg")`
3. Lub zmień input gradientu na file input + reader (FileReader → base64) w `admin.js`

### Migracja na backend

Cały data layer jest w `Store` (`assets/js/store.js`). Aby przenieść na prawdziwą bazę:

1. Stwórz REST API z tymi samymi metodami (`all`, `get`, `add`, `update`, `remove`)
2. Zamień implementację w `Store` z `localStorage` na `fetch()`
3. Reszta strony nie wymaga zmian

### Dodanie HTTPS / autentykacji

Login w demo używa plain-text password w localStorage. W produkcji:

- Ruch przez HTTPS
- Hasła hashowane (bcrypt/argon2) na backend
- Sesje serwerowe + JWT
- 2FA dla adminów
- Rate limiting na endpoint logowania

## 📝 Uwagi

- **Panel admina** w pełni funkcjonalny — wszystkie zmiany od razu widoczne na stronie publicznej
- **Brak buildu** — pliki uruchamia się bezpośrednio (perfekcyjne dla GitHub Pages)
- **Responsive** — działa na mobilnych, tabletach, desktopach
- **Dostępność** — semantyczny HTML, ARIA labels, klawiatura w lightboxach, focus management
- **Wydajność** — brak zewnętrznych zależności, < 200KB całość

## 📜 Licencja

Materiały treściowe (teksty o pustyni, ciekawostki) — pochodzą z wiedzy publicznej (Wikipedia, źródła turystyczne). Kod — możesz używać dowolnie.

---

🏜️ **Pustynia Błędowska — Polska Sahara** • Klucze, woj. małopolskie



---

## 🚀 Two implementations

This repository contains **two implementations** of the website:

### 1. Static (vanilla HTML/CSS/JS) — root directory
Production-ready, deployable on GitHub Pages. **No build step.** Just open in a browser.
- 13 public pages + 20 admin pages
- localStorage as database
- Detailed in this README above

### 2. Next.js 14 (full stack) — `next-app/` directory
Modern React stack with database, auth, API routes.
- Next.js 14 App Router + TypeScript + Tailwind CSS
- Prisma ORM (SQLite local / PostgreSQL prod)
- NextAuth.js authentication
- shadcn/ui primitives + Framer Motion
- Server Components + ISR

To run the Next.js version:
```bash
cd next-app
npm install
cp .env.example .env
npx prisma db push && npm run db:seed
npm run dev
# → http://localhost:3000
```

See [`next-app/README.md`](./next-app/README.md) for full setup, architecture, and migration guide.
