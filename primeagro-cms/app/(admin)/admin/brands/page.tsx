import { prisma } from "@/lib/prisma";
import BrandsClient from "@/components/admin/BrandsClient";

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  const serialized = brands.map((b) => ({
    id: b.id,
    name: b.name,
    slug: b.slug,
    industry: b.industry,
    primaryColor: b.primaryColor,
    published: b.published,
  }));

  return <BrandsClient initialBrands={serialized} />;
}
