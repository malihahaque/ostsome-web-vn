import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const story = {
  country: "VIỆT NAM",
  title: "Mang OSTSOME đến Việt Nam.",
  description:
    "OSTSOME website được xây dựng và phát triển bởi công ty StreamCast Asia, chuyên phân phối các thương hiệu cao cấp trên thế giới. Đến với OSTSOME, bạn sẽ được trải nghiệm những sản phẩm và công nghệ tiên phong, giúp chất lượng cuộc sống của bạn được nâng tầm. OSTSOME cam kết sản phẩm chính hãng 100%, bảo hành minh bạch cùng dịch vụ tận tâm, giúp khách hàng an tâm trong từng quyết định mua sắm. Tham gia các sự kiện, buổi chia sẻ cùng những trải nghiệm thực tế, nơi cộng đồng yêu công nghệ cùng kết nối và phát triển. Hãy nhanh đăng ký để trở thành thành viên FOST, bạn sẽ nhận được những ưu đãi độc quyền vô cùng hấp dẫn.",
  image:
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?fm=jpg&q=60&w=1080&auto=format&fit=crop"
};

export function OurStory() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-900" style={{ height: '520px' }}>
      <div className="absolute inset-0">
        <ImageWithFallback
          src={story.image}
          alt={story.country}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Câu Chuyện Của Chúng Tôi
          </h2>
          <p className="text-white/50 text-sm md:text-base">
            Kiến tạo công nghệ của ngày mai, ngay hôm nay.
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold tracking-widest text-white uppercase">
              {story.country}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {story.title}
          </h3>

          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
            {story.description}
          </p>
        </div>
      </div>
    </section>
  );
}