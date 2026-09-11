"use client";

import { useState, useCallback, useMemo } from "react";
import { ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import type { ThoughtNode as ThoughtNodeType, ThoughtStatus } from "@/lib/types";
import {
  allNodes,
  categoryColors,
  getExperimentBySlug,
  rabbitHoles,
} from "@/lib/data/thought-graph";
import { cn } from "@/lib/utils";

interface ThoughtTreeProps {
  selectedRabbitHole: string;
}

const statusIndicator: Record<ThoughtStatus, { dot: string; label: string }> = {
  completed: { dot: "bg-brand-accent", label: "Explored" },
  exploring: { dot: "bg-brand-secondary animate-pulse", label: "Exploring" },
  curious: { dot: "bg-brand-text/40", label: "Future" },
};

export function ThoughtTree({ selectedRabbitHole }: ThoughtTreeProps) {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  // Get current rabbit hole and its nodes
  const currentHole = useMemo(
    () => rabbitHoles.find((h) => h.id === selectedRabbitHole) || rabbitHoles[0],
    [selectedRabbitHole]
  );

  const pathNodes = useMemo(() => {
    return currentHole.nodeIds
      .map((id) => allNodes.find((n) => n.id === id))
      .filter((n): n is ThoughtNodeType => n !== undefined);
  }, [currentHole]);

  const handleToggle = useCallback((nodeId: string) => {
    setExpandedNode((prev) => (prev === nodeId ? null : nodeId));
  }, []);

  return (
    <div className="mx-auto max-w-lg px-4">
      {/* Path header */}
      <div className="mb-4 rounded-lg border border-brand-accent/20 bg-brand-surface/30 p-3">
        <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-brand-accent">
          Following the thread
        </span>
        <p className="mt-1 font-display text-sm font-semibold text-brand-text">
          {currentHole.label}
        </p>
      </div>

      {/* Linear path through nodes */}
      <div className="relative space-y-1">
        {/* Connecting line */}
        <div className="absolute left-4.5 top-4 bottom-4 w-px bg-linear-to-b from-brand-accent/40 via-brand-accent/20 to-transparent" />

        {pathNodes.map((node, index) => {
          const colors = categoryColors[node.category];
          const status = statusIndicator[node.status];
          const experiment = node.experimentSlug ? getExperimentBySlug(node.experimentSlug) : null;
          const isExpanded = expandedNode === node.id;
          const isFirst = index === 0;
          const isLast = index === pathNodes.length - 1;

          return (
            <div key={node.id} className="relative">
              {/* Node */}
              <button
                onClick={() => handleToggle(node.id)}
                className={cn(
                  "group flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  "hover:bg-brand-surface/50",
                  isExpanded && "bg-brand-surface/30"
                )}
                aria-expanded={isExpanded}
              >
                {/* Step indicator */}
                <div className={cn(
                  "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
                  isFirst ? "border-brand-accent bg-brand-accent/20" :
                  isLast ? "border-brand-text/30 bg-brand-surface" :
                  "border-brand-accent/40 bg-brand-surface"
                )}>
                  <span className={cn(
                    "font-mono text-[10px] font-bold",
                    isFirst ? "text-brand-accent" : "text-brand-text-muted"
                  )}>
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-mono text-sm font-medium", colors.text)}>
                      {node.label}
                    </span>
                    <span
                      className={cn("h-1.5 w-1.5 shrink-0 rounded-full", status.dot)}
                      title={status.label}
                    />
                    {experiment && (
                      <span className="rounded-full bg-brand-secondary/20 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-brand-secondary">
                        {experiment.number}
                      </span>
                    )}
                  </div>

                  {/* Arrow indicator */}
                  {!isLast && (
                    <div className="mt-1 flex items-center gap-1 text-brand-text-muted/50">
                      <ChevronDown className="h-3 w-3" />
                      <span className="font-mono text-[9px]">leads to</span>
                    </div>
                  )}
                </div>

                {/* Expand indicator */}
                <ChevronRight
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0 text-brand-text-muted/50 transition-transform",
                    isExpanded && "rotate-90"
                  )}
                />
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="ml-10 mt-1 mb-2 rounded-lg border border-brand-text/10 bg-brand-surface/30 p-3">
                  {node.description && (
                    <p className="text-sm text-brand-text-muted">
                      {node.description}
                    </p>
                  )}

                  {experiment && (
                    <div className="mt-3 rounded-lg border border-brand-accent/20 bg-brand-accent/5 p-3">
                      <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-brand-accent">
                        Experiment {experiment.number}
                      </span>
                      <p className="mt-1 font-display text-sm font-semibold text-brand-text">
                        {experiment.title}
                      </p>
                      <p className="mt-1 text-xs text-brand-text-muted">
                        {experiment.question}
                      </p>
                      {experiment.quip && (
                        <p className="mt-2 border-t border-brand-text/10 pt-2 font-mono text-[11px] italic text-brand-text-muted">
                          &ldquo;{experiment.quip}&rdquo;
                        </p>
                      )}
                      <a
                        href={`/projects/${experiment.slug}`}
                        className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-wider text-brand-accent"
                      >
                        Open <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-4 border-t border-brand-text/10 pt-4">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
          <span className="font-mono text-[10px] text-brand-text-muted">Explored</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-secondary" />
          <span className="font-mono text-[10px] text-brand-text-muted">Exploring</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-text/40" />
          <span className="font-mono text-[10px] text-brand-text-muted">Future</span>
        </span>
      </div>
    </div>
  );
}
