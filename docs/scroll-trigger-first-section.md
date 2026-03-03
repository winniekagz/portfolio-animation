# GSAP + ScrollTrigger: First Section Timeline

## What it does

The **first scrollytelling section** (Homepage → first `ScrollPanel` with `pinAndScrub`) uses one GSAP timeline driven by ScrollTrigger:

1. **Trigger** – The section’s top edge (`start: "top top"`). When it hits the viewport top, ScrollTrigger activates.
2. **Pin** – The section is pinned so it stays fixed in the viewport while the user scrolls.
3. **Pin length** – Pinning lasts for **100% of the viewport height** of scroll (`end: "+=100%"`). So the user scrolls one full viewport while the section stays pinned.
4. **Scrubbing** – `scrub: true` links **timeline progress to scroll position**. The animation doesn’t run on a timer; it advances and reverses as the user scrolls forward and back.
5. **Timeline** – A single tweens: the section’s **content** goes from `opacity: 0, y: 24` to `opacity: 1, y: 0` over the pinned scroll range. So the content fades in and moves up as you scroll through the pin.

## Flow

- User scrolls down → section enters from below, its top hits the viewport top → pin starts.
- User keeps scrolling (one viewport height) → content animates from hidden/slightly down to visible/rest position; progress = scroll position in that range.
- User scrolls back up → animation runs backward (scrub).
- After that scroll distance → pin ends, section scrolls away normally.

## Constraints (per PRD)

- **Desktop only** – Pinning and scrub run only when viewport width ≥ 1024px. On resize below that, the ScrollTrigger is killed; above again, it’s re-created.
- **prefers-reduced-motion** – If the user prefers reduced motion, no ScrollTrigger is created.
- **Cleanup** – On unmount (or when turning off pinning), only this panel’s ScrollTrigger is killed so other triggers (e.g. hero) are unaffected.

## Where it’s implemented

- **Component:** `components/organisms/ScrollPanel.tsx`
- **Usage:** First section on the homepage uses `<ScrollPanel pinAndScrub>…</ScrollPanel>` in `components/templates/HomepageTemplate.tsx`.
