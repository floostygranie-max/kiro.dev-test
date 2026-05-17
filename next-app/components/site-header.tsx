"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", labelPL: "Strona główna", labelEN: "Home" },
  { href: "/aktualnosci", labelPL: "Aktualności", labelEN: "News" },
  { href: "/wydarzenia", labelPL: "Wydarzenia", labelEN: "Events" },
  { href: "/polska-sahara", labelPL: "Polska Sahara", labelEN: "Polish Sahara" },
  { href: "/projekty", labelPL: "Projekty", labelEN: "Projects" },
  { href: "/trasy-rowerowe", labelPL: "Trasy rowerowe", labelEN: "Bike trails" },
  { href: "/cennik", labelPL: "Cennik", labelEN: "Pricing" },
  { href: "/galeria", labelPL: "Galeria", labelEN: "Gallery" },
  { href: "/mapa", labelPL: "Mapa", labelEN: "Map" },
  { href: "/kontakt", labelPL: "Kontakt", labelEN: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"pl" | "en">("pl");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 font-bold tracking-wide">
          <LogoSVG className="h-10 w-10" />
          <div className="leading-tight">
            <span className="text-sm">PUSTYNIA BŁĘDOWSKA</span>
            <small className="block text-[.6rem] font-normal tracking-[.15em] text-muted-foreground">
              POLSKA SAHARA
            </small>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href as any}
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-semibold transition-colors hover:text-sun-500",
                pathname === l.href && "text-sand-900 dark:text-sun-400"
              )}
            >
              {lang === "en" ? l.labelEN : l.labelPL}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-secondary p-0.5 text-xs">
            <button
              onClick={() => setLang("pl")}
              className={cn("rounded-full px-2 py-1 font-bold", lang === "pl" && "bg-primary text-primary-foreground")}
            >
              PL
            </button>
            <button
              onClick={() => setLang("en")}
              className={cn("rounded-full px-2 py-1 font-bold", lang === "en" && "bg-primary text-primary-foreground")}
            >
              EN
            </button>
          </div>
          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="container flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href as any}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 px-2 text-sm font-semibold border-b border-border/50",
                  pathname === l.href && "text-sand-900 bg-secondary/30"
                )}
              >
                {lang === "en" ? l.labelEN : l.labelPL}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function LogoSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <polygon points="100,8 180,52 180,148 100,192 20,148 20,52" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <g fill="currentColor">
        <polygon points="100,20 110,95 100,100 90,95" />
        <polygon points="100,180 110,105 100,100 90,105" />
        <polygon points="22,100 95,90 100,100 95,110" />
        <polygon points="178,100 105,90 100,100 105,110" />
        <polygon points="42,42 96,96 100,100 90,90" />
        <polygon points="158,42 104,96 100,100 110,90" />
        <polygon points="42,158 96,104 100,100 90,110" />
        <polygon points="158,158 104,104 100,100 110,110" />
      </g>
    </svg>
  );
}
