const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@primeagrofarms.com" },
    update: {},
    create: {
      email: "admin@primeagrofarms.com",
      name: "Admin",
      password,
      role: "admin",
    },
  });
  console.log("Admin user created:", admin.email);

  // Site Settings
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
    { key: "heroImage", value: "/images/hero-bg.jpg" },
    { key: "sustainText", value: "At Prime Agro Farms, sustainability isn't just a practice—it's our philosophy. Our solar-powered processing unit ensures zero-waste, eco-friendly farming from seed to shelf." },
    { key: "sustainImage", value: "/images/sustainability.jpg" },
    { key: "sustainBoxTitle", value: "Solar Processing Unit" },
    { key: "sustainBoxText", value: "State-of-the-art solar dehydration facility for premium organic produce." },
    { key: "ctaText", value: "Ready to invest in sustainable agriculture? Connect with us today." },
    { key: "anjeeraImage", value: "/images/anjeera.jpg" },
    { key: "dehydratedImage", value: "/images/dehydrated.jpg" },
    { key: "mangoImage", value: "/images/mango.jpg" },
    // Logo
    { key: "logoInitial", value: "P" },
    { key: "logoName", value: "Prime Agro" },
    { key: "logoSubtitle", value: "Farms" },
    // Newsletter
    { key: "newsletterHeading", value: "Subscribe to Our Newsletter" },
    { key: "newsletterDescription", value: "" },
    { key: "newsletterPlaceholder", value: "Enter your email" },
    { key: "newsletterButtonText", value: "Subscribe" },
    // Footer
    { key: "footerQuickLinksTitle", value: "Quick Links" },
    { key: "footerServicesTitle", value: "Our Services" },
    { key: "footerContactTitle", value: "Contact" },
    // Legal
    { key: "privacyPolicyUrl", value: "#" },
    { key: "termsUrl", value: "#" },
    // SEO
    { key: "defaultMetaTitle", value: "Prime Agro Farms | Sustainable Organic Farming" },
    { key: "defaultMetaDescription", value: "Premium organic farming, Dyanna California Anjeera cultivation, and assisted dream farmland ownership for a sustainable tomorrow." },
    { key: "defaultMetaKeywords", value: "organic farming Hyderabad, farm lands for sale, organic Anjeera, dehydrated vegetables, sustainable farming India" },
    // Farming Focus - Price Banner
    { key: "priceBannerText", value: "Starting from ₹9 Lakhs per Acre" },
    { key: "priceBannerDisclaimer", value: "*Subject to availability, based on location and development scope" },
    // Farming Focus - Consultation Form
    { key: "consultFormTitle", value: "Book a Free Consultation" },
    { key: "consultFormText", value: "Let's build your dream farm together. Fill in your details and our team will get back to you within 24 hours." },
    { key: "consultFormButton", value: "Schedule a Visit" },
    { key: "consultFormBadges", value: "100% Free|Expert Guidance|No Obligation" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log(`Seeded ${settings.length} site settings`);

  // Pages
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
    const page = await prisma.page.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
    createdPages[p.slug] = page;
  }
  console.log(`Seeded ${pages.length} pages`);

  // Heroes
  const heroes = [
    {
      pageId: createdPages["homepage"].id,
      tag: "Sustainable Farming",
      heading: "Cultivating Tomorrow's Harvest Today",
      subheading: "Premium organic farming and assisted dream farmland ownership",
      bgType: "image",
      bgImage: "/images/hero-bg.jpg",
      overlayOpacity: 40,
      textColor: "white",
      textAlign: "left",
      buttons: JSON.stringify([
        { text: "Explore Our Farms", href: "/farming-focus", variant: "primary" },
        { text: "Schedule a Farm Visit", href: "/contact", variant: "outline" },
      ]),
    },
    {
      pageId: createdPages["about"].id,
      tag: "About Us",
      heading: "Who We Are",
      subheading: "Building a sustainable future through organic farming",
      bgType: "image",
      bgImage: "/images/about-hero.jpg",
      overlayOpacity: 40,
      textColor: "white",
      textAlign: "left",
    },
    {
      pageId: createdPages["farming-focus"].id,
      tag: "Farming Focus",
      heading: "Own Your Dream Farmland",
      subheading: "Premium farmland investments with expert support",
      bgType: "image",
      bgImage: "/images/farming-hero.jpg",
      overlayOpacity: 40,
      textColor: "white",
      textAlign: "left",
    },
    {
      pageId: createdPages["sustainability"].id,
      tag: "Sustainability",
      heading: "Sustainability at Prime Agro Farms",
      subheading: "Eco-friendly farming from seed to shelf",
      bgType: "image",
      bgImage: "/images/sustainability-hero.jpg",
      overlayOpacity: 40,
      textColor: "white",
      textAlign: "left",
    },
    {
      pageId: createdPages["farmlands"].id,
      tag: "Farmlands",
      heading: "Farmland Opportunities",
      subheading: "Invest in certified organic farmland",
      bgType: "image",
      bgImage: "/images/farmlands-hero.jpg",
      overlayOpacity: 40,
      textColor: "white",
      textAlign: "left",
    },
    {
      pageId: createdPages["gallery"].id,
      tag: "Gallery",
      heading: "Gallery & Videos",
      subheading: "Explore our farms, products, and events",
      bgType: "image",
      bgImage: "/images/gallery-hero.jpg",
      overlayOpacity: 40,
      textColor: "white",
      textAlign: "left",
    },
    {
      pageId: createdPages["blog"].id,
      tag: "Blog",
      heading: "Blog & Insights",
      subheading: "Latest news and articles from Prime Agro Farms",
      bgType: "image",
      bgImage: "/images/blog-hero.jpg",
      overlayOpacity: 40,
      textColor: "white",
      textAlign: "left",
    },
    {
      pageId: createdPages["contact"].id,
      tag: "Contact",
      heading: "Contact Us",
      subheading: "Get in touch with our team",
      bgType: "image",
      bgImage: "/images/contact-hero.jpg",
      overlayOpacity: 40,
      textColor: "white",
      textAlign: "left",
    },
  ];

  for (const h of heroes) {
    await prisma.hero.upsert({
      where: { pageId: h.pageId },
      update: h,
      create: h,
    });
  }
  console.log(`Seeded ${heroes.length} heroes`);

  // Navigation
  const navItems = [
    { label: "Home", url: "/", order: 0 },
    { label: "About Us", url: "/about", order: 1 },
    { label: "Farming Focus", url: "/farming-focus", order: 2 },
    { label: "Sustainability", url: "/sustainability", order: 3 },
    { label: "Farmlands", url: "/farmlands", order: 4 },
    { label: "Gallery", url: "/gallery", order: 5 },
    { label: "Contact", url: "/contact", order: 6 },
  ];

  for (const n of navItems) {
    const existing = await prisma.navigation.findFirst({ where: { label: n.label } });
    if (!existing) await prisma.navigation.create({ data: n });
  }
  console.log(`Seeded ${navItems.length} navigation items`);

  // Testimonials
  const testimonials = [
    { clientName: "Rajesh Kumar", location: "Hyderabad", rating: 5, text: "Prime Agro Farms helped me invest in premium farmland. The support and guidance throughout the process was exceptional.", published: true },
    { clientName: "Priya Sharma", location: "Bangalore", rating: 5, text: "The organic produce quality is outstanding. Their solar-powered processing ensures the best products reach us.", published: true },
    { clientName: "Mahesh Reddy", location: "Vijayawada", rating: 4, text: "Great investment opportunity with transparent documentation. The farm setup assistance is very helpful.", published: true },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    const existing = await prisma.testimonial.findFirst({ where: { clientName: t.clientName } });
    if (!existing) await prisma.testimonial.create({ data: { ...t, order: i } });
  }
  console.log("Seeded testimonials");

  // Team Members
  const team = [
    { name: "Srikanth Reddy", role: "Founder & CEO", department: "Leadership", bio: "Visionary leader with 15+ years in agriculture and sustainable farming." },
    { name: "Lakshmi Devi", role: "Head of Operations", department: "Operations", bio: "Expert in organic farming operations and supply chain management." },
    { name: "Venkat Rao", role: "Chief Agronomist", department: "Agriculture", bio: "Agricultural scientist specializing in sustainable crop management." },
  ];

  for (let i = 0; i < team.length; i++) {
    const t = team[i];
    const existing = await prisma.teamMember.findFirst({ where: { name: t.name } });
    if (!existing) await prisma.teamMember.create({ data: { ...t, displayOrder: i } });
  }
  console.log("Seeded team members");

  // FAQs
  const faqs = [
    { question: "What is the minimum land size available?", answer: "We offer farmland starting from 1 acre. Contact us for detailed pricing and availability.", category: "Farmland", published: true },
    { question: "Do you offer financing options?", answer: "Yes, we partner with leading banks to provide flexible financing options for farmland purchases.", category: "Farmland", published: true },
    { question: "What post-purchase support do you provide?", answer: "We provide complete farm setup assistance, irrigation planning, plantation support, and ongoing maintenance guidance.", category: "Support", published: true },
    { question: "Can I visit the farm before purchasing?", answer: "Absolutely! We encourage farm visits. Schedule a visit through our contact page.", category: "General", published: true },
    { question: "Are your products certified organic?", answer: "Yes, all our products are certified organic and processed in our solar-powered facility.", category: "Products", published: true },
  ];

  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i];
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (!existing) await prisma.faq.create({ data: { ...f, displayOrder: i } });
  }
  console.log("Seeded FAQs");

  // Footer Sections
  const footerSections = [
    {
      type: "brand",
      title: "Prime Agro Farms",
      items: JSON.stringify([
        { text: "Committed to sustainable organic farming and building a healthier future." },
      ]),
      order: 0,
    },
    {
      type: "quick-links",
      title: "Quick Links",
      items: JSON.stringify([
        { label: "About Us", url: "/about" },
        { label: "Farming Focus", url: "/farming-focus" },
        { label: "Farmlands", url: "/farmlands" },
        { label: "Gallery", url: "/gallery" },
        { label: "Contact", url: "/contact" },
      ]),
      order: 1,
    },
    {
      type: "services",
      title: "Our Services",
      items: JSON.stringify([
        { label: "Organic Farming" },
        { label: "Farm Land Sales" },
        { label: "Consultation" },
        { label: "Organic Products" },
        { label: "Solar Processing" },
      ]),
      order: 2,
    },
    {
      type: "contact",
      title: "Contact Info",
      items: JSON.stringify([
        { icon: "phone", text: "+91 9876543210" },
        { icon: "email", text: "info@primeagrofarms.com" },
        { icon: "location", text: "Hyderabad, Telangana" },
      ]),
      order: 3,
    },
  ];

  for (const f of footerSections) {
    const existing = await prisma.footerSection.findFirst({ where: { type: f.type } });
    if (!existing) await prisma.footerSection.create({ data: f });
  }
  console.log("Seeded footer sections");

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
