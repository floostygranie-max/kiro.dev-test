"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    setLoading(false);
    if (result?.error) {
      setErr("Nieprawidłowa nazwa użytkownika lub hasło.");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(ellipse at 30% 80%, rgba(244,163,64,.4), transparent 50%)," +
          "radial-gradient(ellipse at 70% 20%, rgba(255,210,122,.3), transparent 50%)," +
          "linear-gradient(180deg, #FFE4B5 0%, #C56812 70%, #1F1F1F 100%)",
      }}
    >
      <div className="bg-card rounded-3xl p-10 max-w-md w-full shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-1">Panel administratora</h1>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Pustynia Błędowska · system CMS
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="u">Nazwa użytkownika</Label>
            <Input id="u" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
          </div>
          <div>
            <Label htmlFor="p">Hasło</Label>
            <Input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {err && (
            <div className="rounded-md bg-destructive/15 border border-destructive/30 px-4 py-2 text-sm text-destructive">
              {err}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logowanie..." : "Zaloguj się"}
          </Button>
        </form>

        <div className="mt-5 p-3 bg-secondary/50 rounded-md text-xs text-muted-foreground text-center border border-dashed">
          💡 Dane testowe: <code>admin</code> / <code>admin123</code>
        </div>
      </div>
    </div>
  );
}
