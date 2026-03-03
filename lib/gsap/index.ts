export { gsap } from "gsap";
export { ScrollTrigger } from "gsap/ScrollTrigger";
export { DESKTOP_BREAKPOINT_PX } from "./constants";
export {
  isDesktopViewport,
  prefersReducedMotion,
  createPinnedScrubTimeline,
  attachDesktopOnlyResize,
} from "./scroll-helpers";
export type { PinnedScrubTimelineConfig } from "./scroll-helpers";
