import type { Metadata, Viewport } from "next";
// Fonts: Myriad Pro (Adobe Fonts, loaded in <head> below) for everything.
// Inter is a backup if Adobe Fonts ever fails to load. Caveat = journal handwriting.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/caveat/400.css";
import "@fontsource/caveat/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rounikasaxena.vercel.app"), // ← change to your real domain when you launch
  title: "Rounika Saxena — Portfolio",
  description: "Designer + frontend developer at Queen's University. Case studies, art, and a travel journal.",
  openGraph: {
    title: "Rounika Saxena — Portfolio",
    description: "Designer + frontend developer at Queen's University.",
    images: ["/og.png"], // ← add a 1200×630 preview image at /public/og.png
  },
};

export const viewport: Viewport = { themeColor: "#0D1015" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Myriad Pro from Adobe Fonts (project cia3tcp) */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/cia3tcp.css" />
        {/* JetBrains Mono */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" />
        {/* Source Serif 4 — stand-in for Apple's New York on Windows/Android */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
