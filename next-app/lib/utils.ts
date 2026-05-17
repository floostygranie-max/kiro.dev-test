import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes (handles conflicts) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format date — Polish locale */
export function fmtDate(date: Date | string | null | undefined, opts?: Intl.DateTimeFormatOptions) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("pl-PL", opts || { day: "numeric", month: "long", year: "numeric" });
}

export function fmtDateShort(date: Date | string | null | undefined) {
  return fmtDate(date, { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** Polish-aware slugify */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ą/g, "a").replace(/ć/g, "c").replace(/ę/g, "e").replace(/ł/g, "l")
    .replace(/ń/g, "n").replace(/ó/g, "o").replace(/ś/g, "s")
    .replace(/ź/g, "z").replace(/ż/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Parse JSON-encoded array field with fallback */
export function parseJSON<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

/** Sunrise / sunset for Pustynia Błędowska (NOAA-based) */
export function sunTimes(date = new Date(), lat = 50.346, lon = 19.487) {
  const rad = Math.PI / 180;
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86400000);
  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1);
  const decl =
    0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);
  const zenith = 90.833 * rad;
  const cosH = (Math.cos(zenith) - Math.sin(lat * rad) * Math.sin(decl)) / (Math.cos(lat * rad) * Math.cos(decl));
  if (cosH < -1 || cosH > 1) return { sunrise: "—", sunset: "—" };
  const H = Math.acos(cosH);
  const offset = -date.getTimezoneOffset() / 60;
  const toHM = (h: number) => {
    let v = h; if (v < 0) v += 24; if (v >= 24) v -= 24;
    const hh = Math.floor(v); const mm = Math.round((v - hh) * 60);
    return String(hh).padStart(2, "0") + ":" + String(mm % 60).padStart(2, "0");
  };
  const sunriseUTC = 12 - (H * 12) / Math.PI - lon / 15;
  const sunsetUTC  = 12 + (H * 12) / Math.PI - lon / 15;
  return { sunrise: toHM(sunriseUTC + offset), sunset: toHM(sunsetUTC + offset) };
}
