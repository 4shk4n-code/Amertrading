import type { Metadata } from "next";
import { ContactView } from "@/components/cms/contact-view";
import { getCompanyInfo } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const company = await getCompanyInfo(locale);

  return <ContactView locale={locale} company={company} />;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const company = await getCompanyInfo(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";

  return buildMetadata({
    title: "Contact AMER GENERAL TRADING L.L.C",
    description:
      company?.mission ??
      "Partner with AMER GENERAL TRADING L.L.C across automotive, food, fashion, IT, and markets.",
    url: `${baseUrl}/${locale}/contact`,
  });
}

