import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import StorySection from "@/components/ui/StorySection";
import { fetchSiteSettings, fetchPageBySlug, fetchPageMeta } from "@/lib/sanity";
import { resolveIcon } from "@/lib/icons";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta("about");
  if (!meta?.title) return {};
  return { title: meta.title, description: meta.description || undefined };
}

function getSection(sections: any[], match: string) {
  return sections?.find((s: any) => s.title?.toLowerCase().includes(match) || s.type?.toLowerCase().includes(match));
}

export default async function AboutPage() {
  const [settings, pageData] = await Promise.all([fetchSiteSettings(), fetchPageBySlug("about")]);
  const hero = pageData?.hero;
  const sections = pageData?.sections || [];

  const storySection = getSection(sections, "story") || getSection(sections, "mission");
  const visionSection = getSection(sections, "vision") || getSection(sections, "approach");
  const valuesSection = getSection(sections, "values");
  const teamSection = getSection(sections, "team");

  return (
    <>
      <Hero
        tag={hero?.tag || "About Us"}
        heading={hero?.heading || "Rooted in Tradition. Growing with Purpose."}
        text={hero?.subheading || "For over three decades, Prime Agro Farms has been cultivating more than crops — we have been nurturing a vision of sustainable agriculture that honors the land and empowers the communities it supports."}
        heroImage={hero?.bgType === "image" && hero.bgImage ? { asset: { url: hero.bgImage } } : { asset: { url: "/images/about-hero.jpg" } }}
        buttons={hero?.buttons?.length
          ? hero.buttons.map((b: any) => ({ text: b.text, link: b.href || b.link || "/", variant: b.variant || "gold" }))
          : [{ text: "Visit Our Farms", link: "/farmlands", variant: "gold" }, { text: "View Open Positions", link: "/contact", variant: "outline" }]
        }
      />

      <section className="py-24 bg-cream">
        <Container>
          <StorySection
            badge={storySection?.badge || "Our Story"}
            badgeIcon={resolveIcon(storySection?.badgeIcon, storySection?.badge) || "🎯"}
            heading={storySection?.heading || "We are not a factory. We are not a farm. We are forest keepers."}
            text={storySection?.text || "Since 1992, we have believed that farming is not just an occupation — it is a relationship with the land. Every decision we make is guided by a deep respect for the soil, the water, and the people who work with us."}
          />
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <StorySection
              badge={visionSection?.badge || "Our Vision"}
              badgeIcon={resolveIcon(visionSection?.badgeIcon, visionSection?.badge) || "🌿"}
              heading={visionSection?.heading || "Our Vision 2027"}
              text={visionSection?.text || "At Prime Agro Farms, we practice regenerative agriculture — a method that works with nature, not against it."}
              align="left"
            />
            {storySection?.items?.length > 0 ? (
              <div className="bg-cream rounded-2xl p-10 space-y-6">
                {storySection.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1"><span className="text-primary text-lg">{item.icon || "✓"}</span></div>
                    <div><h4 className="font-bold text-primary-dark mb-1">{item.title}</h4><p className="text-text-light text-sm">{item.text}</p></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-cream rounded-2xl p-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1"><span className="text-primary text-lg">✓</span></div>
                  <div><h4 className="font-bold text-primary-dark mb-1">Zero Chemical Fertilizers</h4><p className="text-text-light text-sm">Every crop is grown using natural compost and bio-fertilizers only.</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1"><span className="text-primary text-lg">✓</span></div>
                  <div><h4 className="font-bold text-primary-dark mb-1">Solar-Powered Dehydration</h4><p className="text-text-light text-sm">Our dehydration units run on hybrid solar energy systems.</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1"><span className="text-primary text-lg">✓</span></div>
                  <div><h4 className="font-bold text-primary-dark mb-1">Community First</h4><p className="text-text-light text-sm">We hire locally, train locally, and invest in local schools and healthcare.</p></div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-cream">
        <Container>
          <StorySection
            badge={teamSection?.badge || "Our Team"}
            badgeIcon={resolveIcon(teamSection?.badgeIcon, teamSection?.badge) || "👥"}
            heading={teamSection?.heading || "Led by farmers. Powered by purpose."}
            text={teamSection?.text || "From the Chairman to the field supervisors, our leadership team has one thing in common — a shared love for the land and a commitment to doing things the right way."}
          />
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button text="See Our Team" href="/about#team" variant="primary" />
            <Button text="Visit a Farm" href="/farmlands" variant="outline" />
          </div>
        </Container>
      </section>
    </>
  );
}
