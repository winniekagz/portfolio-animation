"use client";

import { cn } from "@/lib/utils";

interface ExperimentStageProps {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  revealed?: boolean;
}

export function ExperimentStage({
  eyebrow,
  title,
  children,
  className,
  revealed = true,
}: ExperimentStageProps) {
  return (
    <section
      className={cn(
        "px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16",
        "transition-all duration-500",
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none",
        className
      )}
      aria-hidden={!revealed}
    >
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mt-3 font-display text-xl font-semibold text-brand-text md:text-2xl">
            {title}
          </h2>
        )}
        <div className={cn(eyebrow || title ? "mt-6" : "")}>{children}</div>
      </div>
    </section>
  );
}
