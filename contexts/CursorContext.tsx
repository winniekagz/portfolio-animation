"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type CursorContextValue = {
  isHoveringMenuLink: boolean;
  setHoveringMenuLink: (value: boolean) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [isHoveringMenuLink, setHoveringMenuLink] = useState(false);
  const setHovering = useCallback((value: boolean) => setHoveringMenuLink(value), []);
  return (
    <CursorContext.Provider
      value={{ isHoveringMenuLink, setHoveringMenuLink: setHovering }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  return ctx;
}
