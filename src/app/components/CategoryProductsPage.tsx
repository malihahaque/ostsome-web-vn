import { ChevronLeft } from 'lucide-react';
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
  const matches = products.filter(p => p.availableForSale && mapGenericCategory(p.type) === category);

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
        {matches.map(product => (
          <button
            key={product.handle}
            onClick={() => onSelectProduct?.(product)}
            className="text-left group"
          >
            <div className="aspect-square rounded-xl bg-neutral-100 overflow-hidden mb-3">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <p className="text-xs font-semibold text-[#F16C10] uppercase tracking-wider mb-0.5">{product.vendor}</p>
            <p className="text-sm font-medium text-black truncate mb-1">{product.title}</p>
            {Boolean(user) ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#F16C10]">{getFostPrice(product.price).toLocaleString('vi-VN')}₫</span>
                <span className="text-xs text-neutral-400 line-through">{product.price.toLocaleString('vi-VN')}₫</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-black">{product.price.toLocaleString('vi-VN')}₫</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
