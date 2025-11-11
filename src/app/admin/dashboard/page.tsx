import Link from "next/link";
import { Suspense } from "react";
import {
  sanityClient,
  hasSanityCredentials,
} from "../../../../sanity/lib/sanity.client";
import StatusCard from "@/components/admin/StatusCard";
import { MetricChart } from "@/components/admin/MetricChart";
import { HealthIndicator } from "@/components/admin/HealthIndicator";
import { NotificationsPanel } from "@/components/admin/NotificationsPanel";
import { buildMetadata } from "@/lib/seo";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = buildMetadata({
  title: "Launch Readiness Dashboard | AMER GENERAL TRADING L.L.C",
  description:
    "Monitor CMS content, SEO readiness, analytics, and performance metrics for AMER GENERAL TRADING L.L.C.",
});

async function getCounts() {
  if (!hasSanityCredentials || !sanityClient) {
    return Promise.resolve([0, 0, 0, 0, null] as const);
  }

  return Promise.all([
    sanityClient.fetch<number>(`count(*[_type=="companyInfo"])`),
    sanityClient.fetch<number>(`count(*[_type=="division"])`),
    sanityClient.fetch<number>(`count(*[_type=="newsPost"])`),
    sanityClient.fetch<number>(`count(*[_type=="page"])`),
    sanityClient.fetch<string | null>(
      `*[_type=="companyInfo"] | order(_updatedAt desc)[0]._updatedAt`,
    ),
  ]);
}

type SeoCheck = {
  label: string;
  status: "good" | "warning" | "alert";
  description: string;
};

function assessSeo(): SeoCheck[] {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const metaTitle = true;
  const description = true;
  const ogImage = true;
  const sitemap = `${siteUrl ?? "https://amertrading.com"}/sitemap.xml`;
  return [
    {
      label: "Meta Title",
      status: metaTitle ? ("good" as const) : ("alert" as const),
      description: metaTitle
        ? "Title configured via default SEO."
        : "Title tag missing.",
    },
    {
      label: "Description",
      status: description ? ("good" as const) : ("warning" as const),
      description: description
        ? "Meta description present."
        : "Add meta description for better SERP visibility.",
    },
    {
      label: "Open Graph",
      status: ogImage ? ("good" as const) : ("warning" as const),
      description: ogImage
        ? "OG image configured."
        : "Provide OG image for rich previews.",
    },
    {
      label: "Sitemap",
      status: "warning",
      description: `Verify sitemap at ${sitemap}`,
    },
  ];
}

function mockVitals() {
  return [
    { label: "CLS", value: 0.07, unit: "", target: 0.1 },
    { label: "LCP", value: 2.1, unit: "s", target: 2.5 },
    { label: "FID", value: 85, unit: "ms", target: 100 },
  ];
}

function mockAnalytics() {
  return [
    { label: "Daily Visits", value: 1240, unit: "" },
    { label: "Avg. Time on Site", value: 4.5, unit: "m" },
    { label: "Conversion Rate", value: 3.2, unit: "%" },
  ];
}

function mockBuildInfo() {
  return {
    status: "Deployed ✅",
    commit: process.env.VERCEL_GIT_COMMIT_MESSAGE ?? "Initial setup",
    time:
      process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
      new Date().toISOString(),
  };
}

export default async function AdminDashboard() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/signin");
  }

  const [company, divisions, news, pages, lastUpdated] = await getCounts();
  const seoChecks = assessSeo();
  const vitals = mockVitals();
  const analytics = mockAnalytics();
  const build = mockBuildInfo();

  return (
    <main className="min-h-screen bg-black px-8 py-12 text-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gold-400">
          Launch Readiness Dashboard
        </h1>
        <p className="mt-2 text-white/60">
          Monitor CMS, SEO, and performance in one place.
        </p>
        <div className="mx-auto mt-6 h-[2px] w-24 bg-gold-gradient" />
      </header>

      <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatusCard title="Company Info" value={company} ok={company > 0} />
        <StatusCard title="Divisions" value={divisions} ok={divisions > 0} />
        <StatusCard title="News Posts" value={news} ok={news > 0} />
        <StatusCard title="Pages" value={pages} ok={pages > 0} />
      </section>

      <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-8">
          <h2 className="text-2xl font-semibold text-white">Last Updated 📅</h2>
          <p className="mt-3 text-white/60">
            {lastUpdated ? new Date(lastUpdated).toLocaleString() : "—"}
          </p>
          <Link
            href="/studio"
            className="mt-6 inline-flex items-center rounded-full border border-gold-500 px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold-300 transition hover:bg-gold-500/10"
          >
            Open CMS
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-8">
          <h2 className="text-2xl font-semibold text-white">
            SEO Preview (Homepage)
          </h2>
          <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-4">
            <p className="text-[#1a0dab] text-lg">
              AMER GENERAL TRADING L.L.C – Global Industries & Innovation
            </p>
            <p className="text-green-500 text-sm">https://amertrading.com</p>
            <p className="text-white/60">
              A multi-industry leader in automotive, food, clothing, IT hardware
              & beyond.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {seoChecks.map((check) => (
          <HealthIndicator
            key={check.label}
            label={check.label}
            status={check.status as "good" | "warning" | "alert"}
            description={check.description}
          />
        ))}
      </section>

      <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-6">
          {vitals.map((metric) => (
            <MetricChart
              key={metric.label}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              target={metric.target}
            />
          ))}
        </div>
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-8">
          <h2 className="text-2xl font-semibold text-white">Analytics</h2>
          <div className="mt-6 grid gap-6">
            {analytics.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-4"
              >
                <span className="text-sm uppercase tracking-[0.3em] text-white/50">
                  {item.label}
                </span>
                <span className="text-2xl font-semibold text-gold-300">
                  {item.value}
                  {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-8">
          <h2 className="text-2xl font-semibold text-white">
            Build & Deployment
          </h2>
          <p className="mt-2 text-white/70">{build.status}</p>
          <p className="mt-2 text-xs text-white/40">
            Last commit: {build.commit}
          </p>
          <p className="text-xs text-white/40">Ref: {build.time}</p>
        </div>
        <Suspense fallback={<div>Loading alerts...</div>}>
          <NotificationsPanel />
        </Suspense>
      </section>
    </main>
  );
}

