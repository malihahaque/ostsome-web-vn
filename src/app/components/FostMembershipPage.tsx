import { Crown, Tag, Zap, Users, Gift, CalendarHeart, Truck, Heart, ChevronLeft, LogIn } from 'lucide-react';
import polaroidFOST from '../../imports/polaroidFOST.png';
import shureFOST from '../../imports/shureFOST.png';
import jetbootsFOST from '../../imports/jetbootsFOST.png';

const perks = [
  {
    icon: Tag,
    title: 'Giảm giá 5% tự động',
    description: 'Đăng nhập vào tài khoản FOST và giá thành viên sẽ tự động áp dụng khi thanh toán trên toàn bộ sản phẩm — không cần mã, không cần chờ sale.',
  },
  {
    icon: Truck,
    title: 'Miễn phí giao hàng',
    description: 'Thành viên FOST được miễn phí giao hàng cho mọi đơn hàng — không yêu cầu giá trị đơn hàng tối thiểu.',
  },
  {
    icon: Zap,
    title: 'SNAG DEAL 2 tuần 1 lần',
    description: 'Tham dự chương trình giảm giá đặc biệt, số lượng có hạn, chỉ dành riêng cho hội viên FOST, diễn ra định kỳ 2 tuần 1 lần.',
  },
  {
    icon: Gift,
    title: 'Ưu đãi khi giới thiệu bạn bè',
    description: 'Giới thiệu tối thiểu 3 thành viên mới tham gia, bạn sẽ nhận được mã khuyến mãi riêng dành cho mình.',
  },
  {
    icon: Users,
    title: 'Cộng đồng FOST Community Vietnam',
    description: 'Tham gia cộng đồng để trao đổi kinh nghiệm sử dụng sản phẩm và kết nối với những người yêu công nghệ khác.',
  },
  {
    icon: CalendarHeart,
    title: 'Thông báo sản phẩm mới sớm nhất',
    description: 'Nhận email thông báo ngay khi có sản phẩm mới về, để bạn luôn là người biết trước.',
  },
];

const faqs = [
  {
    q: 'Làm sao để nhận giá FOST trên sản phẩm?',
    a: 'Chỉ cần đăng nhập vào tài khoản FOST trước khi mua sắm. Giá thành viên sẽ tự động hiển thị trên trang sản phẩm, giỏ hàng và khi thanh toán — không cần nhập thêm gì cả.',
  },
  {
    q: 'Miễn phí giao hàng có thật sự không giới hạn giá trị đơn hàng?',
    a: 'Đúng vậy — thành viên FOST được miễn phí giao hàng cho mọi đơn hàng, không yêu cầu giá trị tối thiểu.',
  },
  {
    q: 'Tham gia FOST có mất phí không?',
    a: 'Không. Đăng ký trở thành hội viên FOST hoàn toàn miễn phí, không có phí ẩn.',
  },
  {
    q: 'Tôi đã là hội viên nhưng không thấy giá FOST — phải làm sao?',
    a: 'Hãy chắc chắn bạn đã đăng nhập vào tài khoản. Nếu vẫn không thấy giá FOST sau khi đăng nhập, hãy thử tải lại trang hoặc liên hệ với đội ngũ hỗ trợ của chúng tôi.',
  },
];

type FostMembershipPageProps = {
  onBack?: () => void;
  onJoin?: () => void;
  onLogin?: () => void;
};

export function FostMembershipPage({ onBack, onJoin, onLogin }: FostMembershipPageProps) {
  return (
    <section className="bg-white">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#F16C10] transition-colors"
        >
          <ChevronLeft size={16} />
          Quay lại
        </button>
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F16C10]/10 border border-[#F16C10]/30 px-4 py-2 rounded-full mb-6">
          <Crown className="text-[#F16C10]" size={16} />
          <span className="text-[#F16C10] font-semibold text-xs uppercase tracking-wider">Hội Viên FOST</span>
        </div>
        <h1 className="text-[36px] lg:text-6xl font-bold text-black mb-5 leading-tight">
          Là Bạn Của OSTSOME, Nhận Nhiều Hơn.
        </h1>
        <p className="text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Những người biết tin sớm nhất, trả giá thấp hơn, và được ưu tiên trước tất cả mọi người.
          FOST (Friends of OSTSOME) là hội viên miễn phí của OSTSOME — chỉ cần đăng nhập, mọi ưu đãi sẽ tự động áp dụng.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-5">
          <button
            onClick={onJoin}
            className="bg-[#F16C10] hover:bg-[#d65f0e] text-white px-8 py-4 rounded-xl font-bold text-base transition w-full sm:w-auto"
          >
            Tham Gia FOST — Miễn Phí
          </button>
          <button
            onClick={onLogin}
            className="border-2 border-neutral-200 hover:border-neutral-400 text-black px-8 py-4 rounded-xl font-semibold text-base transition w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <LogIn size={16} />
            Đăng Nhập
          </button>
        </div>
        <div className="inline-flex items-center gap-2 border border-neutral-200 px-4 py-2 rounded-full">
          <Heart className="text-[#F16C10]" size={14} />
          <span className="text-black text-sm font-medium">Miễn phí tham gia. Luôn luôn.</span>
        </div>
      </div>

      {/* Pricing highlight strip */}
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[#F16C10] text-xs font-bold uppercase tracking-widest mb-2">Giá Hội Viên, Tự Động</p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 leading-snug">
              Chỉ cần đăng nhập, mọi mức giá trên website sẽ tự động tốt hơn.
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Giá FOST hiển thị ngay khi bạn đăng nhập — trên trang sản phẩm, trong giỏ hàng, và khi thanh toán.
              Không cần mã khuyến mãi, không cần chờ đợt sale, không có điều khoản ẩn.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-black max-w-sm w-full">
            <p className="text-[#F16C10] text-[10px] font-bold uppercase tracking-widest mb-2">Giá Hội Viên</p>
            <p className="text-black text-sm font-bold mb-3 leading-snug">Polaroid I-2 Instant Camera</p>
            <p className="text-neutral-400 text-[11px] mb-0.5">Giá Niêm Yết</p>
            <p className="text-neutral-400 text-base line-through mb-2">15.500.000₫</p>
            <p className="text-[#F16C10] text-[10px] font-bold uppercase tracking-wider mb-0.5">Giá FOST</p>
            <p className="text-[#F16C10] text-3xl font-bold mb-3">14.725.000₫</p>
            <div className="bg-[#F16C10]/10 text-[#F16C10] text-xs font-bold px-3 py-1.5 rounded-full inline-block">
              Tiết kiệm 775.000₫
            </div>
          </div>
        </div>
      </div>

      {/* Full perks grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-black text-center mb-2">Những gì bạn nhận được khi là hội viên</h2>
        <p className="text-neutral-500 text-center text-sm mb-12">Hoàn toàn miễn phí. Tự động áp dụng ngay khi bạn đăng nhập.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div key={perk.title} className="border border-neutral-100 rounded-2xl p-6 hover:border-[#F16C10]/40 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#F16C10]/10 flex items-center justify-center mb-4">
                  <Icon className="text-[#F16C10]" size={22} strokeWidth={1.5} />
                </div>
                <p className="text-black font-bold text-base mb-1.5">{perk.title}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{perk.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lifestyle photo strip — same 3 products as the homepage FOST section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl overflow-hidden shadow-sm" style={{ height: '240px' }}>
            <img src={polaroidFOST} alt="Polaroid I-2" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm" style={{ height: '240px' }}>
            <img src={shureFOST} alt="Shure MV7+" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm" style={{ height: '240px' }}>
            <img src={jetbootsFOST} alt="RecoveryAir JetBoots" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-neutral-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-black text-center mb-10">Câu hỏi thường gặp</h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-neutral-100 rounded-2xl p-6">
                <p className="text-black font-bold text-sm mb-2">{faq.q}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-black mb-3">Sẵn sàng trả giá thấp hơn và biết trước mọi thứ?</h2>
        <p className="text-neutral-500 text-sm mb-8">Tham gia FOST chỉ trong vài giây. Không phí, không điều khoản ẩn — chỉ có ưu đãi tốt hơn.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={onJoin}
            className="bg-[#F16C10] hover:bg-[#d65f0e] text-white px-8 py-4 rounded-xl font-bold text-base transition w-full sm:w-auto"
          >
            Tham Gia FOST — Miễn Phí
          </button>
          <button
            onClick={onLogin}
            className="border-2 border-neutral-200 hover:border-neutral-400 text-black px-8 py-4 rounded-xl font-semibold text-base transition w-full sm:w-auto"
          >
            Đã là hội viên? Đăng nhập
          </button>
        </div>
      </div>
    </section>
  );
}