import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getBrandIdFromCookie(): Promise<string> {
  const cookieStore = await cookies();
  const brandId = cookieStore.get("brandId")?.value;
  if (brandId) return brandId;

  // Fallback to default brand
  const defaultBrand = await prisma.brand.findFirst({ where: { slug: "primeagro" } });
  if (defaultBrand) return defaultBrand.id;

  // Last resort: get any brand
  const anyBrand = await prisma.brand.findFirst();
  if (anyBrand) return anyBrand.id;

  throw new Error("No brand found. Run migrate-brand.cjs first.");
}

export async function getBrandIdForAPI(request: Request): Promise<string> {
  // Check header first (from client fetch)
  const headerBrandId = request.headers.get("x-brand-id");
  if (headerBrandId) return headerBrandId;

  // Check cookie
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/brandId=([^;]+)/);
  if (match) return match[1];

  // Check query param (from frontend cmsFetch)
  const url = new URL(request.url);
  const queryBrandId = url.searchParams.get("brandId");
  if (queryBrandId) return queryBrandId;

  // Fallback to first published brand
  const defaultBrand = await prisma.brand.findFirst({ where: { published: true }, orderBy: { createdAt: "asc" } });
  if (defaultBrand) return defaultBrand.id;

  // Last resort: any brand
  const anyBrand = await prisma.brand.findFirst();
  if (anyBrand) return anyBrand.id;

  throw new Error("No brand found. Create a brand first.");
}
