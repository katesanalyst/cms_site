"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function MediaUpload() {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) router.refresh();
    setUploading(false);
    if (ref.current) ref.current.value = "";
  }

  return (
    <label className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm cursor-pointer inline-block">
      {uploading ? "Uploading..." : "Upload Media"}
      <input ref={ref} type="file" accept="image/*,.pdf,.doc,.docx" onChange={handleUpload} className="hidden" disabled={uploading} />
    </label>
  );
}
