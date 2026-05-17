import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { slugify } from "@/lib/utils";

// GET /api/news?published=true&category=...&limit=20
export async function GET(req: Request) {
  const url = new URL(req.url);
  const published = url.searchParams.get("published") === "true";
  const category = url.searchParams.get("category") || undefined;
  const limit = Number(url.searchParams.get("limit") || 50);

  const news = await db.news.findMany({
    where: { published, ...(category && { category }) },
    orderBy: { publishedAt: "desc" },
    take: Math.min(limit, 100),
    include: { author: { select: { name: true } } },
  });
  return NextResponse.json(news);
}

const NewsCreate = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  cover: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

// POST /api/news — admin only
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if ((session.user as any).role !== "ADMIN" && (session.user as any).role !== "EDITOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const data = NewsCreate.parse(body);
  const slug = data.slug || slugify(data.title);

  const created = await db.news.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      cover: data.cover,
      category: data.category,
      tags: JSON.stringify(data.tags),
      featured: data.featured ?? false,
      published: data.published ?? true,
      authorId: session.user.id,
    },
  });

  await db.activity.create({
    data: {
      userId: session.user.id,
      username: (session.user as any).username || session.user.name || "system",
      action: "create",
      target: "news",
      details: data.title,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
