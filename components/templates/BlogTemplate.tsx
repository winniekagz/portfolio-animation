// Server component — no "use client" needed.
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data/blog";
import { fetchOgImage } from "@/lib/utils/og-image";

// ── Per-topic gradient fallbacks (shown when OG image fetch fails) ───────────
// Hue chosen to echo each article's subject matter.
const GRADIENTS = [
  "from-[#1a1530] via-[#120f28] to-brand-bg",  // Engineering – deep violet
  "from-[#0d1f2d] via-[#0a1520] to-brand-bg",  // Wellness     – deep teal-blue
  "from-[#1f1a10] via-[#170f08] to-brand-bg",  // Career       – warm amber
  "from-[#0d1f19] via-[#081510] to-brand-bg",  // Tutorial     – forest green
  "from-[#1f1210] via-[#150b08] to-brand-bg",  // JavaScript   – ember orange
  "from-[#1c1a35] via-[#130f28] to-brand-bg",  // UX Design    – indigo
];

// ── Image suggestions ────────────────────────────────────────────────────────
// If OG images don't load, add your own cover photos:
//   public/images/blog/system-design.jpg   → search "server architecture dark"
//   public/images/blog/mental-health.jpg   → search "calm workspace"
//   public/images/blog/legacy.jpg          → search "africa tech community"
//   public/images/blog/formik.jpg          → search "code form react"
//   public/images/blog/fullscreen.jpg      → search "immersive screen browser"
//   public/images/blog/microinteractions.jpg → search "ui animation detail"
// Then set post.localCover = "/images/blog/<slug>.jpg" in lib/data/blog.ts

const TAGS = [
  "Frontend", "React", "UX Design",
  "Performance", "Mental Health",
  "JavaScript", "Career", "Engineering",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

// ── Shared card focus-ring classes ───────────────────────────────────────────
// The heading <a> uses after:absolute after:inset-0 so the entire card is
// keyboard-clickable while the accessible name stays as the visible title text.
const CARD_LINK =
  "after:absolute after:inset-0 after:content-[''] after:rounded-[inherit] " +
  "focus:outline-none " +
  "focus-visible:after:outline focus-visible:after:outline-2 " +
  "focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-accent";

// ── Category badge ────────────────────────────────────────────────────────────
function CategoryBadge({
  label,
  inverted = false,
}: Readonly<{
  label: string;
  inverted?: boolean;
}>) {
  return (
    <span
      className={[
        "inline-block rounded-full px-2.5 py-0.5",
        "font-body text-[10px] font-bold uppercase tracking-[0.12em]",
        inverted
          ? "bg-brand-bg/15 text-brand-bg"
          : "bg-brand-accent/15 text-brand-accent",
      ].join(" ")}
    >
      <span className="sr-only">Category: </span>
      {label}
    </span>
  );
}

// ── Cover image (OG or gradient fallback) ─────────────────────────────────────
function CardCover({
  src,
  alt,
  gradient,
  overlay = "from-brand-bg via-brand-bg/60 to-transparent",
}: Readonly<{
  src: string | null;
  alt: string;
  gradient: string;
  overlay?: string;
}>) {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={alt}
          aria-hidden={alt === ""}
          fill
          className="object-cover opacity-50 transition-opacity duration-500 group-hover:opacity-60"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
        />
      )}
      {/* Bottom-to-top gradient ensures title text is always legible */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-t ${overlay}`}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export async function BlogTemplate() {
  // Fetch all 6 OG images in parallel; never throws.
  const ogImages = await Promise.all(
    blogPosts.map((p) => fetchOgImage(p.url ?? ""))
  );

  const posts = blogPosts.map((p, i) => ({
    ...p,
    cover: ogImages[i],
    gradient: GRADIENTS[i],
  }));

  const [p1, p2, p3, p4, p5, p6] = posts;

  return (
    <section
      id="blog"
      aria-labelledby="blog-section-heading"
      className="bg-brand-bg px-5 py-20 sm:px-8 md:px-12 lg:px-16"
    >
      {/* ── Section header ──────────────────────────────────────────────────── */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="blog-section-heading"
          className="font-display uppercase leading-none text-brand-text"
          style={{
            fontSize: "clamp(3rem, 8vw, 8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Blog
        </h2>

        <a
          href="https://medium.com/@winniekagendo35"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read all articles on Medium (opens in new tab)"
          className={[
            "flex items-center gap-2 rounded-full",
            "border border-brand-text/25 px-5 py-2.5",
            "font-body text-sm font-medium text-brand-text",
            "transition-all duration-300 hover:bg-brand-text hover:text-brand-bg",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
          ].join(" ")}
        >
          Read all on Medium
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>

      {/* ── Bento grid ──────────────────────────────────────────────────────── */}
      {/*
       * Layout (desktop, 3-col):
       *   [p1  featured  col-span-2  row-1] [p6  image  row-span-2  col-3]
       *   [p2  row-2]    [p3  row-2]        [p6  continues          col-3]
       *   [p4  row-3]    [p5  row-3]        [tags               row-3 col-3]
       *
       * Tablet (2-col): p1 col-span-2, rest auto-placed.
       * Mobile (1-col): DOM order, p1 first.
       */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

        {/* ── 1. Featured — System Design (accent card) ──────────────────────
         *  One card, one article. Accent bg is the visual hero of the section.
         */}
        <article
          aria-labelledby="post-1-title"
          className={[
            "relative overflow-hidden rounded-2xl bg-brand-accent",
            "group flex min-h-[280px] flex-col justify-between p-6 sm:p-8",
            "sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-1",
          ].join(" ")}
        >
          {/* Subtle dot-grid overlay — engineering / architecture theme */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, #10130f 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative z-10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <CategoryBadge label={p1.category ?? "Engineering"} inverted />
              <time
                dateTime={p1.date}
                className="font-body text-xs text-brand-bg/55"
              >
                {formatDate(p1.date)}
              </time>
            </div>

            {/* Title — large display font, dark text on accent bg */}
            <h3
              id="post-1-title"
              className="font-display uppercase text-brand-bg"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3.2rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
              }}
            >
              <a
                href={p1.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p1.title} — opens on Medium`}
                className={CARD_LINK}
              >
                System Design &amp; Web Performance
              </a>
            </h3>

            {/* Subtitle line — accent-on-accent via opacity */}
            <p
              className="mt-1 font-display uppercase text-brand-bg/50"
              aria-hidden="true"
              style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.2rem)", letterSpacing: "0.04em" }}
            >
              Speed vs Engineering Tradeoffs
            </p>
          </div>

          <div className="relative z-10">
            <p className="mt-4 font-body text-sm leading-relaxed text-brand-bg/70 line-clamp-2 md:line-clamp-3">
              {p1.summary}
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span className="font-body text-xs font-semibold text-brand-bg/50">
                {p1.readTime} read
              </span>
              {/* Decorative arrow — aria-hidden since the heading link is the interaction */}
              <div
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-bg/15 transition-colors duration-300 group-hover:bg-brand-bg/25"
              >
                <ArrowRight size={16} className="text-brand-bg" />
              </div>
            </div>
          </div>
        </article>

        {/* ── 6. Microinteractions — tall image card (row-span-2 on desktop) ── */}
        <article
          aria-labelledby="post-6-title"
          className={[
            "relative overflow-hidden rounded-2xl bg-brand-surface",
            "group flex min-h-[300px] flex-col justify-end",
            "lg:col-start-3 lg:row-start-1 lg:row-span-2",
          ].join(" ")}
        >
          <CardCover
            src={p6.cover}
            alt=""
            gradient={p6.gradient}
            overlay="from-brand-bg via-brand-bg/65 to-transparent"
          />

          {/* Subtle grid texture — UX / interface theme */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px)," +
                "linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative z-10 p-6">
            <div className="mb-2 flex items-center justify-between">
              <CategoryBadge label={p6.category ?? "UX Design"} />
              <span className="font-body text-xs text-brand-text-muted">
                {p6.readTime} read
              </span>
            </div>

            <h3
              id="post-6-title"
              className="font-display uppercase text-brand-text transition-colors duration-300 group-hover:text-brand-accent"
              style={{
                fontSize: "clamp(1.3rem, 2vw, 2.1rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
              }}
            >
              <a
                href={p6.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p6.title} — opens on Medium`}
                className={CARD_LINK}
              >
                Crafting Captivating UX: Microinteractions for Front-End Devs
              </a>
            </h3>
          </div>
        </article>

        {/* ── 2. Mental Health ───────────────────────────────────────────────── */}
        <article
          aria-labelledby="post-2-title"
          className={[
            "relative overflow-hidden rounded-2xl border border-white/[0.07] bg-brand-surface",
            "group flex min-h-[220px] flex-col",
            "lg:col-start-1 lg:row-start-2",
          ].join(" ")}
        >
          {/* Image strip at top */}
          {p2.cover && (
            <div className="relative h-32 w-full shrink-0 overflow-hidden">
              <Image
                src={p2.cover}
                alt={`Cover image for "${p2.title}"`}
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-surface"
              />
            </div>
          )}

          <div className={`flex flex-1 flex-col justify-between p-5 ${p2.cover ? "pt-3" : "pt-5"}`}>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <CategoryBadge label={p2.category ?? "Life & Wellness"} />
                <time dateTime={p2.date} className="font-body text-[11px] text-brand-text-muted">
                  {formatDate(p2.date)}
                </time>
              </div>

              <h3
                id="post-2-title"
                className="font-display uppercase text-brand-text transition-colors duration-300 group-hover:text-brand-accent"
                style={{
                  fontSize: "clamp(1.1rem, 1.6vw, 1.8rem)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.01em",
                }}
              >
                <a
                  href={p2.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p2.title} — opens on Medium`}
                  className={CARD_LINK}
                >
                  How Mental Health Affects Productivity in Software Engineering
                </a>
              </h3>
            </div>

            <span className="mt-3 font-body text-xs text-brand-text-muted">
              {p2.readTime} read
            </span>
          </div>
        </article>

        {/* ── 3. Building Legacy ─────────────────────────────────────────────── */}
        <article
          aria-labelledby="post-3-title"
          className={[
            "relative overflow-hidden rounded-2xl border border-white/[0.07] bg-brand-surface",
            "group flex min-h-[220px] flex-col",
            "lg:col-start-2 lg:row-start-2",
          ].join(" ")}
        >
          {p3.cover && (
            <div className="relative h-32 w-full shrink-0 overflow-hidden">
              <Image
                src={p3.cover}
                alt={`Cover image for "${p3.title}"`}
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-surface"
              />
            </div>
          )}

          {!p3.cover && (
            <div
              aria-hidden="true"
              className={`h-1 w-full bg-gradient-to-r ${p3.gradient} opacity-60`}
            />
          )}

          <div className={`flex flex-1 flex-col justify-between p-5 ${p3.cover ? "pt-3" : "pt-5"}`}>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <CategoryBadge label={p3.category ?? "Career"} />
                <time dateTime={p3.date} className="font-body text-[11px] text-brand-text-muted">
                  {formatDate(p3.date)}
                </time>
              </div>

              <h3
                id="post-3-title"
                className="font-display uppercase text-brand-text transition-colors duration-300 group-hover:text-brand-accent"
                style={{
                  fontSize: "clamp(1.1rem, 1.6vw, 1.8rem)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.01em",
                }}
              >
                <a
                  href={p3.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p3.title} — opens on Medium`}
                  className={CARD_LINK}
                >
                  Building Your Legacy as a Frontend Engineer
                </a>
              </h3>
            </div>

            <span className="mt-3 font-body text-xs text-brand-text-muted">
              {p3.readTime} read
            </span>
          </div>
        </article>

        {/* ── 4. Formik Forms ────────────────────────────────────────────────── */}
        <article
          aria-labelledby="post-4-title"
          className={[
            "relative overflow-hidden rounded-2xl border border-white/[0.07] bg-brand-surface",
            "group flex min-h-[180px] flex-col justify-between p-5",
            "lg:col-start-1 lg:row-start-3",
          ].join(" ")}
        >
          {/* Accent left-border stripe — Tutorial colour cue */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-6 h-8 w-0.5 rounded-r-full bg-brand-accent/60"
          />

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <CategoryBadge label={p4.category ?? "Tutorial"} />
              <time dateTime={p4.date} className="font-body text-[11px] text-brand-text-muted">
                {formatDate(p4.date)}
              </time>
            </div>

            <h3
              id="post-4-title"
              className="font-display uppercase text-brand-text transition-colors duration-300 group-hover:text-brand-accent"
              style={{
                fontSize: "clamp(1.05rem, 1.4vw, 1.6rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.01em",
              }}
            >
              <a
                href={p4.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p4.title} — opens on Medium`}
                className={CARD_LINK}
              >
                Building Dynamic &amp; Reusable Forms with Formik and Yup
              </a>
            </h3>
          </div>

          <span className="mt-3 font-body text-xs text-brand-text-muted">
            {p4.readTime} read
          </span>
        </article>

        {/* ── 5. Fullscreen API ──────────────────────────────────────────────── */}
        <article
          aria-labelledby="post-5-title"
          className={[
            "relative overflow-hidden rounded-2xl border border-white/[0.07] bg-brand-surface",
            "group flex min-h-[180px] flex-col justify-between p-5",
            "lg:col-start-2 lg:row-start-3",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-6 h-8 w-0.5 rounded-r-full bg-brand-accent/60"
          />

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <CategoryBadge label={p5.category ?? "JavaScript"} />
              <time dateTime={p5.date} className="font-body text-[11px] text-brand-text-muted">
                {formatDate(p5.date)}
              </time>
            </div>

            <h3
              id="post-5-title"
              className="font-display uppercase text-brand-text transition-colors duration-300 group-hover:text-brand-accent"
              style={{
                fontSize: "clamp(1.05rem, 1.4vw, 1.6rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.01em",
              }}
            >
              <a
                href={p5.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p5.title} — opens on Medium`}
                className={CARD_LINK}
              >
                Fullscreen JavaScript API: Enhancing User Experience &amp; Performance
              </a>
            </h3>
          </div>

          <span className="mt-3 font-body text-xs text-brand-text-muted">
            {p5.readTime} read
          </span>
        </article>

        {/* ── Tags + View All CTA ────────────────────────────────────────────── */}
        <div
          className={[
            "flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-brand-surface p-6",
            "sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-3",
          ].join(" ")}
        >
          <div>
            <p className="mb-3 font-body text-xs font-bold uppercase tracking-widest text-brand-text-muted">
              Topics
            </p>
            <ul
              className="flex flex-wrap gap-2"
              aria-label="Article topics"
            >
              {TAGS.map((tag) => (
                <li key={tag}>
                  <span className="inline-block rounded-full border border-brand-accent/20 bg-brand-accent/8 px-3 py-1 font-body text-xs font-medium text-brand-accent">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-body text-sm font-medium text-brand-text-muted">
              View all on Medium
            </span>
            <a
              href="https://medium.com/@winniekagendo35"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View all articles and topics on Medium (opens in new tab)"
              className={[
                "flex h-11 w-11 items-center justify-center rounded-full bg-brand-text",
                "transition-colors duration-300 hover:bg-brand-accent",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
              ].join(" ")}
            >
              <ArrowRight size={16} aria-hidden="true" className="text-brand-bg" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
