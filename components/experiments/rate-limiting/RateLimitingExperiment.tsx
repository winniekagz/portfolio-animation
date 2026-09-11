"use client";

import { useState, useCallback } from "react";
import {
  ExperimentShell,
  ExperimentHeader,
  ExperimentStage,
  ExperimentButton,
  ObservationPanel,
  ObservationText,
  ObservationHighlight,
  PerspectiveToggle,
  RabbitHoleTrail,
} from "../shared";
import { SingleServerDiagram } from "./SingleServerDiagram";
import { DualServerDiagram } from "./DualServerDiagram";
import { RedisDiagram } from "./RedisDiagram";
import { HumanViewPanel } from "./HumanViewPanel";
import { XRayPanel } from "./XRayPanel";
import { useRateLimitSimulator, type Architecture } from "./useRateLimitSimulator";

type Perspective = "system" | "human";

export function RateLimitingExperiment() {
  const { state, sendRequest, reset, setArchitecture, advancePhase, isAnimating } =
    useRateLimitSimulator();

  const [perspective, setPerspective] = useState<Perspective>("system");
  const [showHumanView, setShowHumanView] = useState(false);
  const [showXRay, setShowXRay] = useState(false);
  const [showBreakIt, setShowBreakIt] = useState(false);
  const [showRedesign, setShowRedesign] = useState(false);
  const [showTradeoffs, setShowTradeoffs] = useState(false);

  // Progressive disclosure triggers
  const handleSendRequest = useCallback(
    (serverId?: "a" | "b") => {
      sendRequest(serverId);

      // After first rejection, reveal Human View option
      if (state.counter >= state.limit - 1 && !showHumanView) {
        setTimeout(() => setShowHumanView(true), 600);
      }
    },
    [sendRequest, state.counter, state.limit, showHumanView]
  );

  const handleShowXRay = useCallback(() => {
    setShowXRay(true);
  }, []);

  const handleShowBreakIt = useCallback(() => {
    setShowBreakIt(true);
    advancePhase("break-it");
  }, [advancePhase]);

  const handleFixIt = useCallback(() => {
    setArchitecture("redis");
    setShowRedesign(true);
    advancePhase("fix");
    reset();
  }, [setArchitecture, advancePhase, reset]);

  const handleShowTradeoffs = useCallback(() => {
    setShowTradeoffs(true);
    advancePhase("compare");
  }, [advancePhase]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleSwitchArchitecture = useCallback(
    (arch: Architecture) => {
      setArchitecture(arch);
      reset();
    },
    [setArchitecture, reset]
  );

  return (
    <ExperimentShell>
      <ExperimentHeader
        number="001"
        title="Rate Limiting Under Load"
        question="Why does my rate limiter let through more requests than it should?"
        tags={["distributed-systems", "redis", "concurrency"]}
        readingTime="~8 min interactive"
      />

      {/* Stage 1: Explore - Single Server */}
      <ExperimentStage eyebrow="Explore" title="The Simple Case">
        <p className="mb-6 text-brand-text-muted max-w-2xl">
          A single server with a rate limiter. Send requests and watch the counter.
          What happens when you reach the limit?
        </p>

        <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
          <SingleServerDiagram
            state={state}
            onSendRequest={() => handleSendRequest()}
            isAnimating={isAnimating}
          />

          {/* Progressive reveal: Human View panel */}
          {showHumanView && (
            <div className="space-y-4">
              <PerspectiveToggle value={perspective} onChange={setPerspective} />

              {perspective === "human" ? (
                <HumanViewPanel state={state} />
              ) : showXRay ? (
                <XRayPanel state={state} />
              ) : (
                <div className="text-center py-8">
                  <ExperimentButton onClick={handleShowXRay}>
                    Show X-Ray View
                  </ExperimentButton>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Observation after rejection */}
        {state.hasSeenRejection && !showBreakIt && (
          <div className="mt-8">
            <ObservationPanel>
              <ObservationText>
                <ObservationHighlight>Observation:</ObservationHighlight> The rate limiter works 
                perfectly with one server. The counter increments, hits the limit, and rejects 
                excess requests. Simple.
              </ObservationText>
              <div className="mt-4">
                <ExperimentButton onClick={handleShowBreakIt} variant="primary">
                  But what if there are two servers?
                </ExperimentButton>
              </div>
            </ObservationPanel>
          </div>
        )}
      </ExperimentStage>

      {/* Stage 2: Break It - Dual Server */}
      <ExperimentStage eyebrow="Stress It" title="Add Another Server" revealed={showBreakIt}>
        <p className="mb-6 text-brand-text-muted max-w-2xl">
          In production, you usually have multiple servers behind a load balancer. 
          Each server has its own rate limiter with its own counter. What happens now?
        </p>

        <DualServerDiagram
          state={state}
          onSendRequest={handleSendRequest}
          isAnimating={isAnimating}
        />

        {/* Problem observation */}
        {state.counter + state.counterB > state.limit && !showRedesign && (
          <div className="mt-8">
            <ObservationPanel variant="warning">
              <ObservationText>
                <ObservationHighlight>The problem:</ObservationHighlight> Each server tracks 
                its own counter independently. A user can make {state.limit} requests to 
                Server A AND {state.limit} more to Server B = {state.limit * 2} total requests 
                when the limit should be {state.limit}.
              </ObservationText>
              <div className="mt-4">
                <ExperimentButton onClick={handleFixIt} variant="primary">
                  How do we fix this?
                </ExperimentButton>
              </div>
            </ObservationPanel>
          </div>
        )}
      </ExperimentStage>

      {/* Stage 3: Redesign - Redis Shared State */}
      <ExperimentStage eyebrow="Redesign" title="Shared State with Redis" revealed={showRedesign}>
        <p className="mb-6 text-brand-text-muted max-w-2xl">
          Move the counter to a shared data store. Now all servers check the same counter.
          Try sending requests to both servers again.
        </p>

        <RedisDiagram
          state={state}
          onSendRequest={handleSendRequest}
          isAnimating={isAnimating}
        />

        {/* Success observation */}
        {state.counter >= state.limit && !showTradeoffs && (
          <div className="mt-8">
            <ObservationPanel variant="success">
              <ObservationText>
                <ObservationHighlight>Fixed!</ObservationHighlight> With a shared counter in Redis, 
                all servers see the same state. The limit is now enforced globally, regardless of 
                which server handles the request.
              </ObservationText>
              <div className="mt-4">
                <ExperimentButton onClick={handleShowTradeoffs} variant="primary">
                  What's the trade-off?
                </ExperimentButton>
              </div>
            </ObservationPanel>
          </div>
        )}
      </ExperimentStage>

      {/* Stage 4: Trade-offs */}
      <ExperimentStage eyebrow="Trade-offs" title="Nothing Is Free" revealed={showTradeoffs}>
        <div className="grid gap-6 md:grid-cols-2">
          <ObservationPanel>
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent mb-3">
              Before (In-Memory)
            </h4>
            <ul className="space-y-2 text-sm text-brand-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-brand-secondary">✓</span>
                <span>Fast (nanoseconds)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-secondary">✓</span>
                <span>No network latency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-secondary">✓</span>
                <span>No external dependencies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Doesn't scale horizontally</span>
              </li>
            </ul>
          </ObservationPanel>

          <ObservationPanel>
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent mb-3">
              After (Redis)
            </h4>
            <ul className="space-y-2 text-sm text-brand-text-muted">
              <li className="flex items-start gap-2">
                <span className="text-brand-secondary">✓</span>
                <span>Works across servers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-secondary">✓</span>
                <span>Consistent limits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Network round-trip (~1-2ms)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Redis becomes a dependency</span>
              </li>
            </ul>
          </ObservationPanel>
        </div>

        <div className="mt-8">
          <ObservationPanel>
            <ObservationText>
              <ObservationHighlight>New question:</ObservationHighlight> What happens if 
              two requests hit Redis at exactly the same time? Do we have a race condition?
            </ObservationText>
          </ObservationPanel>
        </div>

        <div className="mt-8">
          <RabbitHoleTrail
            nextQuestion="Can two requests increment the counter at the same time and both get through?"
            concepts={["atomicity", "INCR", "Lua scripts", "race conditions"]}
            href="#"
          />
        </div>
      </ExperimentStage>

      {/* Reset button */}
      {showBreakIt && (
        <div className="fixed bottom-6 right-6 z-50">
          <ExperimentButton onClick={handleReset} variant="ghost" size="sm">
            Reset
          </ExperimentButton>
        </div>
      )}
    </ExperimentShell>
  );
}
