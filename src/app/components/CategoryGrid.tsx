import { Smartphone, Tablet as TabletIcon, Laptop, Home as HomeIcon, HeartPulse, Headphones, Watch, Camera as CameraIcon, Monitor, Tv } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { GENERIC_CATEGORIES, mapGenericCategory, type GenericCategoryKey } from '../data/genericCategories';

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
};

type CategoryGridProps = {
  onNavToGenericCategory?: (category: GenericCategoryKey) => void;
};

export function CategoryGrid({ onNavToGenericCategory }: CategoryGridProps) {
  const { products } = useProducts();

  // Count real products per bucket, then only render categories that
  // actually have inventory — per Mals: "if a category has no product,
  // simply don't include it." This re-evaluates live, so if VN adds phones/
  // tablets/laptops/TVs to the catalog later, those tiles appear automatically.
  const counts = products.reduce<Partial<Record<GenericCategoryKey, number>>>((acc, p) => {
    const key = mapGenericCategory(p.type);
    if (key) acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const activeCategories = GENERIC_CATEGORIES.filter(c => (counts[c.key] ?? 0) > 0);

  if (activeCategories.length === 0) return null;

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-5 gap-x-2 gap-y-5">
          {activeCategories.map(cat => {
            const Icon = ICONS[cat.key];
            return (
              <button
                key={cat.key}
                onClick={() => onNavToGenericCategory?.(cat.key)}
                className="flex flex-col items-center gap-2 group"
              >
                <span className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-[#F16C10]/10 group-hover:text-[#F16C10] transition-colors">
                  <Icon size={24} />
                </span>
                <span className="text-xs text-center text-neutral-700 leading-tight group-hover:text-[#F16C10] transition-colors">
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
