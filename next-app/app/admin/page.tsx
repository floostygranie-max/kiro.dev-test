import Link from "next/link";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, ImageIcon, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const [newsCount, publishedNews, eventsCount, photosCount, msgsCount, unreadMsgs] = await Promise.all([
    db.news.count(),
    db.news.count({ where: { published: true } }),
    db.event.count(),
    db.photo.count(),
    db.message.count(),
    db.message.count({ where: { read: false } }),
  ]);

  const recentNews = await db.news.findMany({
    orderBy: { publishedAt: "desc" },
    take: 5,
    include: { author: { select: { name: true } } },
  });

  const recentActivity = await db.activity.findMany({
    orderBy: { date: "desc" },
    take: 6,
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-br from-sand-900 to-[#2A1F14] p-6 text-sand-50 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Witaj, {session.user?.name}!</h2>
          <p className="text-sand-300 text-sm">Co dziś robimy?</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="accent" size="sm">
            <Link href="/admin/news/new">
              <Plus className="h-4 w-4" /> Nowa aktualność
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Aktualności" value={publishedNews} sub={`/ ${newsCount} łącznie`} icon={<FileText className="h-5 w-5" />} />
        <KpiCard label="Wydarzenia" value={eventsCount} icon={<Calendar className="h-5 w-5" />} />
        <KpiCard label="Zdjęcia" value={photosCount} icon={<ImageIcon className="h-5 w-5" />} />
        <KpiCard label="Wiadomości" value={msgsCount} sub={`${unreadMsgs} nowych`} icon={<MessageSquare className="h-5 w-5" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ostatnie aktualności</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-xs uppercase text-muted-foreground">Tytuł</th>
                  <th className="text-left p-3 text-xs uppercase text-muted-foreground">Wyśw.</th>
                </tr>
              </thead>
              <tbody>
                {recentNews.map((n) => (
                  <tr key={n.id} className="border-b hover:bg-secondary/30">
                    <td className="p-3 font-semibold">
                      <Link href={`/admin/news/${n.id}/edit`} className="hover:text-sun-500">
                        {n.title.length > 40 ? n.title.slice(0, 40) + "…" : n.title}
                      </Link>
                    </td>
                    <td className="p-3">{n.views.toLocaleString("pl-PL")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ostatnia aktywność</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentActivity.map((a) => (
                <li key={a.id} className="flex gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold">
                    {a.action[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <strong className="block">{a.action} → {a.target}</strong>
                    <small className="text-muted-foreground">
                      {a.username} · {new Date(a.date).toLocaleString("pl-PL")}
                    </small>
                  </div>
                </li>
              ))}
              {!recentActivity.length && (
                <li className="text-center text-muted-foreground py-6">Brak aktywności</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KpiCard({ label, value, sub, icon }: { label: string; value: number; sub?: string; icon: React.ReactNode }) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="absolute top-4 right-4 h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-sun-500">
          {icon}
        </div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{label}</div>
        <div className="text-3xl font-display font-extrabold mt-1">{value.toLocaleString("pl-PL")}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </CardContent>
    </Card>
  );
}
