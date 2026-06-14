import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { deleteItem } from "@/lib/actions";

export default async function BlogPage() {
  const items = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link href="/admin/blog/new" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">
          Add Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Published</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3">{item.category || "-"}</td>
                <td className="px-4 py-3">{item.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-gray-500">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/blog/${item.id}`} className="text-blue-600 hover:text-blue-800 mr-3">Edit</Link>
                  <form action={async () => { "use server"; await deleteItem("blog", item.id); }} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No blog posts found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
