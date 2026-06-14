const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  await prisma.navigation.updateMany({ where: { url: "/blog" }, data: { order: 6 } });
  await prisma.navigation.updateMany({ where: { url: "/gallery" }, data: { order: 7 } });
  await prisma.navigation.updateMany({ where: { url: "/contact" }, data: { order: 8 } });
  const items = await prisma.navigation.findMany({ orderBy: { order: "asc" }, select: { label: true, order: true } });
  console.log(items.map(i => `${i.order}: ${i.label}`).join("\n"));
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
