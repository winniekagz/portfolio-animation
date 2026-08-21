import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  architectureFlow,
  capabilities,
  currentStatus,
  decisions,
  docs,
  evidence,
  flowNext,
  flowToday,
  hero,
  links,
  problems,
  type CapabilityItem,
  type Decision,
  type DocCard as DocCardData,
  type EvidenceItem,
  type FlowStep,
  type Status,
} from "@/lib/data/componentiq-product";
import { ProductNav } from "./ProductNav";

function StatusBadge({ status }: Readonly<{ status: Status }>) {
  const isAvailable = status === "available";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-body text-[0.7rem] font-bold uppercase tracking-[0.1em]",
        isAvailable
          ? "border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary"
          : "border-brand-text/15 bg-brand-text/[0.04] text-brand-text-muted"
      )}
    >
      {isAvailable ? <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> : <Clock className="h-3 w-3" aria-hidden="true" />}
      {isAvailable ? "Available" : "Planned"}
    </span>
  );
}

function ProductSection({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}>) {
  return (
    <section id={id} className="scroll-mt-36 border-t border-brand-text/10 px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.6fr]">
        <div>
          <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-brand-accent">{eyebrow}</p>
          <h2
            className="mt-3 font-display text-brand-text"
            style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--leading-h2)", letterSpacing: "var(--tracking-h2)" }}
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-4 font-body text-sm leading-relaxed text-brand-text-muted">{subtitle}</p>
          ) : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function ProblemCard({ item }: Readonly<{ item: (typeof problems)[number] }>) {
  return (
    <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5">
      <h3 className="font-body text-base font-bold text-brand-text">{item.label}</h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-brand-text-muted">{item.description}</p>
    </article>
  );
}

function FlowList({ steps, variant }: Readonly<{ steps: FlowStep[]; variant: "today" | "next" }>) {
  const isToday = variant === "today";
  return (
    <ol className="grid gap-3 lg:grid-cols-3">
      {steps.map((step, index) => {
        const content = (
          <>
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                isToday ? "bg-brand-accent/15 text-brand-accent" : "bg-brand-text/[0.06] text-brand-text-muted"
              )}
            >
              {index + 1}
            </span>
            <span className="pt-0.5">
              <span className="block font-body text-sm font-bold text-brand-text">{step.title}</span>
              <span className="mt-1 block font-body text-sm leading-relaxed text-brand-text-muted">{step.description}</span>
            </span>
          </>
        );
        return (
          <li
            key={step.title}
            className={cn(
              "flex gap-3 rounded-lg border p-4",
              isToday ? "border-brand-text/10 bg-brand-surface/70" : "border-dashed border-brand-text/15 bg-transparent"
            )}
          >
            {step.href ? (
              <a
                href={step.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ol>
  );
}

function FeatureCard({ item }: Readonly<{ item: CapabilityItem }>) {
  const cardClassName = cn(
    "flex flex-col gap-3 rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5 transition-colors",
    item.href && "hover:border-brand-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
  );
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-body text-sm font-bold text-brand-text">{item.label}</h4>
        <StatusBadge status={item.status} />
      </div>
      <p className="font-body text-sm leading-relaxed text-brand-text-muted">{item.description}</p>
    </>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
        {content}
      </a>
    );
  }

  return <div className={cardClassName}>{content}</div>;
}

function DecisionCard({ decision }: Readonly<{ decision: Decision }>) {
  return (
    <article className="rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-body text-lg font-bold text-brand-text">{decision.title}</h3>
        <StatusBadge status={decision.phase} />
      </div>
      <dl className="mt-5 grid gap-4 font-body text-sm leading-relaxed">
        <div>
          <dt className="font-bold text-brand-text">Problem</dt>
          <dd className="mt-1 text-brand-text-muted">{decision.problem}</dd>
        </div>
        <div>
          <dt className="font-bold text-brand-text">Decision</dt>
          <dd className="mt-1 text-brand-text-muted">{decision.decision}</dd>
        </div>
        <div>
          <dt className="font-bold text-brand-text">Tradeoff</dt>
          <dd className="mt-1 text-brand-text-muted">{decision.tradeoff}</dd>
        </div>
        <div>
          <dt className="font-bold text-brand-text">Benefit</dt>
          <dd className="mt-1 text-brand-text-muted">{decision.benefit}</dd>
        </div>
      </dl>
    </article>
  );
}

function ArchitectureList() {
  return (
    <ol aria-label="Architecture flow, in order" className="grid gap-0">
      {architectureFlow.map((node, index) => (
        <li key={node.label} className="relative pb-6 pl-8 last:pb-0">
          {index < architectureFlow.length - 1 && (
            <span aria-hidden="true" className="absolute left-[9px] top-6 h-full w-px bg-brand-text/15" />
          )}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-1 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2",
              node.status === "available" ? "border-brand-secondary bg-brand-secondary/20" : "border-brand-text/25 bg-transparent"
            )}
          />
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-body text-base font-bold text-brand-text">{node.label}</span>
            <StatusBadge status={node.status} />
          </div>
          <p className="mt-1 font-body text-sm text-brand-text-muted">{node.note}</p>
        </li>
      ))}
    </ol>
  );
}

function DocCard({ item }: Readonly<{ item: DocCardData }>) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 rounded-lg border border-brand-text/10 bg-brand-surface/70 p-5 transition-colors hover:border-brand-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
    >
      <span className="flex items-center justify-between gap-2 font-body text-sm font-bold text-brand-text">
        {item.title}
        <ExternalLink className="h-4 w-4 shrink-0 text-brand-text-muted" aria-hidden="true" />
      </span>
      <span className="font-body text-sm leading-relaxed text-brand-text-muted">{item.description}</span>
    </a>
  );
}

function EvidenceCard({ item }: Readonly<{ item: EvidenceItem }>) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col overflow-hidden rounded-lg border border-brand-text/10 bg-brand-surface/70 transition-colors hover:border-brand-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
    >
      {item.image ? (
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={1920}
          height={1080}
          className="h-auto w-full border-b border-brand-text/10"
        />
      ) : null}
      <span className="flex flex-col gap-2 p-5">
        <span className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 font-body text-sm font-bold text-brand-text">
            {item.title}
            <ExternalLink className="h-4 w-4 shrink-0 text-brand-text-muted" aria-hidden="true" />
          </span>
          <StatusBadge status={item.status} />
        </span>
        <span className="font-body text-sm leading-relaxed text-brand-text-muted">{item.description}</span>
      </span>
    </a>
  );
}

function CtaLink({
  href,
  label,
  variant = "secondary",
}: Readonly<{ href: string; label: string; variant?: "primary" | "secondary" }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-5 py-3 font-body text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
        variant === "primary"
          ? "border-brand-accent bg-brand-accent text-brand-bg hover:bg-brand-accent-hover hover:border-brand-accent-hover"
          : "border-brand-text/20 text-brand-text hover:border-brand-accent hover:bg-brand-accent hover:text-brand-bg"
      )}
    >
      {label}
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function StatusPill({ label, status }: Readonly<{ label: string; status: Status }>) {
  return (
    <li>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-body text-xs font-bold uppercase tracking-[0.1em]",
          status === "available"
            ? "border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary"
            : "border-brand-text/15 bg-brand-text/[0.04] text-brand-text-muted"
        )}
      >
        {status === "available" ? <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> : <Clock className="h-3 w-3" aria-hidden="true" />}
        {label}
      </span>
    </li>
  );
}

export function ComponentIQProductTemplate() {
  return (
    <article className="bg-brand-bg text-brand-text">
      <header className="px-5 pb-10 pt-16 sm:px-8 md:px-12 lg:px-16 lg:pb-14 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">{hero.eyebrow}</p>
          <h1
            className="mt-4 font-display text-brand-text"
            style={{ fontSize: "var(--font-size-display)", lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }}
          >
            {hero.title}
          </h1>
          <p className="mt-2 font-body text-lg font-bold text-brand-text-muted md:text-xl">{hero.subtitle}</p>
          <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-brand-text-muted">{hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href={links.deployment} label="Open Live Deployment" variant="primary" />
            <CtaLink href={links.storybookConfigureProject} label="Explore Documentation" />
            <CtaLink href={links.storybook} label="View Storybook" />
            <CtaLink href={links.npm} label="View Package" />
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View ComponentIQ on GitHub"
              className="inline-flex items-center gap-2 rounded-full border border-brand-text/20 p-3 text-brand-text transition hover:border-brand-accent hover:bg-brand-accent hover:text-brand-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <ProductNav />

      <ProductSection
        id="overview"
        eyebrow="Problem"
        title="Why Design Systems Become Hard To Maintain"
        subtitle="The same six failure modes show up on almost every frontend team, in almost every codebase."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {problems.map((item) => (
            <ProblemCard key={item.label} item={item} />
          ))}
        </div>
      </ProductSection>

      <ProductSection
        id="how-it-works"
        eyebrow="How It Works"
        title="Today: Configure, Then Build"
        subtitle="The real onboarding flow, as documented in Storybook right now."
      >
        <FlowList steps={flowToday} variant="today" />
      </ProductSection>

      <section className="border-t border-brand-text/10 px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-brand-text-muted">Next: Import, Then Audit</p>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-brand-text-muted">
            This workflow does not exist yet. It is the reason the configuration layer above was built first.
          </p>
          <div className="mt-6">
            <FlowList steps={flowNext} variant="next" />
          </div>
        </div>
      </section>

      <ProductSection
        id="capabilities"
        eyebrow="Capabilities"
        title="Configuration, Analysis, Developer Experience"
      >
        <div className="grid gap-10">
          {capabilities.map((group) => (
            <div key={group.title}>
              <h3 className="font-body text-sm font-bold uppercase tracking-[0.14em] text-brand-text-muted">{group.title}</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <FeatureCard key={item.label} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ProductSection>

      <ProductSection
        id="decisions"
        eyebrow="Engineering Decisions"
        title="Why It's Built This Way"
        subtitle="Every decision here traded something away on purpose."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {decisions.map((decision) => (
            <DecisionCard key={decision.title} decision={decision} />
          ))}
        </div>
      </ProductSection>

      <ProductSection
        id="architecture"
        eyebrow="Architecture"
        title="System Overview"
        subtitle="An overview only — token and provider internals are documented in Storybook; repository and analysis internals don't exist yet."
      >
        <ArchitectureList />
      </ProductSection>

      <ProductSection
        id="documentation"
        eyebrow="Documentation"
        title="Start Here"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {docs.map((item) => (
            <DocCard key={item.title} item={item} />
          ))}
        </div>
      </ProductSection>

      <ProductSection
        id="evidence"
        eyebrow="Evidence"
        title="Shipped, Not Mocked"
        subtitle="Real product screens, opened in a new tab — including one honestly labeled local build, never a mockup standing in for something that doesn't exist yet."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {evidence.map((item) => (
            <EvidenceCard key={item.title} item={item} />
          ))}
        </div>
      </ProductSection>

      <ProductSection
        id="package"
        eyebrow="Package"
        title="Install ComponentIQ"
      >
        <div className="grid gap-5">
          <pre className="overflow-x-auto rounded-lg border border-brand-text/10 bg-black/25 p-5 font-mono text-sm leading-relaxed text-brand-text">
            <code>npm install componentiq</code>
          </pre>
          <ul className="flex flex-wrap gap-2" aria-label="Package details">
            {["TypeScript-first", "React component library", "npm registry"].map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-brand-text/15 bg-brand-text/[0.04] px-3 py-1.5 font-body text-xs font-bold uppercase tracking-[0.1em] text-brand-text-muted"
              >
                {badge}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <CtaLink href={links.deployment} label="Open Deployment" variant="primary" />
            <CtaLink href={links.npm} label="View on npm" />
            <CtaLink href={links.storybook} label="View Storybook" />
            <CtaLink href={links.github} label="View on GitHub" />
          </div>
        </div>
      </ProductSection>

      <ProductSection
        id="roadmap"
        eyebrow="Current Status"
        title="Current vs. Next"
        subtitle="Nothing below the line exists yet — this section exists so it stays that way until it's true."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-body text-sm font-bold uppercase tracking-[0.14em] text-brand-text-muted">Current</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {currentStatus.current.map((label) => (
                <StatusPill key={label} label={label} status="available" />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-body text-sm font-bold uppercase tracking-[0.14em] text-brand-text-muted">Next</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {currentStatus.next.map((label) => (
                <StatusPill key={label} label={label} status="planned" />
              ))}
            </ul>
          </div>
        </div>
      </ProductSection>

      <section className="border-t border-brand-text/10 px-5 py-16 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-lg border border-brand-text/10 bg-brand-surface/70 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-body text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">Get Started</p>
            <h2 className="mt-2 font-display text-brand-text" style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--leading-h2)" }}>
              Explore ComponentIQ
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CtaLink href={links.deployment} label="Open Live Deployment" variant="primary" />
            <CtaLink href={links.storybookConfigureProject} label="Explore Documentation" />
            <CtaLink href={links.storybook} label="View Storybook" />
            <CtaLink href={links.npm} label="View Package" />
            <Link
              href="/projects/componentiq"
              className="font-body text-sm font-bold text-brand-text-muted underline decoration-brand-text/30 underline-offset-4 transition hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              Read the build story
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
