"use client";

import { useState, useEffect } from "react";
import StorySection from "../ui/StorySection";
import { resolveIcon } from "@/lib/icons";

interface Testimonial {
  _id: string;
  clientName: string;
  location: string;
  rating: string;
  text: string;
  photo?: { asset: { url: string }; alt?: string };
}

const fallbackTestimonials: Testimonial[] = [
  {
    _id: "1",
    clientName: "David Miller",
    location: "Hyderabad",
    rating: "5",
    text: "Prime Agro Farms made the entire farmland purchase process seamless. Their transparency and support from start to finish was exceptional. Our plot is now producing beautiful organic mangoes.",
  },
  {
    _id: "2",
    clientName: "Sarah Johnson",
    location: "Telangana",
    rating: "5",
    text: "The organic produce quality is unmatched. We have been customers for over two years and every batch of Anjeera and dehydrated vegetables has been premium. Truly sustainable farming.",
  },
  {
    _id: "3",
    clientName: "Robert Wilson",
    location: "Bangalore",
    rating: "4",
    text: "Investing in farmland through Prime Agro was the best decision. The team handles everything from irrigation to harvest. I just enjoy the returns and the peace of mind.",
  },
];

export default function TestimonialCarousel({ testimonials, heading, text, badge, badgeIcon }: { testimonials: Testimonial[]; heading?: string; text?: string; badge?: string; badgeIcon?: string }) {
  const list = testimonials?.length ? testimonials : fallbackTestimonials;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % list.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [list.length]);

  const displayHeading = heading || "The forest does not advertise. The people who taste it speak for themselves.";
  const displayText = text || "We have never asked for a review. Never offered a discount in exchange for kind words. These came in emails, handwritten letters, and quiet conversations.";

  return (
    <section className="py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4">
        <StorySection
          badge={badge || "Testimonials"}
          badgeIcon={resolveIcon(badgeIcon, badge) || "🌿"}
          heading={displayHeading}
          text={displayText}
        />

        <div className="relative mt-14">
          <div className="flex gap-6 overflow-hidden">
            {list.map((t, i) => (
              <div
                key={t._id}
                className={`flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-2xl p-8 shadow-sm border border-border-light transition-all duration-500 ${
                  i === active ? "opacity-100 scale-100" : "opacity-60 scale-95"
                }`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, j) => (
                    <span key={j} className={`text-lg ${j < parseInt(t.rating) ? "text-accent" : "text-border"}`}>
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-text-light text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-border-light pt-4">
                  {t.photo?.asset?.url ? (
                    <img
                      src={t.photo.asset.url}
                      alt={t.photo.alt || t.clientName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-serif font-bold text-sm">
                      {t.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-primary-dark text-sm">{t.clientName}</div>
                    <div className="text-text-muted text-xs">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
