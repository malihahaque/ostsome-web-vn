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

// Compact, centered FOST teaser — distinct from the larger two-column
// FostMembership.tsx (which has the product photo collage). This is the
// short version the VN team wants placed directly above it.
export function FostQuickPerks({ onJoin, onLogin }: FostQuickPerksProps) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F16C10]/10 border border-[#F16C10]/30 px-4 py-2 rounded-full mb-5">
          <Crown className="text-[#F16C10]" size={16} />
          <span className="text-[#F16C10] font-semibold text-xs uppercase tracking-wider">Hội Viên FOST</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-black mb-8 leading-tight">
          OSTSOME, <span className="text-[#F16C10]">Nhận Nhiều Hơn.</span>
        </h2>

        <div className="flex justify-center gap-6 md:gap-10 mb-8">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div key={perk.title} className="flex flex-col items-center gap-2 w-16 md:w-20">
                <Icon className="text-[#F16C10]" size={26} strokeWidth={1.5} />
                <div className="leading-tight">
                  <p className="text-black font-bold text-xs md:text-sm">{perk.title}</p>
                  <p className="text-neutral-500 text-[11px] md:text-xs">{perk.subtitle}</p>
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
