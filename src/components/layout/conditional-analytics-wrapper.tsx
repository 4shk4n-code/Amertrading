"use client";

import dynamic from "next/dynamic";

const ConditionalAnalytics = dynamic(
  () =>
    import("@/components/layout/conditional-analytics").then(
      (mod) => mod.ConditionalAnalytics
    ),
  { ssr: false }
);

export default function ConditionalAnalyticsWrapper() {
  return <ConditionalAnalytics />;
}
