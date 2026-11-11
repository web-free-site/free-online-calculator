import { writeFileSync } from "fs";

const base =
  process.env.SITE_URL ||
  "https://free-online-calculator.gentillenoir075.workers.dev";
const langs = ["en", "fr"];
const slugs = [
  "",
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
  "about",
  "privacy",
  "terms",
  "contact",
];

const urls = langs.flatMap((lang) =>
  slugs.map((slug) => {
    const path = slug ? `/${lang}/${slug}/` : `/${lang}/`;
    return `  <url><loc>${base}${path}</loc><changefreq>weekly</changefreq></url>`;
  })
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log("Wrote public/sitemap.xml");
