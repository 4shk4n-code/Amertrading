import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticle } from "@/components/cms/news-article";
import { getNewsBySlug } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { portableTextToPlainText } from "@/lib/utils/portableText";

type NewsArticlePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const post = await getNewsBySlug(locale, resolvedParams.slug);
  if (!post) {
    notFound();
  }

  return <NewsArticle post={post} />;
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const post = await getNewsBySlug(locale, resolvedParams.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";

  if (!post) {
    return buildMetadata({
      title: "News | AMER GENERAL TRADING L.L.C",
      description: "Latest updates from AMER GENERAL TRADING L.L.C.",
      url: `${baseUrl}/${locale}/news`,
    });
  }

  return buildMetadata({
    title: `${post.title} | AMER GENERAL TRADING L.L.C`,
    description: portableTextToPlainText(post.body).slice(0, 200),
    url: `${baseUrl}/${locale}/news/${post.slug.current}`,
    images: post.image?.asset?.url ? [post.image.asset.url] : undefined,
  });
}

