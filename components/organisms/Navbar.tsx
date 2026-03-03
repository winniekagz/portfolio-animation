"use client";

import Link from "next/link";
import { MenuTrigger } from "@/components/molecules/MenuTrigger";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "border-b border-white/10",
        "bg-white/5 backdrop-blur-md backdrop-saturate-150",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
      )}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center gap-6 font-display text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{ fontSize: "var(--font-size-h3)", lineHeight: "var(--leading-h3)" }}
        >
          <Image src={'/image/win.jpeg'} alt='' width={56} height={56} className="w-14 h-14 object-contain rounded-full"/>
          <p className="">  Winfred Kagendo</p>
    
        </Link>
        <MenuTrigger />
      </nav>
    </header>
  );
}
