"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPageForm() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", slug: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published: false }),
    });
    const page = await res.json();
    router.push(`/admin/pages/${page.id}`);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Page</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Page Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. Homepage" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug (auto-generated if empty)</label>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. homepage" />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">Create Page</button>
          <button type="button" onClick={() => router.push("/admin/pages")} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm">Cancel</button>
        </div>
      </form>
    </div>
  );
}
