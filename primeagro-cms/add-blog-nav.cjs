const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const existing = await prisma.navigation.findFirst({ where: { url: "/blog" } });
  if (existing) { console.log("Blog nav already exists"); return; }
  const last = await prisma.navigation.findFirst({ orderBy: { order: "desc" } });
  const order = last ? last.order + 1 : 6;
  const r = await prisma.navigation.create({ data: { id: "nav-blog-001", label: "Blog", url: "/blog", order, published: true } });
  console.log("Created Blog nav:", r.id, r.label, r.order);
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
