import { NextRequest, NextResponse } from 'next/server';
import { campaigns } from '@/lib/db';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

// 캠페인 등록 (POST)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const budget = parseInt(formData.get('budget') as string, 10);
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const status = (formData.get('status') as string) || 'pending';
    const imageFile = formData.get('image') as File | null;
    let imageUrl = '';
    if (imageFile && typeof imageFile === 'object') {
      // 실제 파일 업로드는 미구현, 파일명만 저장
      imageUrl = imageFile.name;
    }
    // brandId는 임시 UUID로 처리
    const brandId = uuidv4();
    const [newCampaign] = await db
      .insert(campaigns)
      .values({
        title,
        description,
        budget,
        status: status as any,
        brandId,
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return NextResponse.json({ success: true, campaign: newCampaign });
  } catch (err) {
    return NextResponse.json({ success: false, error: '캠페인 등록 실패', detail: String(err) }, { status: 500 });
  }
}

// 캠페인 목록 조회 (GET)
export async function GET() {
  try {
    const result = await db.select().from(campaigns);
    return NextResponse.json({ success: true, campaigns: result });
  } catch (err) {
    return NextResponse.json({ success: false, error: '캠페인 목록 조회 실패', detail: String(err) }, { status: 500 });
  }
} 