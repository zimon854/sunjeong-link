'use client';

import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen w-full flex-col">
        <SessionProvider>
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
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
