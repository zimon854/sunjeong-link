import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '선정링크 - 인플루언서 매칭 & 캠페인 자동화',
  description: '소상공인과 브랜드를 위한 인플루언서 매칭 & 콘텐츠 캠페인 자동화 솔루션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
