'use client';

import { Card } from '@/components/ui/card';
import { Users, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    name: '활성 캠페인',
    value: '12',
    icon: ShoppingCart,
    change: '+2.1%',
    changeType: 'positive',
  },
  {
    name: '등록 인플루언서',
    value: '127',
    icon: Users,
    change: '+15.1%',
    changeType: 'positive',
  },
  {
    name: '총 도달수',
    value: '12.4M',
    icon: TrendingUp,
    change: '+28.5%',
    changeType: 'positive',
  },
  {
    name: '총 캠페인 예산',
    value: '₩24.5M',
    icon: DollarSign,
    change: '+10.3%',
    changeType: 'positive',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className={cn(
                    'text-sm font-medium',
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
