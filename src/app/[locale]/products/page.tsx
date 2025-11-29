import { getProducts } from "@/lib/firebase-products";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/products/add-to-cart-button";

export const metadata = buildMetadata({
  title: "Products | AMER GENERAL TRADING L.L.C",
  description: "Browse our product catalog",
});

async function getActiveProducts() {
  try {
    return await getProducts({ active: true });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await getActiveProducts();

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_rgba(199,138,26,0.2),_transparent_65%)]" />
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-4 font-display text-4xl uppercase tracking-[0.4em] text-gold-600">
            Products
          </h1>
          <p className="mb-12 text-[var(--foreground)]/70">
            Browse our complete product catalog
          </p>

          {products.length === 0 ? (
            <div className="py-12 text-center text-[var(--text-muted)]">
              <p>No products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden shadow-lg transition hover:shadow-xl"
                >
                  <Link href={`/${locale}/products/${product.id}` as any}>
                    <div className="relative h-64 w-full overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                          unoptimized={product.images[0].includes('unsplash.com')}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[var(--hover-bg)] text-[var(--text-muted)]">
                          No Image
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-4 right-4 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                          Featured
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/${locale}/products/${product.id}` as any}>
                      <h3 className="mb-2 text-lg font-semibold line-clamp-2 group-hover:text-[var(--accent)] transition">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="mb-4 text-sm text-[var(--text-muted)] line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-xl font-bold text-[var(--accent)]">
                        AED {product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-[var(--text-muted)] line-through">
                          AED {product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--text-muted)]">
                        {product.stock > 0 ? (
                          <span className="text-green-500">
                            In Stock ({product.stock})
                          </span>
                        ) : (
                          <span className="text-red-500">Out of Stock</span>
                        )}
                      </span>
                    </div>
                    <AddToCartButton product={product} className="mt-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

