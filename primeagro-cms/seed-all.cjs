const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("=== Unified Seed: Starting ===\n");

  // ============================================================
  // PART 0: Default Brand
  // ============================================================
  console.log("--- Part 0: Default Brand ---");

  const brand = await prisma.brand.upsert({
    where: { slug: "primeagro" },
    update: {},
    create: {
      name: "Prime Agro Farms",
      slug: "primeagro",
      description: "Sustainable organic farming and premium produce",
      logo: "/images/logo.svg",
    },
  });
  console.log("Default brand:", brand.name, brand.id);

  const BID = brand.id;

  // ============================================================
  // PART 1: Base Data (from seed.cjs)
  // ============================================================
  console.log("\n--- Part 1: Base Data ---");

  const password = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@primeagrofarms.com" },
    update: {},
    create: { email: "admin@primeagrofarms.com", name: "Admin", password, role: "admin" },
  });
  console.log("Admin user:", admin.email);

  const settings = [
    { key: "companyName", value: "Prime Agro Farms" },
    { key: "tagline", value: "Sustainable Farming for a Healthier Future" },
    { key: "phone", value: "+91 9876543210" },
    { key: "whatsapp", value: "+91 9876543210" },
    { key: "email", value: "info@primeagrofarms.com" },
    { key: "address", value: "Hyderabad, Telangana, India" },
    { key: "workingHours", value: "Mon-Sat: 9:00 AM - 6:00 PM" },
    { key: "facebookUrl", value: "#" },
    { key: "instagramUrl", value: "#" },
    { key: "youtubeUrl", value: "#" },
    { key: "linkedinUrl", value: "#" },
    { key: "copyrightText", value: "© 2026 Prime Agro Farms. All rights reserved." },
    { key: "footerDescription", value: "Committed to sustainable organic farming and building a healthier future through premium produce and farmland ownership." },
    { key: "heroTag", value: "Sustainable Farming" },
    { key: "heroHeading", value: "Cultivating Tomorrow's\nHarvest Today" },
    { key: "heroText", value: "Premium organic farming, Dyanna California Anjeera cultivation, and assisted dream farmland ownership for a sustainable tomorrow." },
    { key: "heroImage", value: "/images/hero-bg.svg" },
    { key: "heroShowSoundToggle", value: "false" },
    { key: "sustainText", value: "At Prime Agro Farms, sustainability isn't just a practice—it's our philosophy. Our solar-powered processing unit ensures zero-waste, eco-friendly farming from seed to shelf." },
    { key: "sustainImage", value: "/images/sustainability.svg" },
    { key: "sustainBoxTitle", value: "Solar Processing Unit" },
    { key: "sustainBoxText", value: "State-of-the-art solar dehydration facility for premium organic produce." },
    { key: "ctaText", value: "Ready to invest in sustainable agriculture? Connect with us today." },
    { key: "anjeeraImage", value: "/images/anjeera.svg" },
    { key: "dehydratedImage", value: "/images/dehydrated.svg" },
    { key: "mangoImage", value: "/images/mango.svg" },
    { key: "logoInitial", value: "P" },
    { key: "logoName", value: "Prime Agro" },
    { key: "logoSubtitle", value: "Farms" },
    { key: "newsletterHeading", value: "Subscribe to Our Newsletter" },
    { key: "newsletterDescription", value: "" },
    { key: "newsletterPlaceholder", value: "Enter your email" },
    { key: "newsletterButtonText", value: "Subscribe" },
    { key: "footerQuickLinksTitle", value: "Quick Links" },
    { key: "footerServicesTitle", value: "Our Services" },
    { key: "footerContactTitle", value: "Contact" },
    { key: "privacyPolicyUrl", value: "#" },
    { key: "termsUrl", value: "#" },
    { key: "defaultMetaTitle", value: "Prime Agro Farms | Sustainable Organic Farming" },
    { key: "defaultMetaDescription", value: "Premium organic farming, Dyanna California Anjeera cultivation, and assisted dream farmland ownership for a sustainable tomorrow." },
    { key: "defaultMetaKeywords", value: "organic farming Hyderabad, farm lands for sale, organic Anjeera, dehydrated vegetables, sustainable farming India" },
    { key: "priceBannerText", value: "Starting from ₹9 Lakhs per Acre" },
    { key: "priceBannerDisclaimer", value: "*Subject to availability, based on location and development scope" },
    { key: "consultFormTitle", value: "Book a Free Consultation" },
    { key: "consultFormText", value: "Let's build your dream farm together. Fill in your details and our team will get back to you within 24 hours." },
    { key: "consultFormButton", value: "Schedule a Visit" },
    { key: "consultFormBadges", value: "100% Free|Expert Guidance|No Obligation" },
  ];

  for (const s of settings) {
    const existing = await prisma.siteSetting.findFirst({ where: { key: s.key, brandId: BID } });
    if (!existing) await prisma.siteSetting.create({ data: { ...s, brandId: BID } });
  }
  console.log(`Settings: ${settings.length} (skipped existing)`);

  const pages = [
    { slug: "homepage", title: "Homepage", published: true, metaTitle: "Prime Agro Farms | Sustainable Organic Farming", metaDescription: "Premium organic farming, Dyanna California Anjeera cultivation, and assisted dream farmland ownership for a sustainable tomorrow." },
    { slug: "about", title: "About Us", published: true, metaTitle: "About Us | Our Story & Mission", metaDescription: "Learn about Prime Agro Farms - our mission, values, and 30+ years of sustainable organic farming in Tamil Nadu." },
    { slug: "farming-focus", title: "Farming Focus", published: true, metaTitle: "Farming Focus | Premium Organic Produce", metaDescription: "Explore our farming focus - Dyanna California Anjeera, organic dehydrated vegetables, and sustainable mango plantations." },
    { slug: "sustainability", title: "Sustainability", published: true, metaTitle: "Sustainability | Solar-Powered Organic Farming", metaDescription: "Our commitment to sustainability - solar-powered processing, organic methods, and eco-friendly farming practices." },
    { slug: "farmlands", title: "Farmlands", published: true, metaTitle: "Farmland Opportunities | Invest in Organic Farming", metaDescription: "Discover premium farmland investment opportunities with expert farm setup assistance and sustainable development." },
    { slug: "gallery", title: "Gallery", published: true, metaTitle: "Gallery | Farms, Products & Events", metaDescription: "Explore our farms, products, team, and events through photos and videos." },
    { slug: "blog", title: "Blog", published: true, metaTitle: "Blog & Insights | Farming News", metaDescription: "Latest news, insights, and stories from Prime Agro Farms - organic farming, sustainable agriculture, and more." },
    { slug: "contact", title: "Contact", published: true, metaTitle: "Contact Us | Get in Touch", metaDescription: "Get in touch with Prime Agro Farms - WhatsApp, email, or visit our farms in Coimbatore, Tamil Nadu." },
  ];

  const createdPages = {};
  for (const p of pages) {
    const existing = await prisma.page.findFirst({ where: { slug: p.slug, brandId: BID } });
    if (existing) { createdPages[p.slug] = existing; }
    else { const page = await prisma.page.create({ data: { ...p, brandId: BID } }); createdPages[p.slug] = page; }
  }
  console.log(`Pages: ${pages.length} (skipped existing)`);

  const heroes = [
    { pageId: createdPages["homepage"].id, tag: "Sustainable Farming", heading: "Cultivating Tomorrow's Harvest Today", subheading: "Premium organic farming and assisted dream farmland ownership", bgType: "video", bgImage: "/images/hero-bg.svg", videoUrl: "https://www.youtube.com/watch?v=BLcytD5R2Sg", videoType: "youtube", overlayOpacity: 40, textColor: "white", textAlign: "left", buttons: JSON.stringify([{ text: "Explore Our Farms", href: "/farming-focus", variant: "primary" }, { text: "Schedule a Farm Visit", href: "/contact", variant: "outline" }]) },
    { pageId: createdPages["about"].id, tag: "About Us", heading: "Who We Are", subheading: "Building a sustainable future through organic farming", bgType: "image", bgImage: "/images/about-hero.svg", overlayOpacity: 40, textColor: "white", textAlign: "left" },
    { pageId: createdPages["farming-focus"].id, tag: "Farming Focus", heading: "Own Your Dream Farmland", subheading: "Premium farmland investments with expert support", bgType: "image", bgImage: "/images/farming-hero.svg", overlayOpacity: 40, textColor: "white", textAlign: "left" },
    { pageId: createdPages["sustainability"].id, tag: "Sustainability", heading: "Sustainability at Prime Agro Farms", subheading: "Eco-friendly farming from seed to shelf", bgType: "image", bgImage: "/images/sustainability-hero.svg", overlayOpacity: 40, textColor: "white", textAlign: "left" },
    { pageId: createdPages["farmlands"].id, tag: "Farmlands", heading: "Farmland Opportunities", subheading: "Invest in certified organic farmland", bgType: "image", bgImage: "/images/farmlands-hero.svg", overlayOpacity: 40, textColor: "white", textAlign: "left" },
    { pageId: createdPages["gallery"].id, tag: "Gallery", heading: "Gallery & Videos", subheading: "Explore our farms, products, and events", bgType: "image", bgImage: "/images/gallery-hero.svg", overlayOpacity: 40, textColor: "white", textAlign: "left" },
    { pageId: createdPages["blog"].id, tag: "Blog", heading: "Blog & Insights", subheading: "Latest news and articles from Prime Agro Farms", bgType: "image", bgImage: "/images/blog-hero.svg", overlayOpacity: 40, textColor: "white", textAlign: "left" },
    { pageId: createdPages["contact"].id, tag: "Contact", heading: "Contact Us", subheading: "Get in touch with our team", bgType: "image", bgImage: "/images/contact-hero.svg", overlayOpacity: 40, textColor: "white", textAlign: "left" },
  ];

  for (const h of heroes) {
    const existing = await prisma.hero.findFirst({ where: { pageId: h.pageId, brandId: BID } });
    if (existing) {
      await prisma.hero.update({ where: { id: existing.id }, data: h });
    } else {
      await prisma.hero.create({ data: { ...h, brandId: BID } });
    }
  }
  console.log(`Heroes: ${heroes.length} (upserted)`);

  const navItems = [
    { label: "Home", url: "/", order: 0 },
    { label: "About Us", url: "/about", order: 1 },
    { label: "Farming Focus", url: "/farming-focus", order: 2 },
    { label: "Sustainability", url: "/sustainability", order: 3 },
    { label: "Farmlands", url: "/farmlands", order: 4 },
    { label: "Blog", url: "/blog", order: 5 },
    { label: "Gallery", url: "/gallery", order: 6 },
    { label: "Contact", url: "/contact", order: 7 },
  ];

  for (const n of navItems) {
    const existing = await prisma.navigation.findFirst({ where: { label: n.label, brandId: BID } });
    if (!existing) await prisma.navigation.create({ data: { ...n, brandId: BID } });
  }
  console.log(`Navigation: ${navItems.length} items (skipped existing)`);

  const testimonials = [
    { clientName: "Rajesh Kumar", location: "Hyderabad", rating: 5, text: "Prime Agro Farms helped me invest in premium farmland. The support and guidance throughout the process was exceptional.", published: true },
    { clientName: "Priya Sharma", location: "Bangalore", rating: 5, text: "The organic produce quality is outstanding. Their solar-powered processing ensures the best products reach us.", published: true },
    { clientName: "Mahesh Reddy", location: "Vijayawada", rating: 4, text: "Great investment opportunity with transparent documentation. The farm setup assistance is very helpful.", published: true },
  ];
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    const existing = await prisma.testimonial.findFirst({ where: { clientName: t.clientName, brandId: BID } });
    if (!existing) await prisma.testimonial.create({ data: { ...t, brandId: BID, order: i } });
  }
  console.log("Testimonials: 3 (skipped existing)");

  const team = [
    { name: "Srikanth Reddy", role: "Founder & CEO", department: "Leadership", bio: "Visionary leader with 15+ years in agriculture and sustainable farming." },
    { name: "Lakshmi Devi", role: "Head of Operations", department: "Operations", bio: "Expert in organic farming operations and supply chain management." },
    { name: "Venkat Rao", role: "Chief Agronomist", department: "Agriculture", bio: "Agricultural scientist specializing in sustainable crop management." },
  ];
  for (let i = 0; i < team.length; i++) {
    const t = team[i];
    const existing = await prisma.teamMember.findFirst({ where: { name: t.name, brandId: BID } });
    if (!existing) await prisma.teamMember.create({ data: { ...t, brandId: BID, displayOrder: i } });
  }
  console.log("Team: 3 (skipped existing)");

  const faqs = [
    { question: "What is the minimum land size available?", answer: "We offer farmland starting from 1 acre. Contact us for detailed pricing and availability.", category: "Farmland", published: true },
    { question: "Do you offer financing options?", answer: "Yes, we partner with leading banks to provide flexible financing options for farmland purchases.", category: "Farmland", published: true },
    { question: "What post-purchase support do you provide?", answer: "We provide complete farm setup assistance, irrigation planning, plantation support, and ongoing maintenance guidance.", category: "Support", published: true },
    { question: "Can I visit the farm before purchasing?", answer: "Absolutely! We encourage farm visits. Schedule a visit through our contact page.", category: "General", published: true },
    { question: "Are your products certified organic?", answer: "Yes, all our products are certified organic and processed in our solar-powered facility.", category: "Products", published: true },
  ];
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i];
    const existing = await prisma.faq.findFirst({ where: { question: f.question, brandId: BID } });
    if (!existing) await prisma.faq.create({ data: { ...f, brandId: BID, displayOrder: i } });
  }
  console.log("FAQs: 5 (skipped existing)");

  const footerSections = [
    { type: "brand", title: "Prime Agro Farms", items: JSON.stringify([{ text: "Committed to sustainable organic farming and building a healthier future." }]), order: 0 },
    { type: "quick-links", title: "Quick Links", items: JSON.stringify([{ label: "About Us", url: "/about" }, { label: "Farming Focus", url: "/farming-focus" }, { label: "Farmlands", url: "/farmlands" }, { label: "Gallery", url: "/gallery" }, { label: "Contact", url: "/contact" }]), order: 1 },
    { type: "services", title: "Our Services", items: JSON.stringify([{ label: "Organic Farming" }, { label: "Farm Land Sales" }, { label: "Consultation" }, { label: "Organic Products" }, { label: "Solar Processing" }]), order: 2 },
    { type: "contact", title: "Contact Info", items: JSON.stringify([{ icon: "phone", text: "+91 9876543210" }, { icon: "email", text: "info@primeagrofarms.com" }, { icon: "location", text: "Hyderabad, Telangana" }]), order: 3 },
  ];
  for (const f of footerSections) {
    const existing = await prisma.footerSection.findFirst({ where: { type: f.type, brandId: BID } });
    if (!existing) await prisma.footerSection.create({ data: { ...f, brandId: BID } });
  }
  console.log("Footer: 4 sections (skipped existing)");

  // ============================================================
  // PART 2: Sections (from seed-sections.cjs)
  // ============================================================
  console.log("\n--- Part 2: Page Sections ---");

  const pageMap = {};
  for (const p of pages) {
    const dbPage = await prisma.page.findFirst({ where: { slug: p.slug } });
    if (dbPage) pageMap[p.slug] = dbPage.id;
  }

  const sections = [
    // HOMEPAGE
    { pageId: pageMap["homepage"], type: "story", title: "Farming Focus", badge: "What We Do", badgeIcon: "🌾", heading: "The land gives what the land is given. We give it everything.", italicWords: "everything", text: "Three pillars of sustainable agriculture — premium fig cultivation, organic dehydration, and long-term mango plantations. Each one rooted in patience, harvested with care.", align: "center", light: false, order: 0, items: JSON.stringify([{ icon: "🌿", title: "Premium Dyanna California Anjeera", text: "Exotic anjeera cultivated with organic methods for superior quality and taste." }, { icon: "🥬", title: "Organic Dehydrated Vegetables", text: "Solar-dried vegetables preserving nutrients and flavor for year-round nutrition." }, { icon: "🥭", title: "Mango Plantation", text: "Premium mango varieties cultivated with sustainable farming practices." }]) },
    { pageId: pageMap["homepage"], type: "story", title: "Sustainability", badge: "Sustainability", badgeIcon: "☀️", heading: "We do not take from the sun. We simply ask it to help.", italicWords: "help", text: "Harnessing the power of the sun for sustainable farming and healthy living.", align: "left", light: false, order: 1, items: JSON.stringify(["Solar Drying Technology", "Organic Processing", "Eco-friendly Infrastructure", "Water-conscious Farming", "2027 Retail Expansion Vision"]) },
    { pageId: pageMap["homepage"], type: "stats", title: "Stats", badge: "", badgeIcon: "", heading: "", text: "", align: "center", light: false, order: 2, items: JSON.stringify([{ num: "100%", label: "Organic Practices" }, { num: "50+", label: "Acres of Cultivation" }, { num: "1000+", label: "Happy Customers" }, { num: "2027", label: "Retail Expansion Goal" }]) },
    { pageId: pageMap["homepage"], type: "process", title: "Process", badge: "Our Process", badgeIcon: "🌱", heading: "The bees fill the comb when they are ready. We wait.", italicWords: "ready, wait", text: "From seed to table, every step is guided by nature and patience. We do not rush the harvest. We wait until the land says it is time.", align: "center", light: false, order: 3, items: JSON.stringify([{ num: "01", title: "Seeding & Growing", text: "Organic seeds, natural fertilizers, traditional wisdom." }, { num: "02", title: "Harvesting", text: "Hand-picked at peak ripeness for maximum nutrition." }, { num: "03", title: "Processing", text: "Solar dehydration and cold storage for freshness." }, { num: "04", title: "Packaging", text: "Eco-friendly packaging delivered to your doorstep." }]) },
    { pageId: pageMap["homepage"], type: "cta", title: "CTA", badge: "Get Started", badgeIcon: "🌿", heading: "We simply obey the land. And the land obeys us back.", italicWords: "land, back", text: "Connect with us today and take the first step towards sustainable farming.", align: "center", light: true, order: 4, items: "[]" },

    // ABOUT PAGE
    { pageId: pageMap["about"], type: "story", title: "Our Story", badge: "Our Story", badgeIcon: "🌱", heading: "We are not a factory. We are not a farm. We are forest keepers.", italicWords: "factory, farm", text: "Prime Agro Farms is a forward-thinking agricultural enterprise dedicated to sustainable farming, premium organic produce, and assisted farmland ownership. Based in Telangana, we cultivate premium Dyanna California Anjeera (figs), organic vegetables, and mangoes using eco-friendly methods.\n\nOur mission is to nurture the land, grow wellness, and create futures — for our customers, our community, and the planet.\n\nWith 50+ acres under cultivation and a growing network of farmland owners, we are at the forefront of the organic farming revolution in India.", align: "left", light: false, order: 0, items: JSON.stringify([{ icon: "🌿", title: "Sustainability", text: "We practice and promote farming methods that protect the environment, conserve water, and maintain soil health for future generations." }, { icon: "🔍", title: "Transparency", text: "Clear pricing, verified land titles, honest communication — we believe in full transparency in every transaction and relationship." }, { icon: "⭐", title: "Quality", text: "From seed to harvest, we maintain the highest standards of organic cultivation to deliver premium quality produce to our customers." }]) },
    { pageId: pageMap["about"], type: "story", title: "Vision", badge: "", badgeIcon: "", heading: "Our Vision 2027", italicWords: "", text: "To establish a self-sustained cultivation and solar processing ecosystem with our own retail brand for organic produce, serving health-conscious consumers across India.", align: "center", light: false, order: 1, items: "[]" },
    { pageId: pageMap["about"], type: "story", title: "Values", badge: "Our Values", badgeIcon: "⭐", heading: "What we believe is what we grow.", italicWords: "believe, grow", text: "", align: "center", light: false, order: 2, items: "[]" },
    { pageId: pageMap["about"], type: "story", title: "Team", badge: "Our Team", badgeIcon: "👥", heading: "The hands that tend the hives have never rushed.", italicWords: "rushed", text: "", align: "center", light: false, order: 3, items: "[]" },

    // CONTACT PAGE
    { pageId: pageMap["contact"], type: "story", title: "Contact Info", badge: "Get in Touch", badgeIcon: "📞", heading: "Write to us. We read every word.", italicWords: "every word", text: "", align: "center", light: false, order: 0, items: "[]" },
    { pageId: pageMap["contact"], type: "faq", title: "FAQs", badge: "FAQs", badgeIcon: "❓", heading: "The questions people ask are the questions worth answering.", italicWords: "worth answering", text: "", align: "center", light: false, order: 1, items: "[]" },

    // BLOG PAGE
    { pageId: pageMap["blog"], type: "story", title: "Blog", badge: "Blog", badgeIcon: "📝", heading: "Notes from the field. Stories the soil whispered.", italicWords: "whispered", text: "", align: "center", light: false, order: 0, items: "[]" },

    // FARMING FOCUS PAGE
    { pageId: pageMap["farming-focus"], type: "benefits", title: "What We Offer", badge: "What We Offer", badgeIcon: "🌾", heading: "We do not just sell land. We grow futures.", italicWords: "futures", text: "Complete farm development support from selection to harvest.", align: "center", light: false, order: 0, items: JSON.stringify([{ icon: "🏗️", title: "Farm Setup Assistance", text: "End-to-end support in planning and setting up your dream farm from scratch" }, { icon: "💧", title: "Irrigation Planning", text: "Professional irrigation system design for optimal water management" }, { icon: "🌱", title: "Plantation Support", text: "Expert guidance on crop selection and organic cultivation methods" }, { icon: "🔧", title: "Farm Maintenance", text: "Ongoing farm maintenance services for productive land" }, { icon: "📊", title: "Harvest & Yield Support", text: "Assistance with harvest planning and produce marketing" }, { icon: "📜", title: "Legal & Documentation", text: "Complete legal support including title verification and registration" }]) },
    { pageId: pageMap["farming-focus"], type: "why-choose", title: "Why Prime Agro", badge: "Why Prime Agro", badgeIcon: "⭐", heading: "Trust is not sold. It is grown, slowly, season by season.", italicWords: "grown, slowly", text: "", align: "center", light: false, order: 1, items: JSON.stringify([{ icon: "⚖️", title: "Legal & Transparent", text: "Clear titles, transparent pricing, complete legal support" }, { icon: "👨‍🌾", title: "Expert Farm Support", text: "10+ years of agricultural expertise at your service" }, { icon: "📈", title: "High ROI Potential", text: "Premium organic produce ensures excellent returns" }, { icon: "🌿", title: "Long-term Sustainability", text: "Eco-friendly practices for lasting agricultural value" }]) },
    { pageId: pageMap["farming-focus"], type: "cta", title: "CTA", badge: "Get Started", badgeIcon: "🌿", heading: "Every forest began with a single seed. Yours begins here.", italicWords: "single seed, here", text: "Take the first step towards sustainable farming and a greener future.", align: "center", light: true, order: 2, items: "[]" },

    // SUSTAINABILITY PAGE
    { pageId: pageMap["sustainability"], type: "story", title: "Solar Technology", badge: "Solar Technology", badgeIcon: "☀️", heading: "The sun does the work. We simply hold the jar.", italicWords: "work, jar", text: "We harness the power of the sun for natural dehydration of our organic produce. Our solar drying technology preserves nutrients naturally without chemical preservatives, reducing energy consumption and carbon footprint.", align: "center", light: false, order: 0, items: JSON.stringify([{ icon: "💧", title: "Water Conservation", text: "Drip irrigation systems across all farmlands reduce water usage by up to 60% compared to traditional flood irrigation." }, { icon: "♻️", title: "Zero Waste", text: "Organic waste is composted and reused as natural fertilizer. We strive for a closed-loop farming ecosystem." }, { icon: "🌍", title: "Carbon Footprint", text: "Local distribution networks minimize transportation emissions. Our solar processing facility operates carbon-neutral." }]) },
    { pageId: pageMap["sustainability"], type: "stats", title: "Stats", badge: "", badgeIcon: "", heading: "", text: "", align: "center", light: false, order: 1, items: JSON.stringify([{ num: "60%", label: "Less Water Usage" }, { num: "100%", label: "Solar Processing" }, { num: "0", label: "Chemical Preservatives" }]) },
    { pageId: pageMap["sustainability"], type: "cta", title: "CTA", badge: "Join Us", badgeIcon: "🌍", heading: "A forest that is loved is a forest that is kept.", italicWords: "", text: "Be part of a greener future. Invest in organic farmland and support sustainable agriculture.", align: "center", light: true, order: 2, items: "[]" },

    // FARMLANDS PAGE
    { pageId: pageMap["farmlands"], type: "story", title: "Available Lands", badge: "Available Lands", badgeIcon: "🏞️", heading: "Every plot of earth has a story. These are waiting for yours.", italicWords: "yours", text: "", align: "center", light: false, order: 0, items: "[]" },

    // GALLERY PAGE
    { pageId: pageMap["gallery"], type: "story", title: "Gallery", badge: "Gallery", badgeIcon: "📷", heading: "A walk through the forest tells you everything a brochure cannot.", italicWords: "cannot", text: "", align: "center", light: false, order: 0, items: "[]" },
    { pageId: pageMap["gallery"], type: "cta", title: "CTA", badge: "Visit Us", badgeIcon: "🌿", heading: "The forest does not show itself through a screen. Come walk it.", italicWords: "walk it", text: "Schedule a farm visit and see our operations firsthand.", align: "center", light: true, order: 1, items: "[]" },
  ];

  let sectionsCreated = 0;
  for (const section of sections) {
    if (!section.pageId) continue;
    const existing = await prisma.section.findFirst({ where: { pageId: section.pageId, title: section.title, brandId: BID } });
    if (!existing) {
      await prisma.section.create({ data: { ...section, brandId: BID } });
      sectionsCreated++;
    }
  }
  console.log(`Sections: ${sectionsCreated} created (skipped existing)`);

  // ============================================================
  // PART 3: Content (from seed-content.cjs)
  // ============================================================
  console.log("\n--- Part 3: Content Data ---");

  const blogPosts = [
    { title: "The Future of Organic Farming in India", slug: "future-of-organic-farming-india", excerpt: "Discover how organic farming is transforming agriculture across India with sustainable practices.", content: "<p>India's organic farming sector is experiencing unprecedented growth. With increasing awareness about health and sustainability, more farmers are transitioning to organic methods. The government's Paramparagat Krishi Vikas Yojana (PKVY) scheme has been instrumental in promoting organic farming across the country.</p><p>At Prime Agro Farms, we've been at the forefront of this revolution for over 30 years. Our solar-powered processing unit ensures that every product reaches you in its purest form.</p><h3>Key Benefits of Organic Farming</h3><ul><li>Chemical-free produce</li><li>Better soil health</li><li>Higher market premiums</li><li>Environmental sustainability</li></ul>", category: "Farming", author: "Dr. Suresh Reddy", publishedAt: "2026-06-10", published: true },
    { title: "Benefits of Solar Dried Produce", slug: "benefits-of-solar-dried-produce", excerpt: "Learn about the advantages of solar drying technology for preserving organic fruits and vegetables.", content: "<p>Solar drying is revolutionizing how we preserve organic produce. Unlike traditional sun drying, our solar dehydration technology maintains consistent temperature and humidity levels, ensuring maximum nutrient retention.</p><h3>Why Solar Dried?</h3><ul><li>Preserves 90% of nutrients</li><li>No chemical preservatives needed</li><li>Year-round availability</li><li>Extended shelf life up to 12 months</li><li>Reduced food waste</li></ul><p>Our state-of-the-art solar processing unit in Coimbatore can process over 2 tonnes of produce daily.</p>", category: "Products", author: "Priya Menon", publishedAt: "2026-06-05", published: true },
    { title: "Why Invest in Farmland?", slug: "why-invest-in-farmland", excerpt: "Farmland is one of the most stable and rewarding long-term investments available today.", content: "<p>In an era of volatile stock markets and inflation, farmland investment offers a tangible, inflation-hedged asset class. The value of agricultural land in India has appreciated 12-15% annually over the past decade.</p><h3>Farmland Investment Benefits</h3><ul><li>Tangible asset with intrinsic value</li><li>Inflation hedge</li><li>Regular income from produce</li><li>Tax benefits under agricultural income</li><li>Legacy asset for future generations</li></ul><p>Prime Agro Farms offers assisted farmland ownership with complete support from site selection to farm setup and ongoing maintenance.</p>", category: "Investment", author: "Rajesh Kumar", publishedAt: "2026-05-28", published: true },
    { title: "Dyanna California Anjeera: A Premium Variety", slug: "dyanna-california-anjeera-premium-variety", excerpt: "Everything you need to know about the premium Dyanna California fig variety and its cultivation.", content: "<p>The Dyanna California Anjeera (fig) is a premium variety known for its exceptional sweetness and size. Originally from California, this variety thrives in the Indian climate when cultivated with proper organic methods.</p><h3>Cultivation Highlights</h3><ul><li>Planting season: June-July</li><li>First harvest: 18-24 months</li><li>Yield: 8-12 tonnes per acre</li><li>Market price: ₹200-400 per kg</li></ul><p>At Prime Agro Farms, we've perfected the cultivation of Dyanna California Anjeera across our 50+ acre plantation in Coimbatore.</p>", category: "Farming", author: "Dr. Suresh Reddy", publishedAt: "2026-05-20", published: true },
    { title: "Water Conservation in Organic Farming", slug: "water-conservation-organic-farming", excerpt: "How we use drip irrigation and rainwater harvesting to minimize water usage while maximizing crop yield.", content: "<p>Water conservation is at the heart of sustainable farming. At Prime Agro Farms, we've implemented a comprehensive water management system that reduces water usage by 60% compared to traditional farming.</p><h3>Our Water Conservation Methods</h3><ul><li>Precision drip irrigation</li><li>Rainwater harvesting ponds</li><li>Mulching for moisture retention</li><li>Soil moisture sensors</li><li>Drought-resistant crop varieties</li></ul>", category: "Sustainability", author: "Lakshmi Narayanan", publishedAt: "2026-05-15", published: true },
    { title: "Organic Certification: What It Means", slug: "organic-certification-what-it-means", excerpt: "Understanding the organic certification process and why certified organic produce matters for your health.", content: "<p>Organic certification ensures that produce is grown without synthetic pesticides, fertilizers, or GMOs. In India, NPOP (National Programme for Organic Production) is the gold standard for organic certification.</p><h3>What NPOP Certification Guarantees</h3><ul><li>No synthetic chemicals used</li><li>Non-GMO seeds only</li><li>Soil health maintained through composting</li><li>Regular inspections and audits</li><li>Full traceability from farm to fork</li></ul><p>All Prime Agro Farms products carry the NPOP certification, ensuring you receive genuinely organic produce.</p>", category: "Products", author: "Priya Menon", publishedAt: "2026-05-10", published: true },
  ];
  for (const post of blogPosts) {
    const existing = await prisma.blogPost.findFirst({ where: { slug: post.slug, brandId: BID } });
    if (existing) {
      await prisma.blogPost.update({ where: { id: existing.id }, data: post });
    } else {
      await prisma.blogPost.create({ data: { ...post, brandId: BID } });
    }
  }
  console.log(`Blog: ${blogPosts.length} posts (upserted)`);

  const galleryItems = [
    { title: "Organic Farm View", category: "Farm", mediaType: "image", displayOrder: 1, featured: true },
    { title: "Alphonso Mangoes", category: "Products", mediaType: "image", displayOrder: 2 },
    { title: "Solar Drying Setup", category: "Infrastructure", mediaType: "image", displayOrder: 3 },
    { title: "Anjeera Fields", category: "Farm", mediaType: "image", displayOrder: 4, featured: true },
    { title: "Drip Irrigation System", category: "Infrastructure", mediaType: "image", displayOrder: 5 },
    { title: "Seedling Nursery", category: "Farm", mediaType: "image", displayOrder: 6 },
    { title: "Packaging Unit", category: "Infrastructure", mediaType: "image", displayOrder: 7 },
    { title: "Our Team at Work", category: "Team", mediaType: "image", displayOrder: 8 },
    { title: "Harvest Festival 2026", category: "Events", mediaType: "image", displayOrder: 9 },
    { title: "Dehydrated Vegetables", category: "Products", mediaType: "image", displayOrder: 10 },
    { title: "Farm House", category: "Infrastructure", mediaType: "image", displayOrder: 11 },
    { title: "Sunflower Field", category: "Farm", mediaType: "image", displayOrder: 12, featured: true },
    { title: "Organic Certification Process", category: "Events", mediaType: "image", displayOrder: 13 },
    { title: "Mango Plantation Drone View", category: "Farm", mediaType: "image", displayOrder: 14 },
    { title: "Solar Processing Unit Interior", category: "Infrastructure", mediaType: "image", displayOrder: 15 },
  ];
  for (const item of galleryItems) {
    const existing = await prisma.galleryItem.findFirst({ where: { title: item.title, brandId: BID } });
    if (!existing) await prisma.galleryItem.create({ data: { ...item, brandId: BID } });
  }
  console.log(`Gallery: ${galleryItems.length} items (skipped existing)`);

  const farmlands = [
    { title: "Green Valley Farm Estate", slug: "green-valley-farm-estate", location: "Kanakapura Road, Bangalore Rural", district: "Bangalore Rural", state: "Karnataka", totalAcreage: 120, availableAcreage: 45, soilType: "Red Loamy Soil", topography: "Gently Undulating", fencingStatus: "Fully Fenced with Compound Wall", irrigationType: "Drip Irrigation + Bore Well", waterSource: "2 Bore Wells + Rainwater Harvesting", waterAvailability: "Year-round", waterQuality: "Bore water tested and potable", electricity: true, roadAccess: true, storageFacility: true, farmHouse: true, infrastructure: "Internal roads, electricity, water harvesting, security cabin", pricePerAcre: 900000, totalPrice: 900000, priceNegotiable: true, legalClearTitle: true, documentation: "Clear title with RTC, Encumbrance Certificate, Survey Map", registrationStatus: "Ready for registration", farmSetupAssistance: true, plantationSupport: true, irrigationPlanning: true, maintenanceGuidance: true, developmentServices: "Complete farm setup, plantation of choice crops, irrigation planning, ongoing maintenance", status: "Available", featuredImage: "/images/green-valley.jpg" },
    { title: "Sunridge Organic Acres", slug: "sunridge-organic-acres", location: "Hosur Road, Tamil Nadu Border", district: "Krishnagiri", state: "Tamil Nadu", totalAcreage: 80, availableAcreage: 30, soilType: "Black Cotton Soil", topography: "Flat Land", fencingStatus: "Barbed Wire Fencing", irrigationType: "Sprinkler + Drip", waterSource: "Open Well + Bore Well", waterAvailability: "Year-round", waterQuality: "Good quality bore water", electricity: true, roadAccess: true, storageFacility: false, farmHouse: true, infrastructure: "Farm house, bore wells, internal dirt roads", pricePerAcre: 750000, totalPrice: 750000, priceNegotiable: true, legalClearTitle: true, documentation: "Patta, Chitta, Encumbrance Certificate", registrationStatus: "Ready for registration", farmSetupAssistance: true, plantationSupport: true, irrigationPlanning: true, maintenanceGuidance: true, developmentServices: "Organic certification support, crop planning, farm setup", status: "Available", featuredImage: "/images/sunridge.jpg" },
    { title: "Harvest Hills Farmland", slug: "harvest-hills-farmland", location: "Pollachi, Coimbatore District", district: "Coimbatore", state: "Tamil Nadu", totalAcreage: 200, availableAcreage: 75, soilType: "Red Sandy Loam", topography: "Rolling Hills", fencingStatus: "Stone Wall + Barbed Wire", irrigationType: "Drip Irrigation", waterSource: "3 Bore Wells + Stream Water", waterAvailability: "Year-round with stream", waterQuality: "Excellent natural spring water", electricity: true, roadAccess: true, storageFacility: true, farmHouse: true, infrastructure: "Farm house, storage godown, packaging shed, security", pricePerAcre: 1200000, totalPrice: 1200000, priceNegotiable: false, legalClearTitle: true, documentation: "Clear title, EC, Survey, Patta", registrationStatus: "Ready for registration", farmSetupAssistance: true, plantationSupport: true, irrigationPlanning: true, maintenanceGuidance: true, developmentServices: "Premium farm setup with mango plantation, organic certification, full maintenance support", status: "Available", featuredImage: "/images/harvest-hills.jpg" },
  ];
  for (const land of farmlands) {
    const existing = await prisma.farmLand.findFirst({ where: { slug: land.slug, brandId: BID } });
    if (existing) {
      await prisma.farmLand.update({ where: { id: existing.id }, data: land });
    } else {
      await prisma.farmLand.create({ data: { ...land, brandId: BID } });
    }
  }
  console.log(`Farmlands: ${farmlands.length} (upserted)`);

  const products = [
    { title: "Dyanna California Anjeera (Fresh Fig)", slug: "dyanna-california-anjeera", shortDesc: "Premium organic fresh figs, naturally sweet and nutrient-rich.", fullDesc: "Our Dyanna California Anjeera is cultivated using traditional organic methods in the hills of Coimbatore. Each fig is hand-picked at peak ripeness to ensure maximum sweetness and nutritional value. Rich in fiber, potassium, and antioxidants.", price: 350, unit: "per kg", minOrder: 5, seasonAvailable: "June - October", inStock: true, certification: "NPOP Organic Certified", qualityGrade: "Grade A Premium", benefits: "Rich in fiber, potassium, antioxidants. Natural sweetness without added sugar.", nutritionalInfo: "Per 100g: Calories 74, Fiber 3g, Potassium 232mg, Calcium 35mg", storageInfo: "Store in refrigerator. Best consumed within 5 days of purchase." },
    { title: "Solar Dehydrated Mango Slices", slug: "solar-dehydrated-mango-slices", shortDesc: "Naturally sun-dried mango slices with no preservatives.", fullDesc: "Our solar dehydrated mango slices are made from Alphonso mangoes, processed using our state-of-the-art solar dehydration technology. Zero chemicals, zero preservatives, 100% natural goodness.", price: 450, unit: "per kg", minOrder: 2, seasonAvailable: "Year-round (processed March-June)", inStock: true, certification: "NPOP Organic Certified", qualityGrade: "Premium", benefits: "No preservatives, retains natural vitamins, long shelf life, convenient snacking.", nutritionalInfo: "Per 100g: Calories 320, Fiber 6g, Vitamin A 15%, Vitamin C 30%", storageInfo: "Store in airtight container. Shelf life 12 months. No refrigeration needed." },
    { title: "Organic Dehydrated Vegetables Mix", slug: "organic-dehydrated-vegetables-mix", shortDesc: "Mixed solar-dried vegetables for year-round healthy cooking.", fullDesc: "A premium blend of solar-dehydrated organic vegetables including carrots, beans, beetroot, and peas. Perfect for soups, curries, and healthy meals throughout the year.", price: 380, unit: "per kg", minOrder: 2, seasonAvailable: "Year-round", inStock: true, certification: "NPOP Organic Certified", qualityGrade: "Premium", benefits: "Retains nutrients, no chemicals, convenient, reduces food waste.", nutritionalInfo: "Per 100g: Calories 280, Fiber 12g, Iron 15%, Vitamin A 25%", storageInfo: "Store in cool, dry place. Rehydrate before cooking. Shelf life 12 months." },
    { title: "Fresh Alphonso Mangoes", slug: "fresh-alphonso-mangoes", shortDesc: "Premium Alphonso mangoes from our organic plantations.", fullDesc: "Hand-picked from our sustainable mango plantations in Coimbatore. These Alphonso mangoes are grown without any chemical pesticides or fertilizers, ensuring pure organic taste.", price: 250, unit: "per kg", minOrder: 10, seasonAvailable: "April - July", inStock: false, certification: "NPOP Organic Certified", qualityGrade: "Export Quality", benefits: "Naturally ripened, chemical-free, rich tropical flavor.", nutritionalInfo: "Per 100g: Calories 60, Vitamin C 60%, Vitamin A 10%, Fiber 1.6g", storageInfo: "Store at room temperature until ripe. Refrigerate after ripening. Consume within 3-4 days." },
    { title: "Organic Cold-Pressed Coconut Oil", slug: "organic-cold-pressed-coconut-oil", shortDesc: "Pure cold-pressed coconut oil from organic coconuts.", fullDesc: "Extracted using traditional cold-press method from organic coconuts grown on our farms. No refining, no chemicals, no heat processing. Pure virgin coconut oil for cooking and wellness.", price: 600, unit: "per litre", minOrder: 1, seasonAvailable: "Year-round", inStock: true, certification: "NPOP Organic Certified", qualityGrade: "Virgin Cold-Pressed", benefits: "Heart-healthy, boosts immunity, good for skin and hair, enhances cooking flavor.", nutritionalInfo: "Per tablespoon: Calories 121, Saturated Fat 12g, MCTs 60%", storageInfo: "Store in cool, dry place. Solidifies below 24°C. Shelf life 18 months." },
  ];
  for (const product of products) {
    const existing = await prisma.farmProduct.findFirst({ where: { slug: product.slug, brandId: BID } });
    if (existing) {
      await prisma.farmProduct.update({ where: { id: existing.id }, data: product });
    } else {
      await prisma.farmProduct.create({ data: { ...product, brandId: BID } });
    }
  }
  console.log(`Products: ${products.length} (upserted)`);

  const services = [
    { name: "Organic Farming Consultation", slug: "organic-farming-consultation", shortDesc: "Expert guidance on transitioning to organic farming methods.", fullDesc: "Our team of agricultural experts provides comprehensive consultation for farmers looking to transition to organic farming. From soil testing to crop planning, we guide you through every step.", icon: "🌿", pricingModel: "Per session", price: 2500, duration: "2-3 hours", features: "Soil testing, Crop planning, Organic input recommendations, Pest management guidance, Certification support", displayOrder: 1, featured: true, showOnHome: true },
    { name: "Farm Land Development", slug: "farm-land-development", shortDesc: "Complete farm setup from bare land to productive organic farm.", fullDesc: "We offer end-to-end farmland development services. From land preparation to irrigation setup, fencing, plantation, and ongoing maintenance — we handle everything.", icon: "🚜", pricingModel: "Custom quote", price: null, duration: "3-6 months", features: "Land preparation, Irrigation setup, Fencing, Farm house construction, Plantation, Road access", displayOrder: 2, featured: true, showOnHome: true },
    { name: "Organic Product Supply", slug: "organic-product-supply", shortDesc: "Bulk supply of certified organic produce for businesses.", fullDesc: "We supply certified organic produce in bulk to restaurants, hotels, retailers, and export companies. All products are NPOP certified with full traceability.", icon: "📦", pricingModel: "Per kg/custom", price: null, duration: "Ongoing", features: "NPOP certified, Cold chain logistics, Custom packaging, Regular supply, Quality assurance", displayOrder: 3, featured: true, showOnHome: true },
    { name: "Farm Visit & Experience", slug: "farm-visit-experience", shortDesc: "Experience organic farming firsthand with guided farm tours.", fullDesc: "Visit our farms in Coimbatore and experience organic farming firsthand. Walk through our plantations, visit our solar processing unit, and taste fresh organic produce.", icon: "🌾", pricingModel: "Per person", price: 500, duration: "Half day", features: "Guided tour, Plantation walk, Solar unit visit, Fresh produce tasting, Organic lunch", displayOrder: 4, featured: false, showOnHome: true },
  ];
  for (const service of services) {
    const existing = await prisma.service.findFirst({ where: { slug: service.slug, brandId: BID } });
    if (existing) {
      await prisma.service.update({ where: { id: existing.id }, data: service });
    } else {
      await prisma.service.create({ data: { ...service, brandId: BID } });
    }
  }
  console.log(`Services: ${services.length} (upserted)`);

  // ============================================================
  // PART 4: Section Content Items (from seed-section-content.cjs)
  // ============================================================
  console.log("\n--- Part 4: Section Items ---");

  const aboutPage = await prisma.page.findFirst({ where: { slug: "about" } });
  if (aboutPage) {
    const vision = await prisma.section.findFirst({ where: { pageId: aboutPage.id, title: "Vision" } });
    if (vision && (!vision.items || vision.items === "[]")) {
      await prisma.section.update({ where: { id: vision.id }, data: { items: JSON.stringify([{ icon: "🌱", title: "Organic by 2030", text: "100% organic certification across all farm operations" }, { icon: "☀️", title: "Carbon Neutral", text: "Achieve carbon neutrality through solar processing" }, { icon: "🤝", title: "Community First", text: "Empower 1000+ farming families across South India" }]) } });
      console.log("Updated Vision items");
    }
    const values = await prisma.section.findFirst({ where: { pageId: aboutPage.id, title: "Values" } });
    if (values && (!values.items || values.items === "[]")) {
      await prisma.section.update({ where: { id: values.id }, data: { items: JSON.stringify([{ icon: "🌿", title: "Sustainability", text: "Environmental stewardship in everything we do" }, { icon: "🤝", title: "Integrity", text: "Transparent practices and honest relationships" }, { icon: "💡", title: "Innovation", text: "Blending tradition with modern sustainable methods" }, { icon: "❤️", title: "Community", text: "Supporting local farmers and rural livelihoods" }]) } });
      console.log("Updated Values items");
    }
  }

  const contactPage = await prisma.page.findFirst({ where: { slug: "contact" } });
  if (contactPage) {
    const contactInfo = await prisma.section.findFirst({ where: { pageId: contactPage.id, title: "Contact Info" } });
    if (contactInfo && (!contactInfo.items || contactInfo.items === "[]")) {
      await prisma.section.update({ where: { id: contactInfo.id }, data: { items: JSON.stringify([{ icon: "📞", title: "Phone", text: "+91 98765 43210" }, { icon: "✉️", title: "Email", text: "info@primeagrofarms.com" }, { icon: "📍", title: "Location", text: "Hyderabad, Telangana, India" }, { icon: "⏰", title: "Hours", text: "Mon-Sat: 9:00 AM - 6:00 PM" }]) } });
      console.log("Updated Contact Info items");
    }
    const contactFaq = await prisma.section.findFirst({ where: { pageId: contactPage.id, type: "faq" } });
    if (contactFaq && (!contactFaq.items || contactFaq.items === "[]")) {
      await prisma.section.update({ where: { id: contactFaq.id }, data: { items: JSON.stringify([{ question: "How do I schedule a farm visit?", answer: "Use the consultation form on this page or call us directly. We'll arrange a visit within 48 hours.", category: "Visit" }, { question: "Do you ship organic products?", answer: "Yes, we ship across India. Contact us for bulk orders and international shipping.", category: "Products" }, { question: "What are the farmland investment options?", answer: "We offer plots from 1 acre onwards with full farm setup support. Contact us for current availability.", category: "Investment" }]) } });
      console.log("Updated Contact FAQ items");
    }
  }

  const farmlandsPage = await prisma.page.findFirst({ where: { slug: "farmlands" } });
  if (farmlandsPage) {
    const lands = await prisma.section.findFirst({ where: { pageId: farmlandsPage.id, title: "Available Lands" } });
    if (lands && (!lands.items || lands.items === "[]")) {
      await prisma.section.update({ where: { id: lands.id }, data: { heading: "Available Farmland Opportunities", badge: "Farmlands", badgeIcon: "🏞️", text: "Invest in certified organic farmland with complete farm setup assistance and ongoing support." } });
      console.log("Updated Farmlands section");
    }
  }

  console.log("\n=== Unified Seed: Complete ===");
}

main()
  .catch((e) => { console.error("Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
