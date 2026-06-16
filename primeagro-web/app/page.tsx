import Hero from "@/components/ui/Hero";
import Container from "@/components/ui/Container";
import StorySection from "@/components/ui/StorySection";
import FeatureCard from "@/components/home/FeatureCard";
import StatsBar from "@/components/home/StatsBar";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import GalleryGrid from "@/components/home/GalleryGrid";
import Button from "@/components/ui/Button";
import { fetchHomePage, fetchTestimonials, fetchPageBySlug, fetchPageMeta } from "@/lib/sanity";
import { resolveIcon } from "@/lib/icons";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta("homepage");
  if (!meta?.title) return {};
  return { title: meta.title, description: meta.description || undefined };
}

function getSection(sections: any[], match: string) {
  return sections?.find((s: any) => s.title?.toLowerCase().includes(match) || s.type?.toLowerCase().includes(match));
}

export default async function HomePage() {
  const [home, testimonials, pageData] = await Promise.all([
    fetchHomePage(),
    fetchTestimonials(),
    fetchPageBySlug("homepage"),
  ]);

  const data = home;
  const hero = pageData?.hero;
  const sections = pageData?.sections || [];

  const focusSection = getSection(sections, "focus") || getSection(sections, "what we do");
  const sustainSection = getSection(sections, "sustain");
  const statsSection = getSection(sections, "stats");
  const processSection = getSection(sections, "process");
  const ctaSection = getSection(sections, "cta");

  const cards = focusSection?.items?.length ? focusSection.items : data.cards || [];
  const steps = processSection?.items?.length ? processSection.items : data.steps || [];
  const stats = statsSection?.items?.length ? statsSection.items : data.stats || [];
  const sustainList = sustainSection?.items?.length ? sustainSection.items : data.sustainList || [];

  return (
    <>
      <Hero
        tag={hero?.tag || data.heroTag}
        heading={hero?.heading || data.heroHeading}
        text={hero?.subheading || data.heroText}
        heroImage={hero?.bgType === "image" && hero.bgImage ? { asset: { url: hero.bgImage } } : data.heroImage}
        heroVideo={hero?.videoUrl && hero?.videoType ? { videoUrl: hero.videoUrl, videoType: hero.videoType } : data.heroVideo}
        showSoundToggle={data.heroShowSoundToggle}
        buttons={hero?.buttons?.length
          ? hero.buttons.map((b: any) => ({ text: b.text, link: b.href || b.link || "/", variant: b.variant || "gold" }))
          : [
              { text: "Explore Our Farms", link: "/farming-focus", variant: "gold" },
              { text: "Schedule a Farm Visit", link: "/contact", variant: "outline" },
            ]
        }
      />

      {/* Farming Focus */}
      <section className="py-24">
        <Container>
          <StorySection
            badge={focusSection?.badge || "What We Do"}
            badgeIcon={resolveIcon(focusSection?.badgeIcon, focusSection?.badge) || "🌾"}
            heading={focusSection?.heading || "The land gives what the land is given. We give it everything."}
            text={focusSection?.text || "Three pillars of sustainable agriculture — premium fig cultivation, organic dehydration, and long-term mango plantations. Each one rooted in patience, harvested with care."}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {cards.map((card: { icon: string; title: string; text: string; image?: { asset: { url: string }; alt?: string } }, i: number) => (
              <FeatureCard key={i} icon={resolveIcon(card.icon, card.title)} title={card.title} text={card.text} image={card.image} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Sustainability */}
      <section className="py-24 bg-cream-dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <StorySection
              badge={sustainSection?.badge || "Sustainability"}
              badgeIcon={resolveIcon(sustainSection?.badgeIcon, sustainSection?.badge) || "☀️"}
              heading={sustainSection?.heading || "We do not take from the sun. We simply ask it to help."}
              text={sustainSection?.text || data.sustainText}
              align="left"
            />
            <div className="relative">
              {data.sustainImage?.asset?.url ? (
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={data.sustainImage.asset.url} alt={data.sustainImage.alt || "Sustainability"} className="w-full h-80 object-cover" />
                  <div className="bg-gradient-to-br from-primary to-primary-dark p-8 text-center text-white">
                    <h3 className="text-accent text-xl font-serif font-bold mb-2">{data.sustainBoxTitle}</h3>
                    <p className="text-white/70 text-sm">{data.sustainBoxText}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-12 text-center text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">☀️</span>
                    </div>
                    <h3 className="text-accent text-xl font-serif font-bold mb-3">{data.sustainBoxTitle}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{data.sustainBoxText}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {sustainList.length > 0 && (
            <div className="mt-14 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sustainList.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-border-light">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm">✓</span>
                    </span>
                    <span className="text-sm font-medium text-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <StatsBar stats={stats} />

      {/* Process Steps */}
      <section className="py-24 bg-white">
        <Container>
          <StorySection
            badge={processSection?.badge || "Our Process"}
            badgeIcon={resolveIcon(processSection?.badgeIcon, processSection?.badge) || "🌱"}
            heading={processSection?.heading || "The bees fill the comb when they are ready. We wait."}
            text={processSection?.text || "From seed to table, every step is guided by nature and patience. We do not rush the harvest. We wait until the land says it is time."}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {steps.map((step: { num: string; title: string; text: string; image?: { asset: { url: string }; alt?: string } }, i: number) => (
              <div key={i} className="relative group text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-[2px] bg-border-light" />
                )}
                {step.image?.asset?.url ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-5 border-2 border-accent/30 group-hover:border-accent transition-all">
                    <img src={step.image.asset.url} alt={step.image.alt || step.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full border-2 border-accent/30 flex items-center justify-center mx-auto mb-5 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                    <span className="font-serif text-2xl font-bold text-accent">{step.num}</span>
                  </div>
                )}
                <h3 className="font-serif text-lg font-bold text-primary-dark mb-2">{step.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialCarousel
        testimonials={testimonials || []}
        heading={data.testimonialHeading || undefined}
        text={data.testimonialText || undefined}
        badge={getSection(sections, "testimonial")?.badge || undefined}
        badgeIcon={resolveIcon(getSection(sections, "testimonial")?.badgeIcon, getSection(sections, "testimonial")?.badge) || undefined}
      />
      <GalleryGrid />

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d3a1e] via-[#3a5530] to-[#4a6b3d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.1)_0%,_transparent_60%)]" />
        <Container>
          <div className="relative z-10">
            <StorySection
              badge={ctaSection?.badge || "Get Started"}
              badgeIcon={resolveIcon(ctaSection?.badgeIcon, ctaSection?.badge) || "🌿"}
              heading={ctaSection?.heading || "We simply obey the land. And the land obeys us back."}
              text={ctaSection?.text || data.ctaText}
              light
            />
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {data.ctaBtn1 && <Button text={data.ctaBtn1.text} href={data.ctaBtn1.link} variant="gold" />}
              {data.ctaBtn2 && <Button text={data.ctaBtn2.text} href={data.ctaBtn2.link} variant="outline" />}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
