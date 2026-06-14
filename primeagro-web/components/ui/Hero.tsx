"use client";

import { useState } from "react";
import Button from "./Button";

interface HeroProps {
  tag?: string;
  heading: string;
  text?: string;
  buttons?: { text: string; link: string; variant?: "primary" | "outline" | "gold" | "outline-dark" }[];
  variant?: "home" | "page";
  heroImage?: { asset: { url: string }; alt?: string } | null;
  heroVideo?: { videoType: string; videoUrl: string; title?: string; poster?: { asset: { url: string }; alt?: string } };
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export default function Hero({ tag, heading, text, buttons, variant = "home", heroImage, heroVideo }: HeroProps) {
  const isHome = variant === "home";
  const [videoOpen, setVideoOpen] = useState(false);

  const bgStyle = heroImage?.asset?.url
    ? { backgroundImage: `url(${heroImage.asset.url})` }
    : {};

  const hasVideo = heroVideo?.videoUrl && heroVideo?.videoType;
  const isYouTube = hasVideo && heroVideo!.videoType === "youtube";
  const isVimeo = hasVideo && heroVideo!.videoType === "vimeo";
  const isMP4 = hasVideo && heroVideo!.videoType === "mp4";

  const ytId = isYouTube ? getYouTubeId(heroVideo!.videoUrl) : null;
  const vimeoId = isVimeo ? getVimeoId(heroVideo!.videoUrl) : null;

  return (
    <section
      className={`relative flex items-center justify-center text-center text-white overflow-hidden ${
        isHome ? "min-h-[90vh]" : "py-24"
      }`}
    >
      {/* Video Background */}
      {hasVideo && (isYouTube || isVimeo) && (ytId || vimeoId) && (
        <>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              src={isYouTube
                ? `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
                : `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=1`}
              allow="autoplay; encrypted-media"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ border: "none", width: "177.78vh", height: "100vh", minWidth: "100vw", minHeight: "56.25vw" }}
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      {hasVideo && isMP4 && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            src={heroVideo!.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        </div>
      )}

      {/* Image Background (only if no video) */}
      {!hasVideo && heroImage?.asset?.url && (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={bgStyle} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d3a1e]/80 via-[#3a5530]/70 to-[#4a6b3d]/80" />
        </>
      )}

      {/* Gradient fallback (no image, no video) */}
      {!hasVideo && !heroImage?.asset?.url && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d3a1e] via-[#3a5530] to-[#4a6b3d]" />
      )}

      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}} />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {tag && (
          <span className="inline-block text-accent text-xs tracking-[4px] uppercase font-semibold mb-6 border border-accent/30 px-4 py-2 rounded-full">
            {tag}
          </span>
        )}
        <h1
          className={`font-serif font-bold leading-[1.1] mb-6 ${
            isHome ? "text-5xl md:text-6xl lg:text-7xl" : "text-4xl md:text-5xl"
          }`}
          dangerouslySetInnerHTML={{ __html: heading.replace(/\n/g, "<br/>") }}
        />
        {text && (
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {text}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4 items-center">
          {buttons && buttons.map((btn, i) => (
            <Button key={i} text={btn.text} href={btn.link} variant={btn.variant || "gold"} />
          ))}

          {hasVideo && (
            <button
              onClick={() => setVideoOpen(true)}
              className="ml-2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30"
              aria-label="Play video fullscreen"
            >
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Video modal (fullscreen on click) */}
      {videoOpen && hasVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {isYouTube && ytId && (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full aspect-video rounded-lg"
              />
            )}
            {isVimeo && vimeoId && (
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full aspect-video rounded-lg"
              />
            )}
            {isMP4 && (
              <video src={heroVideo!.videoUrl} controls autoPlay className="w-full rounded-lg" />
            )}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-accent"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}