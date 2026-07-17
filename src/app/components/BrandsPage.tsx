import { useProducts } from '../hooks/useProducts';
import { normalize, brandMeta, getBrandImage, hasVectorLogo, BRAND_PRODUCT_IMAGES } from '../data/brandData';

// Only these brands should appear on the Our Brands page.
// Matches are case/spacing-insensitive against the `vendor` field in products.ts.
// Note: a few requested brands have no matching vendor in the current product
// data (CKMOVA, BLUETTI, MATADOR) and are simply absent until products for them
// exist. Looki L1 and the SwitchBot Lock Adapter were previously mistagged under
// vendor "OSTSOME" — their vendor fields are now corrected to "Looki" / "SWITCHBOT".
const ALLOWED_BRANDS = [
  'SKULLCANDY', 'BUTTONS', 'SENNHEISER', 'CLEER', 'OBSBOT', 'LOOKI', 'KANDAO',
  'HOHEM', 'POLAROID', 'KOSPET', 'SPCONNECT', 'DOMETIC', 'JACKERY', 'ARZOPA',
  'EDIZARD', 'TURTLEBEACH', 'SWITCHBOT', 'ENABOT', 'LOONA', 'LARQ',
  'THERABODY', 'SARAMONIC', 'SATECHI',
];

type BrandsPageProps = {
  onSelectBrand: (brand: string) => void;
};

export function BrandsPage({ onSelectBrand }: BrandsPageProps) {
  const { products, loading } = useProducts();

  const allowedSet = new Set(ALLOWED_BRANDS.map(normalize));

  // Group by normalized vendor so any casing duplicates (e.g. "DOMETIC" vs
  // "Dometic") always merge into a single card — this no longer depends on
  // products.ts having perfectly consistent casing.
  const brandGroups = new Map<string, { display: string; count: number }>();
  for (const p of products) {
    const key = normalize(p.vendor);
    if (!allowedSet.has(key)) continue;
    const existing = brandGroups.get(key);
    if (!existing) {
      brandGroups.set(key, { display: p.vendor, count: 1 });
    } else {
      existing.count++;
      // Prefer whichever casing is more common as the display name
      const currentCount = products.filter(x => x.vendor === existing.display).length;
      if (products.filter(x => x.vendor === p.vendor).length > currentCount) {
        existing.display = p.vendor;
      }
    }
  }
  const brands = [...brandGroups.values()].sort((a, b) => a.display.localeCompare(b.display));

  return (
    <section className="py-10 md:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-[26px] md:text-4xl font-bold text-black uppercase">Our Brands</h2>
          <p className="text-sm text-neutral-500 mt-1">
            {loading ? 'Loading…' : `${brands.length} brands`}
          </p>
        </div>

        <div className="border-t border-neutral-100 mb-8" />

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-[#F16C10] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brands.map(({ display: brand, count }) => {
              const meta = brandMeta[brand];
              const imgSrc = getBrandImage(brand);
              const hasVector = hasVectorLogo(brand);
              const productPhotoFallback = BRAND_PRODUCT_IMAGES[brand];

              return (
                <button
                  key={brand}
                  onClick={() => onSelectBrand(brand)}
                  className="group flex flex-col items-center text-center p-5 border border-neutral-100 rounded-2xl hover:border-[#F16C10] hover:shadow-lg transition-all bg-white"
                >
                  {/* Logo / product image area */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-neutral-50 group-hover:bg-neutral-100 transition-colors">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={brand}
                        className={`transition-transform duration-300 group-hover:scale-105 ${hasVector ? 'w-full h-full object-contain p-3' : 'w-full h-full object-cover'}`}
                        onError={e => {
                          const target = e.currentTarget;
                          if (productPhotoFallback && target.src !== productPhotoFallback) {
                            target.src = productPhotoFallback;
                            target.className = 'transition-transform duration-300 group-hover:scale-105 w-full h-full object-cover';
                            return;
                          }
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-2xl font-bold text-neutral-400 group-hover:text-[#F16C10]">${brand.charAt(0)}</span>`;
                          }
                        }}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-neutral-400 group-hover:text-[#F16C10] transition-colors">
                        {brand.charAt(0)}
                      </span>
                    )}
                  </div>

                  <span className="text-sm font-bold text-black group-hover:text-[#F16C10] transition-colors leading-tight mb-1">
                    {brand}
                  </span>
                  {meta && (
                    <span className="text-[10px] text-neutral-400 leading-tight mb-1">{meta.description}</span>
                  )}
                  <span className="text-xs text-[#F16C10] font-medium">{count} products</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}