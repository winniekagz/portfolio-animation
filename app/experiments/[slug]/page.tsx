import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FlaskConical, Clock } from "lucide-react";
import { getExperimentBySlug, experiments } from "@/lib/data/thought-graph";
import { RateLimitingExperiment } from "@/components/experiments/rate-limiting";

// Map of implemented experiment components
const experimentComponents: Record<string, React.ComponentType> = {
  "rate-limiting": RateLimitingExperiment,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);

  if (!experiment) {
    return {
      title: "Experiment Not Found",
      robots: { index: false, follow: false },
    };
  }

  const isImplemented = slug in experimentComponents;
  const canonicalUrl = `https://labs.winfredkagendo.com/experiments/${slug}`;

  return {
    title: isImplemented
      ? experiment.title
      : `Coming Soon: ${experiment.title}`,
    description: experiment.quip || experiment.question,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: isImplemented
        ? `${experiment.title} | Winfred Kagendo Labs`
        : `Coming Soon: ${experiment.title} | Winfred Kagendo Labs`,
      description: experiment.quip || experiment.question,
      url: canonicalUrl,
      type: "article",
      authors: ["Winfred Kagendo"],
    },
    twitter: {
      card: "summary_large_image",
      title: experiment.title,
      description: experiment.question,
    },
    // Don't index "coming soon" pages heavily
    robots: isImplemented
      ? { index: true, follow: true }
      : { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  return experiments.map((exp) => ({ slug: exp.slug }));
}

export default async function ExperimentPage({ params }: Props) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);

  // Unknown experiment - 404
  if (!experiment) {
    notFound();
  }

  // Check if experiment has an implemented component
  const ExperimentComponent = experimentComponents[slug];

  // Experiment exists in data but not implemented yet - Coming Soon
  if (!ExperimentComponent) {
    return <ComingSoon experiment={experiment} />;
  }

  // Render the implemented experiment
  return <ExperimentComponent />;
}

// Coming Soon component for planned experiments
function ComingSoon({
  experiment,
}: {
  experiment: NonNullable<ReturnType<typeof getExperimentBySlug>>;
}) {
  return (
    <main className="min-h-screen bg-brand-bg">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 md:px-12 md:py-20">
        {/* Back link */}
        <Link
          href="/projects#labs"
          className="group mb-8 inline-flex items-center gap-2 font-mono text-sm text-brand-text-muted transition-colors hover:text-brand-accent"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Back to Labs
        </Link>

        {/* Coming Soon Card */}
        <div className="rounded-xl border border-brand-accent/20 bg-brand-surface p-8 md:p-12">
          {/* Status badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-secondary/30 bg-brand-secondary/10 px-3 py-1.5">
            <Clock className="h-3.5 w-3.5 text-brand-secondary" aria-hidden="true" />
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-brand-secondary">
              Coming Soon
            </span>
          </div>

          {/* Experiment number */}
          <p className="font-mono text-sm text-brand-text-muted">
            Experiment #{experiment.number}
          </p>

          {/* Title */}
          <h1 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight text-brand-text md:text-4xl">
            {experiment.title}
          </h1>

          {/* Question */}
          <p className="mt-4 font-body text-lg text-brand-text-muted md:text-xl">
            &ldquo;{experiment.question}&rdquo;
          </p>

          {/* Quip */}
          {experiment.quip && (
            <p className="mt-6 font-mono text-sm italic text-brand-accent/80">
              {experiment.quip}
            </p>
          )}

          {/* Divider */}
          <hr className="my-8 border-brand-text/10" />

          {/* What I'm exploring */}
          <div className="space-y-4">
            <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
              What I&apos;m exploring
            </h2>

            <div className="flex flex-wrap gap-2">
              {experiment.ledTo.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-brand-text/10 bg-brand-bg px-3 py-1 font-mono text-xs text-brand-text-muted"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Stack */}
          {experiment.stack && experiment.stack.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-brand-text-muted">
                Tech stack
              </h2>

              <div className="flex flex-wrap gap-2">
                {experiment.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-3 py-1 font-mono text-xs text-brand-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Icon decoration */}
          <div className="mt-8 flex justify-center">
            <FlaskConical
              className="h-16 w-16 text-brand-text/10"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
