const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const sections = await prisma.section.findMany({ where: { title: "Solar Technology" } });
  for (const s of sections) {
    const items = JSON.parse(s.items || "[]");
    items.forEach((item, i) => {
      console.log(`Item ${i}: icon="${item.icon}" title="${item.title}" codepoints=${[...item.icon].map(c => c.codePointAt(0).toString(16)).join(" ")}`);
    });
  }
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
