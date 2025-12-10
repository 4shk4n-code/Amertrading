import { defaultSEO } from "./seo.defaults";

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AMER DUBAI TRADING L.L.C",
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    description: defaultSEO.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["en", "ar", "fa"],
    },
    sameAs: [
      // Add social media links if available
    ],
  };
}

export function generateWebSiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AMER DUBAI TRADING L.L.C",
    url: baseUrl,
    description: defaultSEO.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  price?: number;
  image?: string;
  sku?: string;
  url: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? `${baseUrl}${product.image}` : undefined,
    sku: product.sku,
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    url: product.url,
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amertrading.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "AMER DUBAI TRADING L.L.C",
      url: baseUrl,
    },
    areaServed: {
      "@type": "Place",
      name: "Global",
    },
    url: service.url,
  };
}

