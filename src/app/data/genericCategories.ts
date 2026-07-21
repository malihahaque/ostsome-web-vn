// ─── GENERIC CATEGORY MAPPING (for homepage category grid) ───────────────────
// Separate from `mapCategory`/`mapNavCategory` in useProducts.ts, which only
// match English keywords and largely miss Vietnamese Shopify productType
// strings. This mapping is keyed off Vietnamese terms actually seen in the
// VN store's "Loại sản phẩm" (product type) field, with a few English
// loanwords Shopify VN also uses verbatim (Gaming, Micro, Adapter…).
//
// NOTE: this replaces the previous 11 device-type buckets (Điện thoại,
// Tablet, Laptop, Camera, Đồng hồ, Tivi, etc.) with a new 10-category set
// requested by the VN team, organized more around accessory type than
// device type. A few product types that had a dedicated home before
// (cameras/gimbals, smartwatches, tablets, laptops, TVs as devices) don't
// have an obvious bucket in the new list and fall into "Khác" — flag any
// of these that show up miscategorized once this is live, since the exact
// wording of "Loại sản phẩm" for those products wasn't available to verify
// keyword matches against.
//
// Returns 'khac' for anything that doesn't match a more specific rule, so
// every product still lands somewhere.

export type GenericCategoryKey =
  | 'the-thao'
  | 'suc-khoe-lam-dep'
  | 'loa'
  | 'tai-nghe'
  | 'phu-kien-di-dong'
  | 'phu-kien-laptop'
  | 'micro'
  | 'gaming'
  | 'phu-kien-du-lich'
  | 'khac';

export const GENERIC_CATEGORIES: { key: GenericCategoryKey; label: string }[] = [
  { key: 'the-thao', label: 'Thể thao' },
  { key: 'suc-khoe-lam-dep', label: 'Sức Khỏe Làm Đẹp' },
  { key: 'loa', label: 'Loa' },
  { key: 'tai-nghe', label: 'Tai Nghe' },
  { key: 'phu-kien-di-dong', label: 'Phụ Kiện Di Động' },
  { key: 'phu-kien-laptop', label: 'Phụ Kiện Laptop' },
  { key: 'micro', label: 'Micro' },
  { key: 'gaming', label: 'Gaming' },
  { key: 'phu-kien-du-lich', label: 'Phụ Kiện Du Lịch' },
  // Catch-all so every product lands somewhere. Kept last so it never
  // displaces a more specific, meaningful match.
  { key: 'khac', label: 'Khác' },
];

// Order matters: first match wins. Keep more specific checks ahead of
// broader ones — e.g. "tai nghe gaming" should land in Gaming or Tai Nghe
// consistently rather than flip-flopping depending on rule order, so
// Gaming is checked first since it's the more specific signal when both
// words appear together.
const RULES: { key: GenericCategoryKey; keywords: string[] }[] = [
  {
    key: 'gaming',
    keywords: [
      'gaming', 'tay cầm chơi game', 'tay cầm', 'controller', 'joystick',
      'game pass', 'backbone',
    ],
  },
  {
    key: 'micro',
    keywords: ['micro', 'microphone', 'lavalier', 'thu âm', 'máy ghi âm'],
  },
  {
    key: 'tai-nghe',
    keywords: [
      'tai nghe', 'headphone', 'headset', 'earbud', 'earphone',
      'true wireless', 'open ear',
    ],
  },
  {
    key: 'loa',
    keywords: ['loa', 'speaker'],
  },
  {
    key: 'the-thao',
    keywords: [
      'thể thao', 'chạy bộ', 'đai đo nhịp tim', 'nhịp tim', 'heart rate',
      'dây đeo cảm biến', 'polar', 'đồng hồ thông minh', 'smartwatch',
      'fitness',
    ],
  },
  {
    key: 'suc-khoe-lam-dep',
    keywords: [
      'massage', 'giác hơi', 'thư giãn', 'làm đẹp', 'theraface',
      'recoveryair', 'recovery air', 'chăm sóc da',
    ],
  },
  {
    key: 'phu-kien-du-lich',
    keywords: [
      'balo', 'túi', 'vali', 'du lịch', 'duffle', 'túi đeo chéo',
      'bình nước', 'larq', 'organizer',
    ],
  },
  {
    key: 'phu-kien-laptop',
    keywords: [
      'bàn phím', 'chuột', 'keyboard', 'mouse', 'hub', 'dock',
      'màn hình', 'monitor', 'laptop', 'macbook', 'đế tản nhiệt',
    ],
  },
  {
    key: 'phu-kien-di-dong',
    keywords: [
      'ốp lưng', 'ốp điện thoại', 'điện thoại', 'smartphone',
      'sạc dự phòng', 'sạc không dây', 'cáp sạc', 'cáp', 'adapter',
      'giá đỡ điện thoại', 'gimbal',
    ],
  },
];

// Falls back to matching against the product title when the Shopify "Type"
// field is empty (confirmed this happens — e.g. KEF LS50 Meta has Type set
// to "None" in Shopify Admin, so there's literally no productType text to
// match against). Titles like "Loa Bookshelf KEF Q150" still carry the
// category keyword even when Type doesn't. This won't rescue every
// blank-Type product — if the category keyword isn't in the title either,
// there's genuinely nothing here to match on, and the real fix for those
// is filling in the Type field in Shopify Admin, not another keyword.
export function mapGenericCategory(productType: string, title?: string): GenericCategoryKey {
  const t = `${productType ?? ''} ${title ?? ''}`.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some(k => t.includes(k))) return rule.key;
  }
  return 'khac';
}
