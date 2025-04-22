'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", clicks: 400 },
  { time: "03:00", clicks: 300 },
  { time: "06:00", clicks: 200 },
  { time: "09:00", clicks: 278 },
  { time: "12:00", clicks: 189 },
  { time: "15:00", clicks: 239 },
  { time: "18:00", clicks: 349 },
  { time: "21:00", clicks: 400 },
]

export function AnalyticsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
} 