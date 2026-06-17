import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBrandIdForAPI } from "@/lib/brand-server";

export async function GET(request: Request) {
  const brandId = await getBrandIdForAPI(request);
  const settings = await prisma.siteSetting.findMany({ where: { brandId } });
  const data: Record<string, string> = {};
  for (const s of settings) data[s.key] = s.value || "";
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const brandId = await getBrandIdForAPI(request);
  const data = await request.json();

  for (const [key, value] of Object.entries(data)) {
    await prisma.siteSetting.upsert({
      where: { brandId_key: { brandId, key } },
      update: { value: String(value) },
      create: { brandId, key, value: String(value) },
    });
  }

  return NextResponse.json({ success: true });
}
