"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DESKTOP_BREAKPOINT_PX,
  attachDesktopOnlyResize,
  createPinnedScrubTimeline,
  isDesktopViewport,
  prefersReducedMotion,
} from "@/lib/gsap";

/**
 * GSAP + ScrollTrigger timeline for the first (pinned) section:
 *
 * 1. ScrollTrigger pins the section when its top hits the viewport top.
 * 2. Pin lasts for 100% of viewport height of scroll (end: "+=100%").
 * 3. A timeline runs: content animates from opacity 0 / y 24 → opacity 1 / y 0.
 * 4. scrub: true ties timeline progress to scroll position (scroll-driven, not time-driven).
 * 5. Desktop only (≥1024px); prefers-reduced-motion disables the effect.
 * 6. On unmount we kill only this instance's ScrollTrigger (cleanup).
 */
export function ScrollPanel({
  children,
  pinAndScrub = false,
}: {
  children?: ReactNode;
  pinAndScrub?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinAndScrub || typeof window === "undefined") return;

    const content = contentRef.current;
    if (!content) return;

    if (prefersReducedMotion()) return;

    let st: ScrollTrigger | null = null;

    function setup() {
      if (!isDesktopViewport()) return;
      const section = sectionRef.current;
      if (!section) return;

      const tl = createPinnedScrubTimeline({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
      });
      tl.fromTo(content, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 });
      st = tl.scrollTrigger ?? null;
    }

    function teardown() {
      if (st) {
        st.kill();
        st = null;
      }
    }

    setup();

    const cleanupResize = attachDesktopOnlyResize(
      DESKTOP_BREAKPOINT_PX,
      setup,
      teardown,
      () => st !== null
    );

    return () => {
      cleanupResize();
      teardown();
    };
  }, [pinAndScrub]);

  return (
    <section ref={sectionRef}>
      <div ref={contentRef}>{children}</div>
    </section>
  );
}
