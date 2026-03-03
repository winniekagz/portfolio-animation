# Design Tokens

Source: PRD inspiration ([lorisbukvic.graphics](https://www.lorisbukvic.graphics/)) for spacing and type scale. Colors and fonts from project spec.

---

## 1. Color Tokens

| Token           | Value     | Usage                    |
|----------------|-----------|--------------------------|
| `background`   | `#10130f` | Page/section background  |
| `text`         | `#ffffff` | Primary text             |
| `accent`       | `#9995e6` | Links, highlights, CTAs  |
| `text-muted`   | (TBD)     | Secondary text; derive from white + opacity or light gray for contrast on `#10130f` |
| `surface`      | (TBD)     | Cards/panels; optional slight lift from `#10130f` |

- **Accessibility:** Ensure contrast ratios meet WCAG (e.g. white on `#10130f`, accent on dark). PRD: high color contrast.

---

## 2. Typography

### Font Families

| Role       | Family              | Usage                          |
|------------|---------------------|--------------------------------|
| Display    | Good Pro Condensed  | Hero, large headlines, section titles |
| Body       | Good Pro            | Body copy, captions, UI labels |

- Load **Good Pro** and **Good Pro Condensed** (e.g. Google Fonts, Adobe Fonts, or self-hosted). Fallback: system sans (e.g. `ui-sans-serif, system-ui, sans-serif`).

### Type Scale (Loris-style)

Sizes and spacing follow a premium scrollytelling/agency feel: large hero type, clear hierarchy, readable body.

| Token / Role   | Size (rem) | Line height | Letter-spacing | Use case           |
|----------------|------------|-------------|----------------|--------------------|
| `display`      | 4 – 7.5    | 0.95 – 1.1  | -0.02em        | Hero headline      |
| `h1`           | 3 – 4.5    | 1.0 – 1.15  | -0.02em        | Section title      |
| `h2`           | 2 – 3      | 1.1 – 1.2   | -0.01em        | Subsection         |
| `h3`           | 1.5 – 2    | 1.2        | 0              | Card titles, etc.  |
| `body`         | 1 – 1.125  | 1.5 – 1.6   | 0              | Body copy          |
| `small`        | 0.875      | 1.4         | 0              | Captions, labels   |

- **Responsive:** Use `clamp()` or breakpoint-based sizes so typography scales (e.g. display 4rem mobile → 7.5rem desktop). PRD: responsive typography.

---

## 3. Spacing & Sizes (Loris-style)

Base rhythm: **8px**. Multiples used for consistency.

### Spacing Scale (px)

| Token     | Value | Typical use              |
|-----------|-------|---------------------------|
| `space-1` | 8     | Inline gaps, tight padding |
| `space-2` | 16    | Component padding        |
| `space-3` | 24    | Card padding, block gaps |
| `space-4` | 32    | Between elements         |
| `space-5` | 40    | —                        |
| `space-6` | 48    | —                        |
| `space-8` | 64    | Section internal         |
| `space-10`| 80    | —                        |
| `space-15`| 120   | Section padding (medium) |
| `space-20`| 160   | Section padding (large)  |
| `space-25`| 200   | Hero / chapter spacing   |

### Section & Layout

- **Hero:** Full viewport height; vertical padding ~80–160px (or equivalent in rem).
- **Scroll chapters:** Generous vertical padding so content breathes; e.g. min 120–160px top/bottom per section.
- **Content width:** Max width for text blocks ~65–75ch or ~720–880px; full width for full-bleed panels.
- **Gaps between sections:** 80px–160px (desktop); scale down on small screens (e.g. 48–80px).

### Component-level

- **Cards (Services):** Padding 24–32px; gap between cards 24–32px.
- **Navbar:** Padding 16–24px vertical, 24–32px horizontal.
- **Buttons / CTAs:** Padding 12–16px vertical, 24–32px horizontal; border-radius per component set.

---

## 4. Summary for Implementation

- **Colors:** `#10130f` (bg), `#ffffff` (text), `#9995e6` (accent).
- **Fonts:** Good Pro (body), Good Pro Condensed (display/headlines).
- **Scale:** 8px base; type scale from ~0.875rem to ~7.5rem with clear display/h1/h2/h3/body/small roles.
- **Sections:** Large vertical padding (80–160px) and section gaps; narrower content width for text; full width for immersive panels.

Use these tokens in Tailwind config (and/or CSS variables) so the app stays consistent with the PRD and Loris Bukvic–inspired spacing and sizes.

---

## Implementation

- **`app/globals.css`**: Design tokens are wired via `@theme inline` (brand colors, spacing scale, type scale) and `:root` (default background, foreground, shadcn-aligned semantic colors). Body uses `font-body` by default.
- **`app/layout.tsx`**: Loads **DM Sans** (body) and **Bebas Neue** (display) from Google Fonts and exposes them as `--font-dm-sans` and `--font-bebas-neue`. Good Pro / Good Pro Condensed are commercial; to use them, add `.woff2` files to `public/fonts/` and switch to `next/font/local` (see `public/fonts/README.md`).

### Tailwind usage

- **Colors:** `bg-brand-bg`, `text-brand-text`, `text-brand-accent`, `bg-brand-surface`, `text-brand-text-muted`
- **Fonts:** `font-display` (hero/headlines), `font-body` (default)
- **Spacing:** `spacing-1` … `spacing-25` (e.g. `p-spacing-10`, `gap-spacing-3`)
- **Type scale:** `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-small` (with `leading-*`, `tracking-*` as needed)
