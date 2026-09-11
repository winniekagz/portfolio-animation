"use client";

import { forwardRef } from "react";
import { Server, Cloud, Database, Shield, Monitor, Box, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NodeState = "default" | "active" | "success" | "rejected" | "dimmed";
type NodeIcon = "client" | "server" | "service" | "limiter" | "database" | "lb";

const iconMap: Record<NodeIcon, LucideIcon> = {
  client: Monitor,
  server: Server,
  service: Cloud,
  limiter: Shield,
  database: Database,
  lb: Box,
};

interface SystemNodeProps {
  id: string;
  label: string;
  icon?: NodeIcon;
  state?: NodeState;
  status?: string;
  statusVariant?: "default" | "full" | "error";
  className?: string;
  style?: React.CSSProperties;
}

export const SystemNode = forwardRef<HTMLDivElement, SystemNodeProps>(function SystemNode(
  { id, label, icon = "server", state = "default", status, statusVariant = "default", className, style },
  ref
) {
  const Icon = iconMap[icon];

  return (
    <div
      ref={ref}
      data-node-id={id}
      data-node-state={state}
      className={cn(
        "flex flex-col items-center justify-center rounded-[0.625rem] border p-4 transition-all duration-150",
        // Default state
        state === "default" && "border-brand-text/10 bg-brand-surface",
        // Active state (receiving request)
        state === "active" &&
          "border-brand-accent/40 bg-brand-accent/5 shadow-[0_0_0_4px_rgba(224,168,198,0.1)]",
        // Success state
        state === "success" && "border-brand-secondary/40 bg-brand-secondary/5",
        // Rejected state
        state === "rejected" && "border-red-500/40 bg-red-500/5",
        // Dimmed state
        state === "dimmed" && "border-brand-text/5 bg-brand-surface/50 opacity-40",
        className
      )}
      style={style}
    >
      <Icon
        className={cn(
          "h-6 w-6",
          state === "default" && "text-brand-text-muted",
          state === "active" && "text-brand-accent",
          state === "success" && "text-brand-secondary",
          state === "rejected" && "text-red-500",
          state === "dimmed" && "text-brand-text-muted/50"
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "mt-2 font-mono text-xs font-medium uppercase tracking-wider",
          state === "default" && "text-brand-text",
          state === "active" && "text-brand-accent",
          state === "success" && "text-brand-secondary",
          state === "rejected" && "text-red-500",
          state === "dimmed" && "text-brand-text/50"
        )}
      >
        {label}
      </span>
      {status && (
        <span
          className={cn(
            "mt-1.5 font-mono text-[10px]",
            statusVariant === "default" && "text-brand-text-muted",
            statusVariant === "full" && "text-brand-accent",
            statusVariant === "error" && "text-red-500"
          )}
        >
          {status}
        </span>
      )}
    </div>
  );
});
