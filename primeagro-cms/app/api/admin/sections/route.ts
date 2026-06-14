import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const sections = await prisma.section.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(sections);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const section = await prisma.section.create({ data });
  return NextResponse.json(section);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { sections } = await req.json();
  for (const s of sections) {
    await prisma.section.update({ where: { id: s.id }, data: { order: s.order } });
  }
  return NextResponse.json({ ok: true });
}
