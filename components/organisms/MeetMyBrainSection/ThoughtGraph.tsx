"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { ThoughtNode as ThoughtNodeType } from "@/lib/types";
import {
  allNodes,
  getExperimentBySlug,
  isDomainNode,
  rabbitHoles,
} from "@/lib/data/thought-graph";
import { ThoughtNode } from "./ThoughtNode";
import { ExperimentPanel, NodePanel } from "./ExperimentPanel";

interface ThoughtGraphProps {
  selectedRabbitHole: string;
}

export function ThoughtGraph({ selectedRabbitHole }: ThoughtGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Get current rabbit hole data
  const currentHole = useMemo(
    () => rabbitHoles.find((h) => h.id === selectedRabbitHole) || rabbitHoles[0],
    [selectedRabbitHole]
  );

  // Get the path nodes for current rabbit hole
  const pathNodeIds = useMemo(() => new Set(currentHole.nodeIds), [currentHole]);

  // Update dimensions on resize - height based on number of nodes in path
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Height scales with number of nodes in path (min 400, ~80px per node)
        const nodeCount = currentHole.nodeIds.length;
        const calculatedHeight = Math.max(400, nodeCount * 80);
        setDimensions({
          width: rect.width,
          height: Math.min(calculatedHeight, 700),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [currentHole.nodeIds.length]);

  // Animate nodes on first render
  useEffect(() => {
    if (hasAnimated || !containerRef.current) return;

    const nodes = containerRef.current.querySelectorAll("[data-thought-node]");
    const svg = containerRef.current.querySelector("svg");

    if (reducedMotion) {
      gsap.set(nodes, { opacity: 1, scale: 1 });
      gsap.set(svg, { opacity: 1 });
      setHasAnimated(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setHasAnimated(true),
      });

      // Fade in edges
      tl.fromTo(svg, { opacity: 0 }, { opacity: 1, duration: 0.4 });

      // Animate path nodes first (the selected rabbit hole)
      const pathEls = containerRef.current?.querySelectorAll('[data-in-path="true"]');
      if (pathEls?.length) {
        tl.fromTo(
          pathEls,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.3)" },
          "-=0.2"
        );
      }

      // Then other nodes
      const otherEls = containerRef.current?.querySelectorAll('[data-in-path="false"]');
      if (otherEls?.length) {
        tl.fromTo(
          otherEls,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.02, ease: "power2.out" },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [hasAnimated, reducedMotion]);

  const handleNodeClick = useCallback((node: ThoughtNodeType) => {
    setSelectedNode(selectedNode === node.id ? null : node.id);
  }, [selectedNode]);

  const handleClosePanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedNode) {
        setSelectedNode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode]);

  const selectedNodeData = selectedNode ? allNodes.find((n) => n.id === selectedNode) : null;
  const experiment = selectedNodeData?.experimentSlug
    ? getExperimentBySlug(selectedNodeData.experimentSlug)
    : null;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-5xl"
      style={{ height: dimensions.height }}
      role="application"
      aria-label="Thought graph visualization"
    >
      {/* SVG for edges - vertical connectors between path nodes */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: hasAnimated ? 1 : 0 }}
        aria-hidden="true"
      >
        {currentHole.nodeIds.slice(0, -1).map((nodeId, index) => {
          const totalNodes = currentHole.nodeIds.length;
          const yStart = 12;
          const yEnd = 88;
          const yStep = (yEnd - yStart) / Math.max(totalNodes - 1, 1);

          // Calculate positions matching the node positions
          const xOffset1 = (index % 2 === 0) ? -5 : 5;
          const xOffset2 = ((index + 1) % 2 === 0) ? -5 : 5;
          const x1 = (50 + xOffset1) / 100 * dimensions.width;
          const y1 = (yStart + index * yStep) / 100 * dimensions.height;
          const x2 = (50 + xOffset2) / 100 * dimensions.width;
          const y2 = (yStart + (index + 1) * yStep) / 100 * dimensions.height;

          // Bezier curve
          const midY = (y1 + y2) / 2;

          return (
            <g key={`edge-${index}`}>
              {/* Glow */}
              <path
                d={`M ${x1} ${y1 + 20} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2 - 20}`}
                fill="none"
                stroke="rgba(224, 168, 198, 0.15)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Main line */}
              <path
                d={`M ${x1} ${y1 + 20} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2 - 20}`}
                fill="none"
                stroke="#E0A8C6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={!reducedMotion ? "8 12" : "none"}
              >
                {!reducedMotion && (
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-40"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                )}
              </path>
              {/* Animated dot */}
              {!reducedMotion && (
                <circle r="4" fill="#E0A8C6" opacity="0.8">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M ${x1} ${y1 + 20} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2 - 20}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes - only show nodes in the active path */}
      {allNodes
        .filter((node) => pathNodeIds.has(node.id))
        .map((node, index) => {
          const isCenter = node.id === "center";
          const isDomain = isDomainNode(node.id);
          const isSelected = selectedNode === node.id;
          const totalNodes = currentHole.nodeIds.length;

          // Position nodes in a clean vertical flow
          // Center at top, then flow down
          const yStart = 12;
          const yEnd = 88;
          const yStep = (yEnd - yStart) / Math.max(totalNodes - 1, 1);
          const nodeIndex = currentHole.nodeIds.indexOf(node.id);
          const yPos = yStart + nodeIndex * yStep;

          // Slight horizontal offset for visual interest
          const xOffset = (nodeIndex % 2 === 0) ? -5 : 5;
          const xPos = 50 + xOffset;

          // Calculate size based on node type
          const size = isCenter
            ? { width: 100, height: 52 }
            : isDomain
              ? { width: 140, height: 48 }
              : { width: 130, height: 42 };

          return (
            <ThoughtNode
              key={node.id}
              node={node}
              isCenter={isCenter}
              isFocused={isSelected}
              isConnected={!isSelected}
              isDimmed={false}
              onClick={() => handleNodeClick(node)}
              style={{
                left: `${xPos}%`,
                top: `${yPos}%`,
                width: size.width,
                height: size.height,
                opacity: hasAnimated ? 1 : 0,
              }}
              data-thought-node
              data-node-id={node.id}
              data-node-type={isCenter ? "center" : isDomain ? "domain" : "concept"}
              data-in-path="true"
            />
          );
        })}

      {/* Detail panel */}
      {selectedNodeData && experiment && (
        <ExperimentPanel
          node={selectedNodeData}
          experiment={experiment}
          onClose={handleClosePanel}
        />
      )}

      {selectedNodeData && !experiment && (
        <NodePanel node={selectedNodeData} onClose={handleClosePanel} />
      )}

      {/* Path indicator */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-brand-text-muted/60">
          {currentHole.nodeIds.length} nodes in this path • Click any node to learn more
        </p>
      </div>
    </div>
  );
}
