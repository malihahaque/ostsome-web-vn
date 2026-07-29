// ─── SOLD COUNT BASELINE ("Đã bán X" social-proof badge) ─────────────────────
// Shopify's Storefront API only exposes CURRENT remaining stock
// (`quantityAvailable` per variant — already fetched live in
// ProductDetail.tsx for the low-stock warning). It has no "units sold" or
// "starting stock" field, so a sold count can't be pulled from the API by
// itself. This file supplies the missing half: the stock level a product
// started at. ProductDetail.tsx then computes:
//
//     sold = baseline − live remaining stock
//
// Only products listed here show the badge — anything not listed here
// stays silent rather than guessing or showing a wrong number ("0 reviews"
// style fake content wasn't the ask; an inaccurate sold count is worse
// than no badge at all).
//
// IMPORTANT — update the baseline whenever a product is restocked. If you
// add more units to a product's inventory without raising its baseline
// here, remaining stock jumps back up and the computed "sold" count will
// drop or look wrong. Baseline = cumulative units ever stocked, not
// "units currently on the shelf."
export const SOLD_COUNT_BASELINE: Record<string, number> = {
  // 'product-handle': startingStockUnits,
  // Example: 'tai-nghe-bluetooth-skullcandy-method-360-anc': 600,
};
