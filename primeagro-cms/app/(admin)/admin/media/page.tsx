import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import MediaUpload from "./upload";
import { deleteItem } from "@/lib/actions";

export default async function MediaPage() {
  const items = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <MediaUpload />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            {item.mimeType.startsWith("image/") ? (
              <img src={item.url} alt={item.filename} className="w-full h-32 object-cover" />
            ) : (
              <div className="w-full h-32 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                {item.mimeType}
              </div>
            )}
            <div className="p-2">
              <p className="text-xs truncate">{item.filename}</p>
              <p className="text-xs text-gray-400">{formatDate(item.createdAt)}</p>
              <form action={async () => { "use server"; await deleteItem("media", item.id); }} className="mt-1">
                <button type="submit" className="text-xs text-red-600 hover:text-red-800">Delete</button>
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            No media uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}
