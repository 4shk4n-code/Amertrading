"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";

// Dynamically import SpeedInsights to avoid SSR issues
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false },
);

/**
 * Conditionally loads analytics only on Vercel and modern browsers
 * TV browsers often have issues with modern JavaScript, so we skip analytics
 */
export function ConditionalAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load on Vercel (check for Vercel environment variable)
    const isVercel = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL;
    if (!isVercel) {
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
    setShouldLoad(isModernBrowser && !isTVBrowser);
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

