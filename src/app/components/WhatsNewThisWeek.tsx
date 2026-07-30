import { Star, Sparkles, Zap } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../data/products';
import { useAuth } from './AuthContext';
import { getFostPrice } from '../data/pricing';
import satechiImg from '../../imports/Satechi charging dock.png';

// Real backup logic: only 2 of the last 3 handles tried actually existed in
// the live VN catalog (even the Shure mic — despite being used elsewhere on
// the site — doesn't resolve here). Rather than hardcoding exactly 3 handles
// again and hoping they all still exist, this is now a POOL of candidates,
// ordered roughly by confidence (Satechi charger and Skullcandy headphones
// are confirmed showing live right now; the rest are handles used elsewhere
// on the site but not individually re-verified against this exact catalog).
// The section always renders with whichever 3 candidates actually resolve,
// in pool order — so if any one of these goes out of stock or gets its
// handle changed in Shopify, the next candidate quietly fills its slot
// instead of leaving a gap. Slot labels (Vừa Ra Mắt / Hàng Mới Về / Nhân
// Viên Chọn) are tied to POSITION, not to a specific product, precisely so
// this substitution can happen without a label ending up on the wrong item.
const CANDIDATE_HANDLES = [
  'satechi-165w-usb-c-4-port-pd-gan-charger', // confirmed live
  'skullcandy-crusher-anc-2',                 // confirmed live
  'tai-nghe-bluetooth-skullcandy-method-360-anc-bảo-hanh-1-nam-chống-ồn-pin-40-giờ-chống-ồn-chủ-dộng', // "confirmed real handle" per Hero.tsx
  'looki-l1-ai-multimodal-wearable-thiết-bị-deo-ai-ghi-hinh-rảnh-tay-32g-quay-video-full-hd-1080p-3-micro-ai-tạo-vlog-comics-bộ-nhớ-32gb-bảo-mật-quyền-rieng-tư-mau-trắng', // "confirmed real handle" per Hero.tsx
  'therabody-theracup',            // used live in ShoppableSetup.tsx
  'sung-massage-theragun-relief',  // used live in ShoppableSetup.tsx
  'satechi-m1-wireless-mouse',     // used live in LaunchExclusive.tsx
];

const SLOT_META = [
  { label: 'Vừa Ra Mắt', labelIcon: Sparkles, labelColor: 'bg-cyan-500' },
  { label: 'Hàng Mới Về', labelIcon: Zap, labelColor: 'bg-[#F16C10]' },
  { label: 'Nhân Viên Chọn', labelIcon: Star, labelColor: 'bg-amber-500' },
];

// Maps a handle to its premium hero image, falling back to the live
// Shopify product image for anything not explicitly listed here. These
// premium images are full-bleed lifestyle photography (people, scenes,
// desks) rather than product-on-white shots, so they need object-cover
// with no padding instead of the object-contain+padding treatment used
// for the Shopify fallback images. Only the Satechi charger has one of
// these on hand right now — everything else in the pool falls back to
// its regular Shopify product photo, which is a fine look, just not the
// lifestyle-photo treatment.
const PREMIUM_IMAGES: Record<string, string> = {
  'satechi-165w-usb-c-4-port-pd-gan-charger': satechiImg,
};

function getHeroImage(handle: string, fallback: string): string {
  return PREMIUM_IMAGES[handle] ?? fallback;
}

function isLifestylePhoto(handle: string): boolean {
  return handle in PREMIUM_IMAGES;
}

type FeaturedProduct = Product & { label: string; labelIcon: React.ElementType; labelColor: string };

export function WhatsNewThisWeek({ onShopAll, onSelectProduct }: { onShopAll?: () => void; onSelectProduct?: (p: Product) => void }) {
  const { products } = useProducts();
  const { user } = useAuth();
  const isFostMember = Boolean(user);

  const resolved = CANDIDATE_HANDLES
    .map(handle => products.find(p => p.handle === handle))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 3);

  const featuredProducts: FeaturedProduct[] = resolved.map((p, i) => ({ ...p, ...SLOT_META[i] }));

  // Show skeleton cards while loading
  if (featuredProducts.length === 0) return (
    <section className="py-8 md:py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-[26px] md:text-4xl font-bold text-black mb-2 uppercase">Bán Chạy Nhất</h2>
            <p className="text-[14px] md:text-base text-neutral-600">Chúng tôi tìm trước. Bạn nhận trước.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl overflow-hidden border border-neutral-100 animate-pulse">
              <div className="aspect-square bg-neutral-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-neutral-100 rounded w-1/3" />
                <div className="h-4 bg-neutral-100 rounded w-3/4" />
                <div className="h-5 bg-neutral-100 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <section className="py-8 md:py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-10 flex items-end justify-between">
          <div className="text-left md:text-center md:flex-1">
            <h2 className="text-[26px] md:text-4xl font-bold text-black mb-2 uppercase">Bán Chạy Nhất</h2>
            <p className="text-[14px] md:text-base text-neutral-600">Chúng tôi tìm trước. Bạn nhận trước.</p>
          </div>
          <button
            onClick={onShopAll}
            className="shrink-0 ml-4 text-sm font-semibold text-[#F16C10] hover:text-black transition-colors whitespace-nowrap"
          >
            Xem Tất Cả →
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {featuredProducts.map((product, i) => {
            const LabelIcon = product.labelIcon;
            const imgSrc = getHeroImage(product.handle, product.images[0]);
            const isLifestyle = isLifestylePhoto(product.handle);
            const isThird = i === 2;
            return (
              <div
                key={product.handle}
                onClick={() => onSelectProduct?.(product)}
                className={`bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-xl transition group cursor-pointer ${isThird ? 'col-span-2 lg:col-span-1' : ''}`}
              >
                <div className={`relative bg-neutral-50 overflow-hidden ${isThird ? 'aspect-[2/1] lg:aspect-[4/3]' : 'aspect-square md:aspect-[4/3]'}`}>
                  <img
                    src={imgSrc}
                    alt={product.title}
                    className={`w-full h-full group-hover:scale-105 transition duration-500 ${isLifestyle ? 'object-cover' : 'object-contain p-4 md:p-6'}`}
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'; }}
                  />
                  <div className={`absolute top-2 left-2 md:top-4 md:left-4 ${product.labelColor} text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1 md:gap-1.5`}>
                    <LabelIcon size={10} />
                    {product.label}
                  </div>
                </div>
                <div className="p-3 md:p-5">
                  <p className="text-[9px] md:text-[10px] font-semibold text-[#F16C10] uppercase tracking-widest mb-1">{product.vendor}</p>
                  <h3 className="text-sm md:text-base font-bold text-black mb-2 md:mb-3 line-clamp-1">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    {isFostMember ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-base md:text-xl font-bold text-[#F16C10]">{getFostPrice(product.price).toLocaleString('vi-VN')}₫</span>
                        <span className="text-[9px] md:text-[10px] text-neutral-400 line-through">{product.price.toLocaleString('vi-VN')}₫</span>
                      </div>
                    ) : (
                      <span className="text-base md:text-xl font-bold text-black">{product.price.toLocaleString('vi-VN')}₫</span>
                    )}
                    <button className="text-[#F16C10] hover:text-black font-medium text-xs md:text-sm transition-colors">Xem →</button>
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