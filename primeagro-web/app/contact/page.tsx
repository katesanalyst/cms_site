import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import StorySection from "@/components/ui/StorySection";
import { fetchSiteSettings, fetchPageBySlug, fetchPageMeta } from "@/lib/sanity";
import { resolveIcon } from "@/lib/icons";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchPageMeta("contact");
  if (!meta?.title) return {};
  return { title: meta.title, description: meta.description || undefined };
}

function getSection(sections: any[], match: string) {
  return sections?.find((s: any) => s.title?.toLowerCase().includes(match) || s.type?.toLowerCase().includes(match));
}

export default async function ContactPage() {
  const [settings, pageData] = await Promise.all([fetchSiteSettings(), fetchPageBySlug("contact")]);
  const hero = pageData?.hero;
  const sections = pageData?.sections || [];

  const reachSection = getSection(sections, "contact") || getSection(sections, "reach") || getSection(sections, "get in touch");
  const faqSection = getSection(sections, "faq");

  const phone = settings?.whatsapp || "+91 98765 43210";
  const phoneDigits = phone.replace(/[^0-9]/g, "");
  const email = settings?.email || "hello@primeagrofarms.com";
  const address = settings?.address || "SF No. 123, Pollachi-Palani Road, Kinakadavu, Coimbatore, Tamil Nadu 642002, India";
  const hours = settings?.workingHours || "Mon – Sat, 8:30 AM – 5:30 PM IST";

  return (
    <>
      <Hero
        tag={hero?.tag || "Get in Touch"}
        heading={hero?.heading || "Let us grow something together."}
        text={hero?.subheading || "Whether you are a buyer, distributor, or partner — we would love to hear from you."}
        heroImage={hero?.bgType === "image" && hero.bgImage ? { asset: { url: hero.bgImage } } : { asset: { url: "/images/contact-hero.jpg" } }}
        buttons={hero?.buttons?.length
          ? hero.buttons.map((b: any) => ({ text: b.text, link: b.href || b.link || "/", variant: b.variant || "gold" }))
          : [{ text: "Call Now", link: `https://wa.me/${phoneDigits}`, variant: "gold" }, { text: "Back to Home", link: "/", variant: "outline" }]
        }
      />

      <section className="py-24 bg-cream">
        <Container>
          <StorySection
            badge={reachSection?.badge || "Get in Touch"}
            badgeIcon={resolveIcon(reachSection?.badgeIcon, reachSection?.badge) || "📞"}
            heading={reachSection?.heading || "We are always happy to talk to fellow soil lovers."}
            text={reachSection?.text || "From bulk orders to partnership inquiries, just reach out. We usually respond within one business day."}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            <div className="bg-white rounded-2xl p-6 text-center border border-border-light">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><span className="text-xl">💬</span></div>
              <h4 className="font-bold text-primary-dark mb-1 text-sm">WhatsApp</h4>
              <p className="text-text-light text-xs">Click to chat directly</p>
              <a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary-dark transition-all">Open Chat</a>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-border-light">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><span className="text-xl">✉️</span></div>
              <h4 className="font-bold text-primary-dark mb-1 text-sm">Email</h4>
              <p className="text-text-light text-xs">For formal inquiries</p>
              <a href={`mailto:${email}`} className="mt-3 inline-block bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary-dark transition-all">Send Email</a>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-border-light">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><span className="text-xl">📍</span></div>
              <h4 className="font-bold text-primary-dark mb-1 text-sm">Location</h4>
              <p className="text-text-light text-xs">Coimbatore, Tamil Nadu</p>
              <a href="https://maps.google.com/?q=Prime+Agro+Farms+Coimbatore" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary-dark transition-all">View Map</a>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-border-light">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><span className="text-xl">🕐</span></div>
              <h4 className="font-bold text-primary-dark mb-1 text-sm">Business Hours</h4>
              <p className="text-text-light text-xs">{hours}</p>
            </div>
          </div>

          {faqSection?.items?.length > 0 && (
            <div className="mt-16 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-primary-dark mb-6 text-center">{faqSection.heading || "Frequently Asked Questions"}</h3>
              <div className="space-y-4">
                {faqSection.items.map((item: any, i: number) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-border-light">
                    <h4 className="font-bold text-primary-dark mb-2 text-sm">{item.title}</h4>
                    <p className="text-text-light text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
