"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  num: string;
  label: string;
}

function AnimatedNumber({ target }: { target: string }) {
  const numericPart = parseInt(target.replace(/[^0-9]/g, ""));
  const suffix = target.replace(/[0-9]/g, "");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [count, setCount] = useState(numericPart);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setCount(0);
          const duration = 2000;
          const steps = 60;
          const increment = numericPart / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= numericPart) {
              setCount(numericPart);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericPart, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2d3a1e] via-[#3a5530] to-[#2d3a1e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,83,0.1)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-bold text-accent mb-2">
                <AnimatedNumber target={stat.num} />
              </div>
              <div className="text-white/70 text-sm font-medium tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
