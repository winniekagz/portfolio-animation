import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Layers3,
  Route,
  Sparkles,
} from "lucide-react";
import { TypewriterText } from "@/components/atoms/TypewriterText";
import type { CaseStudy, CaseStudyEvidenceImage, Decision, NamedDescription, Workflow } from "@/lib/data/case-studies";

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
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="font-body text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className="mt-3 font-display uppercase text-brand-text"
            style={{
              fontSize: "clamp(3rem, 7vw, 7.5rem)",
              lineHeight: 0.95,
            }}
          >
            {title}
          </h2>
        </div>
        <div className="max-w-5xl">{children}</div>
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
    <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-6">
      <h3 className="font-body text-xl font-bold text-brand-text">{item.title}</h3>
      <p className="mt-3 font-body text-base leading-relaxed text-brand-text-muted md:text-lg">
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
    <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-6">
      <p className="font-body text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">
        Decision {index + 1}
      </p>
      <h3 className="mt-3 font-body text-2xl font-bold text-brand-text">
        {decision.title}
      </h3>
      <dl className="mt-5 grid gap-5 font-body text-base leading-relaxed md:text-lg">
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
    <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-6">
      <h3 className="font-body text-2xl font-bold text-brand-text">{workflow.title}</h3>
      <ol className="mt-5 grid gap-4">
        {workflow.steps.map((step, index) => (
          <li key={step} className="flex gap-3 font-body text-base leading-relaxed text-brand-text-muted md:text-lg">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-sm font-bold text-brand-accent">
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
    <ul className="grid gap-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 font-body text-base leading-relaxed text-brand-text-muted md:text-lg">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function EvidenceImage({
  image,
  featured = false,
}: Readonly<{
  image: CaseStudyEvidenceImage;
  featured?: boolean;
}>) {
  return (
    <figure className={featured ? "md:col-span-2" : undefined}>
      <div className="overflow-hidden rounded-lg border border-brand-text/10 bg-brand-text/[0.04] p-1">
        <div className="relative aspect-video overflow-hidden rounded-md bg-brand-bg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={image.priority}
            sizes={featured ? "(min-width: 1024px) 960px, 100vw" : "(min-width: 768px) 480px, 100vw"}
            className="object-cover object-top"
          />
        </div>
      </div>
      <figcaption className="mt-5 max-w-3xl">
        <h3 className="font-body text-xl font-bold text-brand-text">{image.title}</h3>
        <p className="mt-2 font-body text-base leading-relaxed text-brand-text-muted">
          {image.description}
        </p>
      </figcaption>
    </figure>
  );
}

function EvidenceSection({
  evidence,
}: Readonly<{
  evidence: NonNullable<CaseStudy["evidence"]>;
}>) {
  return (
    <section className="border-t border-brand-text/10 px-4 py-14 sm:px-6 md:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="font-body text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">
            {evidence.eyebrow}
          </p>
          <h2
            className="mt-3 font-display uppercase text-brand-text"
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              lineHeight: 0.95,
            }}
          >
            {evidence.title}
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-brand-text-muted md:text-xl">
            {evidence.description}
          </p>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {evidence.images.map((image, index) => (
            <EvidenceImage
              key={image.src}
              image={image}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaLinks({ links }: Readonly<{ links: CaseStudy["links"] }>) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
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
                <TypewriterText text={study.title} speedMs={75} />
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
        <p className="max-w-4xl font-body text-2xl leading-relaxed text-brand-text md:text-3xl">
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
        <div className="grid gap-4 md:grid-cols-2">
          {study.systemParts.map((part) => (
            <TextCard key={part.title} item={part} />
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Architecture" title="Monorepo Shape">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <pre className="overflow-x-auto rounded-lg border border-brand-text/10 bg-black/25 p-5 font-mono text-base leading-relaxed text-brand-text">
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

      {study.evidence ? <EvidenceSection evidence={study.evidence} /> : null}

      <SectionShell eyebrow="Scope" title="V1 Scope Control">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-brand-accent/25 bg-brand-accent/10 p-6">
            <h3 className="flex items-center gap-3 font-body text-2xl font-bold text-brand-text">
              <Layers3 className="h-6 w-6 text-brand-accent" aria-hidden="true" />
              Included in V1
            </h3>
            <div className="mt-5">
              <BulletList items={study.scope.included} />
            </div>
          </article>
          <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-6">
            <h3 className="flex items-center gap-3 font-body text-2xl font-bold text-brand-text">
              <Route className="h-6 w-6 text-brand-accent" aria-hidden="true" />
              Intentionally deferred
            </h3>
            <p className="mt-3 font-body text-base leading-relaxed text-brand-text-muted md:text-lg">
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
            <article key={phase.title} className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-6">
              <h3 className="flex items-center gap-3 font-body text-2xl font-bold text-brand-text">
                <GitBranch className="h-6 w-6 text-brand-accent" aria-hidden="true" />
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
        <div className="grid max-w-4xl gap-5">
          {study.reflection.map((item) => (
            <p key={item} className="font-body text-lg leading-relaxed text-brand-text-muted md:text-xl">
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
