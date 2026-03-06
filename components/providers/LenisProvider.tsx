"use client";

/**
 * LenisProvider — initialises Lenis smooth scroll and wires it into GSAP's
 * ticker so all existing ScrollTrigger animations run against the virtual
 * scroll position instead of the raw browser scroll.
 *
 * On every route change we:
 *   - scroll to top (new page should start at 0)
 *   - call lenis.resize() so Lenis recalculates the new page's scroll height
 *   - call ScrollTrigger.refresh() so GSAP recalculates all trigger positions
 * Without this, Lenis keeps the scroll bounds from the previous page and the
 * new page feels locked or has wrong scroll behaviour.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // ── Init Lenis once ────────────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const rafFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── Refresh on every route change ─────────────────────────────────────────
  // Wait two frames: one for React to commit the new page DOM, one for the
  // page-transition animation to begin. Then recalculate scroll bounds.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
