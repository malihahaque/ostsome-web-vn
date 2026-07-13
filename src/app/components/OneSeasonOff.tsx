import { useProducts } from '../hooks/useProducts';
import type { Product } from '../data/products';
import { useAuth } from './AuthContext';
import { getFostPrice } from '../data/pricing';

interface ClearanceDeal {
  handle: string;
  label: string;
  name: string;
  srp: number;
  promo: number;
}

// All 6 One Season Off deals at a flat 50% off SRP, from real VN catalog prices
const CLEARANCE_DEALS: ClearanceDeal[] = [
  { handle: 'satechi-165w-usb-c-4-port-pd-gan-charger', label: 'SATECHI',     name: 'USB-C 165W PD 4-Port GaN Charger',   srp: 2490000, promo: 1245000 },
  { handle: 'satechi-thunderbolt-4-pro-cable',           label: 'SATECHI',     name: 'Thunderbolt 4 Pro Cable',            srp: 1190000, promo: 595000  },
  { handle: 'satechi-stand-and-hub-for-mac-mini',         label: 'SATECHI',     name: 'Stand & Hub for Mac Mini',           srp: 1690000, promo: 845000  },
  { handle: 'sp-phone-case-spc-iphone-15-pro-max',        label: 'SP CONNECT',  name: 'SPC+ Phone Case — iPhone 15 Pro Max', srp: 950000,  promo: 475000  },
  { handle: 'sp-phone-case-spc-iphone-15',                label: 'SP CONNECT',  name: 'SPC+ Phone Case — iPhone 15',         srp: 950000,  promo: 475000  },
  { handle: 'shure-aonic-40-headphone',                   label: 'SHURE',       name: 'Aonic 40 Wireless ANC Headphones',   srp: 7700000, promo: 3850000 },
];

const HOMEPAGE_HANDLES = [
  'satechi-165w-usb-c-4-port-pd-gan-charger',
  'satechi-thunderbolt-4-pro-cable',
  'satechi-stand-and-hub-for-mac-mini',
  'sp-phone-case-spc-iphone-15-pro-max',
  'sp-phone-case-spc-iphone-15',
  'shure-aonic-40-headphone',
];

type Props = {
  onSelectProduct?: (p: Product) => void;
  onViewAll?: () => void;
};

export function OneSeasonOff({ onSelectProduct, onViewAll }: Props) {
  const { products } = useProducts();
  const { user } = useAuth();
  const isFostMember = Boolean(user);

  const homepageDeals = HOMEPAGE_HANDLES
    .map(h => {
      const deal = CLEARANCE_DEALS.find(d => d.handle === h);
      const product = products.find(p => p.handle === h);
      return deal && product ? { deal, product } : null;
    })
    .filter(Boolean) as { deal: ClearanceDeal; product: Product }[];

  const trustItems = [
    { icon: '🏷️', title: 'EXCLUSIVE TECH', sub: 'Big brands. Real savings.' },
    { icon: '%',   title: 'UNBEATABLE PRICES', sub: 'Up to 50% off original retail.' },
    { icon: '⏱️', title: 'WHILE STOCKS LAST', sub: "Once it's gone, it's gone." },
  ];

  return (
    <section className="overflow-hidden" style={{ backgroundColor: '#FFF8F5' }}>
      {/* Top red bar */}
      <div style={{ height: 5, backgroundColor: '#FF1F1F' }} />

      {/* ── DESKTOP (md+) ── */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-stretch gap-6" style={{ minHeight: 500 }}>

            {/* LEFT */}
            <div className="relative flex flex-col justify-center py-5 shrink-0 overflow-hidden" style={{ width: 300 }}>
              {/* Ghost watermark */}
              <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                <span className="font-black absolute" style={{ fontSize: '13rem', color: 'rgba(255,31,31,0.055)', right: '-2.5rem', top: '50%', transform: 'translateY(-50%)', letterSpacing: '-0.05em', lineHeight: 1 }}>50%</span>
                <span className="font-black absolute" style={{ fontSize: '8rem', color: 'rgba(255,31,31,0.11)', right: '-0.5rem', top: '50%', transform: 'translateY(-44%) rotate(-7deg)', letterSpacing: '-0.05em', lineHeight: 1 }}>50%</span>
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <p className="text-xs font-black uppercase tracking-[0.25em] flex items-center gap-1.5" style={{ color: '#FF1F1F' }}>🔥 Clearance</p>
                <div>
                  <h2 className="font-black leading-none mb-2" style={{ fontSize: '2.4rem', color: '#111111' }}>One Season Off.</h2>
                  <p className="text-sm" style={{ color: '#6F6A63', lineHeight: 1.6 }}>Premium tech, legendary brands —<br />now at prices that shouldn't exist.</p>
                </div>
                {/* 50% + stamp */}
                <div className="flex items-center gap-3">
                  <div className="flex items-start gap-1 leading-none">
                    <div className="flex flex-col font-black uppercase" style={{ fontSize: '0.65rem', color: '#111111', lineHeight: 1.3, paddingTop: '0.7rem' }}>
                      <span>UP</span><span>TO</span>
                    </div>
                    <span className="font-black" style={{ fontSize: '4.5rem', color: '#FF1F1F', lineHeight: 1 }}>50%</span>
                    <span className="font-black uppercase self-end" style={{ fontSize: '0.85rem', color: '#111111', paddingBottom: '0.4rem' }}>OFF</span>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center rounded-full border-[3px]" style={{ width: 76, height: 76, borderColor: '#111111', transform: 'rotate(-10deg)' }}>
                    <div className="text-center leading-snug">
                      <div className="font-black uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.08em', color: '#111111' }}>LIMITED</div>
                      <div className="font-black uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.08em', color: '#111111' }}>STOCK</div>
                    </div>
                  </div>
                </div>
                <button onClick={onViewAll} className="inline-flex items-center gap-1.5 font-black uppercase tracking-widest px-5 py-2.5 rounded-full border-2 transition-all duration-200 self-start" style={{ fontSize: '0.65rem', borderColor: '#111111', color: '#111111', backgroundColor: 'transparent' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#111111'; (e.currentTarget as HTMLButtonElement).style.color = '#FFF8F5'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#111111'; }}
                >
                  Shop All Clearance →
                </button>
              </div>
            </div>

            {/* RIGHT — 3×2 grid, fills full height */}
            <div className="flex-1 py-5">
              <div className="grid gap-3 h-full" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' }}>
                {homepageDeals.map(({ deal, product }) => {
                  const pct = Math.round(((deal.srp - deal.promo) / deal.srp) * 100);
                  return (
                    <div key={deal.handle} onClick={() => onSelectProduct?.(product)} className="bg-white rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-row">
                      <div className="relative bg-neutral-50 overflow-hidden shrink-0" style={{ width: '45%' }}>
                        <img src={product.images[0]} alt={deal.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'; }} />
                        <span className="absolute top-2 left-2 text-white font-black px-2.5 py-1 rounded-full" style={{ fontSize: '0.75rem', backgroundColor: '#FF1F1F' }}>-{pct}%</span>
                      </div>
                      <div className="flex flex-col justify-center p-3 flex-1 min-w-0">
                        <p className="font-bold uppercase tracking-widest mb-1 truncate" style={{ fontSize: '0.58rem', color: '#6F6A63' }}>{deal.label}</p>
                        <h3 className="font-bold line-clamp-2 mb-2 leading-snug" style={{ fontSize: '0.78rem', color: '#111111' }}>{deal.name}</h3>
                        {isFostMember ? (
                          <>
                            <span className="font-black block" style={{ fontSize: '1rem', color: '#F16C10' }}>{getFostPrice(deal.promo).toLocaleString('vi-VN')}₫</span>
                            <span className="line-through" style={{ fontSize: '0.68rem', color: '#9CA3AF' }}>{deal.promo.toLocaleString('vi-VN')}₫</span>
                          </>
                        ) : (
                          <>
                            <span className="font-black block" style={{ fontSize: '1rem', color: '#111111' }}>{deal.promo.toLocaleString('vi-VN')}₫</span>
                            <span className="line-through" style={{ fontSize: '0.68rem', color: '#9CA3AF' }}>{deal.srp.toLocaleString('vi-VN')}₫</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop trust bar */}
        <div className="border-t" style={{ borderColor: '#EDE8E1' }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-3">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3" style={{ borderRight: i < 2 ? '1px solid #EDE8E1' : 'none' }}>
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-black uppercase tracking-widest leading-tight" style={{ fontSize: '0.6rem', color: '#111111' }}>{item.title}</p>
                    <p className="mt-0.5" style={{ fontSize: '0.65rem', color: '#6F6A63' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE (below md) ── */}
      <div className="block md:hidden">
        {/* Compact info strip */}
        <div className="px-4 pt-5 pb-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1 mb-1" style={{ color: '#FF1F1F' }}>🔥 Clearance</p>
            <h2 className="text-2xl font-black leading-tight" style={{ color: '#111111' }}>One Season Off.</h2>
            <p className="text-xs mt-0.5" style={{ color: '#6F6A63' }}>Premium tech at prices that shouldn't exist.</p>
          </div>
          {/* Compact 50% badge */}
          <div className="shrink-0 ml-4 text-right">
            <div className="flex items-start justify-end gap-0.5 leading-none">
              <span className="font-black text-[0.5rem] uppercase mt-1" style={{ color: '#111111' }}>UP<br/>TO</span>
              <span className="font-black" style={{ fontSize: '3rem', color: '#FF1F1F', lineHeight: 1 }}>50%</span>
            </div>
            <div className="text-[0.5rem] font-black uppercase" style={{ color: '#111111' }}>OFF · LIMITED STOCK</div>
          </div>
        </div>

        {/* Mobile product strip — horizontal scroll, ~2.5 cards visible */}
        <div className="px-4 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {homepageDeals.map(({ deal, product }) => {
              const pct = Math.round(((deal.srp - deal.promo) / deal.srp) * 100);
              return (
                <div key={deal.handle} onClick={() => onSelectProduct?.(product)} className="bg-white rounded-xl overflow-hidden hover:shadow-md cursor-pointer flex-shrink-0" style={{ width: 140 }}>
                  <div className="relative bg-neutral-50 overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <img src={product.images[0]} alt={deal.name} className="w-full h-full object-contain p-3" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'; }} />
                    <span className="absolute top-1.5 left-1.5 text-white font-black px-2 py-0.5 rounded-full" style={{ fontSize: '0.7rem', backgroundColor: '#FF1F1F' }}>-{pct}%</span>
                  </div>
                  <div className="p-2.5">
                    <p className="font-bold uppercase truncate mb-0.5" style={{ fontSize: '0.55rem', color: '#6F6A63' }}>{deal.label}</p>
                    <h3 className="font-bold line-clamp-2 leading-snug mb-1.5" style={{ fontSize: '0.72rem', color: '#111111' }}>{deal.name}</h3>
                    {isFostMember ? (
                      <>
                        <span className="font-black block" style={{ fontSize: '0.9rem', color: '#F16C10' }}>{getFostPrice(deal.promo).toLocaleString('vi-VN')}₫</span>
                        <span className="line-through" style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>{deal.promo.toLocaleString('vi-VN')}₫</span>
                      </>
                    ) : (
                      <>
                        <span className="font-black block" style={{ fontSize: '0.9rem', color: '#111111' }}>{deal.promo.toLocaleString('vi-VN')}₫</span>
                        <span className="line-through" style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>{deal.srp.toLocaleString('vi-VN')}₫</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Peek card to signal more */}
            <div className="flex-shrink-0 flex items-center justify-center rounded-xl cursor-pointer" style={{ width: 100, backgroundColor: '#111111' }} onClick={onViewAll}>
              <div className="text-center px-3">
                <div className="text-white font-black text-lg mb-1">→</div>
                <div className="text-white font-black uppercase text-[0.55rem] tracking-wide leading-tight">Shop All<br/>Clearance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile trust bar — single row */}
        <div className="border-t grid grid-cols-3" style={{ borderColor: '#EDE8E1' }}>
          {trustItems.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center px-2 py-2.5" style={{ borderRight: i < 2 ? '1px solid #EDE8E1' : 'none' }}>
              <span className="text-base mb-1">{item.icon}</span>
              <p className="font-black uppercase leading-tight" style={{ fontSize: '0.5rem', color: '#111111' }}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom red bar */}
      <div style={{ height: 5, backgroundColor: '#FF1F1F' }} />
    </section>
  );
}

export { CLEARANCE_DEALS };
export type { ClearanceDeal };
