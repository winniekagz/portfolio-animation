"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/contexts/LenisContext";
import { nav } from "@/lib/data/componentiq-product";

export function ProductNav() {
  const lenis = useLenis();
  const [activeHref, setActiveHref] = useState<string>(nav[0].href);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    nav.forEach((item) => {
      const el = document.getElementById(item.href.slice(1));
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHref(item.href);
        },
        { threshold: 0.3, rootMargin: "-96px 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, { duration: 1.2, offset: -80 });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis]
  );

  return (
    <nav
      aria-label="ComponentIQ page sections"
      className="glass sticky top-[65px] z-30 overflow-x-auto border-b border-t-0"
    >
      <ul className="mx-auto flex max-w-6xl gap-6 px-5 py-3 sm:px-8 md:px-12 lg:px-16">
        {nav.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "block whitespace-nowrap rounded-full px-3 py-1.5 font-body text-xs font-bold uppercase tracking-[0.14em] transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
                  isActive ? "bg-brand-accent/15 text-brand-accent" : "text-brand-text-muted hover:text-brand-text"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
