import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 환경 변수가 설정되지 않았습니다.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdmin() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@example.com',
      password: 'admin1234!',
    })

    if (error) {
      console.error('관리자 계정 생성 실패:', error.message)
      return
    }

    console.log('관리자 계정이 성공적으로 생성되었습니다:', data)
  } catch (error) {
    console.error('오류 발생:', error)
  }
}

createAdmin() 