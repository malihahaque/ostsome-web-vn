// ─── NAV CATEGORIES (Vietnamese labels for SG's nav bar taxonomy) ────────────
// Mirrors the SG site's `mapNavCategory()` keys exactly (see useProducts.ts —
// `navCategory` field on each Product), so filtering logic didn't need to
// change, only the labels shown to shoppers. Replaces the old 10-category
// "Danh Mục Sản Phẩm" icon grid (genericCategories.ts) per Mr. Boh — VN nav
// should match SG's nav bar, just in Vietnamese.
//
// NOTE: keys stay in English on purpose — they must match the literal
// strings `mapNavCategory()` in useProducts.ts returns (which VN already
// computes per-product, unused until now). Only `label`/`description` are
// Vietnamese. If a translation needs tweaking, this is the one place to
// change it — Header.tsx and NavCategoryPage.tsx both read from here.

export type NavCategoryKey =
  | 'Mobile Creator'
  | 'Mobile Audio'
  | 'Gaming'
  | 'Smart Life'
  | 'Wellness'
  | 'Travel & Carry'
  | 'Desk Setup';

export const NAV_CATEGORIES: { key: NavCategoryKey; label: string; description: string; emoji: string }[] = [
  { key: 'Mobile Creator', label: 'Nhà Sáng Tạo', description: 'Gimbal, camera, micro và phụ kiện gắn cho nhà sáng tạo nội dung di động.', emoji: '🎥' },
  { key: 'Mobile Audio', label: 'Âm Thanh Di Động', description: 'Tai nghe nhét tai và tai nghe chụp cho âm nhạc, cuộc gọi và mọi khoảnh khắc.', emoji: '🎧' },
  { key: 'Gaming', label: 'Gaming', description: 'Tay cầm, bàn phím và màn hình dành cho game thủ.', emoji: '🎮' },
  { key: 'Smart Life', label: 'Cuộc Sống Thông Minh', description: 'Đồng hồ thông minh và thiết bị nhà thông minh giúp cuộc sống dễ dàng hơn.', emoji: '⌚' },
  { key: 'Wellness', label: 'Sức Khỏe', description: 'Thiết bị theo dõi sức khỏe và thể chất giúp bạn luôn ở trạng thái tốt nhất.', emoji: '💪' },
  { key: 'Travel & Carry', label: 'Du Lịch & Mang Theo', description: 'Sạc dự phòng, màn hình gọn nhẹ và action cam cho những chuyến đi.', emoji: '✈️' },
  { key: 'Desk Setup', label: 'Góc Làm Việc', description: 'Màn hình, webcam và phụ kiện nâng tầm không gian làm việc của bạn.', emoji: '🖥️' },
];
