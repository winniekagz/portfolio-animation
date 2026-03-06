"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Globe, Mail, Play, Code2, Users, Github } from "lucide-react";

// ─── copy ────────────────────────────────────────────────────────────────────
const HEADLINE = "I Deliver Exceptional User Experiences Across Various Platforms.";
const BIO =
  "As a Frontend Engineer with four years of experience, I've consistently poured my heart and soul into creating products that not only look great but feel amazing to use. Currently, I work as a Senior Engineer crafting immersive digital experiences.";
const SOCIAL = [
  { Icon: Github, label: "GitHub", href: "https://github.com/winniekagz" },
  { Icon: Globe, label: "Website", href: "#" },
  { Icon: Users, label: "LinkedIn", href: "#" },
  { Icon: Play, label: "YouTube", href: "#" },
  { Icon: Mail, label: "Email", href: "#" },
];

// ─── word-split helper ────────────────────────────────────────────────────────
// No overflow-hidden wrapper — large display type clips on line boundaries when
// using overflow-hidden + animated translateY. Animate with y + opacity only.
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
  /** Full-screen object-cover — clips to card footprint and fades out. */
  const photoRef = useRef<HTMLDivElement>(null);
  /** Card-sized object-contain — fades in as the cover fades out. */
  const cardPhotoRef = useRef<HTMLDivElement>(null);
  /** Dark bg panel that fades in behind the clipped photo. */
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const headlineWords = section.querySelectorAll<HTMLElement>(".aw-word");
    const bioWords = section.querySelectorAll<HTMLElement>(".bio-word");
    const nameWords = section.querySelectorAll<HTMLElement>(".name-word");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
        },
      });

      // ── 1a. Cover layer: clips to card footprint + fades out ────────────
      // Both 1a and 1b share the same start position and duration so
      // their opacities always sum to 1 — no dark gap, no visible snap.
      tl.fromTo(
        photoRef.current,
        { clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 },
        { clipPath: "inset(25% 37% 25% 33% round 22px)", opacity: 0, duration: 1, ease: "power2.inOut" },
        0
      );

      // ── 1b. Contain layer: fades in over exactly the same window ────────
      tl.fromTo(
        cardPhotoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" },
        0
      );

      // ── 2. Brand-bg overlay fades in (fills the exposed area around card) ─
      tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.15);

      // ── 3. Eyebrow ────────────────────────────────────────────────────────
      tl.fromTo(
        eyebrowRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 },
        0.5
      );

      // ── 4. Headline block slides in from left ─────────────────────────────
      tl.fromTo(
        headlineRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45 },
        0.52
      );

      // ── 5. Headline word-by-word reveal (pixel y — no overflow-hidden clip) ─
      if (headlineWords.length) {
        tl.fromTo(
          headlineWords,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.045, duration: 0.5, ease: "power2.out" },
          0.55
        );
      }

      // ── 6. Right panel slides in ──────────────────────────────────────────
      tl.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        0.6
      );

      // ── 7. Name words ─────────────────────────────────────────────────────
      if (nameWords.length) {
        tl.fromTo(
          nameWords,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" },
          0.65
        );
      }

      // ── 8. Bio words stagger in ───────────────────────────────────────────
      if (bioWords.length) {
        tl.fromTo(
          bioWords,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.018, duration: 0.3 },
          0.75
        );
      }

      // ── 9. Social icons ───────────────────────────────────────────────────
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
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-brand-bg"
    >
      {/* ── Brand-bg overlay (fades in to reveal the dark background) ─────── */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-10 bg-brand-bg"
        style={{ opacity: 0 }}
      />

      {/* ── Layer 1: full-viewport cover — clips + fades out ───────────────── */}
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


      <div
        ref={cardPhotoRef}
        className="absolute z-21 pointer-events-none bg-brand-bg "
        style={{ top: "25%", left: "33%", width: "30%", height: "50%", opacity: 0, clipPath: "inset(0% 0% 0% 0% round 22px)", borderRadius:'8px' }}
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


      {/* ── 3-D decoration — top right ─────────────────────────────────────── */}
      <div className="absolute right-8 top-6 z-30 h-28 w-28 pointer-events-none select-none">
        <Image
          src="/image/3d.png"
          alt=""
          width={56}
          height={56}
          className="object-contain"
        />
      </div>

      {/* ── Main 3-column layout ─────────────────────────────────────────────── */}
      <div className="relative z-30 flex h-full items-center gap-10 px-14">

        {/* LEFT — eyebrow + headline ---------------------------------------- */}
        <div className="flex w-[26%] shrink-0 flex-col gap-5">
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

        {/* CENTER — spacer matching the photo card's final footprint (~30% wide) */}
        <div className="w-[32%] shrink-0" aria-hidden />

        {/* RIGHT — name, bio, CTA ------------------------------------------- */}
        <div
          ref={rightRef}
          className="flex w-[30%] flex-col gap-5"
          style={{ opacity: 0 }}
        >
          {/* Name */}
          <div
            className="font-display uppercase"
            style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)", lineHeight: 1.1 }}
          >
            <span className="name-word inline-block text-brand-text">Winfred&nbsp;</span>
            <span className="name-word inline-block text-accent" >
              Kagendo
            </span>
          </div>

          {/* Bio */}
          <p
            className="font-body text-brand-text-muted"
            style={{
              fontSize: "var(--font-size-body)",
              lineHeight: "var(--leading-body)",
            }}
          >
            <WordSplit text={BIO} wordClassName="bio-word" />
          </p>

          {/* CTA */}
          <a
            href="/about"
            className="mt-1 inline-flex w-fit items-center rounded-full border border-brand-text px-8 py-3 font-body text-xs font-bold uppercase tracking-widest text-brand-text transition-all duration-300 hover:bg-brand-text hover:text-brand-bg"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* ── Social icons — bottom left ─────────────────────────────────────── */}
      <div
        ref={iconsRef}
        className="absolute bottom-10 left-14 z-30 flex items-center gap-6"
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
