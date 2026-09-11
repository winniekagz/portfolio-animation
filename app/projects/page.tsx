import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/data/case-studies";
import { experiments } from "@/lib/data/thought-graph";

const visibleCaseStudies = caseStudies.filter((study) =>
  ["offline-first-engineering", "componentiq", "jobflow-ai-job-search"].includes(study.slug),
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
              <div className="flex items-center gap-3">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-brand-accent">
                  {study.subtitle}
                </p>
                {study.slug === "jobflow-ai-job-search" && (
                  <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-yellow-400">
                    In Progress
                  </span>
                )}
              </div>
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

      {/* Labs / Experiments Section */}
      <section id="labs" className="mx-auto mt-24 max-w-6xl">
        <h2
          className="font-display uppercase text-foreground"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, lineHeight: 1 }}
        >
          Labs
        </h2>
        <p className="mt-4 max-w-[65ch] font-body text-body leading-body text-muted-foreground">
          Interactive investigations into how things work. Each experiment starts with a question and follows the rabbit hole.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp) => (
            <article
              key={exp.slug}
              className="group flex flex-col rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5 transition hover:border-brand-accent/60"
            >
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-brand-accent">
                Experiment / {exp.number}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-brand-text">
                {exp.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-brand-text-muted">
                {exp.question}
              </p>
              <p className="mt-3 font-mono text-xs italic text-brand-text-muted/70">
                "{exp.quip}"
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.ledTo.slice(0, 3).map((concept) => (
                  <span
                    key={concept}
                    className="rounded border border-brand-text/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-text-muted"
                  >
                    {concept}
                  </span>
                ))}
              </div>
              <Link
                href={`/experiments/${exp.slug}`}
                className="mt-auto pt-5 inline-flex items-center gap-2 font-mono text-sm font-medium text-brand-accent transition hover:text-brand-accent-hover"
              >
                Explore
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
