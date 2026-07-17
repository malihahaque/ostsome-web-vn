// ─── FLASH SALE CONFIG ─────────────────────────────────────────────────────
// Centralized so weekly/campaign maintenance only requires editing this one
// file — same pattern as SG's flashSale.ts.

// Flash sale ends July 27, 2026, 11:59:59 PM Vietnam time (ICT = UTC+7).
export const FLASH_SALE_END_DATE = new Date('2026-07-27T23:59:59+07:00');

export const FLASH_SALE_DISCOUNT_PERCENT = 15;

export function getFlashSalePrice(listPrice: number): number {
  return Math.round(listPrice * (1 - FLASH_SALE_DISCOUNT_PERCENT / 100));
}

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

type FlashSaleEntry = {
  handle: string;
  note: string;
  // Fallback used ONLY if the exact handle doesn't match — matches by
  // title keywords instead of vendor, since some products in this catalog
  // have their vendor field mistagged as "OSTSOME" (a known issue —
  // BrandsPage.tsx notes the same bug for Looki L1 and the SwitchBot Lock
  // Adapter; Skullcandy Method 360 ANC turns out to be a third instance).
  // Title text is reliable even when vendor isn't, since the brand name
  // appears directly in the product title.
  fallbackTitleIncludesAll?: string[];
};

export const FLASH_SALE_HANDLES: FlashSaleEntry[] = [
  {
    handle: 'tai-nghe-bluetooth-skullcandy-method-360-anc-bảo-hanh-1-nam-chống-ồn-pin-40-giờ-chống-ồn-chủ-động',
    note: 'CONFIRMED via live screenshot — vendor field is mistagged "OSTSOME" so matching falls back to title keywords',
    fallbackTitleIncludesAll: ['skullcandy', 'method 360'],
  },
  { handle: 'sung-massage-theragun-sense', note: 'CONFIRMED — verified live URL on ostsomevietnam.netlify.app' },
  {
    handle: 'ba-lo-du-lịch-matador-refraction-packable-backpack',
    note: 'CONFIRMED — seen live on ostsome.com.vn',
    fallbackTitleIncludesAll: ['matador', 'refraction'],
  },
  { handle: 'recoverytherm-cube', note: 'CONFIRMED — verified live URL on ostsomevietnam.netlify.app' },
  { handle: 'satechi-thunderbolt-4-pro-cable', note: 'CONFIRMED — verified live URL on ostsomevietnam.netlify.app' },
];

// Shared matcher used by both FlashSaleSection and FlashSalePage so the
// fallback logic lives in exactly one place.
export function findFlashSaleProduct<T extends { handle: string; vendor: string; title: string }>(
  entry: FlashSaleEntry,
  products: T[]
): T | undefined {
  const exact = products.find(p => p.handle.normalize('NFC') === entry.handle.normalize('NFC'));
  if (exact) return exact;

  // Try again ignoring diacritics entirely, in case of an accent-only mismatch.
  const strippedMatch = products.find(p => stripDiacritics(p.handle) === stripDiacritics(entry.handle));
  if (strippedMatch) return strippedMatch;

  // Last resort: every keyword must appear in the title. Deliberately does
  // NOT check vendor, since vendor is unreliable for some products here.
  if (entry.fallbackTitleIncludesAll) {
    return products.find(p => {
      const title = stripDiacritics(p.title);
      return entry.fallbackTitleIncludesAll!.every(kw => title.includes(stripDiacritics(kw)));
    });
  }
  return undefined;
}