
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Check } from "lucide-react";

// ─── data ─────────────────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    id: "supernomics",
    company: "Supernomics",
    role: "Frontend & Mobile Engineer",
    period: "Jan 2026 – Present",
    stack: ["React.js", "React Native", "Tailwind CSS", "Expo", "Monorepos"],
    highlights: [
      "Worked with monorepos to build scalable AI systems.",
      "Created a mobile app using Expo and React Native.",
      "Built a component library to improve developer experience.",
      "Translated Figma designs for web and mobile and integrated APIs.",
    ],
  },
  {
    id: "nesti",
    company: "Nesti",
    role: "Mobile Engineer",
    period: "Aug 2025 – Jan 2026",
    stack: ["React Native", "Alipay Mini App", "Figma", "API Integration"],
    highlights: [
      "Pixel-perfect Figma to UI conversion across the product.",
      "Created a full Alipay mini app shipped to production."
      ,
      "Seamless API integration across the mobile product.",
    ],
  },
  {
    id: "leja",
    company: "Leja",
    role: "Frontend Engineer",
    period: "Jul 2024 – Oct 2025",
    stack: ["React.js", "Next.js", "MUI", "Ant Design", "SEO"],
    highlights: [
      "Improved retention with faster load times via SSR (Next.js).",
      "Drove sales growth by building a Safaricom mini app with Ant Design Mini and API integrations.",
      "Increased engagement by turning Figma designs into clean, responsive UIs (React, MUI).",
      "Secured platforms with best-practice frontend security (XSS, CSRF protection).",
      "Boosted SEO performance through server-side rendering and optimized metadata.",
    ],
  },
  {
    id: "oaknet",
    company: "Oaknet Business",
    role: "Frontend Engineer",
    period: "2023 – 2024",
    stack: ["Vue3.js", "Pinia", "GraphQL", "JavaScript"],
    highlights: [
      "Transformed designs into dynamic UIs with JavaScript and React JS workflows.",
      "Led UI development for a SaaS M&E system, collaborating with backend teams.",
      "Enhanced user experience in an investment appraisal system.",
      "Spearheaded UI creation using Vue3.js, delivering visually engaging designs.",
      "Optimized state management with Pinia and API integration via GraphQL.",
    ],
  },
  {
    id: "pathology",
    company: "Pathology Network",
    role: "Frontend Developer",
    period: "May 2023 – May 2024",
    stack: ["React.js", "TailwindCSS", "React Query", "Material UI"],
    highlights: [
      "Translated Figma designs to seamless apps using React.js, TailwindCSS, and Material UI.",
      "Reduced dev time by 30% and boosted team efficiency by 20% through reusable components.",
      "Leveraged React tools to enhance app speed, scalability, and security.",
      "Streamlined Agile workflows, ensuring timely delivery of high-quality features.",
      "Worked closely with cross-functional teams to achieve project goals.",
    ],
  },
] as const;

// ─── helpers ──────────────────────────────────────────────────────────────────

function SplitWords({ text, wordClass }: { text: string; wordClass: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block">
          <span className={`inline-block ${wordClass}`}>{word}</span>
          {" "}
        </span>
      ))}
    </>
  );
}

// ─── single entry ─────────────────────────────────────────────────────────────

function ExperienceEntry({
  exp,
  reducedMotion,
  isLast,
}: {
  exp: (typeof EXPERIENCES)[number];
  reducedMotion: boolean;
  isLast: boolean;
}) {
  const entryRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const entry = entryRef.current;
    if (!entry) return;

    const ctx = gsap.context(() => {
      const words = entry.querySelectorAll(`.exp-word-${exp.id}`);
      const pills = pillsRef.current?.querySelectorAll(".exp-pill");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: entry,
          start: "top 78%",
          once: true,
        },
      });

      // 1. Timeline dot pops in
      tl.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.5)" }
      );

      // 2. Vertical line draws downward
      if (!isLast) {
        tl.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 0.9, ease: "power2.inOut" },
          0
        );
      }

      // 3. Company name — horizontal clip wipe
      tl.fromTo(
        companyRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "power3.inOut" },
        "-=0.3"
      );

      // 4. Role / period block rises up
      tl.fromTo(
        metaRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.55"
      );

      // 5. Stack pills pop in with stagger
      if (pills?.length) {
        tl.fromTo(
          pills,
          { scale: 0.72, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.065,
            duration: 0.38,
            ease: "back.out(1.6)",
          },
          "-=0.3"
        );
      }

      // 6. Highlight words trickle in
      if (words.length) {
        tl.fromTo(
          words,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.016,
            duration: 0.38,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    }, entry);

    return () => ctx.revert();
  }, [reducedMotion, exp.id, isLast]);

  return (
    <div ref={entryRef} className="relative grid grid-cols-[20px_1fr] gap-x-8">
      {/* ── Timeline column ───────────────────────────── */}
      <div className="relative flex flex-col items-center pt-2">
        {/* Dot */}
        <div
          ref={dotRef}
          className="relative z-10 h-3 w-3 shrink-0 rounded-full bg-brand-accent"
          style={{ opacity: 0 }}
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-accent opacity-30" />
        </div>

        {/* Connecting line */}
        {!isLast && (
          <div
            ref={lineRef}
            className="mt-2 w-px flex-1 bg-linear-to-b from-brand-accent/40 to-brand-text/5"
            style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
          />
        )}
      </div>

      {/* ── Content column ────────────────────────────── */}
     
      <div className="pb-24">
       <div className="flex gap-1">
        
      </div>
        <span className="font-body text-sm font-bold text-brand-accent">
            {exp.role}
          </span>
     

     <div className=" flex gap-3">
        <h3
          ref={companyRef}
          className="mt-1 font-display uppercase text-brand-text whitespace-nowrap"
          style={{
            fontSize: "clamp(2rem, 3.8vw, 4.2rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            clipPath: "inset(0 100% 0 0)",
          }}
        >
          {exp.company}
        </h3>

        {/* Role */}
        <div ref={metaRef} className="mt-3 flex items-center gap-2" style={{ opacity: 0 }}>
          <span className="w-px h-5 bg-brand-accent/60" />
        
           <span className="font-body text-xs font-bold uppercase tracking-[0.28em] text-brand-text-muted/60 whitespace-nowrap">
          {exp.period}
        </span>
        </div>
        </div>

        {/* Tech stack pills */}
     

        {/* Highlight bullets */}
        <ul ref={listRef} className="mt-6 flex flex-col gap-3 list-disc">
          {exp.highlights.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 font-body text-base leading-relaxed text-brand-text-muted "
            >
            <Check size={14} className="text-brand-text-muted"/>
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
              className="exp-pill rounded-full border border-brand-text/12 bg-accent px-3 py-1 font-body text-[0.68rem] uppercase tracking-wider text-black font-bold"
              style={{ opacity: 0 }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── section ──────────────────────────────────────────────────────────────────

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const workTextRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Eyebrow fades in when section enters view
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

      // Large "WORK" text drifts upward (parallax) as user scrolls through
      gsap.to(workTextRef.current, {
        y: -180,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-x-clip bg-brand-bg">
  

      <div className="flex">
        {/* ── Left sticky panel ───────────────────────────────────────────── */}
        <div className="sticky top-0 flex h-screen w-[40%] shrink-0 flex-col justify-center overflow-hidden pl-14">
          {/* Eyebrow */}
          <span
            ref={eyebrowRef}
            className="mb-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.32em] text-brand-text-muted"
            style={{ opacity: 0 }}
          >
            Experience
          </span>

          {/* Ghost "WORK" — very large, faint, parallax */}
          <div className="relative -ml-2 select-none overflow-hidden">
            <span
              ref={workTextRef}
              className="block font-display uppercase leading-none text-brand-text"
              aria-hidden
              style={{
                fontSize: "clamp(6rem, 18vw, 19rem)",
                letterSpacing: "-0.05em",
                opacity: 0.035,
              }}
            >

              Work
             
            </span>

            {/* Foreground text sitting on top of ghost */}
           
          </div>

          {/* Scroll hint */}
          <div className="mt-10 flex items-center gap-3" style={{ opacity: 0.25 }}>
            <div className="h-px w-8 bg-brand-text" />
             <div className="pointer-events-none  flex flex-col justify-center pl-1">
              <p
                className="font-display uppercase text-brand-text"
                style={{
                  fontSize: "clamp(0.9rem, 1.6vw, 1.4rem)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.03em",
                  opacity: 0.55,
                }}
              >
                My Journey
              </p>
            </div>
          </div>
        </div>

        {/* ── Right scrollable panel ───────────────────────────────────────── */}
        <div className="min-h-screen flex-1 py-[15vh] pr-14">
          <div className="max-w-lg">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceEntry
                key={exp.id}
                exp={exp}
                reducedMotion={reducedMotion}
                isLast={i === EXPERIENCES.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Rotated edge label */}
      <div
        className="pointer-events-none absolute bottom-16 right-6 hidden -rotate-90 lg:block"
        aria-hidden
      >
        <span className="font-body text-[0.5rem] uppercase tracking-[0.45em] text-brand-text/15">
          Featured work
        </span>
      </div>
    </section>
  );
}
