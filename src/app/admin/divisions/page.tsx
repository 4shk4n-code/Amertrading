import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  sanityClient,
  hasSanityCredentials,
} from "../../../../sanity/lib/sanity.client";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Manage Divisions | Admin | AMER GENERAL TRADING L.L.C",
  description: "Manage divisions and categories",
});

async function getDivisions() {
  if (!hasSanityCredentials || !sanityClient) {
    return [];
  }
  return sanityClient.fetch<any[]>(
    `*[_type == "division"] | order(order asc){
      _id,
      name,
      slug,
      description,
      order,
      locale,
      "image": image{
        asset->{_ref, url}
      }
    }`,
  );
}

export default async function DivisionsAdminPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/admin/signin");
  }

  const divisions = await getDivisions();

  return (
    <main className="min-h-screen bg-black px-8 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gold-400">Manage Divisions</h1>
            <p className="mt-2 text-white/60">
              Create, edit, and organize divisions
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/dashboard"
              className="rounded-full border border-gold-500 px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold-300 transition hover:bg-gold-500/10"
            >
              Dashboard
            </Link>
            <Link
              href="/studio"
              className="rounded-full border border-gold-500 px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold-300 transition hover:bg-gold-500/10"
            >
              Open CMS
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">All Divisions</h2>
            <Link
              href="/studio/desk/division;division"
              className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-gold-400"
            >
              + Add New Division
            </Link>
          </div>

          {divisions.length === 0 ? (
            <div className="py-12 text-center text-white/60">
              <p className="mb-4">No divisions found.</p>
              <Link
                href="/studio/desk/division;division"
                className="text-gold-400 hover:text-gold-300"
              >
                Create your first division →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {divisions.map((division) => (
                <Link
                  key={division._id}
                  href={`/studio/desk/division;${division._id}`}
                  className="group rounded-xl border border-zinc-700 bg-zinc-800/50 p-6 transition hover:border-gold-500/50 hover:bg-zinc-800"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gold-300">
                      {division.name}
                    </h3>
                    <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs text-white/60">
                      {division.locale}
                    </span>
                  </div>
                  {division.description && (
                    <p className="mb-4 text-sm text-white/60 line-clamp-2">
                      {division.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span>Slug: /{division.slug?.current}</span>
                    {division.order && (
                      <span>Order: {division.order}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

