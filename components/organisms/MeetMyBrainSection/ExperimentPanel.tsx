"use client";

import { ArrowRight, X } from "lucide-react";
import type { ThoughtNode, ThoughtExperiment } from "@/lib/types";
import { categoryColors } from "@/lib/data/thought-graph";
import { cn } from "@/lib/utils";

interface ExperimentPanelProps {
  node: ThoughtNode;
  experiment: ThoughtExperiment;
  onClose: () => void;
}

export function ExperimentPanel({ node, experiment, onClose }: ExperimentPanelProps) {
  const colors = categoryColors[node.category];

  return (
    <div
      className="absolute bottom-4 left-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 sm:bottom-6 sm:left-auto sm:right-6 sm:w-96"
      role="dialog"
      aria-labelledby="experiment-title"
    >
      <div
        className={cn(
          "rounded-lg border bg-brand-surface/95 backdrop-blur-md",
          colors.border
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-brand-text/10 px-4 py-3">
          <div>
            <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-brand-accent">
              Experiment {experiment.number}
            </span>
            <h3
              id="experiment-title"
              className="mt-1 font-display text-lg font-semibold uppercase tracking-tight text-brand-text"
            >
              {experiment.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded p-1 text-brand-text-muted transition hover:bg-brand-text/10 hover:text-brand-text"
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 px-4 py-4">
          {/* Question */}
          <div>
            <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-brand-text-muted">
              Question
            </span>
            <p className="mt-1 font-body text-sm text-brand-text">
              {experiment.question}
            </p>
          </div>

          {/* Started here → Led to */}
          <div className="flex gap-4">
            <div className="flex-1">
              <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-brand-text-muted">
                Started here
              </span>
              <p className="mt-1 font-mono text-xs text-brand-text">
                {experiment.startedAt}
              </p>
            </div>
            <div className="flex-1">
              <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-brand-text-muted">
                Led me to
              </span>
              <p className="mt-1 font-mono text-xs text-brand-text">
                {experiment.ledTo.join(" → ")}
              </p>
            </div>
          </div>

          {/* Stack */}
          <div>
            <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-brand-text-muted">
              Built with
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {experiment.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-brand-text/20 bg-brand-text/5 px-2 py-0.5 font-mono text-[10px] text-brand-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quip */}
          {experiment.quip && (
            <p className="border-t border-brand-text/10 pt-3 font-mono text-xs italic text-brand-text-muted">
              &ldquo;{experiment.quip}&rdquo;
            </p>
          )}
        </div>

        {/* Footer - experiment link */}
        <div className="border-t border-brand-text/10 px-4 py-3">
          <a
            href={`/experiments/${experiment.slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-brand-accent transition hover:text-brand-accent-hover"
          >
            Open experiment
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Simpler panel for nodes without experiments
interface NodePanelProps {
  node: ThoughtNode;
  onClose: () => void;
}

export function NodePanel({ node, onClose }: NodePanelProps) {
  const colors = categoryColors[node.category];

  return (
    <div
      className="absolute bottom-4 left-4 right-4 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 sm:bottom-6 sm:left-auto sm:right-6 sm:w-80"
      role="dialog"
      aria-labelledby="node-title"
    >
      <div
        className={cn(
          "rounded-lg border bg-brand-surface/95 backdrop-blur-md",
          colors.border
        )}
      >
        <div className="flex items-start justify-between gap-3 px-4 py-3">
          <div>
            <span
              className={cn(
                "font-mono text-[10px] font-medium uppercase tracking-wider",
                colors.text
              )}
            >
              {node.category}
            </span>
            <h3
              id="node-title"
              className="mt-1 font-display text-base font-semibold uppercase tracking-tight text-brand-text"
            >
              {node.label}
            </h3>
            {node.description && (
              <p className="mt-2 font-body text-sm text-brand-text-muted">
                {node.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded p-1 text-brand-text-muted transition hover:bg-brand-text/10 hover:text-brand-text"
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Status indicator */}
        <div className="border-t border-brand-text/10 px-4 py-2.5">
          <span className="inline-flex items-center gap-2">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                node.status === "completed" && "bg-brand-accent",
                node.status === "exploring" && "animate-pulse bg-brand-secondary",
                node.status === "curious" && "bg-brand-text/40"
              )}
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-brand-text-muted">
              {node.status === "completed" && "Explored"}
              {node.status === "exploring" && "Currently exploring"}
              {node.status === "curious" && "Future rabbit hole"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
