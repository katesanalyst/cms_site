const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  // Fix card icons
  const sections = await prisma.section.findMany({ where: { title: "Sustainability Cards" } });
  for (const s of sections) {
    const items = JSON.parse(s.items || "[]");
    const fixed = items.map(item => ({
      ...item,
      icon: item.icon === "Water" ? "💧" :
            item.icon === "Zero" ? "♻️" :
            item.icon === "Earth" ? "🌍" :
            item.icon === "Carbon" ? "🌱" :
            item.icon === "Solar" ? "☀️" :
            item.icon === "Organic" ? "🌿" :
            item.icon === "Eco" ? "🍃" :
            item.icon === "Energy" ? "⚡" :
            item.icon
    }));
    await prisma.section.update({ where: { id: s.id }, data: { items: JSON.stringify(fixed) } });
    console.log("Fixed icons:", fixed.map(i => i.icon + " " + i.title).join(", "));
  }

  // Check all sections for broken emoji icons
  const allSections = await prisma.section.findMany({ where: { items: { not: null } } });
  for (const s of allSections) {
    const items = JSON.parse(s.items || "[]");
    let changed = false;
    const fixed = items.map(item => {
      if (item.icon && !item.icon.match(/[\u{1F000}-\u{1FFFF}]/u) && !item.icon.match(/[\u2600-\u27BF]/) && item.icon.length <= 10 && !item.icon.startsWith("<")) {
        // Text-based icon that should be emoji
        const map = {
          "Water": "💧", "Zero": "♻️", "Earth": "🌍", "Carbon": "🌱",
          "Solar": "☀️", "Organic": "🌿", "Eco": "🍃", "Energy": "⚡",
          "phone": "📞", "email": "✉️", "location": "📍"
        };
        if (map[item.icon]) { changed = true; return { ...item, icon: map[item.icon] }; }
      }
      return item;
    });
    if (changed) {
      await prisma.section.update({ where: { id: s.id }, data: { items: JSON.stringify(fixed) } });
      console.log("Fixed section:", s.title);
    }
  }
  console.log("Done fixing icons");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
