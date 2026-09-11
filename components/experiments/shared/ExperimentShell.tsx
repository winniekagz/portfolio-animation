"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ExperimentShellProps {
  children: React.ReactNode;
}

export function ExperimentShell({ children }: ExperimentShellProps) {
  return (
    <article className="min-h-screen bg-brand-bg text-brand-text">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 md:px-12 lg:px-16">
        <Link
          href="/projects#labs"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-brand-text-muted transition-colors hover:text-brand-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Labs
        </Link>
      </div>
      {children}
    </article>
  );
}
