import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed!" });
    }
    await prisma.newsletterSubscriber.create({ data: { email, name } });
    return NextResponse.json({ message: "Subscribed successfully!" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to subscribe" }, { status: 500 });
  }
}

export async function GET() {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(subscribers);
}
