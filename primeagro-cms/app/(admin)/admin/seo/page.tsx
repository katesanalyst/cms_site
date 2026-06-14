import { prisma } from "@/lib/prisma";

export default async function SEOPage() {
  const metas = await prisma.seoMeta.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SEO Meta Tags</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Page</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Description</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">AI</th>
            </tr>
          </thead>
          <tbody>
            {metas.map((meta) => (
              <tr key={meta.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{meta.pageType}</td>
                <td className="px-4 py-3">{meta.title || "-"}</td>
                <td className="px-4 py-3 text-gray-500 truncate max-w-xs">{meta.description || "-"}</td>
                <td className="px-4 py-3">
                  {meta.aiGenerated && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">AI</span>}
                </td>
              </tr>
            ))}
            {metas.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No SEO meta tags yet. Generate them from page editors.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
