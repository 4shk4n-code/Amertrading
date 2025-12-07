"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/db-products";
import { getStaticProducts, type Product } from "@/lib/static-products";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";

export default function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const dbProducts = await getProducts({ active: true });
        // If database has products, use them; otherwise use static products
        if (dbProducts.length > 0) {
          setProducts(dbProducts);
        } else {
          setProducts(getStaticProducts());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to static products on error
        setProducts(getStaticProducts());
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--card-border)] py-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hpage.jpg"
            alt="Buy From Us"
            fill
            className="object-cover opacity-30"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[rgba(199,138,26,0.08)] to-[rgba(224,176,84,0.15)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(199,138,26,0.18),_transparent_65%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="mb-4 font-display text-4xl uppercase tracking-[0.4em] text-gold-600 md:text-5xl">
              Buy From Us
            </h1>
            <p className="mb-12 text-lg text-[var(--foreground)]/70 max-w-3xl mx-auto">
              Browse our complete product catalog featuring premium industrial equipment, warehouse solutions, and logistics technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="py-12 text-center text-[var(--text-muted)]">
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center text-[var(--text-muted)]">
              <p>No products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Link href={`/${locale}/products/${product.id}`}>
                    <div className="relative h-64 w-full overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[var(--hover-bg)] text-[var(--text-muted)]">
                          No Image
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-4 right-4 rounded-full bg-gold-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                          Featured
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/${locale}/products/${product.id}`}>
                      <h3 className="mb-2 text-lg font-semibold line-clamp-2 group-hover:text-gold-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="mb-4 text-sm text-[var(--foreground)]/70 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-xl font-bold text-gold-600">
                        AED {product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-[var(--foreground)]/50 line-through">
                          AED {product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">
                        {product.stock > 0 ? (
                          <span className="text-green-600 font-medium">
                            ✓ In Stock ({product.stock})
                          </span>
                        ) : (
                          <span className="text-red-500">Out of Stock</span>
                        )}
                      </span>
                      {product.category && (
                        <span className="text-xs text-[var(--foreground)]/50 bg-[var(--hover-bg)] px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

