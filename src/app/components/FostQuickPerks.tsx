import { Crown, Tag, Zap, Truck, Users, Heart } from 'lucide-react';
import fostLadyImg from '../../imports/FOST lady.png';

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

// Now the ONLY homepage FOST section — previously this sat directly above
// FostMembership's separate static banner image, which duplicated this
// same heading/copy baked into a flat image (with much smaller, non-
// resizable text). Per Mals/VN team: keep this version since its text is
// real HTML (properly sized, responsive), and fold in just the lady photo
// from that old banner instead of keeping both sections. FostMembership.tsx
// is no longer rendered anywhere — safe to delete outright once confirmed
// nothing else references it.
export function FostQuickPerks({ onJoin, onLogin }: FostQuickPerksProps) {
  return (
    <section className="pt-10 pb-6 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text column */}
          <div className="text-center md:text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-[#F16C10]/10 border border-[#F16C10]/30 px-4 py-2 rounded-full mb-5">
              <Crown className="text-[#F16C10]" size={16} />
              <span className="text-[#F16C10] font-semibold text-xs uppercase tracking-wider">Hội Viên FOST</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-black mb-8 leading-tight">
              OSTSOME, <span className="text-[#F16C10]">Nhận Nhiều Hơn.</span>
            </h2>

            <div className="grid grid-cols-3 sm:flex sm:justify-center md:justify-start gap-y-6 sm:gap-x-10 md:gap-x-8 mb-8">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div key={perk.title} className="flex flex-col items-center md:items-start gap-3">
                    <Icon className="text-[#F16C10]" size={36} strokeWidth={1.5} />
                    <div className="leading-tight text-center md:text-left">
                      <p className="text-black font-bold text-xs md:text-sm">{perk.title}</p>
                      <p className="text-neutral-500 text-[10px] md:text-xs">{perk.subtitle}</p>
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

          {/* Photo column */}
          <div className="order-1 md:order-2">
            <img
              src={fostLadyImg}
              alt="Thành viên FOST"
              className="w-full h-auto rounded-2xl object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
