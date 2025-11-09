import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";
  const now = new Date();

  const staticRoutes = ["", "about", "divisions", "news", "contact"];

  const entries = locales.flatMap((locale) =>
    staticRoutes.map((route) => {
      const path = route ? `/${locale}/${route}` : `/${locale}`;
      return {
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: route ? 0.7 : 1,
      };
    }),
  );

  return entries;
}

