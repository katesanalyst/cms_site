import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteItem } from "@/lib/actions";

export default async function FAQsPage() {
  const items = await prisma.faq.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">FAQs</h1>
        <Link href="/admin/faqs/new" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">
          Add FAQ
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Question</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Featured</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Order</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium max-w-xs truncate">{item.question}</td>
                <td className="px-4 py-3">{item.category ?? "-"}</td>
                <td className="px-4 py-3">{item.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{item.displayOrder}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/faqs/${item.id}`} className="text-blue-600 hover:text-blue-800 mr-3">Edit</Link>
                  <form action={async () => { "use server"; await deleteItem("faq", item.id); }} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No FAQs found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
