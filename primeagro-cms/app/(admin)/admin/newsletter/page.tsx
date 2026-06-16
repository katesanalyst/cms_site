import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { deleteItem } from "@/lib/actions";

export default async function NewsletterSubscribersPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
        <span className="text-sm text-gray-500">{subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Subscribed</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{sub.email}</td>
                <td className="px-4 py-3">{sub.name || "-"}</td>
                <td className="px-4 py-3 text-gray-500">{formatDate(sub.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <form action={async () => { "use server"; await deleteItem("newsletterSubscriber", sub.id); }} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No subscribers yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
