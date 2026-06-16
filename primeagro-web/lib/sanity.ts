const CMS_URL = process.env.CMS_URL || "http://localhost:3334";

export interface SanityImage {
  asset: { url: string };
  alt?: string;
}

function img(url?: string | null, alt?: string | null): SanityImage | null {
  return url ? { asset: { url }, alt: alt || undefined } : null;
}

function fid(id: string) {
  return { _id: id, _type: "", _createdAt: "", _updatedAt: "" };
}

interface FetchOptions {
  params?: Record<string, string>;
}

export const client = {
  async fetch<T = any>(_query: string, _opts?: FetchOptions): Promise<T> {
    return {} as T;
  },
};

export async function fetchHomePage(): Promise<Record<string, any>> {
  const [settings, testimonials] = await Promise.all([
    fetch(`${CMS_URL}/api/settings`).then((r) => r.json()).catch(() => ({})),
    fetch(`${CMS_URL}/api/testimonials`).then((r) => r.json()).catch(() => []),
  ]);

  return {
    heroTag: settings.heroTag || "SUSTAINABLE FARMING FOR A HEALTHIER FUTURE",
    heroHeading: settings.heroHeading || "Nurturing Land.\nGrowing Wellness.\nCreating Futures.",
    heroText: settings.heroText || "Organic farming, premium produce & assisted farmland ownership for a sustainable tomorrow.",
    heroImage: img(settings.heroImage),
    heroShowSoundToggle: settings.heroShowSoundToggle === "true",
    heroBtn1: { text: "Explore Our Farms", link: "/farming-focus" },
    heroBtn2: { text: "Schedule a Farm Visit", link: "/contact" },
    focusTitle: settings.focusTitle || "Our Farming Focus",
    focusSubtitle: "Premium Produce. Organic Methods. Sustainable Future.",
    cards: [
      { icon: "🌿", title: "Premium Dyanna California Anjeera", text: "Exotic anjeera cultivated with organic methods for superior quality and taste.", image: img(settings.anjeeraImage) },
      { icon: "🥬", title: "Organic Dehydrated Vegetables", text: "Solar-dried vegetables preserving nutrients and flavor for year-round nutrition.", image: img(settings.dehydratedImage) },
      { icon: "🥭", title: "Mango Plantation", text: "Premium mango varieties cultivated with sustainable farming practices.", image: img(settings.mangoImage) },
    ],
    sustainTitle: "Sustainability & Solar Processing Vision",
    sustainText: settings.sustainText || "Harnessing the power of the sun for sustainable farming and healthy living.",
    sustainList: ["Solar Drying Technology", "Organic Processing", "Eco-friendly Infrastructure", "Water-conscious Farming", "2027 Retail Expansion Vision"],
    sustainBoxTitle: settings.sustainBoxTitle || "Solar Processing Unit",
    sustainBoxText: settings.sustainBoxText || "State-of-the-art solar dehydration facility for premium organic produce.",
    sustainImage: img(settings.sustainImage),
    stats: [
      { num: "100%", label: "Organic Practices" },
      { num: "50+", label: "Acres of Cultivation" },
      { num: "1000+", label: "Happy Customers" },
      { num: "2027", label: "Retail Expansion Goal" },
    ],
    processTitle: "Our Process",
    processSubtitle: "From farm to table, we ensure quality at every step.",
    steps: [
      { num: "01", title: "Seeding & Growing", text: "Organic seeds, natural fertilizers, traditional wisdom." },
      { num: "02", title: "Harvesting", text: "Hand-picked at peak ripeness for maximum nutrition." },
      { num: "03", title: "Processing", text: "Solar dehydration and cold storage for freshness." },
      { num: "04", title: "Packaging", text: "Eco-friendly packaging delivered to your doorstep." },
    ],
    ctaTitle: "Ready to Start Your Farming Journey?",
    ctaText: settings.ctaText || "Connect with us today and take the first step towards sustainable farming.",
    ctaBtn1: { text: "Contact Us Today", link: "/contact" },
    ctaBtn2: { text: "WhatsApp Us", link: `https://wa.me/${settings.whatsapp || "919876543210"}` },
    heroVideo: settings.heroVideoUrl && settings.heroVideoType ? { videoUrl: settings.heroVideoUrl, videoType: settings.heroVideoType } : null,
    testimonialHeading: settings.testimonialHeading || "",
    testimonialItalicWords: settings.testimonialItalicWords || "",
    testimonialText: settings.testimonialText || "",
  };
}

export async function fetchTestimonials() {
  const items = await fetch(`${CMS_URL}/api/testimonials`).then((r) => r.json()).catch(() => []);
  return items.slice(0, 6).map((t: any) => ({
    ...fid(t.id),
    clientName: t.clientName,
    location: t.location,
    rating: t.rating,
    text: t.text,
    photo: img(t.photo),
  }));
}

export async function fetchTeamMembers() {
  const items = await fetch(`${CMS_URL}/api/team`).then((r) => r.json()).catch(() => []);
  return items.map((t: any) => ({
    ...fid(t.id),
    name: t.name,
    role: t.role,
    department: t.department,
    bio: t.bio,
    photo: img(t.photo),
  }));
}

export async function fetchGallery() {
  const items = await fetch(`${CMS_URL}/api/gallery`).then((r) => r.json()).catch(() => []);
  return items.map((g: any) => ({
    ...fid(g.id),
    title: g.title,
    mediaType: g.mediaType,
    image: img(g.image),
    videoUrl: g.videoUrl,
    videoPoster: img(g.videoThumbnail),
    caption: g.caption,
    category: g.category,
  }));
}

export async function fetchBlogPosts() {
  const items = await fetch(`${CMS_URL}/api/blog`).then((r) => r.json()).catch(() => []);
  return items.map((b: any) => ({
    ...fid(b.id),
    title: b.title,
    slug: { current: b.slug },
    excerpt: b.excerpt,
    publishedAt: b.publishedAt,
    category: b.category,
    featuredImage: img(b.featuredImage),
  }));
}

export async function fetchFAQs() {
  const items = await fetch(`${CMS_URL}/api/faqs`).then((r) => r.json()).catch(() => []);
  return items.map((f: any) => ({
    ...fid(f.id),
    question: f.question,
    answer: f.answer,
    category: f.category,
  }));
}

export async function fetchSiteSettings() {
  const data = await fetch(`${CMS_URL}/api/settings`).then((r) => r.json()).catch(() => ({}));
  return {
    company_name: data.companyName || "Prime Agro Farms",
    tagline: data.tagline || "Sustainable Farming for a Healthier Future",
    phone: data.phone || "+91 1234567890",
    whatsapp: data.whatsapp || "+91 1234567890",
    email: data.email || "info@primeagrofarms.com",
    address: data.address || "Village, Taluk, District, State",
    workingHours: data.workingHours || "Mon-Sat: 9:00 AM - 6:00 PM",
    facebook: data.facebookUrl || "#",
    twitter: data.twitterUrl || "#",
    instagram: data.instagramUrl || "#",
    youtube: data.youtubeUrl || "#",
    linkedin: data.linkedinUrl || "#",
    copyright: data.copyrightText || "© 2026 Prime Agro Farms. All rights reserved.",
    logo: img(data.logo),
    logoInitial: data.logoInitial || "P",
    logoName: data.logoName || "Prime Agro",
    logoSubtitle: data.logoSubtitle || "Farms",
    sustainText: data.sustainText || "",
    sustainBoxTitle: data.sustainBoxTitle || "",
    sustainBoxText: data.sustainBoxText || "",
    heroTag: data.heroTag || "",
    heroHeading: data.heroHeading || "",
    heroText: data.heroText || "",
    heroImage: img(data.heroImage),
    heroShowSoundToggle: data.heroShowSoundToggle === "true",
    ctaText: data.ctaText || "",
    defaultMetaTitle: data.defaultMetaTitle || "",
    defaultMetaDescription: data.defaultMetaDescription || "",
    defaultMetaKeywords: data.defaultMetaKeywords || "",
    newsletterHeading: data.newsletterHeading || "Subscribe to Our Newsletter",
    newsletterDescription: data.newsletterDescription || "",
    newsletterPlaceholder: data.newsletterPlaceholder || "Enter your email",
    newsletterButtonText: data.newsletterButtonText || "Subscribe",
    privacyPolicyUrl: data.privacyPolicyUrl || "#",
    termsUrl: data.termsUrl || "#",
    footerQuickLinksTitle: data.footerQuickLinksTitle || "Quick Links",
    footerServicesTitle: data.footerServicesTitle || "Our Services",
    footerContactTitle: data.footerContactTitle || "Contact",
    footerDescription: data.footerDescription || "",
    googleMapsEmbed: data.googleMapsEmbed || "",
    priceBannerText: data.priceBannerText || "",
    priceBannerDisclaimer: data.priceBannerDisclaimer || "",
    consultFormTitle: data.consultFormTitle || "Book a Free Consultation",
    consultFormText: data.consultFormText || "",
    consultFormButton: data.consultFormButton || "Schedule a Visit",
    consultFormBadges: data.consultFormBadges || "",
  };
}

export async function fetchFarmLands() {
  const items = await fetch(`${CMS_URL}/api/lands`).then((r) => r.json()).catch(() => []);
  return items.map((l: any) => ({
    ...fid(l.id),
    name: l.title,
    title: l.title,
    slug: { current: l.slug },
    location: l.location,
    acreage: l.totalAcreage,
    areaAcres: l.totalAcreage ? `${l.totalAcreage}+` : "200+",
    soilType: l.soilType,
    irrigation: l.irrigationType,
    pricePerAcre: l.pricePerAcre,
    totalPrice: l.totalPrice,
    status: l.status,
    image: img(l.featuredImage),
    gallery: l.gallery ? l.gallery.split(",").map((u: string) => ({ asset: { url: u.trim() } })) : [],
    highlights: l.developmentServices ? l.developmentServices.split(",").map((s: string) => s.trim()) : [],
    features: [],
    description: l.developmentServices || "",
  }));
}

export async function fetchNavigation() {
  const items = await fetch(`${CMS_URL}/api/navigation`).then((r) => r.json()).catch(() => []);
  return (Array.isArray(items) ? items : [])
    .filter((n: any) => n.published)
    .sort((a: any, b: any) => a.order - b.order)
    .map((n: any) => ({
      label: n.label,
      href: n.url || "/",
      icon: null,
      parentId: n.parentId || null,
    }));
}

export async function fetchFooterSections() {
  const items = await fetch(`${CMS_URL}/api/footer`).then((r) => r.json()).catch(() => []);
  const sections = (Array.isArray(items) ? items : [])
    .filter((s: any) => s.published)
    .sort((a: any, b: any) => a.order - b.order)
    .map((s: any) => {
      let parsedItems: any[] = [];
      try { parsedItems = JSON.parse(s.items || "[]"); } catch { parsedItems = []; }
      return { type: s.type, title: s.title, items: parsedItems };
    });
  const brand = sections.find((s: any) => s.type === "brand");
  return {
    brand: brand?.title || "Prime Agro Farms",
    brandDescription: brand?.items?.[0]?.text || "Sustainable farming, premium organic produce, and assisted dream farmland ownership.",
    quickLinks: sections.find((s: any) => s.type === "quick-links")?.items?.map((l: any) => ({ label: l.label, href: l.url || "#" })) || [],
    services: sections.find((s: any) => s.type === "services")?.items?.map((l: any) => l.label) || [],
    contactItems: sections.find((s: any) => s.type === "contact")?.items || [],
  };
}

export async function fetchPageBySlug(slug: string) {
  const page = await fetch(`${CMS_URL}/api/pages/${slug}`).then((r) => r.json()).catch(() => null);
  if (!page || page.error) return null;
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    hero: page.hero ? {
      tag: page.hero.tag,
      heading: page.hero.heading,
      subheading: page.hero.subheading,
      text: page.hero.text,
      bgType: page.hero.bgType,
      bgImage: page.hero.bgImage,
      videoUrl: page.hero.videoUrl,
      videoType: page.hero.videoType,
      overlayOpacity: page.hero.overlayOpacity,
      textColor: page.hero.textColor,
      textAlign: page.hero.textAlign,
      buttons: page.hero.buttons ? JSON.parse(page.hero.buttons) : [],
    } : null,
    sections: (page.sections || []).map((s: any) => ({
      id: s.id,
      type: s.type,
      title: s.title,
      badge: s.badge,
      badgeIcon: s.badgeIcon,
      heading: s.heading,
      italicWords: s.italicWords,
      text: s.text,
      subtitle: s.subtitle,
      content: s.content,
      image: s.image,
      items: (() => { try { return JSON.parse(s.items || "[]"); } catch { return []; } })(),
      style: (() => { try { return JSON.parse(s.style || "{}"); } catch { return {}; } })(),
      order: s.order,
    })),
  };
}

export async function fetchPageMeta(slug: string) {
  const page = await fetch(`${CMS_URL}/api/pages/${slug}`).then((r) => r.json()).catch(() => null);
  if (!page || page.error) return null;
  const settings = await fetch(`${CMS_URL}/api/settings`).then((r) => r.json()).catch(() => ({}));
  return {
    title: page.metaTitle || settings.defaultMetaTitle || "",
    description: page.metaDescription || settings.defaultMetaDescription || "",
    ogImage: page.ogImage || "",
  };
}

export async function fetchServices() {
  const items = await fetch(`${CMS_URL}/api/services`).then((r) => r.json()).catch(() => []);
  return items.map((s: any) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    description: s.description,
    icon: s.icon,
    image: s.image,
    features: s.features ? JSON.parse(s.features) : [],
    displayOrder: s.displayOrder,
  }));
}

class UrlBuilder {
  u: string;

  constructor(url: string) {
    this.u = url;
  }

  width(_w: number) { return this; }
  auto(_f: string) { return this; }
  fit(_f: string) { return this; }
  url() { return this.u; }
}

export function urlFor(source: any) {
  const url = typeof source === "string" ? source : source?.asset?.url || "";
  return new UrlBuilder(url);
}

export const urlForFull = urlFor;
export const urlForOG = urlFor;
export const urlForThumb = urlFor;
