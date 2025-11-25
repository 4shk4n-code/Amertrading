"use client";

import { useEffect, useState } from "react";

/**
 * Conditionally loads analytics only on Vercel and modern browsers
 * Completely disabled on non-Vercel deployments to prevent 404 errors
 */
export function ConditionalAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [Analytics, setAnalytics] = useState<any>(null);
  const [SpeedInsights, setSpeedInsights] = useState<any>(null);

  useEffect(() => {
    // Check if we're on Vercel (client-side check)
    const isVercel = 
      typeof window !== "undefined" && 
      (window.location.hostname.includes('vercel.app') || 
       window.location.hostname.includes('vercel.dev'));

    if (!isVercel) {
      // Not on Vercel - completely skip loading analytics
      return;
    }

    // Check if browser supports modern features
    const isModernBrowser =
      typeof window !== "undefined" &&
      "fetch" in window &&
      "Promise" in window &&
      "Map" in window &&
      "Set" in window &&
      typeof Symbol !== "undefined";

    // Detect TV browsers (common user agents)
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isTVBrowser =
      /SmartTV|Tizen|webOS|NetCast|BRAVIA|LG Browser|Samsung/i.test(
        userAgent,
      ) ||
      /CrKey|AFT[A-Z]|AppleTV|TV/i.test(userAgent);

    // Only load analytics on Vercel, modern browsers that are not TVs
    if (isModernBrowser && !isTVBrowser) {
      // Dynamically import only when needed (lazy loading)
      Promise.all([
        import("@vercel/analytics/react"),
        import("@vercel/speed-insights/next")
      ]).then(([analyticsMod, speedMod]) => {
        setAnalytics(() => analyticsMod.Analytics);
        setSpeedInsights(() => speedMod.SpeedInsights);
        setShouldLoad(true);
      }).catch(() => {
        // Silently fail if imports fail
        setShouldLoad(false);
      });
    }
  }, []);

  if (!shouldLoad || !Analytics || !SpeedInsights) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

