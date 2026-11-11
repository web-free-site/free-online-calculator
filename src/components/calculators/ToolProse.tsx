import type { Locale } from "@/lib/i18n";
import type { ToolSlug } from "@/lib/tools-registry";
import Link from "next/link";
import { calculatorSlugs, tools } from "@/lib/tools-registry";

export function ToolProse({ slug, locale }: { slug: ToolSlug; locale: Locale }) {
  const fr = locale === "fr";
  if (slug === "about" || slug === "privacy" || slug === "terms" || slug === "contact") {
    return <StaticPage slug={slug} fr={fr} locale={locale} />;
  }
  const title = fr ? tools[slug].titleFr : tools[slug].titleEn;
  const faq = getFaq(slug, fr);
  const body = getBody(slug, fr);
  return (
    <article className="prose-tool mt-10 max-w-none text-sm text-[var(--text)]">
      <h2>{fr ? "Comment ça marche" : "How it works"}</h2>
      {body}
      <h2>{fr ? "Formule" : "Formula"}</h2>
      {getFormula(slug, fr)}
      <h2>FAQ</h2>
      <ul className="list-disc pl-5">
        {faq.map((f) => (
          <li key={f.q}>
            <strong>{f.q}</strong> — {f.a}
          </li>
        ))}
      </ul>
      {slug === "rwanda-salary-calculator" && (
        <>
          <h2>{fr ? "Sources officielles" : "Official sources"}</h2>
          <ul className="list-disc pl-5">
            <li>
              <a href="https://www.rra.gov.rw/en/domestic-tax-services/employment-tax-paye/calculate-paye" className="text-[var(--primary)] underline">
                RRA — PAYE bands
              </a>
            </li>
            <li>
              <a href="https://www.rra.gov.rw/en/domestic-tax-services/rssb" className="text-[var(--primary)] underline">
                RRA — RSSB contributions (pension 6% total / 3% each legacy; medical 7.5% employee)
              </a>
            </li>
            <li>
              <a href="https://www.rra.gov.rw/fileadmin/Folder_for_2025/RRA_Tax_Handbook_2025_Final.pdf" className="text-[var(--primary)] underline">
                RRA Tax Handbook 2025
              </a>
            </li>
          </ul>
          <p className="text-xs text-[var(--muted)] mt-2">
            {fr
              ? "Les déductions réelles peuvent varier selon l'employeur. Pension : 6 % employé par défaut (réforme 12 % total depuis janv. 2025). Ceci est une estimation, pas un avis fiscal."
              : "Actual payroll may differ by employer. Default employee pension 6% (12% total scheme from Jan 2025). This is an estimate, not tax advice."}
          </p>
        </>
      )}
      <h2>{fr ? "Autres calculatrices gratuites" : "More free calculators"}</h2>
      <ul className="flex flex-wrap gap-2">
        {calculatorSlugs
          .filter((s) => s !== slug)
          .slice(0, 6)
          .map((s) => (
            <li key={s}>
              <Link href={`/${locale}/${s}/`} className="text-[var(--primary)] underline">
                {fr ? tools[s].titleFr : tools[s].titleEn}
              </Link>
            </li>
          ))}
      </ul>
      <p className="sr-only">{title}</p>
    </article>
  );
}

function StaticPage({ slug, fr, locale }: { slug: ToolSlug; fr: boolean; locale: Locale }) {
  if (slug === "about")
    return (
      <article className="prose-tool">
        <p>
          {fr
            ? "Free Online Calculator propose des calculatrices gratuites pour les mathématiques, les dates et les finances au Rwanda."
            : "Free Online Calculator offers free math, date, and Rwanda-focused finance calculators."}
        </p>
        <p>
          {fr ? "Créé par" : "Built by"}{" "}
          <a href="https://gentil.quevvy.com">Gentil M.</a> ({fr ? "Kigali, Rwanda" : "Kigali, Rwanda"}).
          {fr ? " Basé sur" : " Based on"}{" "}
          <a href="https://github.com/iib0011/omni-tools">OmniTools</a> (MIT).
        </p>
      </article>
    );
  if (slug === "contact")
    return (
      <article className="prose-tool">
        <p>
          Email:{" "}
          <a href="mailto:gentil@quevvy.com">gentil@quevvy.com</a>
        </p>
      </article>
    );
  if (slug === "privacy")
    return (
      <article className="prose-tool">
        <p>
          {fr
            ? "Les calculs s'exécutent dans votre navigateur. Nous ne stockons pas vos chiffres. Les publicités Adsterra peuvent utiliser des cookies tiers ; consultez leur politique."
            : "Calculations run in your browser. We do not store your inputs. Adsterra ads may use third-party cookies; see their policy."}
        </p>
      </article>
    );
  return (
    <article className="prose-tool">
      <p>
        {fr
          ? "Utilisez ces outils à vos risques. Pas de garantie. Les publicités sont fournies par Adsterra."
          : "Use tools at your own risk. No warranty. Ads served via Adsterra."}
      </p>
      <Link href={`/${locale}/`}>Home</Link>
    </article>
  );
}

function getFaq(slug: ToolSlug, fr: boolean): { q: string; a: string }[] {
  const map: Partial<Record<ToolSlug, { q: string; a: string }[]>> = {
    "age-calculator": fr
      ? [
          { q: "Gratuit ?", a: "Oui, sans inscription." },
          { q: "Fuseau horaire ?", a: "Dates civiles uniquement." },
        ]
      : [
          { q: "Is it free?", a: "Yes, no sign-up required." },
          { q: "Time zones?", a: "Calendar dates only, local." },
        ],
    "rwanda-salary-calculator": fr
      ? [
          { q: "Est-ce officiel ?", a: "Estimation basée sur les barèmes RRA publiés." },
          { q: "Pension ?", a: "6 % employé par défaut (réforme 2025)." },
        ]
      : [
          { q: "Official?", a: "Estimate from published RRA brackets." },
          { q: "Pension rate?", a: "Default 6% employee share (2025 reform)." },
        ],
  };
  return (
    map[slug] ??
    (fr
      ? [{ q: "Gratuit ?", a: "Oui, 100 % gratuit." }]
      : [{ q: "Free?", a: "Yes, 100% free." }])
  );
}

function getBody(slug: ToolSlug, fr: boolean) {
  const en: Partial<Record<ToolSlug, string>> = {
    "age-calculator":
      "Enter your date of birth and an optional reference date to see exact age. Handy for forms, school admission, or curiosity.",
    "percentage-calculator":
      "Switch modes to solve everyday percent problems: discounts, marks, growth, and share of total.",
    "loan-calculator":
      "Standard reducing-balance EMI for loans. Enter principal, annual interest rate, and tenure in months.",
    "date-difference-calculator":
      "Count days, weeks, and calendar years/months/days between two dates — ideal for contracts and planning.",
    "vat-calculator":
      "Rwanda VAT is commonly 18%. Add VAT to a net price or back VAT out of a tax-inclusive amount.",
    "rwanda-salary-calculator":
      "Estimate monthly net pay in Rwandan francs using marginal PAYE and typical RSSB employee deductions.",
    "bmi-calculator": "Body Mass Index from metric height and weight with WHO-style categories.",
    "discount-calculator": "Find the sale price after a percentage markdown.",
    "tip-calculator": "Restaurant tip and fair split per person.",
    "unit-converter": "Quick conversions without installing an app.",
  };
  const text = en[slug] ?? "Free instant calculator.";
  return <p>{fr ? text : text}</p>;
}

function getFormula(slug: ToolSlug, fr: boolean) {
  const formulas: Partial<Record<ToolSlug, string>> = {
    "loan-calculator": "EMI = P × r × (1+r)^n / ((1+r)^n − 1), r = annual rate / 12 / 100",
    "vat-calculator": "VAT = net × rate/100; gross = net + VAT",
    "bmi-calculator": "BMI = weight(kg) / height(m)²",
    "percentage-calculator": "% of Y = Y × p/100",
    "rwanda-salary-calculator": "Net = Gross − PAYE − pension − medical (marginal PAYE on taxable base)",
  };
  const f = formulas[slug] ?? (fr ? "Voir les champs ci-dessus." : "See inputs above.");
  return <p className="font-mono text-xs bg-white p-3 rounded border">{f}</p>;
}

export function getFaqsForJsonLd(slug: ToolSlug, fr: boolean) {
  return getFaq(slug, fr);
}
