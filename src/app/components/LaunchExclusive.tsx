import { useProducts } from '../hooks/useProducts';
import type { Product } from '../data/products';
import { useAuth } from './AuthContext';
import { getFostPrice } from '../data/pricing';
import { Star } from 'lucide-react';

// Exact figures from brand manager sheet
// handle → { srp, promo } — SRP and promo are the sheet values, NOT products.ts price
interface DealConfig {
  handle: string;
  srp: number;
  promo: number;
  label: string; // display vendor name
}

// Same 5 launch exclusive deals as LaunchExclusivePage.tsx, flat 15% off SRP
const FEATURED_DEALS: DealConfig[] = [
  { handle: 'may-massage-b\u1EAFp-chan-nen-khi-recoveryair-jetboots', srp: 24890000, promo: 21157000, label: 'THERABODY' },
  { handle: 'box-di-d\u1ED9ng-ssd-m2-nvme-gen4x4-satechi-usb4-pro',   srp: 2990000,  promo: 2542000,  label: 'SATECHI'   },
  { handle: 'micro-thu-am-shure-mv7-plus',                            srp: 10100000, promo: 8585000,  label: 'SHURE'     },
  { handle: 'sung-massage-theragun-pro-plus',                         srp: 18890000, promo: 16057000, label: 'THERABODY' },
  { handle: 'satechi-m1-wireless-mouse',                              srp: 790000,   promo: 672000,   label: 'SATECHI'   },
];

type Props = {
  onSelectProduct?: (p: Product) => void;
  onViewAll?: () => void;
};

export function LaunchExclusive({ onSelectProduct, onViewAll }: Props) {
  const { products } = useProducts();
  const { user } = useAuth();
  const isFostMember = Boolean(user);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#F16C10] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                ▶ Launch Exclusive
              </span>
            </div>
            <h2 className="text-[26px] md:text-4xl font-black text-black uppercase leading-tight">
              Be First To Shop.<br className="md:hidden" /> Get The Best.
            </h2>
            <p className="text-neutral-500 text-sm md:text-base mt-1 max-w-sm">
              Early shoppers on OSTSOME enjoy exclusive launch pricing on our top picks. Shop early, save more.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end text-right shrink-0 ml-6">
            <span className="text-4xl font-black text-[#F16C10]">Up to 15%</span>
            <span className="text-xs text-neutral-400 uppercase tracking-widest">Early Bird Off</span>
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="mt-3 text-xs font-bold text-[#F16C10] hover:underline uppercase tracking-wide"
              >
                View All Deals →
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-5 md:overflow-visible md:mx-0 md:px-0">
          {FEATURED_DEALS.map(deal => {
            const product = products.find(p => p.handle === deal.handle);
            if (!product) return null;
            const pct = Math.round(((deal.srp - deal.promo) / deal.srp) * 100);
            return (
              <div
                key={deal.handle}
                onClick={() => onSelectProduct?.(product)}
                className="shrink-0 w-[46%] sm:w-52 md:w-auto snap-start bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500"
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'; }}
                  />
                  <div className="absolute top-2 right-2 bg-[#F16C10] text-white text-[10px] font-black rounded-full w-9 h-9 flex items-center justify-center leading-none">
                    -{pct}%
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[9px] md:text-[10px] font-bold text-[#F16C10] uppercase tracking-widest mb-1">{deal.label}</p>
                  <h3 className="text-xs md:text-sm font-bold text-black line-clamp-2 mb-2">{product.title}</h3>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={10} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'} />
                    ))}
                  </div>
                  {isFostMember ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base md:text-lg font-black text-[#F16C10]">{getFostPrice(deal.promo).toLocaleString('vi-VN')}₫</span>
                      <span className="text-xs text-neutral-400 line-through">{deal.promo.toLocaleString('vi-VN')}₫</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base md:text-lg font-black text-[#F16C10]">{deal.promo.toLocaleString('vi-VN')}₫</span>
                      <span className="text-xs text-neutral-400 line-through">{deal.srp.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile view-all */}
        {onViewAll && (
          <div className="mt-6 text-center md:hidden">
            <button onClick={onViewAll} className="text-sm font-bold text-[#F16C10] hover:underline uppercase tracking-wide">
              View All Launch Deals →
            </button>
          </div>
        )}

        <p className="text-center text-xs text-neutral-400 mt-6">
          * Launch pricing available for a limited time only. While stocks last.
        </p>
      </div>
    </section>
  );
}