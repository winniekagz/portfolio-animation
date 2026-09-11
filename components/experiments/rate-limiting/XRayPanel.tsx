"use client";

import { ObservationPanel, ObservationText, ObservationHighlight } from "../shared/ObservationPanel";
import type { SimulatorState } from "./useRateLimitSimulator";

interface XRayPanelProps {
  state: SimulatorState;
}

export function XRayPanel({ state }: XRayPanelProps) {
  const atLimit = state.counter >= state.limit;
  const showDualCounterInsight = state.architecture === "dual";

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
        X-Ray View
      </h3>

      <ObservationPanel>
        <div className="space-y-4">
          {/* Internal state */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-brand-text-muted mb-3">
              Internal State
            </p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-brand-text-muted">counter{showDualCounterInsight && "_a"}</span>
                <span className={atLimit ? "text-red-500" : "text-brand-text"}>{state.counter}</span>
              </div>
              {showDualCounterInsight && (
                <div className="flex justify-between">
                  <span className="text-brand-text-muted">counter_b</span>
                  <span className={state.counterB >= state.limit ? "text-red-500" : "text-brand-text"}>
                    {state.counterB}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-brand-text-muted">limit</span>
                <span className="text-brand-text">{state.limit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-text-muted">window</span>
                <span className="text-brand-text">60s</span>
              </div>
            </div>
          </div>

          {/* Decision logic */}
          <div className="border-t border-brand-text/10 pt-4">
            <p className="font-mono text-xs uppercase tracking-wider text-brand-text-muted mb-3">
              Decision Logic
            </p>
            <code className="block rounded bg-brand-bg p-3 font-mono text-xs">
              <span className="text-brand-accent">if</span>{" "}
              <span className="text-brand-text">(counter &gt;= limit)</span> {"{"}
              <br />
              {"  "}
              <span className="text-red-400">reject</span>
              <span className="text-brand-text-muted">(429)</span>
              <br />
              {"}"} <span className="text-brand-accent">else</span> {"{"}
              <br />
              {"  "}counter++
              <br />
              {"  "}
              <span className="text-brand-secondary">allow</span>
              <span className="text-brand-text-muted">()</span>
              <br />
              {"}"}
            </code>
          </div>
        </div>
      </ObservationPanel>

      {/* Key insight */}
      <ObservationPanel variant={atLimit ? "warning" : "default"}>
        <ObservationText>
          {showDualCounterInsight ? (
            <>
              <ObservationHighlight>Problem:</ObservationHighlight> Each server has its own counter. 
              A user could make 5 requests to Server A AND 5 more to Server B = 10 total requests when 
              the limit should be 5.
            </>
          ) : (
            <>
              <ObservationHighlight>Key insight:</ObservationHighlight> The counter is just a number in 
              memory. It resets when the window expires (typically 60s). This is "fixed window" rate limiting.
            </>
          )}
        </ObservationText>
      </ObservationPanel>
    </div>
  );
}
