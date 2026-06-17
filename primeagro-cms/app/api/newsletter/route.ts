import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getBrandIdForAPI } from "@/lib/brand-server";

export async function POST(request: Request) {
  try {
    const brandId = await getBrandIdForAPI(request);
    const { email, name } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { brandId_email: { brandId, email } } });
    if (existing) {
      return NextResponse.json({ message: "Already subscribed!" });
    }
    await prisma.newsletterSubscriber.create({ data: { email, name, brandId } });
    return NextResponse.json({ message: "Subscribed successfully!" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to subscribe" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const brandId = await getBrandIdForAPI(request);
    const subscribers = await prisma.newsletterSubscriber.findMany({ where: { brandId }, orderBy: { createdAt: "desc" } });
    return NextResponse.json(subscribers);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
