"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { currentRabbitHole } from "@/lib/data/rabbit-hole";

const STATUS_LABELS = {
  investigating: "Currently Investigating",
  paused: "Paused",
  completed: "Completed",
} as const;

export function RabbitHoleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const topicRef = useRef<HTMLHeadingElement>(null);
  const questionRef = useRef<HTMLParagraphElement>(null);
  const chainRef = useRef<HTMLDivElement>(null);
  const punchlineRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { topic, startingQuestion, connections, status, punchline, figjamUrl, experimentUrl } =
    currentRabbitHole;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      gsap.set([statusRef.current, topicRef.current, questionRef.current, punchlineRef.current], {
        opacity: 1,
        y: 0,
      });
      const nodes = chainRef.current?.querySelectorAll(".chain-node");
      const lines = chainRef.current?.querySelectorAll(".chain-line");
      if (nodes?.length) gsap.set(nodes, { opacity: 1, x: 0 });
      if (lines?.length) gsap.set(lines, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const nodes = chainRef.current?.querySelectorAll(".chain-node");
      const lines = chainRef.current?.querySelectorAll(".chain-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Status badge pops in
      tl.fromTo(
        statusRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
      );

      // Topic slides up
      tl.fromTo(
        topicRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      // Starting question fades in
      tl.fromTo(
        questionRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );

      // Chain nodes and lines stagger in
      if (nodes?.length && lines?.length) {
        nodes.forEach((node, i) => {
          tl.fromTo(
            node,
            { x: -16, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
            `-=0.15`
          );
          if (lines[i]) {
            tl.fromTo(
              lines[i],
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, duration: 0.25, ease: "power2.inOut" },
              "-=0.2"
            );
          }
        });
      }

      // Punchline fades in last
      tl.fromTo(
        punchlineRef.current,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.1"
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="rabbit-hole"
      ref={sectionRef}
      aria-labelledby="rabbit-hole-heading"
      className="bg-brand-bg px-5 py-16 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-3xl">
        {/* Status badge */}
        <div
          ref={statusRef}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1.5"
          style={{ opacity: 0 }}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              status === "investigating"
                ? "animate-pulse bg-brand-secondary"
                : status === "paused"
                  ? "bg-yellow-500"
                  : "bg-brand-accent"
            }`}
            aria-hidden="true"
          />
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-brand-accent">
            {STATUS_LABELS[status]}
          </span>
        </div>

        {/* Topic */}
        <h2
          id="rabbit-hole-heading"
          ref={topicRef}
          className="font-display text-4xl font-semibold uppercase tracking-tight text-brand-text md:text-5xl"
          style={{ opacity: 0 }}
        >
          {topic}
        </h2>

        {/* Starting question */}
        <p
          ref={questionRef}
          className="mt-4 font-body text-lg text-brand-text-muted md:text-xl"
          style={{ opacity: 0 }}
        >
          &ldquo;{startingQuestion}&rdquo;
        </p>

        {/* Connection chain */}
        <div ref={chainRef} className="mt-8 space-y-0">
          {connections.map((connection, i) => (
            <div key={connection} className="flex items-start gap-4">
              {/* Vertical connector line */}
              <div className="flex w-6 flex-col items-center">
                <div
                  className="chain-node h-2.5 w-2.5 rounded-full border-2 border-brand-accent bg-brand-bg"
                  style={{ opacity: 0 }}
                />
                {i < connections.length - 1 && (
                  <div
                    className="chain-line h-8 w-px bg-brand-accent/40"
                    style={{ transform: "scaleY(0)" }}
                  />
                )}
              </div>
              {/* Connection text */}
              <span
                className="chain-node -mt-0.5 font-mono text-sm text-brand-text md:text-base"
                style={{ opacity: 0 }}
              >
                {connection}
              </span>
            </div>
          ))}
        </div>

        {/* Punchline */}
        {punchline && (
          <p
            ref={punchlineRef}
            className="mt-8 font-mono text-sm italic text-brand-text-muted"
            style={{ opacity: 0 }}
          >
            {punchline}
          </p>
        )}

        {/* Links */}
        {(figjamUrl || experimentUrl) && (
          <div className="mt-6 flex flex-wrap gap-4">
            {figjamUrl && (
              <a
                href={figjamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm text-brand-accent transition hover:text-brand-accent-hover"
              >
                View FigJam
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
            {experimentUrl && (
              <a
                href={experimentUrl}
                className="inline-flex items-center gap-2 font-mono text-sm text-brand-accent transition hover:text-brand-accent-hover"
              >
                View experiment
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
