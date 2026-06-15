import Hero from "@/components/ui/Hero";
import Container from "@/components/ui/Container";
import StorySection from "@/components/ui/StorySection";
import Button from "@/components/ui/Button";
import { fetchPageBySlug, fetchFAQs, fetchSiteSettings, fetchPageMeta } from "@/lib/sanity";
import { resolveIcon } from "@/lib/icons";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta("farming-focus");
  if (!meta?.title) return {};
  return { title: meta.title, description: meta.description || undefined };
}

const fallbackBenefits = [
  { icon: "🏗️", title: "Farm Setup Assistance", text: "End-to-end support in planning and setting up your dream farm from scratch" },
  { icon: "💧", title: "Irrigation Planning", text: "Professional irrigation system design for optimal water management" },
  { icon: "🌱", title: "Plantation Support", text: "Expert guidance on crop selection and organic cultivation methods" },
  { icon: "🔧", title: "Farm Maintenance", text: "Ongoing farm maintenance services for productive land" },
  { icon: "📊", title: "Harvest & Yield Support", text: "Assistance with harvest planning and produce marketing" },
  { icon: "📜", title: "Legal & Documentation", text: "Complete legal support including title verification and registration" },
];

const fallbackWhyChoose = [
  { icon: "⚖️", title: "Legal & Transparent", text: "Clear titles, transparent pricing, complete legal support" },
  { icon: "👨‍🌾", title: "Expert Farm Support", text: "10+ years of agricultural expertise at your service" },
  { icon: "📈", title: "High ROI Potential", text: "Premium organic produce ensures excellent returns" },
  { icon: "🌿", title: "Long-term Sustainability", text: "Eco-friendly practices for lasting agricultural value" },
];

const fallbackFaqs = [
  { question: "What is the minimum land size available?", answer: "We offer agricultural farm lands starting from 1 acre, with flexible options based on your requirements and budget." },
  { question: "Is financing assistance available?", answer: "Yes, we assist with bank loan documentation and financing options for eligible buyers." },
  { question: "What support do you provide after purchase?", answer: "We provide comprehensive after-sales support including farm setup, irrigation planning, plantation guidance, and ongoing maintenance assistance." },
  { question: "Can I visit the farm lands before purchase?", answer: "Absolutely! We encourage all prospective buyers to schedule a farm visit. We provide guided tours of available properties." },
];

export default async function FarmingFocusPage() {
  const [pageData, cmsFaqs, settings] = await Promise.all([
    fetchPageBySlug("farming-focus"),
    fetchFAQs(),
    fetchSiteSettings(),
  ]);

  const hero = pageData?.hero;
  const sections = pageData?.sections || [];
  const whatsappNumber = settings.whatsapp?.replace(/[^0-9]/g, "") || "919876543210";

  function getSection(match: string) {
    return sections.find((s: any) => s.title?.toLowerCase().includes(match) || s.type?.toLowerCase().includes(match));
  }

  const benefitsSection = getSection("offer") || getSection("benefit");
  const whyChooseSection = getSection("why") || getSection("trust");
  const faqSection = getSection("faq");
  const ctaSection = getSection("cta");

  const benefits = benefitsSection?.items?.length ? benefitsSection.items : fallbackBenefits;
  const whyChoose = whyChooseSection?.items?.length ? whyChooseSection.items : fallbackWhyChoose;
  const faqs = cmsFaqs?.length ? cmsFaqs : fallbackFaqs;

  return (
    <>
      <Hero
        heading={hero?.heading || "Own Your Dream Farmland"}
        text={hero?.subheading || "Nature-based Agricultural Investments — Own a piece of fertile land and let us help you build your dream farm."}
        variant="page"
        heroImage={hero?.bgType === "image" && hero.bgImage ? { asset: { url: hero.bgImage } } : undefined}
        heroVideo={hero?.bgType === "video" && hero.videoUrl && hero.videoType ? { videoUrl: hero.videoUrl, videoType: hero.videoType } : undefined}
        buttons={hero?.buttons?.length
          ? hero.buttons.map((b: any) => ({ text: b.text, link: b.href || b.link || "/", variant: b.variant || "gold" }))
          : [
              { text: "Schedule a Visit", link: "#consult", variant: "gold" },
              { text: "WhatsApp Us", link: `https://wa.me/${whatsappNumber}`, variant: "outline" },
            ]
        }
      />

      <div className="text-center py-6 bg-white border-b border-border-light">
        <span className="inline-block bg-accent text-primary-dark px-6 py-2 rounded-full font-bold text-sm">
          {settings.priceBannerText || "Starting from ₹9 Lakhs per Acre"}
          <small className="block text-xs font-normal opacity-70 mt-1">{settings.priceBannerDisclaimer || "*Subject to availability, based on location and development scope"}</small>
        </span>
      </div>

      <section className="py-24">
        <Container>
          <StorySection
            badge={benefitsSection?.badge || "What We Offer"}
            badgeIcon={resolveIcon(benefitsSection?.badgeIcon, benefitsSection?.badge) || "🌾"}
            heading={benefitsSection?.heading || "We do not just sell land. We grow futures."}
            text={benefitsSection?.text || "Complete farm development support from selection to harvest."}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {benefits.map((b: { icon: string; title: string; text: string }, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-border-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-3xl">{b.icon}</span>
                </div>
                <h4 className="font-serif font-bold text-primary-dark mb-2">{b.title}</h4>
                <p className="text-text-light text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-cream-dark">
        <Container>
          <StorySection
            badge={whyChooseSection?.badge || "Why Prime Agro"}
            badgeIcon={resolveIcon(whyChooseSection?.badgeIcon, whyChooseSection?.badge) || "⭐"}
            heading={whyChooseSection?.heading || "Trust is not sold. It is grown, slowly, season by season."}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-14">
            {whyChoose.map((w: { icon: string; title: string; text: string }, i: number) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{w.icon}</span>
                </div>
                <h4 className="font-serif font-bold text-primary-dark mb-2">{w.title}</h4>
                <p className="text-text-light text-sm">{w.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24" id="consult">
        <Container>
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#2d3a1e] to-[#3a5530] rounded-2xl p-10 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
            <div className="relative z-10">
              <h2 className="font-serif text-2xl font-bold text-center mb-2">{settings.consultFormTitle || "Book a Free Consultation"}</h2>
              <p className="text-white/70 text-center text-sm mb-8">{settings.consultFormText || "Let's build your dream farm together. Fill in your details and our team will get back to you within 24 hours."}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <input type="text" placeholder="Your Full Name *" className="px-4 py-3 rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <input type="tel" placeholder="Phone Number *" className="px-4 py-3 rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <input type="email" placeholder="Email Address" className="px-4 py-3 rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <select className="px-4 py-3 rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                  <option>I am interested in *</option>
                  <option>Farm Land Purchase</option>
                  <option>Farm Visit</option>
                  <option>Organic Products</option>
                </select>
                <select className="px-4 py-3 rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                  <option>Preferred Location</option>
                  <option>Hyderabad</option>
                  <option>Surrounding Districts</option>
                </select>
                <select className="px-4 py-3 rounded-xl text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                  <option>Budget Range</option>
                  <option>₹9-15 Lakhs</option>
                  <option>₹15-25 Lakhs</option>
                  <option>₹25-50 Lakhs</option>
                </select>
              </div>
              <textarea rows={3} placeholder="Your Message (Optional)" className="w-full px-4 py-3 rounded-xl text-text text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-accent" />
              <button className="w-full bg-accent text-primary-dark py-3 rounded-full font-bold text-sm hover:bg-accent-dark transition-colors">
                {settings.consultFormButton || "Schedule a Visit"}
              </button>
              <div className="grid grid-cols-3 gap-3 mt-5 text-center text-white/60 text-xs">
                {(settings.consultFormBadges || "100% Free|Expert Guidance|No Obligation").split("|").map((badge: string, i: number) => (
                  <div key={i}>{["✅", "👨‍🌾", "📄"][i] || "✓"} {badge.trim()}</div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-cream-dark">
        <Container>
          <StorySection
            badge={faqSection?.badge || "FAQs"}
            badgeIcon={resolveIcon(faqSection?.badgeIcon, faqSection?.badge) || "❓"}
            heading={faqSection?.heading || "The questions people ask are the questions worth answering."}
          />
          <div className="max-w-2xl mx-auto space-y-3 mt-14">
            {faqs.map((faq: any, i: number) => (
              <details key={i} className="bg-white rounded-xl p-5 group border border-border-light">
                <summary className="font-semibold text-primary-dark cursor-pointer text-sm">{faq.question}</summary>
                <p className="text-text-light text-sm mt-3 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d3a1e] via-[#3a5530] to-[#4a6b3d]" />
        <Container>
          <div className="relative z-10">
            <StorySection
              badge={ctaSection?.badge || "Get Started"}
              badgeIcon={resolveIcon(ctaSection?.badgeIcon, ctaSection?.badge) || "🌿"}
              heading={ctaSection?.heading || "Every forest began with a single seed. Yours begins here."}
              text={ctaSection?.text || "Take the first step towards sustainable farming and a greener future."}
              light
            />
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button text="Schedule a Visit" href="#consult" variant="gold" />
              <Button text="WhatsApp Now" href={`https://wa.me/${whatsappNumber}`} variant="outline" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
