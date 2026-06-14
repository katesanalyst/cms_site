import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import LandForm from "../form";

export default async function EditLandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.farmLand.findUnique({ where: { id } });
  if (!item) notFound();
  return <LandForm item={item} />;
}
