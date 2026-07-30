import { Zap, Package, Award, MapPin } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Ra Mắt Sớm',
    description: 'Trải nghiệm sản phẩm mới trước khi phổ biến trên thị trường',
  },
  {
    icon: Package,
    title: 'Hàng Độc Quyền',
    description: 'Phiên bản giới hạn không tìm thấy ở nơi khác',
  },
  {
    icon: Award,
    title: 'Lựa Chọn Được Kiểm Định',
    description: 'Mọi sản phẩm đều được người đam mê công nghệ thực tế trải nghiệm',
  },
  {
    icon: MapPin,
    title: 'Hỗ Trợ Tại Chỗ',
    description: 'Bảo hành trong nước, giao hàng nhanh trong ngày',
  },
];

export function WhyEnthusiasts() {
  return (
    <section className="py-10 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Vì Sao Người Đam Mê Công Nghệ Chọn OSTSOME</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="text-center px-2">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#F16C10]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-[#F16C10]" size={22} strokeWidth={2} />
                </div>
                <h3 className="text-white font-bold text-sm md:text-lg mb-1">{reason.title}</h3>
                <p className="text-neutral-400 text-xs md:text-sm leading-snug">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}