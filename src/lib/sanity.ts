import type { PortableTextBlock } from "@portabletext/types";
import groq from "groq";
import {
  sanityClient,
  hasSanityCredentials,
} from "../../sanity/lib/sanity.client";

const defaultLocale = "en";

export type CompanyInfo = {
  _id: string;
  name: string;
  mission?: string;
  description?: string;
  heroVideoURL?: string;
  introVideoURL?: string;
  locale: string;
  logo?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
};

export type Division = {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  order?: number;
  locale: string;
};

export type NewsPost = {
  _id: string;
  title: string;
  slug: { current: string };
  body: PortableTextBlock[];
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  date: string;
  locale: string;
};

const fallbackCompany: Record<string, CompanyInfo> = {
  en: {
    _id: "company-info-en",
    name: "AMER GENERAL TRADING L.L.C",
    mission: "Connecting industries. Powering progress.",
    description:
      "AMER GENERAL TRADING L.L.C is a multi-sector enterprise leading innovation across automotive, food, fashion, IT, and global commerce.",
    heroVideoURL:
      "https://cdn.coverr.co/videos/coverr-spotlight-on-the-city-6498/1080p.mp4",
    introVideoURL: "/intro-logo.mp4",
    locale: "en",
  },
  ar: {
    _id: "company-info-ar",
    name: "امير تريدينغ القابضة",
    mission: "ربط الصناعات وتمكين النمو.",
    description:
      "مجموعة متعددة القطاعات تقود الابتكار عبر السيارات، الأغذية، الأزياء، تقنية المعلومات والتجارة العالمية.",
    heroVideoURL:
      "https://cdn.coverr.co/videos/coverr-spotlight-on-the-city-6498/1080p.mp4",
    introVideoURL: "/intro-logo.mp4",
    locale: "ar",
  },
  fa: {
    _id: "company-info-fa",
    name: "هولدینگ آمر تریدینگ",
    mission: "اتصال صنایع و توانمندسازی پیشرفت.",
    description:
      "هولدینگ آمر تریدینگ در حوزه‌های خودرو، مواد غذایی، پوشاک، فناوری اطلاعات و تجارت جهانی پیشرو است.",
    heroVideoURL:
      "https://cdn.coverr.co/videos/coverr-spotlight-on-the-city-6498/1080p.mp4",
    introVideoURL: "/intro-logo.mp4",
    locale: "fa",
  },
};

const fallbackDivisions: Record<string, Division[]> = {
  en: [
    {
      _id: "division-auto-en",
      name: "Auto Parts",
      description:
        "Supplying OEM-grade automotive components and lubricants across the GCC and beyond.",
      slug: { current: "auto-parts" },
      locale: "en",
      image: {
        asset: {
          _ref: "auto-parts",
          url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
        },
      },
    },
    {
      _id: "division-food-en",
      name: "Food & Markets",
      description:
        "Partnering with leading producers to deliver quality foods, beverages, and retail essentials.",
      slug: { current: "food-markets" },
      locale: "en",
      image: {
        asset: {
          _ref: "food-markets",
          url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
        },
      },
    },
    {
      _id: "division-clothing-en",
      name: "Clothing & Lifestyle",
      description:
        "Creating fashion and lifestyle brands that combine style with sustainability.",
      slug: { current: "clothing-lifestyle" },
      locale: "en",
      image: {
        asset: {
          _ref: "clothing-lifestyle",
          url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        },
      },
    },
    {
      _id: "division-it-en",
      name: "IT & Hardware",
      description:
        "Providing advanced computing, networking, and data-center solutions for enterprise clients.",
      slug: { current: "it-hardware" },
      locale: "en",
      image: {
        asset: {
          _ref: "it-hardware",
          url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
        },
      },
    },
    {
      _id: "division-markets-en",
      name: "Markets & Trading",
      description:
        "Expanding access to goods through integrated wholesale, retail, and marketplace platforms.",
      slug: { current: "markets-trading" },
      locale: "en",
      image: {
        asset: {
          _ref: "markets-trading",
          url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
        },
      },
    },
  ],
};

fallbackDivisions.ar = fallbackDivisions.en.map((division) => ({
  ...division,
  _id: division._id.replace("en", "ar"),
  name:
    division.name === "Auto Parts"
      ? "قطع غيار السيارات"
      : division.name === "Food & Markets"
      ? "الأغذية والأسواق"
      : division.name === "Clothing & Lifestyle"
      ? "الأزياء ونمط الحياة"
      : division.name === "IT & Hardware"
      ? "تقنية المعلومات والمعدات"
      : "الأسواق والتجارة",
  description: division.description,
  slug: division.slug,
  locale: "ar",
}));

fallbackDivisions.fa = fallbackDivisions.en.map((division) => ({
  ...division,
  _id: division._id.replace("en", "fa"),
  name:
    division.name === "Auto Parts"
      ? "قطعات خودرو"
      : division.name === "Food & Markets"
      ? "غذا و بازارها"
      : division.name === "Clothing & Lifestyle"
      ? "پوشاک و سبک زندگی"
      : division.name === "IT & Hardware"
      ? "فناوری اطلاعات و سخت‌افزار"
      : "بازارها و بازرگانی",
  description: division.description,
  slug: division.slug,
  locale: "fa",
}));

const fallbackNews: Record<string, NewsPost[]> = {
  en: [
    {
      _id: "news-smart-mobility-en",
      title: "AMER GENERAL TRADING Expands into Smart Mobility",
      slug: { current: "amer-trading-expands-into-smart-mobility" },
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "AMER GENERAL TRADING L.L.C announced its expansion into smart-mobility and EV components as part of its 2025 growth roadmap.",
            },
          ],
        },
      ],
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      locale: "en",
      image: {
        asset: {
          _ref: "smart-mobility",
          url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
        },
      },
    },
    {
      _id: "news-food-partnership-en",
      title: "Strategic Partnership with Leading Food Producers",
      slug: { current: "strategic-partnership-food-producers" },
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "We've secured new partnerships with top-tier food producers to expand our distribution network across the Middle East.",
            },
          ],
        },
      ],
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      locale: "en",
      image: {
        asset: {
          _ref: "food-partnership",
          url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
        },
      },
    },
    {
      _id: "news-tech-expansion-en",
      title: "IT Hardware Division Reaches New Markets",
      slug: { current: "it-hardware-new-markets" },
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Our IT & Hardware division has successfully expanded operations into three new regional markets, strengthening our technology portfolio.",
            },
          ],
        },
      ],
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      locale: "en",
      image: {
        asset: {
          _ref: "tech-expansion",
          url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
        },
      },
    },
  ],
};

fallbackNews.ar = [
  {
    ...fallbackNews.en[0],
    _id: "news-smart-mobility-ar",
    title: "أمير تريدينغ تتوسع في التنقل الذكي",
    locale: "ar",
  },
  {
    ...fallbackNews.en[1],
    _id: "news-food-partnership-ar",
    title: "شراكة استراتيجية مع منتجي الأغذية الرائدين",
    locale: "ar",
  },
  {
    ...fallbackNews.en[2],
    _id: "news-tech-expansion-ar",
    title: "قسم تقنية المعلومات يصل إلى أسواق جديدة",
    locale: "ar",
  },
];

fallbackNews.fa = [
  {
    ...fallbackNews.en[0],
    _id: "news-smart-mobility-fa",
    title: "گسترش آمر تریدینگ به حوزه حمل‌ونقل هوشمند",
    locale: "fa",
  },
  {
    ...fallbackNews.en[1],
    _id: "news-food-partnership-fa",
    title: "شراکت استراتژیک با تولیدکنندگان برتر مواد غذایی",
    locale: "fa",
  },
  {
    ...fallbackNews.en[2],
    _id: "news-tech-expansion-fa",
    title: "بخش سخت‌افزار IT به بازارهای جدید دست یافت",
    locale: "fa",
  },
];

export async function getCompanyInfo(locale: string) {
  if (!hasSanityCredentials) {
    return fallbackCompany[locale] ?? fallbackCompany.en;
  }
  return sanityClient!.fetch<CompanyInfo | null>(
    groq`*[_type == "companyInfo" && locale == $locale][0]{
      _id,
      name,
      mission,
      description,
      heroVideoURL,
      introVideoURL,
      "logo": logo{
        asset->{_ref, url}
      },
      locale
    }`,
    { locale: locale ?? defaultLocale },
  );
}

export async function getDivisions(locale: string) {
  if (!hasSanityCredentials) {
    return fallbackDivisions[locale] ?? fallbackDivisions.en;
  }
  try {
    const result = await sanityClient!.fetch<Division[]>(
      groq`*[_type == "division" && locale == $locale] | order(order asc){
        _id,
        name,
        description,
        order,
        locale,
        slug,
        "image": image{
          asset->{_ref, url}
        }
      }`,
      { locale: locale ?? defaultLocale },
    );
    // Always return fallback if empty
    if (!result || result.length === 0) {
      return fallbackDivisions[locale] ?? fallbackDivisions.en;
    }
    return result;
  } catch (error) {
    // Return fallback on error
    return fallbackDivisions[locale] ?? fallbackDivisions.en;
  }
}

export async function getDivisionBySlug(locale: string, slug: string) {
  if (!hasSanityCredentials) {
    const divisions = fallbackDivisions[locale] ?? fallbackDivisions.en;
    return divisions.find((division) => division.slug.current === slug) ?? null;
  }
  return sanityClient!.fetch<Division | null>(
    groq`*[_type == "division" && locale == $locale && slug.current == $slug][0]{
      _id,
      name,
      description,
      order,
      locale,
      slug,
      "image": image{
        asset->{_ref, url}
      }
    }`,
    { locale: locale ?? defaultLocale, slug },
  );
}

export async function getNews(locale: string) {
  if (!hasSanityCredentials) {
    return fallbackNews[locale] ?? fallbackNews.en;
  }
  try {
    const result = await sanityClient!.fetch<NewsPost[]>(
      groq`*[_type == "newsPost" && locale == $locale] | order(date desc){
        _id,
        title,
        slug,
        body,
        date,
        locale,
        "image": image{
          asset->{_ref, url}
        }
      }`,
      { locale: locale ?? defaultLocale },
    );
    // Always return fallback if empty
    if (!result || result.length === 0) {
      return fallbackNews[locale] ?? fallbackNews.en;
    }
    return result;
  } catch (error) {
    // Return fallback on error
    return fallbackNews[locale] ?? fallbackNews.en;
  }
}

export async function getNewsBySlug(locale: string, slug: string) {
  if (!hasSanityCredentials) {
    const posts = fallbackNews[locale] ?? fallbackNews.en;
    return posts.find((post) => post.slug.current === slug) ?? null;
  }
  return sanityClient!.fetch<NewsPost | null>(
    groq`*[_type == "newsPost" && locale == $locale && slug.current == $slug][0]{
      _id,
      title,
      slug,
      body,
      date,
      locale,
      "image": image{
        asset->{_ref, url}
      }
    }`,
    { locale: locale ?? defaultLocale, slug },
  );
}

export async function getPage(locale: string, slug: string) {
  if (!hasSanityCredentials) {
    if (slug === "about") {
      return {
        _id: `page-${locale}-about`,
        title:
          locale === "ar"
            ? "قصة عالمية"
            : locale === "fa"
            ? "داستان جهانی"
            : "A Legacy of Vision",
        slug: { current: "about" },
        content: fallbackAboutContent(locale),
        locale,
      };
    }
    if (slug === "contact") {
      return {
        _id: `page-${locale}-contact`,
        title:
          locale === "ar"
            ? "تواصل معنا"
            : locale === "fa"
            ? "تماس با ما"
            : "Connect With AMER GENERAL TRADING L.L.C",
        slug: { current: "contact" },
        content: fallbackContactContent(locale),
        locale,
      };
    }
    return null;
  }
  return sanityClient!.fetch<{
    _id: string;
    title: string;
    slug: { current: string };
    content: PortableTextBlock[];
    locale: string;
  } | null>(
    groq`*[_type == "page" && locale == $locale && slug.current == $slug][0]{
      _id,
      title,
      slug,
      content,
      locale
    }`,
    { locale: locale ?? defaultLocale, slug },
  );
}

function fallbackAboutContent(locale: string): PortableTextBlock[] {
  const text =
    locale === "ar"
      ? [
          "لمدة ثلاثة عقود، جمعت امير تريدينغ القابضة فرقًا طموحة لتقديم التنقل، التغذية، الأسلوب والمرونة الرقمية لأسواق المستقبل.",
          "من قطع غيار السيارات المتميزة إلى الخدمات الغذائية الذكية والأجهزة الذكية، نقود الصناعات برؤية هادفة وتركيز لا يلين على الأثر.",
        ]
      : locale === "fa"
      ? [
          "به مدت سه دهه، هولدینگ آمر تریدینگ تیم‌های بلندپرواز را گرد هم آورده تا تحرک، تغذیه، سبک و تاب‌آوری دیجیتال آینده را بسازد.",
          "از قطعات خودروی ممتاز تا لجستیک غذایی هوشمند و سخت‌افزار هوشمند، صنایع را با رهبری هدفمند و تمرکز بر تأثیر هدایت می‌کنیم.",
        ]
      : [
          "For three decades, AMER GENERAL TRADING L.L.C has united ambitious teams across continents to deliver mobility, nourishment, style, and digital resilience for tomorrow's markets.",
          "From premium auto parts to smart food logistics and intelligent hardware, we scale industries with purpose-driven leadership and a relentless focus on impact.",
        ];

  return text.map((paragraph) => ({
    _type: "block",
    children: [{ _type: "span", text: paragraph }],
  })) as PortableTextBlock[];
}

function fallbackContactContent(locale: string): PortableTextBlock[] {
  const text =
    locale === "ar"
      ? ["تواصل معنا لنبني نموًا متعدد القطاعات عبر جميع خطوط الأعمال."]
      : locale === "fa"
      ? ["برای ساختن رشد چندبخشی در تمام خطوط کسب‌وکار با ما در تماس باشید."]
      : ["Let’s unlock the next era of multi-sector growth together."];

  return text.map((paragraph) => ({
    _type: "block",
    children: [{ _type: "span", text: paragraph }],
  })) as PortableTextBlock[];
}

