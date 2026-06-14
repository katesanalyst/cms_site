"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import RichTextEditor from "@/components/editor/RichTextEditor";

const seasonOptions = [
  { label: "Select season", value: "" },
  { label: "Summer", value: "Summer" },
  { label: "Winter", value: "Winter" },
  { label: "Year-round", value: "Year-round" },
];

const unitOptions = [
  { label: "Select unit", value: "" },
  { label: "Kg", value: "kg" },
  { label: "Dozen", value: "dozen" },
  { label: "Piece", value: "piece" },
  { label: "Gram", value: "gram" },
];

export default function ProductForm({ item }: { item?: any }) {
  const router = useRouter();
  const isEdit = !!item;
  const [shortDesc, setShortDesc] = useState(item?.shortDesc || "");
  const [fullDesc, setFullDesc] = useState(item?.fullDesc || "");
  const [nutritionalInfo, setNutritionalInfo] = useState(item?.nutritionalInfo || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    data.shortDesc = shortDesc;
    data.fullDesc = fullDesc;
    data.nutritionalInfo = nutritionalInfo;

    const res = await fetch(`/api/products${isEdit ? `/${item.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, price: data.price ? Number(data.price) : null, inStock: data.inStock === "true" }),
    });

    if (res.ok) router.push("/admin/products");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add"} Product</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Title" name="title" defaultValue={item?.title} required />
          <FormField label="Slug" name="slug" defaultValue={item?.slug} placeholder="Leave blank to auto-generate" />
          <FormField label="Price" name="price" type="number" defaultValue={item?.price} />
          <FormField label="Unit" name="unit" type="select" options={unitOptions} defaultValue={item?.unit} />
          <FormField label="Min Order" name="minOrder" type="number" defaultValue={item?.minOrder} />
          <FormField label="Season" name="seasonAvailable" type="select" options={seasonOptions} defaultValue={item?.seasonAvailable} />
          <FormField label="In Stock" name="inStock" type="checkbox" defaultValue={item?.inStock ?? true} />
          <FormField label="Featured Image URL" name="featuredImage" defaultValue={item?.featuredImage} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <RichTextEditor content={shortDesc} onChange={setShortDesc} placeholder="Brief product description..." />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
          <RichTextEditor content={fullDesc} onChange={setFullDesc} placeholder="Detailed product description..." />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nutritional Info</label>
          <RichTextEditor content={nutritionalInfo} onChange={setNutritionalInfo} placeholder="Nutritional information..." />
        </div>
        <FormField label="Storage Instructions" name="storageInfo" defaultValue={item?.storageInfo} />
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm">
            {isEdit ? "Update" : "Create"} Product
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
