"use client";

import { cn } from "@/lib/utils";

type Perspective = "system" | "human";

interface PerspectiveToggleProps {
  value: Perspective;
  onChange: (value: Perspective) => void;
}

export function PerspectiveToggle({ value, onChange }: PerspectiveToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-brand-text/10 p-1" role="tablist">
      <button
        role="tab"
        aria-selected={value === "system"}
        onClick={() => onChange("system")}
        className={cn(
          "rounded-md px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-150",
          value === "system"
            ? "bg-brand-accent/10 border border-brand-accent/40 text-brand-accent"
            : "bg-transparent border border-transparent text-brand-text-muted hover:text-brand-text"
        )}
      >
        System View
      </button>
      <button
        role="tab"
        aria-selected={value === "human"}
        onClick={() => onChange("human")}
        className={cn(
          "rounded-md px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-150",
          value === "human"
            ? "bg-brand-accent/10 border border-brand-accent/40 text-brand-accent"
            : "bg-transparent border border-transparent text-brand-text-muted hover:text-brand-text"
        )}
      >
        Human View
      </button>
    </div>
  );
}
