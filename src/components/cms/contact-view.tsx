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
                  Dubai International Financial Centre, Gate Building, United
                  Arab Emirates
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-600">
                  Phone
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]/65">
                  +971 4 123 4567
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-600">
                  Email
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]/65">
                  partnerships@amertrading.com
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[rgba(28,26,23,0.12)] bg-white p-8 shadow-[0_35px_90px_-60px_rgba(28,26,23,0.4)]"
          >
            <div className="grid gap-6">
              <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]/75">
                Name
                <input
                  name="name"
                  required
                  className="rounded-full border border-[rgba(28,26,23,0.12)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-gold-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]/75">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-full border border-[rgba(28,26,23,0.12)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-gold-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-[var(--foreground)]/75">
                Message
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="rounded-3xl border border-[rgba(28,26,23,0.12)] bg-white px-4 py-3 text-[var(--foreground)] focus:border-gold-400 focus:outline-none"
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
      </section>
    </div>
  );
}

