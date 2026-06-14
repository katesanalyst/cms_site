import Hero from "@/components/ui/Hero";
import Container from "@/components/ui/Container";
import StorySection from "@/components/ui/StorySection";
import StatsBar from "@/components/home/StatsBar";
import Button from "@/components/ui/Button";
import { fetchPageBySlug, fetchPageMeta } from "@/lib/sanity";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta("sustainability");
  if (!meta?.title) return {};
  return { title: meta.title, description: meta.description || undefined };
}

const fallbackCards = [
  { icon: "💧", title: "Water Conservation", text: "Drip irrigation systems across all farmlands reduce water usage by up to 60% compared to traditional flood irrigation." },
  { icon: "♻️", title: "Zero Waste", text: "Organic waste is composted and reused as natural fertilizer. We strive for a closed-loop farming ecosystem." },
  { icon: "🌍", title: "Carbon Footprint", text: "Local distribution networks minimize transportation emissions. Our solar processing facility operates carbon-neutral." },
];

const fallbackStats = [
  { num: "60%", label: "Less Water Usage" },
  { num: "100%", label: "Solar Processing" },
  { num: "0", label: "Chemical Preservatives" },
];

function renderSection(section: any, idx: number) {
  const items = Array.isArray(section.items) ? section.items : (() => { try { return JSON.parse(section.items || "[]"); } catch { return []; } })();

  if (section.type === "story") {
    return (
      <section key={section.id || idx} className="py-24">
        <Container>
          <StorySection
            badge={section.badge}
            badgeIcon={section.badgeIcon}
            heading={section.heading}
            italicWords={section.italicWords ? section.italicWords.split(",").map((w: string) => w.trim()) : []}
            text={section.text}
            align={section.align || "left"}
            light={section.light}
          />
          {items.length > 0 && (
            <div className={`grid gap-8 mt-14 ${items.length <= 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}>
              {items.map((card: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-border-light hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <span className="text-3xl">{card.icon}</span>
                  </div>
                  <h3 className="font-serif font-bold text-primary-dark text-lg mb-3">{card.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    );
  }

  if (section.type === "cards") {
    return (
      <section key={section.id || idx} className="py-24">
        <Container>
          {section.heading && (
            <StorySection
              badge={section.badge}
              badgeIcon={section.badgeIcon}
              heading={section.heading}
              italicWords={section.italicWords ? section.italicWords.split(",").map((w: string) => w.trim()) : []}
              text={section.text}
            />
          )}
          <div className={`grid gap-8 mt-14 ${items.length <= 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}>
            {items.map((card: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-border-light hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-3xl">{card.icon}</span>
                </div>
                <h3 className="font-serif font-bold text-primary-dark text-lg mb-3">{card.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (section.type === "stats") {
    return <StatsBar key={section.id || idx} stats={items.length ? items : fallbackStats} />;
  }

  if (section.type === "cta") {
    return (
      <section key={section.id || idx} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d3a1e] via-[#3a5530] to-[#4a6b3d]" />
        <Container>
          <div className="relative z-10">
            <StorySection
              badge={section.badge}
              badgeIcon={section.badgeIcon}
              heading={section.heading}
              italicWords={section.italicWords ? section.italicWords.split(",").map((w: string) => w.trim()) : []}
              text={section.text}
              light
            />
            <div className="flex justify-center mt-10">
              <Button text="Get Involved" href="/contact" variant="gold" />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return null;
}

export default async function SustainabilityPage() {
  const pageData = await fetchPageBySlug("sustainability");
  const hero = pageData?.hero;
  const sections = pageData?.sections || [];

  const hasCards = sections.some((s: any) => s.type === "cards");
  const hasStats = sections.some((s: any) => s.type === "stats");

  return (
    <>
      <Hero
        heading={hero?.heading || "Sustainability at Prime Agro Farms"}
        text={hero?.subheading || "Our Commitment to the Planet"}
        variant="page"
        heroImage={hero?.bgType === "image" && hero.bgImage ? { asset: { url: hero.bgImage } } : undefined}
        heroVideo={hero?.bgType === "video" && hero.videoUrl && hero.videoType ? { videoUrl: hero.videoUrl, videoType: hero.videoType } : undefined}
        buttons={hero?.buttons?.length ? hero.buttons.map((b: any) => ({ text: b.text, link: b.href || b.link || "/", variant: b.variant || "gold" })) : undefined}
      />

      {sections.length > 0 ? (
        sections.map((s: any, i: number) => renderSection(s, i))
      ) : (
        <>
          <section className="py-24">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <StorySection
                  badge="Solar Technology"
                  badgeIcon="☀️"
                  heading="The sun does the work. We simply hold the jar."
                  italicWords={["work", "jar"]}
                  text="We harness the power of the sun for natural dehydration of our organic produce. Our solar drying technology preserves nutrients naturally without chemical preservatives, reducing energy consumption and carbon footprint."
                  align="left"
                />
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">☀️</span>
                      </div>
                      <h3 className="text-accent text-xl font-serif font-bold mb-3">100% Solar-Powered Processing</h3>
                      <p className="text-white/70 text-sm leading-relaxed">Our dehydration facility runs entirely on solar energy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {fallbackCards.map((card, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-border-light hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <span className="text-3xl">{card.icon}</span>
                    </div>
                    <h3 className="font-serif font-bold text-primary-dark text-lg mb-3">{card.title}</h3>
                    <p className="text-text-light text-sm leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
          <StatsBar stats={fallbackStats} />
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2d3a1e] via-[#3a5530] to-[#4a6b3d]" />
            <Container>
              <div className="relative z-10">
                <StorySection badge="Join Us" badgeIcon="🌍" heading="A forest that is loved is a forest that is kept." italicWords={["loved", "kept"]} text="Be part of a greener future. Invest in organic farmland and support sustainable agriculture." light />
                <div className="flex justify-center mt-10">
                  <Button text="Get Involved" href="/contact" variant="gold" />
                </div>
              </div>
            </Container>
          </section>
        </>
      )}
    </>
  );
}
