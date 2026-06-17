import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBrandIdForAPI } from "@/lib/brand-server";

export async function GET(request: Request) {
  try {
    const brandId = await getBrandIdForAPI(request);
    const items = await prisma.teamMember.findMany({ where: { brandId }, orderBy: { displayOrder: "asc" } });
    return NextResponse.json(items);
  } catch (e) { return NextResponse.json({ error: String(e) }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");
    const brandId = await getBrandIdForAPI(request);
    const data = await request.json();
    const item = await prisma.teamMember.create({ data: { ...data, brandId } });
    return NextResponse.json(item);
  } catch (e) { return NextResponse.json({ error: String(e) }, { status: 500 }); }
}
