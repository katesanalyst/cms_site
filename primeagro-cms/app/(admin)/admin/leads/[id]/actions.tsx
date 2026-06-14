"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LeadActions({ lead }: { lead: any }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status || "new");

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);

    await fetch(`/api/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.refresh();
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          name="notes"
          defaultValue={lead.notes || ""}
          rows={3}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">
          Update Lead
        </button>
        <button type="button" onClick={() => router.push("/admin/leads")} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm">
          Back to Leads
        </button>
      </div>
    </form>
  );
}
