import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll Car Animation",
  description: "GSAP Scroll Animation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}