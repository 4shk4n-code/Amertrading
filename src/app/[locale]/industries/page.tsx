"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Factory, 
  ShoppingBag, 
  Car, 
  UtensilsCrossed,
  Shirt,
  Computer,
  Building2,
  Heart,
  Truck,
  Package
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

const industries = [
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Comprehensive logistics solutions for manufacturing operations, from raw materials to finished products.",
    services: ["Material Sourcing", "Production Supply Chain", "Finished Goods Distribution", "Quality Assurance"],
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: ShoppingBag,
    title: "Retail & E-commerce",
    description: "End-to-end fulfillment and distribution services tailored for retail businesses and online stores.",
    services: ["Order Fulfillment", "Inventory Management", "Last-Mile Delivery", "Returns Processing"],
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: Car,
    title: "Automotive",
    description: "Specialized logistics for automotive parts, components, and finished vehicles across global markets.",
    services: ["Parts Distribution", "OEM Supply Chain", "Aftermarket Logistics", "Vehicle Shipping"],
    color: "from-red-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c2c03457?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Beverage",
    description: "Temperature-controlled logistics ensuring food safety and compliance with health regulations.",
    services: ["Cold Chain Logistics", "Food Distribution", "Beverage Supply Chain", "Compliance Management"],
    color: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: Shirt,
    title: "Fashion & Apparel",
    description: "Fast and flexible logistics for fashion brands, from seasonal collections to fast-fashion delivery.",
    services: ["Fashion Distribution", "Seasonal Logistics", "Warehousing Solutions", "Express Delivery"],
    color: "from-pink-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: Computer,
    title: "Technology & Electronics",
    description: "Secure and efficient handling of sensitive electronics and technology products worldwide.",
    services: ["Electronics Shipping", "IT Hardware Distribution", "Secure Warehousing", "Value-Added Services"],
    color: "from-indigo-500 to-purple-500",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: Building2,
    title: "Construction",
    description: "Heavy-duty logistics for construction materials, equipment, and machinery transportation.",
    services: ["Material Transport", "Heavy Equipment Shipping", "Project Logistics", "Site Delivery"],
    color: "from-gray-600 to-gray-800",
    image: "https://images.unsplash.com/photo-1504307651254-35680f836df2?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: Heart,
    title: "Healthcare & Pharmaceuticals",
    description: "Regulated logistics meeting strict pharmaceutical and medical device compliance standards.",
    services: ["Pharma Distribution", "Medical Devices", "Regulatory Compliance", "Temperature Control"],
    color: "from-red-400 to-pink-500",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop&q=80",
  },
];

const stats = [
  { label: "Industry Verticals", value: "15+", icon: Factory },
  { label: "Satisfied Clients", value: "500+", icon: Building2 },
  { label: "Years of Experience", value: "30+", icon: Truck },
  { label: "Countries Served", value: "28+", icon: Package },
];

export default function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--card-border)] py-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hpage3.jpg"
            alt="Industries We Serve"
            fill
            className="object-cover opacity-30"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[rgba(199,138,26,0.08)] to-[rgba(224,176,84,0.15)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(199,138,26,0.18),_transparent_65%)]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(28,26,23,0.1)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.4em] text-gold-600"
            >
              Industries We Serve
            </motion.span>
            <h1 className="mt-6 font-display text-4xl uppercase tracking-[0.3em] text-[var(--foreground)] md:text-5xl">
              Specialized Solutions
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--foreground)]/70">
              We deliver tailored logistics solutions across diverse industries, 
              understanding the unique requirements of each sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-[var(--card-border)] bg-[var(--card-bg)]/50 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <Icon className="mx-auto h-8 w-8 text-gold-600 mb-2" />
                <p className="font-display text-3xl text-gold-600">{stat.value}</p>
                <p className="mt-1 text-sm text-[var(--foreground)]/70">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--hover-bg)] shadow-[0_55px_150px_-85px_rgba(28,26,23,0.35)] transition-all duration-500 hover:shadow-[0_55px_150px_-85px_rgba(199,138,26,0.4)]"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-20 transition-opacity duration-500 group-hover:opacity-30`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent" />
                  </div>
                  <div className="p-8">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-100/50 dark:bg-gold-900/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-8 w-8 text-gold-600" />
                    </div>
                  <h3 className="mb-3 font-display text-xl uppercase tracking-[0.2em] text-[var(--foreground)]">
                    {industry.title}
                  </h3>
                  <p className="mb-6 text-sm text-[var(--foreground)]/70">
                    {industry.description}
                  </p>
                  <ul className="space-y-2">
                    {industry.services.map((service) => (
                      <li key={service} className="flex items-center gap-2 text-xs text-[var(--foreground)]/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-[var(--card-border)] bg-gradient-to-r from-white via-[rgba(224,176,84,0.08)] to-[rgba(199,138,26,0.12)] py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(224,176,84,0.18),_transparent_75%)]" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl uppercase tracking-[0.3em] text-[var(--foreground)] md:text-4xl">
              Not Seeing Your Industry?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--foreground)]/70">
              We adapt our solutions to meet the unique needs of any industry. Let&apos;s discuss your specific requirements.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="rounded-full bg-gold-gradient px-10 py-3 text-sm uppercase tracking-[0.35em] text-white shadow-[0_25px_60px_-25px_rgba(199,138,26,0.6)] transition-transform duration-300 hover:scale-105"
              >
                Contact Us
              </Link>
              <Link
                href={`/${locale}/services`}
                className="rounded-full border border-[rgba(28,26,23,0.15)] px-10 py-3 text-sm uppercase tracking-[0.35em] text-[var(--foreground)] transition hover:border-gold-400 hover:text-gold-600"
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

