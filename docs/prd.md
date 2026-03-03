# Product Requirements Document (PRD)

## Project: Scrollytelling Landing Experience

### Inspiration Sources

* **Homepage & Scrollytelling Flow**: [https://www.lorisbukvic.graphics/](https://www.lorisbukvic.graphics/)
* **Scroll-based Blogs & Service Storytelling**: [https://www.awwwards.com/inspiration/landing-page-scroll-project-o](https://www.awwwards.com/inspiration/landing-page-scroll-project-o)
* **Services UI & Cards**: [https://billodesign.webflow.io/](https://billodesign.webflow.io/)

### Technology Stack

* Next.js (App Router) + TypeScript
* Tailwind CSS + shadcn/ui
* GSAP + ScrollTrigger
* React Three Fiber + Three.js
* Atomic Design Architecture

---

## 1. Objectives

### Primary Goals

* Build an immersive, award-level scrollytelling website.
* Blend 2D UI, motion, and 3D interactions seamlessly.
* Establish a reusable architecture for future pages.

### Secondary Goals

* Demonstrate Atomic Design with shadcn/ui.
* Maintain high accessibility and performance standards.
* Enable easy content extensibility (services, blogs, pages).

---

## 2. Target Audience

* Creative agencies and studios
* Designers and developers seeking inspiration
* Potential clients evaluating services

---

## 3. Feature Overview & User Flow

### 3.1 Homepage (Primary Experience)

**Primary Inspiration**: lorisbukvic.graphics

#### Key Behaviors

* Full-viewport hero section
* Scroll-driven storytelling chapters
* Pinned sections with GSAP ScrollTrigger
* 3D camera/object motion tied to scroll

#### Section Breakdown

| Order | Section            | Inspiration  | Behavior              |
| ----- | ------------------ | ------------ | --------------------- |
| 1     | Hero               | Loris Bukvic | Fade + scale intro    |
| 2     | Scroll Chapters    | Loris Bukvic | Pinned + scrubbed     |
| 3     | Services Preview   | Billo Design | Card-based reveal     |
| 4     | Highlights / Stats | Mixed        | Scroll-in animations  |
| 5     | Call to Action     | Billo Design | Subtle motion + hover |

---

### 3.2 Services & Blog Scrollytelling Pages

**Primary Inspiration**: Project O (Awwwards)

#### Behavior

* Vertical scroll narrative
* Sticky/pinned sections on desktop
* Simplified motion on mobile

#### Content Blocks

1. Services Hero Section
2. Individual Service Chapters
3. Testimonials / Proof
4. Call to Action

---

## 4. Atomic Design System

### Folder Strategy

```
components/
  ui/           → shadcn primitives (Atoms)
  atoms/        → branded primitives
  molecules/    → small composed UI units
  organisms/    → full sections
  templates/    → page layouts
  three/        → R3F scenes & helpers
lib/
  gsap/         → timelines & ScrollTrigger helpers
```

### Atoms

* Button
* Heading
* Text
* Icon
* CardBase

### Molecules

* ServiceCard
* SectionTitle
* HeroContent
* ScrollIndicator

### Organisms

* Navbar
* HeroSection
* ScrollPanel
* ServicesGrid
* BlogScroller

### Templates

* HomepageTemplate
* ServicesTemplate
* BlogTemplate

---

## 5. Motion & Interaction Design

### Motion Principles

* Scroll-driven, not event-driven
* Predictable start/end states
* Smooth easing, no jitter
* Respects `prefers-reduced-motion`

### GSAP Rules

* All animations defined in timelines
* ScrollTrigger controls pin/scrub
* Cleanup triggers on unmount
* Desktop-only pinning

---

## 6. 3D (React Three Fiber)

### Guidelines

* Client-only components
* Lazy-loaded canvas
* Minimal geometry
* GSAP controls camera and uniforms

### Responsibilities

* No Three.js logic inside pages
* 3D scenes live in `components/three`

---

## 7. Data & Content Models

```ts
type Service = {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

type BlogPost = {
  id: string
  title: string
  summary: string
  date: string
  contentBlocks: any[]
}
```

---

## 8. Accessibility & Responsiveness

### Accessibility

* Semantic HTML
* ARIA where required
* High color contrast
* Keyboard navigable

### Responsive Behavior

* Disable pinning on mobile
* Replace heavy 3D with static assets when needed
* Responsive typography and spacing

---

## 9. Delivery Plan

| Sprint | Deliverable                      |
| ------ | -------------------------------- |
| 1      | Project setup + architecture     |
| 2      | Homepage layout                  |
| 3      | GSAP scroll foundations          |
| 4      | Services cards                   |
| 5      | Scroll-based services/blog pages |
| 6      | 3D integration                   |
| 7      | Polish, QA, accessibility        |

---

## 10. AI / Cursor Usage Guidelines

### Prompting Rules

* Treat this PRD as source of truth
* Build incrementally
* Ask before major changes
* Do not alter architecture without approval

### Example Commands

```
Using docs/prd.md, scaffold Atomic Design folders.
```

```
Using docs/prd.md, implement the homepage hero vertical slice.
```

```
Using docs/prd.md, add GSAP ScrollTrigger logic for the first scroll section.
```

---

## End of PRD
