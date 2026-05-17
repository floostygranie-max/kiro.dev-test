"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fmtDate } from "@/lib/utils";

type Event = {
  id: string;
  title: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  time?: string | null;
  location: string;
  price: string;
  cover: string;
};

export function NextEvent({ event }: { event?: Event }) {
  if (!event) return null;
  return (
    <section className="container py-16">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-widest text-sand-600 font-bold mb-2">
          Najbliższe wydarzenie
        </p>
        <h2 className="text-3xl font-bold">Nie przegap!</h2>
      </div>
      <div className="grid md:grid-cols-[1fr_2fr] rounded-2xl overflow-hidden border bg-card shadow-md">
        <div className="min-h-[280px]" style={{ background: event.cover }} />
        <div className="p-8 flex flex-col">
          <span className="self-start bg-sand-900 text-sun-400 px-3 py-1 rounded-md text-sm font-bold mb-3">
            {fmtDate(event.startDate)}
          </span>
          <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span>📍 {event.location}</span>
            {event.time && <span>🕐 {event.time}</span>}
            <span>🎟 {event.price}</span>
          </div>
          <p className="mb-4">{event.description}</p>
          <Countdown target={new Date(event.startDate as any).getTime()} />
          <div className="mt-auto flex gap-3 flex-wrap pt-4">
            <Button asChild>
              <Link href={`/wydarzenia/${event.id}`}>Szczegóły</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/wydarzenia">Wszystkie wydarzenia</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Countdown({ target }: { target: number }) {
  const [d, setD] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff < 0) return setD({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setD({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className="flex gap-3">
      {[
        { v: d.days, label: "dni" },
        { v: d.hours, label: "godz" },
        { v: d.minutes, label: "min" },
        { v: d.seconds, label: "sek" },
      ].map((b, i) => (
        <div key={i} className="bg-sand-100 rounded-md px-4 py-3 text-center min-w-[70px]">
          <strong className="block font-display text-2xl text-sand-900 leading-none">{b.v}</strong>
          <small className="text-[.65rem] uppercase tracking-wider text-muted-foreground">{b.label}</small>
        </div>
      ))}
    </div>
  );
}
