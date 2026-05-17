import Link from "next/link";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fmtDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Aktualności" };
export const revalidate = 60;

export default async function NewsPage() {
  const news = await db.news.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="container py-12">
      <header className="mb-10">
        <p className="text-xs text-muted-foreground mb-2">
          <Link href="/" className="hover:text-sun-500">Strona główna</Link> › Aktualności
        </p>
        <h1 className="text-4xl font-bold mb-2">Aktualności</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Najnowsze wiadomości, ogłoszenia i ciekawostki z naszego rezerwatu.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((n) => (
          <Link href={`/aktualnosci/${n.slug}`} key={n.id} className="group">
            <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[16/10] transition-transform group-hover:scale-105 duration-500" style={{ background: n.cover }} />
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Badge>{n.category}</Badge>
                  <time>📅 {fmtDate(n.publishedAt)}</time>
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{n.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{n.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {!news.length && (
        <div className="text-center py-16 text-muted-foreground">
          Brak opublikowanych aktualności.
        </div>
      )}
    </div>
  );
}
