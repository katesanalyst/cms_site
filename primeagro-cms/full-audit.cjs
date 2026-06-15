const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  console.log("=== ALL SETTINGS ===");
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  settings.forEach(s => console.log(`  ${s.key} = ${s.value?.substring(0, 60) || "(empty)"}`));

  console.log("\n=== ALL PAGES ===");
  const pages = await prisma.page.findMany({ orderBy: { slug: "asc" } });
  for (const p of pages) {
    const sections = await prisma.section.findMany({ where: { pageId: p.id }, orderBy: { order: "asc" } });
    const hero = await prisma.hero.findFirst({ where: { pageId: p.id } });
    console.log(`\n📄 ${p.title} (${p.slug}) id=${p.id}`);
    console.log(`   Hero: ${hero ? hero.bgType + " | " + (hero.heading || "").substring(0, 50) : "MISSING"}`);
    console.log(`   Sections (${sections.length}):`);
    sections.forEach((s, i) => {
      const items = s.items ? JSON.parse(s.items) : [];
      console.log(`     ${i + 1}. [${s.type}] ${s.title || "(no title)"} badge="${s.badge}" items=${items.length}`);
    });
    if (sections.length === 0) console.log("     (no sections)");
  }

  console.log("\n=== NAVIGATION ===");
  const nav = await prisma.navigation.findMany({ orderBy: { order: "asc" } });
  nav.forEach(n => console.log(`  ${n.order}. ${n.label} → ${n.url}`));

  console.log("\n=== FOOTER ===");
  const footer = await prisma.footerSection.findMany({ orderBy: { order: "asc" } });
  footer.forEach(f => console.log(`  ${f.order}. [${f.type}] ${f.title}`));
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
