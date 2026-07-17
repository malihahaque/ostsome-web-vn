// ─── FLASH SALE CONFIG ─────────────────────────────────────────────────────
// Centralized so weekly/campaign maintenance only requires editing this one
// file — same pattern as SG's flashSale.ts.

// Flash sale ends July 27, 2026, 11:59:59 PM Vietnam time (ICT = UTC+7).
export const FLASH_SALE_END_DATE = new Date('2026-07-27T23:59:59+07:00');

export const FLASH_SALE_DISCOUNT_PERCENT = 15;

export function getFlashSalePrice(listPrice: number): number {
  return Math.round(listPrice * (1 - FLASH_SALE_DISCOUNT_PERCENT / 100));
}

// Handles marked CONFIRMED were verified against the live site or Shopify
// data directly. Handles marked GUESSED are best guesses based on naming
// conventions and have NOT been verified — check Shopify Admin → Products
// → the product's Handle field under SEO before pushing live. A wrong
// handle just means that card silently won't find a product (see
// FlashSaleSection/FlashSalePage — they filter out any handle with no
// match rather than crashing).
export const FLASH_SALE_HANDLES: { handle: string; note: string }[] = [
  { handle: 'tai-nghe-bluetooth-skullcandy-method-360-anc-bảo-hanh-1-nam-chống-ồn-pin-40-giờ-chống-ồn-chủ-động', note: 'CONFIRMED — verified live URL on ostsomevietnam.netlify.app' },
  { handle: 'sung-massage-theragun-sense', note: 'CONFIRMED — verified live URL on ostsomevietnam.netlify.app' },
  { handle: 'ba-lo-du-lich-matador-refraction-packable-backpack', note: 'CONFIRMED — seen live on ostsome.com.vn' },
  { handle: 'recoverytherm-cube', note: 'CONFIRMED — verified live URL on ostsomevietnam.netlify.app' },
  { handle: 'satechi-thunderbolt-4-pro-cable', note: 'CONFIRMED — verified live URL on ostsomevietnam.netlify.app' },
];
