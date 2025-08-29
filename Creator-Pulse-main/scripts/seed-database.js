import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 환경변수 로드
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rovkcrtpnknwdujebfca.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvdmtjcnRwbmtud2R1amViZmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTY5NzEsImV4cCI6MjA3MDI5Mjk3MX0.Qh3pYcZTVntiGRRVJXDvgY_yXrIniGlJXO_Tq8Euq6M';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Creator Pulse 데이터베이스 시딩 시작...');

async function seedDatabase() {
  try {
    // RLS 정책을 우회하기 위한 관리자 권한 확인
    console.log('🔑 데이터베이스 권한 확인...');
    
    // 먼저 기존 데이터 확인하고 삭제
    console.log('🗑️ 기존 데이터 정리...');
    await supabase.from('ai_recommendations').delete().neq('id', 0);
    await supabase.from('market_insights').delete().neq('id', 0);
    await supabase.from('popular_products').delete().neq('id', 0);
    await supabase.from('popular_categories').delete().neq('id', 0);
    await supabase.from('trend_items').delete().neq('id', 0);
    await supabase.from('dashboard_kpis').delete().neq('id', 0);

    // 1. Dashboard KPIs 데이터 삽입
    console.log('📊 Dashboard KPIs 데이터 삽입...');
    const { data: kpiData, error: kpiError } = await supabase
      .from('dashboard_kpis')
      .insert([
        {
          title: '총 조회수',
          value: '2.5M',
          change: '+12.5%',
          color: 'text-blue-600',
          bg_color: 'bg-blue-50',
          icon: 'Eye'
        },
        {
          title: '수익률',
          value: '8.2%',
          change: '+2.3%',
          color: 'text-green-600',
          bg_color: 'bg-green-50',
          icon: 'TrendingUp'
        },
        {
          title: '참여율',
          value: '95%',
          change: '+5.1%',
          color: 'text-orange-600',
          bg_color: 'bg-orange-50',
          icon: 'Users'
        },
        {
          title: '성장점수',
          value: '9.1/10',
          change: '+0.8',
          color: 'text-purple-600',
          bg_color: 'bg-purple-50',
          icon: 'Star'
        }
      ]);

    if (kpiError) throw kpiError;
    console.log('✅ Dashboard KPIs 데이터 삽입 완료');

    // 2. Trend Items 데이터 삽입
    console.log('📈 Trend Items 데이터 삽입...');
    const { data: trendData, error: trendError } = await supabase
      .from('trend_items')
      .insert([
        {
          title: 'iPhone 15 Pro 완벽 리뷰',
          category: '전자제품',
          growth: 25.6,
          views: 1200000,
          revenue: 850000,
          trend: 'up'
        },
        {
          title: '겨울 캠핑용품 추천',
          category: '캠핑용품',
          growth: 18.3,
          views: 890000,
          revenue: 620000,
          trend: 'up'
        },
        {
          title: '홈트레이닝 필수템',
          category: '운동용품',
          growth: 22.1,
          views: 750000,
          revenue: 480000,
          trend: 'up'
        },
        {
          title: '게이밍 키보드 비교',
          category: '게이밍',
          growth: 15.7,
          views: 980000,
          revenue: 720000,
          trend: 'up'
        },
        {
          title: '뷰티 신상품 리뷰',
          category: '뷰티',
          growth: 28.9,
          views: 1450000,
          revenue: 920000,
          trend: 'up'
        }
      ]);

    if (trendError) throw trendError;
    console.log('✅ Trend Items 데이터 삽입 완료');

    // 3. Popular Categories 데이터 삽입
    console.log('🏷️ Popular Categories 데이터 삽입...');
    const { data: categoryData, error: categoryError } = await supabase
      .from('popular_categories')
      .insert([
        { name: '전자제품', share: 32, change: 12.5, color: 'bg-blue-500' },
        { name: '뷰티', share: 28, change: 8.3, color: 'bg-pink-500' },
        { name: '패션', share: 18, change: -2.1, color: 'bg-purple-500' },
        { name: '생활용품', share: 12, change: 5.6, color: 'bg-green-500' },
        { name: '운동용품', share: 10, change: 15.2, color: 'bg-orange-500' }
      ]);

    if (categoryError) throw categoryError;
    console.log('✅ Popular Categories 데이터 삽입 완료');

    // 4. Popular Products 데이터 삽입
    console.log('🛍️ Popular Products 데이터 삽입...');
    const { data: productData, error: productError } = await supabase
      .from('popular_products')
      .insert([
        {
          title: '에어팟 프로 3세대',
          price: 350000,
          rating: 4.8,
          sales: 15000,
          growth: 23.5,
          creator: '테크리뷰어',
          image_url: 'https://picsum.photos/200/200?random=10',
          rank: 1
        },
        {
          title: '다이슨 에어랩',
          price: 750000,
          rating: 4.9,
          sales: 8500,
          growth: 18.2,
          creator: '뷰티인플루언서',
          image_url: 'https://picsum.photos/200/200?random=11',
          rank: 2
        },
        {
          title: '로지텍 MX 마스터',
          price: 120000,
          rating: 4.7,
          sales: 12000,
          growth: 15.8,
          creator: '테크마스터',
          image_url: 'https://picsum.photos/200/200?random=12',
          rank: 3
        },
        {
          title: '아이폰 15 프로',
          price: 1500000,
          rating: 4.6,
          sales: 25000,
          growth: 32.1,
          creator: '모바일리뷰',
          image_url: 'https://picsum.photos/200/200?random=13',
          rank: 4
        },
        {
          title: '맥북 에어 M3',
          price: 1800000,
          rating: 4.8,
          sales: 6500,
          growth: 28.7,
          creator: '애플전문가',
          image_url: 'https://picsum.photos/200/200?random=14',
          rank: 5
        }
      ]);

    if (productError) throw productError;
    console.log('✅ Popular Products 데이터 삽입 완료');

    // 5. Market Insights 데이터 삽입
    console.log('💡 Market Insights 데이터 삽입...');
    const { data: insightData, error: insightError } = await supabase
      .from('market_insights')
      .insert([
        {
          title: '전자제품 시장 급성장',
          description: 'Q4 전자제품 카테고리가 전년 대비 35% 성장하며 가장 높은 상승률 기록',
          confidence: 92,
          timeframe: '이번 분기',
          category: '시장분석'
        },
        {
          title: '숏폼 콘텐츠 효과',
          description: '60초 이하 숏폼 콘텐츠가 일반 리뷰보다 2.3배 높은 전환율 달성',
          confidence: 87,
          timeframe: '지난 달',
          category: '콘텐츠'
        },
        {
          title: '프리미엄 제품 선호도 증가',
          description: '10만원 이상 고가 제품에 대한 관심도가 28% 상승',
          confidence: 83,
          timeframe: '최근 2주',
          category: '소비패턴'
        },
        {
          title: '라이브 커머스 성장',
          description: '실시간 라이브 쇼핑이 일반 영상 대비 3.5배 높은 매출 창출',
          confidence: 95,
          timeframe: '이번 주',
          category: '판매채널'
        }
      ]);

    if (insightError) throw insightError;
    console.log('✅ Market Insights 데이터 삽입 완료');

    // 6. AI Recommendations 데이터 삽입
    console.log('🤖 AI Recommendations 데이터 삽입...');
    const { data: aiData, error: aiError } = await supabase
      .from('ai_recommendations')
      .insert([
        {
          title: '콘텐츠 최적화',
          description: '썸네일에 가격 정보 포함 시 CTR 23% 증가',
          priority: 'high',
          category: '콘텐츠',
          confidence: 85
        },
        {
          title: '상품 조합',
          description: '무선이어폰 + 스마트워치 번들 추천',
          priority: 'medium',
          category: '상품',
          confidence: 70
        },
        {
          title: '타겟 오디언스',
          description: '25-34세 여성층 대상 뷰티 제품 집중 공략',
          priority: 'high',
          category: '타겟팅',
          confidence: 90
        },
        {
          title: '업로드 시간',
          description: '저녁 7-9시 업로드 시 조회수 35% 상승',
          priority: 'high',
          category: '콘텐츠',
          confidence: 88
        },
        {
          title: '가격대 전략',
          description: '5-10만원 가격대 제품이 최적 수익률 달성',
          priority: 'medium',
          category: '상품',
          confidence: 75
        },
        {
          title: '콘텐츠 길이',
          description: '8-12분 길이의 리뷰 영상이 가장 높은 참여율',
          priority: 'medium',
          category: '콘텐츠',
          confidence: 82
        }
      ]);

    if (aiError) throw aiError;
    console.log('✅ AI Recommendations 데이터 삽입 완료');

    console.log('\n🎉 모든 데이터 시딩 완료!');
    console.log('💫 이제 웹사이트에서 실시간 데이터를 확인할 수 있습니다.');

  } catch (error) {
    console.error('❌ 데이터 시딩 실패:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
seedDatabase();