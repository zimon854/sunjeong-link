import { Metadata } from 'next';
// import { AuthProvider } from '@/components/auth/auth-provider';
// import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';

export const metadata: Metadata = {
  title: '대시보드',
  description: '선정링크 대시보드',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
