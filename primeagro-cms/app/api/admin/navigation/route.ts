import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBrandIdForAPI } from "@/lib/brand-server";

export async function GET(request: Request) {
  const brandId = await getBrandIdForAPI(request);
  const items = await prisma.navigation.findMany({ where: { brandId }, orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const brandId = await getBrandIdForAPI(request);
  const data = await request.json();
  const item = await prisma.navigation.create({ data: { ...data, brandId } });
  return NextResponse.json(item);
}
