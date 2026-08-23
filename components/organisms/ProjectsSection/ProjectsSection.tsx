import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/data/case-studies";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-brand-bg px-5 py-20 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
              Case Studies
            </p>
            <h2
              id="projects-heading"
              className="mt-3 font-display uppercase text-brand-text"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", fontWeight: 600, lineHeight: 1.05 }}
            >
              Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-brand-text/25 px-5 py-2.5 font-mono text-sm font-medium text-brand-text transition hover:border-brand-accent hover:bg-brand-accent hover:text-brand-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            View all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {caseStudies.map((study) => (
            <article
              key={study.slug}
              className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5 transition hover:border-brand-accent/50"
            >
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-brand-accent">
                {study.subtitle}
              </p>
              <h3 className="mt-4 font-display text-[2.125rem] font-medium uppercase leading-tight text-brand-text md:text-5xl">
                {study.title}
              </h3>
              <p className="mt-4 font-body text-base leading-relaxed text-brand-text-muted">
                {study.description}
              </p>
              <Link
                href={`/projects/${study.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-mono text-sm font-medium text-brand-text transition hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                Read case study
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
