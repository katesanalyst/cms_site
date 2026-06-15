"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import AIPanel from "@/components/ai/AIPanel";

const RichTextEditor = dynamic(() => import("@/components/editor/RichTextEditor"), { ssr: false });

const sectionTypes = [
  { value: "story", label: "Story / Text Block" },
  { value: "cards", label: "Feature Cards (icon+title+text)" },
  { value: "stats", label: "Stats Bar" },
  { value: "process", label: "Process Steps" },
  { value: "faq", label: "FAQ Accordion" },
  { value: "cta", label: "CTA Banner" },
];

export default function PageEditor({ page }: { page: any }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"page" | "hero" | "sections">("page");

  const [pageForm, setPageForm] = useState({
    title: page.title,
    slug: page.slug,
    metaTitle: page.metaTitle || "",
    metaDescription: page.metaDescription || "",
    published: page.published,
  });

  const [hero, setHero] = useState(page.hero || { tag: "", heading: "", subheading: "", text: "", bgType: "gradient", bgImage: "", videoUrl: "", videoType: "youtube", overlayOpacity: 40, textColor: "white", textAlign: "center", buttons: "[]" });
  const [heroText, setHeroText] = useState(page.hero?.text || "");
  const [sections, setSections] = useState<any[]>(page.sections || []);
  const [addingSection, setAddingSection] = useState(false);
  const [newSection, setNewSection] = useState({ type: "cards", title: "", heading: "", text: "", badge: "", badgeIcon: "" });
  const [newSectionText, setNewSectionText] = useState("");
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [editFormText, setEditFormText] = useState("");

  async function savePage() {
    setSaving(true);
    await fetch(`/api/admin/pages/${page.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pageForm),
    });
    setSaving(false);
    alert("Page saved!");
  }

  async function saveHero() {
    setSaving(true);
    await fetch(`/api/admin/heroes/${page.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...hero, text: heroText }),
    });
    setSaving(false);
    alert("Hero saved!");
  }

  async function addSection(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newSection, text: newSectionText, pageId: page.id, order: sections.length }),
    });
    const section = await res.json();
    setSections([...sections, section]);
    setAddingSection(false);
    setNewSection({ type: "cards", title: "", heading: "", text: "", badge: "", badgeIcon: "" });
    setNewSectionText("");
  }

  async function saveSection(section: any) {
    setSaving(true);
    await fetch(`/api/admin/sections/${section.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...section, text: editFormText }),
    });
    setEditingSection(null);
    setSaving(false);
  }

  async function deleteSection(id: string) {
    if (!confirm("Delete this section?")) return;
    await fetch(`/api/admin/sections/${id}`, { method: "DELETE" });
    setSections(sections.filter((s) => s.id !== id));
  }

  function startEditSection(section: any) {
    setEditingSection(section.id);
    setEditForm({ ...section, items: section.items || "[]" });
    setEditFormText(section.text || "");
  }

  function updateEditField(field: string, value: any) {
    setEditForm({ ...editForm, [field]: value });
  }

  function parseItems(itemsStr: string): any[] {
    try { return JSON.parse(itemsStr || "[]"); } catch { return []; }
  }

  function addCardItem() {
    const items = parseItems(editForm.items);
    items.push({ icon: "🌿", title: "", text: "" });
    updateEditField("items", JSON.stringify(items));
  }

  function updateCardItem(idx: number, field: string, value: string) {
    const items = parseItems(editForm.items);
    items[idx] = { ...items[idx], [field]: value };
    updateEditField("items", JSON.stringify(items));
  }

  function removeCardItem(idx: number) {
    const items = parseItems(editForm.items);
    items.splice(idx, 1);
    updateEditField("items", JSON.stringify(items));
  }

  function addHeroButton() {
    const buttons = JSON.parse(hero.buttons || "[]");
    buttons.push({ text: "Button Text", href: "/", variant: "primary" });
    setHero({ ...hero, buttons: JSON.stringify(buttons) });
  }

  function updateHeroButton(idx: number, field: string, value: string) {
    const buttons = JSON.parse(hero.buttons || "[]");
    buttons[idx] = { ...buttons[idx], [field]: value };
    setHero({ ...hero, buttons: JSON.stringify(buttons) });
  }

  function removeHeroButton(idx: number) {
    const buttons = JSON.parse(hero.buttons || "[]");
    buttons.splice(idx, 1);
    setHero({ ...hero, buttons: JSON.stringify(buttons) });
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit: {page.title}</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { key: "page", label: "Page Info" },
          { key: "hero", label: "Hero Banner" },
          { key: "sections", label: `Sections (${sections.length})` },
        ].map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.key ? "bg-white shadow text-green-700" : "text-gray-600 hover:text-gray-900"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* PAGE INFO TAB */}
      {activeTab === "page" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Page Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input value={pageForm.title} onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input value={pageForm.slug} onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" checked={pageForm.published} onChange={(e) => setPageForm({ ...pageForm, published: e.target.checked })} className="rounded" />
              <label className="text-sm">Published</label>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <input value={pageForm.metaTitle} onChange={(e) => setPageForm({ ...pageForm, metaTitle: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta Description</label>
                <textarea value={pageForm.metaDescription} onChange={(e) => setPageForm({ ...pageForm, metaDescription: e.target.value })} rows={3} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
            </div>
          </div>
          <AIPanel
            pageType={page.slug}
            content={pageForm.title + " " + pageForm.metaDescription}
            currentTitle={pageForm.metaTitle}
            currentDescription={pageForm.metaDescription}
            onApplyMeta={(title, desc) => setPageForm({ ...pageForm, metaTitle: title, metaDescription: desc })}
          />
          <button onClick={savePage} disabled={saving} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm disabled:opacity-50">
            {saving ? "Saving..." : "Save Page"}
          </button>
        </div>
      )}

      {/* HERO TAB */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Hero Content</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tag / Badge</label>
                <input value={hero.tag || ""} onChange={(e) => setHero({ ...hero, tag: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. Sustainable Farming" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Text Color</label>
                <select value={hero.textColor || "white"} onChange={(e) => setHero({ ...hero, textColor: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
                  <option value="white">White</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Heading</label>
              <input value={hero.heading || ""} onChange={(e) => setHero({ ...hero, heading: e.target.value })} className="w-full border rounded px-3 py-2 text-sm text-lg" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Subheading</label>
              <input value={hero.subheading || ""} onChange={(e) => setHero({ ...hero, subheading: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Text</label>
              <RichTextEditor content={heroText} onChange={setHeroText} placeholder="Hero description text..." />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Text Align</label>
                <select value={hero.textAlign || "center"} onChange={(e) => setHero({ ...hero, textAlign: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Overlay Opacity: {hero.overlayOpacity || 40}%</label>
                <input type="range" min="0" max="100" value={hero.overlayOpacity || 40} onChange={(e) => setHero({ ...hero, overlayOpacity: parseInt(e.target.value) })} className="w-full" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Background</h2>
            <div className="flex gap-3 mb-4">
              {["image", "video", "gradient"].map((type) => (
                <button key={type} type="button" onClick={() => setHero({ ...hero, bgType: type })} className={`px-4 py-2 rounded text-sm ${hero.bgType === type ? "bg-green-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            {hero.bgType === "image" && (
              <input value={hero.bgImage || ""} onChange={(e) => setHero({ ...hero, bgImage: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="Image URL (https://...)" />
            )}
            {hero.bgType === "video" && (
              <div className="space-y-3">
                <input value={hero.videoUrl || ""} onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="YouTube/Vimeo/MP4 URL" />
                <select value={hero.videoType || "youtube"} onChange={(e) => setHero({ ...hero, videoType: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                  <option value="mp4">MP4</option>
                </select>
              </div>
            )}
            {hero.bgType === "gradient" && (
              <div className="flex gap-2">
                {["from-[#2d3a1e] to-[#3a5530]", "from-[#1a2e14] to-[#2d5a27]", "from-amber-800 to-amber-600", "from-primary to-primary-dark"].map((g) => (
                  <div key={g} onClick={() => setHero({ ...hero, bgImage: g })} className={`w-12 h-12 rounded cursor-pointer bg-gradient-to-br ${g} ${hero.bgImage === g ? "ring-2 ring-green-500 ring-offset-2" : ""}`} />
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Buttons</h2>
              <button type="button" onClick={addHeroButton} className="text-green-700 text-sm hover:underline">+ Add Button</button>
            </div>
            {JSON.parse(hero.buttons || "[]").map((btn: any, i: number) => (
              <div key={i} className="grid grid-cols-4 gap-3 mb-3 items-end">
                <input value={btn.text} onChange={(e) => updateHeroButton(i, "text", e.target.value)} className="border rounded px-3 py-2 text-sm" placeholder="Button Text" />
                <input value={btn.href} onChange={(e) => updateHeroButton(i, "href", e.target.value)} className="border rounded px-3 py-2 text-sm" placeholder="Link URL" />
                <select value={btn.variant} onChange={(e) => updateHeroButton(i, "variant", e.target.value)} className="border rounded px-3 py-2 text-sm">
                  <option value="primary">Primary</option>
                  <option value="gold">Gold</option>
                  <option value="outline">Outline</option>
                </select>
                <button onClick={() => removeHeroButton(i)} className="text-red-600 text-sm hover:underline">Remove</button>
              </div>
            ))}
          </div>

          <button onClick={saveHero} disabled={saving} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm disabled:opacity-50">
            {saving ? "Saving..." : "Save Hero"}
          </button>
        </div>
      )}

      {/* SECTIONS TAB */}
      {activeTab === "sections" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Page Sections</h2>
            <button onClick={() => setAddingSection(true)} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">+ Add Section</button>
          </div>

          {addingSection && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">New Section</h3>
              <form onSubmit={addSection} className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <select value={newSection.type} onChange={(e) => setNewSection({ ...newSection, type: e.target.value })} className="border rounded px-3 py-2 text-sm">
                    {sectionTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <input value={newSection.badge} onChange={(e) => setNewSection({ ...newSection, badge: e.target.value })} className="border rounded px-3 py-2 text-sm" placeholder="Badge text" />
                  <input value={newSection.badgeIcon} onChange={(e) => setNewSection({ ...newSection, badgeIcon: e.target.value })} className="border rounded px-3 py-2 text-sm" placeholder="Badge icon (emoji)" />
                </div>
                <input value={newSection.heading} onChange={(e) => setNewSection({ ...newSection, heading: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" placeholder="Section heading" />
                <div>
                  <label className="block text-xs font-medium mb-1">Section Text</label>
                  <RichTextEditor content={newSectionText} onChange={setNewSectionText} placeholder="Section text / description..." />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded text-sm">Add</button>
                  <button type="button" onClick={() => setAddingSection(false)} className="bg-gray-200 px-4 py-2 rounded text-sm">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {sections.map((section, idx) => (
            <div key={section.id} className="bg-white rounded-lg shadow">
              {editingSection === section.id && editForm ? (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Edit Section</h3>
                    <div className="flex gap-2">
                      <button onClick={() => saveSection(editForm)} disabled={saving} className="bg-green-700 text-white px-4 py-2 rounded text-sm">{saving ? "Saving..." : "Save"}</button>
                      <button onClick={() => setEditingSection(null)} className="bg-gray-200 px-4 py-2 rounded text-sm">Cancel</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Badge</label>
                      <input value={editForm.badge || ""} onChange={(e) => updateEditField("badge", e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Badge Icon</label>
                      <input value={editForm.badgeIcon || ""} onChange={(e) => updateEditField("badgeIcon", e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-medium mb-1">Heading</label>
                    <RichTextEditor content={editForm.heading || ""} onChange={(val) => updateEditField("heading", val)} placeholder="Section heading — select text to make italic/bold" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-medium mb-1">Text</label>
                    <RichTextEditor content={editFormText} onChange={setEditFormText} placeholder="Section text..." />
                  </div>

                  {(editForm.type === "cards" || editForm.type === "process") && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-medium">Items (Cards/Steps)</label>
                        <button type="button" onClick={addCardItem} className="text-green-700 text-xs hover:underline">+ Add Item</button>
                      </div>
                      {parseItems(editForm.items).map((item: any, i: number) => (
                        <div key={i} className="grid grid-cols-12 gap-2 mb-2 items-start">
                          <input value={item.icon || ""} onChange={(e) => updateCardItem(i, "icon", e.target.value)} className="col-span-1 border rounded px-2 py-2 text-sm text-center" placeholder="icon" />
                          <input value={item.title || ""} onChange={(e) => updateCardItem(i, "title", e.target.value)} className="col-span-4 border rounded px-2 py-2 text-sm" placeholder="Title" />
                          <input value={item.text || ""} onChange={(e) => updateCardItem(i, "text", e.target.value)} className="col-span-6 border rounded px-2 py-2 text-sm" placeholder="Description" />
                          <button type="button" onClick={() => removeCardItem(i)} className="col-span-1 text-red-500 text-sm hover:underline">X</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm w-6">{idx + 1}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{section.type}</span>
                    <span className="font-medium text-sm">{section.badge ? `${section.badge} — ` : ""}{section.heading || section.title || "Untitled"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEditSection(section)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    <button onClick={() => deleteSection(section.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {sections.length === 0 && !addingSection && (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-400">
              No sections yet. Click "+ Add Section" to start building your page content.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
