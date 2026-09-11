"use client";

import { useReducer, useCallback, useRef } from "react";

export type RequestPhase = "idle" | "sending" | "at-limiter" | "processing" | "response" | "rejected";

export type Architecture = "single" | "dual" | "redis";

export interface Request {
  id: string;
  phase: RequestPhase;
  server?: "a" | "b";
  outcome?: "success" | "rejected";
}

export interface SimulatorState {
  architecture: Architecture;
  counter: number;
  counterB: number; // For dual-server scenario
  limit: number;
  requests: Request[];
  currentRequest: Request | null;
  totalSuccessful: number;
  totalRejected: number;
  hasReachedLimit: boolean;
  hasSeenRejection: boolean;
  phase: "explore" | "observe" | "break-it" | "fix" | "compare";
}

type SimulatorAction =
  | { type: "SEND_REQUEST"; serverId?: "a" | "b" }
  | { type: "REQUEST_AT_LIMITER" }
  | { type: "REQUEST_PROCESSING" }
  | { type: "REQUEST_COMPLETE"; outcome: "success" | "rejected" }
  | { type: "RESET" }
  | { type: "SET_ARCHITECTURE"; architecture: Architecture }
  | { type: "ADVANCE_PHASE"; phase: SimulatorState["phase"] };

const initialState: SimulatorState = {
  architecture: "single",
  counter: 0,
  counterB: 0,
  limit: 5,
  requests: [],
  currentRequest: null,
  totalSuccessful: 0,
  totalRejected: 0,
  hasReachedLimit: false,
  hasSeenRejection: false,
  phase: "explore",
};

function simulatorReducer(state: SimulatorState, action: SimulatorAction): SimulatorState {
  switch (action.type) {
    case "SEND_REQUEST": {
      const id = `req-${Date.now()}`;
      const server = state.architecture === "dual" ? (action.serverId || "a") : undefined;
      const newRequest: Request = {
        id,
        phase: "sending",
        server,
      };
      return {
        ...state,
        currentRequest: newRequest,
        requests: [...state.requests, newRequest],
      };
    }

    case "REQUEST_AT_LIMITER": {
      if (!state.currentRequest) return state;
      return {
        ...state,
        currentRequest: {
          ...state.currentRequest,
          phase: "at-limiter",
        },
      };
    }

    case "REQUEST_PROCESSING": {
      if (!state.currentRequest) return state;

      // Check limit based on architecture and server
      const getCounter = () => {
        if (state.architecture === "dual" && state.currentRequest?.server === "b") {
          return state.counterB;
        }
        return state.counter;
      };

      const currentCounter = getCounter();
      const willReject = currentCounter >= state.limit;

      if (willReject) {
        return {
          ...state,
          currentRequest: {
            ...state.currentRequest,
            phase: "rejected",
            outcome: "rejected",
          },
        };
      }

      // Increment counter
      const newCounter =
        state.architecture === "dual" && state.currentRequest.server === "b"
          ? state.counter
          : state.counter + 1;
      const newCounterB =
        state.architecture === "dual" && state.currentRequest.server === "b"
          ? state.counterB + 1
          : state.counterB;

      return {
        ...state,
        counter: state.architecture === "redis" ? state.counter + 1 : newCounter,
        counterB: newCounterB,
        currentRequest: {
          ...state.currentRequest,
          phase: "processing",
        },
        hasReachedLimit: newCounter >= state.limit || newCounterB >= state.limit,
      };
    }

    case "REQUEST_COMPLETE": {
      if (!state.currentRequest) return state;
      const isRejected = action.outcome === "rejected";
      return {
        ...state,
        currentRequest: null,
        requests: state.requests.map((req) =>
          req.id === state.currentRequest!.id
            ? { ...req, phase: "idle" as RequestPhase, outcome: action.outcome }
            : req
        ),
        totalSuccessful: isRejected ? state.totalSuccessful : state.totalSuccessful + 1,
        totalRejected: isRejected ? state.totalRejected + 1 : state.totalRejected,
        hasSeenRejection: state.hasSeenRejection || isRejected,
      };
    }

    case "RESET": {
      return {
        ...initialState,
        architecture: state.architecture,
        phase: state.phase,
      };
    }

    case "SET_ARCHITECTURE": {
      return {
        ...initialState,
        architecture: action.architecture,
        phase: state.phase === "explore" ? "break-it" : state.phase,
      };
    }

    case "ADVANCE_PHASE": {
      return {
        ...state,
        phase: action.phase,
      };
    }

    default:
      return state;
  }
}

export function useRateLimitSimulator() {
  const [state, dispatch] = useReducer(simulatorReducer, initialState);
  const animationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const sendRequest = useCallback(
    (serverId?: "a" | "b") => {
      // Don't allow concurrent requests
      if (state.currentRequest) return;

      dispatch({ type: "SEND_REQUEST", serverId });

      // Simulate request traveling through the system
      animationTimeoutRef.current = setTimeout(() => {
        dispatch({ type: "REQUEST_AT_LIMITER" });

        animationTimeoutRef.current = setTimeout(() => {
          dispatch({ type: "REQUEST_PROCESSING" });

          animationTimeoutRef.current = setTimeout(() => {
            const outcome = state.counter >= state.limit ? "rejected" : "success";
            dispatch({ type: "REQUEST_COMPLETE", outcome });
          }, 200);
        }, 150);
      }, 200);
    },
    [state.currentRequest, state.counter, state.limit]
  );

  const reset = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    dispatch({ type: "RESET" });
  }, []);

  const setArchitecture = useCallback((architecture: Architecture) => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    dispatch({ type: "SET_ARCHITECTURE", architecture });
  }, []);

  const advancePhase = useCallback((phase: SimulatorState["phase"]) => {
    dispatch({ type: "ADVANCE_PHASE", phase });
  }, []);

  return {
    state,
    sendRequest,
    reset,
    setArchitecture,
    advancePhase,
    isAnimating: state.currentRequest !== null,
  };
}
