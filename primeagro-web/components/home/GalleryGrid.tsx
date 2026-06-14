import Link from "next/link";
import StorySection from "../ui/StorySection";
import { fetchGallery, fetchPageBySlug } from "@/lib/sanity";

const fallbackItems = [
  { emoji: "🌿", label: "Organic Farm", href: "/gallery" },
  { emoji: "🥭", label: "Mango Plantation", href: "/gallery" },
  { emoji: "☀️", label: "Solar Processing", href: "/gallery" },
  { emoji: "🌾", label: "Anjeera Fields", href: "/gallery" },
  { emoji: "💧", label: "Drip Irrigation", href: "/gallery" },
  { emoji: "🌱", label: "Seedling Nursery", href: "/gallery" },
];

export default async function GalleryGrid() {
  const [galleryItems, pageData] = await Promise.all([
    fetchGallery(),
    fetchPageBySlug("homepage"),
  ]);

  const sections = pageData?.sections || [];
  const gallerySection = sections.find((s: any) => s.title?.toLowerCase().includes("gallery") || s.type?.toLowerCase().includes("gallery"));

  const items = galleryItems?.length
    ? galleryItems.slice(0, 6).map((item: { _id: string; title: string; image?: { asset: { url: string }; alt?: string }; category: string }) => ({
        label: item.title,
        imageUrl: item.image?.asset?.url,
        alt: item.image?.alt || item.title,
        href: "/gallery",
      }))
    : fallbackItems.map((item) => ({ ...item, imageUrl: undefined, alt: item.label }));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <StorySection
          badge={gallerySection?.badge || "Gallery"}
          badgeIcon={gallerySection?.badgeIcon || "📷"}
          heading={gallerySection?.heading || "A walk through the forest tells you everything a brochure cannot."}
          italicWords={gallerySection?.italicWords ? gallerySection.italicWords.split(",").map((w: string) => w.trim()) : ["cannot"]}
          text={gallerySection?.text || "Explore our farms, products, and the people who make it all happen."}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-14">
          {items.map((item: { label: string; imageUrl?: string; alt: string; href: string; emoji?: string }, i: number) => (
            <Link
              key={i}
              href={item.href}
              className="group relative rounded-2xl aspect-square overflow-hidden border border-border-light hover:shadow-xl transition-all duration-300"
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cream to-cream-dark flex flex-col items-center justify-center gap-3">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{(item as { emoji?: string }).emoji || "📷"}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-4 left-4 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/gallery" className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-all">
            View Full Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
