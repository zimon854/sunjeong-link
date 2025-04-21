'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const campaigns = [
  {
    id: '1',
    title: '신제품 런칭 캠페인',
    description: '새로운 스킨케어 제품 런칭 홍보',
    budget: '₩5,000,000',
    status: 'active',
    influencers: 15,
    reach: '2.5M',
    engagement: '4.2%',
  },
  {
    id: '2',
    title: '여름 시즌 프로모션',
    description: '여름 신상품 할인 프로모션',
    budget: '₩3,000,000',
    status: 'pending',
    influencers: 8,
    reach: '1.2M',
    engagement: '3.8%',
  },
  {
    id: '3',
    title: '브랜드 인지도 향상',
    description: '브랜드 인지도 향상을 위한 캠페인',
    budget: '₩8,000,000',
    status: 'completed',
    influencers: 25,
    reach: '4.8M',
    engagement: '5.1%',
  },
];

export default function CampaignsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">캠페인 관리</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <FileText className="mr-2 h-4 w-4" />
            내보내기
          </Button>
          <Button size="sm" className="h-8">
            <PlusCircle className="mr-2 h-4 w-4" />
            캠페인 등록
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="active">진행중</TabsTrigger>
          <TabsTrigger value="pending">승인대기</TabsTrigger>
          <TabsTrigger value="completed">완료</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <p className="text-sm text-gray-500">{campaign.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{campaign.budget}</p>
                    <Badge
                      variant={
                        campaign.status === 'active'
                          ? 'default'
                          : campaign.status === 'pending'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {campaign.status === 'active' && '진행중'}
                      {campaign.status === 'pending' && '승인대기'}
                      {campaign.status === 'completed' && '완료'}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 flex gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">{campaign.influencers}</span> 인플루언서
                  </div>
                  <div>
                    <span className="font-medium">{campaign.reach}</span> 도달
                  </div>
                  <div>
                    <span className="font-medium">{campaign.engagement}</span> 참여율
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 