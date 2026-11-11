import type { Locale } from "./i18n";

export type ToolSlug =
  | "age-calculator"
  | "percentage-calculator"
  | "loan-calculator"
  | "date-difference-calculator"
  | "vat-calculator"
  | "rwanda-salary-calculator"
  | "bmi-calculator"
  | "discount-calculator"
  | "tip-calculator"
  | "unit-converter"
  | "about"
  | "privacy"
  | "terms"
  | "contact";

export const calculatorSlugs: ToolSlug[] = [
  "age-calculator",
  "percentage-calculator",
  "loan-calculator",
  "date-difference-calculator",
  "vat-calculator",
  "rwanda-salary-calculator",
  "bmi-calculator",
  "discount-calculator",
  "tip-calculator",
  "unit-converter",
];

export interface ToolMeta {
  slug: ToolSlug;
  keywords: string;
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
}

export const tools: Record<ToolSlug, ToolMeta> = {
  "age-calculator": {
    slug: "age-calculator",
    keywords: "free age calculator",
    titleEn: "Free Age Calculator — Years, Months & Days",
    titleFr: "Calculatrice d'âge gratuite",
    descEn:
      "Free age calculator: find your exact age in years, months, and days from any birth date.",
    descFr: "Calculatrice d'âge gratuite en années, mois et jours.",
  },
  "percentage-calculator": {
    slug: "percentage-calculator",
    keywords: "free percentage calculator",
    titleEn: "Free Percentage Calculator — All Formulas",
    titleFr: "Calculatrice de pourcentage gratuite",
    descEn:
      "Free percentage calculator for percent of, ratio, change, add and subtract percent.",
    descFr: "Pourcentages : part, ratio, variation, ajout et retrait.",
  },
  "loan-calculator": {
    slug: "loan-calculator",
    keywords: "free loan EMI calculator",
    titleEn: "Free Loan & EMI Calculator",
    titleFr: "Calculatrice de prêt et EMI gratuite",
    descEn: "Free loan calculator: monthly EMI, total interest, and payment schedule.",
    descFr: "Mensualité EMI, intérêts totaux et remboursement.",
  },
  "date-difference-calculator": {
    slug: "date-difference-calculator",
    keywords: "free days between dates calculator",
    titleEn: "Free Days Between Dates Calculator",
    titleFr: "Jours entre deux dates — gratuit",
    descEn: "Free date difference calculator: days, weeks, and years between two dates.",
    descFr: "Différence entre deux dates en jours, semaines et années.",
  },
  "vat-calculator": {
    slug: "vat-calculator",
    keywords: "free Rwanda VAT calculator",
    titleEn: "Free VAT Calculator (Rwanda 18% Default)",
    titleFr: "TVA gratuite (Rwanda 18 %)",
    descEn: "Free VAT calculator with Rwanda 18% default. Add or remove VAT instantly.",
    descFr: "TVA avec taux Rwanda 18 % par défaut, ajout ou retrait.",
  },
  "rwanda-salary-calculator": {
    slug: "rwanda-salary-calculator",
    keywords: "free Rwanda net salary calculator",
    titleEn: "Free Rwanda Net Salary Calculator (RWF)",
    titleFr: "Salaire net Rwanda gratuit (FRW)",
    descEn:
      "Free Rwanda salary calculator: PAYE, RSSB pension & medical, net pay in RWF.",
    descFr: "PAYE, pension RSSB, assurance maladie et salaire net en FRW.",
  },
  "bmi-calculator": {
    slug: "bmi-calculator",
    keywords: "free BMI calculator",
    titleEn: "Free BMI Calculator",
    titleFr: "IMC gratuit",
    descEn: "Free BMI calculator from height and weight with health category.",
    descFr: "Indice de masse corporelle gratuit.",
  },
  "discount-calculator": {
    slug: "discount-calculator",
    keywords: "free discount calculator",
    titleEn: "Free Discount Calculator",
    titleFr: "Calculatrice de remise gratuite",
    descEn: "Free discount calculator: sale price and amount saved.",
    descFr: "Prix soldé et montant économisé.",
  },
  "tip-calculator": {
    slug: "tip-calculator",
    keywords: "free tip calculator",
    titleEn: "Free Tip Calculator",
    titleFr: "Pourboire gratuit",
    descEn: "Free tip calculator with bill split between people.",
    descFr: "Pourboire et partage entre convives.",
  },
  "unit-converter": {
    slug: "unit-converter",
    keywords: "free unit converter",
    titleEn: "Free Unit Converter",
    titleFr: "Convertisseur d'unités gratuit",
    descEn: "Free unit converter for length, weight, and temperature.",
    descFr: "Longueur, poids et température.",
  },
  about: {
    slug: "about",
    keywords: "about",
    titleEn: "About Free Online Calculator",
    titleFr: "À propos",
    descEn: "About this free calculator site by Gentil M., Kigali Rwanda.",
    descFr: "Site de calculatrices gratuites par Gentil M.",
  },
  privacy: {
    slug: "privacy",
    keywords: "privacy",
    titleEn: "Privacy Policy",
    titleFr: "Politique de confidentialité",
    descEn: "Privacy policy: client-side calculators, ads via Adsterra.",
    descFr: "Calculs côté navigateur et publicités Adsterra.",
  },
  terms: {
    slug: "terms",
    keywords: "terms",
    titleEn: "Terms of Use",
    titleFr: "Conditions d'utilisation",
    descEn: "Terms of use for Free Online Calculator.",
    descFr: "Conditions d'utilisation.",
  },
  contact: {
    slug: "contact",
    keywords: "contact",
    titleEn: "Contact",
    titleFr: "Contact",
    descEn: "Contact Gentil M. at gentil@quevvy.com",
    descFr: "Contact : gentil@quevvy.com",
  },
};

export function toolTitle(slug: ToolSlug, locale: Locale): string {
  const m = tools[slug];
  return locale === "fr" ? m.titleFr : m.titleEn;
}

export function toolDesc(slug: ToolSlug, locale: Locale): string {
  const m = tools[slug];
  return locale === "fr" ? m.descFr : m.descEn;
}
