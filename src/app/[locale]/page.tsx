import type { Metadata } from "next";
import { Suspense } from "react";
import { HomeView } from "@/components/cms/home-view";
import { getCompanyInfo, getDivisions, getNews, type Division, type NewsPost, type CompanyInfo } from "@/lib/sanity";
import { Locale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type LocaleParams = { locale: string };

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_SA",
  fa: "fa_IR",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const company = await getCompanyInfo(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";

  return buildMetadata({
    title: company?.name
      ? `${company.name} | Global Multi-Industry Leader`
      : "AMER DUBAI TRADING L.L.C",
    description:
      company?.description ??
      "AMER DUBAI TRADING L.L.C powers mobility, food, fashion, technology, and trade worldwide.",
    locale: OG_LOCALE_MAP[locale],
    url: `${baseUrl}/${locale}`,
    images: company?.logo?.asset?.url ? [company.logo.asset.url] : undefined,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  
  // Fetch data with error handling - use fallbacks if any request fails
  let company: CompanyInfo | null = null;
  let divisions: Division[] = [];
  let news: NewsPost[] = [];

  try {
    const results = await Promise.allSettled([
      getCompanyInfo(locale),
      getDivisions(locale),
      getNews(locale),
    ]);
    
    company = results[0].status === "fulfilled" ? results[0].value : null;
    divisions = results[1].status === "fulfilled" ? results[1].value : [];
    news = results[2].status === "fulfilled" ? results[2].value : [];
  } catch (error) {
    // Silently handle errors - components will use fallback data
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching homepage data:", error);
    }
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          Loading…
        </div>
      }
    >
      <HomeView
        locale={locale}
        company={company}
        divisions={divisions}
        news={news}
      />
    </Suspense>
  );
}

