import { Dumbbell, HeartPulse, Volume2, Headphones, Smartphone, Laptop, Mic, Gamepad2, Briefcase, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { GENERIC_CATEGORIES, mapGenericCategory, type GenericCategoryKey } from '../data/genericCategories';
import type { Product } from '../data/products';

// Only used as a placeholder for the rare case a category has no product
// image at all — the photo itself is the primary visual now, no badge.
const ICONS: Record<GenericCategoryKey, React.ComponentType<{ size?: number; className?: string }>> = {
  'the-thao': Dumbbell,
  'suc-khoe-lam-dep': HeartPulse,
  'loa': Volume2,
  'tai-nghe': Headphones,
  'phu-kien-di-dong': Smartphone,
  'phu-kien-laptop': Laptop,
  'micro': Mic,
  'gaming': Gamepad2,
  'phu-kien-du-lich': Briefcase,
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
    const key = mapGenericCategory(p.type, p.title, p.vendor);
    (acc[key] ??= []).push(p);
    return acc;
  }, {});

  // Always show all 10 categories as a fixed nav strip, even ones with no
  // matching products yet (falls back to the icon instead of a cover
  // photo) — this is a fixed taxonomy the VN team wants visible in full,
  // not a "only show what's currently in stock" grid.
  const activeCategories = GENERIC_CATEGORIES.map(cat => {
    const items = byCategory[cat.key] ?? [];
    const cover = items.find(p => p.availableForSale && p.images[0]) ?? items.find(p => p.images[0]);
    return { ...cat, count: items.length, coverImage: cover?.images[0] ?? null };
  });

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-lg md:text-xl font-bold text-black mb-6">Danh Mục Sản Phẩm</h2>
        {/* Fixed grid-cols-5 on mobile so all 10 categories settle into
            exactly 2 rows of 5, matching the VN team's reference layout;
            widens to a single row of 10 from md up where there's room. */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-5 md:gap-x-4">
          {activeCategories.map(cat => {
            const Icon = ICONS[cat.key];
            return (
              <button
                key={cat.key}
                onClick={() => onNavToGenericCategory?.(cat.key)}
                className="flex flex-col items-center gap-2 group"
              >
                <span className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white overflow-hidden ring-1 ring-neutral-200 group-hover:ring-2 group-hover:ring-[#F16C10] transition-all shadow-sm group-hover:shadow-md">
                  {cat.coverImage ? (
                    <img
                      src={cat.coverImage}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Icon size={20} />
                    </span>
                  )}
                </span>
                <span className="text-[10px] sm:text-xs text-center text-neutral-700 leading-tight font-medium group-hover:text-[#F16C10] transition-colors">
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