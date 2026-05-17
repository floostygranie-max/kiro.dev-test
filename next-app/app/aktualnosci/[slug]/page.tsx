import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { fmtDate, parseJSON } from "@/lib/utils";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = await db.news.findUnique({ where: { slug: params.slug } });
  if (!news) return { title: "Nie znaleziono" };
  return {
    title: news.title,
    description: news.excerpt,
    openGraph: { title: news.title, description: news.excerpt, type: "article" },
  };
}

export default async function NewsDetail({ params }: Props) {
  const news = await db.news.findUnique({
    where: { slug: params.slug },
    include: { author: { select: { name: true } }, reactions: true },
  });
  if (!news) notFound();

  // Fire-and-forget view increment
  db.news.update({ where: { id: news.id }, data: { views: { increment: 1 } } }).catch(() => {});

  const tags = parseJSON<string[]>(news.tags, []);

  return (
    <article className="container py-12 max-w-3xl mx-auto">
      <p className="text-xs text-muted-foreground mb-3">
        <Link href="/" className="hover:text-sun-500">Strona główna</Link> ›{" "}
        <Link href="/aktualnosci" className="hover:text-sun-500">Aktualności</Link> ›{" "}
        {news.title}
      </p>
      <Badge className="mb-3" variant="accent">{news.category}</Badge>
      <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
      <div className="flex gap-4 text-sm text-muted-foreground mb-6">
        <span>📅 {fmtDate(news.publishedAt)}</span>
        {news.author?.name && <span>✍️ {news.author.name}</span>}
        <span>👁 {news.views.toLocaleString("pl-PL")} wyświetleń</span>
      </div>
      <div className="aspect-[21/9] rounded-2xl mb-8" style={{ background: news.cover }} />
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
          {tags.map((t) => (
            <span key={t} className="px-3 py-1 bg-secondary rounded-full text-xs font-semibold">
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
