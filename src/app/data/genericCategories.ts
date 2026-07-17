// ─── GENERIC CATEGORY MAPPING (for homepage category grid) ───────────────────
// Separate from `mapCategory`/`mapNavCategory` in useProducts.ts, which only
// match English keywords and largely miss Vietnamese Shopify productType
// strings. This mapping is keyed off Vietnamese terms actually seen in the
// VN store's "Loại sản phẩm" (product type) field, with a few English
// loanwords Shopify VN also uses verbatim (Camera, Gaming, Charger…).
//
// Returns null for product types outside these 10 buckets (bags, straps,
// misc accessories, etc.) — those products simply won't appear in any tile,
// which is intentional; this grid is for browsing by device type, not a
// catch-all.

export type GenericCategoryKey =
  | 'dien-thoai'
  | 'tablet'
  | 'laptop'
  | 'gia-dung'
  | 'suc-khoe-lam-dep'
  | 'am-thanh'
  | 'dong-ho'
  | 'camera'
  | 'pc-man-hinh'
  | 'tivi';

export const GENERIC_CATEGORIES: { key: GenericCategoryKey; label: string }[] = [
  { key: 'dien-thoai', label: 'Điện thoại' },
  { key: 'tablet', label: 'Tablet' },
  { key: 'laptop', label: 'Laptop' },
  { key: 'gia-dung', label: 'Gia dụng' },
  { key: 'suc-khoe-lam-dep', label: 'Sức khỏe làm đẹp' },
  { key: 'am-thanh', label: 'Âm thanh' },
  { key: 'dong-ho', label: 'Đồng hồ' },
  { key: 'camera', label: 'Camera' },
  { key: 'pc-man-hinh', label: 'PC, Màn hình' },
  { key: 'tivi', label: 'Tivi' },
];

// Order matters: first match wins. Keep more specific checks (e.g. "ốp lưng")
// ahead of broader ones so a phone *case* doesn't accidentally get pulled
// into Audio just because "smartphone" appears elsewhere.
const RULES: { key: GenericCategoryKey; keywords: string[] }[] = [
  {
    key: 'suc-khoe-lam-dep',
    keywords: [
      'massage', 'giác hơi', 'thư giãn', 'làm đẹp', 'theraface',
      'recoveryair', 'recovery air',
    ],
  },
  {
    key: 'dong-ho',
    keywords: ['đồng hồ', 'dây đeo cảm biến', 'smartwatch'],
  },
  {
    key: 'camera',
    keywords: [
      'camera', 'máy ảnh', 'gimbal', 'ống kính', 'lens', 'film ảnh',
      'máy in ảnh', 'flycam', 'drone', 'balo máy ảnh',
    ],
  },
  {
    key: 'am-thanh',
    keywords: [
      'tai nghe', 'headphone', 'earbud', 'earphone', 'loa', 'speaker',
      'micro', 'true wireless', 'open ear', 'âm thanh', 'audio',
      'máy ghi âm', 'intercom', 'headset',
    ],
  },
  {
    key: 'dien-thoai',
    keywords: ['ốp lưng', 'ốp điện thoại', 'điện thoại', 'smartphone'],
  },
  {
    key: 'pc-man-hinh',
    keywords: [
      'bàn phím', 'chuột', 'keyboard', 'mouse', 'hub', 'adapter',
      'màn hình', 'monitor', 'cáp', 'dock', 'conventor',
    ],
  },
  {
    key: 'gia-dung',
    keywords: [
      'nhà thông minh', 'khóa thông minh', 'công tắc thông minh',
      'hút chân không', 'đèn', 'robot', 'trạm điện', 'quang năng',
      'tuabin', 'sạc dự phòng', 'sạc không dây', 'thiết bị thông minh',
    ],
  },
  {
    key: 'tablet',
    keywords: ['tablet', 'ipad'],
  },
  {
    key: 'laptop',
    keywords: ['laptop', 'macbook'],
  },
  {
    key: 'tivi',
    keywords: ['tivi', 'smart tv'],
  },
];

export function mapGenericCategory(productType: string): GenericCategoryKey | null {
  const t = (productType ?? '').toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some(k => t.includes(k))) return rule.key;
  }
  return null;
}
