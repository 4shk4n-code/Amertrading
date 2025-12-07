"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import { 
  Truck, 
  Warehouse, 
  Globe, 
  Package, 
  Shield, 
  MapPin,
  Clock,
  BarChart3
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Global Freight & Shipping",
    description: "End-to-end freight forwarding services across air, sea, and land. We manage complex logistics networks to ensure timely delivery worldwide.",
    features: ["Air Freight", "Sea Freight", "Road Transport", "Express Delivery", "Custom Clearance"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Distribution",
    description: "State-of-the-art storage facilities with advanced inventory management systems. Strategically located hubs for efficient distribution.",
    features: ["Storage Solutions", "Inventory Management", "Cross-Docking", "Pick & Pack", "Distribution Networks"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: Globe,
    title: "International Trade",
    description: "Comprehensive international trading services connecting markets across GCC, Levant, Eurasia, and beyond.",
    features: ["Import/Export", "Trade Finance", "Documentation", "Compliance", "Market Access"],
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: Package,
    title: "Supply Chain Management",
    description: "Integrated supply chain solutions from sourcing to delivery. We optimize every link in your supply chain for maximum efficiency.",
    features: ["Procurement", "Vendor Management", "Quality Control", "Order Fulfillment", "Returns Management"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: Shield,
    title: "Compliance & Certification",
    description: "Full compliance management ensuring all shipments meet international standards and regulatory requirements.",
    features: ["ISO Certification", "Customs Compliance", "Documentation", "Audits", "Regulatory Support"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
  },
  {
    icon: BarChart3,
    title: "Logistics Consulting",
    description: "Strategic logistics consulting to optimize your operations, reduce costs, and improve supply chain performance.",
    features: ["Process Optimization", "Cost Analysis", "Route Planning", "Technology Integration", "Training"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
  },
];

const capabilities = [
  { label: "Countries Served", value: "28+", icon: MapPin },
  { label: "Annual Shipments", value: "50k+", icon: Package },
  { label: "Warehouse Capacity", value: "500k+ sqft", icon: Warehouse },
  { label: "On-Time Delivery", value: "98.5%", icon: Clock },
];

export default function ServicesPage({
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
            src="/images/hpage.jpg"
            alt="Logistics Services"
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
              Our Services
            </motion.span>
            <h1 className="mt-6 font-display text-4xl uppercase tracking-[0.3em] text-[var(--foreground)] md:text-5xl">
              Logistics Excellence
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--foreground)]/70">
              Comprehensive wholesale logistics solutions designed to streamline your supply chain, 
              reduce costs, and accelerate your business growth across global markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Stats */}
      <section className="border-b border-[var(--card-border)] bg-[var(--card-bg)]/50 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={capability.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <Icon className="mx-auto h-8 w-8 text-gold-600 mb-2" />
                <p className="font-display text-3xl text-gold-600">{capability.value}</p>
                <p className="mt-1 text-sm text-[var(--foreground)]/70">{capability.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] dark:bg-[var(--hover-bg)] shadow-[0_55px_150px_-85px_rgba(28,26,23,0.35)] transition-all duration-500 hover:shadow-[0_55px_150px_-85px_rgba(199,138,26,0.4)]"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent" />
                  </div>
                  <div className="p-8">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-100/50 dark:bg-gold-900/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-8 w-8 text-gold-600" />
                    </div>
                  <h3 className="mb-3 font-display text-2xl uppercase tracking-[0.2em] text-[var(--foreground)]">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-[var(--foreground)]/70">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                        {feature}
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
              Ready to Optimize Your Supply Chain?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--foreground)]/70">
              Let our logistics experts design a custom solution for your business needs.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="rounded-full bg-gold-gradient px-10 py-3 text-sm uppercase tracking-[0.35em] text-white shadow-[0_25px_60px_-25px_rgba(199,138,26,0.6)] transition-transform duration-300 hover:scale-105"
              >
                Request a Quote
              </Link>
              <Link
                href={`/${locale}/about`}
                className="rounded-full border border-[rgba(28,26,23,0.15)] px-10 py-3 text-sm uppercase tracking-[0.35em] text-[var(--foreground)] transition hover:border-gold-400 hover:text-gold-600"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

