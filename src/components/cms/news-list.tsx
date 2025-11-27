"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { NewsPost } from "@/lib/sanity";
import { Locale } from "@/lib/i18n";
import { formatTimestamp } from "@/lib/utils/date";
import { portableTextToPlainText } from "@/lib/utils/portableText";

type NewsListProps = {
  locale: Locale;
  posts: NewsPost[];
};

export function NewsList({ locale, posts }: NewsListProps) {
  const hasPosts = posts.length > 0;
  const items = hasPosts
    ? posts
    : Array.from({ length: 3 }).map((_, i) => ({ _id: `placeholder-${i}` }));

  return (
    <section className="bg-[var(--background)] py-20 text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl uppercase tracking-[0.4em] text-gold-600"
        >
          News & Insights
        </motion.h1>
        <div className="mt-14 space-y-8">
          {hasPosts
            ? posts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="flex flex-col gap-6 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--hover-bg)] p-6 shadow-[0_35px_90px_-60px_rgba(28,26,23,0.35)] dark:shadow-[0_35px_90px_-60px_rgba(0,0,0,0.6)] md:flex-row"
                >
                  {post.image?.asset?.url && (
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl md:w-72">
                      <Image
                        src={post.image.asset.url}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col">
                    <p className="text-xs uppercase tracking-[0.4em] text-gold-500">
                      {formatTimestamp(post.date)}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-sm text-[var(--foreground)]/70">
                      {portableTextToPlainText(post.body).slice(0, 160)}…
                    </p>
                    <Link
                      href={`/${locale}/news/${post.slug.current}` as any}
                      className="mt-auto inline-flex items-center gap-2 pt-4 text-xs uppercase tracking-[0.3em] text-gold-600 hover:text-gold-500"
                    >
                      Read Article →
                    </Link>
                  </div>
                </motion.article>
              ))
            : items.map((item) => (
                <div
                  key={item._id}
                  className="h-48 animate-pulse rounded-3xl border border-[rgba(28,26,23,0.12)] bg-white/70"
                />
              ))}
        </div>
      </div>
    </section>
  );
}

