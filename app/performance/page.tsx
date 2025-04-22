import { Metadata } from "next"
import { PerformanceDashboard } from "@/components/performance/performance-dashboard"

export const metadata: Metadata = {
  title: "성과분석",
  description: "링크 성과 분석 대시보드",
}

export default function PerformancePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">성과분석</h1>
      <PerformanceDashboard />
    </div>
  )
} 