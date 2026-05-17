import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogOut, LayoutDashboard, FileText, Calendar, ImageIcon, MessageSquare, Settings } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // No auth check on /admin/login — middleware handles the rest
  return (
    <div className="flex min-h-screen bg-secondary/30">
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64">
        {children}
      </main>
    </div>
  );
}

async function Sidebar() {
  // Skip rendering when on /admin/login (no session yet)
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const links = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: "/admin/news", label: "Aktualności", icon: <FileText className="h-4 w-4" /> },
    { href: "/admin/events", label: "Wydarzenia", icon: <Calendar className="h-4 w-4" /> },
    { href: "/admin/gallery", label: "Galeria", icon: <ImageIcon className="h-4 w-4" /> },
    { href: "/admin/messages", label: "Wiadomości", icon: <MessageSquare className="h-4 w-4" /> },
    { href: "/admin/settings", label: "Ustawienia", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-sand-900 text-sand-200 flex flex-col z-40">
      <Link href="/admin" className="flex items-center gap-3 p-5 border-b border-white/10 text-sand-50">
        <span className="font-bold tracking-wide">Pustynia Bł.</span>
      </Link>
      <nav className="flex-1 p-3 space-y-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href as any}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-white/10"
          >
            {l.icon}
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-sun-400 flex items-center justify-center font-bold text-sand-900">
          {(session.user?.name || "A")[0]}
        </div>
        <div className="flex-1 text-xs">
          <strong className="block text-sand-50">{session.user?.name}</strong>
          <span className="text-sand-400">{(session.user as any)?.role}</span>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button type="submit" className="rounded-md bg-white/10 p-1.5 hover:bg-destructive">
            <LogOut className="h-4 w-4" />
          </button>
        </form>
      </div>
    </aside>
  );
}
