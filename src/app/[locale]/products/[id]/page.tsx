import { getProductById } from "@/lib/firebase-products";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/products/add-to-cart-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product || !product.active) {
    return buildMetadata({ title: "Product Not Found" });
  }

  return buildMetadata({
    title: `${product.name} | Products | AMER GENERAL TRADING L.L.C`,
    description: product.description,
  });
}

async function fetchProduct(id: string) {
  try {
    return await getProductById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
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
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_rgba(199,138,26,0.2),_transparent_65%)]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Images */}
            <div>
              {product.images && product.images.length > 0 ? (
                <div className="space-y-4">
                  <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      unoptimized={product.images[0].includes('unsplash.com')}
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {product.images.slice(1, 5).map((image, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square overflow-hidden rounded-lg border border-[var(--card-border)]"
                        >
                          <Image
                            src={image}
                            alt={`${product.name} ${idx + 2}`}
                            fill
                            className="object-cover"
                            unoptimized={image.includes('unsplash.com')}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-muted)]">
                  No Image Available
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.featured && (
                <span className="mb-4 inline-block rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                  Featured Product
                </span>
              )}
              <h1 className="mb-4 font-display text-4xl uppercase tracking-[0.2em] text-gold-600">
                {product.name}
              </h1>
              {product.sku && (
                <p className="mb-4 text-sm text-[var(--text-muted)]">
                  SKU: {product.sku}
                </p>
              )}

              <div className="mb-6 flex items-center gap-4">
                <span className="text-3xl font-bold text-[var(--accent)]">
                  AED {product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl text-[var(--text-muted)] line-through">
                    AED {product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <p className="mb-2 text-sm font-medium">Availability</p>
                {product.stock > 0 ? (
                  <span className="text-green-500">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </div>

              <div className="mb-8">
                <p className="mb-2 text-sm font-medium">Description</p>
                <p className="text-[var(--foreground)]/80 whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {product.category && (
                <div className="mb-8">
                  <p className="mb-2 text-sm font-medium">Category</p>
                  <span className="rounded-full bg-[var(--hover-bg)] px-3 py-1 text-sm">
                    {product.category}
                  </span>
                </div>
              )}

              <AddToCartButton product={product} className="w-full py-4 text-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

