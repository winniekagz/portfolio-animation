"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ExperimentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
  size?: "default" | "sm";
  children: React.ReactNode;
}

export const ExperimentButton = forwardRef<HTMLButtonElement, ExperimentButtonProps>(
  function ExperimentButton(
    { variant = "default", size = "default", className, children, disabled, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-mono text-sm uppercase tracking-wider transition-all duration-150",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg",
          size === "default" && "px-6 py-3",
          size === "sm" && "px-4 py-2 text-xs",
          "rounded-[0.625rem]",
          variant === "default" &&
            "border border-brand-text/15 bg-transparent text-brand-text hover:border-brand-accent/40 hover:bg-brand-accent/5 active:scale-[0.98]",
          variant === "primary" &&
            "border-none bg-brand-accent text-brand-bg hover:bg-brand-accent-hover active:scale-[0.98]",
          variant === "ghost" &&
            "border border-brand-text/10 bg-transparent text-brand-text-muted hover:border-brand-accent/40 hover:text-brand-text",
          disabled && "cursor-not-allowed opacity-40",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
