import { ChevronLeft, Star } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from './AuthContext';
import { getFostPrice } from '../data/pricing';
import { GENERIC_CATEGORIES, mapGenericCategory, type GenericCategoryKey } from '../data/genericCategories';
import type { Product } from '../data/products';

type CategoryProductsPageProps = {
  category: GenericCategoryKey;
  onBack?: () => void;
  onSelectProduct?: (product: Product) => void;
};

export function CategoryProductsPage({ category, onBack, onSelectProduct }: CategoryProductsPageProps) {
  const { products, loading } = useProducts();
  const { user } = useAuth();

  const label = GENERIC_CATEGORIES.find(c => c.key === category)?.label ?? '';
  // Match ProductListing.tsx and CategoryGrid.tsx: hide sold-out products
  // everywhere so counts agree across the whole site.
  const matches = products.filter(p => p.availableForSale && mapGenericCategory(p.type, p.title, p.vendor) === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-[#F16C10] transition-colors mb-4"
        >
          <ChevronLeft size={16} /> Quay lại
        </button>
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">{label}</h1>
      <p className="text-sm text-neutral-500 mb-6">{matches.length} sản phẩm</p>

      {loading && (
        <p className="text-neutral-400 text-sm">Đang tải sản phẩm...</p>
      )}

      {!loading && matches.length === 0 && (
        <p className="text-neutral-400 text-sm">Chưa có sản phẩm trong danh mục này.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {matches.map(product => {
          const hasDiscount = Boolean(product.comparePrice) && product.comparePrice! > product.price;
          const discountPct = hasDiscount
            ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
            : 0;
          // True RRP: the pre-sale comparePrice if this product is already
          // discounted, otherwise just the regular price. Matches
          // ProductCard.tsx — previously this page compared the FOST price
          // against product.price even when a sale was already active,
          // which understated the "was" price shown to members.
          const originalPrice = hasDiscount ? product.comparePrice! : product.price;
          return (
            <button
              key={product.handle}
              onClick={() => onSelectProduct?.(product)}
              className="text-left group"
            >
              <div className="relative aspect-square rounded-xl bg-white overflow-hidden mb-3">
                {hasDiscount && (
                  <span className="absolute top-2 left-2 z-10 bg-[#F16C10] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    -{discountPct}%
                  </span>
                )}
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <p className="text-xs font-semibold text-[#F16C10] uppercase tracking-wider mb-0.5">{product.vendor}</p>
              <p className="text-sm font-medium text-black truncate mb-1">{product.title}</p>
              <div className="flex items-center gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={10} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'} />
                ))}
              </div>
              {Boolean(user) ? (
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400 line-through">{originalPrice.toLocaleString('vi-VN')}₫</span>
                  <span className="text-sm font-bold text-[#F16C10]">{getFostPrice(product.price).toLocaleString('vi-VN')}₫</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="text-xs text-neutral-400 line-through">{originalPrice.toLocaleString('vi-VN')}₫</span>
                  )}
                  <span className="text-sm font-bold text-[#F16C10]">{product.price.toLocaleString('vi-VN')}₫</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}