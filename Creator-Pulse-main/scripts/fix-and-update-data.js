import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function fixAndUpdateData() {
  console.log('🔧 Creator Pulse - 스키마 수정 및 쇼핑 데이터 업데이트...\n');

  try {
    // 1. 쇼핑 중심의 트렌드 아이템으로 교체 (category_name 제거)
    console.log('📈 쇼핑 중심 트렌드 아이템 업데이트...');
    
    const shoppingTrendItems = [
      {
        title: '2024 최신 무선 이어폰 완벽 리뷰 & 언박싱',
        category: '전자제품',
        growth: 145.2,
        views: 2400000,
        revenue: 184000000,
        trend: 'up',
        video_id: 'earpod2024',
        thumbnail_url: '/thumbnails/earphone.jpg',
        channel_title: '테크리뷰어',
        updated_at: new Date().toISOString()
      },
      {
        title: '겨울 패션 하울 & 코디 추천 LOOKBOOK',
        category: '패션뷰티',
        growth: 234.8,
        views: 3200000,
        revenue: 158000000,
        trend: 'up',
        video_id: 'winter2024',
        thumbnail_url: '/thumbnails/fashion.jpg',
        channel_title: '패션인플루언서',
        updated_at: new Date().toISOString()
      },
      {
        title: '홈트레이닝 필수템 TOP10 장비 리뷰',
        category: '운동헬스',
        growth: 189.7,
        views: 1850000,
        revenue: 95000000,
        trend: 'up',
        video_id: 'fitness2024',
        thumbnail_url: '/thumbnails/fitness.jpg',
        channel_title: '헬스코치',
        updated_at: new Date().toISOString()
      },
      {
        title: '스마트워치 5종 비교 리뷰 | 가성비 최고는?',
        category: '전자제품',
        growth: 167.9,
        views: 2150000,
        revenue: 203000000,
        trend: 'up',
        video_id: 'watch2024',
        thumbnail_url: '/thumbnails/smartwatch.jpg',
        channel_title: '가젯리뷰어',
        updated_at: new Date().toISOString()
      },
      {
        title: '뷰티 신상품 하울 | 올겨울 메이크업 트렌드',
        category: '뷰티',
        growth: 78.3,
        views: 1680000,
        revenue: 127000000,
        trend: 'up',
        video_id: 'beauty2024',
        thumbnail_url: '/thumbnails/beauty.jpg',
        channel_title: '뷰티크리에이터',
        updated_at: new Date().toISOString()
      }
    ];

    // 기존 데이터 삭제
    const { error: deleteError } = await supabase
      .from('trend_items')
      .delete()
      .neq('id', 0);

    if (deleteError) {
      console.log('⚠️  기존 트렌드 데이터 삭제 중 오류:', deleteError.message);
    } else {
      console.log('✅ 기존 트렌드 데이터 삭제 완료');
    }

    // 새 데이터 삽입 (ID 없이 - auto increment)
    const { data: insertedTrends, error: insertError } = await supabase
      .from('trend_items')
      .insert(shoppingTrendItems)
      .select();
    
    if (insertError) {
      console.log('❌ 트렌드 아이템 삽입 실패:', insertError.message);
    } else {
      console.log(`✅ ${insertedTrends?.length || 0}개 트렌드 아이템 업데이트 성공`);
    }

    // 2. 쇼핑 중심 마켓 인사이트 업데이트 (ID 제거)
    console.log('\n💡 쇼핑 중심 마켓 인사이트 업데이트...');
    
    const shoppingInsights = [
      {
        title: '연말 시즌 전자제품 특수',
        description: '연말 선물 시즌으로 무선 이어폰, 스마트워치 등 전자제품 검색량 67% 증가. 지금이 전자제품 리뷰 콘텐츠 최적 시점',
        category: '전자제품',
        confidence: 94.5,
        timeframe: '3주',
        updated_at: new Date().toISOString()
      },
      {
        title: '겨울 패션 하울 골든타임',
        description: '아우터, 니트 등 겨울 패션 아이템 구매 욕구 최고조. 패션 하울 콘텐츠 조회수 평균 2.3배 상승',
        category: '패션',
        confidence: 91.2,
        timeframe: '2개월',
        updated_at: new Date().toISOString()
      },
      {
        title: '홈트레이닝 시장 지속 성장',
        description: '홈트레이닝 장비 시장 전년 대비 45% 성장. 운동기구 리뷰 콘텐츠 수익성 높음',
        category: '운동헬스',
        confidence: 88.7,
        timeframe: '6개월',
        updated_at: new Date().toISOString()
      },
      {
        title: '뷰티 신상품 론칭 시즌',
        description: '12월-2월 뷰티 브랜드 신상품 집중 출시 시기. 뷰티 하울 및 리뷰 콘텐츠 협찬 기회 증가',
        category: '뷰티',
        confidence: 86.3,
        timeframe: '3개월',
        updated_at: new Date().toISOString()
      }
    ];

    // 기존 인사이트 삭제
    const { error: deleteInsightsError } = await supabase
      .from('market_insights')
      .delete()
      .neq('id', 0);

    if (deleteInsightsError) {
      console.log('⚠️  기존 인사이트 삭제 중 오류:', deleteInsightsError.message);
    } else {
      console.log('✅ 기존 인사이트 데이터 삭제 완료');
    }

    // 새 인사이트 삽입
    const { data: insertedInsights, error: insightError } = await supabase
      .from('market_insights')
      .insert(shoppingInsights)
      .select();
    
    if (insightError) {
      console.log('❌ 마켓 인사이트 삽입 실패:', insightError.message);
    } else {
      console.log(`✅ ${insertedInsights?.length || 0}개 마켓 인사이트 업데이트 성공`);
    }

    console.log('\n🎉 쇼핑 중심 데이터 업데이트 완료!');
    console.log('🔄 브라우저를 새로고침하여 변경사항을 확인해주세요.');
    console.log('\n📝 업데이트된 내용:');
    console.log('   - 라이프스타일/요리 콘텐츠 → 쇼핑/리뷰 콘텐츠로 변경');
    console.log('   - 구체적이고 실행 가능한 인사이트로 개선');
    console.log('   - 크리에이터가 활용할 수 있는 실질적인 정보 제공');

  } catch (error) {
    console.error('❌ 데이터 업데이트 중 오류:', error.message);
  }
}

fixAndUpdateData();