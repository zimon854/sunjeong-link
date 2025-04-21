'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users2,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SunjeongLogo } from '@/components/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

const navigation = [
  { name: '대시보드', href: '/dashboard', icon: Home },
  { name: '캠페인', href: '/dashboard/campaigns', icon: ShoppingCart },
  { name: '인플루언서', href: '/dashboard/influencers', icon: Package },
  { name: '고객사', href: '/dashboard/customers', icon: Users2 },
  { name: '분석', href: '/dashboard/analytics', icon: LineChart }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <SunjeongLogo className="h-3 w-3 transition-all group-hover:scale-110" />
                <span className="sr-only">선정링크</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">선정링크</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                      {
                        'bg-accent text-foreground': pathname === item.href
                      }
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                  {
                    'bg-accent text-foreground': pathname === '/dashboard/settings'
                  }
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">설정</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">설정</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
} 