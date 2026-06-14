"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import RichTextEditor from "@/components/editor/RichTextEditor";

const ratingOptions = [
  { label: "Select rating", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

export default function TestimonialForm({ item }: { item?: any }) {
  const router = useRouter();
  const isEdit = !!item;
  const [text, setText] = useState(item?.text || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    data.text = text;

    const res = await fetch(`/api/testimonials${isEdit ? `/${item.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, rating: Number(data.rating), featured: data.featured === "true" }),
    });

    if (res.ok) router.push("/admin/testimonials");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add"} Testimonial</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Client Name" name="clientName" defaultValue={item?.clientName} required />
          <FormField label="Company" name="company" defaultValue={item?.company} />
          <FormField label="Location" name="location" defaultValue={item?.location} />
          <FormField label="Photo URL" name="photo" defaultValue={item?.photo} />
          <FormField label="Designation" name="designation" defaultValue={item?.designation} />
          <FormField label="Rating" name="rating" type="select" options={ratingOptions} defaultValue={item?.rating} />
          <FormField label="Date" name="date" defaultValue={item?.date} placeholder="e.g. March 2026" />
          <FormField label="Featured" name="featured" type="checkbox" defaultValue={item?.featured ?? false} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Text</label>
          <RichTextEditor content={text} onChange={setText} placeholder="Write the testimonial here..." />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm">
            {isEdit ? "Update" : "Create"} Testimonial
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
