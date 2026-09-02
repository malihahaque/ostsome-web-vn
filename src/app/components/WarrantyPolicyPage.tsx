import { ChevronLeft, Info, MapPin, Clock, Phone } from 'lucide-react';
import { ContactAndTrust } from './ContactAndTrust';

type WarrantyPolicyPageProps = {
  onBack: () => void;
};

const eligibilityConditions = [
  'Sản phẩm bị trục trặc, lỗi do nhà sản xuất',
  'Sản phẩm còn nguyên vẹn, không bị nứt vỡ, không bị biến dạng do tác động của ngoại lực',
  'Sản phẩm không có dấu hiệu bị ẩm, vô nước dẫn đến gây chạm mạch',
  'Sản phẩm phải còn trong thời gian bảo hành.',
  'Phải có hoá đơn mua hàng hoặc hóa đơn mua hàng online',
  'Thiết bị không thuộc các điều kiện trong mục "Từ chối bảo hành"',
];

const refusalConditions = [
  'Sản phẩm có dấu hiệu tự ý tháo rời, có tem bảo hành nhưng bị bong tróc, bị rách, tem bảo hành bị dán đè, tem bảo hành bị sửa đổi, mờ, không chính xác… Khách hàng không cung cấp được phiếu bảo hành hoặc cung cấp sai số điện thoại mua hàng so với số điện thoại trên hệ thống bảo hành điện tử của OSTSOME',
  'Tự ý sửa chữa sản phẩm bởi các cá nhân hay tổ chức bên ngoài trung tâm bảo hành',
  'Hỏng do thiên tai, hoả hoạn, nguồn điện không bình thường, bị cháy nổ',
  'Sản phẩm có dấu hiệu đã bị côn trùng xâm nhập, điều kiện bảo quản kém',
  'Bị hư hỏng do sơ suất cá nhân như để sản phẩm nhiễm nước hoặc tiếp xúc với các hoá chất gây ăn mòn, hư hỏng, lắp đặt sai qui cách, không đúng hướng dẫn, sử dụng linh kiện không phù hợp để sạc pin, sản phẩm bị lỗi do quý khách hàng vận chuyển',
  'Sản phẩm bị rơi, bị va đập, móp, nứt thủng, biến dạng dẫn tới hư hỏng, bị lỗi',
  'Sản phẩm không được mua từ hệ thống phân phối chính thức của OSTSOME',
  'Sản phẩm hết thời gian bảo hành.',
  'Sản phẩm bị đứt ngầm, gãy do tác động từ bên ngoài.',
  'Một số sản phẩm sẽ có tính năng, dung lượng bị hao hụt vật lý theo thời gian sử dụng (pin, pin dự phòng…) cũng sẽ không được bảo hành những lỗi liên quan đến những hao hụt đó.',
  'Không bảo hành những lỗi do cảm nhận cá nhân',
  'Những lỗi thuộc về nguyên lý chung, đặc điểm công nghệ, thuật toán của nhà sản xuất… cũng sẽ không được bảo hành. Ví dụ: Pin, Pin dự phòng sử dụng theo thời gian sẽ có sự hao hụt về dung lượng, đồng hồ định vị sẽ có sai số trong phép đo định vị tuỳ vào từng công nghệ định vị và vị trí địa lý tại thời điểm đó cũng như sử dụng sim của nhà mạng nào. Thông thường công nghệ định vị GPS sai số từ 5m-30m, Wifi sai số từ 50m-200m, LBS sai số từ 100m trở lên.',
];

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-[#FDF3EA] border border-[#F16C10]/20 rounded-xl p-4 text-xs md:text-sm text-neutral-600 leading-relaxed">
      <Info className="text-[#F16C10] shrink-0 mt-0.5" size={16} />
      <p>{children}</p>
    </div>
  );
}

export function WarrantyPolicyPage({ onBack }: WarrantyPolicyPageProps) {
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
          Chính Sách Bảo Hành
        </h1>
        <div className="w-12 h-1 bg-[#F16C10] rounded-full mb-10" />

        {/* 1. Thời gian bảo hành */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-black mb-3">1. Thời gian bảo hành</h2>
          <div className="flex flex-col gap-4 text-sm md:text-base text-neutral-600 leading-relaxed">
            <p>
              Các sản phẩm được bán trực tiếp bởi OSTSOME VIỆT NAM có thời hạn bảo hành căn cứ
              theo thông báo trên Website: OSTSOME.COM.VN. 
            </p>
            <NoteBox>
              Thời hạn bảo hành sản phẩm không được làm mới khi sửa chữa hoặc bảo hành tại
              OSTSOME.COM.VN
            </NoteBox>

            <div>
              <h3 className="text-sm font-bold text-black mb-1.5">Bảo hành 1 đổi 1</h3>
              <p>
                Quý khách được đổi sản phẩm mới 100% trong thời gian 7 ngày kể từ ngày mua hoặc
                ngày nhận được sản phẩm nếu sản phẩm bị lỗi phần cứng do sản xuất (có xác nhận
                lỗi kỹ thuật được kiểm tra bởi hãng &amp; nhà phân phối) và thoả mãn Điều Kiện
                Bảo Hành.
              </p>
            </div>

            <p>
              Sản phẩm mua ngoài thời hạn 7 ngày sẽ được xử lý trong thời gian từ 2-15 ngày (Trừ
              Chủ Nhật và các ngày lễ, Tết). Hàng hoá sẽ được sửa chữa hoặc đổi sang sản phẩm
              tương đương cùng loại. Thời gian bảo hành có thể sớm hơn quy định. Tuy nhiên, trong
              trường hợp đến thời hạn khách vẫn còn nằm trong thời gian bảo hành và vẫn đủ điều
              kiện để bảo hành nhưng OSTSOME không thể sửa chữa hoặc không có hàng tương đương
              thay thế, hai bên có thể thoả thuận để tìm giải pháp tối ưu đảm bảo lợi ích cho cả
              người bán lẫn người mua.
            </p>

            <div>
              <h3 className="text-sm font-bold text-black mb-1.5">Đổi trả sản phẩm</h3>
              <p>
                Trong thời gian 3 ngày kể từ ngày mua, nhận được hàng. Quý khách có nhu cầu đổi
                sang sản phẩm khác OSTSOME sẽ hỗ trợ đổi cho khách hàng mà không tính thêm phí
                đổi hàng. Hàng được đổi yêu cầu phải còn nguyên seal, nguyên tem, chưa tháo hộp,
                chưa sử dụng, hộp không xước xát, không biến dạng, đầy đủ hộp và phụ kiện đi kèm
                (sản phẩm đổi phải có giá trị tương đương hoặc lớn hơn giá trị sản phẩm đã mua).
              </p>
            </div>
          </div>
        </section>

        {/* 2. Điều kiện bảo hành */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-black mb-3">2. Điều kiện bảo hành</h2>
          <ul className="flex flex-col gap-2.5">
            {eligibilityConditions.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-neutral-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F16C10] shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Từ chối bảo hành */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-black mb-3">3. Từ chối bảo hành</h2>
          <ul className="flex flex-col gap-2.5 mb-5">
            {refusalConditions.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-neutral-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
          <NoteBox>
            Một số sản phẩm được OSTSOME cung cấp có trang bị chuẩn chống nước. Tuy nhiên đó chỉ
            là một trang bị để bảo vệ thiết bị tốt hơn và nó không phải là chuẩn chống nước tuyệt
            đối. Tính năng chống nước, chống bụi không phải điều kiện vĩnh viễn. Khả năng chống
            nước bị hao mòn là chuyện bình thường. Chính vì thế chúng tôi khuyến cáo khách hàng
            không nên mang thiết bị khi đi bơi, tắm hay ngâm vào nước và các dung dịch hóa chất,
            chất lỏng khác gây hư hỏng. Nếu thiết bị của khách hàng vào nước sẽ không nằm trong
            danh mục lỗi được bảo hành. OSTSOME sẽ hỗ trợ khách hàng sửa dịch vụ trong trường hợp
            này.
          </NoteBox>
        </section>

        {/* 4. Thời gian nhận và trả bảo hành */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-black mb-3">4. Thời gian nhận và trả bảo hành</h2>
          <div className="flex flex-col gap-4 text-sm md:text-base text-neutral-600 leading-relaxed mb-5">
            <p>
              OSTSOME nhận và trả bảo hành tất cả các ngày trong tuần. Thời gian: Từ thứ 2 - Thứ
              6, từ 9:30 đến 18:00.
            </p>
            <p>
              Nếu quý khách có nhu cầu bảo hành ngoài khung giờ trên vui lòng liên hệ trước với
              phòng bảo hành của OSTSOME theo số máy{' '}
              <a href="tel:0286676501" className="font-semibold text-[#F16C10]">
                028 66765010
              </a>
              .
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <Clock className="text-[#F16C10] shrink-0 mt-0.5" size={17} />
              <p className="text-sm text-neutral-700">Thứ 2 – Thứ 6: 9:30 – 18:00</p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="text-[#F16C10] shrink-0 mt-0.5" size={17} />
              <p className="text-sm text-neutral-700 leading-snug">
                Địa chỉ nhận và trả bảo hành: Tầng Trệt, Tháp D00.04 -00.05, Chung cư Sadora, 2 Số
                13, An Khánh, Hồ Chí Minh
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-[#F16C10] shrink-0 mt-0.5" size={17} />
              <a href="tel:0286676501" className="text-sm text-neutral-700 hover:text-[#F16C10] transition-colors">
                028 66765010
              </a>
            </div>
          </div>

          <p className="text-xs text-neutral-500 mt-4">
            OSTSOME không có dịch vụ bảo hành tại nhà, do đó quý khách hàng vui lòng mang, hoặc
            gửi hàng hoá về Trung tâm bảo hành của OSTSOME theo địa chỉ trên.
          </p>
        </section>

        <div className="border-t border-dashed border-neutral-300 pt-6">
          <p className="text-sm text-neutral-600 leading-relaxed">
            Trân thành cảm ơn quý khách, OSTSOME luôn hy vọng có thể hỗ trợ nhanh chóng và mang
            đến trải nghiệm tốt nhất.
          </p>
        </div>
      </div>

      <ContactAndTrust />
    </div>
  );
}
