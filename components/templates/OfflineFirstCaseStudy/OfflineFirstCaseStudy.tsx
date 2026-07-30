"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const deps = ["Blocks", "Images", "Comments", "Mentions", "DB records", "Metadata"] as const;

const reasonLabels = {
  explicit: "Explicit download",
  recent: "Recent activity",
  inherited: "Inherited from parent",
} as const;

const principles = [
  {
    title: "Define the complete offline unit.",
    example: "A Notion page requires every record needed to render it.",
    question: "What exact data must exist locally before we can truthfully call this item available offline?",
  },
  {
    title: "Treat local persistence as product infrastructure.",
    example: "The SQLite cache became a durable, first-class store, not only a request-speed optimization.",
    question: "Is our local storage designed to be relied on, or only to speed up the next request?",
  },
  {
    title: "Store why derived state exists.",
    example: "Notion separates offline_page from offline_action so one result can have many causes.",
    question: "Where else do we collapse multiple causes into one boolean?",
  },
  {
    title: "Preserve independent causes during reconciliation.",
    example: "Removing one inherited reason must not remove a page held offline by another reason.",
    question: "Does our reconciliation logic replace state, or reconcile it?",
  },
  {
    title: "Design freshness and reconnection from the start.",
    example: "Push updates plus reconnection catch-up keep offline content current.",
    question: "What happens to our cached data after an hour offline? A day?",
  },
];

const problemSolutionPairs = [
  {
    problemTitle: "Best-effort cache",
    problem:
      "Notion already had a local SQLite cache, but cached data could be evicted, incomplete, or missing the records needed to render a page.",
    solutionTitle: "Explicit offline guarantee",
    solution:
      "Offline mode had to define the full page dependency graph and persist the required records deliberately, not hope the cache still had them.",
  },
  {
    problemTitle: "Single boolean state",
    problem:
      "A page can be offline for multiple reasons: explicit download, recent activity, or inherited availability from a parent page.",
    solutionTitle: "Provenance model",
    solution:
      "Notion separated the derived result from the cause: offline_page represents availability, while offline_action stores why that availability exists.",
  },
  {
    problemTitle: "Changing hierarchy",
    problem:
      "Pages move between parents and databases. A child can lose one inherited offline reason while still needing to preserve another independent reason.",
    solutionTitle: "Offline forest reconciliation",
    solution:
      "Hierarchy changes are reconciled as insert/delete operations so stale inherited reasons are removed without deleting valid independent intent.",
  },
  {
    problemTitle: "Stale offline content",
    problem:
      "Downloading a page once does not keep it trustworthy. Users can go offline, reconnect later, and expect the page to reflect newer server state.",
    solutionTitle: "Freshness and reconnect loop",
    solution:
      "Push updates while connected and catch-up after reconnection keep local storage aligned with server changes.",
  },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-brand-accent/15 px-3 py-1 font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-accent">
      {children}
    </span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-b border-brand-text/12 px-5 py-14 sm:px-8 md:px-10 lg:px-14 lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <Tag>{eyebrow}</Tag>
          <h2
            className="mt-5 font-display uppercase text-brand-text"
            style={{ fontSize: "clamp(2.4rem, 6vw, 6rem)", lineHeight: 0.92 }}
          >
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function LightCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg bg-brand-text p-6 text-brand-bg">{children}</div>;
}

function ProblemSolutionSection() {
  return (
    <section
      id="problem-solution"
      className="border-b border-brand-text/12 px-5 py-14 sm:px-8 md:px-10 lg:px-14 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 border-b border-brand-accent/60 pb-5 md:grid-cols-2 md:gap-8">
          <div>
            <p
              className="font-display uppercase text-brand-text"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.85 }}
            >
              Problem
            </p>
          </div>
          <div>
            <p
              className="font-display uppercase text-brand-text"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.85 }}
            >
              Solution
            </p>
          </div>
        </div>

        <div className="grid gap-5 pt-8 md:grid-cols-2 md:gap-8">
          <div className="grid gap-4">
            {problemSolutionPairs.map((item, index) => (
              <article
                key={item.problemTitle}
                className="grid grid-cols-[4rem_1fr] gap-4 rounded-lg border border-brand-text/18 bg-brand-surface/55 p-5"
              >
                <span className="font-display text-6xl leading-none text-brand-text/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-body text-body font-bold uppercase leading-h3 text-brand-text">
                    {item.problemTitle}
                  </h3>
                  <p className="mt-2 font-body text-body leading-body text-brand-text-muted">
                    {item.problem}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-4">
            {problemSolutionPairs.map((item, index) => (
              <article
                key={item.solutionTitle}
                className="grid grid-cols-[4rem_1fr] gap-4 rounded-lg bg-brand-accent p-5 text-brand-bg"
              >
                <span className="font-display text-6xl leading-none text-brand-bg/85">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-body text-body font-bold uppercase leading-h3">
                    {item.solutionTitle}
                  </h3>
                  <p className="mt-2 font-body text-body leading-body text-brand-bg/80">
                    {item.solution}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OfflineFirstCaseStudy() {
  const [presentDeps, setPresentDeps] = useState<Record<(typeof deps)[number], boolean>>({
    Blocks: true,
    Images: true,
    Comments: false,
    Mentions: true,
    "DB records": false,
    Metadata: true,
  });
  const [reasons, setReasons] = useState({
    explicit: true,
    recent: true,
    inherited: false,
  });
  const [moved, setMoved] = useState(false);

  const missingCount = Object.values(presentDeps).filter((present) => !present).length;
  const renderStatus = missingCount === 0 ? "fully renders" : missingCount <= 2 ? "partially renders" : "fails to render";
  const activeReasons = useMemo(
    () =>
      Object.entries(reasons)
        .filter(([, active]) => active)
        .map(([key]) => reasonLabels[key as keyof typeof reasonLabels]),
    [reasons],
  );

  return (
    <article className="bg-brand-bg text-brand-text">
      <header className="border-b border-brand-text/12 px-5 py-14 sm:px-8 md:px-10 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-[0.16em] text-brand-text-muted transition hover:text-brand-accent"
          >
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
            Projects
          </Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Tag>Independent Engineering Analysis</Tag>
                <span className="font-mono text-xs text-brand-text-muted/65">~9 min read</span>
              </div>
              <h1
                className="mt-8 max-w-4xl font-display text-brand-text"
                style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)", lineHeight: 0.9 }}
              >
                Caching a page is not the same as making it available offline.
              </h1>
              <p className="mt-7 max-w-[66ch] font-body text-body leading-body text-brand-text-muted">
                A Notion-focused architecture study on how a best-effort local cache becomes a persistent offline system with dependency guarantees, provenance, hierarchy reconciliation, and freshness.
              </p>
              <p className="mt-8 max-w-[66ch] font-body text-small leading-small text-brand-text-muted">
                Source:{" "}
                <a
                  href="https://www.notion.com/blog/how-we-made-notion-available-offline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent underline-offset-4 hover:underline"
                >
                  Notion Engineering, &quot;How we made Notion available offline&quot;
                </a>
                . Independent analysis, not affiliated with Notion.
              </p>
            </div>
            <LightCard>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-bg/65">
                Product requirement
              </p>
              <ul className="mt-5 grid gap-3 font-body text-body leading-body">
                {[
                  "Fully render the page offline",
                  "Preserve required dependencies",
                  "Keep offline content current",
                  "Explain why the page is offline",
                  "Reconcile correctly after hierarchy changes",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </LightCard>
          </div>
        </div>
      </header>

      <ProblemSolutionSection />

      <Section id="cache" eyebrow="Notion's approach" title="Cache vs guarantee">
        <p className="max-w-[66ch] font-body text-body leading-body text-brand-text-muted">
          Notion already had a SQLite cache, but the article makes the important distinction: a cache can contain records without guaranteeing which records are present, how long they remain, or whether every dependency required to render a page exists locally. A page is a graph: blocks, images, comments, mentions, database records, metadata, and permission-sensitive state.
        </p>
        <div className="mt-8 rounded-lg border border-brand-text/14 bg-brand-surface p-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-text-muted/65">
            Dependency graph demo
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {deps.map((dep) => {
              const present = presentDeps[dep];
              return (
                <button
                  key={dep}
                  type="button"
                  onClick={() => setPresentDeps((state) => ({ ...state, [dep]: !state[dep] }))}
                  className={[
                    "rounded-full border px-3 py-1.5 font-body text-small font-bold transition",
                    present
                      ? "border-brand-accent/40 bg-brand-accent/15 text-brand-accent"
                      : "border-brand-text/16 text-brand-text-muted/65",
                  ].join(" ")}
                >
                  {dep}
                </button>
              );
            })}
          </div>
          <div className="mt-5 rounded-md border border-brand-text/14 bg-brand-text/5 p-4">
            <p className="font-body text-body leading-body text-brand-text-muted">
              Page status: <strong className="text-brand-text">{renderStatus}</strong>
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-2xl border-l-2 border-brand-accent pl-5 font-body text-lg font-bold leading-relaxed text-brand-text">
          Caching describes what happens to be local. Offline availability defines what must be local.
        </p>
      </Section>

      <Section id="reasons" eyebrow="Notion's approach" title="offline_page / offline_action">
        <p className="max-w-[66ch] font-body text-body leading-body text-brand-text-muted">
          A set like <code className="font-mono text-brand-accent">offline_pages = {"{ Page A, Page B }"}</code> breaks when one page has multiple reasons to be offline. If Page X is both explicitly downloaded and retained because of recent activity, removing the explicit toggle should not remove the page from offline availability.
        </p>
        <div className="mt-8 grid gap-5 rounded-lg border border-brand-text/14 bg-brand-surface p-5 md:grid-cols-[240px_1fr]">
          <div className="grid gap-2">
            {(Object.keys(reasonLabels) as Array<keyof typeof reasonLabels>).map((key) => {
              const active = reasons[key];
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setReasons((state) => ({ ...state, [key]: !state[key] }))}
                  className={[
                    "flex items-center justify-between rounded-md border px-3 py-2 text-left font-body text-small transition",
                    active
                      ? "border-brand-accent/40 bg-brand-accent/15 text-brand-accent"
                      : "border-brand-text/14 text-brand-text-muted",
                  ].join(" ")}
                >
                  <span>{reasonLabels[key]}</span>
                  <span className="font-mono text-xs">{active ? "ON" : "off"}</span>
                </button>
              );
            })}
          </div>
          <LightCard>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-bg/65">offline_page</p>
            <p className="mt-2 font-body text-body font-bold leading-body">
              Page X: {activeReasons.length > 0 ? "offline" : "not offline"}
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-brand-bg/65">offline_action</p>
            <div className="mt-2 grid gap-1 font-body text-body leading-body">
              {activeReasons.length > 0 ? (
                activeReasons.map((reason) => <p key={reason}>Page X {"->"} {reason}</p>)
              ) : (
                <p className="text-brand-bg/65">(none - page leaves the offline set)</p>
              )}
            </div>
          </LightCard>
        </div>
        <p className="mt-8 max-w-2xl border-l-2 border-brand-accent pl-5 font-body text-lg font-bold leading-relaxed text-brand-text">
          Store provenance when you need to safely derive and reverse state.
        </p>
      </Section>

      <Section id="forest" eyebrow="Notion's approach" title="Offline forest">
        <p className="max-w-[66ch] font-body text-body leading-body text-brand-text-muted">
          Inherited availability turns offline pages into a forest. Pages move between parents, database entries appear and disappear, and descendants can be held offline by inherited and independent reasons at the same time. Reconciliation must add missing inherited reasons, remove stale ones, and preserve independent intent.
        </p>
        <div className="mt-8 rounded-lg border border-brand-text/14 bg-brand-surface p-5">
          <pre className="overflow-x-auto font-mono text-small leading-8 text-brand-text-muted">
{`Workspace
  -> Product database
      -> Roadmap
      -> Architecture review (independent: favorited)
      -> Launch plan`}
          </pre>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setMoved(true)}
              className="rounded-sm bg-brand-text px-4 py-2 font-body text-small font-bold text-brand-bg"
            >
              Move &quot;Launch plan&quot; out
            </button>
            <button
              type="button"
              onClick={() => setMoved(false)}
              className="rounded-sm border border-brand-text/16 px-4 py-2 font-body text-small font-bold text-brand-text-muted"
            >
              Reset
            </button>
          </div>
          <div className="mt-5 rounded-md bg-brand-text/5 p-4 font-mono text-xs leading-6">
            {moved ? (
              <>
                <p className="text-brand-accent">INSERT offline_action (Launch plan {"->"} explicit) - preserved as independent</p>
                <p className="text-brand-accent">DELETE offline_action (Launch plan {"->"} inherited from Product database)</p>
              </>
            ) : (
              <p className="text-brand-text-muted/65">No reconciliation operations yet.</p>
            )}
          </div>
        </div>
        <p className="mt-8 max-w-2xl border-l-2 border-brand-accent pl-5 font-body text-lg font-bold leading-relaxed text-brand-text">
          Hierarchical derived state requires reconciliation, not blind replacement.
        </p>
      </Section>

      <Section id="freshness" eyebrow="Notion's approach" title="Freshness after download">
        <p className="max-w-[66ch] font-body text-body leading-body text-brand-text-muted">
          Downloading once is not enough. A trustworthy offline system has to stay current while connected and catch up after reconnection. Otherwise the product gives users stale local data while still implying confidence.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-brand-text/14 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-accent">While connected</p>
            <p className="mt-3 font-body text-body leading-body text-brand-text-muted">
              Server change {"->"} notification {"->"} affected data fetched {"->"} local storage updated.
            </p>
          </div>
          <div className="rounded-lg border border-brand-text/14 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-accent">After reconnection</p>
            <p className="mt-3 font-body text-body leading-body text-brand-text-muted">
              Client reconnects {"->"} compares known state or timestamps {"->"} downloads newer records {"->"} restores consistency.
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-2xl border-l-2 border-brand-accent pl-5 font-body text-lg font-bold leading-relaxed text-brand-text">
          Persistence makes data available. Synchronization keeps it trustworthy.
        </p>
      </Section>

      <Section id="principles" eyebrow="Engineering principles" title="What Notion teaches">
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <article key={principle.title} className="rounded-lg border border-brand-text/14 bg-brand-surface p-5">
              <h3 className="font-body text-base font-bold text-brand-text">{principle.title}</h3>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-brand-accent">Notion example</p>
              <p className="mt-2 font-body text-body leading-body text-brand-text-muted">{principle.example}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-brand-accent">Ask your team</p>
              <p className="mt-2 font-body text-body leading-body text-brand-text-muted">{principle.question}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="px-5 py-16 sm:px-8 md:px-10 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-5xl uppercase text-brand-text md:text-7xl">
            What I learned
          </h2>
          <ul className="mt-8 grid max-w-[66ch] gap-3 font-body text-body leading-body text-brand-text-muted">
            {[
              "Product guarantees shape data models.",
              "Local storage is only the beginning.",
              "Provenance makes derived state reversible.",
              "Reconciliation must preserve valid intent.",
              "Offline-first is a product and backend commitment, not just a frontend feature.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[66ch] border-t border-brand-text/12 pt-6 font-body text-small leading-small text-brand-text-muted">
            Independent architectural analysis. Not affiliated with, endorsed by, or representing Notion Labs, Inc.
          </p>
        </div>
      </section>
    </article>
  );
}
