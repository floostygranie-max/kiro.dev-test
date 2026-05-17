import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/news/:id (or :slug)
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const news = await db.news.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }] },
    include: { author: { select: { name: true } }, reactions: true },
  });
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });
  // Increment view counter (fire-and-forget)
  db.news.update({ where: { id: news.id }, data: { views: { increment: 1 } } }).catch(() => {});
  return NextResponse.json(news);
}

// PATCH /api/news/:id — admin only
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const updated = await db.news.update({
    where: { id: params.id },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.excerpt && { excerpt: body.excerpt }),
      ...(body.content && { content: body.content }),
      ...(body.cover && { cover: body.cover }),
      ...(body.category && { category: body.category }),
      ...(body.tags && { tags: JSON.stringify(body.tags) }),
      ...(body.featured !== undefined && { featured: body.featured }),
      ...(body.published !== undefined && { published: body.published }),
    },
  });

  await db.activity.create({
    data: {
      userId: session.user.id,
      username: (session.user as any).username || "system",
      action: "update",
      target: "news",
      details: updated.title,
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/news/:id — admin only
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const news = await db.news.findUnique({ where: { id: params.id } });
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.news.delete({ where: { id: params.id } });
  await db.activity.create({
    data: {
      userId: session.user.id,
      username: (session.user as any).username || "system",
      action: "delete",
      target: "news",
      details: news.title,
    },
  });

  return NextResponse.json({ ok: true });
}
