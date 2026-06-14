import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateMetaTags } from "@/lib/ai";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { pageType, content, keywords } = await req.json();
  const result = await generateMetaTags(pageType, content, keywords);
  return NextResponse.json(result);
}
