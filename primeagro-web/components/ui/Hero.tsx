"use client";

import { useState, useRef, useEffect } from "react";
import Button from "./Button";

interface HeroProps {
  tag?: string;
  heading: string;
  text?: string;
  buttons?: { text: string; link: string; variant?: "primary" | "outline" | "gold" | "outline-dark" }[];
  variant?: "home" | "page";
  heroImage?: { asset: { url: string }; alt?: string } | null;
  heroVideo?: { videoType: string; videoUrl: string; title?: string; poster?: { asset: { url: string }; alt?: string } };
  showSoundToggle?: boolean;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export default function Hero({ tag, heading, text, buttons, variant = "home", heroImage, heroVideo, showSoundToggle = false }: HeroProps) {
  const isHome = variant === "home";
  const [videoOpen, setVideoOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const bgStyle = heroImage?.asset?.url
    ? { backgroundImage: `url(${heroImage.asset.url})` }
    : {};

  const hasVideo = heroVideo?.videoUrl && heroVideo?.videoType;
  const isYouTube = hasVideo && heroVideo!.videoType === "youtube";
  const isVimeo = hasVideo && heroVideo!.videoType === "vimeo";
  const isMP4 = hasVideo && heroVideo!.videoType === "mp4";

  const ytId = isYouTube ? getYouTubeId(heroVideo!.videoUrl) : null;
  const vimeoId = isVimeo ? getVimeoId(heroVideo!.videoUrl) : null;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  function handleVideoError() {
    setVideoError(true);
  }

  return (
    <section
      className={`relative flex items-center justify-center text-center text-white overflow-hidden ${
        isHome ? "min-h-[90vh]" : "py-24"
      }`}
    >
      {/* Video Background - YouTube/Vimeo (muted autoplay) */}
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
              onError={handleVideoError}
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      {/* Video Background - MP4 (muted autoplay) */}
      {hasVideo && isMP4 && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            src={heroVideo!.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            onError={handleVideoError}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        </div>
      )}

      {/* Video Error Message */}
      {hasVideo && videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="text-center p-8">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-white text-lg font-medium">Video failed to load</p>
            <p className="text-white/60 text-sm mt-1">Check the video URL in CMS Settings → Homepage</p>
          </div>
        </div>
      )}

      {/* Click to Play with Sound Overlay - only when enabled in CMS */}
      {hasVideo && !videoError && showSoundToggle && (
        <button
          onClick={() => {
            if (isMP4) {
              setIsMuted(false);
            } else {
              setVideoOpen(true);
            }
          }}
          className="absolute inset-0 z-20 flex items-center justify-center group cursor-pointer"
          aria-label="Play video with sound"
        >
          <div className="flex flex-col items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors border border-white/30 group-hover:scale-110 transform">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            </div>
            <span className="text-white/80 text-sm font-medium tracking-wide">Click to Play with Sound</span>
          </div>
        </button>
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
        </div>
      </div>

      {/* Video modal (fullscreen on click - for YouTube/Vimeo with sound) */}
      {videoOpen && hasVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {isYouTube && ytId && (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full aspect-video rounded-lg"
              />
            )}
            {isVimeo && vimeoId && (
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=0`}
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
