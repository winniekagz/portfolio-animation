"use client";

import { useEffect, useState, useCallback } from "react";
import { MenuTrigger } from "@/components/molecules";
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
    if (!document.querySelector(href)) {
      window.location.href = `/${href}`;
      return;
    }
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lenis]);

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full border-b transition-[background-color] duration-500",
        "backdrop-blur-sm"
      )}
      style={{
        borderColor: "rgb(242 240 233 / 0.08)",
        backgroundColor: scrolled ? "rgba(7, 8, 9, 0.86)" : "rgba(7, 8, 9, 0.58)",
      }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-14"
        aria-label="Main"
      >
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, "#hero")}
          className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#F2F0E9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A8C6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070809] md:text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[#E0A8C6]" aria-hidden="true" />
          <span>Labs / Winfred Kagendo</span>
        </a>

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
                    "font-mono text-[11px] font-medium uppercase tracking-[0.14em]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A8C6]",
                    isActive ? "text-[#E0A8C6]" : "text-[#858B92]"
                  )}
                >
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span
                    className="absolute inset-x-0 top-full block text-[#E0A8C6] transition-transform duration-300 ease-out group-hover:-translate-y-full"
                    aria-hidden
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <MenuTrigger />
      </nav>
    </header>
  );
}
