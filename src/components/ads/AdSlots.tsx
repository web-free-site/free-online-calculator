"use client";

import { useEffect, useMemo, useState } from "react";
import {
  bannerIframeSrcDoc,
  getAdsConfig,
  type BannerSlot,
  type AdsConfig,
} from "@/lib/ads-config";

function BannerIframe({
  slot,
  def,
  className,
}: {
  slot: BannerSlot;
  def: { publisherKey: string; width: number; height: number };
  className?: string;
}) {
  const srcDoc = useMemo(
    () => bannerIframeSrcDoc(def.publisherKey, def.width, def.height),
    [def]
  );
  return (
    <div
      className={`flex max-w-full justify-center overflow-hidden ${className ?? ""}`}
      aria-label="Advertisement"
    >
      <iframe
        title={`Advertisement ${slot}`}
        width={def.width}
        height={def.height}
        className="max-w-full border-0"
        style={{ maxWidth: "100%", height: def.height }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
        srcDoc={srcDoc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function AdSlot({
  slot,
  className = "",
}: {
  slot: BannerSlot | "nativeBanner";
  className?: string;
}) {
  const cfg = getAdsConfig();

  if (slot === "nativeBanner" && cfg.nativeBanner) {
    const { containerId, invokeScriptSrc } = cfg.nativeBanner;
    return (
      <NativeBanner
        hostClassName={className}
        containerId={containerId}
        invokeScriptSrc={invokeScriptSrc}
      />
    );
  }

  const def = cfg.banners?.[slot as BannerSlot];
  if (!def?.publisherKey) return null;

  return <BannerIframe slot={slot as BannerSlot} def={def} className={className} />;
}

function NativeBanner({
  containerId,
  invokeScriptSrc,
  hostClassName,
}: {
  containerId: string;
  invokeScriptSrc: string;
  hostClassName?: string;
}) {
  useEffect(() => {
    if (document.querySelector(`script[data-ad="native-${containerId}"]`)) return;
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-ad", `native-${containerId}`);
    script.src = invokeScriptSrc;
    document.body.appendChild(script);
  }, [containerId, invokeScriptSrc]);

  return (
    <div className={hostClassName} aria-label="Advertisement">
      <div id={containerId} className="min-h-[100px] w-full max-w-md" />
    </div>
  );
}

export function PopunderAd() {
  const src = getAdsConfig().popunderScriptSrc;
  useEffect(() => {
    if (!src || document.querySelector('script[data-ad="popunder"]')) return;
    const script = document.createElement("script");
    script.src = src;
    script.setAttribute("data-ad", "popunder");
    document.head.appendChild(script);
  }, [src]);
  return null;
}

export function SocialBarAd() {
  const src = getAdsConfig().socialBarScriptSrc;
  useEffect(() => {
    if (!src || document.querySelector('script[data-ad="social-bar"]')) return;
    const script = document.createElement("script");
    script.src = src;
    script.setAttribute("data-ad", "social-bar");
    document.body.appendChild(script);
  }, [src]);
  return null;
}

export function SiteWideAds() {
  return <SocialBarAd />;
}

export function SponsoredSmartlink({
  locale,
  className = "",
}: {
  locale: "en" | "fr";
  className?: string;
}) {
  const url = getAdsConfig().smartlinkUrl?.trim();
  if (!url) return null;

  const label = locale === "fr" ? "Sponsorisé" : "Sponsored";
  const text = locale === "fr" ? "Offre partenaire" : "Partner offer";

  return (
    <p className={`text-xs text-[var(--muted)] ${className}`}>
      <span className="font-medium text-[var(--text)]">{label}</span>
      {" · "}
      <a
        href={url}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="text-[var(--primary)] underline"
      >
        {text}
      </a>
    </p>
  );
}

export function MobileStickyAd() {
  const cfg = getAdsConfig();
  if (!cfg.banners?.banner320x50?.publisherKey) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center border-t border-[var(--border)] bg-[var(--bg)]/95 p-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] md:hidden">
      <AdSlot slot="banner320x50" className="w-full max-w-[320px]" />
    </div>
  );
}
