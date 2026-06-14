import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SectionsEditor from "./editor";

export default async function SectionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  if (!page) notFound();
  return <SectionsEditor page={page} />;
}
