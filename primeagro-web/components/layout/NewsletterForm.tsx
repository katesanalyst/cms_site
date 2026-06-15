"use client";

import { useState } from "react";

interface NewsletterFormProps {
  placeholder?: string;
  buttonText?: string;
}

export default function NewsletterForm({ placeholder = "Enter your email", buttonText = "Subscribe" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe");
      }
    } catch {
      setStatus("error");
      setMessage("Network error");
    }
    setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={status === "success" ? "Subscribed!" : status === "error" ? message : placeholder}
        disabled={status === "loading"}
        className="flex-1 md:w-72 px-5 py-3 rounded-l-full bg-white/10 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-accent disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent text-primary-dark px-6 py-3 rounded-r-full font-semibold text-sm hover:bg-accent-dark transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "..." : status === "success" ? "✓" : buttonText}
      </button>
    </form>
  );
}
