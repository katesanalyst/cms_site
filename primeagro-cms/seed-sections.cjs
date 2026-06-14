const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedSections() {
  // Get page IDs
  const pages = await prisma.page.findMany();
  const pageMap = {};
  for (const p of pages) pageMap[p.slug] = p.id;

  console.log("Found pages:", Object.keys(pageMap));

  const sections = [
    // ============ HOMEPAGE ============
    {
      pageId: pageMap["homepage"],
      type: "story",
      title: "Farming Focus",
      badge: "What We Do",
      badgeIcon: "🌾",
      heading: "The land gives what the land is given. We give it everything.",
      italicWords: "everything",
      text: "Three pillars of sustainable agriculture — premium fig cultivation, organic dehydration, and long-term mango plantations. Each one rooted in patience, harvested with care.",
      align: "center",
      light: false,
      order: 0,
      items: JSON.stringify([
        { icon: "🌿", title: "Premium Dyanna California Anjeera", text: "Exotic anjeera cultivated with organic methods for superior quality and taste." },
        { icon: "🥬", title: "Organic Dehydrated Vegetables", text: "Solar-dried vegetables preserving nutrients and flavor for year-round nutrition." },
        { icon: "🥭", title: "Mango Plantation", text: "Premium mango varieties cultivated with sustainable farming practices." },
      ]),
    },
    {
      pageId: pageMap["homepage"],
      type: "story",
      title: "Sustainability",
      badge: "Sustainability",
      badgeIcon: "☀️",
      heading: "We do not take from the sun. We simply ask it to help.",
      italicWords: "help",
      text: "Harnessing the power of the sun for sustainable farming and healthy living.",
      align: "left",
      light: false,
      order: 1,
      items: JSON.stringify(["Solar Drying Technology", "Organic Processing", "Eco-friendly Infrastructure", "Water-conscious Farming", "2027 Retail Expansion Vision"]),
    },
    {
      pageId: pageMap["homepage"],
      type: "stats",
      title: "Stats",
      badge: "",
      badgeIcon: "",
      heading: "",
      text: "",
      align: "center",
      light: false,
      order: 2,
      items: JSON.stringify([
        { num: "100%", label: "Organic Practices" },
        { num: "50+", label: "Acres of Cultivation" },
        { num: "1000+", label: "Happy Customers" },
        { num: "2027", label: "Retail Expansion Goal" },
      ]),
    },
    {
      pageId: pageMap["homepage"],
      type: "process",
      title: "Process",
      badge: "Our Process",
      badgeIcon: "🌱",
      heading: "The bees fill the comb when they are ready. We wait.",
      italicWords: "ready, wait",
      text: "From seed to table, every step is guided by nature and patience. We do not rush the harvest. We wait until the land says it is time.",
      align: "center",
      light: false,
      order: 3,
      items: JSON.stringify([
        { num: "01", title: "Seeding & Growing", text: "Organic seeds, natural fertilizers, traditional wisdom." },
        { num: "02", title: "Harvesting", text: "Hand-picked at peak ripeness for maximum nutrition." },
        { num: "03", title: "Processing", text: "Solar dehydration and cold storage for freshness." },
        { num: "04", title: "Packaging", text: "Eco-friendly packaging delivered to your doorstep." },
      ]),
    },
    {
      pageId: pageMap["homepage"],
      type: "cta",
      title: "CTA",
      badge: "Get Started",
      badgeIcon: "🌿",
      heading: "We simply obey the land. And the land obeys us back.",
      italicWords: "land, back",
      text: "Connect with us today and take the first step towards sustainable farming.",
      align: "center",
      light: true,
      order: 4,
      items: "[]",
    },

    // ============ ABOUT PAGE ============
    {
      pageId: pageMap["about"],
      type: "story",
      title: "Our Story",
      badge: "Our Story",
      badgeIcon: "🌱",
      heading: "We are not a factory. We are not a farm. We are forest keepers.",
      italicWords: "factory, farm",
      text: "Prime Agro Farms is a forward-thinking agricultural enterprise dedicated to sustainable farming, premium organic produce, and assisted farmland ownership. Based in Telangana, we cultivate premium Dyanna California Anjeera (figs), organic vegetables, and mangoes using eco-friendly methods.\n\nOur mission is to nurture the land, grow wellness, and create futures — for our customers, our community, and the planet.\n\nWith 50+ acres under cultivation and a growing network of farmland owners, we are at the forefront of the organic farming revolution in India.",
      align: "left",
      light: false,
      order: 0,
      items: JSON.stringify([
        { icon: "🌿", title: "Sustainability", text: "We practice and promote farming methods that protect the environment, conserve water, and maintain soil health for future generations." },
        { icon: "🔍", title: "Transparency", text: "Clear pricing, verified land titles, honest communication — we believe in full transparency in every transaction and relationship." },
        { icon: "⭐", title: "Quality", text: "From seed to harvest, we maintain the highest standards of organic cultivation to deliver premium quality produce to our customers." },
      ]),
    },
    {
      pageId: pageMap["about"],
      type: "story",
      title: "Vision",
      badge: "",
      badgeIcon: "",
      heading: "Our Vision 2027",
      italicWords: "",
      text: "To establish a self-sustained cultivation and solar processing ecosystem with our own retail brand for organic produce, serving health-conscious consumers across India.",
      align: "center",
      light: false,
      order: 1,
      items: "[]",
    },
    {
      pageId: pageMap["about"],
      type: "story",
      title: "Values",
      badge: "Our Values",
      badgeIcon: "⭐",
      heading: "What we believe is what we grow.",
      italicWords: "believe, grow",
      text: "",
      align: "center",
      light: false,
      order: 2,
      items: "[]",
    },
    {
      pageId: pageMap["about"],
      type: "story",
      title: "Team",
      badge: "Our Team",
      badgeIcon: "👥",
      heading: "The hands that tend the hives have never rushed.",
      italicWords: "rushed",
      text: "",
      align: "center",
      light: false,
      order: 3,
      items: "[]",
    },

    // ============ CONTACT PAGE ============
    {
      pageId: pageMap["contact"],
      type: "story",
      title: "Contact Info",
      badge: "Get in Touch",
      badgeIcon: "📞",
      heading: "Write to us. We read every word.",
      italicWords: "every word",
      text: "",
      align: "center",
      light: false,
      order: 0,
      items: "[]",
    },
    {
      pageId: pageMap["contact"],
      type: "faq",
      title: "FAQs",
      badge: "FAQs",
      badgeIcon: "❓",
      heading: "The questions people ask are the questions worth answering.",
      italicWords: "worth answering",
      text: "",
      align: "center",
      light: false,
      order: 1,
      items: "[]",
    },

    // ============ BLOG PAGE ============
    {
      pageId: pageMap["blog"],
      type: "story",
      title: "Blog",
      badge: "Blog",
      badgeIcon: "📝",
      heading: "Notes from the field. Stories the soil whispered.",
      italicWords: "whispered",
      text: "",
      align: "center",
      light: false,
      order: 0,
      items: "[]",
    },

    // ============ FARMING FOCUS PAGE ============
    {
      pageId: pageMap["farming-focus"],
      type: "benefits",
      title: "What We Offer",
      badge: "What We Offer",
      badgeIcon: "🌾",
      heading: "We do not just sell land. We grow futures.",
      italicWords: "futures",
      text: "Complete farm development support from selection to harvest.",
      align: "center",
      light: false,
      order: 0,
      items: JSON.stringify([
        { icon: "🏗️", title: "Farm Setup Assistance", text: "End-to-end support in planning and setting up your dream farm from scratch" },
        { icon: "💧", title: "Irrigation Planning", text: "Professional irrigation system design for optimal water management" },
        { icon: "🌱", title: "Plantation Support", text: "Expert guidance on crop selection and organic cultivation methods" },
        { icon: "🔧", title: "Farm Maintenance", text: "Ongoing farm maintenance services for productive land" },
        { icon: "📊", title: "Harvest & Yield Support", text: "Assistance with harvest planning and produce marketing" },
        { icon: "📜", title: "Legal & Documentation", text: "Complete legal support including title verification and registration" },
      ]),
    },
    {
      pageId: pageMap["farming-focus"],
      type: "why-choose",
      title: "Why Prime Agro",
      badge: "Why Prime Agro",
      badgeIcon: "⭐",
      heading: "Trust is not sold. It is grown, slowly, season by season.",
      italicWords: "grown, slowly",
      text: "",
      align: "center",
      light: false,
      order: 1,
      items: JSON.stringify([
        { icon: "⚖️", title: "Legal & Transparent", text: "Clear titles, transparent pricing, complete legal support" },
        { icon: "👨‍🌾", title: "Expert Farm Support", text: "10+ years of agricultural expertise at your service" },
        { icon: "📈", title: "High ROI Potential", text: "Premium organic produce ensures excellent returns" },
        { icon: "🌿", title: "Long-term Sustainability", text: "Eco-friendly practices for lasting agricultural value" },
      ]),
    },
    {
      pageId: pageMap["farming-focus"],
      type: "cta",
      title: "CTA",
      badge: "Get Started",
      badgeIcon: "🌿",
      heading: "Every forest began with a single seed. Yours begins here.",
      italicWords: "single seed, here",
      text: "Take the first step towards sustainable farming and a greener future.",
      align: "center",
      light: true,
      order: 2,
      items: "[]",
    },

    // ============ SUSTAINABILITY PAGE ============
    {
      pageId: pageMap["sustainability"],
      type: "story",
      title: "Solar Technology",
      badge: "Solar Technology",
      badgeIcon: "☀️",
      heading: "The sun does the work. We simply hold the jar.",
      italicWords: "work, jar",
      text: "We harness the power of the sun for natural dehydration of our organic produce. Our solar drying technology preserves nutrients naturally without chemical preservatives, reducing energy consumption and carbon footprint.",
      align: "center",
      light: false,
      order: 0,
      items: JSON.stringify([
        { icon: "💧", title: "Water Conservation", text: "Drip irrigation systems across all farmlands reduce water usage by up to 60% compared to traditional flood irrigation." },
        { icon: "♻️", title: "Zero Waste", text: "Organic waste is composted and reused as natural fertilizer. We strive for a closed-loop farming ecosystem." },
        { icon: "🌍", title: "Carbon Footprint", text: "Local distribution networks minimize transportation emissions. Our solar processing facility operates carbon-neutral." },
      ]),
    },
    {
      pageId: pageMap["sustainability"],
      type: "stats",
      title: "Stats",
      badge: "",
      badgeIcon: "",
      heading: "",
      text: "",
      align: "center",
      light: false,
      order: 1,
      items: JSON.stringify([
        { num: "60%", label: "Less Water Usage" },
        { num: "100%", label: "Solar Processing" },
        { num: "0", label: "Chemical Preservatives" },
      ]),
    },
    {
      pageId: pageMap["sustainability"],
      type: "cta",
      title: "CTA",
      badge: "Join Us",
      badgeIcon: "🌍",
      heading: "A forest that is loved is a forest that is kept.",
      italicWords: "",
      text: "Be part of a greener future. Invest in organic farmland and support sustainable agriculture.",
      align: "center",
      light: true,
      order: 2,
      items: "[]",
    },

    // ============ FARMLANDS PAGE ============
    {
      pageId: pageMap["farmlands"],
      type: "story",
      title: "Available Lands",
      badge: "Available Lands",
      badgeIcon: "🏞️",
      heading: "Every plot of earth has a story. These are waiting for yours.",
      italicWords: "yours",
      text: "",
      align: "center",
      light: false,
      order: 0,
      items: "[]",
    },

    // ============ GALLERY PAGE ============
    {
      pageId: pageMap["gallery"],
      type: "story",
      title: "Gallery",
      badge: "Gallery",
      badgeIcon: "📷",
      heading: "A walk through the forest tells you everything a brochure cannot.",
      italicWords: "cannot",
      text: "",
      align: "center",
      light: false,
      order: 0,
      items: "[]",
    },
    {
      pageId: pageMap["gallery"],
      type: "cta",
      title: "CTA",
      badge: "Visit Us",
      badgeIcon: "🌿",
      heading: "The forest does not show itself through a screen. Come walk it.",
      italicWords: "walk it",
      text: "Schedule a farm visit and see our operations firsthand.",
      align: "center",
      light: true,
      order: 1,
      items: "[]",
    },
  ];

  let created = 0;
  for (const section of sections) {
    if (!section.pageId) {
      console.log(`Skipping section for missing page: ${section.title}`);
      continue;
    }
    await prisma.section.create({ data: section });
    created++;
  }

  console.log(`Created ${created} sections`);
}

seedSections()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
