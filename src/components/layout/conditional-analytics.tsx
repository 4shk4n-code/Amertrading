"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Conditionally loads analytics only on Vercel and modern browsers
 * TV browsers often have issues with modern JavaScript, so we skip analytics
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
       window.location.hostname.includes('vercel.dev') ||
       process.env.NEXT_PUBLIC_VERCEL === '1');

    if (!isVercel) {
      // Not on Vercel - don't load analytics
      setShouldLoad(false);
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
      // Dynamically import only when needed
      import("@vercel/analytics/react").then((mod) => {
        setAnalytics(() => mod.Analytics);
      });
      import("@vercel/speed-insights/next").then((mod) => {
        setSpeedInsights(() => mod.SpeedInsights);
      });
      setShouldLoad(true);
    } else {
      setShouldLoad(false);
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

