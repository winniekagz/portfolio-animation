"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuTrigger } from "@/components/molecules/MenuTrigger";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/glass";
import { MENU_ITEMS } from "@/lib/theme";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className={cn(glass(), "sticky top-0 z-40 w-full border-b")}>
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8"
        aria-label="Main"
      >
        {/* Logo */}
        <Link
          href="/"
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
        </Link>

        {/* Horizontal nav — lg and above only */}
        <ul className="hidden items-center gap-8 lg:flex">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                {/*
                 * Push-up hover effect:
                 *   - Container is overflow-hidden with height = 1 line.
                 *   - Two identical spans are stacked vertically inside.
                 *   - On hover both translate up by their own height (-100%):
                 *       span 1  →  slides out above the container
                 *       span 2  →  slides in from below into view
                 *   - Result: the text appears to be "pushed up" by the page.
                 */}
                <Link
                  href={item.href}
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
                </Link>
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
