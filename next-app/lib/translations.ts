/**
 * Translations — used both server (in pages) and client side.
 * Pattern: import { t } from "@/lib/translations";
 *          const lang = (cookies().get("lang")?.value === "en") ? "en" : "pl";
 *          t("nav.home", lang)
 */

export type Lang = "pl" | "en";

export const dict = {
  pl: {
    "nav.home":     "Strona główna",
    "nav.news":     "Aktualności",
    "nav.events":   "Wydarzenia",
    "nav.about":    "Polska Sahara",
    "nav.projects": "Projekty",
    "nav.bikes":    "Trasy rowerowe",
    "nav.pricing":  "Cennik",
    "nav.gallery":  "Galeria",
    "nav.map":      "Mapa",
    "nav.contact":  "Kontakt",
    "nav.partners": "Partnerzy",

    "hero.title":    "Pustynia Błędowska",
    "hero.subtitle": "· Polska Sahara ·",
    "hero.lead":     "Największy obszar lotnych piasków w Europie Środkowej.",
    "hero.cta.plan": "Zaplanuj wizytę",

    "btn.readMore":  "Czytaj więcej",
    "btn.viewAll":   "Zobacz wszystkie",
    "btn.details":   "Szczegóły",
    "btn.book":      "Zapisz się",
    "btn.share":     "Udostępnij",

    "label.author":  "Autor",
    "label.date":    "Data",
    "label.views":   "Wyświetlenia",
  },
  en: {
    "nav.home":     "Home",
    "nav.news":     "News",
    "nav.events":   "Events",
    "nav.about":    "Polish Sahara",
    "nav.projects": "Projects",
    "nav.bikes":    "Bike trails",
    "nav.pricing":  "Pricing",
    "nav.gallery":  "Gallery",
    "nav.map":      "Map",
    "nav.contact":  "Contact",
    "nav.partners": "Partners",

    "hero.title":    "Błędów Desert",
    "hero.subtitle": "· Polish Sahara ·",
    "hero.lead":     "The largest area of shifting sands in Central Europe.",
    "hero.cta.plan": "Plan your visit",

    "btn.readMore":  "Read more",
    "btn.viewAll":   "View all",
    "btn.details":   "Details",
    "btn.book":      "Sign up",
    "btn.share":     "Share",

    "label.author":  "Author",
    "label.date":    "Date",
    "label.views":   "Views",
  },
} as const;

export type DictKey = keyof typeof dict.pl;

export function t(key: DictKey, lang: Lang = "pl"): string {
  return (dict[lang] as any)[key] || (dict.pl as any)[key] || key;
}
