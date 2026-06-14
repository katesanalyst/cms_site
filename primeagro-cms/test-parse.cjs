const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findFirst({ where: { slug: "sustainability" } });
  const section = await prisma.section.findFirst({ where: { pageId: page.id, title: "Solar Technology" } });
  
  console.log("Section type:", typeof section.items);
  console.log("Items length:", section.items.length);
  console.log("Items:", section.items);
  
  try {
    const parsed = JSON.parse(section.items);
    console.log("PARSE SUCCESS:", parsed.length, "items");
    parsed.forEach(i => console.log("  -", i.title, "icon:", i.icon));
  } catch(e) {
    console.log("PARSE FAILED:", e.message);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
