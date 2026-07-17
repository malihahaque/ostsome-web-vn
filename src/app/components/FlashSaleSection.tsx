import { useAuth } from './AuthContext';
import { useProducts } from '../hooks/useProducts';
import { getFostPrice } from '../data/pricing';
import { FLASH_SALE_HANDLES, getFlashSalePrice, FLASH_SALE_DISCOUNT_PERCENT } from '../data/flashSale';
import { FlashSaleHeading } from './FlashSaleCountdown';
import type { Product } from '../data/products';

type FlashSaleSectionProps = {
  onSelectProduct?: (product: Product) => void;
  onViewAll?: () => void;
};

// Homepage teaser — shows the first 3 flash sale products with a "View All"
// link to the full FlashSalePage. Any handle in FLASH_SALE_HANDLES that
// doesn't match a real product (wrong/unverified handle) is silently
// skipped rather than showing a broken card.
export function FlashSaleSection({ onSelectProduct, onViewAll }: FlashSaleSectionProps) {
  const { products } = useProducts();
  const { user } = useAuth();

  const flashProducts = FLASH_SALE_HANDLES
    .map(({ handle }) => products.find(p => p.handle === handle))
    .filter((p): p is Product => Boolean(p));

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <FlashSaleHeading />
          <button
            onClick={onViewAll}
            className="text-sm font-semibold text-[#F16C10] hover:text-black transition-colors whitespace-nowrap"
          >
            Xem tất cả →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {flashProducts.slice(0, 3).map(product => {
            const flashPrice = getFlashSalePrice(product.price);
            const displayPrice = user ? getFostPrice(flashPrice) : flashPrice;
            return (
              <div
                key={product.handle}
                onClick={() => onSelectProduct?.(product)}
                className="bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-xl transition group cursor-pointer"
              >
                <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="absolute top-2 right-2 bg-[#F16C10] text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{FLASH_SALE_DISCOUNT_PERCENT}%
                  </span>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[10px] font-semibold text-[#F16C10] uppercase tracking-widest mb-1">{product.vendor}</p>
                  <h3 className="text-sm font-bold text-black mb-2 line-clamp-2 min-h-[2.5em]">{product.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-base md:text-lg font-bold text-[#F16C10]">{displayPrice.toLocaleString('vi-VN')}₫</span>
                    <span className="text-xs text-neutral-400 line-through">{product.price.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
