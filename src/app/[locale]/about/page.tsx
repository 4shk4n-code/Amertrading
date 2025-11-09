import type { Metadata } from "next";
import { AboutView } from "@/components/cms/about-view";
import { getPage } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { portableTextToPlainText } from "@/lib/utils/portableText";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

const fallbackContent = [
  {
    _type: "block",
    children: [
      {
        _type: "span",
        text: "AMER GENERAL TRADING L.L.C unites high-growth industries under one global vision—bridging mobility, food security, fashion, and advanced technologies with uncompromising excellence.",
      },
    ],
  },
  {
    _type: "block",
    children: [
      {
        _type: "span",
        text: "Founded in 1995, we continue to expand our footprint with strategic investments, sustainable partnerships, and a relentless pursuit of innovation.",
      },
    ],
  },
];

const fallbackTimeline = [
  {
    year: "1995",
    headline: "Incorporation",
    description: "AMER GENERAL TRADING L.L.C launches its automotive operations.",
  },
  {
    year: "2008",
    headline: "GCC Expansion",
    description: "Food and retail distribution expanded across the GCC.",
  },
  {
    year: "2018",
    headline: "Digital Transformation",
    description:
      "Established IT & Hardware division supporting regional enterprises.",
  },
  {
    year: "2024",
    headline: "Global Innovation Hub",
    description:
      "Launched innovation studio to accelerate market-disruptive ventures.",
  },
];

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const page = await getPage(locale, "about");

  return (
    <AboutView
      title={page?.title ?? "Global Story"}
      content={page?.content ?? fallbackContent}
      timeline={fallbackTimeline}
    />
  );
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const page = await getPage(locale, "about");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";
  const description = page?.content
    ? portableTextToPlainText(page.content).slice(0, 200)
    : undefined;

  return buildMetadata({
    title: page?.title
      ? `${page.title} | AMER GENERAL TRADING L.L.C`
      : "About AMER GENERAL TRADING L.L.C",
    description:
      description ||
      "Learn about AMER GENERAL TRADING L.L.C’s vision, leadership, and milestones.",
    url: `${baseUrl}/${locale}/about`,
  });
}

