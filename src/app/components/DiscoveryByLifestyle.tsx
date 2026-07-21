import { useState } from 'react';
import { Briefcase, Gift, Camera } from 'lucide-react';
import workAnywhereImg from '../../imports/Cafe Setup.png';
import captureLifeImg from '../../imports/Creator Tools.png';
import giftImg from '../../imports/Gift Guide.png';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import type { Product } from '../data/products';

type Lifestyle = {
  id: number;
  title: string;
  description: string;
  icon: typeof Briefcase;
  image: string;
  navCategory: string | null;
  maxProducts?: number;
};

// Rebuilt as a tabbed section (banner + swipeable product row per tab)
// instead of 3 full stacked grids — the old version made customers scroll
// through a long wall of content. Trimmed to 3 lifestyles per Mals — Study
// Mode and Audio Everywhere removed.
const lifestyles: Lifestyle[] = [
  {
    id: 1,
    title: 'Work Anywhere',
    description: 'Your office. Your rules.',
    icon: Briefcase,
    image: workAnywhereImg,
    navCategory: 'Desk Setup',
  },
  {
    id: 2,
    title: 'Capture Life',
    description: 'Every moment. Every memory. Print it, keep it.',
    icon: Camera,
    image: captureLifeImg,
    navCategory: 'Mobile Creator',
  },
  {
    id: 5,
    title: 'Tết Gift Guide',
    description: 'Thoughtful tech gifts for the ones you love.',
    icon: Gift,
    image: giftImg,
    // Deliberately null — this lifestyle spans multiple categories, so it
    // can't filter by navCategory like the other two. See product-picking
    // fallback below.
    navCategory: null,
    maxProducts: 5,
  },
];

const DEFAULT_MAX_PRODUCTS = 10;

type Props = {
  onNavToCategory?: (category: string) => void;
  onNavToProducts?: () => void;
  onSelectProduct?: (product: Product) => void;
};

export function DiscoveryByLifestyle({ onNavToCategory, onNavToProducts, onSelectProduct }: Props) {
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState(0);
  const active = lifestyles[activeTab];
  const Icon = active.icon;

  // Tết Gift Guide has no single navCategory to filter on (it intentionally
  // spans many), so — per Mals — it falls back to the first available
  // products site-wide for now. The other two tabs filter by the real
  // navCategory already computed in useProducts.ts. Long-term, Gift Guide
  // should probably move to a curated handle list, same pattern as Flash
  // Sale / One Season Off / Launch Exclusive, once specific products are
  // picked for it.
  const tabProducts = (active.navCategory
    ? products.filter(p => p.availableForSale && p.navCategory === active.navCategory)
    : products.filter(p => p.availableForSale)
  ).slice(0, active.maxProducts ?? DEFAULT_MAX_PRODUCTS);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-10 text-left md:text-center">
          <h2 className="text-[26px] md:text-4xl font-bold text-black mb-2">Discovery by Lifestyle</h2>
          <p className="text-[14px] md:text-base text-neutral-600">Your setup. Your rules. Your vibe.</p>
        </div>

        {/* Tab selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {lifestyles.map((lifestyle, i) => (
            <button
              key={lifestyle.id}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeTab === i
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {lifestyle.title}
            </button>
          ))}
        </div>

        {/* Banner for the active tab */}
        <div
          onClick={() => active.navCategory ? onNavToCategory?.(active.navCategory) : onNavToProducts?.()}
          className="group relative overflow-hidden rounded-xl cursor-pointer mb-6"
        >
          <div className="relative bg-neutral-100 overflow-hidden md:aspect-[3/1]">
            <img
              src={active.image}
              alt={active.title}
              className="w-full h-auto md:h-full block object-contain md:object-cover group-hover:scale-110 transition duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).style.objectFit = 'contain';
                (e.target as HTMLImageElement).style.padding = '2rem';
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 group-hover:bg-[#F16C10] transition">
              <Icon className="text-white" size={22} />
            </div>
            <h3 className="text-white text-xl font-bold mb-1">{active.title}</h3>
            <p className="text-white/90 text-sm mb-1">{active.description}</p>
            <span className="text-white text-sm font-medium group-hover:translate-x-1 transition">Explore all →</span>
          </div>
        </div>

        {/* Swipeable product row for the active tab — stays a horizontal
            scroll strip on desktop too (not a wrapping grid), since a tab
            can have anywhere from a handful up to 10 products and a grid
            would spill into multiple rows, undoing the compact one-row
            layout this whole rebuild was for. */}
        {tabProducts.length > 0 && (
          <div className="flex gap-4 md:gap-5 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
            {tabProducts.map(product => (
              <div key={product.handle} className="shrink-0 w-[46%] sm:w-52 md:w-[31%] snap-start">
                <ProductCard product={product} onClick={p => onSelectProduct?.(p)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}