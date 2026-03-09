"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

const HEADLINE = "Architecting High-Performance Frontends.";
const EYEBROW = "Hi, I'm Winfred.";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion) return;

    // ── Entrance timeline ─────────────────────────────────────────
    const tl = gsap.timeline();

    // 1. Flower spins in from top-left — Z rotation + opacity
  tl.fromTo(
  flowerRef.current,
  { rotation: -180, opacity: 0, scale: 0.7 },
  { rotation: 0, opacity: 1, scale: 1, duration: 2.5, ease: "power3.out" }
);

    // 2. Eyebrow fades up alongside the tail of the flower spin
    tl.fromTo(
      eyebrowRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.55"
    );

    // 3. Headline slides in from left
    tl.fromTo(
      headlineRef.current,
      { x: -72, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
      "-=0.3"
    );

    // 4. Subtitle fades up
    tl.fromTo(
      subtitleRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.35"
    );

    // 5. Location line
    tl.fromTo(
      locationRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      "-=0.25"
    );

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-brand-bg"
    >
      {/*
       * Flower — 100×100px, fully visible at top-left below the navbar.
       * Spins in on load (GSAP rotation), zooms out on scroll (ScrollTrigger).
       * z-20 so it sits in front of the Three.js canvas and text layers.
       */}
      <div
        ref={flowerRef}
        className="absolute left-6 top-22 z-20 h-[100px] w-[100px] pointer-events-none opacity-0"
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src="/image/flower.jpg"
          alt=""
          width={150}
          height={150}
          className="h-full w-full rounded-sm object-cover"
          priority
        />
      </div>

      {/* Three.js canvas — 3D crystal at bottom-right */}
      <Scene />

      {/* Centered text block */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="flex max-w-[58vw] flex-col items-center gap-5">

          <span
            ref={eyebrowRef}
            className="font-body text-xl font-bold uppercase tracking-widest text-brand-accent"
          >
            {EYEBROW}
          </span>

          {/* Headline slides in as a whole from the left */}
          <h1
            ref={headlineRef}
            className="font-display text-brand-text"
            style={{
              fontSize: "var(--font-size-display)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
            }}
          >
            {HEADLINE}
          </h1>

          <p
            ref={subtitleRef}
            className="max-w-sm font-body text-brand-text-muted"
            style={{
              fontSize: "var(--font-size-body)",
              lineHeight: "var(--leading-body)",
            }}
          >
            Frontend Engineer crafting immersive digital experiences.
          </p>

          <div ref={locationRef}>
            <p className="font-body text-xs uppercase tracking-widest text-brand-text-muted/50">
              Based in Nairobi &middot; Available for work
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
