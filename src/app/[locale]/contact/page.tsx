import type { Metadata } from "next";
import { Suspense } from "react";
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

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ContactView locale={locale} company={company} />
    </Suspense>
  );
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const company = await getCompanyInfo(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";

  return buildMetadata({
    title: "Contact AMER DUBAI TRADING L.L.C",
    description:
      company?.mission ??
      "Partner with AMER DUBAI TRADING L.L.C across automotive, food, fashion, IT, and markets.",
    url: `${baseUrl}/${locale}/contact`,
  });
}

