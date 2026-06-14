"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FooterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ type: "quick-links", title: "", items: "[]" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/footer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ type: "quick-links", title: "", items: "[]" });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
        <option value="quick-links">Quick Links</option>
        <option value="services">Services</option>
        <option value="contact">Contact</option>
        <option value="brand">Brand</option>
      </select>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Section title (optional)" className="w-full border rounded px-3 py-2 text-sm" />
      <textarea value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} placeholder='JSON items: [{"label":"Home","url":"/"}]' rows={4} className="w-full border rounded px-3 py-2 text-sm font-mono" />
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">Add Section</button>
    </form>
  );
}
