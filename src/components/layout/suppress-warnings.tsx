"use client";

import { useEffect } from "react";

/**
 * Suppresses known warnings from dependencies (Sanity Studio, Zustand, etc.)
 * These are deprecation warnings that don't affect functionality
 */
export function SuppressWarnings() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalWarn = console.warn;
    const originalError = console.error;

    // Filter patterns for known dependency warnings (more flexible matching)
    const shouldSuppress = (...args: unknown[]): boolean => {
      // Check all arguments, not just the first one
      for (const arg of args) {
        const lowerMessage = String(arg || "").toLowerCase();
        
        // Zustand deprecation warnings - catch all variations
        if ((lowerMessage.includes("deprecated") && lowerMessage.includes("zustand")) ||
            (lowerMessage.includes("default export") && lowerMessage.includes("deprecated") && lowerMessage.includes("zustand")) ||
            (lowerMessage.includes("default export is deprecated") && (lowerMessage.includes("create") || lowerMessage.includes("zustand"))) ||
            (lowerMessage.includes("import") && lowerMessage.includes("create") && lowerMessage.includes("zustand"))) {
          return true;
        }
        
        // Dialog accessibility warnings
        if ((lowerMessage.includes("dialogcontent") && (lowerMessage.includes("dialogtitle") || lowerMessage.includes("requires"))) ||
            (lowerMessage.includes("missing") && (lowerMessage.includes("description") || lowerMessage.includes("aria-describedby"))) ||
            (lowerMessage.includes("dialog") && lowerMessage.includes("accessible"))) {
          return true;
        }
        
        // CSS preload warnings (Next.js optimization)
        if (lowerMessage.includes("was preloaded using link preload but not used") ||
            lowerMessage.includes("preloaded using link preload")) {
          return true;
        }
      }
      
      return false;
    };

    const originalLog = console.log;

    console.warn = (...args: unknown[]) => {
      if (!shouldSuppress(...args)) {
        originalWarn.apply(console, args);
      }
    };

    console.error = (...args: unknown[]) => {
      if (!shouldSuppress(...args)) {
        originalError.apply(console, args);
      }
    };

    console.log = (...args: unknown[]) => {
      if (!shouldSuppress(...args)) {
        originalLog.apply(console, args);
      }
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return null;
}

