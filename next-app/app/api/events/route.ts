import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/events?upcoming=true
export async function GET(req: Request) {
  const url = new URL(req.url);
  const upcoming = url.searchParams.get("upcoming") === "true";

  const events = await db.event.findMany({
    where: {
      published: true,
      ...(upcoming && { endDate: { gte: new Date() } }),
    },
    orderBy: { startDate: "asc" },
    take: 50,
  });
  return NextResponse.json(events);
}
