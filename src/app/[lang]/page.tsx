import Link from "next/link";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { calculatorSlugs, toolTitle, tools } from "@/lib/tools-registry";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlots";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const fr = lang === "fr";
  return {
    title: fr ? "Calculatrices gratuites en ligne" : "Free Online Calculators",
    description: t(lang as Locale).tagline,
    alternates: {
      languages: { en: "/en/", fr: "/fr/" },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const d = t(locale);
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--primary)]">
        {locale === "fr" ? "Calculatrices en ligne gratuites" : "Free Online Calculators"}
      </h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">{d.tagline}</p>
      <AdSlot slot="banner468x60" className="mt-6 flex justify-center" />
      <ul className="mt-4 flex flex-wrap gap-2">
        {d.sellingPoints.map((s) => (
          <li key={s} className="rounded-full bg-white px-3 py-1 text-xs border border-[var(--border)]">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculatorSlugs.map((slug) => (
          <Link
            key={slug}
            href={`/${locale}/${slug}/`}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--accent)]"
          >
            <h2 className="font-semibold text-[var(--primary)]">{toolTitle(slug, locale)}</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              {locale === "fr" ? tools[slug].descFr : tools[slug].descEn}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
