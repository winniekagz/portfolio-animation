import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/data/case-studies";

const visibleCaseStudies = caseStudies.filter(
  (study) => study.slug === "offline-first-engineering",
);

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-20 sm:px-8 md:px-12 lg:px-16">
      <section className="mx-auto max-w-6xl">
        <h1
          className="font-display uppercase text-foreground"
          style={{ fontSize: "clamp(4rem, 13vw, 12rem)", lineHeight: 0.85 }}
        >
          Projects &amp; Case Studies
        </h1>
        <p className="mt-5 max-w-[65ch] font-body text-body leading-body text-muted-foreground">
          Selected frontend platforms and product systems explained through business context, technical constraints, architecture decisions, tradeoffs, and reflection.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {visibleCaseStudies.map((study) => (
            <article
              key={study.slug}
              className="group rounded-lg border border-brand-text/10 bg-brand-surface/70 p-6 transition hover:border-brand-accent/60"
            >
              <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">
                {study.subtitle}
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-none text-brand-text md:text-7xl">
                {study.title}
              </h2>
              <p className="mt-5 font-body text-sm leading-relaxed text-brand-text-muted">
                {study.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-text/15 px-3 py-1 font-body text-xs font-bold uppercase tracking-[0.12em] text-brand-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${study.slug}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-brand-text/20 px-5 py-3 font-body text-sm font-bold text-brand-text transition group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-brand-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                Read case study
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
