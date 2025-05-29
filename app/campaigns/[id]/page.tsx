'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, ChangeEvent } from 'react';

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

export default function CampaignDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // TODO: 실제 API 연동 필요
    setTimeout(() => {
      setCampaign({
        id,
        title: '샘플 캠페인',
        description: '이것은 샘플 캠페인입니다.',
        budget: '100000',
        startDate: '2024-06-01',
        endDate: '2024-06-30',
        imageUrl: '',
        status: 'active',
      });
      setLoading(false);
    }, 500);
  }, [id]);

  useEffect(() => {
    setForm(campaign);
  }, [campaign]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => f ? { ...f, [name]: value } : f);
  };

  const handleSave = async () => {
    // TODO: 실제 수정 API 연동 필요
    setCampaign(form);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    // TODO: 실제 삭제 API 연동 필요
    router.push('/campaigns');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">불러오는 중...</div>;
  if (!campaign) return <div className="min-h-screen flex items-center justify-center text-gray-400">캠페인을 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">캠페인 상세</h1>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">수정</button>
          )}
        </div>
        <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
            <input
              type="text"
              name="title"
              value={form?.title || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
            <textarea
              name="description"
              value={form?.description || ''}
              onChange={handleChange}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">예산(원)</label>
              <input
                type="number"
                name="budget"
                value={form?.budget || ''}
                onChange={handleChange}
                disabled={!isEditing}
                min={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
              <select
                name="status"
                value={form?.status || 'pending'}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              >
                <option value="pending">대기</option>
                <option value="active">진행중</option>
                <option value="completed">완료</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
              <input
                type="date"
                name="startDate"
                value={form?.startDate || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
              <input
                type="date"
                name="endDate"
                value={form?.endDate || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이미지</label>
            {form?.imageUrl ? (
              <img src={form.imageUrl} alt="캠페인 이미지" className="w-full h-40 object-cover rounded-lg border mb-2" />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg border mb-2">이미지 없음</div>
            )}
          </div>
          <div className="flex justify-between mt-8">
            {isEditing ? (
              <>
                <button type="button" onClick={() => { setIsEditing(false); setForm(campaign); }} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">취소</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">저장</button>
              </>
            ) : (
              <button type="button" onClick={handleDelete} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">삭제</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 