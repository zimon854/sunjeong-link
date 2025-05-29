'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SunjeongLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Home,
  LineChart,
  Settings,
  Users,
} from 'lucide-react';

const navItems = [
  {
    title: '대시보드',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: '성과분석',
    href: '/dashboard/performance',
    icon: LineChart,
  },
  {
    title: '사용자',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: '설정',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 flex-shrink-0 h-6 w-6',
                    isActive
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 