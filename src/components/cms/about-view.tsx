"use client";

import type { PortableTextBlock } from "@portabletext/types";
import { motion } from "framer-motion";
import { RichText } from "./rich-text";

type TimelineEntry = {
  year: string;
  headline: string;
  description: string;
};

type AboutViewProps = {
  title: string;
  content: PortableTextBlock[];
  timeline?: TimelineEntry[];
};

export function AboutView({ title, content, timeline = [] }: AboutViewProps) {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(199,138,26,0.15),_transparent_65%)]" />
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl uppercase tracking-[0.4em] text-gold-600"
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-6 text-[var(--foreground)]/70"
          >
            <RichText value={content} />
          </motion.div>
        </div>
      </section>

      {timeline.length > 0 && (
        <section className="border-t border-[rgba(28,26,23,0.1)] bg-white/90 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="font-display text-3xl uppercase tracking-[0.35em] text-gold-600"
            >
              Milestones
            </motion.h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl border border-[rgba(28,26,23,0.12)] bg-white p-6 shadow-[0_30px_90px_-60px_rgba(28,26,23,0.35)]"
                >
                  <p className="text-sm uppercase tracking-[0.4em] text-gold-500">
                    {item.year}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--foreground)]">
                    {item.headline}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--foreground)]/70">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

