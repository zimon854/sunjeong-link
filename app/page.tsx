'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  const getInitialPosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
  };

  const getAnimatePosition = () => {
    if (typeof window === 'undefined') return { y: 0 };
    return {
      y: [null, Math.random() * window.innerHeight],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      {/* 배경 애니메이션 요소들 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              scale: Math.random() * 2 + 1,
            }}
            animate={{
              y: typeof window !== 'undefined' ? [null, Math.random() * window.innerHeight] : 0,
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            SUNJEONG LINK
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-white/90 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            당신의 캠페인을 더 스마트하게
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/auth/login"
              className="group relative w-full sm:w-auto px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10">시작하기</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                whileHover={{ scale: 1.1 }}
              />
            </Link>
            
            <Link
              href="/auth/register"
              className="group relative w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">회원가입</span>
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                whileHover={{ scale: 1.1 }}
              />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-0 right-0 text-center text-white/80 text-sm"
        >
          © 2025 선정링크. All rights reserved.
        </motion.div>
      </div>
    </div>
  );
} 