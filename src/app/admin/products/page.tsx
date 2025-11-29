import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getProducts } from "@/lib/firebase-products";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = buildMetadata({
  title: "Manage Products | Admin | AMER GENERAL TRADING L.L.C",
  description: "Manage products and inventory",
});

async function getAllProducts() {
  try {
    return await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsAdminPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/signin" as any);
  }

  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-[var(--background)] px-8 py-12 text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[var(--accent)]">Manage Products</h1>
            <p className="mt-2 text-[var(--text-muted)]">
              Create, edit, and manage your product catalog
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href={"/admin/products/new" as any}
              className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              + Add New Product
            </Link>
            <Link
              href={"/admin/dashboard" as any}
              className="rounded-lg border border-[var(--card-border)] px-5 py-2 text-sm font-medium transition hover:bg-[var(--hover-bg)]"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
          {products.length === 0 ? (
            <div className="py-12 text-center text-[var(--text-muted)]">
              <p className="mb-4">No products found.</p>
              <Link
                href={"/admin/products/new" as any}
                className="text-[var(--accent)] hover:opacity-80"
              >
                Create your first product →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--card-border)]">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-[var(--card-border)] hover:bg-[var(--hover-bg)]"
                    >
                      <td className="px-4 py-3">
                        {product.images && product.images.length > 0 ? (
                          <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                              unoptimized={product.images[0].includes('unsplash.com')}
                            />
                          </div>
                        ) : (
                          <div className="h-16 w-16 rounded-lg bg-[var(--hover-bg)] flex items-center justify-center text-xs text-[var(--text-muted)]">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{product.name}</div>
                        {product.featured && (
                          <span className="text-xs text-[var(--accent)]">Featured</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--text-muted)]">
                        {product.sku || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">
                          AED {product.price.toFixed(2)}
                        </div>
                        {product.compareAtPrice && (
                          <div className="text-xs text-[var(--text-muted)] line-through">
                            AED {product.compareAtPrice.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-sm ${
                            product.stock > 10
                              ? "text-green-500"
                              : product.stock > 0
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--text-muted)]">
                        {product.category || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            product.active
                              ? "bg-green-500/20 text-green-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {product.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/products/${product.id}` as any}
                            className="rounded-lg border border-[var(--card-border)] px-3 py-1 text-xs transition hover:bg-[var(--hover-bg)]"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

