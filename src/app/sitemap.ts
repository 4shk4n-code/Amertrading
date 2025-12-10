import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "divisions", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "industries", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "products", priority: 0.8, changeFrequency: "daily" as const },
    { path: "news", priority: 0.8, changeFrequency: "daily" as const },
    { path: "contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const entries = locales.flatMap((locale) =>
    staticRoutes.map((route) => {
      const path = route.path ? `/${locale}/${route.path}` : `/${locale}`;
      return {
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      };
    }),
  );

  return entries;
}

