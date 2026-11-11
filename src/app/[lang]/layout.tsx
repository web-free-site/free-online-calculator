import { locales, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteWideAds, MobileStickyAd } from "@/components/ads/AdSlots";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  return (
    <div className="flex min-h-screen flex-col pb-14 md:pb-0" lang={locale}>
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
      <Footer locale={locale} />
      <SiteWideAds />
      <MobileStickyAd />
    </div>
  );
}
