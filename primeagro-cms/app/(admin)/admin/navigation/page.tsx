import { prisma } from "@/lib/prisma";
import { deleteItem } from "@/lib/actions";
import NavigationForm from "./form";

export default async function NavigationPage() {
  const items = await prisma.navigation.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Navigation</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add Navigation Item</h2>
          <NavigationForm />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Current Items</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{item.label}</span>
                  <span className="text-gray-400 ml-2">{item.url}</span>
                </div>
                <form action={async () => { "use server"; await deleteItem("navigation", item.id); }}>
                  <button type="submit" className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </form>
              </div>
            ))}
            {items.length === 0 && <p className="text-gray-400 text-sm">No navigation items yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
