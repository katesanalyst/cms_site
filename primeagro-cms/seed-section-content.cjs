const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  // About page sections
  const about = await prisma.page.findFirst({ where: { slug: "about" } });
  if (about) {
    // Vision section
    const vision = await prisma.section.findFirst({ where: { pageId: about.id, title: "Vision" } });
    if (vision && (!vision.heading || vision.heading.length < 5)) {
      await prisma.section.update({ where: { id: vision.id }, data: {
        heading: "Our Vision",
        badge: "Our Vision",
        badgeIcon: "🔭",
        text: "To become India's most trusted name in organic farming and sustainable agriculture, creating a model that combines traditional wisdom with modern technology.",
        items: JSON.stringify([
          { icon: "🌱", title: "Organic by 2030", text: "100% organic certification across all farm operations" },
          { icon: "☀️", title: "Carbon Neutral", text: "Achieve carbon neutrality through solar processing" },
          { icon: "🤝", title: "Community First", text: "Empower 1000+ farming families across South India" }
        ])
      }});
      console.log("Updated Vision section");
    }

    // Values section
    const values = await prisma.section.findFirst({ where: { pageId: about.id, title: "Values" } });
    if (values && (!values.heading || values.heading.length < 5)) {
      await prisma.section.update({ where: { id: values.id }, data: {
        heading: "Our Core Values",
        badge: "Our Values",
        badgeIcon: "💎",
        text: "Every decision we make is guided by our commitment to the land, our people, and future generations.",
        items: JSON.stringify([
          { icon: "🌿", title: "Sustainability", text: "Environmental stewardship in everything we do" },
          { icon: "🤝", title: "Integrity", text: "Transparent practices and honest relationships" },
          { icon: "💡", title: "Innovation", text: "Blending tradition with modern sustainable methods" },
          { icon: "❤️", title: "Community", text: "Supporting local farmers and rural livelihoods" }
        ])
      }});
      console.log("Updated Values section");
    }

    // Team section
    const team = await prisma.section.findFirst({ where: { pageId: about.id, title: "Team" } });
    if (team && (!team.heading || team.heading.length < 5)) {
      await prisma.section.update({ where: { id: team.id }, data: {
        heading: "Meet Our Team",
        badge: "Our Team",
        badgeIcon: "👥",
        text: "Passionate individuals dedicated to transforming Indian agriculture through sustainable practices."
      }});
      console.log("Updated Team section");
    }
  }

  // Contact page sections
  const contact = await prisma.page.findFirst({ where: { slug: "contact" } });
  if (contact) {
    const contactInfo = await prisma.section.findFirst({ where: { pageId: contact.id, title: "Contact Info" } });
    if (contactInfo && (!contactInfo.heading || contactInfo.heading.length < 5)) {
      await prisma.section.update({ where: { id: contactInfo.id }, data: {
        heading: "Get in Touch",
        badge: "Contact Us",
        badgeIcon: "📞",
        text: "We'd love to hear from you. Reach out for inquiries, farm visits, or partnership opportunities.",
        items: JSON.stringify([
          { icon: "📞", title: "Phone", text: "+91 98765 43210" },
          { icon: "✉️", title: "Email", text: "info@primeagrofarms.com" },
          { icon: "📍", title: "Location", text: "Hyderabad, Telangana, India" },
          { icon: "⏰", title: "Hours", text: "Mon-Sat: 9:00 AM - 6:00 PM" }
        ])
      }});
      console.log("Updated Contact Info section");
    }

    const contactFaq = await prisma.section.findFirst({ where: { pageId: contact.id, type: "faq" } });
    if (contactFaq && (!contactFaq.items || contactFaq.items === "[]")) {
      await prisma.section.update({ where: { id: contactFaq.id }, data: {
        items: JSON.stringify([
          { question: "How do I schedule a farm visit?", answer: "Use the consultation form on this page or call us directly. We'll arrange a visit within 48 hours.", category: "Visit" },
          { question: "Do you ship organic products?", answer: "Yes, we ship across India. Contact us for bulk orders and international shipping.", category: "Products" },
          { question: "What are the farmland investment options?", answer: "We offer plots from 1 acre onwards with full farm setup support. Contact us for current availability.", category: "Investment" }
        ])
      }});
      console.log("Updated Contact FAQs");
    }
  }

  // Farmlands page
  const farmlands = await prisma.page.findFirst({ where: { slug: "farmlands" } });
  if (farmlands) {
    const lands = await prisma.section.findFirst({ where: { pageId: farmlands.id, title: "Available Lands" } });
    if (lands && (!lands.heading || lands.heading.length < 5)) {
      await prisma.section.update({ where: { id: lands.id }, data: {
        heading: "Available Farmland Opportunities",
        badge: "Farmlands",
        badgeIcon: "🏞️",
        text: "Invest in certified organic farmland with complete farm setup assistance and ongoing support."
      }});
      console.log("Updated Available Lands section");
    }
  }

  console.log("Done seeding section content");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
