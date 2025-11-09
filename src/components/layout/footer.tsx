import Link from "next/link";
import { Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

const links = [
  { label: "Privacy Policy", href: "privacy" },
  { label: "Investors", href: "investors" },
  { label: "Careers", href: "careers" },
];

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-t border-[rgba(28,26,23,0.1)] bg-white/85">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-[var(--foreground)]/70 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl text-gold-700">
            AMER GENERAL TRADING L.L.C
          </p>
          <p className="mt-2 text-sm text-[var(--foreground)]/55">
            © {new Date().getFullYear()} AMER GENERAL TRADING L.L.C. All rights
            reserved.
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-6 text-sm uppercase tracking-[0.3em]">
          {links.map((item) => (
            <li key={item.label}>
              <Link
                href={`/${locale}/${item.href}`}
                className="transition hover:text-gold-600"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

