"use client";

/**
 * PageStackProvider – stack-of-pages navigation with GSAP slide-up overlay.
 * On route change, the new page slides up from below over the previous page;
 * previous page stays underneath (optionally dimmed). Uses design tokens for styling.
 */

import React, { useRef, useEffect, useState, startTransition } from "react";
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

  useEffect(() => {
    if (isInitialMount.current) {
      previousPathnameRef.current = pathname;
      previousChildrenRef.current = children;
      isInitialMount.current = false;
      return;
    }

    // Same pathname — keep previousChildren in sync without triggering a transition.
    if (previousPathnameRef.current === pathname) {
      previousChildrenRef.current = children;
      return;
    }

    previousPathnameRef.current = pathname;

    if (reducedMotion) {
      previousChildrenRef.current = children;
      // startTransition defers the update so it isn't synchronous in the effect body,
      // satisfying react-hooks/set-state-in-effect without changing visual behaviour.
      startTransition(() => setDisplayedChildren(children));
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

  // Not transitioning: render in normal document flow so sticky navbar and footer work correctly.
  if (!isTransitioning) {
    return <>{displayedChildren}</>;
  }

  // Transitioning: use absolute stacking only during the slide-up animation.
  return (
    <div className="relative min-h-screen w-full bg-background">
      <div
        className="absolute inset-0 z-0 min-h-screen w-full overflow-hidden"
        aria-hidden
      >
        {displayedChildren}
      </div>

      <div
        ref={stackLayerRef}
        className="absolute inset-0 z-10 min-h-screen w-full bg-background"
      >
        {children}
      </div>
    </div>
  );
}
