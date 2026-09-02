import { useState } from 'react';
import { X, Crown, Eye, EyeOff, Check, ArrowLeft, Mail, Lock, User, Phone, Calendar } from 'lucide-react';
import { useAuth } from './AuthContext';
import { customerLogin, customerRegister, customerResetPassword, getCustomer } from '../data/shopify';

type AuthView = 'login' | 'signup' | 'forgot' | 'forgot-sent' | 'signup-success';

type FostAuthModalProps = {
  initialView?: AuthView;
  onClose: () => void;
};

// Year options for the "Year of Birth" field: current year back to 100 years ago
const CURRENT_YEAR = new Date().getFullYear();
const birthYears = Array.from({ length: 100 + 1 }, (_, i) => CURRENT_YEAR - i);


// ─── SHARED HELPERS ───────────────────────────────────────────────────────────

function PasswordInput({ value, onChange, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? '••••••••'}
        className="w-full border border-neutral-200 rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-[#F16C10] transition text-black placeholder-neutral-400 bg-white"
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

function FieldRow({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

function StrengthBar({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const labels = ['', 'Yếu', 'Tạm được', 'Khá', 'Mạnh'];
  const colors = ['', 'bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-green-500'];
  if (!password) return null;
  return (
    <div className="mt-1">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? colors[strength] : 'bg-neutral-200'}`} />
        ))}
      </div>
      <p className={`text-[10px] font-semibold ${strength <= 1 ? 'text-red-400' : strength === 2 ? 'text-amber-500' : strength === 3 ? 'text-yellow-600' : 'text-green-600'}`}>
        {labels[strength]}
      </p>
    </div>
  );
}

// Strips everything except digits, +, spaces, hyphens, parentheses
function sanitizePhone(value: string) {
  return value.replace(/[^\d\s\+\-\(\)]/g, '');
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginView({ onSignup, onForgot, onSuccess }: {
  onSignup: () => void;
  onForgot: () => void;
  onSuccess: () => void;
}) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validateEmail() {
    if (!email) { setErrors(p => ({ ...p, email: 'Vui lòng nhập email' })); return false; }
    if (!isValidEmail(email)) { setErrors(p => ({ ...p, email: 'Nhập một địa chỉ email hợp lệ' })); return false; }
    return true;
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!email) e.email = 'Vui lòng nhập email';
    else if (!isValidEmail(email)) e.email = 'Nhập một địa chỉ email hợp lệ';
    if (!password) e.password = 'Vui lòng nhập mật khẩu';
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const result = await customerLogin(email, password);
      if (!result) {
        setErrors({ password: 'Email hoặc mật khẩu không đúng' });
        setLoading(false);
        return;
      }
      // Fetch real customer data
      const customer = await getCustomer(result.token);
      login({
        firstName: customer?.firstName ?? email.split('@')[0],
        lastName: customer?.lastName ?? '',
        email,
        shopifyToken: result.token,
      });
      onSuccess();
    } catch (err) {
      setErrors({ password: 'Đăng nhập thất bại. Vui lòng thử lại.' });
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-black mb-1">Chào mừng trở lại</h2>
        <p className="text-sm text-neutral-500">Đăng nhập để nhận ưu đãi thành viên FOST</p>
      </div>

      <FieldRow label="Email" error={errors.email}>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
            onBlur={validateEmail}
            placeholder="lan@example.com"
            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#F16C10] transition text-black placeholder-neutral-400 ${errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`}
          />
        </div>
      </FieldRow>

      <FieldRow label="Mật khẩu" error={errors.password}>
        <PasswordInput
          value={password}
          onChange={v => { setPassword(v); setErrors(p => ({ ...p, password: '' })); }}
        />
        <button
          onClick={onForgot}
          className="text-xs text-[#F16C10] font-semibold hover:underline text-right mt-0.5 self-end"
        >
          Quên mật khẩu?
        </button>
      </FieldRow>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#F16C10] hover:bg-[#d65f0e] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2"
      >
        {loading
          ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang đăng nhập…</>
          : 'Đăng Nhập'}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-neutral-100" />
        <span className="text-xs text-neutral-400">hoặc</span>
        <div className="flex-1 h-px bg-neutral-100" />
      </div>

      <p className="text-center text-sm text-neutral-500">
        Chưa là thành viên?{' '}
        <button onClick={onSignup} className="text-[#F16C10] font-bold hover:underline">
          Tham gia FOST — miễn phí
        </button>
      </p>
    </div>
  );
}

// ─── SIGN UP ──────────────────────────────────────────────────────────────────
function SignupView({ onLogin, onSuccess }: {
  onLogin: () => void;
  onSuccess: (firstName: string, lastName: string, email: string, token: string | null) => void;
}) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', birthYear: '', password: '', confirm: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (v: string) => {
    setForm(prev => ({ ...prev, [key]: v }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  function handlePhoneChange(raw: string) {
    set('phone')(sanitizePhone(raw));
  }

  function validateEmailField() {
    if (form.email && !isValidEmail(form.email)) {
      setErrors(p => ({ ...p, email: 'Nhập một địa chỉ email hợp lệ' }));
    }
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Bắt buộc';
    if (!form.lastName.trim()) e.lastName = 'Bắt buộc';
    if (!form.email) e.email = 'Bắt buộc';
    else if (!isValidEmail(form.email)) e.email = 'Nhập một địa chỉ email hợp lệ';
    if (form.phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(form.phone)) e.phone = 'Nhập một số điện thoại hợp lệ';
    if (!form.password) e.password = 'Bắt buộc';
    else if (form.password.length < 8) e.password = 'Tối thiểu 8 ký tự';
    if (form.password !== form.confirm) e.confirm = 'Mật khẩu không khớp';
    if (!agree) e.agree = 'Vui lòng đồng ý với điều khoản';
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const result = await customerRegister({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
      });
      if (!result.success) {
        setErrors({ email: result.errors[0] ?? 'Đăng ký thất bại' });
        setLoading(false);
        return;
      }
      // Tag this new customer as a FOST member in Shopify Admin, so the
      // FOST discount's customer-segment eligibility (segment: tag =
      // 'fost-member') actually includes them. This calls a Netlify
      // function rather than the Admin API directly, since Admin tokens
      // must never be exposed client-side. Fire-and-forget on purpose —
      // every registered account IS a FOST member regardless of whether
      // this tag call succeeds, so a flaky network call here shouldn't
      // block or fail the signup itself. If it does fail, the account
      // still exists and can be tagged manually or backfilled later.
      if (result.customerId) {
        fetch('/.netlify/functions/tag-fost-member', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId: result.customerId }),
        }).catch(err => {
          console.error('Failed to tag new customer as FOST member:', err);
        });
      }
      // Auto-login after registration
      const tokenResult = await customerLogin(form.email, form.password);
      if (tokenResult) {
        const customer = await getCustomer(tokenResult.token);
        // Store token via onSuccess callback
        onSuccess(form.firstName, form.lastName, form.email, tokenResult.token);
      } else {
        onSuccess(form.firstName, form.lastName, form.email, null);
      }
    } catch (err) {
      setErrors({ email: 'Đăng ký thất bại. Vui lòng thử lại.' });
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-1">
        <h2 className="text-xl font-bold text-black mb-1">Tham Gia FOST</h2>
        <p className="text-sm text-neutral-500">Miễn phí thành viên. Giá tốt hơn. Ưu tiên trải nghiệm sớm.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FieldRow label="Tên" error={errors.firstName}>
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input type="text" value={form.firstName} onChange={e => set('firstName')(e.target.value)}
              placeholder="Lan"
              className={`w-full border rounded-xl pl-9 pr-3 py-3 text-sm outline-none focus:border-[#F16C10] transition text-black placeholder-neutral-400 ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`} />
          </div>
        </FieldRow>
        <FieldRow label="Họ" error={errors.lastName}>
          <input type="text" value={form.lastName} onChange={e => set('lastName')(e.target.value)}
            placeholder="Nguyễn"
            className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#F16C10] transition text-black placeholder-neutral-400 ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`} />
        </FieldRow>
      </div>

      <FieldRow label="Email" error={errors.email}>
        <div className="relative">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="email"
            value={form.email}
            onChange={e => set('email')(e.target.value)}
            onBlur={validateEmailField}
            placeholder="lan@example.com"
            className={`w-full border rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-[#F16C10] transition text-black placeholder-neutral-400 ${errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`}
          />
        </div>
      </FieldRow>

      <div className="grid grid-cols-2 gap-3">
        <FieldRow label="Số điện thoại (không bắt buộc)" error={errors.phone}>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={e => handlePhoneChange(e.target.value)}
              placeholder="+84 91 234 5678"
              className={`w-full border rounded-xl pl-9 pr-3 py-3 text-sm outline-none focus:border-[#F16C10] transition text-black placeholder-neutral-400 ${errors.phone ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`}
            />
          </div>
        </FieldRow>
        <FieldRow label="Năm sinh (không bắt buộc)">
          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <select value={form.birthYear} onChange={e => set('birthYear')(e.target.value)}
              className={`w-full border border-neutral-200 rounded-xl pl-9 pr-3 py-3 text-sm outline-none focus:border-[#F16C10] transition appearance-none ${form.birthYear ? 'text-black' : 'text-neutral-400'}`}>
              <option value="" disabled>Chọn năm</option>
              {birthYears.map(year => (
                <option key={year} value={year} className="text-black">{year}</option>
              ))}
            </select>
          </div>
        </FieldRow>
      </div>

      <FieldRow label="Mật khẩu" error={errors.password}>
        <PasswordInput value={form.password} onChange={set('password')} placeholder="Tối thiểu 8 ký tự" />
        <StrengthBar password={form.password} />
      </FieldRow>

      <FieldRow label="Xác nhận mật khẩu" error={errors.confirm}>
        <PasswordInput value={form.confirm} onChange={set('confirm')} placeholder="Nhập lại mật khẩu" />
      </FieldRow>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <div
            onClick={() => { setAgree(a => !a); setErrors(prev => ({ ...prev, agree: '' })); }}
            className={`mt-0.5 w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition ${agree ? 'bg-[#F16C10] border-[#F16C10]' : 'border-neutral-300'}`}
          >
            {agree && <Check size={10} strokeWidth={3} className="text-white" />}
          </div>
          <span className="text-xs text-neutral-500 leading-relaxed">
            Tôi đồng ý với{' '}
            <a href="#" className="text-[#F16C10] hover:underline font-medium">Điều khoản Dịch vụ</a>{' '}
            và{' '}
            <a href="#" className="text-[#F16C10] hover:underline font-medium">Chính sách Bảo mật</a> của Ostsome
          </span>
        </label>
        {errors.agree && <p className="text-xs text-red-500 mt-1 ml-7">{errors.agree}</p>}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#F16C10] hover:bg-[#d65f0e] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 mt-1"
      >
        {loading
          ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang tạo tài khoản…</>
          : 'Tạo Tài Khoản FOST'}
      </button>

      <p className="text-center text-sm text-neutral-500">
        Đã là thành viên?{' '}
        <button onClick={onLogin} className="text-[#F16C10] font-bold hover:underline">Đăng nhập</button>
      </p>
    </div>
  );
}

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
function ForgotView({ onBack, onSent }: { onBack: () => void; onSent: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function validateEmailField() {
    if (email && !isValidEmail(email)) setError('Nhập một địa chỉ email hợp lệ');
  }

  async function handleSubmit() {
    if (!email) { setError('Vui lòng nhập địa chỉ email của bạn'); return; }
    if (!isValidEmail(email)) { setError('Nhập một địa chỉ email hợp lệ'); return; }
    setLoading(true);
    try {
      await customerResetPassword(email);
      onSent(email); // always show sent screen (Shopify doesn't confirm if email exists)
    } catch {
      onSent(email); // still show sent screen for security
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-black transition self-start">
        <ArrowLeft size={15} /> Quay lại đăng nhập
      </button>

      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-[#F16C10]/10 flex items-center justify-center mx-auto mb-4">
          <Lock size={24} className="text-[#F16C10]" />
        </div>
        <h2 className="text-xl font-bold text-black mb-2">Đặt lại mật khẩu</h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Nhập email của bạn và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.
        </p>
      </div>

      <FieldRow label="Địa chỉ Email" error={error}>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            onBlur={validateEmailField}
            placeholder="lan@example.com"
            className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#F16C10] transition text-black placeholder-neutral-400 ${error ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`}
          />
        </div>
      </FieldRow>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#F16C10] hover:bg-[#d65f0e] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2"
      >
        {loading
          ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang gửi…</>
          : 'Gửi Liên Kết Đặt Lại'}
      </button>
    </div>
  );
}

// ─── SUCCESS SCREENS ──────────────────────────────────────────────────────────
function ForgotSentView({ email, onBack }: { email: string; onBack: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
        <Mail size={28} className="text-green-500" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-black mb-2">Kiểm tra hộp thư của bạn</h2>
        <p className="text-sm text-neutral-500 leading-relaxed">Chúng tôi đã gửi liên kết đặt lại mật khẩu đến</p>
        <p className="text-sm font-bold text-black mt-1">{email}</p>
      </div>
      <div className="bg-neutral-50 rounded-xl border border-neutral-100 px-5 py-4 text-xs text-neutral-500 leading-relaxed w-full">
        Không nhận được email? Kiểm tra thư mục spam, hoặc{' '}
        <button onClick={onBack} className="text-[#F16C10] font-semibold hover:underline">thử email khác</button>.
      </div>
    </div>
  );
}

function SignupSuccessView({ firstName, onClose }: { firstName: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      <div className="w-16 h-16 rounded-full bg-[#F16C10]/10 border-2 border-[#F16C10]/30 flex items-center justify-center">
        <Crown size={28} className="text-[#F16C10]" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-black mb-2">Chào mừng, {firstName}! 🎉</h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Bạn hiện đã có quyền truy cập giá thành viên, ưu tiên sản phẩm mới, và sự kiện độc quyền.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {[
          { emoji: '🏷️', label: 'Giá Thành Viên', sub: 'Đã mở khóa' },
          { emoji: '⚡', label: 'Ưu Tiên Trải Nghiệm', sub: 'Đã kích hoạt' },
          { emoji: '🧪', label: 'Dùng Thử Sản Phẩm', sub: 'Đủ điều kiện' },
          { emoji: '🎟️', label: 'Sự Kiện', sub: 'Có thể được mời' },
        ].map(p => (
          <div key={p.label} className="flex flex-col items-center gap-1 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
            <span className="text-lg">{p.emoji}</span>
            <p className="font-bold text-black text-xs">{p.label}</p>
            <p className="text-[10px] text-green-600 font-semibold">{p.sub}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="w-full bg-[#F16C10] hover:bg-[#d65f0e] text-white font-bold py-3.5 rounded-xl transition text-sm"
      >
        Bắt Đầu Mua Sắm
      </button>
    </div>
  );
}

// ─── MAIN MODAL ───────────────────────────────────────────────────────────────
export function FostAuthModal({ initialView = 'login', onClose }: FostAuthModalProps) {
  const { login } = useAuth();
  const [view, setView] = useState<AuthView>(initialView);
  const [forgotEmail, setForgotEmail] = useState('');
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '' });

  const titles: Record<AuthView, string> = {
    login: 'Đăng Nhập Thành Viên FOST',
    signup: 'Tham Gia FOST',
    forgot: 'Đặt Lại Mật Khẩu',
    'forgot-sent': 'Đã Gửi Email',
    'signup-success': 'Chào Mừng Đến Với FOST',
  };

  function handleSignupSuccess(firstName: string, lastName: string, email: string, token: string | null) {
    setNewUser({ firstName, lastName, email });
    login({ firstName, lastName, email, shopifyToken: token ?? undefined });
    setView('signup-success');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Crown size={16} className="text-[#F16C10]" />
            <span className="text-sm font-bold text-black">{titles[view]}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition text-neutral-400"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-6">
          {view === 'login' && (
            <LoginView
              onSignup={() => setView('signup')}
              onForgot={() => setView('forgot')}
              onSuccess={onClose}
            />
          )}
          {view === 'signup' && (
            <SignupView
              onLogin={() => setView('login')}
              onSuccess={handleSignupSuccess}
            />
          )}
          {view === 'forgot' && (
            <ForgotView
              onBack={() => setView('login')}
              onSent={email => { setForgotEmail(email); setView('forgot-sent'); }}
            />
          )}
          {view === 'forgot-sent' && (
            <ForgotSentView email={forgotEmail} onBack={() => setView('forgot')} />
          )}
          {view === 'signup-success' && (
            <SignupSuccessView firstName={newUser.firstName} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}