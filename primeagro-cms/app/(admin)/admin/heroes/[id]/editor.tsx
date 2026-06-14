"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroEditor({ page, hero }: { page: any; hero: any }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    tag: hero?.tag || "",
    heading: hero?.heading || "",
    subheading: hero?.subheading || "",
    text: hero?.text || "",
    bgType: hero?.bgType || "image",
    bgImage: hero?.bgImage || "",
    videoUrl: hero?.videoUrl || "",
    videoType: hero?.videoType || "youtube",
    videoPoster: hero?.videoPoster || "",
    overlayOpacity: hero?.overlayOpacity || 40,
    textColor: hero?.textColor || "white",
    textAlign: hero?.textAlign || "left",
    buttons: hero?.buttons || "[]",
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/admin/heroes/${page.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hero: {page.title}</h1>
        <button onClick={() => router.push(`/admin/pages/${page.id}`)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm">
          Back to Page
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Content</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tag / Badge</label>
              <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. Sustainable Farming" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Text Color</label>
              <select value={form.textColor} onChange={(e) => setForm({ ...form, textColor: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
                <option value="white">White</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Heading</label>
            <input value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Subheading</label>
            <input value={form.subheading} onChange={(e) => setForm({ ...form, subheading: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Text</label>
            <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Text Align</label>
              <select value={form.textAlign} onChange={(e) => setForm({ ...form, textAlign: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Overlay Opacity: {form.overlayOpacity}%</label>
              <input type="range" min="0" max="100" value={form.overlayOpacity} onChange={(e) => setForm({ ...form, overlayOpacity: parseInt(e.target.value) })} className="w-full" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Background</h2>
          <div className="flex gap-4 mb-4">
            {["image", "video", "gradient"].map((type) => (
              <button key={type} type="button" onClick={() => setForm({ ...form, bgType: type })} className={`px-4 py-2 rounded text-sm ${form.bgType === type ? "bg-green-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {form.bgType === "image" && (
            <div>
              <label className="block text-sm font-medium mb-1">Background Image URL</label>
              <input value={form.bgImage} onChange={(e) => setForm({ ...form, bgImage: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="https://..." />
            </div>
          )}

          {form.bgType === "video" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Video URL</label>
                <input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="YouTube/Vimeo/MP4 URL" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Video Type</label>
                  <select value={form.videoType} onChange={(e) => setForm({ ...form, videoType: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="mp4">MP4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Poster Image URL</label>
                  <input value={form.videoPoster} onChange={(e) => setForm({ ...form, videoPoster: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="Thumbnail image" />
                </div>
              </div>
            </div>
          )}

          {form.bgType === "gradient" && (
            <div>
              <label className="block text-sm font-medium mb-1">Gradient Background</label>
              <div className="flex gap-2">
                <div className="w-12 h-12 rounded bg-gradient-to-br from-green-800 to-green-600 border-2 border-green-700 cursor-pointer" onClick={() => setForm({ ...form, bgImage: "linear-gradient(135deg, #2d5a27, #3a6b35)" })} />
                <div className="w-12 h-12 rounded bg-gradient-to-br from-green-900 to-green-700 border-2 border-transparent cursor-pointer" onClick={() => setForm({ ...form, bgImage: "linear-gradient(135deg, #1a3a15, #3a6b35)" })} />
                <div className="w-12 h-12 rounded bg-gradient-to-br from-amber-800 to-amber-600 border-2 border-transparent cursor-pointer" onClick={() => setForm({ ...form, bgImage: "linear-gradient(135deg, #7c5c2e, #d4a853)" })} />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm disabled:opacity-50">
            {saving ? "Saving..." : "Save Hero"}
          </button>
        </div>
      </form>
    </div>
  );
}
