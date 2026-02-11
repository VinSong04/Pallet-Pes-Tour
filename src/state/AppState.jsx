import React, { createContext, useContext, useMemo, useState } from "react";
import { TEMPLATE } from "../data/template";
import { loadState, saveState, resetState } from "../utils/storage";

export const Ctx = createContext(null);  // ← Export it here

export function AppStateProvider({ children }) {
  const [state, setState] = useState(() => loadState(TEMPLATE));

  function updateState(updater) {
    setState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  }

  function reset() { setState(resetState(TEMPLATE)); }

  const value = useMemo(() => ({ state, updateState, reset }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState must be used within AppStateProvider");
  return v;
}