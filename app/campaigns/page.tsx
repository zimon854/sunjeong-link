'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  status: string;
}

export default function CampaignListPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 실제 API 연동 필요
    // 예시: fetch('/api/campaigns').then(...)
    setTimeout(() => {
      setCampaigns([
        {
          id: '1',
          title: '샘플 캠페인',
          description: '이것은 샘플 캠페인입니다.',
          budget: '100000',
          startDate: '2024-06-01',
          endDate: '2024-06-30',
          imageUrl: '',
          status: 'active',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">캠페인 목록</h1>
          <Link href="/campaigns/new" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">캠페인 등록</Link>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">불러오는 중...</div>
        ) : campaigns.length === 0 ? (
          <div className="text-center text-gray-400">등록된 캠페인이 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map(c => (
              <Link key={c.id} href={`/campaigns/${c.id}`} className="block bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                <div className="font-bold text-lg mb-2">{c.title}</div>
                <div className="text-gray-600 mb-2 line-clamp-2">{c.description}</div>
                <div className="text-sm text-gray-400">예산: {c.budget}원 | 기간: {c.startDate} ~ {c.endDate}</div>
                <div className="mt-2 inline-block px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-700">{c.status}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 