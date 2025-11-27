"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Locale } from "@/lib/i18n";
import type { Division } from "@/lib/sanity";

type NavbarProps = {
  locale: Locale;
  messages: {
    nav?: Record<string, string>;
  };
  divisions?: Division[];
};

const navItems = [
  { href: "", key: "home", hasDropdown: false },
  { href: "about", key: "about", hasDropdown: false },
  { href: "divisions", key: "divisions", hasDropdown: true },
  { href: "news", key: "news", hasDropdown: false },
  { href: "contact", key: "contact", hasDropdown: false },
];

export function Navbar({ locale, messages, divisions = [] }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

  const handleMouseEnter = (key: string) => {
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[var(--card-bg)]/80 dark:bg-[var(--card-bg)]/90 backdrop-blur-lg border-b border-[var(--card-border)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-[var(--foreground)]">
        <Link
          href={`/${locale}` as any}
          className="font-display text-lg tracking-[0.25em] text-gold-700"
        >
          AMER GENERAL TRADING L.L.C
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => {
            const hasDropdown = item.hasDropdown && item.key === "divisions" && divisions.length > 0;
            
            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => hasDropdown && handleMouseEnter(item.key)}
                onMouseLeave={() => hasDropdown && handleMouseLeave()}
              >
                <a
                  href={item.slug}
                  className={cn(
                    "relative flex items-center gap-1 font-medium uppercase tracking-[0.2em] transition-colors",
                    item.active
                      ? "text-gold-600"
                      : "text-[var(--foreground)]/60 hover:text-gold-500",
                  )}
                >
                  {messages.nav?.[item.key] ?? item.key}
                  {hasDropdown && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      openDropdown === item.key && "rotate-180"
                    )} />
                  )}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold-500 transition-transform",
                      item.active && "scale-x-100",
                    )}
                  />
                </a>
                
                {hasDropdown && openDropdown === item.key && (
                  <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--card-bg)] shadow-lg py-2">
                    <Link
                      href={`/${locale}/divisions` as any}
                      className="block px-4 py-2 text-sm font-medium text-[var(--foreground)]/80 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                    >
                      {messages.nav?.allDivisions ?? "All Divisions"}
                    </Link>
                    <div className="border-t border-gold-100 my-1" />
                    {divisions.map((division) => {
                      const divisionDomains: Record<string, string> = {
                        "food-markets": "https://food.amertrading.ae",
                        "markets-trading": "https://food.amertrading.ae",
                      };
                      const subdomainUrl = division.slug?.current && divisionDomains[division.slug.current];
                      
                      if (subdomainUrl) {
                        return (
                          <a
                            key={division._id}
                            href={subdomainUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm text-[var(--foreground)]/70 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                          >
                            {division.name}
                          </a>
                        );
                      }
                      
                      return (
                        <Link
                          key={division._id}
                          href={`/${locale}/divisions/${division.slug.current}` as any}
                          className="block px-4 py-2 text-sm text-[var(--foreground)]/70 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                        >
                          {division.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-[var(--card-border)] bg-[var(--card-bg)]/70 dark:bg-[var(--card-bg)]/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--foreground)]/70 transition-all hover:border-gold-500/60 hover:text-gold-600 hover:scale-105"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

