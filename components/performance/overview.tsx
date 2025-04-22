'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "./overview-chart"

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 클릭 수</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">16,069</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">평균 체류 시간</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2분 34초</div>
          <p className="text-xs text-muted-foreground">
            +12.3% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">전환율</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.2%</div>
          <p className="text-xs text-muted-foreground">
            +0.5% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 수익</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₩1,234,567</div>
          <p className="text-xs text-muted-foreground">
            +15.2% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>월간 클릭 추이</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px]">
            <OverviewChart />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 