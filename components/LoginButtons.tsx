"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";

export default function LoginButtons() {
  return (
    <div className="flex flex-row gap-4 justify-center">
      <button
        aria-label="구글로 로그인"
        className="bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition"
        onClick={() => signIn("google")}
        type="button"
      >
        <FcGoogle size={32} />
      </button>
      <button
        aria-label="카카오로 로그인"
        className="bg-yellow-400 rounded-full p-2 shadow hover:bg-yellow-300 transition"
        onClick={() => signIn("kakao")}
        type="button"
      >
        <SiKakaotalk size={32} />
      </button>
    </div>
  );
} 