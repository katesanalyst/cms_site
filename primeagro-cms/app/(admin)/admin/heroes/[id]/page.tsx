import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import HeroEditor from "./editor";

export default async function HeroPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();
  const hero = await prisma.hero.findUnique({ where: { pageId: id } });
  return <HeroEditor page={page} hero={hero} />;
}
