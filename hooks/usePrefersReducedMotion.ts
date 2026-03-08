"use client";

import { useState, useEffect } from "react";

/**
 * Returns whether the user prefers reduced motion (system/OS setting).
 * Use to skip or shorten animations when true.
 */
export function usePrefersReducedMotion(): boolean {
  // Lazy initializer reads the media query once on mount (avoids a synchronous
  // setState inside an effect, which the react-hooks/set-state-in-effect rule flags).
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Only listen for future OS-level changes — no synchronous setState here.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setPrefersReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
