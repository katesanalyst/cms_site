interface StorySectionProps {
  badge?: string;
  badgeIcon?: string;
  heading: string;
  text?: string;
  align?: "center" | "left";
  light?: boolean;
}

function stripPTags(html: string): string {
  return html.replace(/^<p[^>]*>/i, "").replace(/<\/p>$/i, "");
}

export default function StorySection({
  badge,
  badgeIcon = "🌿",
  heading,
  text,
  align = "center",
  light = false,
}: StorySectionProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {badge && (
        <span className="inline-flex items-center gap-2 text-xs font-medium bg-cream-dark text-text-light px-4 py-2 rounded-full mb-6 border border-border-light">
          <span>{badgeIcon}</span>
          {badge}
        </span>
      )}
      <h2
        className={`font-serif font-bold leading-[1.15] tracking-tight ${
          light ? "text-white" : "text-[#1a2332]"
        } ${align === "center" ? "text-3xl md:text-4xl lg:text-[2.75rem]" : "text-3xl md:text-4xl"}`}
        dangerouslySetInnerHTML={{ __html: stripPTags(heading) }}
      />
      {text && (
        <div
          className={`prose-content mt-5 leading-relaxed max-w-3xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-text-light"}`}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </div>
  );
}
