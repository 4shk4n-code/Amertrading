import type { Metadata } from "next";
import { NewsList } from "@/components/cms/news-list";
import { getNews } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function NewsPage({ params }: NewsPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const posts = await getNews(locale);
  return <NewsList locale={locale} posts={posts} />;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";

  return buildMetadata({
    title: "Newsroom | AMER GENERAL TRADING L.L.C",
    description:
      "Official announcements, market insights, and press releases from AMER GENERAL TRADING L.L.C.",
    url: `${baseUrl}/${locale}/news`,
  });
}

