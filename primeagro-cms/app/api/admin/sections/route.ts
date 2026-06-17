import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBrandIdForAPI } from "@/lib/brand-server";

export async function GET(request: Request) {
  const brandId = await getBrandIdForAPI(request);
  const sections = await prisma.section.findMany({ where: { brandId }, orderBy: { order: "asc" } });
  return NextResponse.json(sections);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const brandId = await getBrandIdForAPI(request);
  const data = await request.json();
  const section = await prisma.section.create({ data: { ...data, brandId } });
  return NextResponse.json(section);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { sections } = await request.json();
  for (const s of sections) {
    await prisma.section.update({ where: { id: s.id }, data: { order: s.order } });
  }
  return NextResponse.json({ ok: true });
}
