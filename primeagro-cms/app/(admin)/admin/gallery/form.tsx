"use client";

import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";

const mediaTypeOptions = [
  { label: "Image", value: "Image" },
  { label: "Video", value: "Video" },
];

const categoryOptions = [
  { label: "Select category", value: "" },
  { label: "Drone Views", value: "Drone Views" },
  { label: "Plantation", value: "Plantation" },
  { label: "Harvest", value: "Harvest" },
  { label: "Solar Processing", value: "Solar Processing" },
  { label: "Farm Activities", value: "Farm Activities" },
];

const seasonOptions = [
  { label: "Select season", value: "" },
  { label: "Summer", value: "Summer" },
  { label: "Winter", value: "Winter" },
  { label: "Year-round", value: "Year-round" },
];

export default function GalleryForm({ item }: { item?: any }) {
  const router = useRouter();
  const isEdit = !!item;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);

    const res = await fetch(`/api/gallery${isEdit ? `/${item.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
        featured: data.featured === "true",
        lightboxEnabled: data.lightboxEnabled === "true",
      }),
    });

    if (res.ok) router.push("/admin/gallery");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add"} Gallery Item</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Title" name="title" defaultValue={item?.title} />
          <FormField label="Media Type" name="mediaType" type="select" options={mediaTypeOptions} defaultValue={item?.mediaType ?? "Image"} />
          <FormField label="Image URL" name="image" defaultValue={item?.image} />
          <FormField label="Video URL" name="videoUrl" defaultValue={item?.videoUrl} />
          <FormField label="Video Thumbnail" name="videoThumbnail" defaultValue={item?.videoThumbnail} />
          <FormField label="Category" name="category" type="select" options={categoryOptions} defaultValue={item?.category} />
          <FormField label="Season" name="season" type="select" options={seasonOptions} defaultValue={item?.season} />
          <FormField label="Year" name="year" defaultValue={item?.year} />
          <FormField label="Display Order" name="displayOrder" type="number" defaultValue={item?.displayOrder ?? 0} />
          <FormField label="Featured" name="featured" type="checkbox" defaultValue={item?.featured ?? false} />
          <FormField label="Lightbox Enabled" name="lightboxEnabled" type="checkbox" defaultValue={item?.lightboxEnabled ?? true} />
        </div>
        <FormField label="Caption" name="caption" type="textarea" rows={2} defaultValue={item?.caption} />
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm">
            {isEdit ? "Update" : "Create"} Item
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
