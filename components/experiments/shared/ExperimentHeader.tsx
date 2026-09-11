"use client";

interface ExperimentHeaderProps {
  number: string;
  title: string;
  question: string;
  tags: string[];
  readingTime?: string;
}

export function ExperimentHeader({
  number,
  title,
  question,
  tags,
  readingTime = "~8 min",
}: ExperimentHeaderProps) {
  return (
    <header className="border-b border-brand-text/10 px-5 pb-10 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
            Experiment / {number}
          </p>
          <p className="font-mono text-xs text-brand-text-muted">{readingTime}</p>
        </div>

        <h1
          className="mt-6 max-w-3xl font-display font-semibold text-brand-text"
          style={{
            fontSize: "clamp(2.125rem, 4vw, 3rem)",
            lineHeight: 1.08,
          }}
        >
          {title}
        </h1>

        <p
          className="mt-6 max-w-2xl font-body font-medium text-brand-text"
          style={{
            fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
            lineHeight: 1.4,
          }}
        >
          {question}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {tags.map((tag, index) => (
            <span key={tag}>
              <span className="font-mono text-xs text-brand-text-muted">{tag}</span>
              {index < tags.length - 1 && (
                <span className="ml-2 text-brand-text-muted/40">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
