import Link from "next/link";
import Container from "../ui/Container";
import NewsletterForm from "./NewsletterForm";

interface FooterLink {
  label: string;
  href: string;
}

interface ContactItem {
  icon: string;
  text: string;
}

interface FooterData {
  brand: string;
  brandDescription: string;
  quickLinks: FooterLink[];
  services: string[];
  contactItems: ContactItem[];
}

interface Settings {
  company_name?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  copyright?: string;
  logoInitial?: string;
  logoName?: string;
  logoSubtitle?: string;
  newsletterHeading?: string;
  newsletterDescription?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  privacyPolicyUrl?: string;
  termsUrl?: string;
  footerQuickLinksTitle?: string;
  footerServicesTitle?: string;
  footerContactTitle?: string;
  footerDescription?: string;
}

interface FooterProps {
  footer?: FooterData;
  settings?: Settings;
}

const fallbackQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Farming Focus", href: "/farming-focus" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Farmlands", href: "/farmlands" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const fallbackServices = ["Organic Farming", "Farm Land Sales", "Consultation", "Organic Products", "Solar Processing"];

export default function Footer({ footer, settings }: FooterProps) {
  const brand = footer?.brand || settings?.company_name || "Prime Agro Farms";
  const brandDesc = footer?.brandDescription || settings?.footerDescription || "Sustainable farming, premium organic produce, and assisted dream farmland ownership.";
  const quickLinks = footer?.quickLinks?.length ? footer.quickLinks : fallbackQuickLinks;
  const services = footer?.services?.length ? footer.services : fallbackServices;
  const contactItems = footer?.contactItems || [];
  const copyright = settings?.copyright || `© ${new Date().getFullYear()} Prime Agro Farms. All rights reserved.`;
  const newsletterHeading = settings?.newsletterHeading || "Subscribe to Our Newsletter";
  const newsletterDesc = settings?.newsletterDescription || `Get farming tips, special offers, and updates from ${brand}.`;
  const newsletterPlaceholder = settings?.newsletterPlaceholder || "Enter your email";
  const newsletterBtnText = settings?.newsletterButtonText || "Subscribe";
  const privacyUrl = settings?.privacyPolicyUrl || "#";
  const termsUrl = settings?.termsUrl || "#";
  const quickLinksTitle = settings?.footerQuickLinksTitle || "Quick Links";
  const servicesTitle = settings?.footerServicesTitle || "Our Services";
  const contactTitle = settings?.footerContactTitle || "Contact";
  const logoInitial = settings?.logoInitial || "P";
  const logoName = settings?.logoName || brand;
  const logoSubtitle = settings?.logoSubtitle || "Farms";

  return (
    <footer className="bg-[#1a2e14] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <Container>
          <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-serif font-bold mb-1">{newsletterHeading}</h3>
              <p className="text-white/60 text-sm">{newsletterDesc}</p>
            </div>
            <NewsletterForm placeholder={newsletterPlaceholder} buttonText={newsletterBtnText} />
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-serif font-bold">{logoInitial}</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold font-serif">{logoName}</span>
                <span className="text-[9px] tracking-[2px] uppercase text-accent">{logoSubtitle}</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {brandDesc}
            </p>
            <div className="flex gap-2">
              {[
                { icon: "f", href: settings?.facebook },
                { icon: "𝕏", href: settings?.twitter },
                { icon: "▶", href: settings?.youtube },
                { icon: "📷", href: settings?.instagram },
                { icon: "in", href: settings?.linkedin },
              ].filter((s) => s.href && s.href !== "#").map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs hover:bg-accent hover:text-primary-dark transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-accent">{quickLinksTitle}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-accent">{servicesTitle}</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              {services.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-accent">{contactTitle}</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              {contactItems.length > 0 ? contactItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5">
                    {item.icon === "phone" ? "📞" : item.icon === "email" ? "✉️" : "📍"}
                  </span>
                  <span>{item.text}</span>
                </li>
              )) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">📍</span>
                    <span>{settings?.address || "Telangana, India"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">📞</span>
                    <a href={`tel:${settings?.phone || "+919876543210"}`} className="hover:text-accent transition-colors">{settings?.phone || "+91 98765 43210"}</a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✉️</span>
                    <a href={`mailto:${settings?.email || "info@primeagrofarms.com"}`} className="hover:text-accent transition-colors">{settings?.email || "info@primeagrofarms.com"}</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>{copyright}</p>
          <div className="flex gap-4">
            {privacyUrl !== "#" && <Link href={privacyUrl} className="hover:text-accent transition-colors">Privacy Policy</Link>}
            {termsUrl !== "#" && <Link href={termsUrl} className="hover:text-accent transition-colors">Terms &amp; Conditions</Link>}
            {privacyUrl === "#" && termsUrl === "#" && (
              <>
                <span className="hover:text-accent transition-colors cursor-default">Privacy Policy</span>
                <span className="hover:text-accent transition-colors cursor-default">Terms &amp; Conditions</span>
              </>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
