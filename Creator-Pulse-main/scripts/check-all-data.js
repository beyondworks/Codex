import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 환경변수 로드
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rovkcrtpnknwdujebfca.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvdmtjcnRwbmtud2R1amViZmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTY5NzEsImV4cCI6MjA3MDI5Mjk3MX0.Qh3pYcZTVntiGRRVJXDvgY_yXrIniGlJXO_Tq8Euq6M';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Creator Pulse 데이터베이스 전체 상태 확인...\n');

async function checkAllData() {
  const tables = [
    { name: 'dashboard_kpis', icon: '📊', description: 'Dashboard KPIs' },
    { name: 'trend_items', icon: '📈', description: 'Trend Items' },
    { name: 'popular_categories', icon: '🏷️', description: 'Popular Categories' },
    { name: 'popular_products', icon: '🛍️', description: 'Popular Products' },
    { name: 'market_insights', icon: '💡', description: 'Market Insights' },
    { name: 'ai_recommendations', icon: '🤖', description: 'AI Recommendations' }
  ];

  let allTablesHaveData = true;
  let totalRecords = 0;

  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table.name)
        .select('*', { count: 'exact' });

      if (error) {
        console.log(`❌ ${table.icon} ${table.description}: 조회 실패 - ${error.message}`);
        allTablesHaveData = false;
      } else {
        const recordCount = count || 0;
        totalRecords += recordCount;
        
        if (recordCount > 0) {
          console.log(`✅ ${table.icon} ${table.description}: ${recordCount}개 레코드`);
          // 첫 번째 레코드의 예시 보기
          if (data && data.length > 0) {
            const sample = data[0];
            const sampleKeys = Object.keys(sample).slice(0, 3); // 첫 3개 컬럼만
            const sampleData = sampleKeys.map(key => `${key}: "${sample[key]}"`).join(', ');
            console.log(`   예시: ${sampleData}...`);
          }
        } else {
          console.log(`⚠️  ${table.icon} ${table.description}: 데이터 없음`);
          allTablesHaveData = false;
        }
      }
    } catch (err) {
      console.log(`❌ ${table.icon} ${table.description}: 오류 - ${err.message}`);
      allTablesHaveData = false;
    }
  }

  console.log(`\n📊 전체 요약:`);
  console.log(`   총 레코드 수: ${totalRecords}`);
  console.log(`   모든 테이블에 데이터 존재: ${allTablesHaveData ? '✅ 예' : '❌ 아니오'}`);
  
  if (allTablesHaveData && totalRecords > 0) {
    console.log(`\n🎉 모든 테이블에 데이터가 있습니다!`);
    console.log(`💫 실시간 데이터 연동이 정상적으로 작동할 준비가 되었습니다.`);
  } else {
    console.log(`\n⚠️  일부 테이블에 데이터가 없습니다.`);
    console.log(`🔧 추가 데이터 입력이 필요할 수 있습니다.`);
  }
}

// 스크립트 실행
checkAllData();