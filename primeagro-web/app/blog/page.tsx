import Hero from "@/components/ui/Hero";
import Container from "@/components/ui/Container";
import StorySection from "@/components/ui/StorySection";
import BlogGrid from "@/components/home/BlogGrid";
import { fetchPageBySlug, fetchBlogPosts, fetchPageMeta } from "@/lib/sanity";
import { resolveIcon } from "@/lib/icons";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta("blog");
  if (!meta?.title) return {};
  return { title: meta.title, description: meta.description || undefined };
}

const fallbackPosts = [
  { title: "The Future of Organic Farming in India", excerpt: "Discover how organic farming is transforming agriculture across India with sustainable practices.", category: "Farming", date: "June 10, 2026", featuredImage: null },
  { title: "Benefits of Solar Dried Produce", excerpt: "Learn about the advantages of solar drying technology for preserving organic fruits and vegetables.", category: "Products", date: "June 5, 2026", featuredImage: null },
  { title: "Why Invest in Farmland?", excerpt: "Farmland is one of the most stable and rewarding long-term investments available today.", category: "Investment", date: "May 28, 2026", featuredImage: null },
  { title: "Dyanna California Anjeera: A Premium Variety", excerpt: "Everything you need to know about the premium Dyanna California fig variety and its cultivation.", category: "Farming", date: "May 20, 2026", featuredImage: null },
];

export default async function BlogPage() {
  const [pageData, posts] = await Promise.all([
    fetchPageBySlug("blog"),
    fetchBlogPosts(),
  ]);

  const hero = pageData?.hero;
  const introSection = pageData?.sections?.find((s: any) => s.title?.toLowerCase().includes("blog") || s.type?.toLowerCase().includes("intro"));

  const list = posts?.length
    ? posts.map((p: { title: string; excerpt: string; category: string; publishedAt: string; featuredImage?: { asset: { url: string }; alt?: string } }) => ({
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "",
        featuredImage: p.featuredImage,
      }))
    : fallbackPosts;

  return (
    <>
      <Hero
        heading={hero?.heading || "Blog & Insights"}
        text={hero?.subheading || "Stay updated with the latest from Prime Agro Farms."}
        variant="page"
        heroImage={hero?.bgType === "image" && hero.bgImage ? { asset: { url: hero.bgImage } } : undefined}
        heroVideo={hero?.bgType === "video" && hero.videoUrl && hero.videoType ? { videoUrl: hero.videoUrl, videoType: hero.videoType } : undefined}
        buttons={hero?.buttons?.length ? hero.buttons.map((b: any) => ({ text: b.text, link: b.href || b.link || "/", variant: b.variant || "gold" })) : undefined}
      />

      <section className="py-24">
        <Container>
          <StorySection
            badge={introSection?.badge || "Blog"}
            badgeIcon={resolveIcon(introSection?.badgeIcon, introSection?.badge) || "📝"}
            heading={introSection?.heading || "Notes from the field. Stories the soil whispered."}
            text={introSection?.text}
          />

          <BlogGrid posts={list} />
        </Container>
      </section>
    </>
  );
}
