"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { techStack } from "@/lib/data/tech-stack";
import { certifications, education } from "@/lib/data/certifications";

export function CredentialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".cred-item");

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
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
      aria-labelledby="credentials-heading"
      className="bg-brand-bg px-5 py-16 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="credentials-heading" className="sr-only">
          Credentials
        </h2>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Tech Stack */}
          <div className="cred-item lg:col-span-2" style={{ opacity: 0 }}>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
              Tech Stack
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {techStack.map((category) => (
                <div key={category.id}>
                  <h4 className="font-display text-sm font-semibold text-brand-text">
                    {category.title}
                  </h4>
                  {category.description && (
                    <p className="mt-0.5 font-mono text-[10px] text-brand-text-muted">
                      {category.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] ${
                          category.id === "going-deeper"
                            ? "border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary"
                            : "border-brand-accent/20 bg-brand-accent/5 text-brand-accent"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications + Education */}
          <div className="space-y-8">
            {/* Certifications */}
            <div className="cred-item" style={{ opacity: 0 }}>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
                Certifications
              </h3>
              <div className="mt-4 space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="rounded border border-brand-text/8 bg-brand-surface/30 px-3 py-2.5"
                  >
                    <p className="font-body text-sm font-medium text-brand-text">{cert.title}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-brand-text-muted">
                      {cert.issuer} · {cert.issuedDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="cred-item" style={{ opacity: 0 }}>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
                Education
              </h3>
              <div className="mt-4 space-y-3">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded border border-brand-text/8 bg-brand-surface/30 px-3 py-2.5"
                  >
                    <p className="font-body text-sm font-medium text-brand-text">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-brand-text-muted">
                      {edu.institution} · {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
