"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
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
  { href: "services", key: "services", hasDropdown: false },
  { href: "divisions", key: "divisions", hasDropdown: true },
  { href: "https://amertrading.shop", key: "buy from us", hasDropdown: false, external: true },
  { href: "industries", key: "industries", hasDropdown: false },
  { href: "news", key: "news", hasDropdown: false },
  { href: "contact", key: "contact", hasDropdown: false },
];

export function Navbar({ locale, messages, divisions = [] }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Allow hydration to complete before rendering theme-aware controls.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [mobileMenuOpen]);

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
    <>
      {/* Backdrop overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[45] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
          suppressHydrationWarning
        />
      )}
      <header className="fixed inset-x-0 top-0 z-40 bg-[var(--card-bg)]/80 dark:bg-[var(--card-bg)]/90 backdrop-blur-lg border-b border-[var(--card-border)] transition-all duration-300" suppressHydrationWarning>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 text-sm text-[var(--foreground)]">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 sm:gap-3 transition-transform duration-300 hover:scale-105 flex-shrink-0 min-w-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="relative bg-transparent">
            <Image
              src="/images/amerlogo.png"
              alt="AMER GENERAL TRADING L.L.C"
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain bg-transparent"
              priority
              style={{ 
                border: 'none !important', 
                outline: 'none !important',
                backgroundColor: 'transparent !important',
                background: 'transparent !important',
                boxShadow: 'none !important'
              }}
            />
          </div>
          <span className="font-display text-sm sm:text-lg tracking-[0.25em] text-gold-700 hidden xs:inline">
            AMER GENERAL TRADING L.L.C
          </span>
        </Link>
        <nav className="hidden items-center gap-2 lg:gap-4 md:flex flex-1 justify-center min-w-0 mx-4">
          {links.map((item) => {
            const hasDropdown = item.hasDropdown && item.key === "divisions" && divisions.length > 0;
            
            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => hasDropdown && handleMouseEnter(item.key)}
                onMouseLeave={() => hasDropdown && handleMouseLeave()}
              >
                {item.external ? (
                  <a
                    href={item.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative flex items-center gap-1 font-medium uppercase tracking-[0.2em] transition-colors",
                      "text-[var(--foreground)]/60 hover:text-gold-500",
                    )}
                  >
                    {messages.nav?.[item.key] ?? item.key}
                  </a>
                ) : (
                  <Link
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
                  </Link>
                )}
                
                {hasDropdown && openDropdown === item.key && (
                  <div 
                    className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--card-bg)] shadow-lg py-2"
                    onMouseEnter={() => handleMouseEnter(item.key)}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <Link
                      href={`/${locale}/divisions`}
                      className="block px-4 py-2 text-sm font-medium text-[var(--foreground)]/80 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                      onClick={() => setOpenDropdown(null)}
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
                            onClick={() => setOpenDropdown(null)}
                          >
                            {division.name}
                          </a>
                        );
                      }
                      
                      return (
                        <Link
                          key={division._id}
                          href={`/${locale}/divisions/${division.slug.current}`}
                          className="block px-4 py-2 text-sm text-[var(--foreground)]/70 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                          onClick={() => setOpenDropdown(null)}
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
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden sm:block">
            <button
              type="button"
              onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
              disabled={!mounted}
              className="rounded-full border border-[var(--card-border)] bg-[var(--card-bg)]/70 dark:bg-[var(--card-bg)]/80 px-3 py-1.5 md:px-4 md:py-2 text-xs uppercase tracking-[0.3em] text-[var(--foreground)]/70 transition-all hover:border-gold-500/60 hover:text-gold-600 hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Loading theme"}
              suppressHydrationWarning
            >
              {mounted ? (theme === "dark" ? "Light" : "Dark") : "Light"}
            </button>
          </div>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]/70 dark:bg-[var(--card-bg)]/80 p-2 text-[var(--foreground)]/70 transition-all hover:border-gold-500/60 hover:text-gold-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[50] md:hidden bg-[var(--card-bg)] dark:bg-[var(--card-bg)] overflow-y-auto" suppressHydrationWarning>
          <div className="pt-16 border-b border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--card-bg)]">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative bg-transparent">
                  <Image
                    src="/images/amerlogo.png"
                    alt="AMER GENERAL TRADING L.L.C"
                    width={120}
                    height={40}
                    className="h-8 sm:h-10 w-auto object-contain bg-transparent"
                    priority
                    style={{ 
                      border: 'none !important', 
                      outline: 'none !important',
                      backgroundColor: 'transparent !important',
                      background: 'transparent !important',
                      boxShadow: 'none !important'
                    }}
                  />
                </div>
                <span className="font-display text-sm sm:text-lg tracking-[0.25em] text-gold-700 hidden xs:inline">
                  AMER GENERAL TRADING L.L.C
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]/70 dark:bg-[var(--card-bg)]/80 p-2 text-[var(--foreground)]/70 transition-all hover:border-gold-500/60 hover:text-gold-600"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <nav className="px-4 sm:px-6 py-6 space-y-3">
            {links.map((item) => {
              const hasDropdown = item.hasDropdown && item.key === "divisions" && divisions.length > 0;
              const isDropdownOpen = openDropdown === item.key;
              
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.slug}
                      onClick={() => {
                        if (!hasDropdown) {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={cn(
                        "flex-1 block py-2.5 px-4 rounded-lg font-medium uppercase tracking-[0.15em] transition-colors text-sm",
                        item.active
                          ? "text-gold-600 bg-gold-50 dark:bg-gold-900/20 font-semibold"
                          : "text-[var(--foreground)]/80 hover:text-gold-500 hover:bg-[var(--hover-bg)]"
                      )}
                    >
                      {messages.nav?.[item.key] ?? item.key}
                    </Link>
                    {hasDropdown && (
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.key)}
                        className="p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors"
                        aria-label="Toggle divisions menu"
                      >
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          isDropdownOpen && "rotate-180"
                        )} />
                      </button>
                    )}
                  </div>
                  
                  {hasDropdown && isDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-gold-200 dark:border-gold-800 pl-4">
                      <Link
                        href={`/${locale}/divisions`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 rounded-lg text-sm text-[var(--foreground)]/80 hover:text-gold-600 hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors font-medium"
                      >
                        {messages.nav?.allDivisions ?? "All Divisions"}
                      </Link>
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
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 px-3 rounded-lg text-sm text-[var(--foreground)]/70 hover:text-gold-600 hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors"
                            >
                              {division.name}
                            </a>
                          );
                        }
                        
                        return (
                          <Link
                            key={division._id}
                            href={`/${locale}/divisions/${division.slug.current}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-3 rounded-lg text-sm text-[var(--foreground)]/70 hover:text-gold-600 hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors"
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
            {/* Theme toggle in mobile menu */}
            <div className="pt-4 mt-4 border-t border-[var(--card-border)]">
              <button
                type="button"
                onClick={() => {
                  if (mounted) {
                    setTheme(theme === "dark" ? "light" : "dark");
                    setMobileMenuOpen(false);
                  }
                }}
                disabled={!mounted}
                className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]/70 dark:bg-[var(--card-bg)]/80 px-4 py-2.5 text-xs uppercase tracking-[0.3em] text-[var(--foreground)]/70 transition-all hover:border-gold-500/60 hover:text-gold-600 hover:bg-gold-50 dark:hover:bg-gold-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Loading theme"}
                suppressHydrationWarning
              >
                {mounted ? (theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode") : "Switch to Light Mode"}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  );
}

