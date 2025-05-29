import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const device = searchParams.get('device');

    const where = {
      date: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
      device: device || undefined,
    };

    const metrics = await prisma.performanceMetric.findMany({
      where,
      orderBy: {
        date: 'asc',
      },
    });

    // 총계 계산
    const totals = {
      clicks: metrics.reduce((sum, metric) => sum + metric.clicks, 0),
      views: metrics.reduce((sum, metric) => sum + metric.views, 0),
      revenue: metrics.reduce((sum, metric) => sum + metric.revenue, 0),
    };

    // 기기별 통계
    const deviceStats = await prisma.performanceMetric.groupBy({
      by: ['device'],
      _sum: {
        clicks: true,
        views: true,
        revenue: true,
      },
    });

    return NextResponse.json({
      metrics,
      totals,
      deviceStats,
    });
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch performance metrics' },
      { status: 500 }
    );
  }
} 