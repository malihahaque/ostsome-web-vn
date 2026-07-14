import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../data/products";
import heroBanner from "../../imports/Banner Looki.png";
import banner1 from "../../imports/banner Satechi.png";
import banner2 from "../../imports/Banner SHURE.png";
import banner3 from "../../imports/banner Skullcandy.png";
import banner4 from "../../imports/THERABODY - VNG.png";

const banners = [heroBanner, banner1, banner2, banner3, banner4];

// Real VN product each banner links through to when clicked. `null` means
// no matching product exists in the VN catalog yet — that banner is
// intentionally left unclickable rather than pointing to the wrong item.
const bannerHandles: (string | null)[] = [
  'looki-l1-ai-multimodal-wearable-thiết-bị-deo-ai-ghi-hinh-rảnh-tay-32g-quay-video-full-hd-1080p-3-micro-ai-tạo-vlog-comics-bộ-nhớ-32gb-bảo-mật-quyền-rieng-tư-mau-trắng', // Banner 1 "Looki L1" — confirmed real handle
  'satechi-165w-usb-c-4-port-pd-gan-charger', // Banner 2 "Satechi products" — generic Satechi banner, points to the flagship GaN charger
  'micro-thu-am-shure-mv7-plus', // Banner 3 "Shure MV7+"
  'tai-nghe-bluetooth-skullcandy-method-360-anc-bảo-hanh-1-nam-chống-ồn-pin-40-giờ-chống-ồn-chủ-dộng', // Banner 4 "Skullcandy Method 360 ANC" — confirmed real handle
  'theraface-pro', // Banner 5 — linked to TheraFace Pro facial massage device
];

const bannerLabels = [
  "Looki L1",
  "Satechi",
  "Shure MV7+",
  "Skullcandy Method 360 ANC",
  "TheraFace Pro",
];

type HeroProps = {
  onSelectProduct: (product: Product) => void;
};

export function Hero({ onSelectProduct }: HeroProps) {
  const { products } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const goToNext = () =>
    setCurrentSlide((prev) => (prev + 1) % banners.length);

  // Auto-cycle every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  function handleBannerClick(index: number) {
    const handle = bannerHandles[index];
    if (!handle) return; // no real product mapped yet — banner is inert
    const product = products.find(p => p.handle === handle);
    if (product) onSelectProduct(product);
  }

  return (
    <section className="relative bg-neutral-900 group w-full">
      <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={() => handleBannerClick(index)}
              className="block w-full h-full cursor-pointer"
              aria-label={`Go to ${bannerLabels[index]}`}
            >
              <ImageWithFallback
                src={banner}
                alt={`Hero banner ${index + 1}`}
                className="w-full h-full object-cover object-left sm:object-center"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition md:opacity-0 md:group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition md:opacity-0 md:group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="h-11 min-w-[44px] flex items-center justify-center"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 w-2 hover:bg-white/75"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}