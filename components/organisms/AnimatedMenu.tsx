"use client";

/**
 * AnimatedMenu – full-screen overlay menu inspired by exoape layout.
 * Top bar → image + large nav + social → bottom footer bar.
 * GSAP: clip-path reveal + staggered entrance on open.
 */

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useEventListener } from "@/hooks/useEventListener";
import { MENU_ITEMS, type MenuItem } from "@/lib/theme";
import { useCursor } from "@/contexts/CursorContext";
import { useMenu } from "@/contexts/MenuContext";
import { useLenis } from "@/contexts/LenisContext";
import { cn } from "@/lib/utils";

const MENU_OPEN_DURATION = 0.75;
const MENU_EASE = "power3.inOut";
const PREVIEW_DURATION = 0.35;
const UNDERLINE_DURATION = 0.28;

const SOCIAL_LINKS = [
  { label: "GitHub",    href: "https://github.com/winniekagz" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/winfred-kagendo-3b099220b/" },
  { label: "Twitter",   href: "#" },
  { label: "Instagram", href: "#" },
];

export function AnimatedMenu() {
  const lenis = useLenis();
  const menuContext = useMenu();
  const { isOpen, close, triggerRef } = menuContext ?? {
    isOpen: false,
    close: () => {},
    triggerRef: { current: null },
  };
  const { setHoveringMenuLink } = useCursor() ?? {};
  const reducedMotion = usePrefersReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const [hoverItem, setHoverItem] = useState<MenuItem | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const underlineRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const navItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const socialRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const didOpenOnceRef = useRef(false);

  const activeItem = MENU_ITEMS[0];
  const previewItem = hoverItem ?? activeItem;

  // Underline scale on hover
  useEffect(() => {
    if (reducedMotion) return;
    MENU_ITEMS.forEach((item) => {
      const el = underlineRefs.current.get(item.href);
      if (!el) return;
      const show = hoverItem?.href === item.href;
      gsap.to(el, {
        scaleX: show ? 1 : 0,
        duration: UNDERLINE_DURATION,
        ease: "power2.out",
        transformOrigin: "left center",
      });
    });
  }, [hoverItem, reducedMotion]);

  const closeMenu = useCallback(() => {
    if (!isOpen) return;
    close();
  }, [isOpen, close]);

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Overlay reveal + entrance stagger
  useEffect(() => {
    if (reducedMotion) {
      if (overlayRef.current) {
        overlayRef.current.style.clipPath = isOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)";
      }
      return;
    }

    const btn = triggerRef?.current ?? null;
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (!didOpenOnceRef.current && !isOpen) {
      gsap.set(overlay, { clipPath: "inset(0 0 100% 0)" });
      if (btn) gsap.set(btn, { rotateY: 0 });
      return;
    }
    didOpenOnceRef.current = true;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    const tl = gsap.timeline();

    if (isOpen) {
      // Reset entrance elements before animating in
      const navItems = navItemRefs.current.filter(Boolean) as HTMLLIElement[];
      gsap.set(navItems, { opacity: 0, y: 28 });
      if (imageRef.current) gsap.set(imageRef.current, { opacity: 0, scale: 0.94 });
      if (socialRef.current) gsap.set(socialRef.current, { opacity: 0, y: 12 });
      if (footerRef.current) gsap.set(footerRef.current, { opacity: 0 });

      if (btn) tl.to(btn, { rotateY: 0, duration: 0.25, ease: "power2.out" });
      tl.to(overlay, { clipPath: "inset(0 0 0 0)", duration: MENU_OPEN_DURATION, ease: MENU_EASE }, "-=0.1");

      // Image fades in as overlay opens
      if (imageRef.current) {
        tl.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.5");
      }
      // Nav items stagger up
      tl.to(navItems, { opacity: 1, y: 0, duration: 0.48, stagger: 0.07, ease: "power2.out" }, "-=0.42");
      // Social links fade in
      if (socialRef.current) {
        tl.to(socialRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.18");
      }
      // Footer fades in last
      if (footerRef.current) {
        tl.to(footerRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.28");
      }
    } else {
      tl.to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: MENU_OPEN_DURATION * 0.85,
        ease: MENU_EASE,
      });
      if (btn) tl.to(btn, { rotateY: 90, duration: 0.2, ease: "power2.in" }, "-=0.2");
    }

    tlRef.current = tl;
    return () => { tl.kill(); };
  }, [isOpen, reducedMotion, triggerRef]);

  // Crossfade preview image on hover change
  useEffect(() => {
    const wrap = previewRef.current;
    if (!wrap || reducedMotion) return;
    gsap.to(wrap, {
      opacity: 0, y: 6, duration: PREVIEW_DURATION * 0.4,
      onComplete: () => {
        gsap.to(wrap, { opacity: 1, y: 0, duration: PREVIEW_DURATION, ease: "power2.out" });
      },
    });
  }, [previewItem, reducedMotion]);

  return (
    <>
      <div
        id="animated-menu-overlay"
        ref={overlayRef}
        className="fixed inset-0 z-50 flex flex-col bg-background/20 backdrop-blur-2xl backdrop-saturate-150"
        aria-hidden={!isOpen}
        style={{
          clipPath: "inset(0 0 100% 0)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* ── Top bar ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-8 py-5 md:px-12">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); closeMenu(); lenis?.scrollTo("#hero", { duration: 1.4 }); }}
            className="font-display text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ fontSize: "var(--font-size-h3)", lineHeight: "var(--leading-h3)" }}
          >
            Winfred Kagendo
          </a>

          {/* Close – text + icon, matches position of MenuTrigger */}
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="flex items-center gap-2 text-foreground/55 transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="font-body text-sm uppercase tracking-widest">Close</span>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Main body ───────────────────────────────────────────── */}
        <div className="flex flex-1 items-center justify-center overflow-hidden px-8 md:px-12">
          <div className="flex items-center gap-14 lg:gap-24">

            {/* Left: portrait image */}
            <div ref={imageRef} className="hidden md:block w-64 lg:w-72 shrink-0">
              <div ref={previewRef} className="relative aspect-3/4 w-full overflow-hidden rounded-lg">
                <Image
                  key={previewItem.href}
                  src={previewItem.preview}
                  alt={previewItem.previewAlt}
                  fill
                  className="object-cover object-top"
                  sizes="300px"
                  unoptimized
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </div>

          {/* Right: large nav + social */}
          <nav
            className="flex flex-col justify-center"
            aria-label="Main navigation"
          >
            <ul className="flex flex-col">
              {MENU_ITEMS.map((item, i) => {
                return (
                  <li
                    key={item.href}
                    ref={(el) => { navItemRefs.current[i] = el; }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        closeMenu();
                        lenis?.scrollTo(item.href, { duration: 1.4 });
                      }}
                      onMouseEnter={() => { setHoverItem(item); setHoveringMenuLink?.(true); }}
                      onMouseLeave={() => { setHoverItem(null); setHoveringMenuLink?.(false); }}
                      className={cn(
                        "group relative block w-fit font-display text-foreground",
                        "text-[clamp(2.8rem,7vw,6rem)] leading-none tracking-tight",
                        "transition-opacity duration-200 hover:opacity-40",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      )}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span
                        ref={(el) => { if (el) underlineRefs.current.set(item.href, el); }}
                        className="absolute bottom-1 left-0 h-[1.5px] bg-foreground origin-left scale-x-0"
                        style={{ width: "100%" }}
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Social links */}
            <div ref={socialRef} className="mt-8 flex flex-col gap-0.5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-fit font-body text-foreground/35 transition-colors duration-200 hover:text-foreground/70"
                  style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div
          ref={footerRef}
          className="flex items-center justify-between border-t border-white/10 px-8 py-4 md:px-12"
        >
          <span className="font-body text-xs font-bold uppercase tracking-widest text-foreground/35">
            Available for work
          </span>
          <span className="font-body text-xs font-bold uppercase tracking-widest text-foreground/35">
            Based in Nairobi
          </span>
          <span className="font-body text-xs font-bold uppercase tracking-widest text-foreground/35">
            © 2026
          </span>
        </div>
      </div>
    </>
  );
}
