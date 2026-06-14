import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import LeadActions from "./actions";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Lead Details</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Name</label>
            <p className="font-medium">{lead.name}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Phone</label>
            <p className="font-medium">{lead.phone}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Email</label>
            <p>{lead.email || "-"}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Source</label>
            <p>{lead.source}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Interest</label>
            <p>{lead.interest || "-"}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Budget</label>
            <p>{lead.budget || "-"}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Location</label>
            <p>{lead.location || "-"}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase mb-1">Date</label>
            <p>{formatDate(lead.createdAt)}</p>
          </div>
        </div>

        {lead.message && (
          <div className="mb-6">
            <label className="block text-xs text-gray-500 uppercase mb-1">Message</label>
            <p className="text-sm bg-gray-50 p-3 rounded">{lead.message}</p>
          </div>
        )}

        <div className="border-t pt-6">
          <LeadActions lead={lead} />
        </div>
      </div>
    </div>
  );
}
