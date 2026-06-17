"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Brand {
  id: string;
  name: string;
  slug: string;
  primaryColor: string;
  secondaryColor: string;
}

interface BrandContextType {
  brand: Brand | null;
  brands: Brand[];
  setBrandId: (id: string) => void;
  loading: boolean;
}

const BrandContext = createContext<BrandContextType>({
  brand: null,
  brands: [],
  setBrandId: () => {},
  loading: true,
});

export function useBrand() {
  return useContext(BrandContext);
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/brands")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setBrands(list);
        const saved = localStorage.getItem("brandId");
        const current = list.find((b: Brand) => b.id === saved) || list[0];
        if (current) {
          setBrand(current);
          localStorage.setItem("brandId", current.id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const setBrandId = (id: string) => {
    const found = brands.find((b) => b.id === id);
    if (found) {
      setBrand(found);
      localStorage.setItem("brandId", found.id);
    }
  };

  return (
    <BrandContext.Provider value={{ brand, brands, setBrandId, loading }}>
      {children}
    </BrandContext.Provider>
  );
}
