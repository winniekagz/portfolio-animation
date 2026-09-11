"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RabbitHoleTrailProps {
  nextQuestion: string;
  concepts: string[];
  href?: string;
}

export function RabbitHoleTrail({ nextQuestion, concepts, href = "#" }: RabbitHoleTrailProps) {
  return (
    <div className="rounded-lg border border-brand-text/10 bg-brand-surface p-6 md:p-8">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
        And now I have another question.
      </p>

      <p className="mt-4 font-body text-lg font-medium leading-relaxed text-brand-text md:text-xl">
        {nextQuestion}
      </p>

      <div className="mt-6 border-t border-brand-text/10 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          {concepts.map((concept, index) => (
            <span key={concept} className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-md border px-3 py-1.5 font-mono text-xs",
                  index === 0
                    ? "border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
                    : "border-brand-text/15 text-brand-text-muted"
                )}
              >
                {concept}
              </span>
              {index < concepts.length - 1 && (
                <ArrowRight className="h-3 w-3 text-brand-text-muted/50" aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-brand-accent transition-colors hover:text-brand-accent-hover"
      >
        Follow this rabbit hole
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
