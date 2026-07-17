import { ChevronLeft } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useProducts } from '../hooks/useProducts';
import { getFostPrice } from '../data/pricing';
import { FLASH_SALE_HANDLES, getFlashSalePrice, FLASH_SALE_DISCOUNT_PERCENT, findFlashSaleProduct } from '../data/flashSale';
import { FlashSaleHeading } from './FlashSaleCountdown';
import type { Product } from '../data/products';

type FlashSalePageProps = {
  onBack: () => void;
  onSelectProduct?: (product: Product) => void;
};

export function FlashSalePage({ onBack, onSelectProduct }: FlashSalePageProps) {
  const { products, loading } = useProducts();
  const { user } = useAuth();

  const flashProducts = FLASH_SALE_HANDLES
    .map(entry => findFlashSaleProduct(entry, products))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 min-h-screen">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#F16C10] transition-colors mb-6"
      >
        <ChevronLeft size={16} /> Trang chủ
      </button>

      <div className="mb-8">
        <FlashSaleHeading />
        <p className="text-sm text-neutral-500 mt-2">{flashProducts.length} sản phẩm giảm giá</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#F16C10] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : flashProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {flashProducts.map(product => {
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
      ) : (
        <div className="text-center py-24">
          <p className="text-4xl mb-4">⏰</p>
          <p className="text-lg font-semibold text-black mb-2">Không tìm thấy sản phẩm</p>
          <p className="text-sm text-neutral-500">Kiểm tra lại handle sản phẩm trong flashSale.ts.</p>
        </div>
      )}
    </div>
  );
}
