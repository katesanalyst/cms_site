"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/editor/RichTextEditor"), { ssr: false });

const sectionTypes = [
  { value: "story", label: "Story Section" },
  { value: "cards", label: "Feature Cards" },
  { value: "stats", label: "Stats Bar" },
  { value: "process", label: "Process Steps" },
  { value: "testimonials", label: "Testimonials" },
  { value: "gallery-preview", label: "Gallery Preview" },
  { value: "faq", label: "FAQ Accordion" },
  { value: "form", label: "Contact/Consultation Form" },
  { value: "cta", label: "CTA Banner" },
  { value: "rich-text", label: "Rich Text Content" },
];

function SectionForm({ section, onSave, onCancel }: { section: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    type: section?.type || "story",
    title: section?.title || "",
    badge: section?.badge || "",
    badgeIcon: section?.badgeIcon || "",
    heading: section?.heading || "",
    text: section?.text || "",
    items: section?.items || "",
    align: section?.align || "left",
    light: section?.light || false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-4 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{section ? "Edit Section" : "New Section"}</h3>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
            {sectionTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title (internal name)</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. Sustainability" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Badge Label</label>
          <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. Sustainability" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Badge Icon (emoji)</label>
          <input value={form.badgeIcon} onChange={(e) => setForm({ ...form, badgeIcon: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. 🌿" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Heading</label>
        <RichTextEditor
          content={form.heading}
          onChange={(html) => setForm({ ...form, heading: html })}
          placeholder="Main heading text — select words to make italic/bold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Text / Description</label>
        <RichTextEditor
          content={form.text}
          onChange={(html) => setForm({ ...form, text: html })}
          placeholder="Paragraph text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Items (JSON array or comma separated)</label>
        <textarea value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} rows={3} className="w-full border rounded px-3 py-2 text-sm font-mono text-xs" placeholder='["Item 1","Item 2"] or "Item 1, Item 2"' />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Align</label>
          <select value={form.align} onChange={(e) => setForm({ ...form, align: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.light} onChange={(e) => setForm({ ...form, light: e.target.checked })} className="rounded" />
            Light background
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm font-medium">Save Section</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm">Cancel</button>
      </div>
    </form>
  );
}

export default function SectionsEditor({ page }: { page: any }) {
  const router = useRouter();
  const [sections, setSections] = useState(page.sections);
  const [editing, setEditing] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);

  async function saveSection(data: any) {
    if (isNew) {
      const res = await fetch("/api/admin/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, pageId: page.id, order: sections.length }),
      });
      const section = await res.json();
      setSections([...sections, section]);
    } else {
      await fetch(`/api/admin/sections/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSections(sections.map((s: any) => s.id === editing.id ? { ...s, ...data } : s));
    }
    setEditing(null);
    setIsNew(false);
  }

  async function deleteSection(id: string) {
    await fetch(`/api/admin/sections/${id}`, { method: "DELETE" });
    setSections(sections.filter((s: any) => s.id !== id));
  }

  async function moveSection(id: string, direction: "up" | "down") {
    const idx = sections.findIndex((s: any) => s.id === id);
    if ((direction === "up" && idx === 0) || (direction === "down" && idx === sections.length - 1)) return;
    const newSections = [...sections];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    [newSections[idx], newSections[swapIdx]] = [newSections[swapIdx], newSections[idx]];
    newSections.forEach((s: any, i: number) => s.order = i);
    setSections(newSections);
    await fetch("/api/admin/sections", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections: newSections.map((s: any) => ({ id: s.id, order: s.order })) }),
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sections: {page.title}</h1>
        <div className="flex gap-3">
          <button onClick={() => { setEditing({}); setIsNew(true); }} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">
            + Add Section
          </button>
          <button onClick={() => router.push(`/admin/pages/${page.id}`)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm">
            Back
          </button>
        </div>
      </div>

      {(editing || isNew) && (
        <SectionForm
          section={isNew ? null : editing}
          onSave={saveSection}
          onCancel={() => { setEditing(null); setIsNew(false); }}
        />
      )}

      <div className="space-y-3">
        {sections.map((section: any, idx: number) => (
          <div key={section.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm w-6">{idx + 1}</span>
                <div>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs mr-2">{section.type}</span>
                  <span className="font-medium">{section.title || section.heading || "Untitled"}</span>
                  {section.badge && <span className="text-xs text-gray-400 ml-2">Badge: {section.badge}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setEditing(section); setIsNew(false); }} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                <button onClick={() => moveSection(section.id, "up")} className="text-gray-400 hover:text-gray-600 text-sm">↑</button>
                <button onClick={() => moveSection(section.id, "down")} className="text-gray-400 hover:text-gray-600 text-sm">↓</button>
                <button onClick={() => deleteSection(section.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
              </div>
            </div>
            {section.heading && <p className="text-sm text-gray-500 mt-1 ml-10 truncate">{section.heading}</p>}
          </div>
        ))}
        {sections.length === 0 && !editing && !isNew && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-400">
            No sections yet. Click "Add Section" to start building your page.
          </div>
        )}
      </div>
    </div>
  );
}
