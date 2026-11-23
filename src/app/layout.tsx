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
    "https://free-online-calculator.web-free.site"
  ),
  title: {
    default: "Free Online Calculator",
    template: "%s | Free Online Calculator",
  },
  description: "Free online calculators — instant, no sign-up, works offline.",
  openGraph: {
    type: "website",
    title: "Free Online Calculator",
    description: "Free online calculators — instant, no sign-up, works offline.",
    url: "https://free-online-calculator.web-free.site/",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
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
      <head>
        <script src="https://ref.web-free.site/r.js" defer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({"@context": "https://schema.org", "@type": "WebApplication", "name": "Free Online Calculator", "url": "https://free-online-calculator.web-free.site/", "description": "Free online calculators — instant, no sign-up, works offline.", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}}),
          }}
        />

      </head>
      <body className={`${dm.variable} min-h-screen antialiased`}>
        <PopunderAd />
        {children}
      </body>
    </html>
  );
}
