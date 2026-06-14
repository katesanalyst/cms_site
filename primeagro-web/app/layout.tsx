import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { fetchNavigation, fetchFooterSections, fetchSiteSettings } from "@/lib/sanity";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();
  const title = settings.defaultMetaTitle || "Prime Agro Farms | Sustainable Organic Farming";
  const description = settings.defaultMetaDescription || "Premium organic farming, Dyanna California Anjeera cultivation, and assisted dream farmland ownership for a sustainable tomorrow.";
  const keywords = settings.defaultMetaKeywords
    ? settings.defaultMetaKeywords.split(",").map((k: string) => k.trim())
    : ["organic farming Hyderabad", "farm lands for sale", "organic Anjeera", "dehydrated vegetables", "sustainable farming India"];

  return {
    title: {
      default: title,
      template: `%s | ${settings.company_name || "Prime Agro Farms"}`,
    },
    description,
    keywords,
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: settings.company_name || "Prime Agro Farms",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [navItems, footerData, settings] = await Promise.all([
    fetchNavigation(),
    fetchFooterSections(),
    fetchSiteSettings(),
  ]);

  const socialLinks = [
    { icon: "f", href: settings.facebook || "#" },
    { icon: "𝕏", href: settings.twitter || "#" },
    { icon: "▶", href: settings.youtube || "#" },
    { icon: "in", href: settings.linkedin || "#" },
  ].filter((s) => s.href !== "#");

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Header
          navItems={navItems}
          socialLinks={socialLinks}
          logoInitial={settings.logoInitial}
          logoName={settings.logoName}
          logoSubtitle={settings.logoSubtitle}
        />
        <main className="min-h-screen">{children}</main>
        <Footer footer={footerData} settings={settings} />
      </body>
    </html>
  );
}
