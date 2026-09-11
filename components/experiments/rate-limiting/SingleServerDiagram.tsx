"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SystemNode } from "../shared/SystemNode";
import { CounterDots } from "../shared/CounterDots";
import type { SimulatorState, RequestPhase } from "./useRateLimitSimulator";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

interface SingleServerDiagramProps {
  state: SimulatorState;
  onSendRequest: () => void;
  isAnimating: boolean;
}

export function SingleServerDiagram({
  state,
  onSendRequest,
  isAnimating,
}: SingleServerDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [pulseVisible, setPulseVisible] = useState(false);

  const currentPhase = state.currentRequest?.phase || "idle";
  const isRejected = currentPhase === "rejected";

  // Node positions (centered for 600x300 viewport)
  const nodes = {
    client: { x: 100, y: 150, width: 100, height: 80 },
    limiter: { x: 250, y: 150, width: 100, height: 80 },
    server: { x: 400, y: 150, width: 100, height: 80 },
  };

  // Edge paths
  const clientToLimiter = `M ${nodes.client.x + nodes.client.width / 2 + 50} ${nodes.client.y} L ${nodes.limiter.x - nodes.limiter.width / 2 - 20} ${nodes.limiter.y}`;
  const limiterToServer = `M ${nodes.limiter.x + nodes.limiter.width / 2 + 20} ${nodes.limiter.y} L ${nodes.server.x - nodes.server.width / 2 - 20} ${nodes.server.y}`;

  // Animate pulse along path
  useEffect(() => {
    if (!state.currentRequest || !pulseRef.current || prefersReducedMotion) return;

    const pulse = pulseRef.current;
    const phase = state.currentRequest.phase;

    if (phase === "sending") {
      setPulseVisible(true);
      gsap.fromTo(
        pulse,
        { opacity: 1 },
        {
          duration: 0.2,
          ease: "power1.inOut",
          motionPath: {
            path: "#path-client-limiter",
            align: "#path-client-limiter",
            alignOrigin: [0.5, 0.5],
          },
        }
      );
    } else if (phase === "at-limiter" || phase === "processing") {
      gsap.to(pulse, {
        duration: 0.2,
        ease: "power1.inOut",
        motionPath: {
          path: "#path-limiter-server",
          align: "#path-limiter-server",
          alignOrigin: [0.5, 0.5],
        },
      });
    } else if (phase === "rejected") {
      // Reverse back to client
      gsap.to(pulse, {
        duration: 0.3,
        ease: "power1.inOut",
        fill: "#ef4444",
        motionPath: {
          path: "#path-client-limiter",
          align: "#path-client-limiter",
          alignOrigin: [0.5, 0.5],
          start: 1,
          end: 0,
        },
        onComplete: () => setPulseVisible(false),
      });
    } else if (phase === "response") {
      setPulseVisible(false);
    }
  }, [state.currentRequest?.phase, prefersReducedMotion]);

  // Reset pulse when idle
  useEffect(() => {
    if (!state.currentRequest) {
      setPulseVisible(false);
    }
  }, [state.currentRequest]);

  const getNodeState = useCallback(
    (
      nodeId: "client" | "limiter" | "server"
    ): "default" | "active" | "success" | "rejected" => {
      if (!state.currentRequest) return "default";

      const phase = state.currentRequest.phase;

      if (nodeId === "client") {
        return phase === "sending" ? "active" : "default";
      }
      if (nodeId === "limiter") {
        if (phase === "at-limiter") return "active";
        if (phase === "rejected") return "rejected";
        return "default";
      }
      if (nodeId === "server") {
        if (phase === "processing") return "active";
        if (phase === "response") return "success";
        return "default";
      }
      return "default";
    },
    [state.currentRequest]
  );

  return (
    <div className="relative w-full">
      {/* SVG Diagram */}
      <svg
        ref={svgRef}
        viewBox="0 0 500 200"
        className="w-full h-auto"
        aria-label="Rate limiting system diagram showing client, rate limiter, and server"
      >
        {/* Edges */}
        <path
          id="path-client-limiter"
          d={clientToLimiter}
          fill="none"
          stroke={currentPhase === "sending" ? "rgba(224, 168, 198, 0.5)" : "rgba(255, 255, 255, 0.1)"}
          strokeWidth={currentPhase === "sending" ? 2 : 1}
          className="transition-all duration-150"
        />
        <path
          id="path-limiter-server"
          d={limiterToServer}
          fill="none"
          stroke={
            isRejected
              ? "rgba(239, 68, 68, 0.3)"
              : currentPhase === "processing"
              ? "rgba(224, 168, 198, 0.5)"
              : "rgba(255, 255, 255, 0.1)"
          }
          strokeWidth={currentPhase === "processing" ? 2 : 1}
          strokeDasharray={isRejected ? "4 4" : undefined}
          className="transition-all duration-150"
        />

        {/* Request pulse */}
        {pulseVisible && (
          <circle
            ref={pulseRef}
            r={5}
            fill="#e0a8c6"
            style={{
              filter: "drop-shadow(0 0 8px rgba(224, 168, 198, 0.6))",
            }}
          />
        )}

        {/* Nodes using foreignObject */}
        <foreignObject x={nodes.client.x - nodes.client.width / 2} y={nodes.client.y - nodes.client.height / 2} width={nodes.client.width} height={nodes.client.height}>
          <SystemNode
            id="client"
            label="Client"
            icon="client"
            state={getNodeState("client")}
          />
        </foreignObject>

        <foreignObject x={nodes.limiter.x - nodes.limiter.width / 2} y={nodes.limiter.y - nodes.limiter.height / 2} width={nodes.limiter.width} height={nodes.limiter.height}>
          <SystemNode
            id="limiter"
            label="Limiter"
            icon="limiter"
            state={getNodeState("limiter")}
            status={`${state.counter}/${state.limit}`}
            statusVariant={state.counter >= state.limit ? "full" : "default"}
          />
        </foreignObject>

        <foreignObject x={nodes.server.x - nodes.server.width / 2} y={nodes.server.y - nodes.server.height / 2} width={nodes.server.width} height={nodes.server.height}>
          <SystemNode
            id="server"
            label="Server"
            icon="server"
            state={getNodeState("server")}
          />
        </foreignObject>
      </svg>

      {/* Counter below diagram */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <CounterDots current={state.counter} max={state.limit} />
        <button
          onClick={onSendRequest}
          disabled={isAnimating}
          className="rounded-lg border border-brand-text/15 bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider text-brand-text transition-all hover:border-brand-accent/40 hover:bg-brand-accent/5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send Request
        </button>
      </div>

      {/* Live status announcer for screen readers */}
      <div className="sr-only" role="status" aria-live="polite">
        {state.currentRequest?.phase === "rejected" && "Request rejected. Rate limit reached."}
        {state.currentRequest?.phase === "processing" && `Request accepted. Counter: ${state.counter} of ${state.limit}`}
      </div>
    </div>
  );
}
