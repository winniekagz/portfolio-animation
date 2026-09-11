"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { rabbitHoles, categoryColors } from "@/lib/data/thought-graph";
import { ThoughtGraph } from "./ThoughtGraph";
import { ThoughtTree } from "./ThoughtTree";

export function MeetMyBrainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedHole, setSelectedHole] = useState(rabbitHoles[0].id);
  const reducedMotion = usePrefersReducedMotion();

  const currentHole = rabbitHoles.find((h) => h.id === selectedHole) || rabbitHoles[0];

  // Animate header on scroll into view
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    if (reducedMotion) {
      gsap.set(header.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="meet-my-brain"
      ref={sectionRef}
      aria-labelledby="brain-heading"
      className="relative min-h-[90vh] bg-brand-bg px-5 py-16 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 30%, rgba(224, 168, 198, 0.04) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div ref={headerRef} className="mb-10 text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
            Pick a problem
          </p>

          <h2
            id="brain-heading"
            className="mt-3 font-display text-2xl font-semibold tracking-tight text-brand-text md:text-3xl lg:text-4xl"
          >
            One question is never enough
          </h2>

          <p className="mx-auto mt-4 max-w-xl font-body text-base text-brand-text-muted md:text-lg">
            Select a problem below and see how my thinking escalates.
          </p>
        </div>

        {/* Problem Selector Tabs */}
        <div className="mb-8">
          <div
            className="flex flex-wrap justify-center gap-2 md:gap-3"
            role="tablist"
            aria-label="Select a problem to explore"
          >
            {rabbitHoles.map((hole) => {
              const colors = categoryColors[hole.category] || categoryColors.ui;
              const isSelected = selectedHole === hole.id;

              return (
                <button
                  key={hole.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedHole(hole.id)}
                  className={`
                    group relative rounded-full px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider
                    transition-all duration-200
                    ${
                      isSelected
                        ? `${colors.bg} ${colors.border} border-2 ${colors.text}`
                        : "border border-brand-text/15 text-brand-text-muted hover:border-brand-text/30 hover:text-brand-text"
                    }
                  `}
                >
                  <span className="relative z-10">{hole.shortLabel}</span>
                  {isSelected && (
                    <span
                      className="absolute inset-0 rounded-full opacity-20"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, currentColor 0%, transparent 70%)`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Problem Context */}
        <div className="mb-6 text-center">
          <p className="font-body text-lg italic text-brand-text md:text-xl">
            &ldquo;{currentHole.question}&rdquo;
          </p>
          <p className="mt-2 font-mono text-xs text-brand-text-muted">
            {currentHole.description}
          </p>
        </div>

        {/* Desktop: Spatial graph */}
        <div className="hidden md:block">
          <ThoughtGraph selectedRabbitHole={selectedHole} />
        </div>

        {/* Mobile: Tree view */}
        <div className="block md:hidden">
          <ThoughtTree selectedRabbitHole={selectedHole} />
        </div>

        {/* Footer insight */}
        <p className="mt-10 text-center font-mono text-xs italic text-brand-text-muted/60">
          &ldquo;She sees the relationship between the interface and the system underneath it.&rdquo;
        </p>
      </div>
    </section>
  );
}
