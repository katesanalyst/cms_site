import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteItem } from "@/lib/actions";

export default async function PagesPage() {
  const pages = await prisma.page.findMany({ include: { sections: true }, orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pages</h1>
        <Link href="/admin/pages/new" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">
          + New Page
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Sections</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{page.title}</td>
                <td className="px-4 py-3 text-gray-500">/{page.slug}</td>
                <td className="px-4 py-3">{page.sections.length}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${page.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {page.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/pages/${page.id}`} className="text-blue-600 hover:text-blue-800 mr-3">Edit</Link>
                  <Link href={`/admin/heroes/${page.id}`} className="text-purple-600 hover:text-purple-800 mr-3">Hero</Link>
                  <form action={async () => { "use server"; await deleteItem("page", page.id); }} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No pages yet. Create your first page.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
