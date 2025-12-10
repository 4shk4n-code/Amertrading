"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Division } from "@/lib/sanity";

type DivisionDetailProps = {
  division: Division | null;
  locale?: string;
};

export function DivisionDetail({ division, locale = "en" }: DivisionDetailProps) {
  if (!division) {
    return (
      <div className="min-h-[60vh] bg-black p-10 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="h-10 w-1/3 animate-pulse rounded bg-white/10" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full animate-pulse rounded bg-white/5"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <section className="relative h-[55vh] overflow-hidden">
        {division.image?.asset?.url ? (
          <Image
            src={division.image.asset.url}
            alt={division.name}
            fill
            className="object-cover opacity-40"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto mb-16 max-w-5xl px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xs uppercase tracking-[0.4em] text-gold-300"
            >
              Strategic Division
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-4 font-display text-5xl uppercase tracking-[0.35em]"
            >
              {division.name}
            </motion.h1>
          </div>
        </div>
      </section>
      <section className="bg-black py-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="text-lg leading-relaxed text-white/70 mb-12"
          >
            {division.description || `As a strategic division of AMER DUBAI TRADING L.L.C, ${division.name} represents our commitment to excellence and innovation in specialized market segments. With over three decades of industry expertise, we have established ourselves as a trusted partner for businesses seeking world-class solutions and unparalleled service quality.`}
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-white/10 bg-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl uppercase tracking-[0.3em] text-white md:text-4xl mb-4">
              Our Capabilities
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-white/60">
              Comprehensive solutions designed to meet the unique needs of our clients
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Global Reach",
                description: "Extensive network spanning 28+ countries with strategic partnerships and local expertise in every market we serve.",
                image: "/images/hpage1.jpg"
              },
              {
                title: "Quality Assurance",
                description: "Rigorous quality control processes ensure every product and service meets the highest international standards.",
                image: "/images/hpage2.jpg"
              },
              {
                title: "Innovation",
                description: "Cutting-edge technology and innovative solutions that keep our clients ahead of the competition.",
                image: "/images/hpage3.jpg"
              },
              {
                title: "Customer Focus",
                description: "Dedicated support teams providing personalized service and rapid response to client needs.",
                image: "/images/hpage4.jpg"
              },
              {
                title: "Sustainability",
                description: "Commitment to environmentally responsible practices and sustainable business operations.",
                image: "/images/amerback.jpg"
              },
              {
                title: "Reliability",
                description: "Proven track record of consistent performance and dependable delivery across all operations.",
                image: "/images/hpage.jpg"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={`${feature.title} - ${feature.description.substring(0, 80)}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-3 font-display text-xl uppercase tracking-[0.1em] text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-t border-white/10 bg-black py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl uppercase tracking-[0.3em] text-white md:text-4xl mb-4">
              Our Services
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-white/60">
              Comprehensive service offerings tailored to your business needs
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Strategic Sourcing",
              "Quality Control",
              "Distribution Networks",
              "Market Analysis",
              "Supply Chain Management",
              "Customer Support",
              "Technical Consulting",
              "After-Sales Service"
            ].map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-xl border border-white/10 bg-zinc-900/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-gold-500/50 hover:bg-zinc-900/50"
              >
                <div className="mb-3 h-12 w-12 mx-auto rounded-full bg-gold-600/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-gold-500" />
                </div>
                <h3 className="font-display text-sm uppercase tracking-[0.1em] text-white">
                  {service}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-white/10 bg-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { label: "Years Experience", value: "30+" },
              { label: "Countries Served", value: "28+" },
              { label: "Satisfied Clients", value: "500+" },
              { label: "Success Rate", value: "99.8%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl text-gold-500 mb-2">{stat.value}</p>
                <p className="text-sm uppercase tracking-wider text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl uppercase tracking-[0.3em] text-white md:text-4xl mb-6">
              Partner With Us
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70 mb-10">
              Experience the difference that three decades of expertise can make. 
              Let&apos;s discuss how {division.name} can transform your business operations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="rounded-full bg-gold-gradient px-10 py-3 text-sm uppercase tracking-[0.35em] text-white shadow-[0_25px_60px_-25px_rgba(199,138,26,0.6)] transition-transform duration-300 hover:scale-105"
              >
                Get In Touch
              </Link>
              <Link
                href={`/${locale}/services`}
                className="rounded-full border border-white/20 px-10 py-3 text-sm uppercase tracking-[0.35em] text-white transition hover:border-gold-500 hover:text-gold-500"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

