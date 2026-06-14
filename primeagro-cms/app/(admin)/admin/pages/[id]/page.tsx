import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PageEditor from "./editor";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
    include: { sections: { orderBy: { order: "asc" } }, hero: true },
  });
  if (!page) notFound();
  return <PageEditor page={page} />;
}
