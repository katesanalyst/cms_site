import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBrandIdForAPI } from "@/lib/brand-server";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brandId = await getBrandIdForAPI(request);
  const page = await prisma.page.findUnique({
    where: { brandId_slug: { brandId, slug } },
    include: {
      sections: { orderBy: { order: "asc" } },
      hero: true,
    },
  });
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(page);
}
