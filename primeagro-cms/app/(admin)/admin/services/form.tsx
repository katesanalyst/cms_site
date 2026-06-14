"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import RichTextEditor from "@/components/editor/RichTextEditor";

const pricingOptions = [
  { label: "Select pricing model", value: "" },
  { label: "Free", value: "Free" },
  { label: "Fixed", value: "Fixed" },
  { label: "Custom", value: "Custom" },
];

export default function ServiceForm({ item }: { item?: any }) {
  const router = useRouter();
  const isEdit = !!item;
  const [shortDesc, setShortDesc] = useState(item?.shortDesc || "");
  const [fullDesc, setFullDesc] = useState(item?.fullDesc || "");
  const [features, setFeatures] = useState(item?.features || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    data.shortDesc = shortDesc;
    data.fullDesc = fullDesc;
    data.features = features;

    const res = await fetch(`/api/services${isEdit ? `/${item.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        price: data.price ? Number(data.price) : null,
        displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
      }),
    });

    if (res.ok) router.push("/admin/services");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add"} Service</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Name" name="name" defaultValue={item?.name} required />
          <FormField label="Slug" name="slug" defaultValue={item?.slug} placeholder="Leave blank to auto-generate" />
          <FormField label="Pricing Model" name="pricingModel" type="select" options={pricingOptions} defaultValue={item?.pricingModel} />
          <FormField label="Price" name="price" type="number" defaultValue={item?.price} />
          <FormField label="Duration" name="duration" defaultValue={item?.duration} />
          <FormField label="Icon URL" name="icon" defaultValue={item?.icon} />
          <FormField label="Image URL" name="image" defaultValue={item?.image} />
          <FormField label="Display Order" name="displayOrder" type="number" defaultValue={item?.displayOrder} />
          <FormField label="Featured" name="featured" type="checkbox" defaultValue={item?.featured ?? false} />
          <FormField label="Show on Home" name="showOnHome" type="checkbox" defaultValue={item?.showOnHome ?? false} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <RichTextEditor content={shortDesc} onChange={setShortDesc} placeholder="Brief description..." />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
          <RichTextEditor content={fullDesc} onChange={setFullDesc} placeholder="Detailed description of the service..." />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
          <RichTextEditor content={features} onChange={setFeatures} placeholder="List of features..." />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm">
            {isEdit ? "Update" : "Create"} Service
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
