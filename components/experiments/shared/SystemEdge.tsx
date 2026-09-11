"use client";

interface SystemEdgeProps {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  state?: "default" | "active" | "rejected";
}

export function SystemEdge({ id, from, to, state = "default" }: SystemEdgeProps) {
  const midY = (from.y + to.y) / 2;
  const pathD = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;

  return (
    <path
      id={id}
      d={pathD}
      fill="none"
      stroke={
        state === "active"
          ? "rgba(224, 168, 198, 0.5)"
          : state === "rejected"
          ? "rgba(239, 68, 68, 0.3)"
          : "rgba(255, 255, 255, 0.1)"
      }
      strokeWidth={state === "active" || state === "rejected" ? 2 : 1}
      strokeDasharray={state === "rejected" ? "4 4" : undefined}
      className="transition-all duration-150"
    />
  );
}
