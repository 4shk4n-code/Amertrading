import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Package, FolderOpen, Layout, Grid, Plus } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Dashboard | AMER GENERAL TRADING L.L.C",
  description: "Admin dashboard",
});

export default async function AdminDashboard() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/signin");
  }

  const adminLinks: Array<{
    href: string;
    title: string;
    description: string;
    icon: typeof Package;
    color: string;
    bgColor: string;
  }> = [
    {
      href: "/admin/products",
      title: "Products",
      description: "Manage your product catalog",
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      href: "/admin/categories",
      title: "Categories",
      description: "Organize product categories",
      icon: FolderOpen,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      href: "/admin/content",
      title: "Content",
      description: "Manage website content",
      icon: Layout,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      href: "/admin/divisions",
      title: "Divisions",
      description: "Manage company divisions",
      icon: Grid,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--foreground)]">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-[var(--foreground)]/70">
            Welcome back, {session?.user?.name || session?.user?.email || "Admin"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href as any}
                className="group rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition hover:border-[var(--accent)] hover:bg-[var(--hover-bg)]"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className={`rounded-lg ${link.bgColor} p-3 ${link.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--foreground)]">
                    {link.title}
                  </h2>
                </div>
                <p className="text-sm text-[var(--foreground)]/70">
                  {link.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-2 font-semibold text-white transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add New Product
            </Link>
            <Link
              href="/products"
              className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-6 py-2 font-semibold text-[var(--foreground)] transition hover:bg-[var(--hover-bg)]"
            >
              View Public Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
