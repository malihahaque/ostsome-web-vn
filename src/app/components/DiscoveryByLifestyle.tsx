import { Briefcase, Gift, Camera } from 'lucide-react';
import workAnywhereImg from '../../imports/Cafe Setup.png';
import captureLifeImg from '../../imports/Creator Tools.png';
import giftImg from '../../imports/Gift Guide.png';

// Trimmed to 3 lifestyles per Mals — Study Mode and Audio Everywhere removed.
// With exactly 3 left, using a single even 3-across grid (all cards the same
// size) instead of the old 2-large-plus-3-small split, which would have left
// one lonely full-width card on its own row.
const lifestyles = [
  {
    id: 1,
    title: 'Work Anywhere',
    description: 'Your office. Your rules.',
    icon: Briefcase,
    image: workAnywhereImg,
    products: '18 products',
    navCategory: 'Desk Setup',
  },
  {
    id: 2,
    title: 'Capture Life',
    description: 'Every moment. Every memory. Print it, keep it.',
    icon: Camera,
    image: captureLifeImg,
    products: '10 products',
    navCategory: 'Mobile Creator',
  },
  {
    id: 5,
    title: 'Tết Gift Guide',
    description: 'Thoughtful tech gifts for the ones you love.',
    icon: Gift,
    image: giftImg,
    products: '22 products',
    navCategory: null, // spans multiple categories — routes to All Products instead
  },
];

type Props = {
  onNavToCategory?: (category: string) => void;
  onNavToProducts?: () => void;
};

export function DiscoveryByLifestyle({ onNavToCategory, onNavToProducts }: Props) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-10 text-left md:text-center">
          <h2 className="text-[26px] md:text-4xl font-bold text-black mb-2">Discovery by Lifestyle</h2>
          <p className="text-[14px] md:text-base text-neutral-600">Your setup. Your rules. Your vibe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {lifestyles.map((lifestyle) => {
            const Icon = lifestyle.icon;
            return (
              <div
                key={lifestyle.id}
                onClick={() => lifestyle.navCategory ? onNavToCategory?.(lifestyle.navCategory) : onNavToProducts?.()}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
              >
                <div className="relative h-[300px] md:h-[420px] bg-neutral-100 overflow-hidden">
                  <img
                    src={lifestyle.image}
                    alt={lifestyle.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.objectFit = 'contain';
                      (e.target as HTMLImageElement).style.padding = '2rem';
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 group-hover:bg-[#F16C10] transition">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">{lifestyle.title}</h3>
                  <p className="text-white/90 text-sm mb-3">{lifestyle.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">{lifestyle.products}</span>
                    <span className="text-white text-sm font-medium group-hover:translate-x-1 transition">Explore →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}