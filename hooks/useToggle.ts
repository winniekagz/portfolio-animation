import { useState, useCallback, useMemo } from "react";

/**
 * Reusable boolean toggle state.
 * @param initialState - Initial open state (default false).
 * @returns { isOpen, setOpen, open, close, toggle, openFn } - openFn is an alias for open.
 */
export default function useToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const setOpen = useCallback((value: boolean) => setIsOpen(value), []);

  return useMemo(
    () => ({
      isOpen,
      setOpen,
      open,
      close,
      toggle,
      openFn: open,
    }),
    [isOpen, setOpen, open, close, toggle]
  );
}