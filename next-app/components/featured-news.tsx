import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fmtDate, parseJSON } from "@/lib/utils";

type News = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover: string;
  category: string;
  publishedAt: Date;
  views: number;
  author?: { name: string } | null;
};

export function FeaturedNews({ news }: { news: News[] }) {
  return (
    <section className="container py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-sand-600 font-bold mb-2">Aktualności</p>
        <h2 className="text-3xl font-bold mb-2">Co nowego na pustyni?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Najnowsze wiadomości, ogłoszenia i ciekawostki z naszego rezerwatu
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((n, i) => (
          <Link
            href={`/aktualnosci/${n.slug}`}
            key={n.id}
            className={`group ${i === 0 ? "md:col-span-2 md:row-span-1" : ""}`}
          >
            <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
              <div
                className="aspect-[4/3] transition-transform group-hover:scale-105 duration-500"
                style={{ background: n.cover }}
              />
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Badge>{n.category}</Badge>
                  <time>📅 {fmtDate(n.publishedAt)}</time>
                  <span>👁 {n.views.toLocaleString("pl-PL")}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{n.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{n.excerpt}</p>
                <span className="inline-block mt-3 text-sun-500 font-semibold text-sm">
                  Czytaj więcej →
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button asChild variant="outline">
          <Link href="/aktualnosci">Wszystkie aktualności →</Link>
        </Button>
      </div>
    </section>
  );
}
