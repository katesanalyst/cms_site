const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("=== Multi-Brand Migration: Starting ===\n");

  // 1. Create default brand
  const brand = await prisma.brand.upsert({
    where: { slug: "primeagro" },
    update: {},
    create: {
      name: "Prime Agro Farms",
      slug: "primeagro",
      subdomain: "primeagro",
      description: "Sustainable organic farming, premium produce & assisted farmland ownership.",
      primaryColor: "#3a6b35",
      secondaryColor: "#d4a853",
      accentColor: "#faf8f5",
      industry: "agriculture",
    },
  });
  console.log(`Default brand: ${brand.name} (${brand.id})`);

  // 2. Backfill all tables with brandId
  const tables = [
    { model: "page", findMany: "findMany" },
    { model: "farmProduct", findMany: "findMany" },
    { model: "farmLand", findMany: "findMany" },
    { model: "testimonial", findMany: "findMany" },
    { model: "teamMember", findMany: "findMany" },
    { model: "galleryItem", findMany: "findMany" },
    { model: "blogPost", findMany: "findMany" },
    { model: "service", findMany: "findMany" },
    { model: "faq", findMany: "findMany" },
    { model: "siteSetting", findMany: "findMany" },
    { model: "navigation", findMany: "findMany" },
    { model: "footerSection", findMany: "findMany" },
    { model: "lead", findMany: "findMany" },
    { model: "media", findMany: "findMany" },
    { model: "seoMeta", findMany: "findMany" },
    { model: "newsletterSubscriber", findMany: "findMany" },
  ];

  for (const table of tables) {
    try {
      const items = await prisma[table.model].findMany();
      let updated = 0;
      for (const item of items) {
        if (!item.brandId) {
          await prisma[table.model].update({
            where: { id: item.id },
            data: { brandId: brand.id },
          });
          updated++;
        }
      }
      console.log(`${table.model}: ${items.length} total, ${updated} updated`);
    } catch (e) {
      console.log(`${table.model}: SKIPPED (${e.message?.substring(0, 60)})`);
    }
  }

  console.log("\n=== Multi-Brand Migration: Complete ===");
}

main()
  .catch((e) => { console.error("Migration failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
