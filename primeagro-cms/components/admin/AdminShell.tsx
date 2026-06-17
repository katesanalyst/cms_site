"use client";

import { BrandProvider } from "@/contexts/BrandContext";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return <BrandProvider>{children}</BrandProvider>;
}
