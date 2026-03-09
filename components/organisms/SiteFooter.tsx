"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { glass } from "@/lib/glass";
import { cn } from "@/lib/utils";
import { useLenis } from "@/contexts/LenisContext";

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

import { GitHubIcon, LinkedInIcon } from "@/components/atoms/SocialIcons";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Blog",       href: "#blog" },
  { label: "Contact",    href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon },
  { label: "Medium", href: "https://medium.com", Icon: MediumIcon },
  { label: "Twitter", href: "https://twitter.com", Icon: TwitterIcon },
];

export function SiteFooter() {
  const lenis = useLenis();
  const footerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // Name slides in from left
      tl.fromTo(
        nameRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      );

      // Bio fades up
      tl.fromTo(
        bioRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.35",
      );

      // Nav links stagger up
      const navLinks = navRef.current?.querySelectorAll("a");
      if (navLinks?.length) {
        tl.fromTo(
          navLinks,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.25",
        );
      }

      // Social icons stagger up
      const socialLinks = socialRef.current?.querySelectorAll("a");
      if (socialLinks?.length) {
        tl.fromTo(
          socialLinks,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }

      // 3D image scales + rotates in
      tl.fromTo(
        imageRef.current,
        { scale: 0.75, opacity: 0, rotation: -15 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "-=0.5",
      );

      // Copyright fades in last
      tl.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.4",
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={cn(
        "bg-brand-bg",
        glass(),
        "relative overflow-hidden border-t px-8 py-10 md:px-12",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-10">
        {/* ── Left: name + bio ─────────────────────────────────── */}
        <div className="flex w-52 shrink-0 flex-col gap-3">
          <div ref={nameRef}>
            <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-text">
              Winfred{" "}
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-widest text-brand-accent">
              Kagendo
            </span>
          </div>
          <p
            ref={bioRef}
            className="font-body text-xs leading-relaxed text-brand-text-muted"
          >
            Frontend Engineer &amp; developer crafting immersive digital
            experiences.
          </p>
        </div>

        {/* ── Dot divider ──────────────────────────────────────── */}
        <div className="hidden h-2 w-2 shrink-0 rounded-full bg-white/40 md:block" />

        {/* ── Center: nav + social ─────────────────────────────── */}
        <div className="flex flex-1 flex-col items-center gap-5">
          {/* Nav */}
          <div
            ref={navRef}
            className="flex flex-wrap justify-center gap-6 lg:gap-10"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  lenis?.scrollTo(link.href, { duration: 1.4 });
                }}
                className="font-body text-xs font-bold uppercase tracking-widest text-brand-text transition-colors duration-200 hover:text-brand-accent"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div ref={socialRef} className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text-muted transition-colors duration-200 hover:text-brand-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: decorative 3D image ───────────────────────── */}
        <div
          ref={imageRef}
          className="relative hidden h-48 shadow w-36 rounded-[24px] overflow-hidden shrink-0 translate-x-4 md:block"
        >
          <Image
            src="/image/winblack.jpeg"
            alt=""
            aria-hidden="true"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* ── Bottom: copyright ────────────────────────────────────── */}
      <div
        ref={copyrightRef}
        className="mx-auto mt-8 max-w-7xl border-t border-white/5 pt-4"
      >
        <p className="font-body text-xs text-brand-text-muted/50">
          ©WINFRED KAGENDO. 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
