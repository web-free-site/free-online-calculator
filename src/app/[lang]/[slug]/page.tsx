import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  tools,
  type ToolSlug,
  calculatorSlugs,
  toolTitle,
  toolDesc,
} from "@/lib/tools-registry";
import { ToolCalculator } from "@/components/calculators/ToolCalculator";
import { ToolProse, getFaqsForJsonLd } from "@/components/calculators/ToolProse";
import { AdSlot } from "@/components/ads/AdSlots";
import {
  breadcrumbJsonLd,
  canonical,
  faqJsonLd,
  webAppJsonLd,
} from "@/lib/seo";

const allSlugs = [...calculatorSlugs, "about", "privacy", "terms", "contact"] as ToolSlug[];

export function generateStaticParams() {
  const langs = ["en", "fr"];
  return langs.flatMap((lang) => allSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !(slug in tools)) return {};
  const s = slug as ToolSlug;
  const locale = lang as Locale;
  const title = toolTitle(s, locale);
  const description = toolDesc(s, locale);
  const url = canonical(locale, s);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: canonical("en", s),
        fr: canonical("fr", s),
      },
    },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !(slug in tools)) notFound();
  const locale = lang as Locale;
  const s = slug as ToolSlug;
  const isCalc = calculatorSlugs.includes(s);
  const fr = locale === "fr";
  const title = toolTitle(s, locale);
  const url = canonical(locale, s);
  const faqs = getFaqsForJsonLd(s, fr);
  const jsonLd = [
    breadcrumbJsonLd(locale, [
      { name: "Home", path: "/" },
      { name: title, path: `/${s}/` },
    ]),
    ...(isCalc
      ? [
          webAppJsonLd(title, toolDesc(s, locale), url),
          faqJsonLd(faqs),
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="lg:grid lg:grid-cols-[1fr_180px] lg:gap-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)] md:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">{toolDesc(s, locale)}</p>
          {isCalc && (
            <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <ToolCalculator slug={s} locale={locale} />
            </section>
          )}
          <AdSlot slot="banner468x60" className="my-4 hidden justify-center sm:flex" />
          <AdSlot slot="banner300x250" className="my-6 mx-auto max-w-[300px]" />
          <ToolProse slug={s} locale={locale} />
        </div>
        <aside className="hidden shrink-0 flex-col gap-4 lg:flex">
          <AdSlot slot="banner160x600" className="sticky top-4" />
          <AdSlot slot="banner160x300" />
        </aside>
      </div>
    </>
  );
}
