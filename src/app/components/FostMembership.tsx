import { Crown, Tag, Zap, Users, Gift, Heart } from 'lucide-react';
import polaroidFOST from '../../imports/polaroidFOST.png';
import shureFOST from '../../imports/shureFOST.png';
import jetbootsFOST from '../../imports/jetbootsFOST.png';

const perks = [
  { icon: Tag, title: 'Giảm giá 5% tự động', description: 'Áp dụng ngay khi thanh toán, không cần mã.' },
  { icon: Zap, title: 'SNAG DEAL 2 tuần 1 lần', description: 'Ưu đãi số lượng có hạn dành riêng cho hội viên.' },
  { icon: Gift, title: 'Miễn phí giao hàng', description: 'Cho mọi đơn hàng, không giới hạn giá trị tối thiểu.' },
  { icon: Users, title: 'Cộng đồng FOST Vietnam', description: 'Kết nối và chia sẻ cùng những người yêu công nghệ.' },
  { icon: Crown, title: 'Ưu đãi giới thiệu bạn bè', description: 'Giới thiệu 3 thành viên mới, nhận mã riêng cho bạn.' },
];

export function FostMembership({ onJoin, onLearnMore, onLogin }: { onJoin?: () => void; onLearnMore?: () => void; onLogin?: () => void }) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F16C10]/10 border border-[#F16C10]/30 px-4 py-2 rounded-full mb-6">
              <Crown className="text-[#F16C10]" size={16} />
              <span className="text-[#F16C10] font-semibold text-xs uppercase tracking-wider">Hội Viên FOST</span>
            </div>

            <h2 className="text-[32px] lg:text-5xl font-bold text-black mb-4 leading-tight">
              Là Bạn Của OSTSOME, Nhận Nhiều Hơn.
            </h2>

            <p className="text-[15px] text-neutral-600 mb-8 leading-relaxed">
              Những người biết tin sớm nhất, trả giá thấp hơn, và được ưu tiên trước tất cả mọi người.
            </p>

            <div className="flex flex-col gap-5 mb-8">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div key={perk.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                      <Icon className="text-[#F16C10]" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-black font-bold text-sm mb-0.5">{perk.title}</p>
                      <p className="text-neutral-500 text-sm leading-snug">{perk.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="inline-flex items-center gap-2 border border-neutral-200 px-4 py-2 rounded-full mb-8">
              <Heart className="text-[#F16C10]" size={14} />
              <span className="text-black text-sm font-medium">Miễn phí tham gia. Luôn luôn.</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button onClick={onJoin} className="bg-[#F16C10] hover:bg-[#d65f0e] text-white px-8 py-4 rounded-xl font-bold text-base transition w-full sm:w-auto">
                Tham Gia FOST
              </button>
              <button onClick={onLearnMore} className="border-2 border-neutral-200 hover:border-neutral-400 text-black px-8 py-4 rounded-xl font-semibold text-base transition w-full sm:w-auto">
                Tìm Hiểu Thêm
              </button>
            </div>

            <p className="text-neutral-400 text-xs">
              Đã là hội viên?{' '}
              <button onClick={onLogin} className="text-[#F16C10] font-semibold hover:underline">Đăng nhập</button>{' '}
              để nhận ưu đãi của bạn.
            </p>
          </div>

          {/* RIGHT — 3 trendy products, no bottom flat-lay */}
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
      </div>
    </section>
  );
}