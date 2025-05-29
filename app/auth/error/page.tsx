"use client";

import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow space-y-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">인증 오류</h1>
        <p className="text-gray-700">
          {error === 'CredentialsSignin'
            ? '이메일 또는 비밀번호가 올바르지 않습니다.'
            : '알 수 없는 인증 오류가 발생했습니다.'}
        </p>
        <a href="/auth/login" className="text-indigo-600 hover:underline">
          로그인 페이지로 돌아가기
        </a>
      </div>
    </div>
  );
} 