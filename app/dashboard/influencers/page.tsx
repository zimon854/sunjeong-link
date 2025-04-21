'use client';

import { Metadata } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Instagram, Youtube, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
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

export const metadata: Metadata = {
  title: '인플루언서 - 선정링크',
  description: '인플루언서 관리 페이지',
};

const influencers = [
  {
    id: 1,
    name: '김인플',
    handle: '@kiminflu',
    platform: 'Instagram',
    followers: '125K',
    engagement: '4.8%',
    categories: ['패션', '뷰티'],
    status: '활성',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  },
  {
    id: 2,
    name: '이크리',
    handle: '@leecreator',
    platform: 'YouTube',
    followers: '250K',
    engagement: '5.2%',
    categories: ['라이프스타일', '여행'],
    status: '활성',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Molly'
  },
  {
    id: 3,
    name: '박소셜',
    handle: '@parksocial',
    platform: 'Instagram',
    followers: '85K',
    engagement: '6.1%',
    categories: ['푸드', '요리'],
    status: '검토중',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie'
  },
];

export default function InfluencersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">인플루언서</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          인플루언서 추가
        </Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>인플루언서</TableHead>
              <TableHead>플랫폼</TableHead>
              <TableHead>팔로워</TableHead>
              <TableHead>참여율</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {influencers.map((influencer) => (
              <TableRow key={influencer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={influencer.avatar} alt={influencer.name} />
                      <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{influencer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {influencer.handle}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{influencer.platform}</TableCell>
                <TableCell>{influencer.followers}</TableCell>
                <TableCell>{influencer.engagement}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {influencer.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={influencer.status === '활성' ? 'default' : 'secondary'}
                  >
                    {influencer.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 