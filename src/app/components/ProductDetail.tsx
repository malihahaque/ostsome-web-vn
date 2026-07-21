import { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Shield, Truck, RefreshCw, Check, X } from 'lucide-react';
import type { Product } from '../data/products';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { fetchProductByHandle } from '../data/shopify';
import type { ShopifyProduct } from '../data/shopify';
import { getFostPrice } from '../data/pricing';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { OurStory } from './OurStory';
import { ContactAndTrust } from './ContactAndTrust';
import luckyDrawImg from '../../imports/rubyoung-lucky-draw.jpg';

type ProductDetailProps = {
  product: Product;
  onBack: () => void;
  onCheckout?: () => void;
  // Lets the related-products row navigate to another product's detail
  // page. Optional so this component doesn't break if a parent hasn't
  // wired it up yet — in that case related product cards just won't
  // do anything when clicked.
  onSelectProduct?: (product: Product) => void;
};

const RUBYOUNG_SPIN_HANDLES = ['rubyoung-spin'];

export function ProductDetail({ product, onBack, onCheckout, onSelectProduct }: ProductDetailProps) {
  const { user } = useAuth();
  const isFostMember = Boolean(user);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showLuckyDraw, setShowLuckyDraw] = useState(false);

  const { addItem, items: cartItems } = useCart();
  const [shopifyVariants, setShopifyVariants] = useState<Record<string, string>>({});
  const [shopifyAvailability, setShopifyAvailability] = useState<Record<string, boolean>>({});
  const [shopifyQuantity, setShopifyQuantity] = useState<Record<string, number | null>>({});
  const [shopifyVariantNodes, setShopifyVariantNodes] = useState<ShopifyProduct['variants']['edges'][number]['node'][]>([]);
  const [variantsLoaded, setVariantsLoaded] = useState(false);
  const [stockWarning, setStockWarning] = useState<{ requested: number; available: number; intent: 'cart' | 'checkout' } | null>(null);

  // Show lucky draw popup if arrived via QR (URL contains /products/)
  useEffect(() => {
    const isRubyoungSpin = RUBYOUNG_SPIN_HANDLES.includes(product.handle);
    if (isRubyoungSpin) {
      const timer = setTimeout(() => setShowLuckyDraw(true), 500);
      return () => clearTimeout(timer);
    }
  }, [product.handle]);

  // Fetch Shopify variant GIDs + live stock status for checkout & sold-out display.
  // The static productVariants.ts data doesn't carry current stock, so a color
  // that sold out on Shopify still showed as selectable here — this fixes that
  // by checking availableForSale from the live Storefront API response.
  useEffect(() => {
    fetchProductByHandle(product.handle).then(sp => {
      if (!sp) { setVariantsLoaded(true); return; }
      const idMap: Record<string, string> = {};
      const availMap: Record<string, boolean> = {};
      const qtyMap: Record<string, number | null> = {};
      sp.variants.edges.forEach(({ node }) => {
        const optionValues = node.selectedOptions
          .filter(o => o.name !== 'Title' && o.value !== 'Default Title')
          .map(o => o.value);
        const key = optionValues.length > 0 ? optionValues.join('/') : 'default';
        idMap[key] = node.id;
        availMap[key] = node.availableForSale;
        qtyMap[key] = node.quantityAvailable ?? null;
      });
      setShopifyVariants(idMap);
      setShopifyAvailability(availMap);
      setShopifyQuantity(qtyMap);
      setShopifyVariantNodes(sp.variants.edges.map(e => e.node));
      setVariantsLoaded(true);
    }).catch(() => setVariantsLoaded(true));
  }, [product.handle]);

  // Derived directly from live Shopify data instead of the old static
  // (SG-only) productVariants.ts file, which had no entries for VN products
  // and was causing every variant product to fail to link to a real
  // Shopify variant ID at checkout. Kept in the same shape the rest of
  // this component already expects, so nothing downstream needed to change.
  const variants = useMemo(() => {
    return shopifyVariantNodes
      .map(node => {
        const opts = node.selectedOptions.filter(
          o => o.name !== 'Title' && o.value !== 'Default Title'
        );
        if (opts.length === 0) return null;
        return {
          option1Name: opts[0]?.name ?? null,
          option1Value: opts[0]?.value ?? '',
          option2Name: opts[1]?.name,
          option2Value: opts[1]?.value,
          price: parseFloat(node.price.amount),
          image: node.image?.url,
        };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);
  }, [shopifyVariantNodes]);

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  const option1Name = variants[0]?.option1Name ?? null;
  const option2Name = variants[0]?.option2Name ?? null;

  const option1Values = useMemo(() =>
    [...new Set(variants.map(v => v.option1Value))] as string[],
    [variants]
  );

  const option2Values = useMemo(() => {
    const base = selectedOption1
      ? variants.filter(v => v.option1Value === selectedOption1)
      : variants;
    return [...new Set(
      base.map(v => v.option2Value).filter((v): v is string => Boolean(v))
    )] as string[];
  }, [variants, selectedOption1]);

  const selectedVariant = useMemo(() => {
    if (!selectedOption1) return null;
    return variants.find(v =>
      v.option1Value === selectedOption1 &&
      (!selectedOption2 || v.option2Value === selectedOption2)
    ) ?? null;
  }, [variants, selectedOption1, selectedOption2]);

  const activePrice = selectedVariant ? selectedVariant.price : product.price;

  const allImages = useMemo(() => {
    const variantImgs = variants
      .map(v => v.image)
      .filter((img): img is string => Boolean(img));
    const combined = [...product.images, ...variantImgs];
    return [...new Set(combined)] as string[];
  }, [product.images, variants]);

  const isColourOption = (name: string | null) =>
    name?.toLowerCase().includes('color') || name?.toLowerCase().includes('colour');

  // A swatch is "sold out" only once we've actually loaded live Shopify data
  // and confirmed every combo containing this value is unavailable — before
  // the fetch resolves, we treat everything as available to avoid a flash
  // of grey swatches on first paint.
  function isOption1ValueAvailable(val: string): boolean {
    if (!variantsLoaded || Object.keys(shopifyAvailability).length === 0) return true;
    const matching = variants.filter(v => v.option1Value === val);
    return matching.some(v => {
      const key = [v.option1Value, v.option2Value].filter(Boolean).join('/');
      return shopifyAvailability[key] ?? shopifyAvailability['default'] ?? true;
    });
  }

  function isOption2ValueAvailable(val: string): boolean {
    if (!variantsLoaded || Object.keys(shopifyAvailability).length === 0) return true;
    const matching = variants.filter(v =>
      (!selectedOption1 || v.option1Value === selectedOption1) && v.option2Value === val
    );
    return matching.some(v => {
      const key = [v.option1Value, v.option2Value].filter(Boolean).join('/');
      return shopifyAvailability[key] ?? shopifyAvailability['default'] ?? true;
    });
  }

  // Whether the exact currently-selected combo is in stock — this is what
  // gates the Add to Cart / Buy Now buttons.
  const selectedVariantAvailable = useMemo(() => {
    if (!variantsLoaded || Object.keys(shopifyAvailability).length === 0) return true;
    const key = [selectedOption1, selectedOption2].filter(Boolean).join('/');
    return shopifyAvailability[key] ?? shopifyAvailability['default'] ?? true;
  }, [selectedOption1, selectedOption2, shopifyAvailability, variantsLoaded]);

  // The actual stock count for the selected variant, if Shopify exposes it
  // (requires "quantity available" visibility enabled on the Storefront API
  // channel in Shopify Admin — Settings → Apps and sales channels →
  // Headless → Configure). `null` means "not tracked / not exposed", in
  // which case we don't block on it and let Shopify's cart be the final
  // check, same as before.
  const maxQtyAvailable = useMemo(() => {
    const key = [selectedOption1, selectedOption2].filter(Boolean).join('/');
    return shopifyQuantity[key] ?? shopifyQuantity['default'] ?? null;
  }, [selectedOption1, selectedOption2, shopifyQuantity]);

  // How many of this exact product + variant combo are already sitting in
  // the cart from a previous add. Without this, two separate adds of 1
  // each would both pass the stock check individually, even though
  // together they exceed what's actually in stock — the check needs to
  // look at the total, not just the newly-requested amount in isolation.
  const alreadyInCartQty = useMemo(() => {
    return cartItems
      .filter(i =>
        i.product.handle === product.handle &&
        i.selectedOption1 === selectedOption1 &&
        i.selectedOption2 === selectedOption2
      )
      .reduce((sum, i) => sum + i.qty, 0);
  }, [cartItems, product.handle, selectedOption1, selectedOption2]);

  function handleOption1Select(val: string) {
    setSelectedOption1(val);
    setSelectedOption2(null);
    if (isColourOption(option1Name)) {
      const v = variants.find(vv => vv.option1Value === val && vv.image);
      if (v?.image) {
        const idx = allImages.indexOf(v.image);
        if (idx !== -1) setActiveImg(idx);
      }
    }
  }

  function handleOption2Select(val: string) {
    setSelectedOption2(val);
    const v = variants.find(vv =>
      (!selectedOption1 || vv.option1Value === selectedOption1) &&
      vv.option2Value === val &&
      vv.image
    );
    if (v?.image) {
      const idx = allImages.indexOf(v.image);
      if (idx !== -1) setActiveImg(idx);
    }
  }

  const needsOption1 = variants.length > 0 && option1Name && option1Name !== 'Title';
  const needsOption2 = option2Values.length > 0 && option2Name;

  function getMissingOptionsMessage(): string | null {
    if (needsOption1 && !selectedOption1 && needsOption2 && !selectedOption2) {
      return `Please select a ${option1Name} and ${option2Name} before adding to cart.`;
    }
    if (needsOption1 && !selectedOption1) {
      return `Please select a ${option1Name} before adding to cart.`;
    }
    if (needsOption2 && !selectedOption2) {
      return `Please select a ${option2Name} before adding to cart.`;
    }
    if (!selectedVariantAvailable) {
      return 'Sorry, this option is currently out of stock.';
    }
    return null;
  }

  function handleAddToCart() {
    const error = getMissingOptionsMessage();
    if (error) {
      setValidationError(error);
      setTimeout(() => setValidationError(null), 3500);
      return;
    }
    // Check actual stock before adding — previously the quantity selector
    // had no idea how many units were really in stock, so a customer could
    // request more than was available; Shopify's real cart would then
    // silently cap the quantity down with no explanation shown anywhere.
    // We also have to account for what's already in the cart from a prior
    // add — otherwise two separate adds of 1 each could each individually
    // pass the check while together exceeding actual stock.
    const remainingStock = maxQtyAvailable !== null ? Math.max(0, maxQtyAvailable - alreadyInCartQty) : null;
    if (remainingStock !== null && qty > remainingStock) {
      setStockWarning({ requested: qty, available: remainingStock, intent: 'cart' });
      return;
    }
    setValidationError(null);
    addItem({
      product,
      selectedOption1,
      selectedOption2,
      variantPrice: activePrice,
      variantImage: selectedVariant?.image ?? product.images[0],
      shopifyVariantId: (() => {
        const key = [selectedOption1, selectedOption2].filter(Boolean).join('/');
        return shopifyVariants[key] || shopifyVariants['default'] || null;
      })(),
      qty,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function handleBuyNow() {
    const error = getMissingOptionsMessage();
    if (error) {
      setValidationError(error);
      setTimeout(() => setValidationError(null), 3500);
      return;
    }
    const remainingStock = maxQtyAvailable !== null ? Math.max(0, maxQtyAvailable - alreadyInCartQty) : null;
    if (remainingStock !== null && qty > remainingStock) {
      setStockWarning({ requested: qty, available: remainingStock, intent: 'checkout' });
      return;
    }
    setValidationError(null);
    addItem({
      product,
      selectedOption1,
      selectedOption2,
      variantPrice: activePrice,
      variantImage: selectedVariant?.image ?? product.images[0],
      shopifyVariantId: (() => {
        const key = [selectedOption1, selectedOption2].filter(Boolean).join('/');
        return shopifyVariants[key] || shopifyVariants['default'] || null;
      })(),
      qty,
    });
    onCheckout?.();
  }

  // After the customer confirms the popup, either lower the quantity to
  // what's actually available and proceed, or cancel entirely.
  function confirmAddAvailableQty() {
    if (!stockWarning) return;
    const clampedQty = stockWarning.available;
    const intent = stockWarning.intent;
    setStockWarning(null);
    if (clampedQty < 1) return; // nothing left to add
    setQty(clampedQty);
    addItem({
      product,
      selectedOption1,
      selectedOption2,
      variantPrice: activePrice,
      variantImage: selectedVariant?.image ?? product.images[0],
      shopifyVariantId: (() => {
        const key = [selectedOption1, selectedOption2].filter(Boolean).join('/');
        return shopifyVariants[key] || shopifyVariants['default'] || null;
      })(),
      qty: clampedQty,
    });
    if (intent === 'checkout') onCheckout?.();
    else {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  }

  const PRODUCT_VIDEOS: Record<string, { videoId: string; title: string; start?: number }> = {
    'looki-l1': { videoId: 'KHjibXAMLxI', title: 'Looki L1 video', start: 1 },
    'dometic-cfx5-35-performance-compressor-cooler': { videoId: 'YV7fcGkof0I', title: 'Dometic CFX5 35 video' },
    'polaroid-now-instant-camera-gen3': { videoId: 'IeAajXkrRgQ', title: 'Polaroid Now+ Gen3 video' },
    'skullcandy-crusher-anc-2-wireless-headphones': { videoId: 'uOqvYKwIeP4', title: 'Skullcandy Crusher ANC 2 video' },
    'pre-order-larq-bottle-purevis-2-self-cleaning-1000ml': { videoId: 'Lmi5XBA-PhA', title: 'LARQ Bottle PureVis 2 video' },
    'arzopa-d10-10-1-digital-photo-frame': { videoId: '_Hbar0aUjis', title: 'Arzopa D10 video' },
  };
  const productVideo = PRODUCT_VIDEOS[product.handle];

  // Scroll-spy for the vertical feature-progress dots (Content/Image 1-5),
  // similar to the dot indicator on the Shopify theme reference. Tracks
  // which feature block is currently most in view and highlights the
  // matching dot; clicking a dot scrolls that block into view.
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFeature, setActiveFeature] = useState(0);
  const featureCount = product.metafields?.features.length ?? 0;

  useEffect(() => {
    if (featureCount === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        // Pick the entry closest to the center of the viewport among
        // those currently intersecting, rather than just "first match" —
        // keeps the active dot accurate when multiple blocks are
        // partially visible at once.
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length === 0) return;
        const closest = visible.reduce((best, e) =>
          Math.abs(e.boundingClientRect.top) < Math.abs(best.boundingClientRect.top) ? e : best
        );
        const idx = Number(closest.target.getAttribute('data-feature-index'));
        if (!Number.isNaN(idx)) setActiveFeature(idx);
      },
      { threshold: 0.4 }
    );
    featureRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [featureCount]);

  function scrollToFeature(i: number) {
    featureRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Related products: prioritize same-brand items, then top up with
  // same-category items if the brand alone doesn't have enough in stock.
  // Reuses the same product list ProductListing already fetches, so this
  // doesn't add a second network round-trip pattern to maintain.
  const { products: allProducts } = useProducts();
  const relatedProducts = useMemo(() => {
    const inStock = allProducts.filter(
      p => p.handle !== product.handle && p.availableForSale
    );
    const sameVendor = inStock.filter(p => p.vendor === product.vendor);
    const sameVendorHandles = new Set(sameVendor.map(p => p.handle));
    const sameCategory = inStock.filter(
      p => p.category === product.category && !sameVendorHandles.has(p.handle)
    );
    return [...sameVendor, ...sameCategory].slice(0, 8);
  }, [allProducts, product.handle, product.vendor, product.category]);

  function handleSelectRelated(p: Product) {
    onSelectProduct?.(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Stock warning popup — shown instead of silently letting Shopify
          cap the quantity down at checkout with no explanation */}
      {stockWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <button
              onClick={() => setStockWarning(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-neutral-100 hover:bg-neutral-200 rounded-full flex items-center justify-center transition"
            >
              <X size={16} className="text-neutral-600" />
            </button>
            <h2 className="text-lg font-bold text-black mb-2">Limited stock</h2>
            {stockWarning.available > 0 ? (
              <p className="text-sm text-neutral-600 mb-5">
                You asked for {stockWarning.requested}, but only {stockWarning.available} {stockWarning.available === 1 ? 'is' : 'are'} currently in stock. Would you like to add {stockWarning.available} instead?
              </p>
            ) : (
              <p className="text-sm text-neutral-600 mb-5">
                Sorry, this option just sold out and can't be added right now.
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setStockWarning(null)}
                className="flex-1 text-sm font-semibold text-neutral-600 border border-neutral-200 py-2.5 rounded-xl hover:bg-neutral-50 transition"
              >
                Cancel
              </button>
              {stockWarning.available > 0 && (
                <button
                  onClick={confirmAddAvailableQty}
                  className="flex-1 text-sm font-bold text-white bg-[#F16C10] hover:bg-[#d9610e] py-2.5 rounded-xl transition"
                >
                  Add {stockWarning.available}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lucky Draw Popup */}
      {showLuckyDraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-fade-in">
            <button
              onClick={() => setShowLuckyDraw(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition"
            >
              <X size={16} className="text-neutral-600" />
            </button>

            {/* Promo image */}
            <img
              src={luckyDrawImg}
              alt="Exclusive Offers"
              className="w-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            <div className="p-5">
              <h2 className="text-lg font-bold text-black mb-1">🎉 Congratulations!</h2>
              <p className="text-sm font-semibold text-[#F16C10] mb-3">Welcome to the OSTSOME × Rubyoung Lucky Draw! 🎟️</p>

              <p className="text-sm text-neutral-600 mb-3">We have 4 exciting prizes waiting for you:</p>
              <ul className="text-sm text-neutral-700 space-y-1 mb-4">
                <li>🎁 Free Gift</li>
                <li>🛍️ 1-for-1 Deal (Please select two items, then enter the code to redeem the offer)</li>
                <li>💵 $100 Voucher</li>
                <li>💳 $60 Voucher</li>
              </ul>

              <p className="text-sm font-semibold text-neutral-700 mb-2">Simply follow these steps:</p>
              <ol className="text-sm text-neutral-600 space-y-1 mb-5">
                <li>1. Scan the QR code.</li>
                <li>2. You'll be directed to the Rubyoung homepage.</li>
                <li>3. Tap <strong>Buy Now</strong>.</li>
                <li>4. Enter your shipping details and complete your order.</li>
              </ol>

              <button
                onClick={() => { setShowLuckyDraw(false); handleBuyNow(); }}
                className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3.5 rounded-xl transition-colors text-sm uppercase tracking-wide"
              >
                Buy Now
              </button>
              <button
                onClick={() => setShowLuckyDraw(false)}
                className="w-full mt-2 text-xs text-neutral-400 hover:text-neutral-600 py-2 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#F16C10] transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Products
        </button>
      </div>

      {productVideo && (
        <div className="max-w-2xl mx-auto px-4 mb-8">
          <div className="relative w-full overflow-hidden rounded-2xl bg-neutral-50" style={{ aspectRatio: '16 / 9' }}>
            <iframe
              src={`https://www.youtube.com/embed/${productVideo.videoId}?${productVideo.start ? `start=${productVideo.start}&` : ''}autoplay=1&mute=1&playsinline=1`}
              title={productVideo.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 pb-24 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 group" style={{ aspectRatio: '1 / 1' }}>
              <img
                src={allImages[activeImg] ?? product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain p-8 transition-opacity duration-300"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'; }}
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white shadow rounded-full flex items-center justify-center text-black transition opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setActiveImg((i) => (i + 1) % allImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white shadow rounded-full flex items-center justify-center text-black transition opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-[#F16C10] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -{discountPct}% OFF
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? 'border-[#F16C10]' : 'border-neutral-200 hover:border-neutral-400'}`}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-contain bg-neutral-50 p-1"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-[#F16C10] uppercase tracking-widest">{product.vendor}</span>
              <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">{product.category}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-black leading-tight mb-4">{product.title}</h1>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'} />
                ))}
              </div>
              <span className="text-xs text-neutral-400">(24 reviews)</span>
            </div>

            {isFostMember ? (
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-400 line-through">
                    {(hasDiscount ? product.comparePrice! : activePrice).toLocaleString('vi-VN')}₫
                  </span>
                  {hasDiscount && (
                    <span className="text-xs font-bold text-[#F16C10]">-{discountPct}%</span>
                  )}
                </div>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="text-3xl font-bold text-[#F16C10]">{getFostPrice(activePrice).toLocaleString('vi-VN')}₫</span>
                  <span className="text-[10px] font-bold text-white bg-[#F16C10] px-2 py-0.5 rounded-full uppercase tracking-wide">Giá FOST</span>
                </div>
                {hasDiscount && (
                  <p className="text-xs text-neutral-400 mt-1">Giá gốc {product.comparePrice!.toLocaleString('vi-VN')}₫ — đã áp dụng thêm ưu đãi 5% dành cho thành viên FOST</p>
                )}
              </div>
            ) : (
              <div className="mb-1">
                {hasDiscount && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-400 line-through">{product.comparePrice!.toLocaleString('vi-VN')}₫</span>
                    <span className="text-xs font-bold text-[#F16C10]">-{discountPct}%</span>
                  </div>
                )}
                <span className="text-3xl font-bold block mt-0.5 text-[#F16C10]">{activePrice.toLocaleString('vi-VN')}₫</span>
              </div>
            )}
            {!isFostMember && (
              <p className="text-xs text-[#F16C10] font-semibold mb-5">
                FOST Member giảm thêm 5% — Tham gia miễn phí để nhận giá này.
              </p>
            )}
            {isFostMember && (
              <p className="text-xs text-[#F16C10] font-semibold mb-5">
                FOST Member giảm thêm {(activePrice - getFostPrice(activePrice)).toLocaleString('vi-VN')}đ.
              </p>
            )}

            <p className="text-xs text-neutral-500 mb-6 bg-neutral-50 border border-neutral-100 rounded-lg px-3 py-2">
              Or 3 payments of <strong className="text-black">{Math.round((isFostMember ? getFostPrice(activePrice) : activePrice) / 3).toLocaleString('vi-VN')}₫</strong> with Atome. Taxes included.
            </p>

            {/* Option 1 */}
            {variants.length > 0 && option1Name && option1Name !== 'Title' && (
              <div className="mb-5">
                <label className={`text-xs font-semibold uppercase tracking-wide block mb-2 ${validationError && !selectedOption1 ? 'text-red-500' : 'text-neutral-600'}`}>
                  {option1Name}
                  {selectedOption1 && (
                    <span className="text-black normal-case tracking-normal font-normal ml-1">: {selectedOption1}</span>
                  )}
                  {validationError && !selectedOption1 && (
                    <span className="text-red-500 normal-case tracking-normal font-normal ml-1">— bắt buộc</span>
                  )}
                </label>
                {isColourOption(option1Name) ? (
                  <div className="flex flex-wrap gap-2">
                    {option1Values.map((val) => {
                      const v = variants.find(vv => vv.option1Value === val && vv.image);
                      const available = isOption1ValueAvailable(val);
                      return (
                        <button
                          key={val}
                          onClick={() => handleOption1Select(val)}
                          title={available ? val : `${val} — Hết hàng`}
                          className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                            selectedOption1 === val
                              ? 'border-[#F16C10] scale-110'
                              : 'border-neutral-200 hover:border-neutral-400'
                          } ${!available ? 'opacity-40 grayscale' : ''}`}
                        >
                          {v?.image ? (
                            <img src={v.image} alt={val} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-[8px] text-neutral-400 p-0.5 text-center leading-tight">
                              {val}
                            </div>
                          )}
                          {!available && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                              <div className="w-full h-px bg-neutral-500 rotate-45" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {option1Values.map((val) => {
                      const available = isOption1ValueAvailable(val);
                      return (
                        <button
                          key={val}
                          onClick={() => handleOption1Select(val)}
                          title={available ? undefined : `${val} — Hết hàng`}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            selectedOption1 === val
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                          } ${!available ? 'opacity-40 line-through' : ''}`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Option 2 */}
            {option2Values.length > 0 && option2Name && (
              <div className="mb-5">
                <label className={`text-xs font-semibold uppercase tracking-wide block mb-2 ${validationError && !selectedOption2 ? 'text-red-500' : 'text-neutral-600'}`}>
                  {option2Name}
                  {selectedOption2 && (
                    <span className="text-black normal-case tracking-normal font-normal ml-1">: {selectedOption2}</span>
                  )}
                  {validationError && !selectedOption2 && (
                    <span className="text-red-500 normal-case tracking-normal font-normal ml-1">— bắt buộc</span>
                  )}
                </label>
                {isColourOption(option2Name) ? (
                  <div className="flex flex-wrap gap-2">
                    {option2Values.map((val) => {
                      const v = variants.find(vv =>
                        (!selectedOption1 || vv.option1Value === selectedOption1) &&
                        vv.option2Value === val
                      );
                      const available = isOption2ValueAvailable(val);
                      return (
                        <button
                          key={val}
                          onClick={() => handleOption2Select(val)}
                          title={available ? val : `${val} — Hết hàng`}
                          className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                            selectedOption2 === val
                              ? 'border-[#F16C10] scale-110'
                              : 'border-neutral-200 hover:border-neutral-400'
                          } ${!available ? 'opacity-40 grayscale' : ''}`}
                        >
                          {v?.image ? (
                            <img src={v.image} alt={val} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-[8px] text-neutral-400 p-0.5 text-center leading-tight">
                              {val}
                            </div>
                          )}
                          {!available && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                              <div className="w-full h-px bg-neutral-500 rotate-45" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {option2Values.map((val) => {
                      const available = isOption2ValueAvailable(val);
                      return (
                        <button
                          key={val}
                          onClick={() => setSelectedOption2(val)}
                          title={available ? undefined : `${val} — Hết hàng`}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            selectedOption2 === val
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                          } ${!available ? 'opacity-40 line-through' : ''}`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="mb-5">
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-2">Số lượng</label>
              <div className="flex items-center border border-neutral-200 rounded-lg w-fit">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-black transition text-xl font-light">−</button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-black transition text-xl font-light">+</button>
              </div>
            </div>

            {validationError && (
              <div className="mb-3 flex items-start gap-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium px-4 py-3 rounded-xl animate-pulse">
                <span className="text-base leading-none mt-0.5">⚠️</span>
                <span>{validationError}</span>
              </div>
            )}

            <div className="hidden lg:flex flex-col gap-3 mb-8">
              {(!product.availableForSale || (selectedOption1 !== null && !selectedVariantAvailable)) ? (
                <div className="w-full bg-neutral-100 text-neutral-400 font-bold py-4 rounded-xl flex items-center justify-center text-sm uppercase tracking-wide">
                  Hết Hàng
                </div>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm uppercase tracking-wide ${
                      addedToCart
                        ? 'bg-green-500 text-white'
                        : 'bg-[#F16C10] hover:bg-[#d9610e] text-white'
                    }`}
                  >
                    {addedToCart ? (
                      <><Check size={18} /> Đã Thêm Vào Giỏ</>
                    ) : (
                      <><ShoppingCart size={18} /> Thêm Vào Giỏ</>
                    )}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 rounded-xl transition-colors text-sm uppercase tracking-wide"
                  >
                    Mua Ngay
                  </button>
                </>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: 'Miễn phí giao hàng', sub: 'Đơn từ 2.000.000₫' },
                { icon: Shield, label: 'Bảo hành chính hãng', sub: '1 NĂM' },
                { icon: RefreshCw, label: 'Trả hàng miễn phí', sub: '10 ngày' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 bg-neutral-50 rounded-xl">
                  <Icon size={18} className="text-[#F16C10] mb-1.5" />
                  <span className="text-xs font-semibold text-black">{label}</span>
                  <span className="text-[10px] text-neutral-400 leading-tight">{sub}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-100 mb-6" />

            <div>
              <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-4">About this product</h2>
              <div
                className="text-sm text-neutral-600 leading-relaxed product-description"
                dangerouslySetInnerHTML={{ __html: product.bodyHtml }}
              />
            </div>
          </div>
        </div>

        {/* Product metafields from Shopify — Compatibility, feature
            highlights (Content/Image 1-5), specs, what's in the box,
            reference docs, and the two Meta Info badges. Full-width (a
            sibling of the 2-column grid above, not nested inside the
            narrow right column) so it actually spans the page instead of
            being squeezed into ~half the width. Everything here is
            conditionally rendered — a product with none of these fields
            set just won't show this section at all. */}
        {product.metafields && (
          <div className="mt-16 md:mt-20 relative flex flex-col gap-12">
            {/* Meta Info badges */}
            {(product.metafields.metaInfoBox1 || product.metafields.metaInfoBox2) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[product.metafields.metaInfoBox1, product.metafields.metaInfoBox2].filter(Boolean).map((text, i) => (
                  <div key={i} className="bg-[#FFF8F1] border border-[#F16C10]/20 rounded-xl px-4 py-3 text-sm text-neutral-700">
                    {text}
                  </div>
                ))}
              </div>
            )}

            {/* Description heading/content/image — an additional
                highlight block distinct from the main product
                description above. When there's no heading/content text
                (image-only, as with Looki's branded promo graphic), the
                image gets its own centered, smaller treatment instead of
                the half-width/side-by-side layout meant for when there's
                text next to it. */}
            {(product.metafields.descriptionHeading || product.metafields.descriptionContent || product.metafields.descriptionImage) && (
              (() => {
                const hasText = Boolean(product.metafields!.descriptionHeading || product.metafields!.descriptionContent);
                return (
                  <div className={hasText ? 'flex flex-col md:flex-row gap-8 items-center' : 'flex justify-center'}>
                    {product.metafields!.descriptionImage && (
                      <img
                        src={product.metafields!.descriptionImage}
                        alt=""
                        className={hasText ? 'w-full md:w-1/2 rounded-xl object-cover' : 'w-full max-w-sm rounded-xl object-cover'}
                      />
                    )}
                    {hasText && (
                      <div className="flex-1">
                        {product.metafields!.descriptionHeading && (
                          <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-2">
                            {product.metafields!.descriptionHeading}
                          </h3>
                        )}
                        {product.metafields!.descriptionContent && (
                          <div
                            className="text-sm text-neutral-600 leading-relaxed product-description"
                            dangerouslySetInnerHTML={{ __html: product.metafields!.descriptionContent }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })()
            )}

            {/* Feature highlights — Content 1-5 / Image 1-5 pairs, back to
                a vertical stack (alternating image side), now full-width
                so both the text and the image actually have room. The
                dots on the right (lg+ only) are a scroll-spy — see
                featureRefs/activeFeature above — matching the vertical
                progress-dot indicator on the Shopify theme reference. */}
            {product.metafields.features.length > 0 && (
              <div className="flex flex-col gap-16 relative">
                {product.metafields.features.map((feature, i) => (
                  <div
                    key={i}
                    ref={el => { featureRefs.current[i] = el; }}
                    data-feature-index={i}
                    className={`flex flex-col gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                  >
                    {feature.image && (
                      <img
                        src={feature.image}
                        alt=""
                        className="w-full md:w-1/2 rounded-xl object-cover"
                      />
                    )}
                    {feature.content && (
                      <div
                        className="flex-1 text-sm text-neutral-600 leading-relaxed product-description"
                        dangerouslySetInnerHTML={{ __html: feature.content }}
                      />
                    )}
                  </div>
                ))}

                {/* Vertical scroll-progress dots */}
                <div className="hidden lg:flex flex-col gap-3 fixed right-6 top-1/2 -translate-y-1/2 z-30">
                  {product.metafields.features.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToFeature(i)}
                      aria-label={`Feature ${i + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeFeature === i ? 'bg-[#F16C10] scale-125' : 'bg-neutral-300 hover:bg-neutral-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Labeled text sections — Compatibility, Specifications,
                What's in the Box, Reference Docs. */}
            {[
              { label: 'Compatibility', content: product.metafields.compatibility },
              { label: 'Thông số kỹ thuật', content: product.metafields.specifications },
              { label: 'Trọn bộ sản phẩm', content: product.metafields.whatsInTheBox },
              { label: 'Tài liệu tham khảo', content: product.metafields.referenceDocs },
            ].filter(section => section.content).map(section => (
              <div key={section.label}>
                <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-2">{section.label}</h3>
                <div
                  className="text-sm text-neutral-600 leading-relaxed product-description"
                  dangerouslySetInnerHTML={{ __html: section.content! }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 border-t border-dashed border-neutral-300" />
              <span className="italic text-sm text-neutral-500 whitespace-nowrap">Có thể bạn cũng thích</span>
              <div className="flex-1 border-t border-dashed border-neutral-300" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:mx-0 md:px-0">
              {relatedProducts.slice(0, 4).map(p => (
                <div key={p.handle} className="shrink-0 w-[46%] sm:w-52 md:w-auto snap-start">
                  <ProductCard product={p} onClick={handleSelectRelated} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <OurStory />
      <ContactAndTrust />

      {/* Mobile fixed buy bar — desktop keeps the buttons inline in the
          sticky product-info column instead, see the "hidden lg:flex"
          button block above. */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 px-4 py-3 flex gap-3" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        {(!product.availableForSale || (selectedOption1 !== null && !selectedVariantAvailable)) ? (
          <div className="w-full bg-neutral-100 text-neutral-400 font-bold py-3.5 rounded-xl flex items-center justify-center text-sm uppercase tracking-wide">
            Hết Hàng
          </div>
        ) : (
          <>
            <button
              onClick={handleAddToCart}
              className={`flex-1 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wide ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-[#F16C10] hover:bg-[#d9610e] text-white'
              }`}
            >
              {addedToCart ? (
                <><Check size={16} /> Đã Thêm</>
              ) : (
                <><ShoppingCart size={16} /> Thêm Vào Giỏ</>
              )}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-black hover:bg-neutral-800 text-white font-bold py-3.5 rounded-xl transition-colors text-xs uppercase tracking-wide"
            >
              Mua Ngay
            </button>
          </>
        )}
      </div>

      <style>{`
        .product-description ul { list-style: disc; padding-left: 1.25rem; margin: 0.75rem 0; }
        .product-description li { margin-bottom: 0.25rem; }
        .product-description p { margin-bottom: 0.75rem; }
        .product-description h3 { font-weight: 700; margin: 1rem 0 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .product-description strong { color: #111; font-weight: 600; }
      `}</style>
    </div>
  );
}