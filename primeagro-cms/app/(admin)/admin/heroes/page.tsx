import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HeroesListPage() {
  const pages = await prisma.page.findMany({
    include: { hero: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Heroes (per page)</h1>
      <p className="text-gray-500 text-sm mb-6">Each page has one hero banner. Click to edit its heading, background, buttons, etc.</p>
      <div className="space-y-3">
        {pages.map((page) => (
          <div key={page.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div>
              <span className="font-medium">{page.title}</span>
              <span className="text-gray-400 text-sm ml-2">/{page.slug}</span>
              {page.hero && (
                <div className="text-sm text-gray-500 mt-1">
                  Hero: <span className="text-gray-700">{page.hero.heading}</span>
                </div>
              )}
              {!page.hero && (
                <div className="text-sm text-red-400 mt-1">No hero yet</div>
              )}
            </div>
            <Link href={`/admin/heroes/${page.id}`} className="bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200 text-sm">
              Edit Hero
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
