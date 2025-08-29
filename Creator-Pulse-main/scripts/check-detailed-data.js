import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function checkDetailedData() {
  console.log('🔍 Creator Pulse 상세 데이터 확인...\n');

  try {
    // Market Insights 상세 데이터 확인
    console.log('📊 Market Insights 상세 데이터:');
    const { data: insights, error: insightsError } = await supabase
      .from('market_insights')
      .select('*')
      .order('id');
    
    if (insightsError) {
      console.log('❌ Market Insights 조회 실패:', insightsError.message);
    } else if (insights?.length) {
      insights.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.title}`);
        console.log(`      설명: ${item.description}`);
        console.log(`      카테고리: ${item.category}`);
        console.log(`      신뢰도: ${item.confidence}%`);
        console.log(`      기간: ${item.timeframe}\n`);
      });
    }

    // Trend Items 상세 데이터 확인
    console.log('📈 Trend Items 상세 데이터:');
    const { data: trends, error: trendsError } = await supabase
      .from('trend_items')
      .select('*')
      .order('id');
    
    if (trendsError) {
      console.log('❌ Trend Items 조회 실패:', trendsError.message);
    } else if (trends?.length) {
      trends.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.title}`);
        console.log(`      카테고리: ${item.category || item.category_name}`);
        console.log(`      성장률: ${item.growth}%`);
        console.log(`      조회수: ${item.views?.toLocaleString()}`);
        console.log(`      수익: ₩${item.revenue?.toLocaleString()}\n`);
      });
    }

  } catch (error) {
    console.error('❌ 데이터 확인 중 오류:', error.message);
  }
}

checkDetailedData();