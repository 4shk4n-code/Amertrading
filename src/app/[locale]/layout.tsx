import { ReactNode, Suspense } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LocaleAttributes } from "@/components/layout/locale-attributes";
import { getMessages, isRTL, locales, type Locale } from "@/lib/i18n";
import { getDivisions } from "@/lib/sanity";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale ?? "en") as Locale;
  const messages = await getMessages(locale);
  const divisions = await getDivisions(locale);
  const rtl = isRTL(locale);

  return (
    <div className={rtl ? "rtl font-sans" : "font-sans"}>
      <LocaleAttributes locale={locale} />
      <Navbar locale={locale} messages={messages} divisions={divisions} />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-black text-white">
            Loading…
          </div>
        }
      >
        <div className="pt-24">{children}</div>
      </Suspense>
      <Footer locale={locale} />
    </div>
  );
}

