"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroContent } from "@/components/molecules/HeroContent";
import { ScrollIndicator } from "@/components/molecules/ScrollIndicator";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-brand-bg px-8 py-20">
      <Scene />
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center gap-6 text-center"
      >
        <HeroContent />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
