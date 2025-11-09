import type { Metadata } from "next";
import { DivisionsGrid } from "@/components/cms/divisions-grid";
import { getDivisions } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type DivisionsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DivisionsPage({ params }: DivisionsPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const divisions = await getDivisions(locale);

  return <DivisionsGrid locale={locale} divisions={divisions} />;
}

export async function generateMetadata({
  params,
}: DivisionsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";

  return buildMetadata({
    title: "Divisions | AMER GENERAL TRADING L.L.C",
    description:
      "Explore AMER GENERAL TRADING L.L.C’s multi-industry divisions across automotive, food, lifestyle, IT hardware, and trading.",
    url: `${baseUrl}/${locale}/divisions`,
  });
}

