import type { Metadata } from "next";
import Link from "next/link";

const EN_HOME = "https://free-online-calculator.web-free.site/en/";

export const metadata: Metadata = {
  alternates: { canonical: EN_HOME },
  openGraph: { url: EN_HOME },
  robots: { index: false, follow: true },
};

export default function Root() {
  return (
    <p className="p-8 text-center">
      <Link href="/en/">Free Online Calculators</Link>
    </p>
  );
}