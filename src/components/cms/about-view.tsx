"use client";

import type { PortableTextBlock } from "@portabletext/types";
import { motion } from "framer-motion";
import Image from "next/image";
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
      {/* Hero Section with Image */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hpage2.jpg"
            alt="About AMER DUBAI TRADING"
            fill
            className="object-cover opacity-30"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(199,138,26,0.15),_transparent_65%)]" />
        </div>
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 relative z-10">
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
            className="space-y-6 text-[var(--foreground)]/90"
          >
            <RichText value={content} />
          </motion.div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="border-t border-[var(--card-border)] bg-[var(--card-bg)]/50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="font-display text-3xl uppercase tracking-[0.35em] text-gold-600 mb-10"
          >
            Our Journey
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-64 rounded-2xl overflow-hidden border border-[var(--card-border)]"
            >
              <Image
                src="/images/hpage1.jpg"
                alt="Company Operations"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-64 rounded-2xl overflow-hidden border border-[var(--card-border)]"
            >
              <Image
                src="/images/hpage4.jpg"
                alt="Global Reach"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-64 rounded-2xl overflow-hidden border border-[var(--card-border)]"
            >
              <Image
                src="/images/amerback.jpg"
                alt="Team Excellence"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>

      {timeline.length > 0 && (
        <section className="border-t border-[var(--card-border)] bg-[var(--card-bg)]/90 dark:bg-[var(--card-bg)]/80 py-20">
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
                  className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--hover-bg)] p-6 shadow-[0_30px_90px_-60px_rgba(28,26,23,0.35)] dark:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.6)]"
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

