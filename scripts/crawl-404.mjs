#!/usr/bin/env node
const base = process.argv[2] || "https://free-online-calculator.web-free.site";

const slugs = [
  "en",
  "fr",
  "en/age-calculator",
  "en/percentage-calculator",
  "en/loan-calculator",
  "en/date-difference-calculator",
  "en/vat-calculator",
  "en/rwanda-salary-calculator",
  "en/bmi-calculator",
  "en/discount-calculator",
  "en/tip-calculator",
  "en/unit-converter",
  "en/about",
  "en/privacy",
  "en/terms",
  "en/contact",
  "fr/age-calculator",
  "fr/percentage-calculator",
  "fr/loan-calculator",
  "fr/date-difference-calculator",
  "fr/vat-calculator",
  "fr/rwanda-salary-calculator",
  "fr/bmi-calculator",
  "fr/discount-calculator",
  "fr/tip-calculator",
  "fr/unit-converter",
  "fr/about",
  "fr/privacy",
  "fr/terms",
  "fr/contact",
];

const assetRe = /(?:src|href)=["']([^"']+)["']/gi;

async function check(url) {
  const res = await fetch(url, { redirect: "follow" });
  return res.status;
}

async function main() {
  const failures = [];
  const checked = new Set();

  async function probe(url) {
    if (checked.has(url)) return;
    checked.add(url);
    if (url.startsWith("mailto:") || url.startsWith("#")) return;
    if (url.startsWith("http") && !url.startsWith(base)) return;
    const full = url.startsWith("http") ? url : new URL(url, base).href;
    const status = await check(full);
    if (status >= 400) failures.push({ url: full, status });
  }

  for (const path of slugs) {
    const pageUrl = `${base}/${path}/`;
    const status = await check(pageUrl);
    if (status >= 400) failures.push({ url: pageUrl, status });
    else {
      const html = await (await fetch(pageUrl)).text();
      let m;
      while ((m = assetRe.exec(html)) !== null) {
        const href = m[1];
        if (href.startsWith("data:")) continue;
        await probe(href);
      }
    }
  }

  await probe("/logo.svg");
  await probe("/ads.json");
  await probe("/sitemap.xml");
  await probe("/robots.txt");
  await probe("/favicon.ico");
  await probe("/icon.svg");

  if (failures.length) {
    console.error("FAILURES:");
    failures.forEach((f) => console.error(f.status, f.url));
    process.exit(1);
  }
  console.log(`OK: ${checked.size} URLs checked, 0 failures`);
}

main();
