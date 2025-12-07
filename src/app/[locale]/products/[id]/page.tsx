import { getProductById } from "@/lib/db-products";
import { getStaticProductById } from "@/lib/static-products";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  let product = await getProductById(id);
  
  // Try static products if database product not found
  if (!product) {
    product = getStaticProductById(id);
  }

  if (!product || !product.active) {
    return buildMetadata({ title: "Product Not Found" });
  }

  return buildMetadata({
    title: `${product.name} | Products | AMER DUBAI TRADING L.L.C`,
    description: product.description,
  });
}

async function fetchProduct(id: string) {
  try {
    let product = await getProductById(id);
    
    // Try static products if database product not found
    if (!product) {
      product = getStaticProductById(id);
    }
    
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    // Fallback to static products
    return getStaticProductById(id);
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product || !product.active) {
    notFound();
  }

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] pt-20">
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Link 
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-sm text-[var(--foreground)]/70 hover:text-gold-600 transition-colors mb-8"
          >
            ← Back to Products
          </Link>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.images && product.images.length > 0 ? (
                <div className="space-y-4">
                  <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {product.images.slice(1, 5).map((image: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * (idx + 1) }}
                          className="relative aspect-square overflow-hidden rounded-lg border border-[var(--card-border)] cursor-pointer hover:border-gold-500 transition-colors"
                        >
                          <Image
                            src={image}
                            alt={`${product.name} ${idx + 2}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-muted)]">
                  No Image Available
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.featured && (
                <span className="mb-4 inline-block rounded-full bg-gold-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                  ⭐ Featured Product
                </span>
              )}
              <h1 className="mb-4 font-display text-4xl uppercase tracking-[0.2em] text-gold-600 md:text-5xl">
                {product.name}
              </h1>
              {product.sku && (
                <p className="mb-6 text-sm text-[var(--foreground)]/60 uppercase tracking-wider">
                  SKU: <span className="font-mono">{product.sku}</span>
                </p>
              )}

              <div className="mb-8 flex items-center gap-4">
                <span className="text-4xl font-bold text-gold-600">
                  AED {product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-[var(--foreground)]/50 line-through">
                      AED {product.compareAtPrice.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-red-100 dark:bg-red-900/30 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
                      {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="mb-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]/70">Availability</p>
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-green-600">
                      ✓ In Stock
                    </span>
                    <span className="text-sm text-[var(--foreground)]/60">
                      ({product.stock} units available)
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-semibold text-red-500">✗ Out of Stock</span>
                )}
              </div>

              <div className="mb-8">
                <p className="mb-4 text-lg font-semibold uppercase tracking-wider text-[var(--foreground)]">Description</p>
                <p className="text-[var(--foreground)]/80 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {product.category && (
                <div className="mb-8">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]/70">Category</p>
                  <span className="inline-block rounded-full bg-gold-100 dark:bg-gold-900/30 px-4 py-2 text-sm font-medium text-gold-700 dark:text-gold-400">
                    {product.category}
                  </span>
                </div>
              )}

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="flex-1 rounded-full bg-gold-gradient px-8 py-4 text-center text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  Request Quote
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="flex-1 rounded-full border-2 border-gold-600 px-8 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gold-600 transition-colors hover:bg-gold-50 dark:hover:bg-gold-900/20"
                >
                  Contact Sales
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

