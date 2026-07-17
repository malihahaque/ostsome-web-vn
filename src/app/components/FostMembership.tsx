import polaroidFOST from '../../imports/polaroidFOST.png';
import shureFOST from '../../imports/shureFOST.png';
import jetbootsFOST from '../../imports/jetbootsFOST.png';

// Photo collage that follows FostQuickPerks — heading/copy/perks/CTAs live
// there now. Previously this was 3 images absolute-positioned into a
// staggered collage sized for a narrow half-width column (the old
// two-column layout). Now that this section has the full page width to
// itself, that same collage left a large empty gap on the right on desktop.
// Simple 3-across row instead, spanning the full container.
const items = [
  {
    image: polaroidFOST,
    alt: 'Polaroid I-2',
    label: 'Giá Hội Viên',
    title: 'Polaroid I-2 Instant Camera',
    body: (
      <>
        <p className="text-neutral-400 text-xs mb-0.5">Giá Niêm Yết</p>
        <p className="text-neutral-400 text-sm line-through mb-2">15.500.000₫</p>
        <p className="text-[#F16C10] text-[10px] font-bold uppercase tracking-wider mb-0.5">Giá FOST</p>
        <p className="text-[#F16C10] text-2xl font-bold mb-2">14.725.000₫</p>
        <div className="bg-[#F16C10]/10 text-[#F16C10] text-[10px] font-bold px-2 py-1 rounded-full inline-block">
          Tiết kiệm 775.000₫
        </div>
      </>
    ),
  },
  {
    image: shureFOST,
    alt: 'Shure MV7+',
    label: 'Đang Thịnh Hành',
    title: 'Shure MV7+',
    body: (
      <>
        <p className="text-neutral-500 text-xs mb-2">Lựa chọn hàng đầu cho content creator.</p>
        {/* NOTE: price pulled from Header.tsx's notification feed —
            confirm against Shopify Admin before this goes live, same
            caveat as the Polaroid price below. */}
        <p className="text-[#F16C10] text-2xl font-bold">10.100.000₫</p>
      </>
    ),
  },
  {
    image: jetbootsFOST,
    alt: 'RecoveryAir JetBoots',
    label: 'SNAG DEAL',
    title: 'RecoveryAir JetBoots',
    body: (
      <>
        <p className="text-neutral-500 text-xs mb-2">Ưu đãi 2 tuần 1 lần dành cho hội viên.</p>
        {/* NOTE: price pulled from a live ostsome.com.vn scrape — same
            confirm-before-launch caveat as above. */}
        <p className="text-[#F16C10] text-2xl font-bold">24.890.000₫</p>
      </>
    ),
  },
];

export function FostMembership(_props: { onJoin?: () => void; onLearnMore?: () => void; onLogin?: () => void }) {
  return (
    <section className="pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(item => (
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
                <p className="text-[#F16C10] text-[10px] font-bold uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-black text-sm font-bold mb-1">{item.title}</p>
                {item.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}