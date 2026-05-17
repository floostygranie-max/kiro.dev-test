# 🏜️ Pustynia Błędowska — Next.js 14 Edition

Production-grade implementation of the Pustynia Błędowska website using the **modern Next.js stack**:

- ⚡ **Next.js 14** (App Router, Server Components, ISR)
- 🔵 **TypeScript** (strict)
- 🎨 **Tailwind CSS** + **shadcn/ui** primitives (`@/components/ui/*`)
- 🎬 **Framer Motion** (hero animations)
- 🗄️ **Prisma ORM** with **SQLite** (local) / **PostgreSQL** (prod)
- 🔐 **NextAuth.js** (Credentials provider, JWT, bcrypt-hashed passwords)
- ✏️ **TipTap** (WYSIWYG editor — wired in `package.json`, ready to use)
- 🖼️ **Cloudinary**-ready image handling (configurable via env)
- 🌍 **PL/EN i18n** dictionary with type-safe `t()` helper

## ✨ What's already implemented

This scaffold is a **production-ready starter**, not a complete clone of the static version. It includes:

### Public site
- `/` — Home with animated Hero (Framer Motion), live stats counters, next event with countdown, featured news
- `/aktualnosci` — News listing (Server Component, ISR cached 60s)
- `/aktualnosci/[slug]` — News detail with view counter, dynamic SEO metadata
- `SiteHeader` with sticky scroll, mobile menu, PL/EN switcher
- `SiteFooter` with newsletter, social links, sitemap

### Admin panel
- `/admin/login` — Credentials login with NextAuth
- `/admin` — Dashboard with KPIs, recent news, activity log
- Sidebar with role-aware items
- Middleware protects all `/admin/*` routes (except login)

### API routes
- `POST/GET /api/auth/[...nextauth]` — NextAuth handler
- `GET/POST /api/news` — list / create with Zod validation, role checks
- `GET/PATCH/DELETE /api/news/:id` — full CRUD with activity logging
- `GET /api/events` — events listing with `?upcoming=true` filter

### Database
- **22 models** in `prisma/schema.prisma`: User, News, Event, Project, BikeTrail, Photo, Partner, FAQ, Department, Reaction, Activity, Setting, etc.
- Self-rolled `_en` columns for i18n on `News` and `Event` (no need for full Prisma i18n plugin)
- `prisma/seed.ts` populates a working demo dataset

## 🚀 Quick start (local dev)

```bash
# 1. Install
cd next-app
npm install

# 2. Configure environment
cp .env.example .env
# Generate a NextAuth secret:
openssl rand -base64 32   # paste into NEXTAUTH_SECRET in .env

# 3. Initialise the database (SQLite by default)
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Run dev server
npm run dev
# → http://localhost:3000
# → http://localhost:3000/admin/login (admin / admin123)
```

## 🐘 Switching to PostgreSQL

For production, change `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"   // was "sqlite"
  url      = env("DATABASE_URL")
}
```

Then update `.env`:
```
DATABASE_URL="postgresql://user:pass@host:5432/pustynia"
```

Re-run:
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

> **Tip:** SQLite has no native arrays, so list fields (`tags`, `highlights`, etc.) are stored as JSON strings. The schema works on both DBs without changes — Postgres just handles them slightly faster.

## 📁 Project structure

```
next-app/
├── app/                     # App Router
│   ├── layout.tsx, page.tsx, globals.css
│   ├── aktualnosci/(page|[slug]/page).tsx
│   ├── api/auth/[...nextauth]/route.ts
│   ├── api/news/(route|[id]/route).ts
│   ├── api/events/route.ts
│   └── admin/{layout,page,login/page}.tsx
├── components/
│   ├── ui/* (shadcn-style: button, card, input, badge, label, toaster)
│   ├── hero.tsx, site-header.tsx, site-footer.tsx
│   ├── stats-section.tsx, featured-news.tsx, next-event.tsx
├── lib/
│   ├── db.ts (Prisma singleton)
│   ├── auth.ts (NextAuth config + Credentials)
│   ├── utils.ts (cn, fmtDate, slugify, sunTimes)
│   └── translations.ts (PL/EN dict, t())
├── prisma/{schema.prisma, seed.ts}
├── middleware.ts (admin route guard)
├── tailwind.config.ts (desert palette mapped to shadcn tokens)
├── next.config.mjs (security headers, image domains)
├── package.json, tsconfig.json, postcss.config.mjs
├── .env.example, .gitignore
└── README.md
```

## 🛠️ Useful scripts

```bash
npm run dev          # dev server with hot reload
npm run build        # production build
npm run start        # production server
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run db:studio    # visual DB browser at http://localhost:5555
npm run db:reset     # nuclear reset + reseed
```

## 🌐 Hosting recommendation

- **Frontend**: [Vercel](https://vercel.com) (free for hobby, optimised for Next.js)
- **Database**: [Neon](https://neon.tech) or [Supabase](https://supabase.com) for free Postgres
- **Image uploads**: [Cloudinary](https://cloudinary.com) (free tier 25 credits/month) or [UploadThing](https://uploadthing.com)
- **Email**: [Resend](https://resend.com) for newsletter / contact form notifications

## 🧱 Extending

### Add a new model

1. Edit `prisma/schema.prisma`
2. `npx prisma migrate dev --name add_xxx`
3. Build a new route in `app/api/xxx/route.ts`
4. Build the public page in `app/xxx/page.tsx`
5. Build the admin page in `app/admin/xxx/page.tsx`

### Add a new translation

Edit `lib/translations.ts`, add the key to **both** `pl` and `en`. Then use:
```tsx
import { t } from "@/lib/translations";
const lang = "pl"; // or read from cookie/header
<h1>{t("hero.title", lang)}</h1>
```

### Migrate static-site data

The static site stores data in localStorage. To migrate:
1. Open the static admin → Backup → Export JSON
2. Write a small import script that reads the JSON and pushes to Prisma using the same field names

## 📄 License & attribution

Code: do whatever you want.
Content (Pustynia Błędowska facts, history): from public sources (Wikipedia, regional tourism sites).
Logo: provided by the project owner.

---

**Status**: ✅ Working scaffold. ⚠ Some pages (full event listing, gallery, map, admin CRUD pages) are stubs — extend as you go using the patterns shown in `aktualnosci/`.
