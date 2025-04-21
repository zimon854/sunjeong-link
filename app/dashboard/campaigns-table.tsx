'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from './campaign';
import { Campaign as CampaignType } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CampaignsTableProps {
  campaigns: CampaignType[];
  totalCampaigns: number;
  offset: number | null;
  onPageChange: (newOffset: number) => void;
}

export function CampaignsTable({
  campaigns,
  totalCampaigns,
  offset,
  onPageChange,
}: CampaignsTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>캠페인 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="캠페인 검색..."
                className="h-9 w-[300px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button onClick={() => router.push('/campaigns/new')}>
              새 캠페인
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">이미지</TableHead>
                  <TableHead>제목</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="hidden md:table-cell">예산</TableHead>
                  <TableHead className="hidden md:table-cell">담당자</TableHead>
                  <TableHead className="hidden md:table-cell">생성일</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <Campaign key={campaign.id} campaign={campaign} />
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              총 {totalCampaigns}개의 캠페인
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                disabled={!offset || offset <= 0}
                onClick={() => onPageChange(offset ? offset - 5 : 0)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={!offset}
                onClick={() => onPageChange(offset || 0)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 