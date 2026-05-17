"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background:
          "radial-gradient(ellipse at 30% 80%, rgba(244,163,64,.4) 0%, transparent 50%)," +
          "radial-gradient(ellipse at 70% 20%, rgba(255,210,122,.5) 0%, transparent 50%)," +
          "linear-gradient(180deg, #FFE4B5 0%, #F4A340 35%, #C56812 70%, #6B4422 100%)",
      }}
    >
      {/* Animated sun */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[18%] top-[18%] h-[15vw] w-[15vw] max-h-56 max-w-56 min-h-32 min-w-32 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #FFFBEA, #FFD27A 40%, #F4A340 100%)",
          boxShadow: "0 0 80px rgba(255,210,122,.6), 0 0 140px rgba(244,163,64,.4)",
        }}
      />

      {/* Dunes silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          background:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 400' preserveAspectRatio='none'%3E%3Cpath fill='%238B5A2B' opacity='0.5' d='M0 320 Q200 240 400 280 T800 260 T1200 290 T1440 270 V400 H0Z'/%3E%3Cpath fill='%236B4422' opacity='0.7' d='M0 350 Q300 290 600 320 T1200 330 T1440 310 V400 H0Z'/%3E%3Cpath fill='%231F1F1F' d='M0 380 Q400 340 800 370 T1440 360 V400 H0Z'/%3E%3C/svg%3E\") no-repeat bottom",
          backgroundSize: "100% 100%",
        }}
      />

      <div className="container relative z-10 text-center py-12">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-sand-900 mb-4"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-.02em", textShadow: "0 4px 20px rgba(255,255,255,.3)" }}
        >
          Pustynia Błędowska
          <span className="block italic font-normal text-[0.55em] tracking-[.35em] uppercase mt-3">
            · Polska Sahara ·
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-sand-900 max-w-2xl mx-auto mb-6 font-medium"
          style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}
        >
          Największy obszar lotnych piasków w Europie Środkowej. 32 km² niezwykłego krajobrazu,
          rezerwat Natura 2000 — miejsce, w którym Polska wygląda jak Afryka.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Button asChild size="lg">
            <Link href="/cennik">Zaplanuj wizytę</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/polska-sahara">Poznaj historię</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/galeria">Zobacz galerię →</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-sand-50 text-xs uppercase tracking-widest flex flex-col items-center gap-2"
      >
        <span>Przewiń</span>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
