import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prime Agro Farms CMS",
  description: "Content Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
