import Hero from "@/components/ui/Hero";
import Container from "@/components/ui/Container";
import StorySection from "@/components/ui/StorySection";
import { fetchPageBySlug, fetchBlogPosts, fetchPageMeta } from "@/lib/sanity";
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

  const catSet = new Set<string>();
  list.forEach((p: any) => { if (p.category) catSet.add(p.category); });
  const derivedCategories = ["All", ...Array.from(catSet)];

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
            badgeIcon={introSection?.badgeIcon || "📝"}
            heading={introSection?.heading || "Notes from the field. Stories the soil whispered."}
            italicWords={introSection?.italicWords ? introSection.italicWords.split(",").map((w: string) => w.trim()) : ["whispered"]}
            text={introSection?.text}
          />

          <div className="flex flex-wrap justify-center gap-2 mb-12 mt-14">
            {derivedCategories.map((cat, i) => (
              <button key={cat} className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${i === 0 ? "bg-primary text-white shadow-md" : "bg-white text-text-light hover:bg-cream-dark border border-border-light"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((post: { title: string; excerpt: string; category: string; date: string; featuredImage?: { asset: { url: string }; alt?: string } }, i: number) => (
              <article key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden group cursor-pointer border border-border-light hover:shadow-lg transition-all duration-300">
                {/* Featured image or gradient */}
                {post.featuredImage?.asset?.url ? (
                  <div className="h-48 overflow-hidden">
                    <img src={post.featuredImage.asset.url} alt={post.featuredImage.alt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📝</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-accent text-primary-dark px-3 py-1 rounded-full font-semibold">{post.category}</span>
                    <span className="text-xs text-text-muted">{post.date}</span>
                  </div>
                  <h3 className="font-serif font-bold text-primary-dark mb-2 group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
