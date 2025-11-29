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

  return {
    title,
    description,
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [
        { url: "/icon.svg", type: "image/svg+xml" },
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

