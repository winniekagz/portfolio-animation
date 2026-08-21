import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/data/case-studies";

const visibleCaseStudies = caseStudies.filter((study) =>
  ["offline-first-engineering", "componentiq"].includes(study.slug),
);

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-20 sm:px-8 md:px-12 lg:px-16">
      <section className="mx-auto max-w-6xl">
        <h1
          className="font-display uppercase text-foreground"
          style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)", fontWeight: 600, lineHeight: 1 }}
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
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-brand-accent">
                {study.subtitle}
              </p>
              <h2 className="mt-4 font-display text-[2.125rem] font-medium uppercase leading-tight text-brand-text md:text-6xl">
                {study.title}
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-brand-text-muted md:text-lg">
                {study.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-text/15 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${study.slug}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-brand-text/20 px-5 py-3 font-mono text-sm font-medium text-brand-text transition group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-brand-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
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
