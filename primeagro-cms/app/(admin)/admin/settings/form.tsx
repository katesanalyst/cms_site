"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FormField from "@/components/FormField";

export default function SettingsForm({ data }: { data: Record<string, string> }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"global" | "homepage" | "farming" | "footer" | "seo">("global");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const entries = Object.fromEntries(form);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries),
    });
    if (res.ok) router.refresh();
    setSaving(false);
  }

  const tabs = [
    { key: "global", label: "Global / Company" },
    { key: "homepage", label: "Homepage" },
    { key: "farming", label: "Farming Focus" },
    { key: "footer", label: "Footer & Social" },
    { key: "seo", label: "SEO Defaults" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg max-w-2xl">
        {tabs.map((tab) => (
          <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key as any)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.key ? "bg-white shadow text-green-700" : "text-gray-600 hover:text-gray-900"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl space-y-8">

        {/* ========== GLOBAL / COMPANY ========== */}
        {activeTab === "global" && (
          <>
            <section>
              <h2 className="font-semibold text-lg mb-4">Company Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Company Name" name="companyName" defaultValue={data.companyName} />
                <FormField label="Tagline" name="tagline" defaultValue={data.tagline} />
                <FormField label="Phone" name="phone" defaultValue={data.phone} />
                <FormField label="WhatsApp" name="whatsapp" defaultValue={data.whatsapp} />
                <FormField label="Email" name="email" type="email" defaultValue={data.email} />
                <FormField label="Working Hours" name="workingHours" defaultValue={data.workingHours} />
              </div>
              <FormField label="Address" name="address" type="textarea" rows={2} defaultValue={data.address} />
              <FormField label="Google Maps Embed" name="googleMapsEmbed" type="textarea" rows={3} defaultValue={data.googleMapsEmbed} />
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-4">Logo</h2>
              <div className="grid grid-cols-3 gap-4">
                <FormField label="Logo Initial" name="logoInitial" defaultValue={data.logoInitial || "P"} placeholder="P" />
                <FormField label="Brand Name" name="logoName" defaultValue={data.logoName || "Prime Agro"} />
                <FormField label="Subtitle" name="logoSubtitle" defaultValue={data.logoSubtitle || "Farms"} />
              </div>
            </section>
          </>
        )}

        {/* ========== HOMEPAGE ========== */}
        {activeTab === "homepage" && (
          <>
            <section>
              <h2 className="font-semibold text-lg mb-4">Hero Video</h2>
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" name="heroShowSoundToggle" defaultChecked={data.heroShowSoundToggle === "true"} className="rounded w-4 h-4" />
                <span>Show "Click to Play with Sound" overlay on hero video</span>
              </label>
              <p className="text-xs text-gray-400 mt-1 ml-7">When disabled (default), the video plays muted with no icon. Enable to show a sound toggle overlay.</p>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-4">Sustainability Box</h2>
              <p className="text-sm text-gray-500 mb-3">Green box on the homepage sustainability section.</p>
              <FormField label="Box Title" name="sustainBoxTitle" defaultValue={data.sustainBoxTitle || "Solar Processing Unit"} />
              <FormField label="Box Text" name="sustainBoxText" type="textarea" rows={2} defaultValue={data.sustainBoxText} />
              <FormField label="Sustainability Image URL" name="sustainImage" defaultValue={data.sustainImage} placeholder="/images/sustainability.jpg" />
              <FormField label="Sustainability Text" name="sustainText" type="textarea" rows={2} defaultValue={data.sustainText} placeholder="Text below the sustainability heading" />
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-4">Testimonials Section</h2>
              <FormField label="Heading" name="testimonialHeading" defaultValue={data.testimonialHeading} placeholder="e.g. The forest does not advertise." />
              <FormField label="Italic Words (comma separated)" name="testimonialItalicWords" defaultValue={data.testimonialItalicWords} placeholder="e.g. people, speak for themselves" />
              <FormField label="Subtext" name="testimonialText" type="textarea" rows={2} defaultValue={data.testimonialText} />
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-4">CTA Section</h2>
              <FormField label="CTA Text" name="ctaText" type="textarea" rows={2} defaultValue={data.ctaText} placeholder="Text for the call-to-action section" />
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-4">Product Images</h2>
              <p className="text-sm text-gray-500 mb-3">Images used on the Farming Focus page product cards.</p>
              <div className="grid grid-cols-3 gap-4">
                <FormField label="Anjeera Image" name="anjeeraImage" defaultValue={data.anjeeraImage} placeholder="/images/anjeera.jpg" />
                <FormField label="Dehydrated Image" name="dehydratedImage" defaultValue={data.dehydratedImage} placeholder="/images/dehydrated.jpg" />
                <FormField label="Mango Image" name="mangoImage" defaultValue={data.mangoImage} placeholder="/images/mango.jpg" />
              </div>
            </section>
          </>
        )}

        {/* ========== FARMING FOCUS ========== */}
        {activeTab === "farming" && (
          <>
            <section>
              <h2 className="font-semibold text-lg mb-4">Price Banner</h2>
              <FormField label="Price Banner Text" name="priceBannerText" defaultValue={data.priceBannerText || "Starting from ₹9 Lakhs per Acre"} />
              <FormField label="Price Disclaimer" name="priceBannerDisclaimer" type="textarea" rows={2} defaultValue={data.priceBannerDisclaimer} placeholder="*Subject to availability..." />
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-4">Consultation Form</h2>
              <FormField label="Form Title" name="consultFormTitle" defaultValue={data.consultFormTitle || "Book a Free Consultation"} />
              <FormField label="Button Text" name="consultFormButton" defaultValue={data.consultFormButton || "Schedule a Visit"} />
              <FormField label="Form Description" name="consultFormText" type="textarea" rows={2} defaultValue={data.consultFormText} />
              <FormField label="Trust Badges (pipe separated)" name="consultFormBadges" defaultValue={data.consultFormBadges || "100% Free|Expert Guidance|No Obligation"} placeholder="Badge 1|Badge 2|Badge 3" />
            </section>
          </>
        )}

        {/* ========== FOOTER & SOCIAL ========== */}
        {activeTab === "footer" && (
          <>
            <section>
              <h2 className="font-semibold text-lg mb-4">Social Media</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Facebook URL" name="facebookUrl" defaultValue={data.facebookUrl} />
                <FormField label="Twitter/X URL" name="twitterUrl" defaultValue={data.twitterUrl} />
                <FormField label="Instagram URL" name="instagramUrl" defaultValue={data.instagramUrl} />
                <FormField label="YouTube URL" name="youtubeUrl" defaultValue={data.youtubeUrl} />
                <FormField label="LinkedIn URL" name="linkedinUrl" defaultValue={data.linkedinUrl} />
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-4">Newsletter (Footer)</h2>
              <FormField label="Heading" name="newsletterHeading" defaultValue={data.newsletterHeading || "Subscribe to Our Newsletter"} />
              <FormField label="Button Text" name="newsletterButtonText" defaultValue={data.newsletterButtonText || "Subscribe"} />
              <FormField label="Description" name="newsletterDescription" type="textarea" rows={2} defaultValue={data.newsletterDescription} />
              <FormField label="Email Placeholder" name="newsletterPlaceholder" defaultValue={data.newsletterPlaceholder || "Enter your email"} />
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-4">Footer</h2>
              <FormField label="Copyright Text" name="copyrightText" defaultValue={data.copyrightText} />
              <FormField label="Footer Description" name="footerDescription" type="textarea" rows={2} defaultValue={data.footerDescription} />
              <div className="grid grid-cols-3 gap-4">
                <FormField label="Quick Links Title" name="footerQuickLinksTitle" defaultValue={data.footerQuickLinksTitle || "Quick Links"} />
                <FormField label="Services Title" name="footerServicesTitle" defaultValue={data.footerServicesTitle || "Our Services"} />
                <FormField label="Contact Title" name="footerContactTitle" defaultValue={data.footerContactTitle || "Contact"} />
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-lg mb-4">Legal Links</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Privacy Policy URL" name="privacyPolicyUrl" defaultValue={data.privacyPolicyUrl || "#"} placeholder="/privacy" />
                <FormField label="Terms URL" name="termsUrl" defaultValue={data.termsUrl || "#"} placeholder="/terms" />
              </div>
            </section>
          </>
        )}

        {/* ========== SEO ========== */}
        {activeTab === "seo" && (
          <section>
            <h2 className="font-semibold text-lg mb-4">SEO Defaults</h2>
            <p className="text-sm text-gray-500 mb-3">Default meta tags. Each page can override these in its own editor.</p>
            <FormField label="Default Meta Title" name="defaultMetaTitle" defaultValue={data.defaultMetaTitle} />
            <FormField label="Default Meta Description" name="defaultMetaDescription" type="textarea" rows={2} defaultValue={data.defaultMetaDescription} />
            <FormField label="Default Keywords (comma separated)" name="defaultMetaKeywords" type="textarea" rows={2} defaultValue={data.defaultMetaKeywords} placeholder="organic farming, farmland, sustainable agriculture" />
          </section>
        )}

        <button type="submit" disabled={saving} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm mt-6 disabled:opacity-50">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
