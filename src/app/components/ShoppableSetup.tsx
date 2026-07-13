import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import type { Product as AppProduct } from '../data/products';
import cafeSetup from '../../imports/ost viet cafe.png';
import yogaSetup from '../../imports/ost viet yoga.png';

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

interface Product {
  id: number;
  name: string;
  price: number;
  handle?: string; // Shopify handle — when set, the tooltip links through to the real product page
  position: {
    top: string;
    left: string;
  };
}

interface Scene {
  id: string;
  image: string;
  navigatorText: string;
  navigatorTextShort: string;
  products: Product[];
}

// Positions estimated against the 1800x600px source images, matching each
// hotspot to where the physical product sits in the photo.
const scenes: Scene[] = [
  {
    id: 'work-anywhere',
    image: cafeSetup,
    navigatorText: 'SET UP ANYWHERE YOU WORK',
    navigatorTextShort: 'WORK ANYWHERE',
    products: [
      {
        id: 1,
        name: 'Satechi Slim X1 Bluetooth Keyboard',
        price: 1590000,
        handle: 'satechi-slim-x1-bluetooth-keyboard',
        position: { top: '73%', left: '30%' },
      },
      {
        id: 2,
        name: 'Satechi Aluminum Stand & Hub for iPad Pro',
        price: 2290000,
        handle: 'satechi-aluminum-stand-and-hub-ipad-pro',
        position: { top: '28%', left: '41%' },
      },
      {
        id: 3,
        name: 'Matador ReFraction Packable Backpack',
        price: 1990000,
        handle: 'ba-lo-du-lich-matador-refraction-packable-backpack',
        position: { top: '32%', left: '66%' },
      },
      {
        id: 4,
        name: 'Skullcandy Crusher ANC 2',
        price: 6500000,
        handle: 'skullcandy-crusher-anc-2',
        position: { top: '76%', left: '63%' },
      },
    ],
  },
  {
    id: 'recovery-ritual',
    image: yogaSetup,
    navigatorText: 'YOUR RECOVERY RITUAL, ANYWHERE',
    navigatorTextShort: 'RECOVERY RITUAL',
    products: [
      {
        id: 5,
        name: 'Theragun Relief',
        price: 4290000,
        handle: 'sung-massage-theragun-relief',
        position: { top: '55%', left: '31%' },
      },
      {
        id: 6,
        name: 'Theracup',
        price: 3990000,
        handle: 'therabody-theracup',
        position: { top: '40%', left: '50%' },
      },
      {
        id: 7,
        name: 'Theragun Mini Gen 2',
        price: 6500000,
        handle: 'theragun-mini-gen-2',
        position: { top: '73%', left: '53%' },
      },
      {
        id: 8,
        name: 'SmartGoggles',
        price: 6490000,
        handle: 'therabody-smart-goggles',
        position: { top: '52%', left: '73%' },
      },
    ],
  },
];

function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}₫`;
}

export function ShoppableSetup({ onSelectProduct }: { onSelectProduct?: (product: AppProduct) => void }) {
  const { products: catalogProducts } = useProducts();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const nextScene = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
    setActiveProduct(null);
  };

  const prevScene = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
    setActiveProduct(null);
  };

  return (
    <section className="py-8 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 md:mb-8">
        <div className="text-left md:text-center">
          <h2 className="text-[26px] md:text-4xl font-bold text-black mb-2">Shop The Setup</h2>
          <p className="text-[14px] md:text-base text-neutral-600 leading-relaxed md:leading-normal">Tap on the products to see details</p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSceneIndex * 100}%)` }}
        >
          {scenes.map((scene) => (
            <div key={scene.id} className="w-full flex-shrink-0 relative aspect-[3/1]">
              <ImageWithFallback
                src={scene.image}
                alt={scene.navigatorText}
                className="w-full h-full object-cover object-left sm:object-center"
              />

              {scene.products.map((product) => (
                <div
                  key={product.id}
                  className="absolute"
                  style={{ top: product.position.top, left: product.position.left, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => setActiveProduct(product)}
                  onMouseLeave={() => setActiveProduct(null)}
                  onClick={() => setActiveProduct(activeProduct?.id === product.id ? null : product)}
                >
                  <button
                    className="w-8 h-8 md:w-4 md:h-4 flex items-center justify-center -ml-2 -mt-2 md:m-0 cursor-pointer"
                    aria-label={`View ${product.name}`}
                  >
                    <span className="w-4 h-4 bg-white rounded-full shadow-lg border-2 border-[#F16C10] hover:scale-125 transition-transform inline-block" />
                  </button>

                  {activeProduct?.id === product.id && (() => {
                    const realProduct = product.handle
                      ? catalogProducts.find(p => p.handle === product.handle)
                      : undefined;
                    return (
                      // Note: pb-3 (padding) instead of mb-3 (margin) on this outer
                      // layer — padding is part of the element's own hoverable box,
                      // so the "gap" between the dot and the card below is bridged
                      // and the mouse never leaves the hotspot while crossing it.
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-3 z-10">
                        <div
                          className={`relative bg-white px-4 py-3 rounded-lg shadow-xl border border-neutral-200 whitespace-nowrap ${realProduct ? 'cursor-pointer hover:border-[#F16C10] transition-colors' : ''}`}
                          onClick={(e) => {
                            if (realProduct && onSelectProduct) {
                              e.stopPropagation();
                              onSelectProduct(realProduct);
                            }
                          }}
                        >
                          <div className="text-[14px] md:text-sm font-bold text-black mb-1">{product.name}</div>
                          <div className="text-[16px] md:text-lg font-bold text-[#F16C10]">{formatVND(product.price)}</div>
                          {realProduct && (
                            <div className="text-[11px] font-semibold text-[#F16C10] mt-1">View Product →</div>
                          )}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-neutral-200" />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Navigator */}
        <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 bg-white/95 backdrop-blur-sm px-3 py-2 md:p-4 shadow-lg border border-neutral-100 min-w-[160px] md:min-w-[200px] z-20 rounded-sm">
          {/* Short label on mobile, full label on desktop */}
          <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-black mb-2">
            <span className="md:hidden">{scenes[currentSceneIndex].navigatorTextShort}</span>
            <span className="hidden md:inline">{scenes[currentSceneIndex].navigatorText}</span>
          </h3>
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-1.5">
              <button
                onClick={prevScene}
                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#F16C10] hover:text-[#F16C10] transition-colors bg-white"
                aria-label="Previous Setup"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={nextScene}
                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#F16C10] hover:text-[#F16C10] transition-colors bg-white"
                aria-label="Next Setup"
              >
                <ChevronRightIcon />
              </button>
            </div>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-neutral-400">
              <span className="text-black">{String(currentSceneIndex + 1).padStart(2, '0')}</span> / {String(scenes.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}