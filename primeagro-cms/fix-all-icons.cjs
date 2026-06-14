const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Fix ALL sections with broken items/badgeIcons
  const allSections = await prisma.section.findMany();
  
  for (const s of allSections) {
    let updated = false;
    const data = {};
    
    // Fix badgeIcon if it contains question marks (corrupted emoji)
    if (s.badgeIcon && (s.badgeIcon.includes("?") || s.badgeIcon.length > 4)) {
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
        "Farming Focus": "Farm",
        "Stats": "Stats",
        "CTA": "Start",
      };
      data.badgeIcon = iconMap[s.title] || "Info";
      updated = true;
    }
    
    // Fix items if they contain corrupted emojis
    if (s.items && s.items.includes("?")) {
      try {
        const items = JSON.parse(s.items);
        const fixedItems = items.map(item => ({
          ...item,
          icon: item.icon && item.icon.includes("?") ? item.title.substring(0, 3) : item.icon
        }));
        data.items = JSON.stringify(fixedItems);
        updated = true;
      } catch(e) {
        console.log("Could not parse items for section:", s.title);
      }
    }
    
    if (updated) {
      await prisma.section.update({ where: { id: s.id }, data });
      console.log("Fixed section:", s.title);
    }
  }
  
  console.log("Done fixing sections");
}

main().catch(console.error).finally(() => prisma.$disconnect());
