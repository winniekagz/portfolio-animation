import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DESKTOP_BREAKPOINT_PX } from "./constants";

/** Whether the viewport is considered desktop for pinning (≥ breakpoint). */
export function isDesktopViewport(viewportWidth?: number): boolean {
  if (typeof window === "undefined") return false;
  return (viewportWidth ?? window.innerWidth) >= DESKTOP_BREAKPOINT_PX;
}

/** Whether the user prefers reduced motion. PRD: respect prefers-reduced-motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type PinnedScrubTimelineConfig = {
  trigger: Element;
  start?: string;
  end?: string;
  pin?: boolean;
  scrub?: boolean | number;
};

/**
 * Creates a GSAP timeline with ScrollTrigger pin + scrub. Caller adds tweens to the returned timeline.
 * Registers ScrollTrigger if needed.
 */
export function createPinnedScrubTimeline(config: PinnedScrubTimelineConfig): gsap.core.Timeline {
  gsap.registerPlugin(ScrollTrigger);
  return gsap.timeline({
    scrollTrigger: {
      trigger: config.trigger,
      start: config.start ?? "top top",
      end: config.end ?? "+=100%",
      pin: config.pin ?? true,
      scrub: config.scrub ?? true,
    },
  });
}

/**
 * Attaches a resize listener that teardowns when viewport goes below breakpoint and
 * setup when it goes back above. Use isActive so setup isn't called twice.
 * Returns a cleanup that removes the listener and calls teardown.
 */
export function attachDesktopOnlyResize(
  breakpointPx: number,
  setup: () => void,
  teardown: () => void,
  isActive: () => boolean
): () => void {
  const media = window.matchMedia(`(min-width: ${breakpointPx}px)`);
  const onResize = () => {
    const isDesktop = window.innerWidth >= breakpointPx;
    if (!isDesktop) teardown();
    else if (!isActive()) setup();
  };
  media.addEventListener("change", onResize);
  return () => {
    media.removeEventListener("change", onResize);
    teardown();
  };
}
