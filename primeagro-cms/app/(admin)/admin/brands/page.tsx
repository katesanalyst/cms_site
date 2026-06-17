import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brands</h1>
        <Link href="/admin/brands/new" className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800">
          + New Brand
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Industry</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Color</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{b.name}</td>
                <td className="px-4 py-3 text-gray-500">{b.slug}</td>
                <td className="px-4 py-3">{b.industry || "-"}</td>
                <td className="px-4 py-3">
                  <span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: b.primaryColor }} />
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${b.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {b.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/brands/${b.id}`} className="text-blue-600 hover:text-blue-800 mr-3">Edit</Link>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No brands yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
