"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { AdSlot } from "@/components/ads/AdSlots";
import { Logo } from "@/components/brand/Logo";

export function Header({ locale }: { locale: Locale }) {
  const d = t(locale);
  const pathname = usePathname();
  const other = locale === "en" ? "fr" : "en";
  const swapped = pathname.replace(`/${locale}`, `/${other}`) || `/${other}/`;

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href={`/${locale}/`} className="flex items-center gap-3">
          <Logo />
          <div>
            <span className="text-lg font-bold text-[var(--primary)]">{d.brand}</span>
            <p className="text-xs text-[var(--muted)] max-w-[220px] hidden sm:block">
              {d.tagline}
            </p>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <Link href={`/${locale}/`} className="hover:text-[var(--accent)]">
            {d.navHome}
          </Link>
          <Link href={`/${locale}/about/`} className="hover:text-[var(--accent)]">
            {d.navAbout}
          </Link>
          <Link href={`/${locale}/contact/`} className="hover:text-[var(--accent)]">
            {d.navContact}
          </Link>
          <Link
            href={swapped}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs uppercase tracking-wide hover:border-[var(--accent)]"
            hrefLang={other}
          >
            {other === "en" ? d.langEn : d.langFr}
          </Link>
        </nav>
      </div>
      <div className="mx-auto hidden max-w-6xl justify-center px-4 pb-3 md:flex">
        <AdSlot slot="banner728x90" />
      </div>
    </header>
  );
}
