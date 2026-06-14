import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TeamForm from "../form";

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.teamMember.findUnique({ where: { id } });
  if (!item) notFound();
  return <TeamForm item={item} />;
}
