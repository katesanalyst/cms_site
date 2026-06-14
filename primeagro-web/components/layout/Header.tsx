"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const fallbackLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Farming Focus", href: "/farming-focus" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Farmlands", href: "/farmlands" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

interface NavItem {
  label: string;
  href: string;
}

interface SocialLink {
  icon: string;
  href: string;
}

interface HeaderProps {
  navItems?: NavItem[];
  socialLinks?: SocialLink[];
  logoInitial?: string;
  logoName?: string;
  logoSubtitle?: string;
}

export default function Header({ navItems, socialLinks, logoInitial, logoName, logoSubtitle }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = navItems && navItems.length > 0 ? navItems : fallbackLinks;

  const defaultSocials: SocialLink[] = [
    { icon: "f", href: "#" },
    { icon: "𝕏", href: "#" },
    { icon: "▶", href: "#" },
    { icon: "in", href: "#" },
  ];
  const socials = socialLinks?.length ? socialLinks : defaultSocials;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-lg font-serif font-bold">{logoInitial || "P"}</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-lg font-bold font-serif transition-colors ${scrolled ? "text-primary-dark" : "text-white"}`}>
                {logoName || "Prime Agro"}
              </span>
              <span className={`text-[10px] tracking-[2px] uppercase transition-colors ${scrolled ? "text-accent" : "text-accent"}`}>
                {logoSubtitle || "Farms"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10 ${
                  scrolled
                    ? "text-text-light hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Social */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    scrolled
                      ? "bg-cream-dark text-text-light hover:bg-primary hover:text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <Link
              href="/contact"
              className="bg-accent text-primary-dark px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent-dark transition-colors shadow-sm"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-text" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <nav className="lg:hidden mt-3 bg-white rounded-xl shadow-xl p-4 border border-border-light">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 text-sm font-medium text-text-light hover:text-primary hover:bg-cream rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block mt-2 bg-accent text-primary-dark text-center py-3 rounded-full text-sm font-semibold hover:bg-accent-dark transition-colors"
            >
              Get in Touch
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
