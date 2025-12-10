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
    description: "Powering the world's most advanced manufacturing operations with precision logistics that never miss a beat. From just-in-time raw material delivery to global distribution of finished products, we ensure your production lines never stop. Our manufacturing clients achieve 99.8% on-time delivery rates and reduce inventory costs by up to 35%.",
    services: ["Material Sourcing", "Production Supply Chain", "Finished Goods Distribution", "Quality Assurance"],
    color: "from-blue-500 to-cyan-500",
    image: "/images/product1.jpeg",
  },
  {
    icon: ShoppingBag,
    title: "Retail & E-commerce",
    description: "In the age of instant gratification, we deliver. Our e-commerce fulfillment solutions process millions of orders annually with 98.5% accuracy. From same-day delivery in major cities to seamless returns processing, we turn logistics into a competitive advantage that drives customer loyalty and repeat purchases.",
    services: ["Order Fulfillment", "Inventory Management", "Last-Mile Delivery", "Returns Processing"],
    color: "from-purple-500 to-pink-500",
    image: "/images/product2.jpeg",
  },
  {
    icon: Car,
    title: "Automotive",
    description: "The backbone of the automotive industry for over 30 years. We've built strategic partnerships with leading OEMs and aftermarket suppliers, ensuring critical parts reach service centers and assembly lines exactly when needed. Our automotive logistics network spans 28 countries, serving everything from luxury vehicles to commercial fleets.",
    services: ["Parts Distribution", "OEM Supply Chain", "Aftermarket Logistics", "Vehicle Shipping"],
    color: "from-red-500 to-orange-500",
    image: "/images/product3.jpeg",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Beverage",
    description: "When freshness is non-negotiable, trust matters. Our temperature-controlled cold chain logistics maintain perfect conditions from farm to fork, ensuring food safety and regulatory compliance at every step. We've never had a food safety incident—a record that speaks to our uncompromising standards and meticulous attention to detail.",
    services: ["Cold Chain Logistics", "Food Distribution", "Beverage Supply Chain", "Compliance Management"],
    color: "from-green-500 to-emerald-500",
    image: "/images/product4.jpeg",
  },
  {
    icon: Shirt,
    title: "Fashion & Apparel",
    description: "In fashion, timing is everything. Our agile logistics solutions handle everything from high-end seasonal collections to fast-fashion rapid replenishment. We've helped leading fashion brands reduce time-to-market by 40% while maintaining the quality and care your brand demands.",
    services: ["Fashion Distribution", "Seasonal Logistics", "Warehousing Solutions", "Express Delivery"],
    color: "from-pink-500 to-rose-500",
    image: "/images/product5.jpeg",
  },
  {
    icon: Computer,
    title: "Technology & Electronics",
    description: "When precision and security are paramount, trust matters. Our specialized handling of sensitive electronics and IT hardware ensures zero damage rates and complete chain-of-custody documentation. From enterprise servers to consumer electronics, we protect your technology investments every step of the way.",
    services: ["Electronics Shipping", "IT Hardware Distribution", "Secure Warehousing", "Value-Added Services"],
    color: "from-indigo-500 to-purple-500",
    image: "/images/product6.jpeg",
  },
  {
    icon: Building2,
    title: "Construction",
    description: "Powering the world's most ambitious construction projects with heavy-duty logistics that never compromise. From mega-infrastructure developments to commercial builds, we deliver construction materials, heavy equipment, and machinery exactly when your project timeline demands—because delays cost millions.",
    services: ["Material Transport", "Heavy Equipment Shipping", "Project Logistics", "Site Delivery"],
    color: "from-gray-600 to-gray-800",
    image: "/images/product7.jpeg",
  },
  {
    icon: Heart,
    title: "Healthcare & Pharmaceuticals",
    description: "When lives depend on it, excellence isn't optional—it's mandatory. Our pharmaceutical and medical device logistics maintain the strictest regulatory compliance, with full traceability and temperature-controlled environments. We've never had a compliance violation, because in healthcare, perfection is the only acceptable standard.",
    services: ["Pharma Distribution", "Medical Devices", "Regulatory Compliance", "Temperature Control"],
    color: "from-red-400 to-pink-500",
    image: "/images/product8.jpeg",
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
              Industries We Transform
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--foreground)]/70">
              For three decades, AMER DUBAI TRADING L.L.C has been the trusted logistics partner across 15+ industry verticals. 
              From Fortune 500 manufacturers to emerging tech startups, we understand that each industry has unique challenges. 
              That&apos;s why we&apos;ve developed specialized solutions that don&apos;t just meet industry standards—they redefine them.
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

      {/* Industry Solutions Section */}
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
              Industry-Specific Solutions
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-[var(--foreground)]/70">
              Every industry has unique challenges. Our specialized solutions are designed to address the specific needs of your sector, 
              ensuring optimal performance and maximum efficiency.
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Customized Logistics Networks",
                description: "We design logistics networks tailored to your industry's specific requirements, from temperature-controlled facilities for pharmaceuticals to secure warehouses for electronics.",
                image: "/images/product9.jpeg",
                stats: "98.5% Accuracy"
              },
              {
                title: "Regulatory Compliance",
                description: "Navigate complex regulatory environments with confidence. Our compliance experts ensure your operations meet all local and international standards across 28 markets.",
                image: "/images/product10.jpeg",
                stats: "100% Compliance Rate"
              },
              {
                title: "Technology Integration",
                description: "Leverage cutting-edge logistics technology including real-time tracking, automated inventory management, and predictive analytics to optimize your supply chain.",
                image: "/images/product11.jpeg",
                stats: "24/7 Visibility"
              },
              {
                title: "Scalable Infrastructure",
                description: "Our infrastructure scales with your business. Whether you're a startup or a Fortune 500 company, we have the capacity and flexibility to support your growth.",
                image: "/images/product12.jpeg",
                stats: "Unlimited Scale"
              },
              {
                title: "Risk Management",
                description: "Comprehensive risk management strategies protect your supply chain from disruptions. We maintain contingency plans and alternative routes to ensure business continuity.",
                image: "/images/product13.jpeg",
                stats: "99.9% Uptime"
              },
              {
                title: "Cost Optimization",
                description: "Our data-driven approach identifies cost-saving opportunities throughout your supply chain, reducing expenses by an average of 25-35% while improving service levels.",
                image: "/images/product1.jpeg",
                stats: "35% Cost Reduction"
              },
            ].map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold-600">
                    {solution.stats}
                  </div>
                  <h3 className="mb-3 font-display text-xl uppercase tracking-[0.1em] text-[var(--foreground)]">
                    {solution.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground)]/70">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
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
              Industry Success Stories
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-[var(--foreground)]/70">
              See how we&apos;ve transformed logistics operations across different industries, delivering measurable results that drive business growth.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                industry: "Automotive",
                client: "Leading OEM Manufacturer",
                result: "Reduced delivery times by 40% and cut logistics costs by 28% across 15 countries.",
                image: "/images/product2.jpeg"
              },
              {
                industry: "Food & Beverage",
                client: "Regional Food Distributor",
                result: "Achieved 100% cold chain compliance and expanded distribution network to 8 new markets.",
                image: "/images/product3.jpeg"
              },
              {
                industry: "E-commerce",
                client: "Online Retail Platform",
                result: "Scaled fulfillment operations to handle 500% growth while maintaining 99.2% order accuracy.",
                image: "/images/product4.jpeg"
              },
            ].map((story, index) => (
              <motion.div
                key={story.industry}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 shadow-lg"
              >
                <div className="relative mb-6 h-40 w-full overflow-hidden rounded-xl">
                  <Image
                    src={story.image}
                    alt={story.industry}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gold-600 mb-2">
                  {story.industry}
                </div>
                <h3 className="mb-3 font-display text-lg uppercase tracking-[0.1em] text-[var(--foreground)]">
                  {story.client}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--foreground)]/70">
                  {story.result}
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
              Your Industry, Our Expertise
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--foreground)]/70">
              Whether your industry is listed here or not, we have the expertise to transform your logistics operations. 
              Our team of industry specialists will analyze your unique challenges and design a custom solution that drives results. 
              Let&apos;s discuss how we can elevate your supply chain to world-class standards.
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

