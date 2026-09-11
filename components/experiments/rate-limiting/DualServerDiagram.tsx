"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SystemNode } from "../shared/SystemNode";
import { CounterDots } from "../shared/CounterDots";
import type { SimulatorState } from "./useRateLimitSimulator";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

interface DualServerDiagramProps {
  state: SimulatorState;
  onSendRequest: (serverId: "a" | "b") => void;
  isAnimating: boolean;
}

export function DualServerDiagram({
  state,
  onSendRequest,
  isAnimating,
}: DualServerDiagramProps) {
  const pulseRef = useRef<SVGCircleElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [pulseVisible, setPulseVisible] = useState(false);

  const currentPhase = state.currentRequest?.phase || "idle";
  const currentServer = state.currentRequest?.server;
  const isRejected = currentPhase === "rejected";

  // Animate pulse
  useEffect(() => {
    if (!state.currentRequest || !pulseRef.current || prefersReducedMotion) return;

    const pulse = pulseRef.current;
    const phase = state.currentRequest.phase;
    const server = state.currentRequest.server || "a";
    const pathToLb = "#path-client-lb";
    const pathToServer = server === "a" ? "#path-lb-server-a" : "#path-lb-server-b";

    if (phase === "sending") {
      setPulseVisible(true);
      gsap.fromTo(
        pulse,
        { opacity: 1 },
        {
          duration: 0.15,
          ease: "power1.inOut",
          motionPath: {
            path: pathToLb,
            align: pathToLb,
            alignOrigin: [0.5, 0.5],
          },
        }
      );
    } else if (phase === "at-limiter" || phase === "processing") {
      gsap.to(pulse, {
        duration: 0.15,
        ease: "power1.inOut",
        motionPath: {
          path: pathToServer,
          align: pathToServer,
          alignOrigin: [0.5, 0.5],
        },
      });
    } else if (phase === "rejected") {
      gsap.to(pulse, {
        duration: 0.25,
        ease: "power1.inOut",
        fill: "#ef4444",
        motionPath: {
          path: pathToLb,
          align: pathToLb,
          alignOrigin: [0.5, 0.5],
          start: 1,
          end: 0,
        },
        onComplete: () => setPulseVisible(false),
      });
    } else {
      setPulseVisible(false);
    }
  }, [state.currentRequest?.phase, state.currentRequest?.server, prefersReducedMotion]);

  useEffect(() => {
    if (!state.currentRequest) {
      setPulseVisible(false);
    }
  }, [state.currentRequest]);

  const getNodeState = useCallback(
    (nodeId: string): "default" | "active" | "success" | "rejected" => {
      if (!state.currentRequest) return "default";
      const phase = state.currentRequest.phase;
      const server = state.currentRequest.server;

      if (nodeId === "client") return phase === "sending" ? "active" : "default";
      if (nodeId === "lb") return phase === "sending" ? "active" : "default";
      if (nodeId === "server-a") {
        if (server !== "a") return "default";
        if (phase === "at-limiter" || phase === "processing") return "active";
        if (phase === "rejected") return "rejected";
        return "default";
      }
      if (nodeId === "server-b") {
        if (server !== "b") return "default";
        if (phase === "at-limiter" || phase === "processing") return "active";
        if (phase === "rejected") return "rejected";
        return "default";
      }
      return "default";
    },
    [state.currentRequest]
  );

  // Calculate if combined requests exceed what single-server limit would allow
  const totalRequests = state.counter + state.counterB;
  const exceedsIntendedLimit = totalRequests > state.limit;

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 550 280"
        className="w-full h-auto"
        aria-label="Dual server rate limiting diagram showing how requests can bypass limits"
      >
        {/* Edges */}
        <path
          id="path-client-lb"
          d="M 100 140 L 200 140"
          fill="none"
          stroke={currentPhase === "sending" ? "rgba(224, 168, 198, 0.5)" : "rgba(255, 255, 255, 0.1)"}
          strokeWidth={currentPhase === "sending" ? 2 : 1}
        />
        <path
          id="path-lb-server-a"
          d="M 280 140 C 320 140, 340 80, 400 80"
          fill="none"
          stroke={
            currentServer === "a" && (currentPhase === "processing" || currentPhase === "at-limiter")
              ? "rgba(224, 168, 198, 0.5)"
              : "rgba(255, 255, 255, 0.1)"
          }
          strokeWidth={currentServer === "a" && currentPhase === "processing" ? 2 : 1}
        />
        <path
          id="path-lb-server-b"
          d="M 280 140 C 320 140, 340 200, 400 200"
          fill="none"
          stroke={
            currentServer === "b" && (currentPhase === "processing" || currentPhase === "at-limiter")
              ? "rgba(224, 168, 198, 0.5)"
              : "rgba(255, 255, 255, 0.1)"
          }
          strokeWidth={currentServer === "b" && currentPhase === "processing" ? 2 : 1}
        />

        {/* Pulse */}
        {pulseVisible && (
          <circle
            ref={pulseRef}
            r={5}
            fill="#e0a8c6"
            style={{ filter: "drop-shadow(0 0 8px rgba(224, 168, 198, 0.6))" }}
          />
        )}

        {/* Nodes */}
        <foreignObject x={30} y={100} width={100} height={80}>
          <SystemNode id="client" label="Client" icon="client" state={getNodeState("client")} />
        </foreignObject>

        <foreignObject x={180} y={100} width={100} height={80}>
          <SystemNode id="lb" label="Load Balancer" icon="lb" state={getNodeState("lb")} />
        </foreignObject>

        <foreignObject x={380} y={40} width={120} height={80}>
          <SystemNode
            id="server-a"
            label="Server A"
            icon="server"
            state={getNodeState("server-a")}
            status={`${state.counter}/${state.limit}`}
            statusVariant={state.counter >= state.limit ? "full" : "default"}
          />
        </foreignObject>

        <foreignObject x={380} y={160} width={120} height={80}>
          <SystemNode
            id="server-b"
            label="Server B"
            icon="server"
            state={getNodeState("server-b")}
            status={`${state.counterB}/${state.limit}`}
            statusVariant={state.counterB >= state.limit ? "full" : "default"}
          />
        </foreignObject>
      </svg>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-brand-text-muted">Server A:</span>
          <CounterDots current={state.counter} max={state.limit} size="sm" />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-brand-text-muted">Server B:</span>
          <CounterDots current={state.counterB} max={state.limit} size="sm" />
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={() => onSendRequest("a")}
          disabled={isAnimating}
          className="rounded-lg border border-brand-text/15 bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider text-brand-text transition-all hover:border-brand-accent/40 hover:bg-brand-accent/5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send to A
        </button>
        <button
          onClick={() => onSendRequest("b")}
          disabled={isAnimating}
          className="rounded-lg border border-brand-text/15 bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider text-brand-text transition-all hover:border-brand-accent/40 hover:bg-brand-accent/5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send to B
        </button>
      </div>

      {/* Warning when limit is exceeded */}
      {exceedsIntendedLimit && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center">
          <p className="font-mono text-sm text-red-400">
            ⚠️ Total requests: {totalRequests} (limit should be {state.limit})
          </p>
        </div>
      )}

      <div className="sr-only" role="status" aria-live="polite">
        {exceedsIntendedLimit && `Warning: Total requests ${totalRequests} exceeds intended limit of ${state.limit}`}
      </div>
    </div>
  );
}
