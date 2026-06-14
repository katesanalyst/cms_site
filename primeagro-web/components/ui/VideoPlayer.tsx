"use client";

import { useState } from "react";

interface VideoPlayerProps {
  videoType: string;
  videoUrl: string;
  poster?: string;
  title?: string;
  alt?: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "21/9";
}

function getEmbedUrl(videoType: string, videoUrl: string): string {
  if (videoType === "youtube") {
    // Extract video ID from various YouTube URL formats
    const match = videoUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : videoUrl;
  }

  if (videoType === "vimeo") {
    // Extract video ID from Vimeo URL
    const match = videoUrl.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : videoUrl;
  }

  // mp4
  return videoUrl;
}

export default function VideoPlayer({
  videoType,
  videoUrl,
  poster,
  title = "Video",
  alt = "",
  className = "",
  aspectRatio = "16/9",
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (videoType === "mp4" && !playing) {
    return (
      <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`} style={{ aspectRatio }}>
        {poster && (
          <img src={poster} alt={alt} className="w-full h-full object-cover" />
        )}
        {!poster && (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-6xl">🎬</span>
          </div>
        )}
        {/* Play button overlay */}
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
          aria-label={`Play ${title}`}
        >
          <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-primary-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      </div>
    );
  }

  if (videoType === "mp4" && playing) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ aspectRatio }}>
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // YouTube / Vimeo — show poster + play button, then embed
  if (!playing) {
    return (
      <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`} style={{ aspectRatio }}>
        {poster && (
          <img src={poster} alt={alt} className="w-full h-full object-cover" />
        )}
        {!poster && (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-6xl">🎬</span>
          </div>
        )}
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
          aria-label={`Play ${title}`}
        >
          <div className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-primary-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      </div>
    );
  }

  // Playing — show embed
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ aspectRatio }}>
      <iframe
        src={getEmbedUrl(videoType, videoUrl)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full absolute inset-0"
      />
    </div>
  );
}

// Inline play button component for hero sections
export function PlayButton({
  onClick,
  size = "lg",
  className = "",
}: {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} rounded-full bg-accent/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform ${className}`}
      aria-label="Play video"
    >
      <svg className={`${iconSizes[size]} text-primary-dark ml-0.5`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}
