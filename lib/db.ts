import 'server-only';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { eq, sql } from 'drizzle-orm';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

// 사용자 테이블
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 캠페인 상태 enum
export const campaignStatusEnum = pgEnum('campaign_status', ['draft', 'pending', 'active', 'completed', 'cancelled']);

// 캠페인 테이블
export const campaigns = pgTable('campaigns', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  budget: integer('budget'),
  status: campaignStatusEnum('status').notNull().default('draft'),
  brandId: uuid('brand_id').notNull(),
  imageUrl: varchar('image_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 인플루언서 테이블
export const influencers = pgTable('influencers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  category: varchar('category', { length: 100 }),
  followers: integer('followers'),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 상품 상태 enum
export const productStatusEnum = pgEnum('product_status', ['active', 'inactive', 'archived']);

// 상품 테이블
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  status: productStatusEnum('status').notNull().default('active'),
  imageUrl: varchar('image_url', { length: 255 }),
  stock: integer('stock').default(0),
  availableAt: timestamp('available_at'),
  isArchived: boolean('is_archived').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 타입 정의
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = typeof campaigns.$inferInsert;
export type Influencer = typeof influencers.$inferSelect;
export type InsertInfluencer = typeof influencers.$inferInsert;
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// 스키마 정의
export const insertUserSchema = createInsertSchema(users);
export const insertCampaignSchema = createInsertSchema(campaigns);
export const insertInfluencerSchema = createInsertSchema(influencers);
export const insertProductSchema = createInsertSchema(products);

// 쿼리 함수들
export async function getCampaigns(
  search?: string,
  offset: number = 0
): Promise<{
  campaigns: Campaign[];
  newOffset: number | null;
  totalCampaigns: number;
}> {
  if (search) {
    const result = await db.select().from(campaigns).where(
      sql`${campaigns.title} ilike ${`%${search}%`}`
    );
    return {
      campaigns: result,
      newOffset: null,
      totalCampaigns: result.length
    };
  }

  const [totalResult, moreCampaigns] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(campaigns),
    db.select().from(campaigns).limit(5).offset(offset)
  ]);

  const newOffset = moreCampaigns.length >= 5 ? offset + 5 : null;

  return {
    campaigns: moreCampaigns,
    newOffset,
    totalCampaigns: totalResult[0].count
  };
}

export async function deleteCampaignById(id: string) {
  await db.delete(campaigns).where(eq(campaigns.id, id));
}

export async function getInfluencers(
  search?: string,
  offset: number = 0
): Promise<{
  influencers: Influencer[];
  newOffset: number | null;
  totalInfluencers: number;
}> {
  if (search) {
    const result = await db.select().from(influencers).where(
      sql`${influencers.category} ilike ${`%${search}%`}`
    );
    return {
      influencers: result,
      newOffset: null,
      totalInfluencers: result.length
    };
  }

  const [totalResult, moreInfluencers] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(influencers),
    db.select().from(influencers).limit(5).offset(offset)
  ]);

  const newOffset = moreInfluencers.length >= 5 ? offset + 5 : null;

  return {
    influencers: moreInfluencers,
    newOffset,
    totalInfluencers: totalResult[0].count
  };
}

export async function deleteInfluencerById(id: string) {
  await db.delete(influencers).where(eq(influencers.id, id));
}

export async function getProducts(
  search?: string,
  offset: number = 0
): Promise<{
  products: Product[];
  newOffset: number | null;
  totalProducts: number;
}> {
  if (search) {
    const result = await db.select().from(products).where(
      sql`${products.name} ilike ${`%${search}%`}`
    );
    return {
      products: result,
      newOffset: null,
      totalProducts: result.length
    };
  }

  const [totalResult, moreProducts] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(products),
    db.select().from(products).limit(5).offset(offset)
  ]);

  const newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalResult[0].count
  };
}

export async function deleteProductById(id: string) {
  await db.delete(products).where(eq(products.id, id));
}

// 임시 데이터 저장소
export const data = {
  campaigns: [
    {
      id: '1',
      title: '신제품 런칭 캠페인',
      description: '새로운 스킨케어 제품 런칭 홍보',
      budget: '₩5,000,000',
      status: 'active',
      influencers: 15,
      reach: '2.5M',
      engagement: '4.2%',
    },
    {
      id: '2',
      title: '여름 시즌 프로모션',
      description: '여름 신상품 할인 프로모션',
      budget: '₩3,000,000',
      status: 'pending',
      influencers: 8,
      reach: '1.2M',
      engagement: '3.8%',
    },
    {
      id: '3',
      title: '브랜드 인지도 향상',
      description: '브랜드 인지도 향상을 위한 캠페인',
      budget: '₩8,000,000',
      status: 'completed',
      influencers: 25,
      reach: '4.8M',
      engagement: '5.1%',
    },
  ],
  influencers: [
    {
      id: '1',
      name: '김뷰티',
      handle: '@kimbeauty',
      avatar: '/avatars/01.png',
      followers: '520K',
      engagement: '5.2%',
      categories: ['뷰티', '라이프스타일'],
      platforms: ['instagram', 'youtube'],
      recentCampaigns: 3,
    },
    {
      id: '2',
      name: '푸드리뷰어',
      handle: '@foodreview',
      avatar: '/avatars/02.png',
      followers: '320K',
      engagement: '4.8%',
      categories: ['푸드', '요리'],
      platforms: ['instagram'],
      recentCampaigns: 2,
    },
    {
      id: '3',
      name: '여행스타그램',
      handle: '@travelgram',
      avatar: '/avatars/03.png',
      followers: '450K',
      engagement: '4.5%',
      categories: ['여행', '라이프스타일'],
      platforms: ['instagram', 'youtube'],
      recentCampaigns: 5,
    },
  ],
  stats: [
    {
      name: '활성 캠페인',
      value: '12',
      change: '+2.1%',
      changeType: 'positive',
    },
    {
      name: '등록 인플루언서',
      value: '127',
      change: '+15.1%',
      changeType: 'positive',
    },
    {
      name: '총 도달수',
      value: '12.4M',
      change: '+28.5%',
      changeType: 'positive',
    },
    {
      name: '총 캠페인 예산',
      value: '₩24.5M',
      change: '+10.3%',
      changeType: 'positive',
    },
  ],
};
