"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { label: "Pages", href: "/admin/pages", icon: "📄" },
  { label: "Heroes", href: "/admin/heroes", icon: "🎬" },
  { label: "Blog", href: "/admin/blog", icon: "✍️" },
  { label: "Products", href: "/admin/products", icon: "🌾" },
  { label: "Farmlands", href: "/admin/lands", icon: "🏞️" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "⭐" },
  { label: "Team", href: "/admin/team", icon: "👥" },
  { label: "Gallery", href: "/admin/gallery", icon: "🖼️" },
  { label: "FAQs", href: "/admin/faqs", icon: "❓" },
  { label: "Services", href: "/admin/services", icon: "🔧" },
  { divider: true },
  { label: "Leads", href: "/admin/leads", icon: "📨" },
  { label: "Newsletter", href: "/admin/newsletter", icon: "📬" },
  { label: "SEO", href: "/admin/seo", icon: "🔍" },
  { label: "Media", href: "/admin/media", icon: "📁" },
  { divider: true },
  { label: "Navigation", href: "/admin/navigation", icon: "🧭" },
  { label: "Footer", href: "/admin/footer", icon: "📎" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-green-900 text-white flex flex-col">
      <div className="p-4 border-b border-green-800">
        <h1 className="text-lg font-bold">🌿 Prime Agro CMS</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {navItems.map((item, i) => {
          if ("divider" in item && item.divider) {
            return <div key={`div-${i}`} className="border-t border-green-800 my-2" />;
          }
          if ("href" in item) {
            const href = item.href as string;
            const active = pathname?.startsWith(href) ?? false;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm mb-1 transition ${
                  active ? "bg-green-700 text-white" : "text-green-200 hover:bg-green-800"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          }
          return null;
        })}
      </nav>

      <div className="p-4 border-t border-green-800">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 text-sm text-green-300 hover:text-white transition"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
