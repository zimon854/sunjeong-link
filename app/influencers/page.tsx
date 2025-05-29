'use client';

import { UserIcon } from '@heroicons/react/24/solid';

interface Influencer {
  id: string;
  name: string;
  bio: string;
  followers: number;
  category: string;
  imageUrl: string;
}

const influencers: Influencer[] = [
  { id: '1', name: '김인플루', bio: '뷰티/패션 전문 인플루언서', followers: 120000, category: '뷰티', imageUrl: '/sample/influencer1.jpg' },
  { id: '2', name: '박스타', bio: '여행과 일상 브이로그', followers: 85000, category: '여행', imageUrl: '/sample/influencer2.jpg' },
  { id: '3', name: '이리뷰', bio: 'IT/전자제품 리뷰어', followers: 67000, category: 'IT', imageUrl: '/sample/influencer3.jpg' },
  { id: '4', name: '최푸드', bio: '맛집 탐방 푸드 크리에이터', followers: 99000, category: '푸드', imageUrl: '/sample/influencer4.jpg' },
  { id: '5', name: '정스포츠', bio: '스포츠/운동 전문', followers: 54000, category: '스포츠', imageUrl: '/sample/influencer5.jpg' },
  { id: '6', name: '윤라이프', bio: '라이프스타일 브이로거', followers: 78000, category: '라이프', imageUrl: '/sample/influencer6.jpg' },
  { id: '7', name: '한테크', bio: '최신 IT 트렌드 소개', followers: 43000, category: 'IT', imageUrl: '/sample/influencer7.jpg' },
  { id: '8', name: '오여행', bio: '세계여행 전문가', followers: 150000, category: '여행', imageUrl: '/sample/influencer8.jpg' },
  { id: '9', name: '류패션', bio: '패션 스타일링 팁', followers: 61000, category: '패션', imageUrl: '/sample/influencer9.jpg' },
  { id: '10', name: '장뷰티', bio: '화장품 리뷰어', followers: 92000, category: '뷰티', imageUrl: '/sample/influencer10.jpg' },
  { id: '11', name: '백헬스', bio: '헬스/다이어트 정보', followers: 33000, category: '스포츠', imageUrl: '/sample/influencer11.jpg' },
  { id: '12', name: '이맛집', bio: '전국 맛집 소개', followers: 105000, category: '푸드', imageUrl: '/sample/influencer12.jpg' },
  { id: '13', name: '최게임', bio: '게임 스트리머', followers: 87000, category: '게임', imageUrl: '/sample/influencer13.jpg' },
  { id: '14', name: '송키즈', bio: '육아/키즈 콘텐츠', followers: 49000, category: '키즈', imageUrl: '/sample/influencer14.jpg' },
  { id: '15', name: '문아트', bio: '미술/디자인 크리에이터', followers: 27000, category: '아트', imageUrl: '/sample/influencer15.jpg' },
  { id: '16', name: '신음악', bio: '음악/커버송 아티스트', followers: 56000, category: '음악', imageUrl: '/sample/influencer16.jpg' },
  { id: '17', name: '임영화', bio: '영화 리뷰어', followers: 38000, category: '영화', imageUrl: '/sample/influencer17.jpg' },
  { id: '18', name: '강동물', bio: '반려동물 콘텐츠', followers: 72000, category: '동물', imageUrl: '/sample/influencer18.jpg' },
  { id: '19', name: '조여행', bio: '국내여행 전문가', followers: 64000, category: '여행', imageUrl: '/sample/influencer19.jpg' },
  { id: '20', name: '유테크', bio: 'IT/전자제품 언박싱', followers: 51000, category: 'IT', imageUrl: '/sample/influencer20.jpg' },
  { id: '21', name: '최패션', bio: '패션/코디네이터', followers: 47000, category: '패션', imageUrl: '/sample/influencer21.jpg' },
  { id: '22', name: '박푸드', bio: '요리/레시피 크리에이터', followers: 83000, category: '푸드', imageUrl: '/sample/influencer22.jpg' },
  { id: '23', name: '이헬스', bio: '운동/건강 정보', followers: 39000, category: '스포츠', imageUrl: '/sample/influencer23.jpg' },
  { id: '24', name: '정아트', bio: '일러스트레이터', followers: 25000, category: '아트', imageUrl: '/sample/influencer24.jpg' },
];

export default function InfluencerListPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">인플루언서 리스트</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {influencers.map((inf) => (
            <div key={inf.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
              <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-4 border">
                <UserIcon className="w-16 h-16 text-gray-400" />
              </div>
              <div className="font-bold text-lg mb-1">{inf.name}</div>
              <div className="text-gray-500 text-sm mb-2">{inf.bio}</div>
              <div className="text-indigo-600 font-semibold text-sm mb-1">팔로워 {inf.followers.toLocaleString()}명</div>
              <div className="inline-block px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-700">{inf.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 