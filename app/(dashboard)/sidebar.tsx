'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  BarChart,
  LucideIcon
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 border-r bg-gray-100/40 dark:bg-gray-800/40">
      <div className="flex h-full flex-col px-3 py-4">
        <div className="flex-1">
          <nav className="space-y-1">
            <NavItem href="/" icon={LayoutDashboard}>
              대시보드
            </NavItem>
            <NavItem href="/campaigns" icon={ShoppingBag}>
              캠페인 관리
            </NavItem>
            <NavItem href="/influencers" icon={Users}>
              인플루언서
            </NavItem>
            <NavItem href="/analytics" icon={BarChart}>
              성과 분석
            </NavItem>
          </nav>
        </div>
      </div>
    </aside>
  );
};

function NavItem({ href, icon: Icon, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-4 py-2 text-sm font-medium rounded-md',
        isActive
          ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
      )}
    >
      <Icon className="mr-3 h-5 w-5" />
      {children}
    </Link>
  );
} 