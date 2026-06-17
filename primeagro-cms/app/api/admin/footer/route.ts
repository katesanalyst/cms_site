import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBrandIdForAPI } from "@/lib/brand-server";

export async function GET(request: Request) {
  const brandId = await getBrandIdForAPI(request);
  const sections = await prisma.footerSection.findMany({ where: { brandId }, orderBy: { order: "asc" } });
  return NextResponse.json(sections);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const brandId = await getBrandIdForAPI(request);
  const data = await request.json();
  const section = await prisma.footerSection.create({ data: { ...data, brandId } });
  return NextResponse.json(section);
}
