import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import StorySection from "@/components/ui/StorySection";
import { fetchFarmLands, fetchSiteSettings, fetchPageBySlug, fetchPageMeta } from "@/lib/sanity";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta("farmlands");
  if (!meta?.title) return {};
  return { title: meta.title, description: meta.description || undefined };
}

function getSection(sections: any[], match: string) {
  return sections?.find((s: any) => s.title?.toLowerCase().includes(match) || s.type?.toLowerCase().includes(match));
}

export default async function FarmlandsPage() {
  const [lands, settings, pageData] = await Promise.all([fetchFarmLands(), fetchSiteSettings(), fetchPageBySlug("farmlands")]);
  const hero = pageData?.hero;
  const sections = pageData?.sections || [];

  const overviewSection = getSection(sections, "overview") || getSection(sections, "welcome");
  const phone = settings?.whatsapp || "+91 98765 43210";
  const phoneDigits = phone.replace(/[^0-9]/g, "");

  return (
    <>
      <Hero
        tag={hero?.tag || "Our Farmlands"}
        heading={hero?.heading || "Where the soil tells its own story."}
        text={hero?.subheading || "Explore the land behind our produce — from heritage fig groves in Pollachi to expansive mango orchards stretching across the Tamil Nadu–Kerala border."}
        heroImage={hero?.bgType === "image" && hero.bgImage ? { asset: { url: hero.bgImage } } : { asset: { url: "/images/farmlands-hero.jpg" } }}
        buttons={hero?.buttons?.length
          ? hero.buttons.map((b: any) => ({ text: b.text, link: b.href || b.link || "/", variant: b.variant || "gold" }))
          : [{ text: "Book a Farm Visit", link: `https://wa.me/${phoneDigits}?text=Hi%20I%27d%20like%20to%20visit%20your%20farm.`, variant: "gold" }, { text: "Talk to Sales", link: "/contact", variant: "outline" }]
        }
      />

      {overviewSection && (
        <section className="py-24 bg-cream">
          <Container>
            <StorySection
              badge={overviewSection.badge || "Overview"}
              badgeIcon={overviewSection.badgeIcon || "🌾"}
              heading={overviewSection.heading}
              italicWords={overviewSection.italicWords ? overviewSection.italicWords.split(",").map((w: string) => w.trim()) : []}
              text={overviewSection.text}
            />
          </Container>
        </section>
      )}

      <section className="py-24 bg-white">
        <Container>
          {(!lands || lands.length === 0) ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl">🌾</span></div>
              <h2 className="font-serif text-3xl font-bold text-primary-dark mb-4">Farmlands Coming Soon</h2>
              <p className="text-text-light max-w-lg mx-auto mb-8">We are currently curating details about our farmlands. Check back soon for information about our properties, soil conditions, and available plots.</p>
              <Button text="Schedule a Visit" href={`https://wa.me/${phoneDigits}?text=Hi%20I%27d%20like%20to%20visit%20your%20farm.`} variant="primary" />
            </div>
          ) : (
            <div className="space-y-16">
              {lands.map((land: any, i: number) => (
                <div key={land._id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    {land.image?.asset?.url ? (
                      <img src={land.image.asset.url} alt={land.image.alt || land.name} className="rounded-2xl shadow-lg w-full h-80 object-cover" />
                    ) : (
                      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-12 flex items-center justify-center h-80">
                        <span className="text-6xl">🌾</span>
                      </div>
                    )}
                  </div>
                  <div className={`${i % 2 === 1 ? "lg:order-1" : ""} ${i % 2 === 1 ? "lg:text-right" : ""}`}>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">{land.location || "Tamil Nadu, India"}</span>
                    <h2 className="font-serif text-3xl font-bold text-primary-dark mb-4">{land.name}</h2>
                    <p className="text-text-light leading-relaxed mb-6">{land.description || "A premium agricultural property with rich soil and excellent water access, ideal for sustainable cultivation."}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-cream rounded-xl p-4 text-center">
                        <div className="text-xl font-bold text-accent">{land.areaAcres || "200+"}</div>
                        <div className="text-xs text-text-light">Acres</div>
                      </div>
                      <div className="bg-cream rounded-xl p-4 text-center">
                        <div className="text-xl font-bold text-accent">{land.soilType || "Red Loam"}</div>
                        <div className="text-xs text-text-light">Soil Type</div>
                      </div>
                    </div>
                    {land.highlights?.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {land.highlights.map((h: string, j: number) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-text"><span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-primary text-xs">✓</span></span>{h}</div>
                        ))}
                      </div>
                    )}
                    <Button text="Enquire Now" href={`https://wa.me/${phoneDigits}?text=Hi%20I%27m%20interested%20in%20the%20${encodeURIComponent(land.name)}%20plot.`} variant="primary" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
