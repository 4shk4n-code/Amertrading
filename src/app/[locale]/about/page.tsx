import type { Metadata } from "next";
import { Suspense } from "react";
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
        text: "AMER DUBAI TRADING L.L.C stands as a beacon of excellence in the global marketplace—a powerhouse that seamlessly connects continents, industries, and opportunities. With an unwavering commitment to excellence, we've transformed from a regional distributor into a multinational conglomerate that shapes the future of commerce across the Middle East, Asia, and beyond.",
      },
    ],
  },
  {
    _type: "block",
    children: [
      {
        _type: "span",
        text: "For over three decades, we've been the trusted partner of choice for Fortune 500 companies, government entities, and industry leaders worldwide. Our strategic vision has positioned us at the intersection of innovation and tradition, where cutting-edge technology meets time-tested business excellence.",
      },
    ],
  },
  {
    _type: "block",
    children: [
      {
        _type: "span",
        text: "What sets us apart isn't just our scale—it's our soul. Every transaction, every partnership, every innovation is built on a foundation of integrity, reliability, and an unshakeable commitment to exceeding expectations. We don't just deliver products; we deliver possibilities. We don't just serve markets; we transform them.",
      },
    ],
  },
  {
    _type: "block",
    children: [
      {
        _type: "span",
        text: "Our portfolio spans automotive excellence, food security solutions, lifestyle innovation, and technological advancement—each division operating with the precision of a specialist and the power of a global network. With operations across 28 markets, strategic partnerships with 120+ world-class brands, and a team of over 3,200 dedicated professionals, we're not just participating in the global economy—we're actively shaping it.",
      },
    ],
  },
];

const fallbackTimeline = [
  {
    year: "1995",
    headline: "The Foundation of Excellence",
    description: "AMER DUBAI TRADING L.L.C was born from a vision to bridge global markets with Middle Eastern excellence. Our automotive division quickly became the region's most trusted partner, establishing relationships with world-renowned manufacturers that would define our commitment to quality for decades to come.",
  },
  {
    year: "2008",
    headline: "Regional Dominance Achieved",
    description: "Our strategic expansion across the GCC transformed us into a multi-sector powerhouse. We revolutionized food distribution, redefined retail experiences, and became the backbone of supply chains serving millions. This was the moment we proved that ambition, when matched with execution, knows no bounds.",
  },
  {
    year: "2018",
    headline: "Digital Revolution Leadership",
    description: "Recognizing the future belongs to those who embrace technology, we launched our IT & Hardware division, positioning ourselves as the region's premier technology partner. We didn't just adapt to the digital age—we helped define it, empowering enterprises across the Middle East with cutting-edge solutions.",
  },
  {
    year: "2024",
    headline: "Global Innovation Authority",
    description: "Today, we stand as a global innovation hub, accelerating market-disruptive ventures and pioneering the future of commerce. With a portfolio spanning continents and industries, we've become more than a company—we're a movement, a trusted partner, and a force for positive transformation in every market we touch.",
  },
];

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const page = await getPage(locale, "about");

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <AboutView
        title={page?.title ?? "Global Story"}
        content={page?.content ?? fallbackContent}
        timeline={fallbackTimeline}
      />
    </Suspense>
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
      ? `${page.title} | AMER DUBAI TRADING L.L.C`
      : "About Us | AMER DUBAI TRADING L.L.C - Three Decades of Global Excellence",
    description:
      description ||
      "Discover the story of AMER DUBAI TRADING L.L.C—a global powerhouse transforming industries across 28 markets. Three decades of excellence, innovation, and unwavering commitment to exceeding expectations.",
    url: `${baseUrl}/${locale}/about`,
  });
}

