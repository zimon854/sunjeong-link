'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// 더미 데이터
const dailyPerformance = [
  { date: '1월', clicks: 1200, impressions: 5000, conversions: 80, revenue: 800000 },
  { date: '2월', clicks: 1500, impressions: 6000, conversions: 95, revenue: 950000 },
  { date: '3월', clicks: 1800, impressions: 7000, conversions: 110, revenue: 1100000 },
  { date: '4월', clicks: 2100, impressions: 8000, conversions: 130, revenue: 1300000 },
  { date: '5월', clicks: 2400, impressions: 9000, conversions: 150, revenue: 1500000 },
];

const platformData = [
  { name: 'Instagram', value: 40 },
  { name: 'Facebook', value: 25 },
  { name: 'Google Ads', value: 20 },
  { name: 'Naver', value: 15 },
];

const COLORS = ['#4F46E5', '#818CF8', '#C7D2FE', '#E0E7FF'];

const metrics = [
  { title: '총 매출', value: '₩5,650,000', change: '+15%' },
  { title: '총 전환수', value: '565', change: '+12%' },
  { title: '평균 전환율', value: '3.2%', change: '+0.5%' },
  { title: 'ROAS', value: '2.8', change: '+0.3' },
];

export default function PerformancePage() {
  const { data: session } = useSession();
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">성과 분석</h1>
              <p className="text-gray-500 mt-1">
                {session?.user?.name}님의 캠페인 성과를 확인하세요.
              </p>
            </div>
            <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-4 py-2 rounded-md transition-all ${
                  timeRange === 'week'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                주간
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-4 py-2 rounded-md transition-all ${
                  timeRange === 'month'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                월간
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-4 py-2 rounded-md transition-all ${
                  timeRange === 'year'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                연간
              </button>
            </div>
          </div>

          {/* 핵심 지표 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  <span className={`ml-2 text-sm font-medium ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 차트 섹션 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* 매출 및 전환 추이 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">매출 및 전환 추이</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis yAxisId="left" stroke="#666" />
                    <YAxis yAxisId="right" orientation="right" stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      name="매출"
                      dot={{ fill: '#4F46E5', strokeWidth: 2 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="conversions"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="전환수"
                      dot={{ fill: '#10B981', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* 플랫폼별 성과 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">플랫폼별 성과</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* 상세 성과 지표 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">상세 성과 지표</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="clicks" fill="#4F46E5" name="클릭수" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="impressions" fill="#818CF8" name="노출수" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversions" fill="#C7D2FE" name="전환수" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 