"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Brand {
  id: string;
  name: string;
  slug: string;
  industry: string | null;
  primaryColor: string;
  published: boolean;
}

export default function BrandsClient({ initialBrands }: { initialBrands: Brand[] }) {
  const router = useRouter();
  const [brands, setBrands] = useState(initialBrands);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "", industry: "", primaryColor: "#3a6b35", secondaryColor: "#d4a853", accentColor: "#faf8f5", fontHeading: "Playfair Display", fontBody: "Inter" });
  const [saving, setSaving] = useState(false);

  function set(key: string, val: string) { setForm((p) => ({ ...p, [key]: val })); }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/brands", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setCreating(false); router.refresh(); }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const res = await fetch("/api/admin/brands", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing, ...form }) });
    setSaving(false);
    if (res.ok) { setEditing(null); router.refresh(); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this brand?")) return;
    const res = await fetch("/api/admin/brands", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (res.ok) router.refresh();
  }

  function startEdit(b: Brand) {
    setEditing(b.id);
    setCreating(false);
    setForm({ name: b.name, slug: b.slug, description: "", industry: b.industry || "", primaryColor: b.primaryColor, secondaryColor: "#d4a853", accentColor: "#faf8f5", fontHeading: "Playfair Display", fontBody: "Inter" });
  }

  const Form = ({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) => (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-6 mb-6 space-y-3">
      <h3 className="font-bold text-lg">{editing ? "Edit Brand" : "New Brand"}</h3>
      <div><label className="block text-sm font-medium mb-1">Name *</label><input value={form.name} onChange={(e) => set("name", e.target.value)} required className="w-full border rounded px-3 py-2 text-sm" /></div>
      <div><label className="block text-sm font-medium mb-1">Slug</label><input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="w-full border rounded px-3 py-2 text-sm" /></div>
      <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} className="w-full border rounded px-3 py-2 text-sm" /></div>
      <div><label className="block text-sm font-medium mb-1">Industry</label><input value={form.industry} onChange={(e) => set("industry", e.target.value)} className="w-full border rounded px-3 py-2 text-sm" /></div>
      <div className="grid grid-cols-3 gap-4">
        <div><label className="block text-sm font-medium mb-1">Primary</label><input type="color" value={form.primaryColor} onChange={(e) => set("primaryColor", e.target.value)} className="w-full h-10" /></div>
        <div><label className="block text-sm font-medium mb-1">Secondary</label><input type="color" value={form.secondaryColor} onChange={(e) => set("secondaryColor", e.target.value)} className="w-full h-10" /></div>
        <div><label className="block text-sm font-medium mb-1">Accent</label><input type="color" value={form.accentColor} onChange={(e) => set("accentColor", e.target.value)} className="w-full h-10" /></div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800 disabled:opacity-50">{saving ? "Saving..." : editing ? "Save" : "Create"}</button>
        <button type="button" onClick={() => { setEditing(null); setCreating(false); }} className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300">Cancel</button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brands</h1>
        <button onClick={() => { setCreating(true); setEditing(null); setForm({ name: "", slug: "", description: "", industry: "", primaryColor: "#3a6b35", secondaryColor: "#d4a853", accentColor: "#faf8f5", fontHeading: "Playfair Display", fontBody: "Inter" }); }} className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800">+ New Brand</button>
      </div>

      {creating && <Form onSubmit={handleCreate} />}
      {editing && <Form onSubmit={handleUpdate} />}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b">
            <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Industry</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Color</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
            <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
          </tr></thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{b.name}</td>
                <td className="px-4 py-3 text-gray-500">{b.slug}</td>
                <td className="px-4 py-3">{b.industry || "-"}</td>
                <td className="px-4 py-3"><span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: b.primaryColor }} /></td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${b.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{b.published ? "Published" : "Draft"}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(b)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button onClick={() => handleDelete(b.id)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
            {brands.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No brands yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
