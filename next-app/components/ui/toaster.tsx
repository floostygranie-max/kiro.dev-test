"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// Hook for programmatic toasts
type ToastEvent = { title?: string; description: string; variant?: "default" | "ok" | "err" };
type Listener = (t: ToastEvent) => void;
const listeners: Set<Listener> = new Set();

export function toast(t: ToastEvent) {
  listeners.forEach((l) => l(t));
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<(ToastEvent & { id: number })[]>([]);
  React.useEffect(() => {
    const fn: Listener = (t) => {
      const id = Date.now() + Math.random();
      setToasts((arr) => [...arr, { ...t, id }]);
      setTimeout(() => setToasts((arr) => arr.filter((x) => x.id !== id)), 3000);
    };
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);

  return (
    <ToastPrimitives.Provider>
      {toasts.map((t) => (
        <ToastPrimitives.Root
          key={t.id}
          className={cn(
            "rounded-md shadow-lg px-5 py-3 text-sm font-medium animate-fade-up",
            t.variant === "ok"  && "bg-green-500 text-white",
            t.variant === "err" && "bg-destructive text-destructive-foreground",
            !t.variant            && "bg-primary text-primary-foreground"
          )}
        >
          {t.title && <ToastPrimitives.Title className="font-bold mb-1">{t.title}</ToastPrimitives.Title>}
          <ToastPrimitives.Description>{t.description}</ToastPrimitives.Description>
        </ToastPrimitives.Root>
      ))}
      <ToastPrimitives.Viewport className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm" />
    </ToastPrimitives.Provider>
  );
}
