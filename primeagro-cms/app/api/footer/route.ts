import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBrandIdForAPI } from "@/lib/brand-server";

export async function GET(request: Request) {
  const brandId = await getBrandIdForAPI(request);
  const sections = await prisma.footerSection.findMany({
    where: { brandId, published: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(sections);
}
