import { Crown, Tag, Zap, Truck, Users, Heart } from 'lucide-react';

const perks = [
  { icon: Tag, title: 'Giảm 5%', subtitle: 'tự động' },
  { icon: Zap, title: 'SNAG DEAL', subtitle: '2 tuần 1 lần' },
  { icon: Truck, title: 'Miễn phí', subtitle: 'giao hàng' },
  { icon: Users, title: 'Cộng đồng', subtitle: 'FOST Vietnam' },
  { icon: Crown, title: 'Ưu đãi', subtitle: 'giới thiệu bạn bè' },
];

type FostQuickPerksProps = {
  onJoin?: () => void;
  onLogin?: () => void;
};

// Compact, full-width FOST teaser that sits directly above FostMembership's
// photo collage — no separate heading of its own beyond this one, so the
// two sections read as one continuous block rather than two stacked ones.
export function FostQuickPerks({ onJoin, onLogin }: FostQuickPerksProps) {
  return (
    <section className="pt-14 pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F16C10]/10 border border-[#F16C10]/30 px-4 py-2 rounded-full mb-5">
          <Crown className="text-[#F16C10]" size={16} />
          <span className="text-[#F16C10] font-semibold text-xs uppercase tracking-wider">Hội Viên FOST</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-black mb-10 leading-tight">
          OSTSOME, <span className="text-[#F16C10]">Nhận Nhiều Hơn.</span>
        </h2>

        <div className="flex justify-between md:justify-center md:gap-20 max-w-4xl mx-auto mb-8">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div key={perk.title} className="flex flex-col items-center gap-3 flex-1 md:flex-none md:w-24">
                <Icon className="text-[#F16C10]" size={40} strokeWidth={1.5} />
                <div className="leading-tight">
                  <p className="text-black font-bold text-xs md:text-base">{perk.title}</p>
                  <p className="text-neutral-500 text-[10px] md:text-sm">{perk.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onJoin}
          className="inline-flex items-center gap-2 border border-neutral-200 hover:border-[#F16C10] px-5 py-2.5 rounded-full mb-5 transition-colors"
        >
          <Heart className="text-[#F16C10]" size={16} />
          <span className="text-black text-sm font-medium">Miễn phí tham gia. Luôn luôn.</span>
        </button>

        <p className="text-neutral-400 text-sm">
          Đã là hội viên?{' '}
          <button onClick={onLogin} className="text-[#F16C10] font-semibold hover:underline">Đăng nhập</button>{' '}
          để nhận ưu đãi của bạn.
        </p>
      </div>
    </section>
  );
}
