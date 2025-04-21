'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const campaigns = [
  {
    id: 1,
    name: '2024 봄 신상품 홍보',
    brand: '패션브랜드 A',
    budget: '₩5,000,000',
    status: '진행중',
    influencers: 12,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
  },
  {
    id: 2,
    name: '신제품 출시 기념 이벤트',
    brand: '뷰티브랜드 B',
    budget: '₩3,000,000',
    status: '준비중',
    influencers: 8,
    startDate: '2024-03-15',
    endDate: '2024-04-15',
  },
  {
    id: 3,
    name: '브랜드 인지도 향상 캠페인',
    brand: '식품브랜드 C',
    budget: '₩7,000,000',
    status: '완료',
    influencers: 15,
    startDate: '2024-02-01',
    endDate: '2024-02-29',
  },
];

export default function CampaignsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">캠페인</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          새 캠페인
        </Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>캠페인명</TableHead>
              <TableHead>브랜드</TableHead>
              <TableHead>예산</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>인플루언서</TableHead>
              <TableHead>시작일</TableHead>
              <TableHead>종료일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>{campaign.brand}</TableCell>
                <TableCell>{campaign.budget}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      campaign.status === '진행중'
                        ? 'default'
                        : campaign.status === '준비중'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell>{campaign.influencers}명</TableCell>
                <TableCell>{campaign.startDate}</TableCell>
                <TableCell>{campaign.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 