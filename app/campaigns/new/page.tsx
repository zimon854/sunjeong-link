'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CampaignCreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    startDate: '',
    endDate: '',
    image: null as File | null,
    imagePreview: '',
    status: 'pending',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      const file = files[0];
      setForm(f => ({ ...f, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => setForm(f => ({ ...f, imagePreview: ev.target?.result as string }));
        reader.readAsDataURL(file);
      }
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('budget', form.budget);
      formData.append('startDate', form.startDate);
      formData.append('endDate', form.endDate);
      formData.append('status', form.status);
      if (form.image) {
        formData.append('image', form.image);
      }
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || '캠페인 등록 중 오류가 발생했습니다.');
        setLoading(false);
        return;
      }
      setLoading(false);
      router.push('/campaigns');
    } catch (err) {
      setError('캠페인 등록 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-lg w-full bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">캠페인 등록</h1>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">예산(원)</label>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                required
                min={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                value={form.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이미지</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm"
            />
            {form.imagePreview && (
              <img src={form.imagePreview} alt="미리보기" className="mt-2 w-full h-40 object-cover rounded-lg border" />
            )}
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? '등록 중...' : '캠페인 등록'}
          </button>
        </form>
      </div>
    </div>
  );
} 