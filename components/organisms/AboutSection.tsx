"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Globe, Mail, Users, GitFork } from "lucide-react";

// ─── copy ────────────────────────────────────────────────────────────────────
const HEADLINE = "I Deliver Exceptional User Experiences Across Various Platforms.";
const BIO =
  "As a Frontend Engineer with four years of experience, I've consistently poured my heart and soul into creating products that not only look great but feel amazing to use. Currently, I work as a Senior Engineer crafting immersive digital experiences.";
const SOCIAL = [
  { Icon: GitFork, label: "GitHub", href: "https://github.com/winniekagz" },
  { Icon: Globe, label: "Website", href: "#" },
  { Icon: Users, label: "LinkedIn", href: "https://linkedin.com/in/winfred-kagendo-3b099220b/" },
  { Icon: Mail, label: "Email", href: "mailto:winniekagendo35@gmail.com" },
];


function WordSplit({
  text,
  wordClassName = "",
}: {
  text: string;
  wordClassName?: string;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block">
          <span className={`inline-block ${wordClassName}`}>{word}</span>
          &nbsp;
        </span>
      ))}
    </>
  );
}

// ─── component ───────────────────────────────────────────────────────────────
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const cardPhotoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // ── Reduced-motion: skip animation, immediately show all hidden elements ──
    if (reducedMotion) {
      gsap.set(bgRef.current, { opacity: 1 });
      gsap.set(photoRef.current, { opacity: 0 });
      gsap.set(cardPhotoRef.current, { opacity: 1 });
      gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
      gsap.set(headlineRef.current, { opacity: 1, x: 0 });
      gsap.set(rightRef.current, { opacity: 1, y: 0 });
      gsap.set(iconsRef.current, { opacity: 1, y: 0 });
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const headlineWords = section.querySelectorAll<HTMLElement>(".aw-word");
    const bioWords = section.querySelectorAll<HTMLElement>(".bio-word");
    const nameWords = section.querySelectorAll<HTMLElement>(".name-word");

    // ── Mobile clip-path target matches mobile card position ────────────────
    // Mobile card: top 5%, left 10%, width 80%, height 45%
    // → inset(top right bottom left) = inset(5% 10% 50% 10%)
    const clipTarget = isMobile
      ? "inset(5% 10% 50% 10% round 22px)"
      : "inset(25% 37% 25% 33% round 22px)";

    const ctx = gsap.context(() => {
      if (isMobile) {
        // ── Mobile: simple scroll-triggered fade-in, no pin ─────────────────
        gsap.set(bgRef.current, { opacity: 1 });
        gsap.set(photoRef.current, { opacity: 0 });

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        mobileTl
          .to(cardPhotoRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" })
          .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.35 }, "-=0.3")
          .to(headlineRef.current, { opacity: 1, x: 0, duration: 0.45 }, "-=0.2")
          .to(headlineWords, { opacity: 1, y: 0, stagger: 0.04, duration: 0.4, ease: "power2.out" }, "-=0.35")
          .to(rightRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.3")
          .to(nameWords, { opacity: 1, y: 0, stagger: 0.07, duration: 0.35, ease: "power2.out" }, "-=0.3")
          .to(bioWords, { opacity: 1, y: 0, stagger: 0.015, duration: 0.25 }, "-=0.25")
          .to(iconsRef.current, { opacity: 1, y: 0, duration: 0.35 }, "-=0.2");

        return;
      }

      // ── Desktop: full pinned scroll animation ────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          pinType: "transform",
          scrub: 1.8,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        photoRef.current,
        { clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 },
        { clipPath: clipTarget, opacity: 0, duration: 1, ease: "power2.inOut" },
        0
      );
      tl.fromTo(
        cardPhotoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" },
        0
      );
      tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.15);
      tl.fromTo(
        eyebrowRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 },
        0.5
      );
      tl.fromTo(
        headlineRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45 },
        0.52
      );
      if (headlineWords.length) {
        tl.fromTo(
          headlineWords,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.045, duration: 0.5, ease: "power2.out" },
          0.55
        );
      }
      tl.fromTo(
        rightRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.6
      );
      if (nameWords.length) {
        tl.fromTo(
          nameWords,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" },
          0.65
        );
      }
      if (bioWords.length) {
        tl.fromTo(
          bioWords,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.018, duration: 0.3 },
          0.75
        );
      }
      tl.fromTo(
        iconsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.88
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen md:h-screen overflow-hidden bg-brand-bg"
    >
      {/* ── Brand-bg overlay ─────────────────────────────────────────────────── */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-10 bg-brand-bg"
        style={{ opacity: 0 }}
      />

      {/* ── Full-viewport cover — clips + fades out (desktop) ──────────────── */}
      <div
        ref={photoRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
        aria-hidden
      >
        <Image
          src="/image/winfred.jpeg"
          alt=""
          fill
          className="object-cover grayscale"
          style={{ objectPosition: "center 20%" }}
          priority
        />
      </div>

      {/* ── Card portrait — responsive position ────────────────────────────── */}
      {/* Mobile: centered top 5%, 80% wide. Desktop: centred column 33%/30%/50% */}
      <div
        ref={cardPhotoRef}
        className={[
          "absolute z-21 pointer-events-none bg-brand-bg",
          /* mobile */  "top-[5%] left-[10%] w-[80%] h-[45%]",
          /* desktop */ "md:top-[25%] md:left-[33%] md:w-[30%] md:h-[50%]",
        ].join(" ")}
        style={{ opacity: 0, clipPath: "inset(0% 0% 0% 0% round 22px)", borderRadius: "8px" }}
        aria-hidden
      >
        <Image
          src="/image/winfred.jpeg"
          alt="Winfred Kagendo portrait"
          fill
          className="object-contain grayscale rounded-lg"
          style={{ objectPosition: "center top" }}
        />
      </div>

      {/* ── 3-D decoration — desktop only ──────────────────────────────────── */}
      <div className="hidden lg:block absolute right-8 top-6 z-30 h-28 w-28 pointer-events-none select-none">
        <Image src="/image/3d.png" alt="" width={56} height={56} className="object-contain" />
      </div>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div className="relative z-30 flex h-full flex-col gap-6 px-6 pt-6 pb-12 md:flex-row md:items-center md:gap-10 md:px-14 md:pt-0 md:pb-0">

        {/* Mobile spacer — pushes text below the card photo */}
        <div className="block h-[48vh] shrink-0 md:hidden" aria-hidden />

        {/* LEFT — eyebrow + headline */}
        <div className="flex w-full md:w-[26%] md:shrink-0 flex-col gap-5">
          <span
            ref={eyebrowRef}
            className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-brand-text-muted"
            style={{ opacity: 0 }}
          >
            About Me
          </span>

          <div ref={headlineRef} style={{ opacity: 0 }}>
            <h2
              className="font-display uppercase text-brand-text"
              style={{
                fontSize: "clamp(1.9rem, 3.2vw, 3.8rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.01em",
              }}
            >
              <WordSplit text={HEADLINE} wordClassName="aw-word" />
            </h2>
          </div>
        </div>

        {/* CENTER spacer — desktop only, matches photo card footprint */}
        <div className="hidden md:block w-[32%] shrink-0" aria-hidden />

        {/* RIGHT — name + bio + CTA (in-flow on mobile, absolute on desktop) */}
        <div
          ref={rightRef}
          className="relative z-30 flex w-full flex-col gap-5 md:absolute md:right-0 md:top-[40%] md:w-[32%] md:px-14"
          style={{ opacity: 0 }}
        >
          {/* Name */}
          <div
            className="font-display uppercase"
            style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)", lineHeight: 1.1 }}
          >
            <span className="name-word inline-block text-brand-text">Winfred&nbsp;</span>
            <span className="name-word inline-block text-accent">Kagendo</span>
          </div>

          {/* Bio */}
          <p
            className="font-body text-brand-text-muted"
            style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}
          >
            <WordSplit text={BIO} wordClassName="bio-word" />
          </p>

          {/* CTA */}
          <a
            href="#experience"
            aria-label="Learn more about Winfred Kagendo"
            className="mt-1 inline-flex w-fit items-center rounded-full border border-brand-text px-8 py-3 font-body text-xs font-bold uppercase tracking-widest text-brand-text transition-all duration-300 hover:bg-brand-text hover:text-brand-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            Learn More
          </a>

        </div>
      </div>

      {/* ── Social icons — in-flow on mobile, absolute bottom-left on desktop ── */}
      <div
        ref={iconsRef}
        className="relative z-30 flex items-center gap-6 px-6 pb-10 pt-2 md:absolute md:bottom-10 md:left-14 md:px-0 md:pb-0 md:pt-0"
        style={{ opacity: 0 }}
      >
        {SOCIAL.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="text-brand-text-muted transition-colors duration-200 hover:text-brand-text"
          >
            <Icon size={18} strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </section>
  );
}
