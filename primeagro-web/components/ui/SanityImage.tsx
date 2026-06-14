"use client";

import { urlFor } from "@/lib/sanity";

interface SanityImageProps {
  image: any;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function SanityImage({
  image,
  alt = "",
  width = 800,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px",
}: SanityImageProps) {
  if (!image) return null;

  const img = urlFor(image)
    .width(width)
    .auto("format")
    .fit("max");

  return (
    <img
      src={img.url()}
      alt={alt}
      width={width}
      className={className}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
    />
  );
}

// Background image variant (for hero sections, cards, etc.)
export function SanityBgImage({
  image,
  alt = "",
  className = "",
  overlay = true,
  overlayOpacity = 0.4,
  children,
}: {
  image: any;
  alt?: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: React.ReactNode;
}) {
  if (!image) return <div className={className}>{children}</div>;

  const bgUrl = urlFor(image).width(1600).auto("format").fit("max").url();

  return (
    <div
      className={`relative bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
