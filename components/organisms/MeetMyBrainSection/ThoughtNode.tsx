"use client";

import { forwardRef } from "react";
import type { ThoughtNode as ThoughtNodeType, ThoughtStatus } from "@/lib/types";
import { categoryColors } from "@/lib/data/thought-graph";
import { cn } from "@/lib/utils";

interface ThoughtNodeProps {
  node: ThoughtNodeType;
  isCenter?: boolean;
  isFocused?: boolean;
  isConnected?: boolean;
  isDimmed?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const statusStyles: Record<ThoughtStatus, string> = {
  completed: "opacity-100",
  exploring: "opacity-90",
  curious: "opacity-60",
};

// React Flow style node
export const ThoughtNode = forwardRef<HTMLButtonElement, ThoughtNodeProps>(
  function ThoughtNode(
    { 
      node, 
      isCenter, 
      isFocused, 
      isConnected, 
      isDimmed, 
      onClick, 
      style,
    },
    ref
  ) {
    const colors = categoryColors[node.category];

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "group absolute flex items-center justify-center transition-all duration-200",
          // React Flow style: rounded rectangle, not circle
          "rounded-lg border-2 bg-brand-bg/95 shadow-lg backdrop-blur-sm",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
          statusStyles[node.status],
          // Border color based on category
          isCenter ? "border-brand-accent" : colors.border,
          // States
          isCenter && "z-20 border-brand-accent",
          isFocused && "z-30 scale-105 border-brand-accent shadow-brand-accent/30 shadow-xl",
          isConnected && "z-10 border-opacity-80",
          isDimmed && "opacity-25",
          !isDimmed && !isFocused && "hover:border-brand-accent/70 hover:shadow-xl"
        )}
        style={{
          ...style,
          transform: `translate(-50%, -50%)`,
        }}
        aria-label={`${node.label}${node.experimentSlug ? " (has experiment)" : ""}`}
        aria-pressed={isFocused}
      >
        {/* Node content */}
        <div className="flex flex-col items-center gap-0.5 px-3 py-2">
          {/* Experiment badge */}
          {node.experimentSlug && (
            <span
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-secondary text-[8px] font-bold text-brand-bg"
              aria-hidden="true"
            >
              ⚡
            </span>
          )}

          {/* Label */}
          <span
            className={cn(
              "whitespace-nowrap font-mono text-[11px] font-semibold tracking-wide",
              isCenter ? "text-brand-accent" : colors.text,
              isFocused && "text-brand-accent"
            )}
          >
            {node.label}
          </span>

          {/* Status indicator */}
          {node.status === "exploring" && (
            <span className="mt-0.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-secondary" />
              <span className="font-mono text-[8px] uppercase text-brand-secondary">active</span>
            </span>
          )}
        </div>
      </button>
    );
  }
);
