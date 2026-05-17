import { db } from "@/lib/db";
import { Hero } from "@/components/hero";
import { FeaturedNews } from "@/components/featured-news";
import { NextEvent } from "@/components/next-event";
import { StatsSection } from "@/components/stats-section";

export const revalidate = 60; // ISR — revalidate homepage every 60s

export default async function Home() {
  const [news, events, settings] = await Promise.all([
    db.news.findMany({
      where: { published: true, featured: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { author: { select: { name: true } } },
    }),
    db.event.findMany({
      where: { published: true, endDate: { gte: new Date() } },
      orderBy: { startDate: "asc" },
      take: 1,
    }),
    db.setting.findMany({ where: { key: { in: ["siteName", "stats"] } } }),
  ]);

  const stats = (() => {
    const s = settings.find((x) => x.key === "stats");
    if (!s) return [];
    try { return JSON.parse(s.value); } catch { return []; }
  })();

  return (
    <>
      <Hero />
      <StatsSection stats={stats} />
      <NextEvent event={events[0]} />
      <FeaturedNews news={news} />
    </>
  );
}
