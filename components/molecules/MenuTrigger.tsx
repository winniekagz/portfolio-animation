"use client";

/**
 * Menu trigger button for the animated menu. Shares state with AnimatedMenu via MenuContext.
 * Renders in Navbar; AnimatedMenu uses triggerRef for the flip animation.
 */

import { Menu, X } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useMenu } from "@/contexts/MenuContext";
import { cn } from "@/lib/utils";

export function MenuTrigger() {
  const menu = useMenu();
  if (!menu) return null;

  const { isOpen, toggle, triggerRef } = menu;

  return (
    <Button
      ref={triggerRef}
      type="button"
      onClick={toggle}
      aria-expanded={isOpen}
      aria-controls="animated-menu-overlay"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg md:h-12 md:w-12",
        "bg-card text-foreground border border-border",
        "hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {isOpen ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <Menu className="h-5 w-5 md:h-6 md:w-6" />}
    </Button>
  );
}
