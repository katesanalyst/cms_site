"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FormField from "@/components/FormField";

export default function SettingsForm({ data }: { data: Record<string, string> }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl space-y-8">

        {/* Company Information */}
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

        {/* Logo */}
        <section>
          <h2 className="font-semibold text-lg mb-4">Logo</h2>
          <p className="text-sm text-gray-500 mb-3">Customize the logo text shown in the header and footer.</p>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Logo Initial (single letter)" name="logoInitial" defaultValue={data.logoInitial || "P"} placeholder="P" />
            <FormField label="Brand Name" name="logoName" defaultValue={data.logoName || "Prime Agro"} placeholder="Prime Agro" />
            <FormField label="Subtitle" name="logoSubtitle" defaultValue={data.logoSubtitle || "Farms"} placeholder="Farms" />
          </div>
        </section>

        {/* Social Media */}
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

        {/* Newsletter Section */}
        <section>
          <h2 className="font-semibold text-lg mb-4">Newsletter Section (Footer)</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Heading" name="newsletterHeading" defaultValue={data.newsletterHeading || "Subscribe to Our Newsletter"} />
            <FormField label="Button Text" name="newsletterButtonText" defaultValue={data.newsletterButtonText || "Subscribe"} />
          </div>
          <FormField label="Description" name="newsletterDescription" type="textarea" rows={2} defaultValue={data.newsletterDescription} placeholder="Leave empty to use default" />
          <FormField label="Email Placeholder" name="newsletterPlaceholder" defaultValue={data.newsletterPlaceholder || "Enter your email"} />
        </section>

        {/* Footer */}
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

        {/* Legal Links */}
        <section>
          <h2 className="font-semibold text-lg mb-4">Legal Links (Footer)</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Privacy Policy URL" name="privacyPolicyUrl" defaultValue={data.privacyPolicyUrl || "#"} placeholder="/privacy" />
            <FormField label="Terms & Conditions URL" name="termsUrl" defaultValue={data.termsUrl || "#"} placeholder="/terms" />
          </div>
        </section>

        {/* Farming Focus */}
        <section>
          <h2 className="font-semibold text-lg mb-4">Farming Focus Page</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Price Banner Text" name="priceBannerText" defaultValue={data.priceBannerText || "Starting from ₹9 Lakhs per Acre"} />
            <FormField label="Price Disclaimer" name="priceBannerDisclaimer" defaultValue={data.priceBannerDisclaimer} placeholder="*Subject to availability..." />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormField label="Consultation Form Title" name="consultFormTitle" defaultValue={data.consultFormTitle || "Book a Free Consultation"} />
            <FormField label="Consultation Button Text" name="consultFormButton" defaultValue={data.consultFormButton || "Schedule a Visit"} />
          </div>
          <FormField label="Consultation Form Text" name="consultFormText" type="textarea" rows={2} defaultValue={data.consultFormText} placeholder="Description below the title" />
          <FormField label="Trust Badges (pipe separated)" name="consultFormBadges" defaultValue={data.consultFormBadges || "100% Free|Expert Guidance|No Obligation"} placeholder="Badge 1|Badge 2|Badge 3" />
        </section>

        {/* SEO */}
        <section>
          <h2 className="font-semibold text-lg mb-4">SEO Defaults</h2>
          <FormField label="Default Meta Title" name="defaultMetaTitle" defaultValue={data.defaultMetaTitle} />
          <FormField label="Default Meta Description" name="defaultMetaDescription" type="textarea" rows={2} defaultValue={data.defaultMetaDescription} />
          <FormField label="Default Keywords (comma separated)" name="defaultMetaKeywords" type="textarea" rows={2} defaultValue={data.defaultMetaKeywords} placeholder="organic farming, farmland, sustainable agriculture" />
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="font-semibold text-lg mb-4">Testimonials Section (Homepage)</h2>
          <FormField label="Heading" name="testimonialHeading" defaultValue={data.testimonialHeading} placeholder="e.g. The forest does not advertise." />
          <FormField label="Italic Words (comma separated)" name="testimonialItalicWords" defaultValue={data.testimonialItalicWords} placeholder="e.g. people, speak for themselves" />
          <FormField label="Subtext" name="testimonialText" type="textarea" rows={2} defaultValue={data.testimonialText} placeholder="Text below the heading" />
        </section>

        <button type="submit" disabled={saving} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 text-sm mt-6 disabled:opacity-50">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
