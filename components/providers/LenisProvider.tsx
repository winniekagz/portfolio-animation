"use client";

/**
 * LenisProvider — initialises Lenis smooth scroll and wires it into GSAP's
 * ticker so all existing ScrollTrigger animations run against the virtual
 * scroll position instead of the raw browser scroll.
 *
 * How it works:
 *   1. Lenis intercepts wheel / touch events and produces a smooth virtual
 *      scroll value instead of the browser's default jump.
 *   2. `lenis.on("scroll", ScrollTrigger.update)` tells ScrollTrigger to
 *      re-evaluate its triggers on every Lenis scroll tick.
 *   3. `gsap.ticker.add(rafFn)` drives Lenis from GSAP's own requestAnimationFrame
 *      loop so both systems share a single frame budget.
 *   4. `gsap.ticker.lagSmoothing(0)` prevents GSAP from artificially capping
 *      the delta when the tab was backgrounded, which would cause a scroll jump.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });

    // Keep ScrollTrigger in sync with every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's RAF — single frame budget for both systems
    const rafFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
