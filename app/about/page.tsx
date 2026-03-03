/**
 * About page – stack entry for /about.
 */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 md:px-12 lg:px-20">
      <h1 className="font-display text-display leading-display text-foreground tracking-tight">
        About
      </h1>
      <p className="mt-4 max-w-[65ch] font-body text-body text-muted-foreground leading-body">
        Portrait and bio. (Stack page – slides up over previous.)
      </p>
    </main>
  );
}
