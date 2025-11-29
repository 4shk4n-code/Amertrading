"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    nameFa: "",
    description: "",
    descriptionAr: "",
    descriptionFa: "",
    price: "",
    compareAtPrice: "",
    sku: "",
    stock: "0",
    category: "",
    images: "",
    featured: false,
    active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const imagesArray = formData.images
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          compareAtPrice: formData.compareAtPrice
            ? parseFloat(formData.compareAtPrice)
            : null,
          stock: parseInt(formData.stock),
          images: imagesArray,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create product");
      }

      router.push("/admin/products" as any);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-8 py-12 text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[var(--accent)]">New Product</h1>
            <p className="mt-2 text-[var(--text-muted)]">
              Add a new product to your catalog
            </p>
          </div>
          <Link
            href={"/admin/products" as any}
            className="rounded-lg border border-[var(--card-border)] px-5 py-2 text-sm font-medium transition hover:bg-[var(--hover-bg)]"
          >
            ← Back to Products
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8"
        >
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-500">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">SKU</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name (Farsi)
                </label>
                <input
                  type="text"
                  value={formData.nameFa}
                  onChange={(e) =>
                    setFormData({ ...formData, nameFa: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description (English) *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Price (AED) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Compare At Price (AED)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.compareAtPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, compareAtPrice: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="e.g., Electronics, Food, Clothing"
                className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Image URLs (comma-separated)
              </label>
              <input
                type="text"
                value={formData.images}
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.value })
                }
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-2 focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="rounded border-[var(--card-border)]"
                />
                <span className="text-sm">Featured Product</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="rounded border-[var(--card-border)]"
                />
                <span className="text-sm">Active</span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[var(--accent)] px-6 py-2 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
              <Link
                href={"/admin/products" as any}
                className="rounded-lg border border-[var(--card-border)] px-6 py-2 font-medium transition hover:bg-[var(--hover-bg)]"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

