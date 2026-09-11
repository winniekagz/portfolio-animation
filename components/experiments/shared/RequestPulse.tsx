"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

interface RequestPulseProps {
  id: string;
  pathId: string;
  variant?: "request" | "rejected";
  duration?: number;
  onComplete?: () => void;
  playing?: boolean;
}

export function RequestPulse({
  id,
  pathId,
  variant = "request",
  duration = 0.4,
  onComplete,
  playing = false,
}: RequestPulseProps) {
  const pulseRef = useRef<SVGCircleElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!playing || !pulseRef.current) return;

    const pulse = pulseRef.current;
    const path = document.getElementById(pathId);

    if (!path) {
      console.warn(`RequestPulse: path ${pathId} not found`);
      return;
    }

    setVisible(true);

    // Reduced motion: instant appearance at end
    if (prefersReducedMotion) {
      onComplete?.();
      setVisible(false);
      return;
    }

    // Animate along path
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete?.();
      },
    });

    tl.to(pulse, {
      duration,
      ease: "power1.inOut",
      motionPath: {
        path: `#${pathId}`,
        align: `#${pathId}`,
        alignOrigin: [0.5, 0.5],
        start: variant === "rejected" ? 1 : 0,
        end: variant === "rejected" ? 0 : 1,
      },
    });

    return () => {
      tl.kill();
    };
  }, [playing, pathId, duration, variant, onComplete, prefersReducedMotion]);

  if (!visible) return null;

  return (
    <circle
      ref={pulseRef}
      id={id}
      r={variant === "request" ? 5 : 4}
      fill={variant === "request" ? "#e0a8c6" : "#ef4444"}
      className="pointer-events-none"
      style={{
        filter:
          variant === "request"
            ? "drop-shadow(0 0 8px rgba(224, 168, 198, 0.6))"
            : "drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))",
      }}
    />
  );
}
