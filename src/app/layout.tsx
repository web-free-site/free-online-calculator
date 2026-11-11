import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { PopunderAd } from "@/components/ads/AdSlots";

const dm = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://free-online-calculator.gentillenoir075.workers.dev"
  ),
  title: {
    default: "Free Online Calculator",
    template: "%s | Free Online Calculator",
  },
  description: "Free online calculators — instant, no sign-up, works offline.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dm.variable} min-h-screen antialiased`}>
        <PopunderAd />
        {children}
      </body>
    </html>
  );
}
