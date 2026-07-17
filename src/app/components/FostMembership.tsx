import polaroidFOST from '../../imports/polaroidFOST.png';
import shureFOST from '../../imports/shureFOST.png';
import jetbootsFOST from '../../imports/jetbootsFOST.png';

// Heading, intro copy, perks list, and join/login CTAs used to live here —
// they now live in FostQuickPerks.tsx, which sits directly above this
// component on the home page. Keeping both would repeat the same heading
// and perk list twice in a row, so this component is now just the photo
// collage, flowing straight on from FostQuickPerks with no section break
// in between (no top padding, no heading of its own).
export function FostMembership(_props: { onJoin?: () => void; onLearnMore?: () => void; onLogin?: () => void }) {
  return (
    <section className="pb-20 bg-white relative overflow-hidden">
      <div className="max-w-md mx-auto px-4">
        <div className="relative" style={{ height: '620px' }}>

          {/* Polaroid I-2 — top left photo */}
          <div className="absolute top-0 left-0 rounded-2xl overflow-hidden shadow-lg" style={{ width: '50%', zIndex: 1 }}>
            <img
              src={polaroidFOST}
              alt="Polaroid I-2"
              className="w-full object-cover object-center"
              style={{ height: '240px' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Member Pricing card — top right, tied to Polaroid I-2 */}
          <div className="absolute top-0 right-0 bg-white border border-neutral-200 rounded-2xl shadow-md p-4" style={{ width: '46%', zIndex: 2 }}>
            <p className="text-[#F16C10] text-[9px] font-bold uppercase tracking-widest mb-2">Giá Hội Viên</p>
            <p className="text-black text-xs font-bold mb-3 leading-snug">Polaroid I-2 Instant Camera</p>
            <p className="text-neutral-400 text-[10px] mb-0.5">Giá Niêm Yết</p>
            <p className="text-neutral-400 text-sm line-through mb-2">15.500.000₫</p>
            <p className="text-[#F16C10] text-[9px] font-bold uppercase tracking-wider mb-0.5">Giá FOST</p>
            <p className="text-[#F16C10] text-2xl font-bold mb-2">14.725.000₫</p>
            <div className="bg-[#F16C10]/10 text-[#F16C10] text-[9px] font-bold px-2 py-1 rounded-full inline-block">
              Tiết kiệm 775.000₫
            </div>
          </div>

          {/* Shure MV7+ — mid-left photo */}
          <div className="absolute rounded-2xl overflow-hidden shadow-lg" style={{ top: '260px', left: '0', width: '50%', zIndex: 3 }}>
            <img
              src={shureFOST}
              alt="Shure MV7+"
              className="w-full object-cover"
              style={{ height: '200px' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Trending card — tied to Shure */}
          <div className="absolute bg-white border border-neutral-200 rounded-2xl shadow-md p-3" style={{ top: '468px', left: '0', width: '48%', zIndex: 4 }}>
            <p className="text-[#F16C10] text-[9px] font-bold uppercase tracking-wider mb-1">Đang Thịnh Hành</p>
            <p className="text-black text-xs font-bold">Shure MV7+</p>
            <p className="text-neutral-500 text-[10px]">Lựa chọn hàng đầu cho content creator.</p>
          </div>

          {/* RecoveryAir JetBoots — bottom right photo */}
          <div className="absolute rounded-2xl overflow-hidden shadow-lg" style={{ top: '310px', right: '0', width: '48%', zIndex: 3 }}>
            <img
              src={jetbootsFOST}
              alt="RecoveryAir JetBoots"
              className="w-full object-cover"
              style={{ height: '200px' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* SNAG DEAL card — tied to JetBoots */}
          <div className="absolute bg-white border border-neutral-200 rounded-2xl shadow-md p-3" style={{ top: '518px', right: '0', width: '48%', zIndex: 4 }}>
            <p className="text-[#F16C10] text-[9px] font-bold uppercase tracking-wider mb-1">SNAG DEAL</p>
            <p className="text-black text-xs font-bold">RecoveryAir JetBoots</p>
            <p className="text-neutral-500 text-[10px]">Ưu đãi 2 tuần 1 lần dành cho hội viên.</p>
          </div>

        </div>
      </div>
    </section>
  );
}