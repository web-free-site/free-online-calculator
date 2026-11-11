import adsJson from "../../public/ads.json";

export type BannerSlot =
  | "banner728x90"
  | "banner468x60"
  | "banner300x250"
  | "banner160x600"
  | "banner160x300"
  | "banner320x50";

export interface BannerDef {
  publisherKey: string;
  width: number;
  height: number;
}

export interface AdsConfig {
  smartlinkUrl?: string;
  popunderScriptSrc?: string;
  socialBarScriptSrc?: string;
  nativeBanner?: {
    invokeScriptSrc: string;
    containerId: string;
  };
  banners?: Partial<Record<BannerSlot, BannerDef>>;
}

const bundled = adsJson as AdsConfig;

export function getAdsConfig(): AdsConfig {
  return bundled;
}

/** @deprecated use getAdsConfig */
export async function loadAdsConfig(): Promise<AdsConfig> {
  return bundled;
}

export function bannerIframeSrcDoc(key: string, width: number, height: number): string {
  const atOptions = JSON.stringify({
    key,
    format: "iframe",
    height,
    width,
    params: {},
  });
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;overflow:hidden;background:transparent"><script type="text/javascript">var atOptions = ${atOptions};</script><script type="text/javascript" src="https://www.highrevenueformat.com/${key}/invoke.js"><\/script></body></html>`;
}
