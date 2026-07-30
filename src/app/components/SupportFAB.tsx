import { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

// Fixed phone/Messenger/Zalo contact numbers — update here if these ever
// change, rather than hunting through JSX.
const PHONE_DISPLAY = '028 6676 5010';
const PHONE_TEL_HREF = 'tel:+842866765010';
const FACEBOOK_URL = 'https://www.facebook.com/ostsomevnofficial';
const ZALO_PHONE = '0901885615';
// Zalo's own "chat with this phone number" deep link format.
const ZALO_URL = `https://zalo.me/${ZALO_PHONE}`;

const actions = [
  {
    key: 'phone',
    label: 'Gọi ngay',
    href: PHONE_TEL_HREF,
    icon: Phone,
    bg: '#F16C10',
  },
  {
    key: 'messenger',
    label: 'Chat trên Facebook',
    href: FACEBOOK_URL,
    icon: MessageCircle,
    bg: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 50%, #A033FF 100%)',
  },
  {
    key: 'zalo',
    label: 'Chat trên Zalo',
    href: ZALO_URL,
    // Zalo isn't a lucide icon — a short text badge matches how Zalo's own
    // widgets brand themselves (their button is just the wordmark, no
    // separate icon glyph).
    icon: null,
    bg: '#0068FF',
  },
];

export function SupportFAB() {
  // Dismissible per Aries's feedback: on mobile, this stack sits right over
  // content and some customers want it out of the way. Collapses to a
  // single small re-open button rather than disappearing entirely, so it's
  // never permanently lost — just resets to expanded on next page load
  // (no localStorage/persistence, matching the "no browser storage in
  // artifacts" constraint elsewhere, and keeping this simple).
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40">
        <button
          onClick={() => setOpen(true)}
          aria-label="Mở hỗ trợ khách hàng"
          title="Hỗ trợ khách hàng"
          className="w-9 h-9 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform bg-[#F16C10]"
        >
          <MessageCircle size={16} className="md:hidden" />
          <MessageCircle size={20} className="hidden md:block" />
        </button>
      </div>
    );
  }

  return (
    // bottom-24 on mobile clears the fixed Add to Cart/Buy Now bar shown
    // on product detail pages (see ProductDetail.tsx) so this never
    // overlaps it; md+ has no such bar, so it can sit lower.
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-center gap-2 md:gap-2.5">
      <button
        onClick={() => setOpen(false)}
        aria-label="Ẩn hỗ trợ khách hàng"
        title="Ẩn"
        className="w-6 h-6 md:w-7 md:h-7 rounded-full shadow-md flex items-center justify-center bg-white text-neutral-500 border border-neutral-200 hover:text-black hover:border-neutral-400 transition-colors"
      >
        <X size={13} />
      </button>

      {actions.map(action => (
        <a
          key={action.key}
          href={action.href}
          target={action.key === 'phone' ? undefined : '_blank'}
          rel={action.key === 'phone' ? undefined : 'noopener noreferrer'}
          aria-label={action.label}
          title={action.label}
          className="group w-9 h-9 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
          style={{ background: action.bg }}
        >
          {action.icon ? (
            <>
              <action.icon size={16} className="md:hidden" />
              <action.icon size={22} className="hidden md:block" />
            </>
          ) : (
            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-tight">Zalo</span>
          )}
        </a>
      ))}
    </div>
  );
}