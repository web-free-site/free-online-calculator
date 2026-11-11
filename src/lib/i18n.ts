export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(v: string): v is Locale {
  return locales.includes(v as Locale);
}

export const dict = {
  en: {
    brand: "Free Online Calculator",
    tagline: "Free online calculators — no sign-up, instant results, works offline.",
    navHome: "Home",
    navAbout: "About",
    navContact: "Contact",
    langEn: "English",
    langFr: "Français",
    searchPlaceholder: "Search calculators…",
    calculate: "Calculate",
    result: "Result",
    sellingPoints: [
      "100% free",
      "No account needed",
      "Instant answers",
      "Works offline after first visit",
    ],
    footerCredit: "Based on OmniTools",
    footerBy: "by Gentil M.",
    privacy: "Privacy",
    terms: "Terms",
    adSlot: "Ad space",
  },
  fr: {
    brand: "Free Online Calculator",
    tagline:
      "Calculatrices en ligne gratuites — sans inscription, résultats instantanés, hors ligne.",
    navHome: "Accueil",
    navAbout: "À propos",
    navContact: "Contact",
    langEn: "English",
    langFr: "Français",
    searchPlaceholder: "Rechercher…",
    calculate: "Calculer",
    result: "Résultat",
    sellingPoints: [
      "100 % gratuit",
      "Sans compte",
      "Réponses instantanées",
      "Hors ligne après la première visite",
    ],
    footerCredit: "Basé sur OmniTools",
    footerBy: "par Gentil M.",
    privacy: "Confidentialité",
    terms: "Conditions",
    adSlot: "Espace publicitaire",
  },
} as const;

export type Dict = (typeof dict)[Locale];

export function t(locale: Locale): Dict {
  return dict[locale];
}
