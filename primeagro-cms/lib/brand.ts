import { prisma } from "./prisma";

export interface BrandData {
  id: string;
  name: string;
  slug: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  logo?: string | null;
  favicon?: string | null;
  industry?: string | null;
}

export async function getBrandBySlug(slug: string): Promise<BrandData | null> {
  return prisma.brand.findUnique({ where: { slug } }) as Promise<BrandData | null>;
}

export async function getBrandById(id: string): Promise<BrandData | null> {
  return prisma.brand.findUnique({ where: { id } }) as Promise<BrandData | null>;
}

export async function getAllBrands(): Promise<BrandData[]> {
  return prisma.brand.findMany({ where: { published: true }, orderBy: { name: "asc" } }) as Promise<BrandData[]>;
}

export async function getDefaultBrand(): Promise<BrandData | null> {
  return prisma.brand.findFirst({ where: { slug: "primeagro" } }) as Promise<BrandData | null>;
}

export async function ensureDefaultBrand(): Promise<BrandData> {
  let brand = await prisma.brand.findFirst({ where: { slug: "primeagro" } });
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: "Prime Agro Farms",
        slug: "primeagro",
        subdomain: "primeagro",
        description: "Sustainable organic farming, premium produce & assisted farmland ownership.",
        primaryColor: "#3a6b35",
        secondaryColor: "#d4a853",
        accentColor: "#faf8f5",
        industry: "agriculture",
      },
    });
  }
  return brand as BrandData;
}
