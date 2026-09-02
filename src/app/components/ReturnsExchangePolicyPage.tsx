import { ChevronLeft, Mail, Phone } from 'lucide-react';
import { ContactAndTrust } from './ContactAndTrust';

type ReturnsExchangePolicyPageProps = {
  onBack: () => void;
};

type PolicyRow = { condition: string; duration: string; policy: string };

const exchangeRows: PolicyRow[] = [
  {
    condition: 'Sản phẩm chưa mở hộp và chưa sử dụng',
    duration: 'Trong 10 ngày kể từ ngày nhận hàng',
    policy: 'Đổi sản phẩm miễn phí',
  },
  {
    condition: 'Sản phẩm đã mở hộp/đã sử dụng nhưng phát sinh lỗi kỹ thuật do NSX',
    duration: 'Trong 30 ngày',
    policy: '1 đổi 1 miễn phí',
  },
  {
    condition: 'Sản phẩm lỗi do NSX sau 30 ngày',
    duration: 'Trong thời hạn bảo hành',
    policy: 'Áp dụng chính sách bảo hành',
  },
  {
    condition: 'Sản phẩm lỗi do người sử dụng',
    duration: '—',
    policy: 'Không áp dụng đổi hàng',
  },
];

const exchangeConditions = [
  'Sản phẩm còn đầy đủ hộp, phụ kiện và quà tặng kèm theo (nếu có).',
  'Sản phẩm không bị trầy xước, móp méo, bám bẩn hoặc có dấu hiệu hư hỏng do người sử dụng.',
  'Sản phẩm chưa được tự ý sửa chữa hoặc can thiệp kỹ thuật.',
  'Đối với trường hợp đổi do lỗi sản xuất, OSTSOME sẽ kiểm tra và xác nhận lỗi trước khi thực hiện đổi hàng.',
  'Sản phẩm đổi mới sẽ là sản phẩm cùng model. Trường hợp sản phẩm hết hàng, khách hàng có thể lựa chọn sản phẩm tương đương hoặc sản phẩm khác và thanh toán phần chênh lệch (nếu có).',
];

const returnRows: PolicyRow[] = [
  {
    condition: 'Sản phẩm chưa mở hộp và chưa sử dụng',
    duration: 'Trong 7 ngày',
    policy: 'Hoàn tiền, không phí (phí ship hoàn về khách trả)',
  },
  {
    condition: 'Sản phẩm đã mở hộp và đã sử dụng – không lỗi',
    duration: 'Trong 7 ngày',
    policy: 'Hoàn tiền, phí xử lý 25% trên giá trị đơn hàng',
  },
  {
    condition: 'Sản phẩm lỗi do NSX',
    duration: 'Trong 30 ngày',
    policy: 'Hoàn tiền 100% nếu OSTSOME không thể đổi sản phẩm',
  },
  {
    condition: 'Sản phẩm lỗi do người sử dụng',
    duration: '—',
    policy: 'Không áp dụng trả hàng/hoàn tiền',
  },
];

const returnConditions = [
  'Sản phẩm còn đầy đủ hộp, phụ kiện và quà tặng kèm theo (nếu có).',
  'Không có dấu hiệu trầy xước, móp méo, bám bẩn hoặc hư hỏng do người sử dụng.',
  'Không mất hộp hoặc thiếu phụ kiện.',
  'Không có dấu hiệu tự ý sửa chữa, tháo lắp hoặc can thiệp kỹ thuật.',
  'Đối với sản phẩm đã sử dụng, OSTSOME sẽ kiểm tra tình trạng sản phẩm trước khi xác nhận việc hoàn tiền.',
  'Phí vận chuyển phát sinh khi trả hàng do Khách hàng trả.',
];

const unsupportedCases = [
  'Sản phẩm mất hộp hoặc thiếu phụ kiện.',
  'Sản phẩm bị trầy xước, móp méo, bám bẩn.',
  'Sản phẩm có dấu hiệu vào nước hoặc hư hỏng do tác động vật lý.',
  'Sản phẩm đã được tự ý sửa chữa, tháo lắp hoặc can thiệp kỹ thuật.',
  'Sản phẩm hư hỏng do sử dụng sai hướng dẫn của nhà sản xuất.',
  'Sản phẩm không còn đầy đủ quà tặng kèm theo (nếu có).',
  'Sản phẩm đã quá thời hạn quy định đổi/trả.',
];

function PolicyTable({ rows }: { rows: PolicyRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-100">
      <table className="w-full text-sm text-left min-w-[560px]">
        <thead>
          <tr className="bg-neutral-50 border-b border-neutral-100">
            <th className="px-4 py-3 font-bold text-black w-2/5">Tình trạng sản phẩm</th>
            <th className="px-4 py-3 font-bold text-black w-1/4">Thời hạn</th>
            <th className="px-4 py-3 font-bold text-black">Chính sách</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="px-4 py-3 text-neutral-600 align-top">{row.condition}</td>
              <td className="px-4 py-3 text-neutral-600 align-top">{row.duration}</td>
              <td className="px-4 py-3 text-neutral-700 font-medium align-top">{row.policy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConditionsList({ items, dotColor = 'bg-[#F16C10]' }: { items: string[]; dotColor?: string }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-neutral-600 leading-relaxed">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0 mt-2`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ReturnsExchangePolicyPage({ onBack }: ReturnsExchangePolicyPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-[#F16C10] transition-colors"
        >
          <ChevronLeft size={16} />
          Quay Lại Trang Chủ
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16 md:pb-20">
        {/* Header */}
        <span className="text-xs font-bold text-[#F16C10] uppercase tracking-widest mb-3 block">
          Chính Sách
        </span>
        <h1 className="text-2xl md:text-4xl font-bold text-black leading-tight mb-4">
          Quy Định Đổi - Trả Hàng
        </h1>
        <div className="w-12 h-1 bg-[#F16C10] rounded-full mb-10" />

        {/* I. Quy định đổi hàng */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-black mb-4">I. Quy định đổi hàng</h2>
          <PolicyTable rows={exchangeRows} />
          <h3 className="text-sm font-bold text-black uppercase tracking-wide mt-6 mb-3">
            Điều kiện đổi hàng
          </h3>
          <ConditionsList items={exchangeConditions} />
        </section>

        {/* II. Quy định trả hàng – hoàn tiền */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-black mb-4">II. Quy định trả hàng – hoàn tiền</h2>
          <PolicyTable rows={returnRows} />
          <h3 className="text-sm font-bold text-black uppercase tracking-wide mt-6 mb-3">
            Điều kiện trả hàng
          </h3>
          <ConditionsList items={returnConditions} />
        </section>

        {/* III. Các trường hợp không hỗ trợ đổi/trả */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-black mb-4">III. Các trường hợp không hỗ trợ đổi/trả</h2>
          <ConditionsList items={unsupportedCases} dotColor="bg-neutral-400" />
        </section>

        {/* Giải thích thêm */}
        <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 md:p-6 mb-10">
          <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-3">
            Giải thích thêm
          </h3>
          <div className="flex flex-col gap-1.5 text-sm text-neutral-600">
            <p><span className="font-semibold text-black">1. Đổi hàng:</span> Quý khách muốn đổi sản phẩm khác tại OSTSOME.</p>
            <p><span className="font-semibold text-black">2. Trả hàng:</span> Quý khách muốn trả hàng &amp; lấy lại tiền mặt.</p>
          </div>
        </div>

        <div className="border-t border-dashed border-neutral-300 pt-6">
          <p className="text-sm text-neutral-600 leading-relaxed mb-4">
            Quyền thu đổi sản phẩm cuối cùng thuộc về OSTSOME. Quý khách cần tư vấn chi tiết hơn về
            chương trình ĐỔI - TRẢ HÀNG vui lòng liên hệ hotline hoặc email để được hỗ trợ thêm.
            Chân thành cảm ơn Quý khách đã ủng hộ OSTSOME!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:0286676501"
              className="flex items-center gap-2 text-sm font-semibold text-[#F16C10] hover:text-[#d9610e] transition-colors"
            >
              <Phone size={16} />
              028 66765010
            </a>
            <a
              href="mailto:cs@ostsome.com.vn"
              className="flex items-center gap-2 text-sm font-semibold text-[#F16C10] hover:text-[#d9610e] transition-colors"
            >
              <Mail size={16} />
              cs@ostsome.com.vn
            </a>
          </div>
        </div>
      </div>

      <ContactAndTrust />
    </div>
  );
}
