const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding content data...\n");

  // --- Blog Posts ---
  const blogPosts = [
    {
      title: "The Future of Organic Farming in India",
      slug: "future-of-organic-farming-india",
      excerpt: "Discover how organic farming is transforming agriculture across India with sustainable practices.",
      content: "<p>India's organic farming sector is experiencing unprecedented growth. With increasing awareness about health and sustainability, more farmers are transitioning to organic methods. The government's Paramparagat Krishi Vikas Yojana (PKVY) scheme has been instrumental in promoting organic farming across the country.</p><p>At Prime Agro Farms, we've been at the forefront of this revolution for over 30 years. Our solar-powered processing unit ensures that every product reaches you in its purest form.</p><h3>Key Benefits of Organic Farming</h3><ul><li>Chemical-free produce</li><li>Better soil health</li><li>Higher market premiums</li><li>Environmental sustainability</li></ul>",
      category: "Farming",
      author: "Dr. Suresh Reddy",
      publishedAt: "2026-06-10",
      published: true,
    },
    {
      title: "Benefits of Solar Dried Produce",
      slug: "benefits-of-solar-dried-produce",
      excerpt: "Learn about the advantages of solar drying technology for preserving organic fruits and vegetables.",
      content: "<p>Solar drying is revolutionizing how we preserve organic produce. Unlike traditional sun drying, our solar dehydration technology maintains consistent temperature and humidity levels, ensuring maximum nutrient retention.</p><h3>Why Solar Dried?</h3><ul><li>Preserves 90% of nutrients</li><li>No chemical preservatives needed</li><li>Year-round availability</li><li>Extended shelf life up to 12 months</li><li>Reduced food waste</li></ul><p>Our state-of-the-art solar processing unit in Coimbatore can process over 2 tonnes of produce daily.</p>",
      category: "Products",
      author: "Priya Menon",
      publishedAt: "2026-06-05",
      published: true,
    },
    {
      title: "Why Invest in Farmland?",
      slug: "why-invest-in-farmland",
      excerpt: "Farmland is one of the most stable and rewarding long-term investments available today.",
      content: "<p>In an era of volatile stock markets and inflation, farmland investment offers a tangible, inflation-hedged asset class. The value of agricultural land in India has appreciated 12-15% annually over the past decade.</p><h3>Farmland Investment Benefits</h3><ul><li>Tangible asset with intrinsic value</li><li>Inflation hedge</li><li>Regular income from produce</li><li>Tax benefits under agricultural income</li><li>Legacy asset for future generations</li></ul><p>Prime Agro Farms offers assisted farmland ownership with complete support from site selection to farm setup and ongoing maintenance.</p>",
      category: "Investment",
      author: "Rajesh Kumar",
      publishedAt: "2026-05-28",
      published: true,
    },
    {
      title: "Dyanna California Anjeera: A Premium Variety",
      slug: "dyanna-california-anjeera-premium-variety",
      excerpt: "Everything you need to know about the premium Dyanna California fig variety and its cultivation.",
      content: "<p>The Dyanna California Anjeera (fig) is a premium variety known for its exceptional sweetness and size. Originally from California, this variety thrives in the Indian climate when cultivated with proper organic methods.</p><h3>Cultivation Highlights</h3><ul><li>Planting season: June-July</li><li>First harvest: 18-24 months</li><li>Yield: 8-12 tonnes per acre</li><li>Market price: ₹200-400 per kg</li></ul><p>At Prime Agro Farms, we've perfected the cultivation of Dyanna California Anjeera across our 50+ acre plantation in Coimbatore.</p>",
      category: "Farming",
      author: "Dr. Suresh Reddy",
      publishedAt: "2026-05-20",
      published: true,
    },
    {
      title: "Water Conservation in Organic Farming",
      slug: "water-conservation-organic-farming",
      excerpt: "How we use drip irrigation and rainwater harvesting to minimize water usage while maximizing crop yield.",
      content: "<p>Water conservation is at the heart of sustainable farming. At Prime Agro Farms, we've implemented a comprehensive water management system that reduces water usage by 60% compared to traditional farming.</p><h3>Our Water Conservation Methods</h3><ul><li>Precision drip irrigation</li><li>Rainwater harvesting ponds</li><li>Mulching for moisture retention</li><li>Soil moisture sensors</li><li>Drought-resistant crop varieties</li></ul>",
      category: "Sustainability",
      author: "Lakshmi Narayanan",
      publishedAt: "2026-05-15",
      published: true,
    },
    {
      title: "Organic Certification: What It Means",
      slug: "organic-certification-what-it-means",
      excerpt: "Understanding the organic certification process and why certified organic produce matters for your health.",
      content: "<p>Organic certification ensures that produce is grown without synthetic pesticides, fertilizers, or GMOs. In India, NPOP (National Programme for Organic Production) is the gold standard for organic certification.</p><h3>What NPOP Certification Guarantees</h3><ul><li>No synthetic chemicals used</li><li>Non-GMO seeds only</li><li>Soil health maintained through composting</li><li>Regular inspections and audits</li><li>Full traceability from farm to fork</li></ul><p>All Prime Agro Farms products carry the NPOP certification, ensuring you receive genuinely organic produce.</p>",
      category: "Products",
      author: "Priya Menon",
      publishedAt: "2026-05-10",
      published: true,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`Seeded ${blogPosts.length} blog posts`);

  // --- Gallery Items ---
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
    const existing = await prisma.galleryItem.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.galleryItem.create({ data: item });
    }
  }
  console.log(`Seeded ${galleryItems.length} gallery items`);

  // --- Farmlands ---
  const farmlands = [
    {
      title: "Green Valley Farm Estate",
      slug: "green-valley-farm-estate",
      location: "Kanakapura Road, Bangalore Rural",
      district: "Bangalore Rural",
      state: "Karnataka",
      totalAcreage: 120,
      availableAcreage: 45,
      soilType: "Red Loamy Soil",
      topography: "Gently Undulating",
      fencingStatus: "Fully Fenced with Compound Wall",
      irrigationType: "Drip Irrigation + Bore Well",
      waterSource: "2 Bore Wells + Rainwater Harvesting",
      waterAvailability: "Year-round",
      waterQuality: "Bore water tested and potable",
      electricity: true,
      roadAccess: true,
      storageFacility: true,
      farmHouse: true,
      infrastructure: "Internal roads, electricity, water harvesting, security cabin",
      pricePerAcre: 900000,
      totalPrice: 900000,
      priceNegotiable: true,
      legalClearTitle: true,
      documentation: "Clear title with RTC, Encumbrance Certificate, Survey Map",
      registrationStatus: "Ready for registration",
      farmSetupAssistance: true,
      plantationSupport: true,
      irrigationPlanning: true,
      maintenanceGuidance: true,
      developmentServices: "Complete farm setup, plantation of choice crops, irrigation planning, ongoing maintenance",
      status: "Available",
      featuredImage: "/images/green-valley.jpg",
    },
    {
      title: "Sunridge Organic Acres",
      slug: "sunridge-organic-acres",
      location: "Hosur Road, Tamil Nadu Border",
      district: "Krishnagiri",
      state: "Tamil Nadu",
      totalAcreage: 80,
      availableAcreage: 30,
      soilType: "Black Cotton Soil",
      topography: "Flat Land",
      fencingStatus: "Barbed Wire Fencing",
      irrigationType: "Sprinkler + Drip",
      waterSource: "Open Well + Bore Well",
      waterAvailability: "Year-round",
      waterQuality: "Good quality bore water",
      electricity: true,
      roadAccess: true,
      storageFacility: false,
      farmHouse: true,
      infrastructure: "Farm house, bore wells, internal dirt roads",
      pricePerAcre: 750000,
      totalPrice: 750000,
      priceNegotiable: true,
      legalClearTitle: true,
      documentation: "Patta, Chitta, Encumbrance Certificate",
      registrationStatus: "Ready for registration",
      farmSetupAssistance: true,
      plantationSupport: true,
      irrigationPlanning: true,
      maintenanceGuidance: true,
      developmentServices: "Organic certification support, crop planning, farm setup",
      status: "Available",
      featuredImage: "/images/sunridge.jpg",
    },
    {
      title: "Harvest Hills Farmland",
      slug: "harvest-hills-farmland",
      location: "Pollachi, Coimbatore District",
      district: "Coimbatore",
      state: "Tamil Nadu",
      totalAcreage: 200,
      availableAcreage: 75,
      soilType: "Red Sandy Loam",
      topography: "Rolling Hills",
      fencingStatus: "Stone Wall + Barbed Wire",
      irrigationType: "Drip Irrigation",
      waterSource: "3 Bore Wells + Stream Water",
      waterAvailability: "Year-round with stream",
      waterQuality: "Excellent natural spring water",
      electricity: true,
      roadAccess: true,
      storageFacility: true,
      farmHouse: true,
      infrastructure: "Farm house, storage godown, packaging shed, security",
      pricePerAcre: 1200000,
      totalPrice: 1200000,
      priceNegotiable: false,
      legalClearTitle: true,
      documentation: "Clear title, EC, Survey, Patta",
      registrationStatus: "Ready for registration",
      farmSetupAssistance: true,
      plantationSupport: true,
      irrigationPlanning: true,
      maintenanceGuidance: true,
      developmentServices: "Premium farm setup with mango plantation, organic certification, full maintenance support",
      status: "Available",
      featuredImage: "/images/harvest-hills.jpg",
    },
  ];

  for (const land of farmlands) {
    await prisma.farmLand.upsert({
      where: { slug: land.slug },
      update: land,
      create: land,
    });
  }
  console.log(`Seeded ${farmlands.length} farmlands`);

  // --- Products ---
  const products = [
    {
      title: "Dyanna California Anjeera (Fresh Fig)",
      slug: "dyanna-california-anjeera",
      shortDesc: "Premium organic fresh figs, naturally sweet and nutrient-rich.",
      fullDesc: "Our Dyanna California Anjeera is cultivated using traditional organic methods in the hills of Coimbatore. Each fig is hand-picked at peak ripeness to ensure maximum sweetness and nutritional value. Rich in fiber, potassium, and antioxidants.",
      price: 350,
      unit: "per kg",
      minOrder: 5,
      seasonAvailable: "June - October",
      inStock: true,
      certification: "NPOP Organic Certified",
      qualityGrade: "Grade A Premium",
      benefits: "Rich in fiber, potassium, antioxidants. Natural sweetness without added sugar.",
      nutritionalInfo: "Per 100g: Calories 74, Fiber 3g, Potassium 232mg, Calcium 35mg",
      storageInfo: "Store in refrigerator. Best consumed within 5 days of purchase.",
    },
    {
      title: "Solar Dehydrated Mango Slices",
      slug: "solar-dehydrated-mango-slices",
      shortDesc: "Naturally sun-dried mango slices with no preservatives.",
      fullDesc: "Our solar dehydrated mango slices are made from Alphonso mangoes, processed using our state-of-the-art solar dehydration technology. Zero chemicals, zero preservatives, 100% natural goodness.",
      price: 450,
      unit: "per kg",
      minOrder: 2,
      seasonAvailable: "Year-round (processed March-June)",
      inStock: true,
      certification: "NPOP Organic Certified",
      qualityGrade: "Premium",
      benefits: "No preservatives, retains natural vitamins, long shelf life, convenient snacking.",
      nutritionalInfo: "Per 100g: Calories 320, Fiber 6g, Vitamin A 15%, Vitamin C 30%",
      storageInfo: "Store in airtight container. Shelf life 12 months. No refrigeration needed.",
    },
    {
      title: "Organic Dehydrated Vegetables Mix",
      slug: "organic-dehydrated-vegetables-mix",
      shortDesc: "Mixed solar-dried vegetables for year-round healthy cooking.",
      fullDesc: "A premium blend of solar-dehydrated organic vegetables including carrots, beans, beetroot, and peas. Perfect for soups, curries, and healthy meals throughout the year.",
      price: 380,
      unit: "per kg",
      minOrder: 2,
      seasonAvailable: "Year-round",
      inStock: true,
      certification: "NPOP Organic Certified",
      qualityGrade: "Premium",
      benefits: "Retains nutrients, no chemicals, convenient, reduces food waste.",
      nutritionalInfo: "Per 100g: Calories 280, Fiber 12g, Iron 15%, Vitamin A 25%",
      storageInfo: "Store in cool, dry place. Rehydrate before cooking. Shelf life 12 months.",
    },
    {
      title: "Fresh Alphonso Mangoes",
      slug: "fresh-alphonso-mangoes",
      shortDesc: "Premium Alphonso mangoes from our organic plantations.",
      fullDesc: "Hand-picked from our sustainable mango plantations in Coimbatore. These Alphonso mangoes are grown without any chemical pesticides or fertilizers, ensuring pure organic taste.",
      price: 250,
      unit: "per kg",
      minOrder: 10,
      seasonAvailable: "April - July",
      inStock: false,
      certification: "NPOP Organic Certified",
      qualityGrade: "Export Quality",
      benefits: "Naturally ripened, chemical-free, rich tropical flavor.",
      nutritionalInfo: "Per 100g: Calories 60, Vitamin C 60%, Vitamin A 10%, Fiber 1.6g",
      storageInfo: "Store at room temperature until ripe. Refrigerate after ripening. Consume within 3-4 days.",
    },
    {
      title: "Organic Cold-Pressed Coconut Oil",
      slug: "organic-cold-pressed-coconut-oil",
      shortDesc: "Pure cold-pressed coconut oil from organic coconuts.",
      fullDesc: "Extracted using traditional cold-press method from organic coconuts grown on our farms. No refining, no chemicals, no heat processing. Pure virgin coconut oil for cooking and wellness.",
      price: 600,
      unit: "per litre",
      minOrder: 1,
      seasonAvailable: "Year-round",
      inStock: true,
      certification: "NPOP Organic Certified",
      qualityGrade: "Virgin Cold-Pressed",
      benefits: "Heart-healthy, boosts immunity, good for skin and hair, enhances cooking flavor.",
      nutritionalInfo: "Per tablespoon: Calories 121, Saturated Fat 12g, MCTs 60%",
      storageInfo: "Store in cool, dry place. Solidifies below 24°C. Shelf life 18 months.",
    },
  ];

  for (const product of products) {
    await prisma.farmProduct.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products`);

  // --- Services ---
  const services = [
    {
      name: "Organic Farming Consultation",
      slug: "organic-farming-consultation",
      shortDesc: "Expert guidance on transitioning to organic farming methods.",
      fullDesc: "Our team of agricultural experts provides comprehensive consultation for farmers looking to transition to organic farming. From soil testing to crop planning, we guide you through every step.",
      icon: "🌿",
      pricingModel: "Per session",
      price: 2500,
      duration: "2-3 hours",
      features: "Soil testing, Crop planning, Organic input recommendations, Pest management guidance, Certification support",
      displayOrder: 1,
      featured: true,
      showOnHome: true,
    },
    {
      name: "Farm Land Development",
      slug: "farm-land-development",
      shortDesc: "Complete farm setup from bare land to productive organic farm.",
      fullDesc: "We offer end-to-end farmland development services. From land preparation to irrigation setup, fencing, plantation, and ongoing maintenance — we handle everything.",
      icon: "🚜",
      pricingModel: "Custom quote",
      price: null,
      duration: "3-6 months",
      features: "Land preparation, Irrigation setup, Fencing, Farm house construction, Plantation, Road access",
      displayOrder: 2,
      featured: true,
      showOnHome: true,
    },
    {
      name: "Organic Product Supply",
      slug: "organic-product-supply",
      shortDesc: "Bulk supply of certified organic produce for businesses.",
      fullDesc: "We supply certified organic produce in bulk to restaurants, hotels, retailers, and export companies. All products are NPOP certified with full traceability.",
      icon: "📦",
      pricingModel: "Per kg/custom",
      price: null,
      duration: "Ongoing",
      features: "NPOP certified, Cold chain logistics, Custom packaging, Regular supply, Quality assurance",
      displayOrder: 3,
      featured: true,
      showOnHome: true,
    },
    {
      name: "Farm Visit & Experience",
      slug: "farm-visit-experience",
      shortDesc: "Experience organic farming firsthand with guided farm tours.",
      fullDesc: "Visit our farms in Coimbatore and experience organic farming firsthand. Walk through our plantations, visit our solar processing unit, and taste fresh organic produce.",
      icon: "🌾",
      pricingModel: "Per person",
      price: 500,
      duration: "Half day",
      features: "Guided tour, Plantation walk, Solar unit visit, Fresh produce tasting, Organic lunch",
      displayOrder: 4,
      featured: false,
      showOnHome: true,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`Seeded ${services.length} services`);

  console.log("\nContent seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding content:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
