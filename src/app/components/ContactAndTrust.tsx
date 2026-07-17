import { Truck, CreditCard, ShieldCheck, MapPin, Phone, Mail, Calendar, ExternalLink } from 'lucide-react';

const trustBadges = [
  { icon: Truck, title: 'GIAO HÀNG\nMIỄN PHÍ', subtitle: 'Free shipping' },
  { icon: CreditCard, title: 'TRẢ GÓP 0%\nQUA THẺ', subtitle: '(TẠI CỬA HÀNG)' },
  { icon: ShieldCheck, title: 'HỖ TRỢ\n24/7', subtitle: '24/7 Support' },
];

const contactRows = [
  { icon: MapPin, text: 'Tầng Trệt, Tháp D00.04 -00.05, Chung cư Sadora, 2 Số 13, An Khánh, Hồ Chí Minh' },
  { icon: Phone, text: '028 66765010' },
  { icon: Mail, text: 'support@streamcastasia-vn.com' },
  { icon: Calendar, text: 'Thứ Hai đến Thứ Sáu: 9h-18h\nThứ Bảy, Chủ nhật & Ngày lễ nghỉ.' },
];

const MAPS_QUERY = 'Chung cư Sadora, 2 Đường số 13, An Khánh, Thủ Đức, Hồ Chí Minh';
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export function ContactAndTrust() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Trust badges row */}
        <div className="grid grid-cols-3 divide-x divide-neutral-200 border-b border-neutral-100 pb-10 mb-10">
          {trustBadges.map(badge => {
            const Icon = badge.icon;
            return (
              <div key={badge.subtitle} className="flex flex-col items-center text-center px-2">
                <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F16C10]/10 flex items-center justify-center mb-4">
                  <Icon className="text-[#F16C10]" size={28} strokeWidth={1.75} />
                </span>
                <h3 className="text-sm md:text-lg font-bold text-black uppercase whitespace-pre-line leading-snug mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-400">{badge.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Contact card */}
        <div className="bg-gradient-to-br from-[#FDF3EA] to-white rounded-3xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-2">Công ty TNHH Streacast Asia Việt Nam</h3>
            <div className="w-12 h-1 bg-[#F16C10] rounded-full mb-6" />
            <div className="flex flex-col divide-y divide-neutral-200">
              {contactRows.map((row, i) => {
                const Icon = row.icon;
                return (
                  <div key={i} className="flex items-start gap-3 py-3 first:pt-0">
                    <Icon className="text-[#F16C10] shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-neutral-700 whitespace-pre-line leading-snug">{row.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ height: '280px' }}>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-white text-[#F16C10] text-xs font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-neutral-50 transition-colors"
            >
              Open in Maps <ExternalLink size={12} />
            </a>
            <iframe
              title="OSTSOME Vietnam location"
              src={MAPS_EMBED_SRC}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
