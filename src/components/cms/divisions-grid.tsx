"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Division } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";

const divisionDomains: Record<string, string> = {
  "food-markets": "https://food.amertrading.ae",
  "auto-parts": "https://auto.amertrading.ae",
  "clothing-lifestyle": "https://style.amertrading.ae",
  "it-hardware": "https://tech.amertrading.ae",
  "markets-trading": "https://food.amertrading.ae",
};

type DivisionsGridProps = {
  locale: Locale;
  divisions: Division[];
};

export function DivisionsGrid({ locale, divisions }: DivisionsGridProps) {
  const hasData = divisions.length > 0;
  const items = hasData
    ? divisions
    : Array.from({ length: 6 }).map((_, i) => ({ _id: `placeholder-${i}` }));

  return (
    <section className="bg-[var(--background)] py-24 text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl uppercase tracking-[0.4em] text-gold-600"
        >
          Divisions
        </motion.h1>
        <p className="mt-4 max-w-3xl text-[var(--foreground)]/65">
          Explore AMER GENERAL TRADING L.L.C’s diversified portfolio spanning automotive,
          food markets, fashion, IT hardware, and marketplace innovation.
        </p>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {hasData
            ? divisions.map((division, index) => (
                <motion.div
                  key={division._id}
                  className="group relative overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--hover-bg)] p-6 shadow-[0_40px_100px_-70px_rgba(28,26,23,0.35)] dark:shadow-[0_40px_100px_-70px_rgba(0,0,0,0.5)] transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  {division.image?.asset?.url && (
                    <Image
                      src={division.image.asset.url}
                      alt={division.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute inset-0 object-cover opacity-50 transition duration-700 group-hover:scale-110 group-hover:opacity-70"
                      unoptimized={division.image.asset.url.includes('unsplash.com')}
                    />
                  )}
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.4em] text-gold-500">
                      Division
                    </p>
                    <h2 className="mt-4 font-display text-2xl uppercase tracking-[0.3em]">
                      {division.name}
                    </h2>
                    <p className="mt-4 text-sm text-[var(--foreground)]/70">
                      {division.description}
                    </p>
                    {division.slug?.current &&
                    divisionDomains[division.slug.current] ? (
                      <a
                        href={divisionDomains[division.slug.current]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-600 hover:text-gold-500"
                      >
                        Visit Site <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <Link
                        href={`/${locale}/divisions/${division.slug?.current ?? ""}` as any}
                        className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-600 hover:text-gold-500"
                      >
                        View Division <span aria-hidden>→</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))
            : items.map((item) => (
                <div
                  key={item._id}
                  className="h-64 animate-pulse rounded-3xl border border-[rgba(28,26,23,0.12)] bg-white/70"
                />
              ))}
        </div>
      </div>
    </section>
  );
}

