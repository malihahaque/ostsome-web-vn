import { ChevronLeft } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../data/products';
import { NAV_CATEGORIES } from '../data/navCategories';

type NavCategoryPageProps = {
  category: string;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
};

export function NavCategoryPage({ category, onBack, onSelectProduct }: NavCategoryPageProps) {
  const { products, loading } = useProducts();
  // Hide sold-out products — same rule as "Shop All Products". Reappears
  // automatically once restocked since availableForSale is live from Shopify.
  const categoryProducts = products.filter(p => p.navCategory === category && p.availableForSale);
  const meta = NAV_CATEGORIES.find(c => c.key === category);

  return (
    <section className="py-10 md:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#F16C10] transition-colors mb-8"
        >
          <ChevronLeft size={16} /> Quay lại
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{meta?.emoji}</span>
            <h2 className="text-[26px] md:text-4xl font-bold text-black uppercase">{meta?.label ?? category}</h2>
          </div>
          {meta && <p className="text-sm text-neutral-500 max-w-lg">{meta.description}</p>}
          <p className="text-xs text-neutral-400 mt-1">{loading ? 'Đang tải…' : `${categoryProducts.length} sản phẩm`}</p>
        </div>

        <div className="border-t border-neutral-100 mb-8" />

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-[#F16C10] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {categoryProducts.map(product => (
              <ProductCard key={product.handle} product={product} onClick={onSelectProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-semibold text-black mb-2">Sắp ra mắt</p>
            <p className="text-sm text-neutral-500">Chúng tôi đang bổ sung thêm sản phẩm cho danh mục này.</p>
          </div>
        )}
      </div>
    </section>
  );
}