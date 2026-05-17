/**
 * Seed script — populates the database with the same demo data
 * used by the static (vanilla JS) version.
 *
 * Run:  npm run db:seed
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ---- Admin user ----
  const passHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
  const admin = await prisma.user.upsert({
    where: { username: process.env.ADMIN_USERNAME || "admin" },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME || "admin",
      email: process.env.ADMIN_EMAIL || "admin@pustynia-bledowska.eu",
      passwordHash: passHash,
      name: "Administrator",
      role: "ADMIN",
    },
  });
  console.log(`✓ Admin user: ${admin.username}`);

  // ---- Settings ----
  const settings = [
    { key: "siteName", value: JSON.stringify("Pustynia Błędowska") },
    { key: "tagline", value: JSON.stringify("Polska Sahara") },
    { key: "description", value: JSON.stringify("Największy obszar lotnych piasków w Europie Środkowej.") },
    { key: "contact", value: JSON.stringify({ phone: "+48 32 642 03 02", email: "kontakt@pustynia-bledowska.eu", address: "Klucze, woj. małopolskie", hours: "Pn–Nd: 8:00–20:00" }) },
    { key: "stats", value: JSON.stringify([
      { value: 32, suffix: " km²", label: "Powierzchnia pustyni" },
      { value: 30, suffix: " m", label: "Wysokość najwyższych wydm" },
      { value: 13, suffix: " w.", label: "Wieku, w którym powstała" },
      { value: 100, suffix: "k+", label: "Odwiedzających rocznie" },
    ]) },
  ];
  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
  }
  console.log(`✓ Settings: ${settings.length} keys`);

  // ---- News (sample) ----
  const newsData = [
    {
      title: "Nowy szlak edukacyjny już otwarty!",
      slug: "nowy-szlak-edukacyjny-juz-otwarty",
      excerpt: "Z radością informujemy o otwarciu nowego szlaku edukacyjnego.",
      content: "<p>Z ogromną radością informujemy o oficjalnym otwarciu nowego, w pełni oznakowanego szlaku edukacyjnego, który prowadzi przez najpiękniejsze zakątki Pustyni Błędowskiej.</p><p>Szlak liczy <strong>7,2 km</strong> i obejmuje 12 stacji edukacyjnych.</p>",
      cover: "linear-gradient(135deg,#F4A340 0%,#8B5A2B 100%)",
      category: "Infrastruktura",
      tags: JSON.stringify(["szlak", "edukacja", "rodzina"]),
      views: 1247,
      featured: true,
      published: true,
      publishedAt: new Date("2026-05-10"),
      authorId: admin.id,
    },
    {
      title: "Wiosenne kwitnienie szczotlichy siwej",
      slug: "wiosenne-kwitnienie-szczotlichy",
      excerpt: "Już niedługo będziemy mogli podziwiać niezwykłe zjawisko kwitnienia szczotlichy siwej.",
      content: "<p>Maj i czerwiec to wyjątkowy czas na pustyni. Zakwita wówczas <em>szczotlicha siwa</em>.</p>",
      cover: "linear-gradient(135deg,#A8C49B 0%,#3F5E32 100%)",
      category: "Przyroda",
      tags: JSON.stringify(["flora", "wiosna", "fotografia"]),
      views: 854,
      featured: true,
      published: true,
      publishedAt: new Date("2026-05-05"),
      authorId: admin.id,
    },
    {
      title: "Inwazja Pustynna 2026 — zapisy otwarte",
      slug: "inwazja-pustynna-2026",
      excerpt: "Doroczna rekonstrukcja historyczna z udziałem czołgów i pojazdów wojskowych.",
      content: "<p>Już 14–16 sierpnia 2026 odbędzie się <strong>XXII Inwazja Pustynna</strong>.</p>",
      cover: "linear-gradient(135deg,#8B5A2B 0%,#1F1F1F 100%)",
      category: "Wydarzenia",
      tags: JSON.stringify(["historia", "rekonstrukcja", "lato"]),
      views: 3421,
      featured: true,
      published: true,
      publishedAt: new Date("2026-04-28"),
      authorId: admin.id,
    },
  ];

  for (const n of newsData) {
    const created = await prisma.news.upsert({
      where: { slug: n.slug },
      update: {},
      create: n,
    });
    // Seed reactions
    await prisma.reaction.createMany({
      data: [
        { newsId: created.id, type: "heart", count: Math.floor(Math.random() * 100) + 20 },
        { newsId: created.id, type: "thumb", count: Math.floor(Math.random() * 80) + 10 },
        { newsId: created.id, type: "love",  count: Math.floor(Math.random() * 60) + 5 },
        { newsId: created.id, type: "fire",  count: Math.floor(Math.random() * 40) + 2 },
        { newsId: created.id, type: "clap",  count: Math.floor(Math.random() * 50) + 5 },
      ],
      skipDuplicates: true,
    });
  }
  console.log(`✓ News: ${newsData.length} articles + reactions`);

  // ---- Event series + events ----
  const series = await prisma.eventSeries.upsert({
    where: { id: "inwazja" },
    update: {},
    create: { id: "inwazja", name: "Inwazja Pustynna", description: "Doroczna rekonstrukcja historyczna", firstEdition: 2003, category: "Rekonstrukcja" },
  });
  const events = [
    {
      title: "Inwazja Pustynna 2026", slug: "inwazja-pustynna-2026-event",
      description: "Największa rekonstrukcja historyczna w południowej Polsce.",
      startDate: new Date("2026-08-14"), endDate: new Date("2026-08-16"),
      time: "10:00 - 20:00", location: "Główne pole pustyni", category: "Rekonstrukcja",
      capacity: 5000, registered: 1834, price: "30 zł",
      cover: "linear-gradient(135deg,#8B5A2B 0%,#1F1F1F 100%)",
      seriesId: series.id, published: true,
    },
    {
      title: "Maraton Pustynny 2026", slug: "maraton-pustynny-2026-event",
      description: "Półmaraton z metą na szczycie najwyższej wydmy.",
      startDate: new Date("2026-09-05"), endDate: new Date("2026-09-05"),
      time: "08:00", location: "Klucze → Czubatka", category: "Sport",
      capacity: 800, registered: 421, price: "120 zł",
      cover: "linear-gradient(135deg,#F4A340 0%,#C56812 100%)",
      published: true,
    },
  ];
  for (const e of events) {
    await prisma.event.upsert({ where: { slug: e.slug }, update: {}, create: e });
  }
  console.log(`✓ Events: ${events.length}`);

  // ---- Gallery folders + photos ----
  const folder = await prisma.galleryFolder.upsert({
    where: { slug: "wydmy-o-swicie" },
    update: {},
    create: {
      slug: "wydmy-o-swicie",
      name: "Wydmy o świcie",
      description: "Magiczne wschody słońca nad pustynią",
      cover: "linear-gradient(135deg,#FFD27A,#F4A340,#8B5A2B)",
      order: 1,
    },
  });
  await prisma.photo.deleteMany({ where: { folderId: folder.id } });
  await prisma.photo.createMany({
    data: [
      { title: "Świt nad Czubatką", cover: "linear-gradient(135deg,#FFD27A 0%,#F4A340 60%,#8B5A2B 100%)", author: "Tomasz Nowak", date: new Date("2026-05-01"), tags: JSON.stringify(["świt"]), aspect: "landscape", folderId: folder.id },
      { title: "Złota godzina",      cover: "linear-gradient(135deg,#F4A340 0%,#C56812 100%)",            author: "Anna Wiśniewska", date: new Date("2026-04-22"), tags: JSON.stringify(["zachód"]), aspect: "landscape", folderId: folder.id },
    ],
  });
  console.log(`✓ Gallery: 1 folder, 2 photos`);

  // ---- Funding sources ----
  const sources = [
    { code: "efrr", name: "EFRR", org: "Unia Europejska", description: "Fundusz rozwoju regionalnego", totalReceived: "8 600 000 zł", projects: 1 },
    { code: "life", name: "LIFE+", org: "Komisja Europejska", description: "Program ochrony środowiska", totalReceived: "1 200 000 zł", projects: 1 },
    { code: "nfos", name: "NFOŚiGW", org: "NFOŚiGW", description: "Krajowy fundusz ekologiczny", totalReceived: "2 400 000 zł", projects: 1 },
  ];
  for (const s of sources) {
    await prisma.fundingSource.upsert({ where: { code: s.code }, update: {}, create: s });
  }
  console.log(`✓ Funding sources: ${sources.length}`);

  // ---- Departments ----
  const depts = [
    { name: "Informacja ogólna", description: "Pytania ogólne", email: "kontakt@pustynia-bledowska.eu", phone: "+48 32 642 03 02", icon: "ℹ️", responseTime: "24h" },
    { name: "Bilety i rezerwacje", description: "Bilety online", email: "bilety@pustynia-bledowska.eu", phone: "+48 32 642 03 03", icon: "🎟", responseTime: "12h" },
    { name: "Wydarzenia i grupy", description: "Imprezy, grupy", email: "wydarzenia@pustynia-bledowska.eu", phone: "+48 32 642 03 04", icon: "🎉", responseTime: "24h" },
  ];
  for (const d of depts) {
    await prisma.department.create({ data: d }).catch(() => {});
  }
  console.log(`✓ Departments: ${depts.length}`);

  // ---- FAQ ----
  const faq = [
    { q: "Czy w pustyni jest dużo do chodzenia?", a: "Mamy szlaki od 1,5 do 18,6 km.", category: "Zwiedzanie" },
    { q: "Czy psy są mile widziane?", a: "Tak, na smyczy. Sprzątaj po pupilu.", category: "Zwiedzanie" },
    { q: "Jak dojechać?", a: "Z A4, zjazd Olkusz, dalej DW791 do Klucz.", category: "Dojazd" },
  ];
  for (const f of faq) {
    await prisma.fAQ.create({ data: f }).catch(() => {});
  }
  console.log(`✓ FAQ: ${faq.length}`);

  // ---- Activity (initial entry) ----
  await prisma.activity.create({
    data: {
      username: admin.username,
      userId: admin.id,
      action: "create",
      target: "system",
      details: "Inicjalne seedowanie bazy danych",
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
