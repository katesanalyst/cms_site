import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hero = await prisma.hero.findUnique({ where: { pageId: id }, include: { page: true } });
  if (!hero) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(hero);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  const hero = await prisma.hero.upsert({
    where: { pageId: id },
    update: data,
    create: { ...data, pageId: id },
  });
  return NextResponse.json(hero);
}
