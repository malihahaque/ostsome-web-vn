import { Smartphone, Tablet as TabletIcon, Laptop, Home as HomeIcon, HeartPulse, Headphones, Watch, Camera as CameraIcon, Monitor, Tv, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { GENERIC_CATEGORIES, mapGenericCategory, type GenericCategoryKey } from '../data/genericCategories';
import type { Product } from '../data/products';

// Small icon badge in the corner of each photo tile — just enough to read
// the category at a glance; the product photo underneath does the real
// visual work instead of relying on an abstract icon set.
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

  // Group products per category, and grab the first in-stock product with a
  // real image to represent that tile — a real photo reads better here than
  // a generic icon, and costs nothing extra since we already have the data.
  const byCategory = products.reduce<Partial<Record<GenericCategoryKey, Product[]>>>((acc, p) => {
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
        <h2 className="text-lg md:text-xl font-bold text-black mb-5">Danh Mục Sản Phẩm</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-11 gap-3 md:gap-4">
          {activeCategories.map(cat => {
            const Icon = ICONS[cat.key];
            return (
              <button
                key={cat.key}
                onClick={() => onNavToGenericCategory?.(cat.key)}
                className="flex flex-col items-center gap-2 group"
              >
                <span className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-100 overflow-hidden ring-1 ring-neutral-200 group-hover:ring-2 group-hover:ring-[#F16C10] transition-all shadow-sm group-hover:shadow-md">
                  {cat.coverImage ? (
                    <img
                      src={cat.coverImage}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Icon size={26} />
                    </span>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white ring-1 ring-neutral-200 flex items-center justify-center text-[#F16C10] shadow-sm">
                    <Icon size={13} />
                  </span>
                </span>
                <span className="text-[11px] md:text-xs text-center text-neutral-700 leading-tight font-medium group-hover:text-[#F16C10] transition-colors">
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
