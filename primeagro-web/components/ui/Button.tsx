import Link from "next/link";

interface ButtonProps {
  text: string;
  href: string;
  variant?: "primary" | "outline" | "gold" | "outline-dark";
  className?: string;
}

export default function Button({ text, href, variant = "primary", className = "" }: ButtonProps) {
  const styles = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg",
    outline: "border-2 border-white/40 text-white hover:border-accent hover:text-accent",
    "outline-dark": "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    gold: "bg-accent text-primary-dark hover:bg-accent-dark shadow-md hover:shadow-lg",
  };

  return (
    <Link
      href={href}
      className={`inline-block px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 ${styles[variant]} ${className}`}
    >
      {text}
    </Link>
  );
}
