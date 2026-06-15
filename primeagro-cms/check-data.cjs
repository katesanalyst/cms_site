const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const sections = await prisma.section.findMany({ select: { id: true, title: true, type: true, badge: true }, orderBy: { order: "asc" } });
  sections.forEach(s => console.log(`${s.title} (${s.type}) badge=${s.badge}`));
  
  // Check sustainImage setting
  const img = await prisma.siteSetting.findFirst({ where: { key: "sustainImage" } });
  console.log("\nsustainImage setting:", img ? img.value : "NOT SET");
  
  // Check hero for homepage
  const page = await prisma.page.findFirst({ where: { slug: "homepage" } });
  const hero = await prisma.hero.findFirst({ where: { pageId: page.id } });
  console.log("Homepage hero bgType:", hero?.bgType);
  console.log("Homepage hero bgImage:", hero?.bgImage);
  console.log("Homepage hero videoUrl:", hero?.videoUrl);
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
