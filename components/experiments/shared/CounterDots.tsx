"use client";

import { cn } from "@/lib/utils";

interface CounterDotsProps {
  current: number;
  max: number;
  size?: "sm" | "md";
  className?: string;
}

export function CounterDots({ current, max, size = "md", className }: CounterDotsProps) {
  const atLimit = current >= max;

  return (
    <div className={cn("flex items-center gap-1.5", className)} role="meter" aria-valuenow={current} aria-valuemin={0} aria-valuemax={max}>
      {Array.from({ length: max }).map((_, index) => {
        const filled = index < current;
        return (
          <span
            key={index}
            className={cn(
              "rounded-full transition-all duration-100",
              size === "sm" && "h-2 w-2",
              size === "md" && "h-2.5 w-2.5",
              filled
                ? atLimit
                  ? "bg-red-500"
                  : "bg-brand-accent scale-100"
                : "border border-brand-text/20 bg-transparent",
              filled && "animate-[scale-in_100ms_ease-out]"
            )}
            aria-hidden="true"
          />
        );
      })}
      <span className="ml-2 font-mono text-xs text-brand-text-muted">
        {current} / {max}
      </span>
    </div>
  );
}
