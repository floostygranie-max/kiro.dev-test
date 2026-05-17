"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix?: string; label: string };

export function StatsSection({ stats }: { stats: Stat[] }) {
  if (!stats || !stats.length) return null;
  return (
    <section className="bg-sand-900 text-sand-50 py-16">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-sand-300 font-bold mb-2">
            Pustynia w liczbach
          </p>
          <h2 className="text-3xl font-bold text-sand-50">
            Skala, której nie spodziewasz się w Polsce
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <Counter key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value]);

  return (
    <div ref={ref}>
      <div className="font-display font-extrabold text-sun-400 leading-none flex items-baseline justify-center"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
        <span>{val.toLocaleString("pl-PL")}</span>
        {suffix && <span className="text-[.6em] text-sand-200 ml-1">{suffix}</span>}
      </div>
      <div className="text-sand-300 text-sm mt-2">{label}</div>
    </div>
  );
}
