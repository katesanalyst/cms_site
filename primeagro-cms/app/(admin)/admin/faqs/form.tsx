"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import RichTextEditor from "@/components/editor/RichTextEditor";

const categoryOptions = [
  { label: "Select category", value: "" },
  { label: "General", value: "General" },
  { label: "Products", value: "Products" },
  { label: "Farmland", value: "Farmland" },
  { label: "Services", value: "Services" },
  { label: "Support", value: "Support" },
];

export default function FAQForm({ item }: { item?: any }) {
  const router = useRouter();
  const isEdit = !!item;
  const [answer, setAnswer] = useState(item?.answer || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    data.answer = answer;

    const res = await fetch(`/api/faqs${isEdit ? `/${item.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
      }),
    });

    if (res.ok) router.push("/admin/faqs");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add"} FAQ</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <FormField label="Question" name="question" defaultValue={item?.question} required />
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
          <RichTextEditor content={answer} onChange={setAnswer} placeholder="Write the answer here..." />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormField label="Category" name="category" type="select" options={categoryOptions} defaultValue={item?.category} />
          <FormField label="Display Order" name="displayOrder" type="number" defaultValue={item?.displayOrder} />
          <FormField label="Featured" name="featured" type="checkbox" defaultValue={item?.featured ?? false} />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm">
            {isEdit ? "Update" : "Create"} FAQ
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
