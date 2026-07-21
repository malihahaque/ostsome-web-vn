import { useState, useEffect } from 'react';
import { fetchAllProducts } from '../data/shopify';
import type { ShopifyProduct } from '../data/shopify';
import type { Product, ProductMetafields } from '../data/products';

// ─── MODULE-LEVEL CACHE ───────────────────────────────────────────────────────
// Products are fetched once and cached for the lifetime of the app session
let cachedProducts: Product[] | null = null;
let fetchPromise: Promise<Product[]> | null = null;

// ─── CATEGORY MAPPING ─────────────────────────────────────────────────────────

function mapCategory(productType: string): string {
  const t = productType.toLowerCase();
  if (t.includes('headphone') || t.includes('audio') || t.includes('earphone') || t.includes('headset') || t.includes('speaker') || t.includes('earbud')) return 'Audio';
  if (t.includes('camera') || t.includes('gimbal') || t.includes('stabilizer') || t.includes('tripod') || t.includes('lens')) return 'Cameras & Photography';
  if (t.includes('gaming') || t.includes('controller') || t.includes('game') || t.includes('console')) return 'Gaming';
  if (t.includes('watch') || t.includes('wearable') || t.includes('fitness') || t.includes('tracker')) return 'Smart Wearables';
  if (t.includes('smart home') || t.includes('switch') || t.includes('hub') || t.includes('sensor')) return 'Smart Home';
  if (t.includes('power') || t.includes('battery') || t.includes('solar') || t.includes('charger')) return 'Power & Outdoor';
  if (t.includes('travel') || t.includes('carry') || t.includes('bag') || t.includes('mount') || t.includes('case')) return 'Travel & Carry';
  if (t.includes('monitor') || t.includes('display') || t.includes('screen')) return 'Monitors & Displays';
  if (t.includes('mobile') || t.includes('phone') || t.includes('iphone') || t.includes('android')) return 'Mobile & Accessories';
  return 'Smart Life';
}

function mapNavCategory(vendor: string, productType: string): string {
  const v = vendor.toLowerCase();
  const t = productType.toLowerCase();
  if (t.includes('gaming') || t.includes('controller') || v.includes('turtle beach') || v.includes('roccat') || v.includes('skullcandy') && t.includes('gaming')) return 'Gaming';
  if (t.includes('audio') || t.includes('headphone') || t.includes('earphone') || t.includes('speaker') || t.includes('earbud') || v.includes('sennheiser') || v.includes('skullcandy')) return 'Mobile Audio';
  if (t.includes('camera') || t.includes('gimbal') || t.includes('stabilizer') || v.includes('hohem') || v.includes('insta360') || v.includes('obsbot') || v.includes('kandao')) return 'Mobile Creator';
  if (t.includes('watch') || t.includes('fitness') || t.includes('wellness') || v.includes('kospet')) return 'Wellness';
  if (t.includes('travel') || t.includes('carry') || t.includes('mount') || v.includes('peak design') || v.includes('sp connect')) return 'Travel & Carry';
  if (t.includes('desk') || t.includes('monitor') || t.includes('keyboard') || v.includes('arzopa')) return 'Desk Setup';
  if (v.includes('switchbot') || t.includes('smart home') || t.includes('smart life')) return 'Smart Life';
  return 'Smart Life';
}

// ─── METAFIELDS ────────────────────────────────────────────────────────────────

// "Rich text" type metafields (Content 1-5, Compatibility, Thông số kỹ
// thuật, Trọn bộ sản phẩm, Tài liệu tham khảo, Content Mô tả) come back
// from Shopify as a JSON document tree, NOT as HTML — e.g.
// {"type":"root","children":[{"type":"paragraph","children":[{"type":"text","value":"..."}]}]}.
// Rendering that JSON string directly as HTML (as an earlier version of
// this code did) just prints the raw JSON as visible text. This parses
// the tree into actual HTML. "Single line text" fields (Meta Info Box
// 1/2, Heading Mô tả) are plain strings already and must NOT be run
// through this — there's nothing to parse there.
type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  value?: string;
  bold?: boolean;
  italic?: boolean;
  level?: number;
  listType?: 'unordered' | 'ordered';
  url?: string;
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function richTextNodeToHtml(node: RichTextNode): string {
  const inner = () => (node.children ?? []).map(richTextNodeToHtml).join('');
  switch (node.type) {
    case 'root':
      return inner();
    case 'paragraph':
      return `<p>${inner()}</p>`;
    case 'heading':
      return `<h${node.level ?? 3}>${inner()}</h${node.level ?? 3}>`;
    case 'list':
      return node.listType === 'ordered' ? `<ol>${inner()}</ol>` : `<ul>${inner()}</ul>`;
    case 'list-item':
      return `<li>${inner()}</li>`;
    case 'link':
      return `<a href="${node.url ?? '#'}" target="_blank" rel="noopener noreferrer">${inner()}</a>`;
    case 'text': {
      let text = escapeHtml(node.value ?? '').replace(/\n/g, '<br/>');
      if (node.bold) text = `<strong>${text}</strong>`;
      if (node.italic) text = `<em>${text}</em>`;
      return text;
    }
    default:
      return inner();
  }
}

// Converts a rich-text metafield's raw value into renderable HTML. Falls
// back to returning the raw string if it's not valid JSON (defensive —
// shouldn't normally happen for a real rich-text field, but avoids a hard
// crash if a field's type ever changes in Shopify Admin).
function richTextToHtml(raw: string | null): string | null {
  if (!raw) return null;
  try {
    return richTextNodeToHtml(JSON.parse(raw));
  } catch {
    return raw;
  }
}

// Shopify returns metafields as a flat array (one entry per identifier
// requested, null if that product doesn't have a value set for it) rather
// than a keyed object — this reshapes it into something components can
// just destructure. File-type fields (Image N) come through as a
// MediaImage reference, not a plain value, hence checking `.reference`.
function mapMetafields(raw: ShopifyProduct['metafields']): ProductMetafields {
  const byKey = new Map<string, { value: string | null; imageUrl: string | null }>();
  for (const m of raw) {
    if (!m) continue;
    byKey.set(m.key, { value: m.value, imageUrl: m.reference?.image?.url ?? null });
  }
  const text = (key: string) => byKey.get(key)?.value ?? null;
  const richText = (key: string) => richTextToHtml(byKey.get(key)?.value ?? null);
  const image = (key: string) => byKey.get(key)?.imageUrl ?? null;

  const features = [1, 2, 3, 4, 5]
    .map(n => ({ content: richText(`content_${n}`), image: image(`image_${n}`) }))
    .filter(f => f.content || f.image);

  return {
    compatibility: richText('compatibility'),
    descriptionHeading: text('heading_m_t_'),
    descriptionContent: richText('content_m_t_'),
    descriptionImage: image('image_m_t_'),
    features,
    specifications: richText('th_ng_s_k_thu_t'),
    whatsInTheBox: richText('tr_n_b_s_n_ph_m'),
    referenceDocs: richText('t_i_li_u_tham_kh_o'),
    metaInfoBox1: text('meta_info_box_1'),
    metaInfoBox2: text('meta_info_box_2'),
  };
}

// ─── MAPPER ───────────────────────────────────────────────────────────────────

export function mapShopifyProduct(p: ShopifyProduct): Product {
  const firstVariant = p.variants.edges[0]?.node;
  const comparePrice = firstVariant?.compareAtPrice
    ? parseFloat(firstVariant.compareAtPrice.amount)
    : null;
  // In stock if ANY variant is purchasable — a product with some sold-out
  // colors/sizes but at least one available option shouldn't show as fully
  // sold out.
  const availableForSale = p.variants.edges.some(e => e.node.availableForSale);

  return {
    handle: p.handle,
    title: p.title,
    vendor: p.vendor,
    type: p.productType,
    category: mapCategory(p.productType),
    navCategory: mapNavCategory(p.vendor, p.productType),
    price: parseFloat(firstVariant?.price.amount ?? '0'),
    comparePrice,
    images: p.images.edges.map(e => e.node.url),
    bodyHtml: p.descriptionHtml,
    availableForSale,
    metafields: mapMetafields(p.metafields),
  };
}

// ─── HOOK ─────────────────────────────────────────────────────────────────────

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(cachedProducts ?? []);
  const [loading, setLoading] = useState(cachedProducts === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedProducts !== null) {
      setProducts(cachedProducts);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetchAllProducts().then(shopifyProducts =>
        shopifyProducts
          .map(mapShopifyProduct)
          // Exclude products with no real price set in Shopify (shows as
          // SGD 0.00) — these are incomplete listings, not actual deals.
          .filter(p => p.price > 0)
      );
    }

    fetchPromise
      .then(mapped => {
        cachedProducts = mapped;
        setProducts(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch Shopify products:', err);
        setError('Failed to load products');
        setLoading(false);
        fetchPromise = null; // allow retry
      });
  }, []);

  return { products, loading, error };
}