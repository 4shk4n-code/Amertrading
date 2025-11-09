"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-3xl uppercase tracking-[0.35em] text-gold-300">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-white/70">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-inside list-disc space-y-2 text-white/70">
        {children}
      </ul>
    ),
  },
};

type RichTextProps = {
  value: PortableTextBlock[];
};

export function RichText({ value }: RichTextProps) {
  if (!value?.length) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="h-6 w-2/3 animate-pulse rounded bg-white/10" />
        <div className="h-6 w-4/5 animate-pulse rounded bg-white/10" />
      </div>
    );
  }
  return <PortableText value={value} components={components} />;
}

