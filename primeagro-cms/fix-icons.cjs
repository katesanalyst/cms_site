const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findFirst({ where: { slug: "sustainability" } });
  if (!page) { console.log("No sustainability page"); return; }

  const section = await prisma.section.findFirst({ where: { pageId: page.id, title: "Solar Technology" } });
  if (!section) { console.log("No Solar Technology section"); return; }

  const items = JSON.stringify([
    { icon: "Water", title: "Water Conservation", text: "Drip irrigation systems across all farmlands reduce water usage by up to 60% compared to traditional flood irrigation." },
    { icon: "Zero", title: "Zero Waste", text: "Organic waste is composted and reused as natural fertilizer. We strive for a closed-loop farming ecosystem." },
    { icon: "Earth", title: "Carbon Footprint", text: "Local distribution networks minimize transportation emissions. Our solar processing facility operates carbon-neutral." }
  ]);

  await prisma.section.update({ where: { id: section.id }, data: { items } });
  console.log("Updated Solar Technology section items");

  const statsSection = await prisma.section.findFirst({ where: { pageId: page.id, title: "Stats" } });
  if (statsSection) {
    const statsItems = JSON.stringify([
      { num: "60%", label: "Less Water Usage" },
      { num: "100%", label: "Solar Processing" },
      { num: "0", label: "Chemical Preservatives" }
    ]);
    await prisma.section.update({ where: { id: statsSection.id }, data: { items: statsItems } });
    console.log("Updated Stats section items");
  }

  // Also fix all sections with broken emoji icons
  const allSections = await prisma.section.findMany();
  for (const s of allSections) {
    if (s.badgeIcon && s.badgeIcon.includes("?")) {
      const iconMap = {
        "Sustainability": "Sun",
        "What We Do": "Farm",
        "Our Process": "Growth",
        "Get Started": "Start",
        "Our Story": "Story",
        "Our Vision": "Vision",
        "Our Values": "Values",
        "Our Team": "Team",
        "Gallery": "Gallery",
        "FAQs": "FAQ",
        "Why Prime Agro": "Star",
        "What We Offer": "Farm",
        "Solar Technology": "Sun",
        "Join Us": "Earth",
        "Contact Info": "Contact",
      };
      const newIcon = iconMap[s.title] || "Info";
      await prisma.section.update({ where: { id: s.id }, data: { badgeIcon: newIcon } });
      console.log("Fixed icon for section:", s.title, "->", newIcon);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
