import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">선정링크에 오신 것을 환영합니다</CardTitle>
            <CardDescription className="text-lg mt-2">
              소상공인과 브랜드를 위한 인플루언서 매칭 & 콘텐츠 캠페인 자동화 솔루션
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="h-16 text-lg" asChild>
                <a href="/campaigns">
                  캠페인 관리
                </a>
              </Button>
              <Button className="h-16 text-lg" asChild>
                <a href="/influencers">
                  인플루언서 관리
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 