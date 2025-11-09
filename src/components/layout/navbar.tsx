"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Locale } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
  messages: {
    nav?: Record<string, string>;
  };
};

const navItems = [
  { href: "", key: "home" },
  { href: "about", key: "about" },
  { href: "divisions", key: "divisions" },
  { href: "news", key: "news" },
  { href: "contact", key: "contact" },
];

export function Navbar({ locale, messages }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Allow hydration to complete before rendering theme-aware controls.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const links = useMemo(
    () =>
      navItems.map((item) => {
        const slug = item.href ? `/${locale}/${item.href}` : `/${locale}`;
        const active =
          pathname === slug ||
          (item.href === "" && pathname === `/${locale}`) ||
          pathname?.startsWith(`${slug}/`);
        return {
          ...item,
          slug,
          active,
        };
      }),
    [pathname, locale],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-[var(--foreground)]">
        <Link
          href={`/${locale}`}
          className="font-display text-lg tracking-[0.25em] text-gold-700"
        >
          AMER GENERAL TRADING L.L.C
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <Link
              key={item.key}
              href={item.slug}
              className={cn(
                "relative font-medium uppercase tracking-[0.2em] transition-colors",
                item.active
                  ? "text-gold-600"
                  : "text-[var(--foreground)]/60 hover:text-gold-500",
              )}
            >
              {messages.nav?.[item.key] ?? item.key}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold-500 transition-transform",
                  item.active && "scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-[rgba(28,26,23,0.12)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[var(--foreground)]/70 transition hover:border-gold-500/60 hover:text-gold-600"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

