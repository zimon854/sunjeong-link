import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Supabase 환경 설정이 필요합니다.' },
        { status: 500 }
      )
    }

    const supabase = createRouteHandlerClient({ cookies })

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: `계정 생성 실패: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data,
      message: '계정이 생성되었습니다. 이메일 인증을 확인해주세요.' 
    })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { error: '관리자 계정 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 