# Free Online Calculator

Free online calculators for math, dates, and Rwanda-focused finance. Built for Gentil M. (Kigali, Rwanda). **Based on [OmniTools](https://github.com/iib0011/omni-tools)** (MIT).

- **Live:** https://free-online-calculator.gentillenoir075.workers.dev
- **Stack:** Next.js (static export), client-side only, Cloudflare Workers static assets
- **Monetization:** [Adsterra](https://www.adsterra.com/) — paste codes in `public/ads.json`

## Calculators

Age, percentage (all modes), loan/EMI, days between dates, VAT (Rwanda 18% default), Rwanda net salary (RWF), BMI, discount, tip, unit converter.

## Local development

```bash
npm install
npm run dev
```

## Tests

```bash
npm run test
```

## Adsterra setup

Edit **`public/ads.json`** and paste each format’s embed code:

| Key | Placement |
|-----|-----------|
| `banner728x90` | Header (desktop) |
| `banner468x60` | Optional mid-page |
| `banner300x250` | Between calculator and article |
| `banner160x600` | Desktop sidebar |
| `banner160x300` | Desktop sidebar (below 160×600) |
| `banner320x50` | Mobile sticky footer |
| `smartlinkUrl` | Labeled “Sponsored” link (footer + below results) |
| `nativeBanner` | Below calculator results |
| `socialBar` | Site-wide (footer area) |
| `popunder` | Site-wide |

Empty strings show a reserved placeholder (no hidden ads).

## Deploy (Cloudflare)

```bash
export CLOUDFLARE_API_TOKEN=your_token
export CLOUDFLARE_ACCOUNT_ID=9b2252baefadd95947f73bc833b3234f
npm run deploy
```

Worker name: `free-online-calculator`

## License

MIT — see [LICENSE](./LICENSE). OmniTools copyright retained in LICENSE.
