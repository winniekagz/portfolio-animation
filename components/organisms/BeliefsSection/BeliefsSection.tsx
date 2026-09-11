"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { beliefs, beliefDoodles } from "@/lib/data/beliefs";
import { StickyNote } from "./StickyNote";
import { cn } from "@/lib/utils";

// Desktop composition: bolder rotations and scattered positions like reference
const noteComposition = [
  { gridArea: "1 / 2 / 2 / 3", rotation: -4, offsetX: 20, offsetY: -12, scale: 1, width: "max-w-[280px]", align: "self-start justify-self-end" },
  { gridArea: "2 / 1 / 3 / 2", rotation: 5, offsetX: -16, offsetY: 20, scale: 0.95, width: "max-w-[320px]", align: "self-start justify-self-start" },
  { gridArea: "2 / 3 / 3 / 4", rotation: -2, offsetX: 12, offsetY: 8, scale: 1.02, width: "max-w-[300px]", align: "self-start justify-self-end" },
  { gridArea: "3 / 2 / 4 / 3", rotation: 3, offsetX: -24, offsetY: -10, scale: 0.98, width: "max-w-[260px]", align: "self-start justify-self-center" },
  { gridArea: "3 / 3 / 4 / 4", rotation: -6, offsetX: -20, offsetY: 16, scale: 1, width: "max-w-[280px]", align: "self-center justify-self-end" },
  { gridArea: "4 / 1 / 5 / 2", rotation: 2, offsetX: 14, offsetY: -8, scale: 1.01, width: "max-w-[300px]", align: "self-start justify-self-start" },
  { gridArea: "4 / 3 / 5 / 4", rotation: -3, offsetX: 18, offsetY: 12, scale: 0.96, width: "max-w-[260px]", align: "self-end justify-self-end" },
  { gridArea: "5 / 2 / 6 / 3", rotation: 5, offsetX: -10, offsetY: -16, scale: 0.97, width: "max-w-[240px]", align: "self-center justify-self-center" },
];

// Entrance animation offsets - dramatic varied directions
const entranceOffsets = [
  { x: -20, y: 30 },
  { x: 25, y: -20 },
  { x: -10, y: 35 },
  { x: -30, y: 15 },
  { x: 20, y: -25 },
  { x: -15, y: 25 },
  { x: 28, y: 10 },
  { x: 0, y: -30 },
];

// Floating decorative icons (tech stack vibes)
const floatingIcons = [
  { icon: "⚛", top: "12%", left: "8%", rotation: 12, size: "text-2xl" },
  { icon: "▲", top: "18%", right: "15%", rotation: -8, size: "text-xl" },
  { icon: "◆", top: "45%", left: "3%", rotation: 20, size: "text-lg" },
  { icon: "●", top: "55%", right: "5%", rotation: -15, size: "text-xl" },
  { icon: "◇", bottom: "25%", left: "10%", rotation: 8, size: "text-2xl" },
  { icon: "▢", bottom: "15%", right: "12%", rotation: -12, size: "text-lg" },
];

// Mobile: alternating alignment
const mobileAlignments = [
  "self-start", // left
  "self-end",   // right
  "self-center",
  "self-end",
  "self-start",
  "self-center",
  "self-end",
  "self-center",
];

// Doodle positions for desktop
const doodlePositions = [
  { top: "8%", right: "12%", rotation: -5 },   // rabbit hole
  { top: "28%", left: "8%", rotation: 3 },     // hmm
  { top: "48%", right: "8%", rotation: -2 },   // ?
  { top: "68%", left: "5%", rotation: 0 },     // ····→
  { bottom: "8%", left: "45%", rotation: 5 },  // ↪
];

export function BeliefsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const notes = section.querySelectorAll(".belief-note");
    const doodles = section.querySelectorAll(".belief-doodle");
    const icons = section.querySelectorAll(".floating-icon");

    if (reducedMotion) {
      gsap.set(notes, { opacity: 1 });
      gsap.set(doodles, { opacity: 1 });
      gsap.set(icons, { opacity: 0.2 });
      return;
    }

    const ctx = gsap.context(() => {
      // Animate notes settling in from varied directions
      gsap.fromTo(
        notes,
        { 
          x: (i) => entranceOffsets[i]?.x || 0,
          y: (i) => entranceOffsets[i]?.y || 12, 
          opacity: 0,
          scale: (i) => (noteComposition[i]?.scale || 1) * 0.95,
          rotation: (i) => (noteComposition[i]?.rotation || 0) - 3,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: (i) => noteComposition[i]?.scale || 1,
          rotation: (i) => noteComposition[i]?.rotation || 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Animate doodles with slight delay
      gsap.fromTo(
        doodles,
        { opacity: 0 },
        {
          opacity: 0.5,
          stagger: 0.1,
          duration: 0.3,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Animate floating icons with gentle float
      gsap.fromTo(
        icons,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.2,
          scale: 1,
          stagger: 0.15,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="beliefs-heading"
      className="relative bg-brand-bg px-5 py-20 sm:px-8 md:px-12 md:py-24 lg:px-16 lg:py-32 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section title */}
        <h2
          id="beliefs-heading"
          className="font-display text-xl font-semibold uppercase tracking-wider text-brand-text md:text-2xl mb-12 md:mb-16"
        >
          Notes to Myself
        </h2>

        {/* Mobile layout: stacked with alternating alignment */}
        <div className="flex flex-col gap-5 md:hidden">
          {beliefs.map((belief, index) => (
            <div
              key={belief.id}
              className={cn("w-full max-w-70", mobileAlignments[index])}
            >
              <StickyNote
                belief={belief}
                rotation={noteComposition[index]?.rotation || 0}
                className="belief-note w-full"
                style={{ opacity: reducedMotion ? 1 : 0 }}
                showRelated
              />
            </div>
          ))}
          
          {/* Mobile doodles - sparse */}
          <span
            className="belief-doodle font-mono text-xs text-brand-text-muted/50 self-start ml-4 -mt-2"
            aria-hidden="true"
            style={{ opacity: reducedMotion ? 0.5 : 0 }}
          >
            // hmm
          </span>
        </div>

        {/* Desktop layout: scattered grid composition */}
        <div
          className="hidden md:grid relative"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto auto auto auto",
            gap: "24px 32px",
            minHeight: "900px",
          }}
        >
          {beliefs.map((belief, index) => {
            const comp = noteComposition[index];
            return (
              <div
                key={belief.id}
                className={cn(comp?.align, comp?.width)}
                style={{ gridArea: comp?.gridArea }}
              >
                <StickyNote
                  belief={belief}
                  rotation={comp?.rotation || 0}
                  className="belief-note"
                  style={{ 
                    opacity: reducedMotion ? 1 : 0,
                    "--offset-x": `${comp?.offsetX || 0}px`,
                    "--offset-y": `${comp?.offsetY || 0}px`,
                    "--scale": `${comp?.scale || 1}`,
                  } as React.CSSProperties}
                  showRelated
                />
              </div>
            );
          })}

          {/* Doodles scattered around */}
          {beliefDoodles.map((doodle, index) => {
            const pos = doodlePositions[index];
            return (
              <span
                key={doodle.id}
                className="belief-doodle absolute font-mono text-xs text-brand-text-muted/50 pointer-events-none select-none"
                aria-hidden="true"
                style={{
                  ...pos,
                  transform: `rotate(${pos?.rotation || 0}deg)`,
                  opacity: reducedMotion ? 0.5 : 0,
                }}
              >
                {doodle.text}
              </span>
            );
          })}

          {/* Floating decorative icons */}
          {floatingIcons.map((item, index) => (
            <span
              key={index}
              className={cn(
                "floating-icon absolute pointer-events-none select-none text-brand-accent/20",
                item.size
              )}
              aria-hidden="true"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
                transform: `rotate(${item.rotation}deg)`,
                opacity: reducedMotion ? 0.2 : 0,
              }}
            >
              {item.icon}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
