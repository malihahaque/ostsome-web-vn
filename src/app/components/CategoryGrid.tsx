import { Smartphone, Tablet as TabletIcon, Laptop, Home as HomeIcon, HeartPulse, Headphones, Watch, Camera as CameraIcon, Monitor, Tv, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { GENERIC_CATEGORIES, mapGenericCategory, type GenericCategoryKey } from '../data/genericCategories';
import type { Product } from '../data/products';

// Only used as a placeholder for the rare case a category has no product
// image at all — the photo itself is the primary visual now, no badge.
const ICONS: Record<GenericCategoryKey, React.ComponentType<{ size?: number; className?: string }>> = {
  'dien-thoai': Smartphone,
  'tablet': TabletIcon,
  'laptop': Laptop,
  'gia-dung': HomeIcon,
  'suc-khoe-lam-dep': HeartPulse,
  'am-thanh': Headphones,
  'dong-ho': Watch,
  'camera': CameraIcon,
  'pc-man-hinh': Monitor,
  'tivi': Tv,
  'khac': Sparkles,
};

type CategoryGridProps = {
  onNavToGenericCategory?: (category: GenericCategoryKey) => void;
};

export function CategoryGrid({ onNavToGenericCategory }: CategoryGridProps) {
  const { products } = useProducts();

  // Match ProductListing.tsx: hide sold-out products from counts and cover
  // photos, so this grid's numbers agree with "All Products" instead of
  // counting things that aren't actually purchasable.
  const byCategory = products.filter(p => p.availableForSale).reduce<Partial<Record<GenericCategoryKey, Product[]>>>((acc, p) => {
    const key = mapGenericCategory(p.type);
    (acc[key] ??= []).push(p);
    return acc;
  }, {});

  const activeCategories = GENERIC_CATEGORIES
    .map(cat => {
      const items = byCategory[cat.key] ?? [];
      const cover = items.find(p => p.availableForSale && p.images[0]) ?? items.find(p => p.images[0]);
      return { ...cat, count: items.length, coverImage: cover?.images[0] ?? null };
    })
    .filter(cat => cat.count > 0);

  if (activeCategories.length === 0) return null;

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-lg md:text-xl font-bold text-black mb-6">Danh Mục Sản Phẩm</h2>
        {/* flex-wrap (not a fixed grid-cols count) so this naturally settles
            into ~2 rows regardless of how many categories end up active —
            robust if VN adds Tablet/Laptop/Tivi inventory later. */}
        <div className="flex flex-wrap gap-x-6 gap-y-8 md:gap-x-8">
          {activeCategories.map(cat => {
            const Icon = ICONS[cat.key];
            return (
              <button
                key={cat.key}
                onClick={() => onNavToGenericCategory?.(cat.key)}
                className="flex flex-col items-center gap-3 group w-24 md:w-32"
              >
                <span className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neutral-100 overflow-hidden ring-1 ring-neutral-200 group-hover:ring-2 group-hover:ring-[#F16C10] transition-all shadow-sm group-hover:shadow-md">
                  {cat.coverImage ? (
                    <img
                      src={cat.coverImage}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Icon size={36} />
                    </span>
                  )}
                </span>
                <span className="text-xs md:text-sm text-center text-neutral-700 leading-tight font-medium group-hover:text-[#F16C10] transition-colors">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}