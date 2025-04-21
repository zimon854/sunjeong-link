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
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

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

// 캠페인 테이블
export const campaigns = pgTable('campaigns', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  budget: integer('budget'),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  brandId: uuid('brand_id').notNull(),
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

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  status: statusEnum('status').default('active').notNull(),
  isArchived: boolean('is_archived').default(false).notNull()
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export const insertProductSchema = createInsertSchema(products);

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

export async function getCampaigns(
  search: string,
  offset: number
): Promise<{
  campaigns: any[];
  newOffset: number | null;
  totalCampaigns: number;
}> {
  if (search) {
    const campaigns = await db.select().from(this.campaigns).where(
      sql`${this.campaigns.title} ilike ${sql(search)}`
    );
    return {
      campaigns,
      newOffset: null,
      totalCampaigns: campaigns.length
    };
  }

  if (offset === null) {
    return { campaigns: [], newOffset: null, totalCampaigns: 0 };
  }

  const [totalCampaigns, moreCampaigns] = await Promise.all([
    db.select(sql`count(*)`).from(this.campaigns),
    db.select().from(this.campaigns).limit(5).offset(offset)
  ]);

  const newOffset = moreCampaigns.length >= 5 ? offset + 5 : null;

  return {
    campaigns: moreCampaigns,
    newOffset,
    totalCampaigns: totalCampaigns[0].count
  };
}

export async function deleteCampaignById(id: string) {
  await db.delete(this.campaigns).where(eq(this.campaigns.id, id));
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
