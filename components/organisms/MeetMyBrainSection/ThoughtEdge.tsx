"use client";

import type { ThoughtEdge as ThoughtEdgeType } from "@/lib/types";
import { nodePositions, getNodeById, isDomainNode } from "@/lib/data/thought-graph";

interface ThoughtEdgeProps {
  edge: ThoughtEdgeType;
  containerWidth: number;
  containerHeight: number;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  animate?: boolean;
}

export function ThoughtEdge({
  edge,
  containerWidth,
  containerHeight,
  isHighlighted,
  isDimmed,
  animate = true,
}: ThoughtEdgeProps) {
  const sourcePos = nodePositions[edge.source];
  const targetPos = nodePositions[edge.target];

  if (!sourcePos || !targetPos) return null;

  // Convert percentage positions to pixels
  const x1 = (sourcePos.x / 100) * containerWidth;
  const y1 = (sourcePos.y / 100) * containerHeight;
  const x2 = (targetPos.x / 100) * containerWidth;
  const y2 = (targetPos.y / 100) * containerHeight;

  // Determine if we should use smooth step (right angles) or bezier (curves)
  // React Flow uses smooth step for most connections
  const sourceIsDomain = isDomainNode(edge.source);
  const targetIsDomain = isDomainNode(edge.target);
  const isFromCenter = edge.source === "center";

  // Calculate control points for bezier curve (like React Flow's bezier edge)
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Bezier control point offsets - create smooth S-curves
  const curvature = Math.min(distance * 0.4, 80);
  
  // For vertical-ish connections, curve horizontally
  // For horizontal-ish connections, curve vertically
  let cx1, cy1, cx2, cy2;
  
  if (Math.abs(dy) > Math.abs(dx)) {
    // More vertical - curve horizontally
    cx1 = x1;
    cy1 = y1 + (dy > 0 ? curvature : -curvature);
    cx2 = x2;
    cy2 = y2 - (dy > 0 ? curvature : -curvature);
  } else {
    // More horizontal - curve vertically
    cx1 = x1 + (dx > 0 ? curvature : -curvature);
    cy1 = y1;
    cx2 = x2 - (dx > 0 ? curvature : -curvature);
    cy2 = y2;
  }

  // Cubic bezier path (like React Flow)
  const pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  // Path length for animation
  const pathLength = distance * 1.3;

  return (
    <g>
      {/* Glow/shadow for highlighted edges */}
      {isHighlighted && (
        <path
          d={pathD}
          fill="none"
          stroke="rgba(224, 168, 198, 0.2)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}
      
      {/* Main edge line */}
      <path
        d={pathD}
        fill="none"
        className={`transition-all duration-300 ${
          isDimmed
            ? "stroke-brand-text/8"
            : isHighlighted
              ? "stroke-brand-accent"
              : "stroke-brand-text/20"
        }`}
        strokeWidth={isHighlighted ? 2 : 1}
        strokeLinecap="round"
        style={{
          strokeDasharray: animate && isHighlighted ? `${pathLength * 0.15} ${pathLength * 0.85}` : "none",
        }}
      >
        {animate && isHighlighted && (
          <animate
            attributeName="stroke-dashoffset"
            values={`0;${-pathLength}`}
            dur="2.5s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Animated dot for highlighted paths */}
      {animate && isHighlighted && (
        <circle r="3" fill="#E0A8C6" opacity="0.8">
          <animateMotion dur="2.5s" repeatCount="indefinite" path={pathD} />
        </circle>
      )}
    </g>
  );
}
