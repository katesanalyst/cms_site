interface StorySectionProps {
  badge?: string;
  badgeIcon?: string;
  heading: string;
  italicWords?: string[];
  text?: string;
  align?: "center" | "left";
  light?: boolean;
}

export default function StorySection({
  badge,
  badgeIcon = "🌿",
  heading,
  italicWords = [],
  text,
  align = "center",
  light = false,
}: StorySectionProps) {
  // Build heading with italic emphasis words
  const renderHeading = () => {
    if (italicWords.length === 0) {
      return <span>{heading}</span>;
    }

    const parts: React.ReactNode[] = [];
    let remaining = heading;
    let key = 0;

    for (const word of italicWords) {
      const idx = remaining.toLowerCase().indexOf(word.toLowerCase());
      if (idx === -1) continue;

      // Text before the italic word
      if (idx > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
      }

      // The italic word — find exact casing
      const actualWord = remaining.slice(idx, idx + word.length);
      parts.push(
        <span key={key++} className="italic text-text-muted/70">
          {actualWord}
        </span>
      );

      remaining = remaining.slice(idx + word.length);
    }

    // Remaining text
    if (remaining) {
      parts.push(<span key={key++}>{remaining}</span>);
    }

    return parts.length > 0 ? parts : heading;
  };

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
      >
        {renderHeading()}
      </h2>
      {text && (
        <p
          className={`mt-5 leading-relaxed max-w-3xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-text-light"}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
