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
  "markets-trading": "https://markets.amertrading.ae",
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
          {items.map((item, index) =>
            hasData ? (
              <motion.div
                key={item._id}
                className="group relative overflow-hidden rounded-3xl border border-[rgba(28,26,23,0.12)] bg-white p-6 shadow-[0_40px_100px_-70px_rgba(28,26,23,0.35)] transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                {item.image?.asset?.url && (
                  <Image
                    src={item.image.asset.url}
                    alt={item.name}
                    fill
                    className="absolute inset-0 object-cover opacity-50 transition duration-700 group-hover:scale-110 group-hover:opacity-70"
                  />
                )}
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.4em] text-gold-500">
                    Division
                  </p>
                  <h2 className="mt-4 font-display text-2xl uppercase tracking-[0.3em]">
                    {item.name}
                  </h2>
                  <p className="mt-4 text-sm text-[var(--foreground)]/70">
                    {item.description}
                  </p>
                  <Link
                    href={
                      item.slug?.current &&
                      divisionDomains[item.slug.current]
                        ? divisionDomains[item.slug.current]
                        : `/${locale}/divisions/${item.slug?.current ?? ""}`
                    }
                    target={
                      item.slug?.current &&
                      divisionDomains[item.slug.current]
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      item.slug?.current &&
                      divisionDomains[item.slug.current]
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-600 hover:text-gold-500"
                  >
                    View Division <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div
                key={item._id}
                className="h-64 animate-pulse rounded-3xl border border-[rgba(28,26,23,0.12)] bg-white/70"
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

