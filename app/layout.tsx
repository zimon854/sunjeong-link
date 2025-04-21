import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { metadata } from './metadata';

export { metadata };

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
        <Analytics />
      </body>
    </html>
  );
}
