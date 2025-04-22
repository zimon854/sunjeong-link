'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "1월", clicks: 4000 },
  { name: "2월", clicks: 3000 },
  { name: "3월", clicks: 2000 },
  { name: "4월", clicks: 2780 },
  { name: "5월", clicks: 1890 },
  { name: "6월", clicks: 2390 },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="clicks" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
} 