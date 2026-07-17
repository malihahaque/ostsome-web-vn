import { getFostPrice } from '../data/pricing';
import polaroidFOST from '../../imports/polaroidFOST.png';
import shureFOST from '../../imports/shureFOST.png';
import jetbootsFOST from '../../imports/jetbootsFOST.png';

// Photo collage that follows FostQuickPerks — heading/copy/perks/CTAs live
// there now. All three cards use the same "Giá Hội Viên" pattern: list
// price struck through, FOST price via getFostPrice() (not hardcoded —
// stays correct if the FOST discount logic ever changes), savings badge.
//
// NOTE: listPrice values below are pulled from elsewhere in the codebase
// (Shure MV7+ from Header.tsx's notification feed, RecoveryAir JetBoots
// from a live ostsome.com.vn scrape, Polaroid from the original design) —
// confirm against Shopify Admin before this goes live, since a hardcoded
// price here won't update automatically if the real product price changes.
const items = [
  {
    image: polaroidFOST,
    alt: 'Polaroid I-2',
    label: 'Giá Hội Viên',
    title: 'Polaroid I-2 Instant Camera',
    listPrice: 15500000,
  },
  {
    image: shureFOST,
    alt: 'Shure MV7+',
    label: 'Đang Thịnh Hành',
    title: 'Shure MV7+',
    listPrice: 10100000,
  },
  {
    image: jetbootsFOST,
    alt: 'RecoveryAir JetBoots',
    label: 'SNAG DEAL',
    title: 'RecoveryAir JetBoots',
    listPrice: 24890000,
  },
];

export function FostMembership(_props: { onJoin?: () => void; onLearnMore?: () => void; onLogin?: () => void }) {
  return (
    <section className="pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(item => {
            const fostPrice = getFostPrice(item.listPrice);
            const savings = item.listPrice - fostPrice;
            return (
              <div key={item.title} className="flex flex-col">
                <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-64 md:h-72 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-4 flex-1">
                  <p className="text-[#F16C10] text-[10px] font-bold uppercase tracking-wider mb-2">{item.label}</p>
                  <p className="text-black text-sm font-bold mb-3 leading-snug">{item.title}</p>

                  <p className="text-neutral-400 text-[10px] mb-0.5">Giá Niêm Yết</p>
                  <p className="text-neutral-400 text-sm line-through mb-2">{item.listPrice.toLocaleString('vi-VN')}₫</p>

                  <p className="text-[#F16C10] text-[9px] font-bold uppercase tracking-wider mb-0.5">Giá FOST</p>
                  <p className="text-[#F16C10] text-2xl font-bold mb-2">{fostPrice.toLocaleString('vi-VN')}₫</p>

                  <div className="bg-[#F16C10]/10 text-[#F16C10] text-[10px] font-bold px-2 py-1 rounded-full inline-block">
                    Tiết kiệm {savings.toLocaleString('vi-VN')}₫
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