'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}
function validatePassword(password: string) {
  // 8자 이상, 영문/숫자/특수문자 조합
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
}
function validatePhone(phone: string) {
  return /^01[016789]-?\d{3,4}-?\d{4}$/.test(phone);
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    role: 'influencer',
    agree: false,
    profile: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldError, setFieldError] = useState<{[k: string]: string}>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as any;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setForm(f => ({ ...f, profile: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
    setFieldError(f => ({ ...f, [name]: '' }));
  };

  const validate = () => {
    const fe: {[k: string]: string} = {};
    if (!form.name) fe.name = '이름을 입력하세요.';
    if (!validateEmail(form.email)) fe.email = '올바른 이메일 형식이 아닙니다.';
    if (!validatePassword(form.password)) fe.password = '비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.';
    if (form.password !== form.passwordConfirm) fe.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    if (!validatePhone(form.phone)) fe.phone = '올바른 휴대폰 번호를 입력하세요.';
    if (!form.agree) fe.agree = '약관에 동의해야 합니다.';
    return fe;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const fe = validate();
    setFieldError(fe);
    if (Object.keys(fe).length > 0) return;
    setLoading(true);
    try {
      // 프로필 이미지는 FormData로 전송 (API에서 처리 필요)
      const body = new FormData();
      body.append('name', form.name);
      body.append('email', form.email);
      body.append('password', form.password);
      body.append('phone', form.phone);
      body.append('role', form.role);
      if (form.profile) body.append('profile', form.profile);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '회원가입 중 오류가 발생했습니다.');
      setSuccess(true);
      setTimeout(() => router.push('/auth/login'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>}
          {success && <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.</div>}
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
              <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="이름" />
              {fieldError.name && <div className="text-red-500 text-xs mt-1">{fieldError.name}</div>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="이메일" />
              {fieldError.email && <div className="text-red-500 text-xs mt-1">{fieldError.email}</div>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
              <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="비밀번호" />
              {fieldError.password && <div className="text-red-500 text-xs mt-1">{fieldError.password}</div>}
            </div>
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
              <input id="passwordConfirm" name="passwordConfirm" type="password" required value={form.passwordConfirm} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="비밀번호 확인" />
              {fieldError.passwordConfirm && <div className="text-red-500 text-xs mt-1">{fieldError.passwordConfirm}</div>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
              <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="010-1234-5678" />
              {fieldError.phone && <div className="text-red-500 text-xs mt-1">{fieldError.phone}</div>}
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">역할</label>
              <select id="role" name="role" required value={form.role} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="influencer">인플루언서</option>
                <option value="brand">브랜드</option>
              </select>
            </div>
            <div>
              <label htmlFor="profile" className="block text-sm font-medium text-gray-700">프로필 이미지 (선택)</label>
              <input id="profile" name="profile" type="file" accept="image/*" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500" />
            </div>
            <div className="flex items-center">
              <input id="agree" name="agree" type="checkbox" checked={form.agree} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
                <span className="text-indigo-600 font-semibold">이용약관</span> 및 <span className="text-indigo-600 font-semibold">개인정보처리방침</span>에 동의합니다.
              </label>
            </div>
            {fieldError.agree && <div className="text-red-500 text-xs mt-1">{fieldError.agree}</div>}
          </div>
          <div>
            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              {loading ? "처리 중..." : "회원가입"}
            </button>
          </div>
          <div className="text-sm text-center">
            <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              이미 계정이 있으신가요? 로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 