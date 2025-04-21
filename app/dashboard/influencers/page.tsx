'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Instagram, Youtube, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const influencers = [
  {
    id: '1',
    name: '김뷰티',
    handle: '@kimbeauty',
    avatar: '/avatars/01.png',
    followers: '520K',
    engagement: '5.2%',
    categories: ['뷰티', '라이프스타일'],
    platforms: ['instagram', 'youtube'],
    recentCampaigns: 3,
  },
  {
    id: '2',
    name: '푸드리뷰어',
    handle: '@foodreview',
    avatar: '/avatars/02.png',
    followers: '320K',
    engagement: '4.8%',
    categories: ['푸드', '요리'],
    platforms: ['instagram'],
    recentCampaigns: 2,
  },
  {
    id: '3',
    name: '여행스타그램',
    handle: '@travelgram',
    avatar: '/avatars/03.png',
    followers: '450K',
    engagement: '4.5%',
    categories: ['여행', '라이프스타일'],
    platforms: ['instagram', 'youtube'],
    recentCampaigns: 5,
  },
];

export default function InfluencersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">인플루언서</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="인플루언서 검색" className="pl-8" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {influencers.map((influencer) => (
          <Card key={influencer.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={influencer.avatar} />
                  <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{influencer.name}</h3>
                  <p className="text-sm text-gray-500">{influencer.handle}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                {influencer.platforms.includes('instagram') && (
                  <Instagram className="h-5 w-5 text-pink-500" />
                )}
                {influencer.platforms.includes('youtube') && (
                  <Youtube className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">팔로워</p>
                <p className="font-medium">{influencer.followers}</p>
              </div>
              <div>
                <p className="text-gray-500">참여율</p>
                <p className="font-medium">{influencer.engagement}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {influencer.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              최근 {influencer.recentCampaigns}개 캠페인 참여
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 