import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 환경변수 로드
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rovkcrtpnknwdujebfca.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvdmtjcnRwbmtud2R1amViZmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTY5NzEsImV4cCI6MjA3MDI5Mjk3MX0.Qh3pYcZTVntiGRRVJXDvgY_yXrIniGlJXO_Tq8Euq6M';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 AI Recommendations 테이블 생성 및 데이터 삽입...\n');

async function createAITable() {
  try {
    // 먼저 테이블이 존재하는지 확인
    console.log('🔍 기존 테이블 확인 중...');
    const { data: existingData, error: existingError } = await supabase
      .from('ai_recommendations')
      .select('count');

    if (!existingError) {
      console.log('✅ ai_recommendations 테이블이 이미 존재합니다!');
      console.log(`📊 현재 레코드 수: ${existingData?.length || 0}`);
      return;
    }

    console.log('🔧 테이블이 존재하지 않습니다. 생성을 위해 관리자 권한이 필요합니다.');
    console.log('💡 해결 방법:');
    console.log('   1. Supabase 대시보드 SQL 편집기에서 다음 SQL 실행:');
    console.log('\n-- AI 인사이트 추천 테이블 생성');
    console.log('create table if not exists public.ai_recommendations (');
    console.log('  id bigint generated always as identity primary key,');
    console.log('  title text not null,');
    console.log('  description text not null,');
    console.log('  priority text not null default \'medium\',');
    console.log('  category text not null,');
    console.log('  confidence numeric not null default 0,');
    console.log('  updated_at timestamptz not null default now()');
    console.log(');');
    console.log('');
    console.log('-- RLS 정책 추가');
    console.log('alter table public.ai_recommendations enable row level security;');
    console.log('create policy ai_recommendations_select_public on public.ai_recommendations');
    console.log('  for select using (true);');
    console.log('');
    console.log('-- 샘플 데이터 삽입');
    console.log('insert into public.ai_recommendations (title, description, priority, category, confidence) values');
    console.log('  (\'콘텐츠 최적화\', \'썸네일에 가격 정보 포함 시 CTR 23% 증가\', \'high\', \'콘텐츠\', 85),');
    console.log('  (\'상품 조합\', \'무선이어폰 + 스마트워치 번들 추천\', \'medium\', \'상품\', 70),');
    console.log('  (\'타겟 오디언스\', \'25-34세 여성층 대상 뷰티 제품 집중 공략\', \'high\', \'타겟팅\', 90),');
    console.log('  (\'업로드 시간\', \'저녁 7-9시 업로드 시 조회수 35% 상승\', \'high\', \'콘텐츠\', 88),');
    console.log('  (\'가격대 전략\', \'5-10만원 가격대 제품이 최적 수익률 달성\', \'medium\', \'상품\', 75),');
    console.log('  (\'콘텐츠 길이\', \'8-12분 길이의 리뷰 영상이 가장 높은 참여율\', \'medium\', \'콘텐츠\', 82);');

    console.log('\n🌐 Supabase 대시보드 링크: https://supabase.com/dashboard/projects');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

// 스크립트 실행
createAITable();