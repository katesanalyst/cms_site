"use client";

import { useState } from "react";
import Hero from "@/components/ui/Hero";
import Container from "@/components/ui/Container";
import StorySection from "@/components/ui/StorySection";
import VideoPlayer from "@/components/ui/VideoPlayer";

interface GalleryItem {
  _id: string;
  title: string;
  mediaType: "image" | "video";
  image?: { asset: { url: string }; alt?: string };
  videoUrl?: string;
  videoPoster?: { asset: { url: string }; alt?: string };
  caption?: string;
  category?: string;
}

const fallbackItems: GalleryItem[] = [
  { _id: "1", title: "Organic Farm View", mediaType: "image", category: "Farm" },
  { _id: "2", title: "Alphonso Mangoes", mediaType: "image", category: "Products" },
  { _id: "3", title: "Solar Drying Setup", mediaType: "image", category: "Infrastructure" },
  { _id: "4", title: "Anjeera Fields", mediaType: "image", category: "Farm" },
  { _id: "5", title: "Drip Irrigation", mediaType: "image", category: "Infrastructure" },
  { _id: "6", title: "Seedling Nursery", mediaType: "image", category: "Farm" },
  { _id: "7", title: "Packaging Unit", mediaType: "image", category: "Infrastructure" },
  { _id: "8", title: "Our Team at Work", mediaType: "image", category: "Team" },
  { _id: "9", title: "Harvest Festival", mediaType: "image", category: "Events" },
  { _id: "10", title: "Dehydrated Vegetables", mediaType: "image", category: "Products" },
  { _id: "11", title: "Farm House", mediaType: "image", category: "Infrastructure" },
  { _id: "12", title: "Sunflower Field", mediaType: "image", category: "Farm" },
];

interface SectionData {
  title?: string;
  badge?: string;
  badgeIcon?: string;
  heading?: string;
  italicWords?: string;
  text?: string;
  items?: any[];
}

interface GalleryClientProps {
  initialItems?: GalleryItem[];
  hero?: {
    heading?: string;
    subheading?: string;
    bgType?: string;
    bgImage?: string;
    videoUrl?: string;
    videoType?: string;
    buttons?: any[];
  };
  introSection?: SectionData;
  ctaSection?: SectionData;
}

export default function GalleryClient({ initialItems, hero, introSection, ctaSection }: GalleryClientProps) {
  const [active, setActive] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const items = initialItems && initialItems.length > 0 ? initialItems : fallbackItems;
  const derivedCategories = ["All", ...Array.from(new Set(items.map((item) => item.category).filter((c): c is string => !!c))), "Video"];
  const filtered = active === "All" ? items : items.filter((item) => item.category === active || (active === "Video" && item.mediaType === "video"));

  return (
    <>
      <Hero
        heading={hero?.heading || "Gallery & Videos"}
        text={hero?.subheading || "Explore our farms, products, and the people behind Prime Agro Farms."}
        variant="page"
        heroImage={hero?.bgType === "image" && hero.bgImage ? { asset: { url: hero.bgImage } } : undefined}
        heroVideo={hero?.bgType === "video" && hero.videoUrl && hero.videoType ? { videoUrl: hero.videoUrl, videoType: hero.videoType } : undefined}
        buttons={hero?.buttons?.length ? hero.buttons.map((b: any) => ({ text: b.text, link: b.href || b.link || "/", variant: b.variant || "gold" })) : undefined}
      />

      <section className="py-24">
        <Container>
          <StorySection
            badge={introSection?.badge || "Gallery"}
            badgeIcon={introSection?.badgeIcon || "📷"}
            heading={introSection?.heading || "A walk through the forest tells you everything a brochure cannot."}
            italicWords={introSection?.italicWords ? introSection.italicWords.split(",").map((w: string) => w.trim()) : ["cannot"]}
            text={introSection?.text}
          />

          <div className="flex flex-wrap justify-center gap-2 mb-12 mt-14">
            {derivedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-text-light hover:bg-cream-dark border border-border-light"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <div
                key={item._id}
                onClick={() => item.mediaType === "video" && item.videoUrl ? setSelectedItem(item) : null}
                className={`group relative rounded-2xl aspect-square overflow-hidden border border-border-light transition-all duration-300 ${
                  item.mediaType === "video" ? "cursor-pointer hover:shadow-xl" : "hover:shadow-xl"
                }`}
              >
                {item.image?.asset?.url ? (
                  <img src={item.image.asset.url} alt={item.image.alt || item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cream to-cream-dark flex flex-col items-center justify-center gap-3">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {item.mediaType === "video" ? "🎬" : "📷"}
                    </span>
                  </div>
                )}

                {item.mediaType === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-primary-dark ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-sm font-medium">{item.title}</span>
                  {item.category && (
                    <span className="ml-2 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{item.category}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {selectedItem?.videoUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedItem(null)}>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <VideoPlayer
              videoType="youtube"
              videoUrl={selectedItem.videoUrl}
              poster={selectedItem.videoPoster?.asset?.url}
              title={selectedItem.title}
              aspectRatio="16/9"
            />
            <button onClick={() => setSelectedItem(null)} className="absolute -top-12 right-0 text-white text-3xl hover:text-accent">✕</button>
          </div>
        </div>
      )}

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d3a1e] via-[#3a5530] to-[#4a6b3d]" />
        <Container>
          <div className="relative z-10">
            <StorySection
              badge={ctaSection?.badge || "Visit Us"}
              badgeIcon={ctaSection?.badgeIcon || "🌿"}
              heading={ctaSection?.heading || "The forest does not show itself through a screen. Come walk it."}
              italicWords={ctaSection?.italicWords ? ctaSection.italicWords.split(",").map((w: string) => w.trim()) : ["walk it"]}
              text={ctaSection?.text || "Schedule a farm visit and see our operations firsthand."}
              light
            />
            <div className="flex justify-center mt-10">
              <a href="/contact" className="inline-block bg-accent text-primary-dark px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-accent-dark transition-colors shadow-md">
                Schedule a Visit
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
