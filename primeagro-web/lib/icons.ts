const iconMap: Record<string, string> = {
  // By title (most reliable since titles aren't corrupted)
  "Water Conservation": "💧",
  "Zero Waste": "♻️",
  "Carbon Footprint": "🌍",
  "Solar Technology": "☀️",
  "Sustainability": "☀️",
  "What We Do": "🌾",
  "Our Story": "📖",
  "Get in Touch": "📞",
  "Blog": "📝",
  "Gallery": "🖼️",
  "Our Process": "🌱",
  "Get Started": "🌿",
  "Join Us": "🌍",
  "Visit Us": "📍",
  "FAQs": "❓",
  "Why Prime Agro": "⭐",
  "Our Values": "💎",
  "Our Team": "👥",
  "Available Lands": "🏞️",
  "What We Offer": "🎯",
  // By icon text
  "phone": "📞",
  "email": "✉️",
  "location": "📍",
  "water": "💧",
  "solar": "☀️",
  "organic": "🌿",
  "eco": "🍃",
  "energy": "⚡",
  "earth": "🌍",
  "recycle": "♻️",
  "carbon": "🌱",
  "seed": "🌱",
  "grow": "🌿",
  "harvest": "🌾",
  "process": "☀️",
};

export function resolveIcon(icon: string | undefined, title?: string, fallback?: string): string {
  // If valid emoji, return as-is
  if (icon && (/[\u{1F000}-\u{1FFFF}]/u.test(icon) || /[\u2600-\u27BF]/u.test(icon))) return icon;
  // Try icon match
  if (icon && iconMap[icon]) return iconMap[icon];
  if (icon) {
    const lower = icon.toLowerCase();
    for (const [key, val] of Object.entries(iconMap)) {
      if (key.toLowerCase() === lower) return val;
    }
  }
  // Try title match (titles are stored safely in SQLite)
  if (title && iconMap[title]) return iconMap[title];
  // Check for corrupted short strings (likely emoji)
  if (icon && icon.length <= 3 && (icon.includes("?") || icon.includes("�"))) {
    // Map by position: 0=first card, 1=second, 2=third
    if (title) {
      if (title.toLowerCase().includes("water")) return "💧";
      if (title.toLowerCase().includes("zero") || title.toLowerCase().includes("waste")) return "♻️";
      if (title.toLowerCase().includes("carbon") || title.toLowerCase().includes("footprint")) return "🌍";
    }
  }
  return icon || fallback || "🌿";
}
