import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-bg flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <FlaskConical
          className="mx-auto h-16 w-16 text-brand-accent/30"
          aria-hidden="true"
        />
        
        <h1 className="mt-6 font-display text-4xl font-semibold uppercase tracking-tight text-brand-text md:text-5xl">
          404
        </h1>
        
        <p className="mt-4 font-body text-lg text-brand-text-muted">
          This experiment doesn&apos;t exist yet—or maybe it got lost in a rabbit hole.
        </p>
        
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-5 py-3 font-mono text-sm font-medium uppercase tracking-wider text-brand-accent transition-colors hover:bg-brand-accent/20"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Labs
        </Link>
      </div>
    </main>
  );
}
