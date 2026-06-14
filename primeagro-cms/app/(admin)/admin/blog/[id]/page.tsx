import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ItemForm from "../form";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.blogPost.findUnique({ where: { id } });
  if (!item) notFound();
  return <ItemForm item={item} />;
}
