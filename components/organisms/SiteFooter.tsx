"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { glass } from "@/lib/glass";
import { cn } from "@/lib/utils";

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon },
  { label: "Medium", href: "https://medium.com", Icon: MediumIcon },
  { label: "Twitter", href: "https://twitter.com", Icon: TwitterIcon },
];

export function SiteFooter() {
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
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Bio fades up
      tl.fromTo(
        bioRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.35"
      );

      // Nav links stagger up
      const navLinks = navRef.current?.querySelectorAll("a");
      if (navLinks?.length) {
        tl.fromTo(
          navLinks,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" },
          "-=0.25"
        );
      }

      // Social icons stagger up
      const socialLinks = socialRef.current?.querySelectorAll("a");
      if (socialLinks?.length) {
        tl.fromTo(
          socialLinks,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power2.out" },
          "-=0.3"
        );
      }

      // 3D image scales + rotates in
      tl.fromTo(
        imageRef.current,
        { scale: 0.75, opacity: 0, rotation: -15 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.5"
      );

      // Copyright fades in last
      tl.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.4"
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={cn("bg-brand-bg", glass(), "relative overflow-hidden border-t px-8 py-10 md:px-12")}
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
            Frontend Engineer &amp; developer crafting immersive digital experiences.
          </p>
        </div>

        {/* ── Dot divider ──────────────────────────────────────── */}
        <div className="hidden h-2 w-2 shrink-0 rounded-full bg-white/40 md:block" />

        {/* ── Center: nav + social ─────────────────────────────── */}
        <div className="flex flex-1 flex-col items-center gap-5">
          {/* Nav */}
          <div ref={navRef} className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs font-bold uppercase tracking-widest text-brand-text transition-colors duration-200 hover:text-brand-accent"
              >
                {link.label}
              </Link>
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
          className="relative hidden h-64 shadow w-48 rounded-xl shrink-0 translate-x-4 md:block"
        >
          <Image
            src="/image/winblack.jpeg"
            alt=""
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
