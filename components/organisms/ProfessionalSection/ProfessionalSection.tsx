"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { experiences, type Experience } from "@/lib/data/experiences";
import { techStack } from "@/lib/data/tech-stack";
import { certifications, education } from "@/lib/data/certifications";

type TabId = "experience" | "tools" | "education";

const TABS: { id: TabId; label: string; ghostText: string; subtitle: string }[] = [
  { id: "experience", label: "Experience", ghostText: "Work", subtitle: "My Journey" },
  { id: "tools", label: "Tools", ghostText: "Stack", subtitle: "What I Use" },
  { id: "education", label: "Education", ghostText: "Learn", subtitle: "Foundation" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function SplitWords({ text, wordClass }: Readonly<{ text: string; wordClass: string }>) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className={`inline-block ${wordClass}`}>
          {word}&nbsp;
        </span>
      ))}
    </>
  );
}

// ─── Experience Entry (with original animations) ─────────────────────────────
function ExperienceEntry({
  exp,
  reducedMotion,
  isLast,
}: {
  exp: Experience;
  reducedMotion: boolean;
  isLast: boolean;
}) {
  const entryRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const entry = entryRef.current;
    if (!entry) return;

    if (reducedMotion) {
      gsap.set(dotRef.current, { opacity: 1, scale: 1 });
      gsap.set(companyRef.current, { clipPath: "none" });
      gsap.set(metaRef.current, { opacity: 1, y: 0 });
      const pills = pillsRef.current?.querySelectorAll(".exp-pill");
      if (pills?.length) gsap.set(pills, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const words = entry.querySelectorAll(`.exp-word-${exp.id}`);
      const pills = pillsRef.current?.querySelectorAll(".exp-pill");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: entry,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.5)" }
      );

      if (!isLast) {
        tl.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 0.9, ease: "power2.inOut" },
          0
        );
      }

      tl.fromTo(
        companyRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "power3.inOut" },
        "-=0.3"
      );

      tl.fromTo(
        metaRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.55"
      );

      if (pills?.length) {
        tl.fromTo(
          pills,
          { scale: 0.72, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.065, duration: 0.38, ease: "back.out(1.6)" },
          "-=0.3"
        );
      }

      if (words.length) {
        tl.fromTo(
          words,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.016, duration: 0.38, ease: "power2.out" },
          "-=0.2"
        );
      }
    }, entry);

    return () => ctx.revert();
  }, [reducedMotion, exp.id, isLast]);

  return (
    <div ref={entryRef} className="relative grid grid-cols-[20px_1fr] gap-x-4 md:gap-x-8">
      <div className="relative flex flex-col items-center pt-2">
        <div
          ref={dotRef}
          className="relative z-10 h-3 w-3 shrink-0 rounded-full bg-brand-accent"
          style={{ opacity: 0 }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-accent opacity-30" />
        </div>
        {!isLast && (
          <div
            ref={lineRef}
            className="mt-2 w-px flex-1 bg-gradient-to-b from-brand-accent/40 to-brand-text/5"
            style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
          />
        )}
      </div>

      <div className="pb-16">
        <span className="font-body text-sm font-bold text-brand-accent">{exp.role}</span>

        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
          <h3
            ref={companyRef}
            className="mt-1 font-display uppercase text-brand-text"
            style={{
              fontSize: "clamp(1.6rem, 3.8vw, 3rem)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            {exp.company}
          </h3>
          <div ref={metaRef} className="mb-1 flex items-center gap-2" style={{ opacity: 0 }}>
            <span className="h-5 w-px bg-brand-accent/60" />
            <span className="font-body text-xs font-bold uppercase tracking-[0.28em] text-brand-text-muted/60">
              {exp.period}
            </span>
          </div>
        </div>

        <article className="mt-4 rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5">
          <ul className="flex flex-col gap-3 list-none">
            {exp.highlights.slice(0, 3).map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-body text-sm leading-relaxed text-brand-text-muted"
              >
                <Check size={14} aria-hidden="true" className="mt-1 shrink-0 text-brand-accent" />
                <span>
                  <SplitWords text={item} wordClass={`exp-word-${exp.id}`} />
                </span>
              </li>
            ))}
          </ul>

          <div ref={pillsRef} className="mt-5 flex flex-wrap gap-2">
            {exp.stack.map((tech) => (
              <span
                key={tech}
                className="exp-pill rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 font-mono text-xs text-brand-accent"
                style={{ opacity: 0 }}
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

// ─── Experience Panel ────────────────────────────────────────────────────────
function ExperiencePanel({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div>
      {experiences.map((exp, i) => (
        <ExperienceEntry
          key={exp.id}
          exp={exp}
          reducedMotion={reducedMotion}
          isLast={i === experiences.length - 1}
        />
      ))}
    </div>
  );
}

// ─── Tools Panel ─────────────────────────────────────────────────────────────
function ToolsPanel() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {techStack.map((category) => (
        <div key={category.id} className="rounded-lg border border-brand-text/10 bg-brand-surface/50 p-5">
          <h3 className="font-display text-lg font-semibold uppercase text-brand-text">
            {category.title}
          </h3>
          {category.description && (
            <p className="mt-1 font-mono text-xs text-brand-text-muted">{category.description}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {category.items.map((item) => (
              <span
                key={item}
                className={`rounded-full border px-3 py-1.5 font-mono text-xs ${
                  category.id === "going-deeper"
                    ? "border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary"
                    : "border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Education Panel ─────────────────────────────────────────────────────────
function EducationPanel() {
  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div>
        <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
          Certifications
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-lg border border-brand-text/10 bg-brand-surface/50 p-4"
            >
              <p className="font-display text-base font-semibold text-brand-text">{cert.title}</p>
              <p className="mt-1 font-mono text-xs text-brand-accent">{cert.issuer}</p>
              <p className="mt-2 font-mono text-xs text-brand-text-muted">{cert.issuedDate}</p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-mono text-xs text-brand-accent hover:underline"
                >
                  View credential →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Degrees */}
      <div>
        <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
          Degrees
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="rounded-lg border border-brand-text/10 bg-brand-surface/50 p-4"
            >
              <p className="font-display text-base font-semibold text-brand-text">
                {edu.degree} in {edu.field}
              </p>
              <p className="mt-1 font-body text-sm text-brand-accent">{edu.institution}</p>
              <p className="mt-1 font-mono text-xs text-brand-text-muted">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function ProfessionalSection() {
  const [activeTab, setActiveTab] = useState<TabId>("experience");
  const sectionRef = useRef<HTMLElement>(null);
  const ghostTextRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const currentTab = TABS.find((t) => t.id === activeTab)!;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      // Ghost text parallax
      gsap.to(ghostTextRef.current, {
        y: -180,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      // Eyebrow fade in
      gsap.fromTo(
        eyebrowRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const renderPanel = () => {
    switch (activeTab) {
      case "experience":
        return <ExperiencePanel reducedMotion={reducedMotion} />;
      case "tools":
        return <ToolsPanel />;
      case "education":
        return <EducationPanel />;
      default:
        return null;
    }
  };

  return (
    <section
      id="professional"
      ref={sectionRef}
      aria-labelledby="professional-heading"
      className="relative overflow-x-clip bg-brand-bg"
    >
      <h2 id="professional-heading" className="sr-only">
        Professional Background
      </h2>

      <div className="flex">
        {/* ── Left sticky panel ───────────────────────────────────────────── */}
        <div className="hidden sticky top-0 lg:flex h-screen w-[40%] shrink-0 flex-col justify-center overflow-hidden pl-14">
          {/* Tabs */}
          <div
            ref={eyebrowRef}
            className="mb-6 flex gap-1"
            role="tablist"
            aria-label="Professional sections"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider transition ${
                  activeTab === tab.id
                    ? "bg-brand-accent text-brand-bg"
                    : "bg-brand-surface/50 text-brand-text-muted hover:bg-brand-surface hover:text-brand-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Ghost text — changes per tab */}
          <div className="relative -ml-2 select-none overflow-hidden">
            <span
              ref={ghostTextRef}
              className="block font-display uppercase leading-none text-brand-text transition-opacity duration-300"
              aria-hidden
              style={{
                fontSize: "clamp(6rem, 18vw, 19rem)",
                letterSpacing: "-0.05em",
                opacity: 0.035,
              }}
            >
              {currentTab.ghostText}
            </span>
          </div>

          {/* Subtitle */}
          <div className="mt-10 flex items-center gap-3" style={{ opacity: 0.25 }}>
            <div className="h-px w-8 bg-brand-text" />
            <p
              className="font-display uppercase text-brand-text transition-opacity duration-300"
              style={{
                fontSize: "clamp(0.9rem, 1.6vw, 1.4rem)",
                lineHeight: 1.3,
                letterSpacing: "-0.03em",
                opacity: 0.55,
              }}
            >
              {currentTab.subtitle}
            </p>
          </div>
        </div>

        {/* ── Right scrollable panel ───────────────────────────────────────── */}
        <div className="min-h-screen flex-1 px-6 py-[10vh] md:py-[15vh] md:pl-0 md:pr-14">
          {/* Mobile-only tabs and heading */}
          <div className="mb-8 lg:hidden">
            <div className="mb-4 flex flex-wrap gap-2" role="tablist">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider transition ${
                    activeTab === tab.id
                      ? "bg-brand-accent text-brand-bg"
                      : "bg-brand-surface/50 text-brand-text-muted"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <p
              className="font-display uppercase leading-none text-brand-text/5 select-none"
              aria-hidden
              style={{ fontSize: "clamp(4rem, 18vw, 8rem)", letterSpacing: "-0.05em" }}
            >
              {currentTab.ghostText}
            </p>
          </div>

          <div className="max-w-3xl">{renderPanel()}</div>
        </div>
      </div>

      {/* Rotated edge label */}
      <div
        className="pointer-events-none absolute bottom-16 right-6 hidden -rotate-90 lg:block"
        aria-hidden
      >
        <span className="font-body text-[0.6rem] uppercase tracking-[0.45em] text-brand-text/15">
          Background
        </span>
      </div>
    </section>
  );
}
