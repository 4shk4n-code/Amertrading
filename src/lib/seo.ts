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

  // Generate keywords based on content
  const keywords = [
    "logistics",
    "supply chain",
    "freight forwarding",
    "warehousing",
    "international trade",
    "Dubai trading",
    "GCC logistics",
    "auto parts",
    "food distribution",
    "IT hardware",
    "clothing trade",
    "industrial solutions",
  ];

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${defaultSEO.title}`,
    },
    description,
    keywords,
    authors: [{ name: "AMER DUBAI TRADING L.L.C" }],
    creator: "AMER DUBAI TRADING L.L.C",
    publisher: "AMER DUBAI TRADING L.L.C",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
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
      siteName: defaultSEO.openGraph.site_name,
      images: images.map((image) => ({
        url: image.startsWith("http") ? image : `${baseUrl}${image}`,
        width: 1200,
        height: 630,
        alt: title,
      })),
      title,
      description,
      type: "website",
    },
    twitter: {
      ...defaultSEO.twitter,
      title,
      description,
      images: images.map((image) => (image.startsWith("http") ? image : `${baseUrl}${image}`)),
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en${url.replace(/^\/(en|ar|fa)/, "")}`,
        ar: `${baseUrl}/ar${url.replace(/^\/(en|ar|fa)/, "")}`,
        fa: `${baseUrl}/fa${url.replace(/^\/(en|ar|fa)/, "")}`,
      },
    },
    verification: {
      // Add verification codes if available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
    },
  };
}

