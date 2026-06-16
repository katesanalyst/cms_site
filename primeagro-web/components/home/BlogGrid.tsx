"use client";

import { useState } from "react";

interface Post {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  featuredImage?: { asset: { url: string }; alt?: string };
}

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState("All");

  const catSet = new Set<string>();
  posts.forEach((p) => { if (p.category) catSet.add(p.category); });
  const categories = ["All", ...Array.from(catSet)];

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-12 mt-14">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              active === cat
                ? "bg-primary text-white shadow-md"
                : "bg-white text-text-light hover:bg-cream-dark border border-border-light"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post, i) => (
          <article key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden group cursor-pointer border border-border-light hover:shadow-lg transition-all duration-300">
            {post.featuredImage?.asset?.url ? (
              <div className="h-48 overflow-hidden">
                <img src={post.featuredImage.asset.url} alt={post.featuredImage.alt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📝</span>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-accent text-primary-dark px-3 py-1 rounded-full font-semibold">{post.category}</span>
                <span className="text-xs text-text-muted">{post.date}</span>
              </div>
              <h3 className="font-serif font-bold text-primary-dark mb-2 group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{post.excerpt}</p>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-text-muted">No posts in this category.</div>
        )}
      </div>
    </>
  );
}
