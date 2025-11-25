import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Manage Categories | Admin | AMER GENERAL TRADING L.L.C",
  description: "Manage product categories",
});

export default async function CategoriesAdminPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/signin" as any);

  }

  return (
    <main className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gold-400">Manage Categories</h1>
            <p className="mt-2 text-white/60">
              Create and organize product categories
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href={"/admin/dashboard" as any}

              className="rounded-full border border-gold-500 px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold-300 transition hover:bg-gold-500/10"
            >
              Dashboard
            </Link>
            <Link
              href={"/studio" as any}
              className="rounded-full border border-gold-500 px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold-300 transition hover:bg-gold-500/10"
            >
              Open CMS
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Categories</h2>
            <Link
              href={"/studio" as any}
              className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-gold-400"
            >
              + Add Category Schema
            </Link>
          </div>

          <div className="py-12 text-center text-white/60">
            <p className="mb-4">
              Category management will be available once you add the category schema to Sanity.
            </p>
            <p className="mb-6 text-sm">
              To add categories, go to Sanity Studio and create a new schema for categories.
            </p>
            <Link
              href={"/studio" as any}
              className="inline-block rounded-lg bg-gold-500 px-6 py-3 text-sm font-medium text-black transition hover:bg-gold-400"
            >
              Open Sanity Studio →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

