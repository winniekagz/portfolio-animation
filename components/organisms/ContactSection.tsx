"use client";

import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/atoms/SocialIcons";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// ─── contact data ─────────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "winniekagendo35@gmail.com",
    href: "mailto:winniekagendo35@gmail.com",
    display: "winniekagendo35@gmail.com",
  },
  {
    id: "phone",
    icon: Phone,
    label: "Phone",
    value: "+254 748 672 162",
    href: "tel:+254748672162",
    display: "+254 748 672 162",
  },
  {
    id: "linkedin",
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "winfred-kagendo",
    href: "https://linkedin.com/in/winfred-kagendo-3b099220b/",
    display: "winfred-kagendo",
  },
  {
    id: "github",
    icon: GitHubIcon,
    label: "GitHub",
    value: "winniekagz",
    href: "https://github.com/winniekagz",
    display: "github.com/winniekagz",
  },
] as const;

const META_ITEMS = [
  { icon: MapPin, text: "Nairobi, Kenya" },
  { icon: Clock,  text: "EAT · UTC+3" },
];

// ─── component ────────────────────────────────────────────────────────────────
export function ContactSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLSpanElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const cardsRef     = useRef<HTMLDivElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const ghostRef     = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set(
        [eyebrowRef.current, headlineRef.current, subRef.current,
         badgeRef.current, metaRef.current],
        { opacity: 1, y: 0, x: 0 }
      );
      const cards = cardsRef.current?.querySelectorAll(".contact-card");
      if (cards?.length) gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Ghost text parallax
      gsap.to(ghostRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Eyebrow slides up
      tl.fromTo(eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
      );

      // Headline clips in from left
      tl.fromTo(headlineRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" },
        "-=0.2"
      );

      // Availability badge pops in
      tl.fromTo(badgeRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
        "-=0.5"
      );

      // Sub text rises
      tl.fromTo(subRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
        "-=0.3"
      );

      // Contact cards stagger in
      const cards = cardsRef.current?.querySelectorAll(".contact-card");
      if (cards?.length) {
        tl.fromTo(cards,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );
      }

      // Meta row fades in last
      tl.fromTo(metaRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-brand-bg px-6 py-24 md:px-14 md:py-32"
    >
      {/* Ghost "HELLO" — large, faint, parallax */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute -bottom-10 left-0 select-none font-display uppercase leading-none text-brand-text"
        aria-hidden
        style={{
          fontSize: "clamp(6rem, 22vw, 20rem)",
          letterSpacing: "-0.05em",
          opacity: 0.025,
          whiteSpace: "nowrap",
        }}
      >
        Hello.
      </span>

      {/* Top divider line */}
      <div className="mb-16 h-px w-full bg-white/8" />

      {/* ── Two-column layout ─────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">

          {/* ── LEFT — headline + intent ────────────────────────────────── */}
          <div className="flex flex-col gap-6 lg:w-[52%] lg:shrink-0">

            {/* Eyebrow */}
            <span
              ref={eyebrowRef}
              className="font-body text-[0.7rem] font-bold uppercase tracking-[0.35em] text-brand-text-muted"
              style={{ opacity: 0 }}
            >
              Get In Touch
            </span>

            {/* Headline */}
            <h2
              id="contact-heading"
              ref={headlineRef}
              className="font-display uppercase text-brand-text"
              style={{
                fontSize: "clamp(3rem, 7vw, 7.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                clipPath: "inset(0 100% 0 0)",
              }}
            >
              Let&apos;s Build<br />
              Something<br />
              <span className="text-brand-accent">Great.</span>
            </h2>

            {/* Availability badge */}
            <div
              ref={badgeRef}
              className="flex w-fit items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5"
              style={{ opacity: 0 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
              </span>
              <span className="font-body text-xs font-bold uppercase tracking-widest text-brand-accent">
                Available for work
              </span>
            </div>

            {/* Sub copy */}
            <p
              ref={subRef}
              className="max-w-sm font-body text-brand-text-muted"
              style={{
                fontSize: "var(--font-size-body)",
                lineHeight: "var(--leading-body)",
                opacity: 0,
              }}
            >
              Whether it&apos;s a full product build, a mobile app, or a tricky
              frontend challenge — I&apos;m interested. I respond within{" "}
              <span className="text-brand-text">24 hours.</span>
            </p>

            {/* Location + timezone */}
            <div
              ref={metaRef}
              className="flex flex-wrap items-center gap-5"
              style={{ opacity: 0 }}
            >
              {META_ITEMS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-brand-text-muted/60">
                  <Icon size={13} strokeWidth={1.5} />
                  <span className="font-body text-xs uppercase tracking-widest">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — contact cards ───────────────────────────────────── */}
          <div
            ref={cardsRef}
            className="flex flex-col gap-3 lg:flex-1"
          >
            {CONTACT_ITEMS.map(({ id, icon: Icon, label, href, display }) => (
              <a
                key={id}
                href={href}
                target={id === "linkedin" || id === "github" ? "_blank" : undefined}
                rel={id === "linkedin" || id === "github" ? "noopener noreferrer" : undefined}
                className="contact-card group flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-brand-surface/60 px-4 py-4 transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-surface sm:px-6 sm:py-5"
                style={{ opacity: 0 }}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                  {/* Icon container — hidden on mobile to free up space */}
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/4 transition-colors duration-300 group-hover:border-brand-accent/40 group-hover:bg-brand-accent/10 sm:flex">
                    <Icon className="h-4 w-4 text-brand-text-muted transition-colors duration-300 group-hover:text-brand-accent" />
                  </div>

                  {/* Label + value */}
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 font-body text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-text-muted/50">
                      {/* Inline icon on mobile only */}
                      <Icon className="h-3 w-3 shrink-0 sm:hidden" />
                      {label}
                    </span>
                    <span className="truncate font-body text-base text-brand-text transition-colors duration-300 group-hover:text-brand-accent sm:text-sm">
                      {display}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-brand-text-muted/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-accent"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
