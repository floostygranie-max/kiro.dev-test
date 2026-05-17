import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "Pustynia Błędowska — Polska Sahara",
    template: "%s · Pustynia Błędowska",
  },
  description:
    "Oficjalna strona Pustyni Błędowskiej — największego obszaru lotnych piasków w Europie Środkowej.",
  themeColor: "#1F1F1F",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
