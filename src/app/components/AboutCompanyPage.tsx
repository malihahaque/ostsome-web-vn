import { ChevronLeft } from 'lucide-react';
import { OurStory } from './OurStory';
import { ContactAndTrust } from './ContactAndTrust';

type AboutCompanyPageProps = {
  onBack: () => void;
};

export function AboutCompanyPage({ onBack }: AboutCompanyPageProps) {
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
        <span className="text-xs font-bold text-[#F16C10] uppercase tracking-widest mb-3 block">
          Về công ty
        </span>
        <h1 className="text-2xl md:text-4xl font-bold text-black leading-tight mb-4">
          Về StreamCast Asia Việt Nam
        </h1>
        <div className="w-12 h-1 bg-[#F16C10] rounded-full mb-6" />

        <p className="text-base md:text-lg font-bold text-black leading-relaxed mb-8">
          Đơn vị phân phối chính hãng các thương hiệu quốc tế tại Việt Nam
        </p>

        <div className="flex flex-col gap-5 text-sm md:text-base text-neutral-600 leading-relaxed">
          <p>
            <strong className="text-black">StreamCast Asia Việt Nam</strong> là thành viên của{' '}
            <strong className="text-black">StreamCast Asia</strong>, tập đoàn phân phối và phát
            triển thương hiệu có trụ sở tại Singapore, với hơn 20 năm kinh nghiệm và mạng lưới
            hoạt động tại 11 thị trường Đông Nam Á.
          </p>
          <p>
            Tại Việt Nam, StreamCast Asia là đơn vị phân phối và phát triển nhiều thương hiệu
            quốc tế trong các lĩnh vực{' '}
            <strong className="text-black">
              công nghệ, âm thanh, phụ kiện, lifestyle, thể thao và chăm sóc sức khỏe
            </strong>
            .
          </p>
          <p>
            Thông qua hệ thống phân phối, thương mại điện tử và bán lẻ, chúng tôi đưa những sản
            phẩm chất lượng từ các thương hiệu quốc tế đến gần hơn với người tiêu dùng Việt Nam.
          </p>
        </div>
      </div>

      <OurStory />
      <ContactAndTrust />
    </div>
  );
}
