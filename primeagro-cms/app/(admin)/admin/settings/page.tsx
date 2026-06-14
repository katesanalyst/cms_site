import { prisma } from "@/lib/prisma";
import SettingsForm from "./form";

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  const data: Record<string, string> = {};
  for (const s of settings) data[s.key] = s.value || "";

  return <SettingsForm data={data} />;
}
