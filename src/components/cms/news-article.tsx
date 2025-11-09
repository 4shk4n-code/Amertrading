"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RichText } from "./rich-text";
import { formatTimestamp } from "@/lib/utils/date";
import { NewsPost } from "@/lib/sanity";

type NewsArticleProps = {
  post: NewsPost | null;
};

export function NewsArticle({ post }: NewsArticleProps) {
  if (!post) {
    return (
      <div className="min-h-[50vh] bg-[var(--background)] p-8 text-[var(--foreground)]">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded bg-[rgba(28,26,23,0.08)]" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-[rgba(28,26,23,0.08)]" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-4 w-full animate-pulse rounded bg-[rgba(28,26,23,0.05)]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-[var(--background)] text-[var(--foreground)]">
      <header className="relative h-[60vh] overflow-hidden">
        {post.image?.asset?.url && (
          <Image
            src={post.image.asset.url}
            alt={post.title}
            fill
            className="object-cover opacity-65"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/80" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-end px-6 pb-16 text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] text-gold-200"
          >
            {formatTimestamp(post.date)}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-4 font-display text-4xl uppercase tracking-[0.35em]"
          >
            {post.title}
          </motion.h1>
        </div>
      </header>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="prose max-w-none text-[var(--foreground)]/80 prose-a:text-gold-600 prose-strong:text-[var(--foreground)]"
          >
            <RichText value={post.body} />
          </motion.div>
        </div>
      </section>
    </article>
  );
}

