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

    // Filter out known dependency warnings
    const filteredMessages = [
      "[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`",
      "DialogContent requires a DialogTitle",
      "Missing `Description` or `aria-describedby`",
    ];

    console.warn = (...args: unknown[]) => {
      const message = String(args[0] || "");
      if (!filteredMessages.some((filter) => message.includes(filter))) {
        originalWarn.apply(console, args);
      }
    };

    console.error = (...args: unknown[]) => {
      const message = String(args[0] || "");
      if (!filteredMessages.some((filter) => message.includes(filter))) {
        originalError.apply(console, args);
      }
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return null;
}

