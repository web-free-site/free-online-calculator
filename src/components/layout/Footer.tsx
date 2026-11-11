import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { SponsoredSmartlink } from "@/components/ads/AdSlots";

export function Footer({ locale }: { locale: Locale }) {
  const d = t(locale);
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-[var(--muted)]">
        <SponsoredSmartlink locale={locale} className="mb-4" />
        <p>
          {d.footerCredit} ·{" "}
          <a
            href="https://gentil.quevvy.com"
            className="text-[var(--primary)] hover:underline"
            rel="noopener noreferrer"
          >
            {d.footerBy}
          </a>
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href={`/${locale}/privacy/`}>{d.privacy}</Link>
          <Link href={`/${locale}/terms/`}>{d.terms}</Link>
          <Link href={`/${locale}/about/`}>{d.navAbout}</Link>
          <Link href={`/${locale}/contact/`}>{d.navContact}</Link>
        </div>
        <p className="mt-4 text-xs">© {new Date().getFullYear()} Free Online Calculator</p>
      </div>
    </footer>
  );
}
