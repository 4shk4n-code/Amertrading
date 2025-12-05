"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Facebook,
  Instagram,
  Globe
} from "lucide-react";
import { Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

const footerLinks = {
  company: [
    { href: "about", label: "About Us" },
    { href: "services", label: "Services" },
    { href: "divisions", label: "Divisions" },
    { href: "industries", label: "Industries" },
  ],
  services: [
    { href: "services", label: "Freight & Shipping" },
    { href: "services", label: "Warehousing" },
    { href: "services", label: "Supply Chain" },
    { href: "services", label: "Trade Services" },
  ],
  resources: [
    { href: "news", label: "News & Updates" },
    { href: "products", label: "Product Catalog" },
    { href: "contact", label: "Request Quote" },
    { href: "contact", label: "Careers" },
  ],
  legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cookie Policy" },
    { href: "#", label: "Compliance" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-xl uppercase tracking-[0.3em] text-gold-600 mb-4">
                AMER GENERAL TRADING L.L.C
              </h3>
              <p className="mb-6 text-[var(--foreground)]/70 text-sm leading-relaxed">
                Leading wholesale logistics and trading company serving global markets 
                with comprehensive supply chain solutions since 1995.
              </p>
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-[var(--foreground)]/70">
                  <MapPin className="h-5 w-5 text-gold-600 mt-0.5 flex-shrink-0" />
                  <span>Industrial Area 6, Sharjah, UAE</span>
                </div>
                <div className="flex flex-col gap-2 text-sm text-[var(--foreground)]/70">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gold-600 flex-shrink-0" />
                    <a href="https://wa.me/971525485401" target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors">
                      +971 52 548 5401
                    </a>
                    <span className="text-xs text-[var(--foreground)]/40">(Info)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gold-600 flex-shrink-0" />
                    <a href="https://wa.me/971504960365" target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors">
                      +971 50 496 0365
                    </a>
                    <span className="text-xs text-[var(--foreground)]/40">(Persian)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--foreground)]/70">
                  <Mail className="h-5 w-5 text-gold-600 flex-shrink-0" />
                  <a href="mailto:info@amertrading.com" className="hover:text-gold-600 transition-colors">
                    info@amertrading.com
                  </a>
                </div>
              </div>
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)]/60 transition-all hover:border-gold-500 hover:text-gold-600 hover:bg-gold-50 dark:hover:bg-gold-900/20"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-sm uppercase tracking-[0.3em] text-[var(--foreground)] mb-4"
            >
              Company
            </motion.h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${locale}/${link.href}`}
                    className="text-sm text-[var(--foreground)]/70 transition-colors hover:text-gold-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-sm uppercase tracking-[0.3em] text-[var(--foreground)] mb-4"
            >
              Services
            </motion.h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${locale}/${link.href}`}
                    className="text-sm text-[var(--foreground)]/70 transition-colors hover:text-gold-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-sm uppercase tracking-[0.3em] text-[var(--foreground)] mb-4"
            >
              Resources
            </motion.h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${locale}/${link.href}`}
                    className="text-sm text-[var(--foreground)]/70 transition-colors hover:text-gold-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-display text-sm uppercase tracking-[0.3em] text-[var(--foreground)] mb-4"
            >
              Legal
            </motion.h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground)]/70 transition-colors hover:text-gold-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-[var(--card-border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-[var(--foreground)]/60">
            © {currentYear} AMER GENERAL TRADING L.L.C. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
            <Globe className="h-4 w-4" />
            <span>Operating in 28+ countries worldwide</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
