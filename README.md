# 선정링크 (Sunjeong.link)

AI 없이도 강력한 마케팅 자동화 플랫폼  
소상공인과 브랜드를 위한 인플루언서 매칭 & 콘텐츠 캠페인 자동화 솔루션

---

## 🚀 프로젝트 소개

**Sunjeong.link**는 마케팅 인력이 부족한 브랜드와 소상공인을 위해  
캠페인 등록, 인플루언서 매칭, 콘텐츠 승인, 성과 확인을  
**간단하고 자동화된 방식**으로 제공하는 플랫폼입니다.  
초기에는 AI 없이 MVP를 구축하며, 향후 AI 콘텐츠 자동 생성 기능을 추가할 예정입니다.

## Overview

This is a starter template using the following stack:

- Framework - [Next.js (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Auth.js](https://authjs.dev)
- Database - [Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

During the deployment, Vercel will prompt you to create a new Postgres database. This will add the necessary environment variables to your project.

Inside the Vercel Postgres dashboard, create a table based on the schema defined in this repository.

```
CREATE TYPE status AS ENUM ('active', 'inactive', 'archived');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  status status NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  available_at TIMESTAMP NOT NULL
);
```

Then, uncomment `app/api/seed.ts` and hit `http://localhost:3000/api/seed` to seed the database with products.

Next, copy the `.env.example` file to `.env` and update the values. Follow the instructions in the `.env.example` file to set up your GitHub OAuth application.

```bash
npm i -g vercel
vercel link
vercel env pull
```

Finally, run the following commands to start the development server:

```
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.

## 📁 프로젝트 구조

```bash
/sunjeong-link
├── app/                    # App Router 기반 라우팅
│   ├── auth/               # 로그인/콜백 등 인증 흐름
│   ├── dashboard/          # 대시보드 및 기능 페이지
│   └── layout.tsx         # 루트 레이아웃
│
├── components/            # 재사용 가능한 UI 컴포넌트
├── lib/                   # Prisma, auth 등 유틸 함수
├── prisma/                # Prisma 스키마 및 seed
├── styles/                # Tailwind 전역 스타일
├── .env.example           # 환경변수 예시
└── README.md             # 이 문서
```
