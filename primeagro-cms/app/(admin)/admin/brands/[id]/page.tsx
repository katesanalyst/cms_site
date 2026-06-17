"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBrandPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    industry: "",
    primaryColor: "#3a6b35",
    secondaryColor: "#d4a853",
    accentColor: "#faf8f5",
    fontHeading: "Playfair Display",
    fontBody: "Inter",
    published: true,
  });

  useEffect(() => {
    fetch(`/api/admin/brands`)
      .then((r) => r.json())
      .then((brands) => {
        const brand = Array.isArray(brands) ? brands.find((b: any) => b.id === id) : null;
        if (brand) {
          setForm({
            name: brand.name || "",
            slug: brand.slug || "",
            description: brand.description || "",
            industry: brand.industry || "",
            primaryColor: brand.primaryColor || "#3a6b35",
            secondaryColor: brand.secondaryColor || "#d4a853",
            accentColor: brand.accentColor || "#faf8f5",
            fontHeading: brand.fontHeading || "Playfair Display",
            fontBody: brand.fontBody || "Inter",
            published: brand.published ?? true,
          });
        }
        setLoading(false);
      });
  }, [id]);

  function set(key: string, val: any) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/brands`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...form }),
    });
    setSaving(false);
    if (res.ok) router.push("/admin/brands");
  }

  async function handleDelete() {
    if (!confirm("Delete this brand? All associated data will be orphaned.")) return;
    const res = await fetch(`/api/admin/brands`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) router.push("/admin/brands");
  }

  if (loading) return <div className="text-gray-500 p-6">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Brand</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} required className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <input value={form.industry} onChange={(e) => set("industry", e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <input type="color" value={form.primaryColor} onChange={(e) => set("primaryColor", e.target.value)} className="w-full h-10 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
            <input type="color" value={form.secondaryColor} onChange={(e) => set("secondaryColor", e.target.value)} className="w-full h-10 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
            <input type="color" value={form.accentColor} onChange={(e) => set("accentColor", e.target.value)} className="w-full h-10 border rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading Font</label>
            <input value={form.fontHeading} onChange={(e) => set("fontHeading", e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Body Font</label>
            <input value={form.fontBody} onChange={(e) => set("fontBody", e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="rounded" />
            Published
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800 disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
            Delete
          </button>
          <button type="button" onClick={() => router.push("/admin/brands")} className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
