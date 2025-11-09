"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Division } from "@/lib/sanity";

type DivisionDetailProps = {
  division: Division | null;
};

export function DivisionDetail({ division }: DivisionDetailProps) {
  if (!division) {
    return (
      <div className="min-h-[60vh] bg-black p-10 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="h-10 w-1/3 animate-pulse rounded bg-white/10" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full animate-pulse rounded bg-white/5"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <section className="relative h-[55vh] overflow-hidden">
        {division.image?.asset?.url ? (
          <Image
            src={division.image.asset.url}
            alt={division.name}
            fill
            className="object-cover opacity-40"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto mb-16 max-w-5xl px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-[0.4em] text-gold-300"
            >
              Strategic Division
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-4 font-display text-5xl uppercase tracking-[0.35em]"
            >
              {division.name}
            </motion.h1>
          </div>
        </div>
      </section>
      <section className="bg-black py-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="text-lg leading-relaxed text-white/70"
          >
            {division.description}
          </motion.p>
        </div>
      </section>
    </div>
  );
}

