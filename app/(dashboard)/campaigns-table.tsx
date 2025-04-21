'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Campaign } from './campaign';
import { SelectCampaign } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CampaignsTable({
  campaigns,
  offset,
  totalCampaigns
}: {
  campaigns: SelectCampaign[];
  offset: number;
  totalCampaigns: number;
}) {
  let router = useRouter();
  let campaignsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>캠페인</CardTitle>
        <CardDescription>
          캠페인을 관리하고 성과를 확인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">이미지</span>
              </TableHead>
              <TableHead>캠페인명</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="hidden md:table-cell">예산</TableHead>
              <TableHead className="hidden md:table-cell">
                인플루언서
              </TableHead>
              <TableHead className="hidden md:table-cell">등록일</TableHead>
              <TableHead>
                <span className="sr-only">작업</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <Campaign key={campaign.id} campaign={campaign} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            {Math.max(0, Math.min(offset - campaignsPerPage, totalCampaigns) + 1)}-{offset}개 / 
            전체 <strong>{totalCampaigns}</strong>개
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === campaignsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              이전
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + campaignsPerPage > totalCampaigns}
            >
              다음
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
} 