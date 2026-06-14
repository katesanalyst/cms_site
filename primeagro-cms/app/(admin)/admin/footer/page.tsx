import { prisma } from "@/lib/prisma";
import { deleteItem } from "@/lib/actions";
import FooterForm from "./form";

export default async function FooterPage() {
  const sections = await prisma.footerSection.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Footer Sections</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add Footer Section</h2>
          <FooterForm />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Current Sections</h2>
          <div className="space-y-2">
            {sections.map((section) => (
              <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{section.type}</span>
                  {section.title && <span className="text-gray-400 ml-2">{section.title}</span>}
                </div>
                <form action={async () => { "use server"; await deleteItem("footerSection", section.id); }}>
                  <button type="submit" className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </form>
              </div>
            ))}
            {sections.length === 0 && <p className="text-gray-400 text-sm">No footer sections yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
