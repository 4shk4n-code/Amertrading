import { Metadata } from "next";
import { defaultSEO } from "./seo.defaults";

export { defaultSEO } from "./seo.defaults";

type MetadataOptions = {
  title?: string;
  description?: string;
  images?: string[];
  locale?: string;
  url?: string;
};

export function buildMetadata(options: MetadataOptions = {}): Metadata {
  const title = options.title ?? defaultSEO.title;
  const description = options.description ?? defaultSEO.description;
  const url = options.url ?? defaultSEO.openGraph.url;
  const images = options.images ?? [defaultSEO.openGraph.images[0].url];
  const locale = options.locale ?? defaultSEO.openGraph.locale;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    icons: {
      icon: [
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/icon.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [
        { url: "/icon.png", type: "image/png", sizes: "180x180" },
      ],
      shortcut: [
        { url: "/icon.png", type: "image/png" },
      ],
    },
    openGraph: {
      ...defaultSEO.openGraph,
      locale,
      url,
      images: images.map((image) => ({
        url: image,
        width: 1200,
        height: 630,
      })),
      title,
      description,
    },
    twitter: {
      ...defaultSEO.twitter,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

