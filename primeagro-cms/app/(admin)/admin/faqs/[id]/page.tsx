import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FAQForm from "../form";

export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.faq.findUnique({ where: { id } });
  if (!item) notFound();
  return <FAQForm item={item} />;
}
