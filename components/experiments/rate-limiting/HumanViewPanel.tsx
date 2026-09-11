"use client";

import { ObservationPanel, ObservationText, ObservationHighlight } from "../shared/ObservationPanel";
import type { SimulatorState } from "./useRateLimitSimulator";

interface HumanViewPanelProps {
  state: SimulatorState;
}

export function HumanViewPanel({ state }: HumanViewPanelProps) {
  const hasRejection = state.hasSeenRejection;
  const atLimit = state.counter >= state.limit;

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
        Human Experience
      </h3>

      <ObservationPanel variant={hasRejection ? "warning" : "default"}>
        <div className="space-y-4">
          {/* Current state */}
          <div className="flex items-center gap-3">
            <span
              className={`inline-block h-3 w-3 rounded-full ${
                hasRejection ? "bg-red-500" : atLimit ? "bg-yellow-500" : "bg-brand-secondary"
              }`}
            />
            <span className="font-mono text-sm">
              {hasRejection
                ? "Rate limited"
                : atLimit
                ? "Approaching limit"
                : "Normal operation"}
            </span>
          </div>

          {/* What the user sees */}
          <div className="rounded-lg border border-brand-text/10 bg-brand-bg p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-brand-text-muted mb-2">
              What the user sees:
            </p>
            {hasRejection ? (
              <div className="rounded border border-red-500/30 bg-red-500/10 p-3">
                <p className="font-mono text-sm text-red-400">429 Too Many Requests</p>
                <p className="mt-1 text-xs text-brand-text-muted">Please try again later.</p>
              </div>
            ) : (
              <div className="rounded border border-brand-secondary/30 bg-brand-secondary/10 p-3">
                <p className="font-mono text-sm text-brand-secondary">200 OK</p>
                <p className="mt-1 text-xs text-brand-text-muted">Request successful.</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-xs text-brand-text-muted">Successful</p>
              <p className="mt-1 font-mono text-2xl text-brand-secondary">{state.totalSuccessful}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-brand-text-muted">Rejected</p>
              <p className="mt-1 font-mono text-2xl text-red-500">{state.totalRejected}</p>
            </div>
          </div>
        </div>
      </ObservationPanel>

      {/* Insight */}
      {hasRejection && (
        <ObservationPanel>
          <ObservationText>
            <ObservationHighlight>From the user's perspective</ObservationHighlight>, there's no way to know 
            how close they are to the limit until they hit it. The 429 response is the only signal.
          </ObservationText>
        </ObservationPanel>
      )}
    </div>
  );
}
