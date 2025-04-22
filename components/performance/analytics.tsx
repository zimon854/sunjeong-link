'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsChart } from "./analytics-chart"

export function Analytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>시간대별 클릭 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <AnalyticsChart />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>기기별 접속 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>모바일</span>
              </div>
              <span className="font-medium">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>데스크톱</span>
              </div>
              <span className="font-medium">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>태블릿</span>
              </div>
              <span className="font-medium">10%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 