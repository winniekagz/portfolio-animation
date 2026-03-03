"use client";

/**
 * PageStackProvider – stack-of-pages navigation with GSAP slide-up overlay.
 * On route change, the new page slides up from below over the previous page;
 * previous page stays underneath (optionally dimmed). Uses design tokens for styling.
 */

import React, { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PAGE_SLIDE_DURATION = 0.9;
const PAGE_SLIDE_EASE = "power4.out";

export function PageStackProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const previousChildrenRef = useRef<React.ReactNode>(null);
  const previousPathnameRef = useRef<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const stackLayerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Keep previous children in ref when not transitioning (so we have it when pathname changes).
  if (!isTransitioning && previousPathnameRef.current === pathname) {
    previousChildrenRef.current = children;
  }

  useEffect(() => {
    if (isInitialMount.current) {
      previousPathnameRef.current = pathname;
      previousChildrenRef.current = children;
      isInitialMount.current = false;
      return;
    }

    if (previousPathnameRef.current === pathname) return;

    const prevPath = previousPathnameRef.current;
    previousPathnameRef.current = pathname;

    if (reducedMotion) {
      previousChildrenRef.current = children;
      setDisplayedChildren(children);
      return;
    }

    // Start transition: show previous content as background, new content as foreground layer.
    setDisplayedChildren(previousChildrenRef.current);
    setIsTransitioning(true);

    // Next tick so the new layer is in the DOM (we need to render children in an overlay and animate it).
    const timeoutId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const layer = stackLayerRef.current;
        if (!layer) {
          previousChildrenRef.current = children;
          setDisplayedChildren(children);
          setIsTransitioning(false);
          return;
        }

        // New page content is already in the layer (children); animate from y 100%.
        gsap.set(layer, { yPercent: 100 });

        const tl = gsap.timeline({
          onComplete: () => {
            previousChildrenRef.current = children;
            setDisplayedChildren(children);
            setIsTransitioning(false);
            gsap.set(layer, { clearProps: "yPercent" });
          },
        });

        tl.to(layer, {
          yPercent: 0,
          duration: PAGE_SLIDE_DURATION,
          ease: PAGE_SLIDE_EASE,
        });
      });
    });

    return () => {
      cancelAnimationFrame(timeoutId);
    };
  }, [pathname, children, reducedMotion]);

  return (
    <div className="relative min-h-screen w-full bg-background">
      {/* Background layer: previous page (or current when not transitioning). */}
      <div
        className="absolute inset-0 z-0 min-h-screen w-full"
        aria-hidden={isTransitioning}
      >
        {displayedChildren}
      </div>

      {/* Foreground animated layer: new page slides up. Only mount when we have new children to show. */}
      {isTransitioning && (
        <div
          ref={stackLayerRef}
          className="absolute inset-0 z-10 min-h-screen w-full overflow-auto bg-background"
          aria-hidden={false}
        >
          {children}
        </div>
      )}
    </div>
  );
}
