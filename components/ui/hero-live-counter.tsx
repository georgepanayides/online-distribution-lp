"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

type LiveCounterProps = {
  start?: number;
  intervalMs?: number;
  stepMin?: number;
  stepMax?: number;
  className?: string;
  locale?: string;
};

function clampInt(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(value)));
}

export function HeroLiveCounter({
  start = 12873491,
  intervalMs = 900,
  stepMin = 8,
  stepMax = 38,
  className,
  locale = "en-NZ",
}: LiveCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = useMotionValue(start);
  const spring = useSpring(target, {
    damping: 34,
    stiffness: 120,
    mass: 1.1,
  });

  const nextValueRef = useRef(start);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      if (ref.current) {
        ref.current.textContent = new Intl.NumberFormat(locale).format(start);
      }
      return;
    }

    const safeInterval = clampInt(intervalMs, 250, 5000);
    const safeMin = clampInt(stepMin, 1, 5000);
    const safeMax = clampInt(stepMax, safeMin, 5000);

    const fmt = new Intl.NumberFormat(locale);

    const unsub = spring.on("change", (latest) => {
      if (!ref.current) return;
      ref.current.textContent = fmt.format(Math.max(0, Math.round(latest)));
    });

    const id = window.setInterval(() => {
      const step = safeMin + Math.floor(Math.random() * (safeMax - safeMin + 1));
      nextValueRef.current += step;
      target.set(nextValueRef.current);
    }, safeInterval);

    return () => {
      unsub();
      window.clearInterval(id);
    };
  }, [intervalMs, locale, spring, start, stepMax, stepMin, target]);

  return (
    <span
      ref={ref}
      className={
        className ??
        "font-sans font-semibold tabular-nums text-slate-700 text-[13px] leading-none"
      }
      aria-label="Live orders processed"
    />
  );
}
