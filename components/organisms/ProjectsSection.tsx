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
            <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-brand-accent">
              Case Studies
            </p>
            <h2
              id="projects-heading"
              className="mt-3 font-display uppercase text-brand-text"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 0.9 }}
            >
              Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-brand-text/25 px-5 py-2.5 font-body text-sm font-bold text-brand-text transition hover:border-brand-accent hover:bg-brand-accent hover:text-brand-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            View all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.slug}
              className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5 transition hover:border-brand-accent/50"
            >
              <p className="font-body text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">
                {study.subtitle}
              </p>
              <h3 className="mt-4 font-display text-4xl uppercase leading-none text-brand-text">
                {study.title}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-brand-text-muted">
                {study.description}
              </p>
              <Link
                href={`/projects/${study.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-body text-sm font-bold text-brand-text transition hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
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
