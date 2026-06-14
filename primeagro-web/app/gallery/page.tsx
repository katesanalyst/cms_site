import GalleryClient from "./GalleryClient";
import { fetchPageBySlug, fetchGallery, fetchPageMeta } from "@/lib/sanity";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta("gallery");
  if (!meta?.title) return {};
  return { title: meta.title, description: meta.description || undefined };
}

export default async function GalleryPage() {
  const [pageData, items] = await Promise.all([
    fetchPageBySlug("gallery"),
    fetchGallery(),
  ]);
  const hero = pageData?.hero ? {
    heading: pageData.hero.heading,
    subheading: pageData.hero.subheading,
    bgType: pageData.hero.bgType,
    bgImage: pageData.hero.bgImage,
    videoUrl: pageData.hero.videoUrl,
    videoType: pageData.hero.videoType,
    buttons: pageData.hero.buttons,
  } : undefined;

  const introSection = pageData?.sections?.find((s: any) => s.title?.toLowerCase().includes("gallery") || s.type?.toLowerCase().includes("intro"));
  const ctaSection = pageData?.sections?.find((s: any) => s.title?.toLowerCase().includes("cta") || s.title?.toLowerCase().includes("visit"));

  return <GalleryClient initialItems={items} hero={hero} introSection={introSection} ctaSection={ctaSection} />;
}
