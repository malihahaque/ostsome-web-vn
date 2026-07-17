import { ChevronLeft } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../data/products';
import { normalize, getBrandImage, getBrandPhoto, hasVectorLogo, brandMeta, brandHistory } from '../data/brandData';

type BrandDetailProps = {
  brand: string;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
};

export function BrandDetail({ brand, onBack, onSelectProduct }: BrandDetailProps) {
  const { products, loading } = useProducts();
  // Match ProductListing.tsx, CategoryGrid.tsx, etc.: hide sold-out products
  // everywhere so counts agree across the whole site.
  const brandProducts = products.filter(p => p.availableForSale && normalize(p.vendor) === normalize(brand));

  const logoSrc = getBrandImage(brand);
  const isVectorLogo = hasVectorLogo(brand);
  const bannerPhoto = getBrandPhoto(brand);
  // Real "history" copy where we have it (paraphrased from the live site),
  // falling back to the one-line tagline already used on the Brands grid,
  // and finally to nothing rather than invented text.
  const copy = brandHistory[brand] ?? brandMeta[brand]?.description ?? null;

  return (
    <section className="bg-white min-h-screen">
      {/* Per-brand banner — uses that brand's own logo + real product
          photography as the background, rather than generic Ostsome-orange
          styling, so each brand's page reads as its own identity. */}
      <div className="relative bg-neutral-900 overflow-hidden">
        {bannerPhoto && (
          <>
            <img
              src={bannerPhoto}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px] scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </>
        )}
        <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-16">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-8"
          >
            <ChevronLeft size={16} /> All Brands
          </button>

          <div className="flex items-center gap-5">
            {logoSrc && (
              <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl bg-white overflow-hidden flex items-center justify-center shadow-lg">
                <img
                  src={logoSrc}
                  alt={brand}
                  className={isVectorLogo ? 'w-full h-full object-contain p-4' : 'w-full h-full object-cover'}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <div>
              <h2 className="text-[26px] md:text-4xl font-bold text-white uppercase mb-1">{brand}</h2>
              <p className="text-sm text-white/60">{loading ? 'Loading…' : `${brandProducts.length} products`}</p>
            </div>
          </div>

          {copy && (
            <p className="relative mt-6 max-w-2xl text-sm md:text-base text-white/90 leading-relaxed">
              {copy}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-[#F16C10] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : brandProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {brandProducts.map(product => (
              <ProductCard key={product.handle} product={product} onClick={onSelectProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">📦</p>
            <p className="text-lg font-semibold text-black mb-2">No products found</p>
            <p className="text-sm text-neutral-500">Check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}