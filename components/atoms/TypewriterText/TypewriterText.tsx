"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TypewriterTextProps = {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
};

export function TypewriterText({
  text,
  speedMs = 60,
  startDelayMs = 250,
}: Readonly<TypewriterTextProps>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleText, setVisibleText] = useState("");
  const displayText = prefersReducedMotion ? text : visibleText;
  const isComplete = displayText.length === text.length;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let index = 0;
    let typingTimer: ReturnType<typeof window.setTimeout>;
    const startTimer = window.setTimeout(() => {
      const typeNextCharacter = () => {
        index += 1;
        setVisibleText(text.slice(0, index));

        if (index < text.length) {
          typingTimer = window.setTimeout(typeNextCharacter, speedMs);
        }
      };

      typeNextCharacter();
    }, startDelayMs);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(typingTimer);
    };
  }, [prefersReducedMotion, speedMs, startDelayMs, text]);

  return (
    <span aria-label={text} className="inline-flex items-baseline">
      <span aria-hidden="true">{displayText}</span>
      <span
        aria-hidden="true"
        className={isComplete ? "ml-1 inline-block h-[0.82em] w-[0.035em] animate-pulse bg-brand-accent" : "ml-1 inline-block h-[0.82em] w-[0.035em] bg-brand-accent"}
      />
    </span>
  );
}
