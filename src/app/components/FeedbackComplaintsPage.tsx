import { ChevronLeft, Phone, Mail, MessageCircle, Clock, Package, ShoppingBag, Headphones, ShieldCheck, Truck, HelpCircle } from 'lucide-react';
import { ContactAndTrust } from './ContactAndTrust';

type FeedbackComplaintsPageProps = {
  onBack: () => void;
};

const feedbackCategories = [
  { icon: Package, title: 'Sản phẩm', desc: 'Chất lượng, tình trạng sản phẩm hoặc thông tin sản phẩm.' },
  { icon: ShoppingBag, title: 'Đơn hàng', desc: 'Đặt hàng, thanh toán, giao nhận hoặc tình trạng đơn hàng.' },
  { icon: Headphones, title: 'Dịch vụ khách hàng', desc: 'Tư vấn, hỗ trợ và thái độ phục vụ.' },
  { icon: ShieldCheck, title: 'Bảo hành & đổi trả', desc: 'Quá trình tiếp nhận và xử lý bảo hành, đổi trả.' },
  { icon: Truck, title: 'Giao hàng', desc: 'Thời gian giao hàng, tình trạng kiện hàng hoặc các vấn đề phát sinh trong quá trình vận chuyển.' },
  { icon: HelpCircle, title: 'Các vấn đề khác', desc: 'Bất kỳ trải nghiệm nào mà bạn cho rằng OSTSOME cần được biết và cải thiện.' },
];

const contactChannels = [
  { icon: Phone, label: 'Hotline', value: '028 6676 5010', href: 'tel:0286676501' },
  { icon: Mail, label: 'Email', value: 'cs@ostsome.com.vn', href: 'mailto:cs@ostsome.com.vn' },
  { icon: MessageCircle, label: 'Zalo OSTSOME', value: '0901885615', href: 'https://zalo.me/0901885615' },
];

const processSteps = [
  { num: '01', title: 'Tiếp nhận', desc: 'OSTSOME tiếp nhận thông tin và xác nhận yêu cầu của khách hàng.' },
  { num: '02', title: 'Kiểm tra', desc: 'Đội ngũ phụ trách kiểm tra thông tin đơn hàng, sản phẩm và các vấn đề liên quan.' },
  { num: '03', title: 'Phản hồi', desc: 'Chúng tôi liên hệ với khách hàng để trao đổi về kết quả kiểm tra và hướng xử lý.' },
  { num: '04', title: 'Giải quyết', desc: 'Các vấn đề được xử lý theo chính sách bán hàng, bảo hành, đổi trả và quy định hiện hành của OSTSOME.' },
  { num: '05', title: 'Cải thiện', desc: 'Những phản hồi phù hợp sẽ được ghi nhận để cải thiện sản phẩm và chất lượng dịch vụ trong tương lai.' },
];

export function FeedbackComplaintsPage({ onBack }: FeedbackComplaintsPageProps) {
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
          Góp Ý & Khiếu Nại
        </span>
        <h1 className="text-2xl md:text-4xl font-bold text-black leading-tight mb-4">
          Chúng tôi luôn lắng nghe ý kiến của bạn
        </h1>
        <div className="w-12 h-1 bg-[#F16C10] rounded-full mb-8" />

        <div className="flex flex-col gap-5 text-sm md:text-base text-neutral-600 leading-relaxed mb-10">
          <p>
            Tại OSTSOME, trải nghiệm và sự hài lòng của khách hàng luôn là một trong những ưu tiên
            hàng đầu của chúng tôi.
          </p>
          <p>
            Nếu bạn có góp ý, phản hồi hoặc khiếu nại liên quan đến sản phẩm, đơn hàng, dịch vụ,
            giao nhận, bảo hành hoặc quá trình mua sắm tại OSTSOME, vui lòng liên hệ với chúng tôi.
          </p>
          <p>
            Mọi ý kiến của khách hàng đều được tiếp nhận và xem xét nghiêm túc nhằm không ngừng cải
            thiện chất lượng sản phẩm và dịch vụ.
          </p>
        </div>

        {/* Feedback categories */}
        <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-4">
          Bạn có thể gửi phản hồi về
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {feedbackCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="flex items-start gap-3 bg-neutral-50 border border-neutral-100 rounded-xl p-4"
              >
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#F16C10]/10 flex items-center justify-center">
                  <Icon className="text-[#F16C10]" size={17} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-black mb-0.5">{cat.title}</h3>
                  <p className="text-xs text-neutral-500 leading-snug">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Send feedback / contact channels */}
        <div className="bg-gradient-to-br from-[#FDF3EA] to-white rounded-3xl p-6 md:p-10 mb-12">
          <h2 className="text-lg md:text-xl font-bold text-black mb-2">
            Gửi góp ý hoặc khiếu nại
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed mb-6">
            Để góp ý và khiếu nại liên quan đến đơn hàng hoặc sản phẩm, việc cung cấp mã đơn hàng
            và hình ảnh/video sẽ giúp chúng tôi kiểm tra và xử lý nhanh chóng hơn.
          </p>

          <h3 className="text-xs font-bold text-black uppercase tracking-wide mb-3">
            Kênh liên hệ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {contactChannels.map(ch => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="w-9 h-9 shrink-0 rounded-full bg-[#F16C10]/10 flex items-center justify-center">
                    <Icon className="text-[#F16C10]" size={16} />
                  </span>
                  <div>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wide">{ch.label}</p>
                    <p className="text-sm font-semibold text-black">{ch.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="flex items-start gap-3">
            <Clock className="text-[#F16C10] shrink-0 mt-0.5" size={18} />
            <div className="text-sm text-neutral-700 leading-snug">
              <p>Thời gian hỗ trợ:</p>
              <p>Thứ Hai – Thứ Sáu: 09:00 – 18:00</p>
              <p>Thứ Bảy, Chủ Nhật và ngày lễ: Nghỉ</p>
            </div>
          </div>
        </div>

        {/* Process */}
        <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-5">
          Quy trình tiếp nhận và xử lý
        </h2>
        <div className="flex flex-col gap-6 mb-12">
          {processSteps.map(step => (
            <div key={step.num} className="flex items-start gap-4">
              <span className="shrink-0 w-11 h-11 rounded-full bg-black text-white text-sm font-bold flex items-center justify-center">
                {step.num}
              </span>
              <div>
                <h3 className="text-sm font-bold text-black mb-0.5">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment */}
        <div className="border-t border-dashed border-neutral-300 pt-8">
          <h2 className="text-lg font-bold text-black mb-2">Cam kết của OSTSOME</h2>
          <p className="text-sm text-neutral-600 leading-relaxed mb-3">
            Mỗi phản hồi của bạn đều có giá trị. Chúng tôi cam kết tiếp nhận ý kiến của khách hàng
            với tinh thần tôn trọng, minh bạch và thiện chí, đồng thời nỗ lực đưa ra phương án xử
            lý phù hợp trong thời gian sớm nhất.
          </p>
          <p className="text-sm font-bold text-[#F16C10]">
            OSTSOME – Lắng nghe để phục vụ bạn tốt hơn.
          </p>
        </div>
      </div>

      <ContactAndTrust />
    </div>
  );
}
