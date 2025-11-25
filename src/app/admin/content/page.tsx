import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  sanityClient,
  hasSanityCredentials,
} from "../../../../sanity/lib/sanity.client";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Manage Content | Admin | AMER GENERAL TRADING L.L.C",
  description: "Manage website content",
});

async function getContentCounts() {
  if (!hasSanityCredentials || !sanityClient) {
    return {
      company: 0,
      divisions: 0,
      news: 0,
      pages: 0,
    };
  }

  const [company, divisions, news, pages] = await Promise.all([
    sanityClient.fetch<number>(`count(*[_type=="companyInfo"])`),
    sanityClient.fetch<number>(`count(*[_type=="division"])`),
    sanityClient.fetch<number>(`count(*[_type=="newsPost"])`),
    sanityClient.fetch<number>(`count(*[_type=="page"])`),
  ]);

  return { company, divisions, news, pages };
}

export default async function ContentAdminPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/signin" as any);

  }

  const counts = await getContentCounts();

  const contentTypes = [
    {
      name: "Company Info",
      count: counts.company,
      href: "/studio/desk/companyInfo",
      description: "Manage company information and settings",
      icon: "🏢",
    },
    {
      name: "Divisions",
      count: counts.divisions,
      href: "/studio/desk/division",
      description: "Manage divisions and business units",
      icon: "🏭",
    },
    {
      name: "News Posts",
      count: counts.news,
      href: "/studio/desk/newsPost",
      description: "Create and manage news articles",
      icon: "📰",
    },
    {
      name: "Pages",
      count: counts.pages,
      href: "/studio/desk/page",
      description: "Manage custom pages",
      icon: "📄",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gold-400">Manage Content</h1>
            <p className="mt-2 text-white/60">
              Manage all website content from one place
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contentTypes.map((type) => (
            <Link
              key={type.name}
              href={type.href as any}

              className="group rounded-2xl border border-zinc-700 bg-zinc-900/70 p-6 transition hover:border-gold-500/50 hover:bg-zinc-900"
            >
              <div className="mb-4 text-4xl">{type.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-gold-300">
                {type.name}
              </h3>
              <p className="mb-4 text-sm text-white/60">{type.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gold-400">
                  {type.count}
                </span>
                <span className="text-xs uppercase tracking-[0.3em] text-white/40 group-hover:text-gold-300">
                  Manage →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

