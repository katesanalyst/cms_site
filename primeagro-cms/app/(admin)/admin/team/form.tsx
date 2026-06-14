"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import RichTextEditor from "@/components/editor/RichTextEditor";

const departmentOptions = [
  { label: "Select department", value: "" },
  { label: "Management", value: "Management" },
  { label: "Farming", value: "Farming" },
  { label: "Sales", value: "Sales" },
  { label: "Operations", value: "Operations" },
  { label: "Support", value: "Support" },
];

export default function TeamForm({ item }: { item?: any }) {
  const router = useRouter();
  const isEdit = !!item;
  const [bio, setBio] = useState(item?.bio || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    data.bio = bio;

    const res = await fetch(`/api/team${isEdit ? `/${item.id}` : ""}`, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
      }),
    });

    if (res.ok) router.push("/admin/team");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Add"} Team Member</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Name" name="name" defaultValue={item?.name} required />
          <FormField label="Role" name="role" defaultValue={item?.role} required />
          <FormField label="Department" name="department" type="select" options={departmentOptions} defaultValue={item?.department} />
          <FormField label="Email" name="email" type="email" defaultValue={item?.email} />
          <FormField label="Photo URL" name="photo" defaultValue={item?.photo} />
          <FormField label="LinkedIn URL" name="linkedin" type="url" defaultValue={item?.linkedin} />
          <FormField label="Twitter URL" name="twitter" type="url" defaultValue={item?.twitter} />
          <FormField label="Instagram URL" name="instagram" type="url" defaultValue={item?.instagram} />
          <FormField label="Display Order" name="displayOrder" type="number" defaultValue={item?.displayOrder} />
          <FormField label="Display on Home" name="displayOnHome" type="checkbox" defaultValue={item?.displayOnHome ?? false} />
          <FormField label="Featured" name="featured" type="checkbox" defaultValue={item?.featured ?? false} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <RichTextEditor content={bio} onChange={setBio} placeholder="Write about this team member..." />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm">
            {isEdit ? "Update" : "Create"} Member
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
