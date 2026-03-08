"use client";

import { useEffect, useRef } from "react";

/**
 * Subscribe to a DOM event on target (default window) with cleanup on unmount.
 */
export function useEventListener<K extends keyof WindowEventMap>(
  event: K,
  handler: (e: WindowEventMap[K]) => void,
  target: Window | Document | HTMLElement | null = typeof window !== "undefined" ? window : null,
  options?: AddEventListenerOptions
): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const targetEl = target ?? window;
    const wrapped = (e: WindowEventMap[K]) => handlerRef.current(e);
    targetEl.addEventListener(event, wrapped as EventListener, options);
    return () => targetEl.removeEventListener(event, wrapped as EventListener, options);
    // `options` is intentionally excluded from deps — only `capture` affects listener
    // identity; including the full object would cause re-subscription on every render
    // if the caller passes an inline object literal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, target, options?.capture]);
}
