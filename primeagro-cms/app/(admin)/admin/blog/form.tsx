"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import RichTextEditor from "@/components/editor/RichTextEditor";

const categoryOptions = [
  { label: "Select category", value: "" },
  { label: "Farming Tips", value: "Farming Tips" },
  { label: "Sustainability", value: "Sustainability" },
  { label: "News", value: "News" },
  { label: "Recipes", value: "Recipes" },
];

export default function BlogForm({ item }: { item?: any }) {
  const router = useRouter();
  const isEdit = !!item;
  const [excerpt, setExcerpt] = useState(item?.excerpt || "");
  const [content, setContent] = useState(item?.content || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    data.excerpt = excerpt;
    data.content = content;

    const res = await fetch(`/api/blog${isEdit ? `/${item.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, published: data.published === "true" }),
    });

    if (res.ok) router.push("/admin/blog");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add"} Blog Post</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Title" name="title" defaultValue={item?.title} required />
          <FormField label="Slug" name="slug" defaultValue={item?.slug} placeholder="Leave blank to auto-generate" />
          <FormField label="Category" name="category" type="select" options={categoryOptions} defaultValue={item?.category} />
          <FormField label="Tags" name="tags" defaultValue={item?.tags} placeholder="Comma separated" />
          <FormField label="Author" name="author" defaultValue={item?.author} />
          <FormField label="Published At" name="publishedAt" defaultValue={item?.publishedAt} placeholder="YYYY-MM-DD" />
          <FormField label="Published" name="published" type="checkbox" defaultValue={item?.published ?? true} />
          <FormField label="Featured Image URL" name="featuredImage" defaultValue={item?.featuredImage} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <RichTextEditor content={excerpt} onChange={setExcerpt} placeholder="Short summary of the post..." />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <RichTextEditor content={content} onChange={setContent} placeholder="Write your blog post content here..." />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm">
            {isEdit ? "Update" : "Create"} Post
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
