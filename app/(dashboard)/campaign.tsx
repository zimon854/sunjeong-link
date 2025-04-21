'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { Campaign } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function Campaign({ campaign }: { campaign: Campaign & { user: any } }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {campaign.imageUrl ? (
          <Image
            src={campaign.imageUrl}
            alt={campaign.title}
            width={100}
            height={100}
            className="aspect-square rounded-md object-cover"
          />
        ) : (
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-md bg-muted">
            이미지 없음
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{campaign.title}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              campaign.status === 'active'
                ? 'bg-green-500'
                : campaign.status === 'pending'
                ? 'bg-yellow-500'
                : 'bg-gray-500'
            }`}
          />
          {campaign.status === 'active'
            ? '진행중'
            : campaign.status === 'pending'
            ? '승인대기'
            : '완료'}
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {campaign.budget.toLocaleString()}원
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {campaign.user?.name || '미지정'}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatDistanceToNow(new Date(campaign.createdAt), {
          addSuffix: true,
          locale: ko
        })}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>수정</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
} 