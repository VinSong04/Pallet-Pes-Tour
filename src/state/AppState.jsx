import React, { createContext, useContext, useMemo, useState, useEffect, useRef } from "react";
import { TEMPLATE } from "../data/template";
import { loadState, saveState, resetState } from "../utils/storage";
import {
  loadStateFromFirebase,
  saveStateToFirebase,
  subscribeToFirebase,
  resetFirebaseData
} from "../firebase/database";

export const Ctx = createContext(null);

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  try {
    // This will throw if firebase config has placeholder values
    const config = import.meta.env;
    return !config.VITE_FIREBASE_API_KEY?.includes('YOUR_');
  } catch {
    return false;
  }
};

const USE_FIREBASE = isFirebaseConfigured();

export function AppStateProvider({ children }) {
  const [state, setState] = useState(() => loadState(TEMPLATE));
  const [isLoading, setIsLoading] = useState(USE_FIREBASE);
  const isUpdatingFromFirebase = useRef(false);

  // Load initial data from Firebase
  useEffect(() => {
    if (!USE_FIREBASE) return;

    async function loadInitialData() {
      try {
        const data = await loadStateFromFirebase(TEMPLATE);
        // If Firebase is not configured, loadStateFromFirebase returns null
        if (data) {
          setState(data);
        } else {
          // Firebase not configured, use localStorage
          setState(loadState(TEMPLATE));
        }
      } catch (error) {
        console.error('Failed to load from Firebase, using localStorage:', error);
        setState(loadState(TEMPLATE));
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Subscribe to real-time updates from Firebase
  useEffect(() => {
    if (!USE_FIREBASE) return;

    const unsubscribe = subscribeToFirebase((data) => {
      // Prevent infinite loops - don't update if we just saved
      if (!isUpdatingFromFirebase.current) {
        isUpdatingFromFirebase.current = true;
        setState(data);
        // Also save to localStorage as backup
        saveState(data);
        setTimeout(() => {
          isUpdatingFromFirebase.current = false;
        }, 100);
      }
    });

    return unsubscribe;
  }, []);

  function updateState(updater) {
    setState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;

      // Save to localStorage (always, as backup)
      saveState(next);

      // Save to Firebase if configured
      if (USE_FIREBASE) {
        saveStateToFirebase(next).catch(error => {
          console.error('Failed to save to Firebase:', error);
        });
      }

      return next;
    });
  }

  async function reset() {
    if (USE_FIREBASE) {
      try {
        const resetData = await resetFirebaseData(TEMPLATE);
        setState(resetData);
        saveState(resetData);
      } catch (error) {
        console.error('Failed to reset Firebase data:', error);
        setState(resetState(TEMPLATE));
      }
    } else {
      setState(resetState(TEMPLATE));
    }
  }

  const value = useMemo(() => ({
    state,
    updateState,
    reset,
    isLoading,
    usingFirebase: USE_FIREBASE
  }), [state, isLoading]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState must be used within AppStateProvider");
  return v;
}