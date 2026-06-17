import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBrandIdForAPI } from "@/lib/brand-server";

export async function GET(request: Request) {
  const brandId = await getBrandIdForAPI(request);
  const pages = await prisma.page.findMany({
    where: { brandId },
    include: { sections: { orderBy: { order: "asc" } }, hero: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(pages);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const brandId = await getBrandIdForAPI(request);
  const data = await request.json();
  const page = await prisma.page.create({ data: { ...data, brandId } });
  return NextResponse.json(page);
}
