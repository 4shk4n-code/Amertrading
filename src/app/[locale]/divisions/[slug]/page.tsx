import { notFound } from "next/navigation";
import { DivisionDetail } from "@/components/cms/division-detail";
import type { Metadata } from "next";
import { getDivisionBySlug, getDivisions } from "@/lib/sanity";
import { Locale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type DivisionPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  await Promise.all(
    locales.map(async (locale) => {
      const divisions = await getDivisions(locale);
      divisions.forEach((division) => {
        params.push({ locale, slug: division.slug.current });
      });
    }),
  );
  return params;
}

export default async function DivisionPage({ params }: DivisionPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const division = await getDivisionBySlug(locale, resolvedParams.slug);
  if (!division) {
    notFound();
  }
  return <DivisionDetail division={division} />;
}

export async function generateMetadata({
  params,
}: DivisionPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const division = await getDivisionBySlug(locale, resolvedParams.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";

  if (!division) {
    return buildMetadata({
      title: "Division | AMER GENERAL TRADING L.L.C",
      description: "Discover AMER GENERAL TRADING L.L.C divisions.",
      url: `${baseUrl}/${locale}/divisions`,
    });
  }

  return buildMetadata({
    title: `${division.name} | AMER GENERAL TRADING L.L.C`,
    description:
      division.description ??
      "Discover this AMER GENERAL TRADING L.L.C division.",
    url: `${baseUrl}/${locale}/divisions/${division.slug.current}`,
    images: division.image?.asset?.url ? [division.image.asset.url] : undefined,
  });
}

