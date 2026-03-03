"use client";

/**
 * CustomCursor – dot + ring cursor, smooth follow (GSAP quickTo), desktop only.
 * On menu item hover: enlarge slightly and show "Open" label. Hidden on touch and when pointer leaves.
 */

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useCursor } from "@/contexts/CursorContext";
import { cn } from "@/lib/utils";

const CURSOR_DOT_SIZE = 8;
const CURSOR_RING_SIZE = 40;
const CURSOR_HOVER_SCALE = 1.6;
const SMOOTH_SPEED = 0.2;

export function CustomCursor() {
  const cursorContext = useCursor();
  const isHoveringLink = cursorContext?.isHoveringMenuLink ?? false;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const dotX = useRef(0);
  const dotY = useRef(0);

  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  useEffect(() => {
    if (isTouch || typeof window === "undefined") return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const ringQuick = gsap.quickTo(ring, "x", { duration: SMOOTH_SPEED, ease: "power2.out" });
    const ringQuickY = gsap.quickTo(ring, "y", { duration: SMOOTH_SPEED, ease: "power2.out" });
    const dotQuick = gsap.quickTo(dot, "x", { duration: SMOOTH_SPEED * 0.7, ease: "power2.out" });
    const dotQuickY = gsap.quickTo(dot, "y", { duration: SMOOTH_SPEED * 0.7, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      ringX.current = e.clientX;
      ringY.current = e.clientY;
      dotX.current = e.clientX;
      dotY.current = e.clientY;
      ringQuick(e.clientX - CURSOR_RING_SIZE / 2);
      ringQuickY(e.clientY - CURSOR_RING_SIZE / 2);
      dotQuick(e.clientX - CURSOR_DOT_SIZE / 2);
      dotQuickY(e.clientY - CURSOR_DOT_SIZE / 2);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch]);

  // Hover scale for ring when over menu item
  useEffect(() => {
    if (isTouch || !ringRef.current) return;
    gsap.to(ringRef.current, {
      scale: isHoveringLink ? CURSOR_HOVER_SCALE : 1,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [isHoveringLink, isTouch]);

  if (isTouch) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[100]",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden
      style={{ transition: "opacity 0.15s ease-out" }}
    >
      {/* Ring */}
      <div
        ref={ringRef}
        className="absolute flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 shadow-md"
        style={{
          width: CURSOR_RING_SIZE,
          height: CURSOR_RING_SIZE,
          left: 0,
          top: 0,
        }}
      >
        <span
          ref={labelRef}
          className={cn(
            "font-body text-xs text-foreground whitespace-nowrap",
            isHoveringLink ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          style={{ transition: "opacity 0.2s, transform 0.2s" }}
        >
          Open
        </span>
      </div>
      {/* Dot */}
      <div
        ref={dotRef}
        className="absolute rounded-full bg-foreground"
        style={{
          width: CURSOR_DOT_SIZE,
          height: CURSOR_DOT_SIZE,
          left: 0,
          top: 0,
        }}
      />
    </div>
  );
}
