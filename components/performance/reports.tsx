import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const reports = [
  {
    title: "일간 보고서",
    date: "2024-04-22",
    description: "일일 클릭 및 전환 데이터",
  },
  {
    title: "주간 보고서",
    date: "2024-04-15 ~ 2024-04-21",
    description: "주간 성과 분석 및 추세",
  },
  {
    title: "월간 보고서",
    date: "2024-03-01 ~ 2024-03-31",
    description: "월간 종합 성과 분석",
  },
]

export function Reports() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">보고서</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          보고서 다운로드
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{report.date}</p>
              <p className="mt-2">{report.description}</p>
              <Button variant="outline" className="mt-4 w-full">
                다운로드
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 