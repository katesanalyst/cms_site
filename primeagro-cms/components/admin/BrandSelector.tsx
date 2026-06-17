"use client";

import { useBrand } from "@/contexts/BrandContext";
import { useEffect } from "react";

export default function BrandSelector() {
  const { brand, brands, setBrandId, loading } = useBrand();

  useEffect(() => {
    if (brand?.id) {
      document.cookie = `brandId=${brand.id}; path=/; max-age=31536000`;
    } else if (!loading && brands.length === 1) {
      // Auto-select the only brand
      setBrandId(brands[0].id);
    }
  }, [brand?.id, brands, loading, setBrandId]);

  // Hide selector when only 1 brand
  if (loading || brands.length <= 1) return null;

  return (
    <div className="px-3 py-2">
      <label className="text-xs text-green-400 uppercase tracking-wider mb-1 block">Brand</label>
      <select
        value={brand?.id || ""}
        onChange={(e) => setBrandId(e.target.value)}
        className="w-full bg-green-800 text-white text-sm rounded px-2 py-1.5 border border-green-700 focus:outline-none focus:border-green-500"
      >
        {brands.map((b) => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>
    </div>
  );
}
