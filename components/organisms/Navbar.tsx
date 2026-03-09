"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { MenuTrigger } from "@/components/molecules/MenuTrigger";
import { cn } from "@/lib/utils";
import { MENU_ITEMS } from "@/lib/theme";
import { useLenis } from "@/contexts/LenisContext";

export function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#hero");

  // Increase navbar opacity when user scrolls down
  useEffect(() => {
    if (!lenis) return;
    const handler = ({ scroll }: { scroll: number }) => {
      setScrolled(scroll > 60);
    };
    lenis.on("scroll", handler);
    return () => lenis.off("scroll", handler);
  }, [lenis]);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = MENU_ITEMS.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHref(`#${id}`); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lenis]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-[background-color] duration-500",
        "backdrop-blur-md"
      )}
      style={{
        borderColor: "rgb(255 255 255 / 0.08)",
        backgroundColor: scrolled ? "rgba(16, 19, 15, 0.9)" : "rgb(255 255 255 / 0.04)",
      }}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8"
        aria-label="Main"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, "#hero")}
          className="flex items-center gap-3 font-display text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{ fontSize: "var(--font-size-h3)", lineHeight: "var(--leading-h3)" }}
        >
          <Image
            src="/image/win.jpeg"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover object-top"
          />
          <span>Winfred Kagendo</span>
        </a>

        {/* Horizontal nav — lg and above only */}
        <ul className="hidden items-center gap-8 lg:flex">
          {MENU_ITEMS.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={cn(
                    "group relative block overflow-hidden leading-none",
                    "font-body text-sm uppercase tracking-widest",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-brand-accent" : "text-foreground/60"
                  )}
                >
                  {/* Span 1 – visible at rest, slides out above on hover */}
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  {/* Span 2 – hidden below at rest, slides up into view on hover */}
                  <span
                    className="absolute inset-x-0 top-full block text-brand-accent transition-transform duration-300 ease-out group-hover:-translate-y-full"
                    aria-hidden
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Menu trigger — visible on all sizes to open the full overlay */}
        <MenuTrigger />
      </nav>
    </header>
  );
}
