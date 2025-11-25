"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CompanyInfo, Division, NewsPost } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";

type HomeViewProps = {
  locale: Locale;
  company: CompanyInfo | null;
  divisions: Division[];
  news: NewsPost[];
};

const highlightedMetrics = [
  {
    label: "Operating Markets",
    value: "28",
    detail: "Across GCC, Levant & Eurasia",
  },
  {
    label: "Strategic Partnerships",
    value: "120+",
    detail: "OEMs & Tier-1 suppliers",
  },
  {
    label: "Portfolio Growth",
    value: "19%",
    detail: "5-year CAGR across holdings",
  },
  {
    label: "People Powered",
    value: "3.2k",
    detail: "Colleagues building the future",
  },
];

const innovationPillars = [
  {
    title: "Mobility & Energy",
    description:
      "From advanced auto components to EV infrastructure, we enable next-generation transport.",
  },
  {
    title: "Food & Lifestyle",
    description:
      "Delivering resilient supply chains and immersive retail experiences that delight global consumers.",
  },
  {
    title: "Technology & Data",
    description:
      "Scaling hardware, cloud, and analytics platforms that empower enterprises to operate smarter.",
  },
];

const journeyMilestones = [
  {
    year: "1994",
    title: "First Automotive Imports",
    description:
      "AMER GENERAL TRADING L.L.C launches as a specialist distributor, forging ties with leading OEM brands.",
  },
  {
    year: "2008",
    title: "Diversification Wave",
    description:
      "Expansion into food logistics, lifestyle retail, and complex hardware to meet regional demand.",
  },
  {
    year: "2020",
    title: "Digital Acceleration",
    description:
      "Established innovation labs and data partnerships to connect physical networks with digital scale.",
  },
];

const partnerSignals = [
  {
    tag: "Certified",
    detail: "Certified ISO 9001 Operations",
  },
  {
    tag: "Logistics",
    detail: "Logistics footprint across 14 hubs",
  },
  {
    tag: "Trusted",
    detail: "Preferred supplier to 40+ public agencies",
  },
];

const divisionDomains: Record<string, string> = {
  "food-markets": "https://food.amertrading.ae",
  "auto-parts": "https://auto.amertrading.ae",
  "clothing-lifestyle": "https://style.amertrading.ae",
  "it-hardware": "https://tech.amertrading.ae",
  "markets-trading": "https://markets.amertrading.ae",
};

export function HomeView({ company, divisions, locale, news }: HomeViewProps) {
  const [showIntro, setShowIntro] = useState(true);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!showIntro) {
      return;
    }
    const fallbackTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 7000);
    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [showIntro]);

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  const introVideo =
    company?.introVideoURL && company.introVideoURL.trim().length > 0
      ? company.introVideoURL
      : "/intro-logo.mp4";

  const heroVideo =
    company?.heroVideoURL ??
    "https://cdn.coverr.co/videos/coverr-spotlight-on-the-city-6498/1080p.mp4";

  const divisionCards = useMemo(() => {
    // Always show divisions (fallback data is guaranteed)
    return (divisions || []).map((division) => ({
      ...division,
      key: division._id,
    }));
  }, [divisions]);

  const featuredNews = useMemo(() => {
    // Always show news (fallback data is guaranteed)
    return (news || []).slice(0, 3).map((item) => ({
      ...item,
      key: item._id,
    }));
  }, [news]);

  const formatNewsDate = (value: string) => {
    try {
      return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(value));
    } catch (error) {
      return value;
    }
  };

  return (
    <div className="relative bg-[var(--background)] text-[var(--foreground)]">
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50 overflow-hidden bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <video
                ref={introVideoRef}
                key={introVideo}
                autoPlay
                playsInline
                muted
                onEnded={handleIntroEnd}
                onError={handleIntroEnd}
                className="h-full w-full object-contain"
              >
                <source src={introVideo} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </div>
            <div className="absolute inset-x-0 bottom-16 flex justify-center">
              <button
                type="button"
                onClick={handleIntroEnd}
                className="pointer-events-auto rounded-full border border-white/30 px-6 py-2 text-xs uppercase tracking-[0.35em] text-white/75 transition hover:border-gold-400 hover:text-gold-200"
              >
                Skip Intro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-[92vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(246,214,130,0.18),_transparent_55%)] mix-blend-screen opacity-90" />
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="pointer-events-none absolute inset-x-0 top-10 z-20 mx-auto h-12 max-w-5xl rounded-full border border-[rgba(28,26,23,0.12)] bg-white/60 backdrop-blur-md"
        />
        <div className="relative z-20 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 pb-28 pt-28 text-left md:flex-row md:items-center md:space-x-14">
          {company?.logo?.asset?.url && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 w-full max-w-xs md:mb-0 md:max-w-sm"
            >
              <Image
                src={company.logo.asset.url}
                alt={company.name}
                width={240}
                height={80}
                className="h-16 w-auto object-contain drop-shadow-[0_12px_35px_rgba(17,17,17,0.4)]"
                priority
              />
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="font-display text-4xl leading-tight tracking-[0.15em] text-gold-600 drop-shadow-[0_30px_80px_rgba(245,215,169,0.45)] sm:text-5xl md:text-left md:text-6xl"
          >
            {company?.name ?? "AMER GENERAL TRADING L.L.C"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--foreground)]/80 md:text-xl"
          >
            {company?.mission ?? "Empowering growth across global industries."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <Link
              href={`/${locale}/divisions`}
              className="rounded-full bg-gold-gradient px-8 py-3 text-sm uppercase tracking-[0.35em] text-white shadow-[0_35px_70px_-25px_rgba(246,214,130,0.6)] transition-transform duration-300 hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Discover Divisions
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-[rgba(28,26,23,0.15)] px-8 py-3 text-sm uppercase tracking-[0.35em] text-[var(--foreground)] transition duration-300 hover:border-gold-400 hover:text-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Partner With Us
            </Link>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(28,26,23,0.25)] to-transparent sm:block" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-12 grid w-full max-w-xl grid-cols-2 gap-3 rounded-3xl border border-[rgba(28,26,23,0.12)] bg-white/70 p-6 shadow-[0_25px_60px_-30px_rgba(28,26,23,0.4)] backdrop-blur-lg md:mt-0 md:self-end"
          >
            {partnerSignals.map((signal) => (
              <div
                key={signal.detail}
                className="rounded-2xl border border-[rgba(28,26,23,0.08)] bg-white px-4 py-5 text-sm text-[var(--foreground)] shadow-[0_18px_45px_-24px_rgba(28,26,23,0.35)]"
              >
                <span className="block text-xs uppercase tracking-[0.4em] text-gold-700">
                  {signal.tag}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                  {signal.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/80 sm:flex"
          aria-hidden
        >
          <span className="text-white/70">Scroll</span>
          <span className="block h-14 w-px bg-gradient-to-b from-white via-white/40 to-transparent" />
        </motion.div>
      </section>

      <section className="relative border-y border-[rgba(28,26,23,0.08)] bg-white/70 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {highlightedMetrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-[rgba(28,26,23,0.08)] bg-white p-6 shadow-[0_30px_60px_-38px_rgba(28,26,23,0.35)]"
            >
              <span className="text-xs uppercase tracking-[0.45em] text-[var(--foreground)]/60">
                {metric.label}
              </span>
              <p className="mt-3 font-display text-3xl text-gold-600">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-[var(--foreground)]/75">
                {metric.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[rgba(199,138,26,0.08)] to-[rgba(224,176,84,0.15)] py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(199,138,26,0.18),_transparent_60%)]" />
        <div className="pointer-events-none absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[rgba(224,176,84,0.25)] blur-[140px]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row">
          <div className="max-w-3xl space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(28,26,23,0.1)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.4em] text-gold-600"
            >
              Global Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl"
            >
              Building resilient industries with precision, partnership, and
              purpose.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg text-[var(--foreground)]/75"
            >
              We align mobility, nutrition, lifestyle, and technology ventures
              under one collaborative strategy. Our teams orchestrate supply
              chains, capital, and intelligence that keep cities moving and
              communities thriving.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {innovationPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-[rgba(28,26,23,0.08)] bg-white/90 p-6 shadow-[0_18px_60px_-42px_rgba(28,26,23,0.32)]"
                >
                  <h3 className="font-display text-xl uppercase tracking-[0.3em] text-gold-600">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--foreground)]/75">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="relative flex-1"
          >
            <div className="absolute inset-0 -translate-y-8 rounded-[40px] border border-[rgba(28,26,23,0.08)] bg-gradient-to-br from-white via-white/60 to-transparent blur-3xl" />
            <div className="relative overflow-hidden rounded-[40px] border border-[rgba(28,26,23,0.12)] bg-white/90 p-8 backdrop-blur-xl">
              <div className="flex flex-col gap-10">
                {journeyMilestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative pl-8">
                    <span className="absolute left-0 top-3 h-1.5 w-1.5 rounded-full bg-gold-500 shadow-[0_0_20px_rgba(199,138,26,0.6)]" />
                    <span className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/45">
                      {milestone.year}
                    </span>
                    <h4 className="mt-2 font-display text-2xl text-[var(--foreground)]">
                      {milestone.title}
                    </h4>
                    <p className="mt-3 text-sm text-[var(--foreground)]/70">
                      {milestone.description}
                    </p>
                    {index < journeyMilestones.length - 1 && (
                      <span className="absolute left-0 top-7 h-full w-px translate-x-[2px] bg-gradient-to-b from-gold-400 via-[rgba(28,26,23,0.15)] to-transparent" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-12 rounded-3xl border border-[rgba(28,26,23,0.08)] bg-gold-100/40 p-6 text-sm text-[var(--foreground)]">
                <p className="text-[var(--foreground)]/85">
                  “AMER GENERAL TRADING L.L.C stands out as a partner that scales with
                  integrity. Their production agility and insights helped us
                  rebuild supply chains in record time.”
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.35em] text-gold-700/80">
                  Strategic Partner • Mobility Sector
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(199,138,26,0.12),_transparent_65%)]" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 pb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="font-display text-3xl uppercase tracking-[0.4em] text-[var(--foreground)]"
              >
                Divisions & Ventures
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 max-w-3xl text-[var(--foreground)]/70"
              >
                Integrated business units orchestrated around customer success,
                sustainability, and intelligent growth.
              </motion.p>
            </div>
            <Link
              href={`/${locale}/divisions`}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(28,26,23,0.12)] px-5 py-2 text-xs uppercase tracking-[0.35em] text-[var(--foreground)] transition hover:border-gold-400 hover:text-gold-600"
            >
              Explore All
              <span aria-hidden>↗</span>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {divisionCards.map((division, index) => (
                <motion.div
                  key={division.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[32px] border border-[rgba(28,26,23,0.08)] bg-white p-6 shadow-[0_55px_150px_-85px_rgba(28,26,23,0.35)] transition-transform duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white/95 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {division.image?.asset?.url ? (
                    <Image
                      src={division.image.asset.url}
                      alt={division.name}
                      fill
                      className="absolute inset-0 object-cover opacity-60 transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-[rgba(224,176,84,0.15)] to-[rgba(199,138,26,0.2)] opacity-90" />
                  )}
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-[0.35em] text-[var(--foreground)]/60">
                        Growth Division
                      </span>
                      <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.3em] text-gold-600">
                        {division.name}
                      </h3>
                      <p className="mt-4 text-sm text-[var(--foreground)]/75">
                        {division.description}
                      </p>
                    </div>
                    {divisionDomains[division.slug.current] ? (
                      <a
                        href={divisionDomains[division.slug.current]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold-600 transition hover:text-gold-500"
                      >
                        Visit Site
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <Link
                        href={`/${locale}/divisions/${division.slug.current}`}
                        className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold-600 transition hover:text-gold-500"
                      >
                        View Division
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[rgba(28,26,23,0.08)] bg-gradient-to-b from-white via-[rgba(224,176,84,0.08)] to-[rgba(199,138,26,0.12)] py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(224,176,84,0.18),_transparent_75%)]" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 pb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="font-display text-3xl uppercase tracking-[0.4em] text-[var(--foreground)]"
              >
                Global Signals
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 max-w-2xl text-[var(--foreground)]/70"
              >
                A connected ecosystem of experts, assets, and intelligence
                aligned to deliver certainty in complex markets.
              </motion.p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {partnerSignals.map((signal) => (
              <motion.div
                key={signal.detail}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-[rgba(28,26,23,0.08)] bg-white p-6 text-[var(--foreground)] backdrop-blur-lg shadow-[0_18px_45px_-28px_rgba(28,26,23,0.35)]"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-gold-600">
                  {signal.tag}
                </span>
                <p className="mt-3 text-sm text-[var(--foreground)]/80">
                  {signal.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(199,138,26,0.12),_transparent_65%)]" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-center md:justify-between">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="font-display text-3xl uppercase tracking-[0.4em] text-[var(--foreground)]"
              >
                Intelligence & Headlines
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 max-w-3xl text-[var(--foreground)]/70"
              >
                Highlights from our operating companies and venture partners.
              </motion.p>
            </div>
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(28,26,23,0.12)] px-5 py-2 text-xs uppercase tracking-[0.35em] text-[var(--foreground)] transition hover:border-gold-400 hover:text-gold-600"
            >
              View newsroom
              <span aria-hidden>↗</span>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredNews.map((item, index) => (
                <motion.article
                  key={item.key}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-[rgba(28,26,23,0.08)] bg-white p-6 shadow-[0_40px_120px_-75px_rgba(28,26,23,0.35)]"
                >
                  <span className="text-xs uppercase tracking-[0.35em] text-[var(--foreground)]/55">
                    {formatNewsDate(item.date)}
                  </span>
                  <h3 className="font-display text-2xl leading-tight text-[var(--foreground)] transition-colors duration-300 group-hover:text-gold-600">
                    {item.title}
                  </h3>
                  <Link
                    href={`/${locale}/news/${item.slug.current}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold-600 transition group-hover:text-gold-500"
                  >
                    Read insight
                    <span aria-hidden>→</span>
                  </Link>
                </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[rgba(28,26,23,0.1)] bg-gradient-to-r from-white via-[rgba(224,176,84,0.08)] to-[rgba(199,138,26,0.12)] py-24">
        <div className="absolute inset-y-0 left-1/2 -z-10 h-full w-[120%] -translate-x-1/2 bg-[radial-gradient(circle,_rgba(224,176,84,0.2),_transparent_65%)] blur-3xl" />
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(28,26,23,0.1)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.4em] text-gold-600"
          >
            Let’s Co-Create
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl leading-tight text-[var(--foreground)] md:text-5xl"
          >
            Ready to design the next market advantage together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl text-lg text-[var(--foreground)]/70"
          >
            Our teams thrive on complex challenges that demand precision, scale,
            and a relentless commitment to partnership. Let’s start building a
            future-forward solution for your organization.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-gold-gradient px-10 py-3 text-sm uppercase tracking-[0.35em] text-white shadow-[0_25px_60px_-25px_rgba(199,138,26,0.6)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Schedule A Briefing
            </Link>
            <Link
              href={`/${locale}/about`}
              className="rounded-full border border-[rgba(28,26,23,0.15)] px-10 py-3 text-sm uppercase tracking-[0.35em] text-[var(--foreground)] transition hover:border-gold-400 hover:text-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Learn Our Story
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

