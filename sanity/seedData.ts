import { sanityClient } from "./lib/sanity.client";

const baseCompany = {
  _type: "companyInfo",
  name: "AMER TRADING Holding",
  mission: "Connecting industries. Powering progress.",
  description:
    "AMER TRADING Holding is a multi-sector enterprise leading innovation across automotive, food, fashion, IT, and global commerce. Our mission is to bridge markets with integrity, technology, and excellence.",
  heroVideoURL:
    "https://cdn.coverr.co/videos/coverr-spotlight-on-the-city-6498/1080p.mp4",
};

const baseDivisions = [
  {
    _type: "division",
    name: "Auto Parts",
    description:
      "Supplying OEM-grade automotive components and lubricants across the GCC and beyond.",
    order: 1,
  },
  {
    _type: "division",
    name: "Food & Markets",
    description:
      "Partnering with leading producers to deliver quality foods, beverages, and retail essentials.",
    order: 2,
  },
  {
    _type: "division",
    name: "Clothing & Lifestyle",
    description:
      "Creating fashion and lifestyle brands that combine style with sustainability.",
    order: 3,
  },
  {
    _type: "division",
    name: "IT & Hardware",
    description:
      "Providing advanced computing, networking, and data-center solutions for enterprise clients.",
    order: 4,
  },
  {
    _type: "division",
    name: "Markets & Trading",
    description:
      "Expanding access to goods through integrated wholesale, retail, and marketplace platforms.",
    order: 5,
  },
];

const baseNews = [
  {
    _type: "newsPost",
    title: "AMER TRADING Expands into Smart Mobility",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "AMER TRADING Holding announced its expansion into smart-mobility and EV components as part of its 2025 growth roadmap.",
          },
        ],
      },
    ],
    date: new Date().toISOString(),
  },
];

const basePages = [
  {
    slug: "about",
    title: "A Legacy of Vision",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "For three decades, AMER TRADING Holding has united ambitious teams across continents to deliver mobility, nourishment, style, and digital resilience for tomorrow's markets.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "From premium auto parts to smart food logistics and intelligent hardware, we scale industries with purpose-driven leadership and a relentless focus on impact.",
          },
        ],
      },
    ],
  },
  {
    slug: "contact",
    title: "Connect With AMER TRADING",
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Let's unlock the next era of multi-sector growth together.",
          },
        ],
      },
    ],
  },
];

const locales = [
  {
    locale: "en",
    company: {
      name: "AMER TRADING Holding",
      mission: "Connecting industries. Powering progress.",
    },
  },
  {
    locale: "ar",
    company: {
      name: "امير تريدينغ القابضة",
      mission: "ربط الصناعات وتمكين النمو.",
      description:
        "امير تريدينغ القابضة مؤسسة متعددة القطاعات تقود الابتكار عبر السيارات، الأغذية، الأزياء، تقنية المعلومات، والتجارة العالمية.",
    },
  },
  {
    locale: "fa",
    company: {
      name: "هولدینگ آمر تریدینگ",
      mission: "اتصال صنایع و توانمندسازی پیشرفت.",
      description:
        "هولدینگ آمر تریدینگ پیشرو در حوزه‌های خودرو، مواد غذایی، پوشاک، فناوری اطلاعات و تجارت جهانی است.",
    },
  },
];

export async function seedSampleData() {
  const operations = [];

  for (const localeEntry of locales) {
    const companyDoc = {
      _id: `company-info-${localeEntry.locale}`,
      ...baseCompany,
      ...localeEntry.company,
      locale: localeEntry.locale,
    };
    operations.push(sanityClient.createOrReplace(companyDoc));

    for (const division of baseDivisions) {
      const slug = division.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      operations.push(
        sanityClient.createOrReplace({
          _id: `division-${localeEntry.locale}-${slug}`,
          ...division,
          slug: { _type: "slug", current: slug },
          name:
            localeEntry.locale === "ar"
              ? translateDivisionName(division.name, "ar")
              : localeEntry.locale === "fa"
              ? translateDivisionName(division.name, "fa")
              : division.name,
          locale: localeEntry.locale,
        }),
      );
    }

    for (const news of baseNews) {
      const slug = news.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      operations.push(
        sanityClient.createOrReplace({
          _id: `news-${localeEntry.locale}-${slug}`,
          ...news,
          slug: { _type: "slug", current: slug },
          title:
            localeEntry.locale === "ar"
              ? "أمير تريدينغ تتوسع في التنقل الذكي"
              : localeEntry.locale === "fa"
              ? "گسترش آمر تریدینگ به حوزه حمل‌ونقل هوشمند"
              : news.title,
          locale: localeEntry.locale,
        }),
      );
    }

    for (const page of basePages) {
      operations.push(
        sanityClient.createOrReplace({
          _id: `page-${localeEntry.locale}-${page.slug}`,
          _type: "page",
          slug: { _type: "slug", current: page.slug },
          title:
            localeEntry.locale === "ar"
              ? translatePageTitle(page.slug, "ar")
              : localeEntry.locale === "fa"
              ? translatePageTitle(page.slug, "fa")
              : page.title,
          content: page.content,
          locale: localeEntry.locale,
        }),
      );
    }
  }

  await Promise.all(operations);
  console.log("✅ Sanity sample data seeded successfully.");
}

function translateDivisionName(name: string, locale: "ar" | "fa") {
  const translations: Record<string, { ar: string; fa: string }> = {
    "Auto Parts": { ar: "قطع غيار السيارات", fa: "قطعات خودرو" },
    "Food & Markets": { ar: "الأغذية والأسواق", fa: "غذا و بازارها" },
    "Clothing & Lifestyle": {
      ar: "الأزياء ونمط الحياة",
      fa: "پوشاک و سبک زندگی",
    },
    "IT & Hardware": {
      ar: "تقنية المعلومات والمعدات",
      fa: "فناوری اطلاعات و سخت‌افزار",
    },
    "Markets & Trading": {
      ar: "الأسواق والتجارة",
      fa: "بازارها و بازرگانی",
    },
  };
  return translations[name]?.[locale] ?? name;
}

function translatePageTitle(slug: string, locale: "ar" | "fa") {
  const translations: Record<string, { ar: string; fa: string }> = {
    about: {
      ar: "قصة عالمية",
      fa: "داستان جهانی",
    },
    contact: {
      ar: "تواصل معنا",
      fa: "تماس با ما",
    },
  };
  return translations[slug]?.[locale] ?? slug;
}

