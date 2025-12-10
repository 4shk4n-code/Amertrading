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
    description: "Our world-class freight forwarding network spans every continent, connecting your business to markets you've never reached before. With strategic partnerships across air, sea, and land corridors, we guarantee your cargo arrives on time, every time—no matter how complex the journey.",
    features: ["Air Freight", "Sea Freight", "Road Transport", "Express Delivery", "Custom Clearance"],
    image: "/images/hpage1.jpg",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Distribution",
    description: "Our strategically positioned warehousing network spans 14 distribution hubs across the Middle East, Asia, and beyond. With over 500,000 square feet of state-of-the-art storage facilities equipped with cutting-edge inventory management systems, we ensure your products are always where they need to be, when they need to be there.",
    features: ["Storage Solutions", "Inventory Management", "Cross-Docking", "Pick & Pack", "Distribution Networks"],
    image: "/images/hpage2.jpg",
  },
  {
    icon: Globe,
    title: "International Trade",
    description: "Unlock new markets with our comprehensive international trading expertise. We've facilitated billions in cross-border commerce, connecting businesses across GCC, Levant, Eurasia, and beyond. Our deep understanding of local regulations, customs procedures, and market dynamics ensures your international expansion is seamless and profitable.",
    features: ["Import/Export", "Trade Finance", "Documentation", "Compliance", "Market Access"],
    image: "/images/hpage3.jpg",
  },
  {
    icon: Package,
    title: "Supply Chain Management",
    description: "Transform your supply chain from a cost center into a competitive advantage. Our integrated solutions optimize every link—from strategic sourcing to final delivery—reducing costs by up to 30% while improving speed and reliability. We don't just manage your supply chain; we revolutionize it.",
    features: ["Procurement", "Vendor Management", "Quality Control", "Order Fulfillment", "Returns Management"],
    image: "/images/hpage4.jpg",
  },
  {
    icon: Shield,
    title: "Compliance & Certification",
    description: "Navigate complex regulatory landscapes with confidence. Our ISO-certified operations and compliance experts ensure every shipment meets the highest international standards. With a 100% compliance record across 28 markets, we eliminate regulatory risks so you can focus on growing your business.",
    features: ["ISO Certification", "Customs Compliance", "Documentation", "Audits", "Regulatory Support"],
    image: "/images/amerback.jpg",
  },
  {
    icon: BarChart3,
    title: "Logistics Consulting",
    description: "Leverage three decades of logistics expertise to transform your operations. Our strategic consulting services have helped hundreds of companies reduce costs by 25-40%, improve delivery times by 35%, and achieve operational excellence. We don't just consult—we deliver measurable results that impact your bottom line.",
    features: ["Process Optimization", "Cost Analysis", "Route Planning", "Technology Integration", "Training"],
    image: "/images/hpage.jpg",
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
              World-Class Logistics Solutions
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--foreground)]/70">
              For over three decades, AMER DUBAI TRADING L.L.C has been the trusted logistics partner for Fortune 500 companies, 
              government entities, and industry leaders worldwide. Our comprehensive suite of services transforms supply chains, 
              eliminates inefficiencies, and accelerates your business growth across 28 global markets. We don&apos;t just move products—we move possibilities.
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

      {/* Additional Services Section */}
      <section className="border-t border-[var(--card-border)] bg-[var(--card-bg)]/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl uppercase tracking-[0.3em] text-[var(--foreground)] md:text-4xl mb-6">
              Additional Services
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-[var(--foreground)]/70">
              Beyond our core services, we offer specialized solutions to address every aspect of your logistics and supply chain needs.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Customs Brokerage",
                description: "Expert customs clearance services ensuring smooth cross-border transactions and regulatory compliance.",
                image: "/images/hpage1.jpg"
              },
              {
                title: "Insurance Services",
                description: "Comprehensive cargo insurance solutions protecting your shipments from origin to destination.",
                image: "/images/hpage2.jpg"
              },
              {
                title: "Documentation",
                description: "Complete documentation services including certificates of origin, commercial invoices, and export licenses.",
                image: "/images/product6.jpeg"
              },
              {
                title: "Value-Added Services",
                description: "Labeling, repackaging, quality inspection, and other value-added services to meet your specific requirements.",
                image: "/images/product8.jpeg"
              },
              {
                title: "Project Cargo",
                description: "Specialized handling for oversized, heavy, or complex project cargo requiring custom solutions.",
                image: "/images/product9.jpeg"
              },
              {
                title: "Express Delivery",
                description: "Time-sensitive delivery services with guaranteed transit times for urgent shipments.",
                image: "/images/product10.jpeg"
              },
              {
                title: "Reverse Logistics",
                description: "Efficient returns management and reverse logistics solutions to optimize your returns process.",
                image: "/images/product11.jpeg"
              },
              {
                title: "Consulting Services",
                description: "Strategic logistics consulting to optimize your supply chain, reduce costs, and improve efficiency.",
                image: "/images/product12.jpeg"
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-display text-lg uppercase tracking-[0.1em] text-[var(--foreground)]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground)]/70">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-[var(--card-border)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl uppercase tracking-[0.3em] text-[var(--foreground)] md:text-4xl mb-6">
              Our Process
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-[var(--foreground)]/70">
              A proven methodology that ensures seamless execution and exceptional results
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We begin with a comprehensive analysis of your logistics needs, challenges, and objectives.",
                image: "/images/product13.jpeg"
              },
              {
                step: "02",
                title: "Planning",
                description: "Our experts design a customized solution tailored to your specific requirements and industry standards.",
                image: "/images/hpage3.jpg"
              },
              {
                step: "03",
                title: "Implementation",
                description: "Seamless execution with dedicated project managers ensuring every detail is handled perfectly.",
                image: "/images/hpage4.jpg"
              },
              {
                step: "04",
                title: "Optimization",
                description: "Continuous monitoring and optimization to improve performance and reduce costs over time.",
                image: "/images/product1.jpeg"
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={process.image}
                    alt={process.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-600 text-lg font-bold text-white">
                    {process.step}
                  </div>
                </div>
                <h3 className="mb-2 font-display text-xl uppercase tracking-[0.1em] text-[var(--foreground)]">
                  {process.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--foreground)]/70">
                  {process.description}
                </p>
              </motion.div>
            ))}
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
              Transform Your Supply Chain Today
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--foreground)]/70">
              Join hundreds of industry leaders who trust AMER DUBAI TRADING L.L.C to power their logistics operations. 
              Our team of experts will design a custom solution that reduces costs, improves efficiency, and accelerates your growth. 
              Let&apos;s discuss how we can transform your supply chain into a competitive advantage.
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

