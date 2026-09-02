import { ChevronLeft, Sparkles, Store, Phone } from 'lucide-react';
import { ContactAndTrust } from './ContactAndTrust';

type PartnershipPageProps = {
  onBack: () => void;
};

const kocActivities = [
  'Seeding sản phẩm và xây dựng độ nhận diện thương hiệu.',
  'Hợp tác review, trải nghiệm và sáng tạo nội dung.',
  'Campaign KOC/KOL trên TikTok, Facebook, Instagram, YouTube và các nền tảng phù hợp.',
  'Chương trình Affiliate và các hoạt động thúc đẩy doanh số.',
  'Hợp tác dài hạn nhằm xây dựng hình ảnh và cộng đồng khách hàng cho thương hiệu.',
];

const distributorSupport = [
  'Chính sách giá và chiết khấu dành cho đại lý.',
  'Tư vấn sản phẩm và hỗ trợ thông tin bán hàng.',
  'Hỗ trợ hình ảnh, nội dung và tài liệu marketing.',
  'Chính sách hỗ trợ truyền thông và phát triển thương hiệu tùy theo từng chương trình.',
  'Đồng hành trong quá trình phát triển doanh số và mở rộng thị trường.',
];

export function PartnershipPage({ onBack }: PartnershipPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#F16C10] transition-colors"
        >
          <ChevronLeft size={16} />
          Quay Lại Trang Chủ
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16 md:pb-20">
        {/* Header */}
        <span className="text-xs font-bold text-[#F16C10] uppercase tracking-widest mb-3 block">
          Hợp Tác
        </span>
        <h1 className="text-2xl md:text-4xl font-bold text-black leading-tight mb-4">
          Liên Hệ Hợp Tác Bán Hàng
        </h1>
        <div className="w-12 h-1 bg-[#F16C10] rounded-full mb-8" />

        <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-12">
          Chúng tôi luôn sẵn sàng đồng hành cùng các đối tác, nhà bán lẻ và nhà sáng tạo nội dung
          để mở rộng thị trường và phát triển thương hiệu bền vững.
        </p>

        {/* 1. KOC/KOL */}
        <section className="mb-12">
          <div className="flex items-start gap-3 mb-4">
            <span className="w-9 h-9 shrink-0 rounded-full bg-[#F16C10]/10 flex items-center justify-center">
              <Sparkles className="text-[#F16C10]" size={17} strokeWidth={1.75} />
            </span>
            <h2 className="text-lg font-bold text-black leading-snug">
              1. Hợp tác phát triển thương hiệu – KOC / KOL trải nghiệm sản phẩm
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-4">
            Chúng tôi tìm kiếm các đối tác KOC, KOL, Creator và đơn vị truyền thông để cùng triển
            khai các hoạt động:
          </p>
          <ul className="flex flex-col gap-2.5">
            {kocActivities.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-neutral-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F16C10] shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 2. Đại lý / Nhà phân phối */}
        <section className="mb-12">
          <div className="flex items-start gap-3 mb-4">
            <span className="w-9 h-9 shrink-0 rounded-full bg-[#F16C10]/10 flex items-center justify-center">
              <Store className="text-[#F16C10]" size={17} strokeWidth={1.75} />
            </span>
            <h2 className="text-lg font-bold text-black leading-snug">
              2. Hợp tác mở đại lý / Nhà phân phối
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-4">
            Chúng tôi chào đón các đối tác có nhu cầu trở thành Đại lý hoặc Nhà phân phối chính
            thức các thương hiệu mà chúng tôi đang phân phối tại Việt Nam.
          </p>
          <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-3">
            Đối tác sẽ được hỗ trợ
          </h3>
          <ul className="flex flex-col gap-2.5">
            {distributorSupport.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-neutral-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F16C10] shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Liên hệ hợp tác */}
        <div className="bg-gradient-to-br from-[#FDF3EA] to-white rounded-3xl p-6 md:p-10">
          <h2 className="text-lg md:text-xl font-bold text-black mb-2">Liên hệ hợp tác</h2>
          <p className="text-sm text-neutral-600 leading-relaxed mb-5">
            Nếu bạn quan tâm đến cơ hội hợp tác KOC/KOL, Affiliate, mở đại lý hoặc phân phối sản
            phẩm, vui lòng liên hệ hotline bên dưới. Đội ngũ của chúng tôi sẽ liên hệ và tư vấn
            chính sách hợp tác phù hợp.
          </p>
          <a
            href="tel:0286676501"
            className="inline-flex items-center gap-2 bg-[#F16C10] hover:bg-[#d9610e] text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors"
          >
            <Phone size={16} />
            028 66765010
          </a>
        </div>
      </div>

      <ContactAndTrust />
    </div>
  );
}
