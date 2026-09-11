"use client";

import { cn } from "@/lib/utils";

interface ObservationPanelProps {
  children: React.ReactNode;
  variant?: "default" | "warning" | "success";
  className?: string;
}

export function ObservationPanel({
  children,
  variant = "default",
  className,
}: ObservationPanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-5 md:p-6",
        variant === "default" && "border-brand-text/10 bg-brand-surface",
        variant === "warning" && "border-red-500/30 bg-red-500/10",
        variant === "success" && "border-brand-secondary/30 bg-brand-secondary/10",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ObservationTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ObservationText({ children, className }: ObservationTextProps) {
  return (
    <p className={cn("font-body text-base leading-relaxed text-brand-text-muted", className)}>
      {children}
    </p>
  );
}

interface ObservationHighlightProps {
  children: React.ReactNode;
}

export function ObservationHighlight({ children }: ObservationHighlightProps) {
  return <strong className="text-brand-text">{children}</strong>;
}
