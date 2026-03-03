"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap";
import { services } from "@/lib/data/services";
import { SectionTitle } from "@/components/molecules/SectionTitle";
import { ServiceCard } from "@/components/molecules/ServiceCard";

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || cards.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-bg px-6 py-20 md:px-8 lg:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title={<span id="services-heading">What we do</span>}
          subtitle="Strategy, design, and motion for brands and products."
          className="text-center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
