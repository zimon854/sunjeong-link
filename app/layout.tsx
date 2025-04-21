import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'SUNJEONGLINK - 인플루언서 매칭 플랫폼',
  description: '소상공인과 브랜드를 위한 인플루언서 매칭 & 콘텐츠 캠페인 자동화 솔루션'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen w-full flex-col">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold tracking-tight">
              SUNJEONGLINK
            </h1>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </body>
      <Analytics />
    </html>
  );
}
