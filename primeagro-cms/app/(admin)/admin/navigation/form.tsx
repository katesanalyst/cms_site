"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavigationForm() {
  const router = useRouter();
  const [form, setForm] = useState({ label: "", url: "/", order: 0 });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/navigation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ label: "", url: "/", order: 0 });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Label (e.g. About Us)" className="w-full border rounded px-3 py-2 text-sm" required />
      <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="URL (e.g. /about)" className="w-full border rounded px-3 py-2 text-sm" required />
      <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} placeholder="Order" className="w-full border rounded px-3 py-2 text-sm" />
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">Add Item</button>
    </form>
  );
}
