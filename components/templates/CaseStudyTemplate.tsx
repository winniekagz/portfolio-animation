import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Layers3,
  Route,
  Sparkles,
} from "lucide-react";
import type { CaseStudy, Decision, NamedDescription, Workflow } from "@/lib/data/case-studies";

function SectionShell({
  eyebrow,
  title,
  children,
}: Readonly<{
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="border-t border-brand-text/10 px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.6fr]">
        <div>
          {eyebrow ? (
            <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-brand-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className="mt-3 font-display uppercase text-brand-text"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6.5rem)",
              lineHeight: 0.95,
            }}
          >
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function Pill({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="rounded-full border border-brand-text/15 bg-brand-text/[0.04] px-3 py-1.5 font-body text-xs font-bold uppercase tracking-[0.12em] text-brand-text-muted">
      {children}
    </span>
  );
}

function TextCard({ item }: Readonly<{ item: NamedDescription }>) {
  return (
    <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5">
      <h3 className="font-body text-base font-bold text-brand-text">{item.title}</h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-brand-text-muted">
        {item.description}
      </p>
    </article>
  );
}

function DecisionCard({
  decision,
  index,
}: Readonly<{
  decision: Decision;
  index: number;
}>) {
  return (
    <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5">
      <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">
        Decision {index + 1}
      </p>
      <h3 className="mt-3 font-body text-lg font-bold text-brand-text">
        {decision.title}
      </h3>
      <dl className="mt-5 grid gap-4 font-body text-sm leading-relaxed">
        <div>
          <dt className="font-bold text-brand-text">Reason</dt>
          <dd className="mt-1 text-brand-text-muted">{decision.reason}</dd>
        </div>
        <div>
          <dt className="font-bold text-brand-text">Tradeoff</dt>
          <dd className="mt-1 text-brand-text-muted">{decision.tradeoff}</dd>
        </div>
        <div>
          <dt className="font-bold text-brand-text">Outcome</dt>
          <dd className="mt-1 text-brand-text-muted">{decision.outcome}</dd>
        </div>
      </dl>
    </article>
  );
}

function WorkflowCard({ workflow }: Readonly<{ workflow: Workflow }>) {
  return (
    <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5">
      <h3 className="font-body text-lg font-bold text-brand-text">{workflow.title}</h3>
      <ol className="mt-5 grid gap-3">
        {workflow.steps.map((step, index) => (
          <li key={step} className="flex gap-3 font-body text-sm text-brand-text-muted">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-xs font-bold text-brand-accent">
              {index + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}

function BulletList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-body text-sm leading-relaxed text-brand-text-muted">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CtaLinks({ links }: Readonly<{ links: CaseStudy["links"] }>) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="inline-flex items-center gap-2 rounded-full border border-brand-text/20 px-5 py-3 font-body text-sm font-bold text-brand-text transition hover:border-brand-accent hover:bg-brand-accent hover:text-brand-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          {link.label}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

export function CaseStudyTemplate({ study }: Readonly<{ study: CaseStudy }>) {
  return (
    <article className="bg-brand-bg text-brand-text">
      <header className="px-5 pb-16 pt-16 sm:px-8 md:px-12 lg:px-16 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-[0.16em] text-brand-text-muted transition hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          >
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
            Projects
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <p className="font-body text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">
                {study.subtitle}
              </p>
              <h1
                className="mt-4 font-display uppercase text-brand-text"
                style={{
                  fontSize: "clamp(4.25rem, 14vw, 13rem)",
                  lineHeight: 0.85,
                }}
              >
                {study.title}
              </h1>
              <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-brand-text-muted md:text-xl">
                {study.description}
              </p>
            </div>
            <div className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5">
              <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-brand-text-muted">
                Platform focus
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <CtaLinks links={study.links} />
          </div>
        </div>
      </header>

      <SectionShell eyebrow="Problem" title="What Needed To Change">
        <BulletList items={study.problem} />
      </SectionShell>

      <SectionShell eyebrow="Engineering Goal" title="What The System Needed To Prove">
        <p className="max-w-2xl font-body text-xl leading-relaxed text-brand-text">
          {study.productGoal}
        </p>
      </SectionShell>

      <SectionShell eyebrow="Audience" title="Who The Work Serves">
        <div className="grid gap-3 md:grid-cols-3">
          {study.users.map((user) => (
            <TextCard key={user.title} item={user} />
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="System" title="System Shape">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="grid gap-3">
            {study.systemParts.slice(0, 3).map((part) => (
              <TextCard key={part.title} item={part} />
            ))}
          </div>
          <div className="flex justify-center py-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/15">
              <Boxes className="h-7 w-7 text-brand-accent" aria-hidden="true" />
            </div>
          </div>
          <TextCard item={study.systemParts[3]} />
        </div>
      </SectionShell>

      <SectionShell eyebrow="Architecture" title="Monorepo Shape">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <pre className="overflow-x-auto rounded-lg border border-brand-text/10 bg-black/25 p-5 font-mono text-sm leading-relaxed text-brand-text">
            <code>{study.architectureTree}</code>
          </pre>
          <BulletList items={study.architectureNotes} />
        </div>
      </SectionShell>

      <SectionShell eyebrow="Decisions" title="Architecture Choices">
        <div className="grid gap-4 md:grid-cols-2">
          {study.decisions.map((decision, index) => (
            <DecisionCard key={decision.title} decision={decision} index={index} />
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Workflows" title="Key Flows">
        <div className="grid gap-4 lg:grid-cols-3">
          {study.workflows.map((workflow) => (
            <WorkflowCard key={workflow.title} workflow={workflow} />
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Implementation" title="System Notes">
        <BulletList items={study.designSystem} />
      </SectionShell>

      <SectionShell eyebrow="Scope" title="V1 Scope Control">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-brand-accent/25 bg-brand-accent/10 p-5">
            <h3 className="flex items-center gap-2 font-body text-lg font-bold text-brand-text">
              <Layers3 className="h-5 w-5 text-brand-accent" aria-hidden="true" />
              Included in V1
            </h3>
            <div className="mt-5">
              <BulletList items={study.scope.included} />
            </div>
          </article>
          <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5">
            <h3 className="flex items-center gap-2 font-body text-lg font-bold text-brand-text">
              <Route className="h-5 w-5 text-brand-accent" aria-hidden="true" />
              Intentionally deferred
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-brand-text-muted">
              These were kept out of V1 to protect learning speed and reduce integration risk.
            </p>
            <div className="mt-5">
              <BulletList items={study.scope.excluded} />
            </div>
          </article>
        </div>
      </SectionShell>

      <SectionShell eyebrow="Roadmap" title="From Support To Automation">
        <div className="grid gap-4 md:grid-cols-2">
          {study.roadmap.map((phase) => (
            <article key={phase.title} className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5">
              <h3 className="flex items-center gap-2 font-body text-lg font-bold text-brand-text">
                <GitBranch className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                {phase.title}
              </h3>
              <div className="mt-5">
                <BulletList items={phase.items} />
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Impact" title="What Became Clearer">
        <BulletList items={study.impact} />
      </SectionShell>

      <SectionShell eyebrow="Reflection" title="What I Learned">
        <div className="grid gap-3">
          {study.reflection.map((item) => (
            <p key={item} className="font-body text-base leading-relaxed text-brand-text-muted">
              {item}
            </p>
          ))}
        </div>
      </SectionShell>

      <section className="border-t border-brand-text/10 px-5 py-16 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-lg border border-brand-text/10 bg-brand-surface/70 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="flex items-center gap-2 font-body text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Explore {study.title}
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase text-brand-text md:text-6xl">
              Platform Links
            </h2>
          </div>
          <CtaLinks links={study.links} />
        </div>
      </section>
    </article>
  );
}
