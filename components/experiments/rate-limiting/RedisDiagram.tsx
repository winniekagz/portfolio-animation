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

interface RedisDiagramProps {
  state: SimulatorState;
  onSendRequest: (serverId: "a" | "b") => void;
  isAnimating: boolean;
}

export function RedisDiagram({
  state,
  onSendRequest,
  isAnimating,
}: RedisDiagramProps) {
  const pulseRef = useRef<SVGCircleElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [pulseVisible, setPulseVisible] = useState(false);

  const currentPhase = state.currentRequest?.phase || "idle";
  const currentServer = state.currentRequest?.server;
  const isRejected = currentPhase === "rejected";

  useEffect(() => {
    if (!state.currentRequest || !pulseRef.current || prefersReducedMotion) return;

    const pulse = pulseRef.current;
    const phase = state.currentRequest.phase;
    const server = state.currentRequest.server || "a";

    if (phase === "sending") {
      setPulseVisible(true);
      gsap.fromTo(
        pulse,
        { opacity: 1 },
        {
          duration: 0.1,
          ease: "power1.inOut",
          motionPath: {
            path: "#path-client-lb-redis",
            align: "#path-client-lb-redis",
            alignOrigin: [0.5, 0.5],
          },
        }
      );
    } else if (phase === "at-limiter") {
      const pathToServer = server === "a" ? "#path-lb-server-a-redis" : "#path-lb-server-b-redis";
      gsap.to(pulse, {
        duration: 0.1,
        ease: "power1.inOut",
        motionPath: {
          path: pathToServer,
          align: pathToServer,
          alignOrigin: [0.5, 0.5],
        },
      });
    } else if (phase === "processing") {
      // Quick check to Redis
      gsap.to(pulse, {
        duration: 0.08,
        ease: "power1.inOut",
        motionPath: {
          path: "#path-server-redis",
          align: "#path-server-redis",
          alignOrigin: [0.5, 0.5],
        },
        onComplete: () => setPulseVisible(false),
      });
    } else if (phase === "rejected") {
      gsap.to(pulse, {
        duration: 0.2,
        ease: "power1.inOut",
        fill: "#ef4444",
        x: 100,
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
      if (nodeId === "redis") {
        if (phase === "processing") return "active";
        if (phase === "rejected") return "rejected";
        return "default";
      }
      if (nodeId === "server-a") {
        if (server !== "a") return "default";
        if (phase === "at-limiter" || phase === "processing") return "active";
        return "default";
      }
      if (nodeId === "server-b") {
        if (server !== "b") return "default";
        if (phase === "at-limiter" || phase === "processing") return "active";
        return "default";
      }
      return "default";
    },
    [state.currentRequest]
  );

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 600 340"
        className="w-full h-auto"
        aria-label="Redis-backed rate limiting diagram showing shared counter"
      >
        {/* Edges */}
        <path
          id="path-client-lb-redis"
          d="M 100 170 L 200 170"
          fill="none"
          stroke={currentPhase === "sending" ? "rgba(224, 168, 198, 0.5)" : "rgba(255, 255, 255, 0.1)"}
          strokeWidth={currentPhase === "sending" ? 2 : 1}
        />
        <path
          id="path-lb-server-a-redis"
          d="M 280 170 C 320 170, 340 100, 400 100"
          fill="none"
          stroke={
            currentServer === "a" && currentPhase !== "idle"
              ? "rgba(224, 168, 198, 0.5)"
              : "rgba(255, 255, 255, 0.1)"
          }
          strokeWidth={currentServer === "a" ? 2 : 1}
        />
        <path
          id="path-lb-server-b-redis"
          d="M 280 170 C 320 170, 340 240, 400 240"
          fill="none"
          stroke={
            currentServer === "b" && currentPhase !== "idle"
              ? "rgba(224, 168, 198, 0.5)"
              : "rgba(255, 255, 255, 0.1)"
          }
          strokeWidth={currentServer === "b" ? 2 : 1}
        />
        {/* Server to Redis connections */}
        <path
          id="path-server-redis"
          d="M 460 100 L 500 170 M 460 240 L 500 170"
          fill="none"
          stroke={
            currentPhase === "processing"
              ? "rgba(63, 175, 130, 0.5)"
              : "rgba(255, 255, 255, 0.1)"
          }
          strokeWidth={currentPhase === "processing" ? 2 : 1}
          strokeDasharray="4 4"
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
        <foreignObject x={30} y={130} width={100} height={80}>
          <SystemNode id="client" label="Client" icon="client" state={getNodeState("client")} />
        </foreignObject>

        <foreignObject x={180} y={130} width={100} height={80}>
          <SystemNode id="lb" label="Load Balancer" icon="lb" state={getNodeState("lb")} />
        </foreignObject>

        <foreignObject x={380} y={60} width={100} height={80}>
          <SystemNode
            id="server-a"
            label="Server A"
            icon="server"
            state={getNodeState("server-a")}
          />
        </foreignObject>

        <foreignObject x={380} y={200} width={100} height={80}>
          <SystemNode
            id="server-b"
            label="Server B"
            icon="server"
            state={getNodeState("server-b")}
          />
        </foreignObject>

        <foreignObject x={490} y={130} width={100} height={80}>
          <SystemNode
            id="redis"
            label="Redis"
            icon="database"
            state={getNodeState("redis")}
            status={`${state.counter}/${state.limit}`}
            statusVariant={state.counter >= state.limit ? "full" : "default"}
          />
        </foreignObject>

        {/* Shared counter label */}
        <text
          x={540}
          y={230}
          className="font-mono text-[10px] fill-brand-secondary"
          textAnchor="middle"
        >
          Shared Counter
        </text>
      </svg>

      {/* Single shared counter */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <span className="font-mono text-xs text-brand-text-muted">Global counter:</span>
        <CounterDots current={state.counter} max={state.limit} />
      </div>

      {/* Controls */}
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

      {/* Success message */}
      {state.counter >= state.limit && (
        <div className="mt-4 rounded-lg border border-brand-secondary/30 bg-brand-secondary/10 p-3 text-center">
          <p className="font-mono text-sm text-brand-secondary">
            ✓ Limit enforced correctly across both servers
          </p>
        </div>
      )}

      <div className="sr-only" role="status" aria-live="polite">
        {state.counter >= state.limit && "Rate limit enforced correctly using shared Redis counter"}
      </div>
    </div>
  );
}
