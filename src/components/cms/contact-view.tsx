"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type ContactViewProps = {
  locale: string;
  company?: {
    name?: string;
    mission?: string;
  } | null;
};

export function ContactView({ locale, company }: ContactViewProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          locale,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_rgba(199,138,26,0.2),_transparent_65%)]" />
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl uppercase tracking-[0.4em] text-gold-600"
            >
              Contact Us
            </motion.h1>
            <p className="mt-4 text-[var(--foreground)]/70">
              {company?.mission ??
                "Reach out to AMER GENERAL TRADING L.L.C for partnerships, opportunities, and media relations."}
            </p>
            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-600">
                  Headquarters
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]/65">
                  Amer dubai Trading L.L.C Industrial Area 6 Sharjah UAE
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-600">
                  Phone Numbers
                </p>
                <div className="mt-2 space-y-2 text-sm text-[var(--foreground)]/65">
                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/971525485401"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold-400 transition"
                    >
                      +971 52 548 5401
                    </a>
                    <span className="text-xs text-[var(--foreground)]/40">Info</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/971504960365"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold-400 transition"
                    >
                      +971 50 496 0365
                    </a>
                    <span className="text-xs text-[var(--foreground)]/40">Persian</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/971542550687"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold-400 transition"
                    >
                      +971 54 255 0687
                    </a>
                    <span className="text-xs text-[var(--foreground)]/40">Arabic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/971565113467"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold-400 transition"
                    >
                      +971 56 511 3467
                    </a>
                    <span className="text-xs text-[var(--foreground)]/40">English</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-600">
                  Email Addresses
                </p>
                <div className="mt-2 space-y-2 text-sm text-[var(--foreground)]/65">
                  <a
                    href="mailto:Info@amertrading.ae"
                    className="block hover:text-gold-400 transition"
                  >
                    Info@amertrading.ae
                  </a>
                  <a
                    href="mailto:sales@amertrading.ae"
                    className="block hover:text-gold-400 transition"
                  >
                    sales@amertrading.ae
                  </a>
                  <a
                    href="mailto:support@amertrading.ae"
                    className="block hover:text-gold-400 transition"
                  >
                    support@amertrading.ae
                  </a>
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--card-bg)] p-8 shadow-[0_35px_90px_-60px_rgba(28,26,23,0.4)] dark:shadow-[0_35px_90px_-60px_rgba(0,0,0,0.6)]"
          >
            <div className="grid gap-6">
              <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]/75">
                Name
                <input
                  name="name"
                  required
                  className="rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--hover-bg)] px-4 py-3 text-[var(--foreground)] focus:border-gold-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]/75">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--hover-bg)] px-4 py-3 text-[var(--foreground)] focus:border-gold-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]/75">
                Message
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--hover-bg)] px-4 py-3 text-[var(--foreground)] focus:border-gold-400 focus:outline-none"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-8 w-full rounded-full bg-gold-gradient px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Sent!"
                : "Submit"}
            </button>
            {status === "error" && (
              <p className="mt-4 text-xs text-red-500">
                Something went wrong. Please try again.
              </p>
            )}
            {status === "sent" && (
              <p className="mt-4 text-xs text-gold-600">
                Thank you! We will be in touch shortly.
              </p>
            )}
          </form>
        </div>
        
        {/* Google Maps Location */}
        <div className="mx-auto mt-16 max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-[0_35px_90px_-60px_rgba(28,26,23,0.4)] border border-[rgba(28,26,23,0.12)]"
          >
            <div className="h-[500px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.198509794893!2d55.3708!3d25.3048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b8b8b8b8b9%3A0x8b8b8b8b8b8b8b8b!2sIndustrial%20Area%206%2C%20Sharjah%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AMER GENERAL TRADING L.L.C Location - Industrial Area 6, Sharjah, UAE"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

