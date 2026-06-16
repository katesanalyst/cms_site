"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { slugify } from "./utils";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

function parseFormData(data: FormData): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const [key, value] of data.entries()) {
    if (key.endsWith("[]")) {
      const k = key.slice(0, -2);
      if (!obj[k]) obj[k] = [];
      obj[k].push(value);
    } else {
      obj[key] = value === "true" ? true : value === "false" ? false : value;
    }
  }
  return obj;
}

type ModelMap = {
  [key: string]: {
    create: (data: any) => Promise<any>;
    update: (id: string, data: any) => Promise<any>;
    delete: (id: string) => Promise<any>;
  };
};

const models: ModelMap = {
  page: {
    create: (d) => prisma.page.create({ data: { ...d, slug: d.slug || slugify(d.title) } }),
    update: (id, d) => prisma.page.update({ where: { id }, data: d }),
    delete: (id) => prisma.page.delete({ where: { id } }),
  },
  section: {
    create: (d) => prisma.section.create({ data: d }),
    update: (id, d) => prisma.section.update({ where: { id }, data: d }),
    delete: (id) => prisma.section.delete({ where: { id } }),
  },
  hero: {
    create: (d) => prisma.hero.create({ data: d }),
    update: (id, d) => prisma.hero.update({ where: { id }, data: d }),
    delete: (id) => prisma.hero.delete({ where: { id } }),
  },
  product: {
    create: (d) => prisma.farmProduct.create({ data: { ...d, slug: d.slug || slugify(d.title) } }),
    update: (id, d) => prisma.farmProduct.update({ where: { id }, data: d }),
    delete: (id) => prisma.farmProduct.delete({ where: { id } }),
  },
  land: {
    create: (d) => prisma.farmLand.create({ data: { ...d, slug: d.slug || slugify(d.title) } }),
    update: (id, d) => prisma.farmLand.update({ where: { id }, data: d }),
    delete: (id) => prisma.farmLand.delete({ where: { id } }),
  },
  testimonial: {
    create: (d) => prisma.testimonial.create({ data: d }),
    update: (id, d) => prisma.testimonial.update({ where: { id }, data: d }),
    delete: (id) => prisma.testimonial.delete({ where: { id } }),
  },
  team: {
    create: (d) => prisma.teamMember.create({ data: d }),
    update: (id, d) => prisma.teamMember.update({ where: { id }, data: d }),
    delete: (id) => prisma.teamMember.delete({ where: { id } }),
  },
  gallery: {
    create: (d) => prisma.galleryItem.create({ data: d }),
    update: (id, d) => prisma.galleryItem.update({ where: { id }, data: d }),
    delete: (id) => prisma.galleryItem.delete({ where: { id } }),
  },
  blog: {
    create: (d) => prisma.blogPost.create({ data: { ...d, slug: d.slug || slugify(d.title) } }),
    update: (id, d) => prisma.blogPost.update({ where: { id }, data: d }),
    delete: (id) => prisma.blogPost.delete({ where: { id } }),
  },
  service: {
    create: (d) => prisma.service.create({ data: { ...d, slug: d.slug || slugify(d.name) } }),
    update: (id, d) => prisma.service.update({ where: { id }, data: d }),
    delete: (id) => prisma.service.delete({ where: { id } }),
  },
  faq: {
    create: (d) => prisma.faq.create({ data: d }),
    update: (id, d) => prisma.faq.update({ where: { id }, data: d }),
    delete: (id) => prisma.faq.delete({ where: { id } }),
  },
  media: {
    create: (d) => prisma.media.create({ data: d }),
    update: (id, d) => prisma.media.update({ where: { id }, data: d }),
    delete: (id) => prisma.media.delete({ where: { id } }),
  },
  lead: {
    create: (d) => prisma.lead.create({ data: d }),
    update: (id, d) => prisma.lead.update({ where: { id }, data: d }),
    delete: (id) => prisma.lead.delete({ where: { id } }),
  },
  navigation: {
    create: (d) => prisma.navigation.create({ data: d }),
    update: (id, d) => prisma.navigation.update({ where: { id }, data: d }),
    delete: (id) => prisma.navigation.delete({ where: { id } }),
  },
  footerSection: {
    create: (d) => prisma.footerSection.create({ data: d }),
    update: (id, d) => prisma.footerSection.update({ where: { id }, data: d }),
    delete: (id) => prisma.footerSection.delete({ where: { id } }),
  },
  seoMeta: {
    create: (d) => prisma.seoMeta.create({ data: d }),
    update: (id, d) => prisma.seoMeta.update({ where: { id }, data: d }),
    delete: (id) => prisma.seoMeta.delete({ where: { id } }),
  },
  newsletterSubscriber: {
    create: (d) => prisma.newsletterSubscriber.create({ data: d }),
    update: (id, d) => prisma.newsletterSubscriber.update({ where: { id }, data: d }),
    delete: (id) => prisma.newsletterSubscriber.delete({ where: { id } }),
  },
};

function adminPath(type: string): string {
  const map: Record<string, string> = {
    page: "pages",
    section: "pages",
    hero: "heroes",
    product: "products",
    land: "lands",
    testimonial: "testimonials",
    team: "team",
    gallery: "gallery",
    blog: "blog",
    service: "services",
    faq: "faqs",
    media: "media",
    lead: "leads",
    navigation: "navigation",
    footerSection: "footer",
    seoMeta: "seo",
    newsletterSubscriber: "newsletter",
  };
  return `/admin/${map[type] || `${type}s`}`;
}

export async function createItem(type: string, formData: FormData) {
  await requireAuth();
  const data = parseFormData(formData);
  await models[type].create(data);
  revalidatePath(adminPath(type));
}

export async function updateItem(type: string, id: string, formData: FormData) {
  await requireAuth();
  const data = parseFormData(formData);
  await models[type].update(id, data);
  revalidatePath(adminPath(type));
}

export async function deleteItem(type: string, id: string) {
  await requireAuth();
  await models[type].delete(id);
  revalidatePath(adminPath(type));
}

export async function updateSettings(data: Record<string, string>) {
  await requireAuth();
  for (const [key, value] of Object.entries(data)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  revalidatePath("/admin/settings");
}

export async function getSettings() {
  const settings = await prisma.siteSetting.findMany();
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}
