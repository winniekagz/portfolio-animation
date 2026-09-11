"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { Belief, BeliefVariant } from "@/lib/types";

interface StickyNoteProps {
  belief: Belief;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
  showRelated?: boolean;
}

const variantStyles: Record<BeliefVariant, string> = {
  default: "bg-brand-surface border-brand-text/15 shadow-[0_4px_20px_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.2)]",
  warm: "border-brand-accent/20 shadow-[0_4px_20px_rgba(224,168,198,0.15),0_1px_3px_rgba(0,0,0,0.2)] [background:linear-gradient(135deg,#2a1f22_0%,#352428_100%)]",
  cool: "border-brand-secondary/20 shadow-[0_4px_20px_rgba(63,175,130,0.12),0_1px_3px_rgba(0,0,0,0.2)] [background:linear-gradient(135deg,#1a2420_0%,#1f2d28_100%)]",
  "note-to-self": "border-brand-accent/30 shadow-[0_6px_24px_rgba(224,168,198,0.2),0_2px_4px_rgba(0,0,0,0.2)] [background:linear-gradient(135deg,#2d1f24_0%,#3a2830_100%)]",
};

export const StickyNote = forwardRef<HTMLElement, StickyNoteProps>(
  function StickyNote(
    { belief, rotation = 0, className, style, showRelated = false },
    ref
  ) {
    const variant = belief.variant || "default";
    const isNoteToSelf = variant === "note-to-self";

    return (
      <article
        ref={ref}
        className={cn(
          "group rounded-[0.625rem] border p-5 md:p-6 transition-all duration-200 ease-out",
          "[transform:rotate(var(--rotation))_translate(var(--offset-x),var(--offset-y))_scale(var(--scale))]",
          "hover:[transform:rotate(var(--hover-rotation))_translate(var(--offset-x),calc(var(--offset-y)_-_4px))_scale(calc(var(--scale)*1.02))]",
          "hover:border-brand-accent/40 hover:shadow-[0_8px_30px_rgba(224,168,198,0.2),0_2px_6px_rgba(0,0,0,0.3)]",
          variantStyles[variant],
          className
        )}
        style={{
          ...style,
          "--rotation": `${rotation}deg`,
          "--hover-rotation": `${rotation * 0.3}deg`,
          "--offset-x": "0px",
          "--offset-y": "0px",
          "--scale": "1",
        } as React.CSSProperties}
      >
        {/* Note to self label */}
        {isNoteToSelf && (
          <span className="block font-mono text-[10px] font-medium uppercase tracking-widest text-brand-accent mb-2">
            Note to self
          </span>
        )}

        {/* Title */}
        {!isNoteToSelf && (
          <h3 className="font-body text-base font-semibold text-brand-text md:text-lg leading-snug">
            {belief.title}
          </h3>
        )}

        {/* Body */}
        <p
          className={cn(
            "font-body text-sm leading-relaxed text-brand-text-muted",
            !isNoteToSelf && "mt-2"
          )}
        >
          {belief.body}
        </p>

        {/* Related concepts (optional, shown on hover/focus) */}
        {showRelated && belief.related && (
          <p className="mt-3 font-mono text-[10px] text-brand-text-muted/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
            {belief.related}
          </p>
        )}
      </article>
    );
  }
);
