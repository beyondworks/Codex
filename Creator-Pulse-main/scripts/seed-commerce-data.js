// Realistic Commerce Platform Seed Data Script
// This script generates appropriate commerce and creator content data

const commerceCategories = [
  { id: 'tech', name: '전자제품', growth: 32.5, confidence: 96 },
  { id: 'beauty', name: '뷰티/화장품', growth: 28.3, confidence: 94 },
  { id: 'fashion', name: '패션/의류', growth: 22.1, confidence: 92 },
  { id: 'home', name: '홈/리빙', growth: 18.7, confidence: 93 },
  { id: 'sports', name: '스포츠/헬스', growth: 26.4, confidence: 95 },
  { id: 'food', name: '식품/건강식품', growth: 19.8, confidence: 91 },
  { id: 'camping', name: '캠핑/아웃도어', growth: 24.2, confidence: 94 },
  { id: 'gaming', name: '게이밍 기어', growth: 35.6, confidence: 97 }
];

const trendingProducts = [
  {
    title: '갤럭시 버즈3 프로 완벽 리뷰',
    category: '전자제품',
    product: '삼성 갤럭시 버즈3 프로',
    growth: 45.2,
    views: 328000,
    revenue: 1250000,
    confidence: 98,
    competitionLevel: '보통'
  },
  {
    title: '아이폰 15 프로 맥스 언박싱',
    category: '전자제품',
    product: 'Apple iPhone 15 Pro Max',
    growth: 38.7,
    views: 512000,
    revenue: 2100000,
    confidence: 97,
    competitionLevel: '높음'
  },
  {
    title: '롬앤 글래스팅 워터틴트 전색상 리뷰',
    category: '뷰티/화장품',
    product: '롬앤 글래스팅 워터틴트',
    growth: 52.3,
    views: 425000,
    revenue: 980000,
    confidence: 96,
    competitionLevel: '낮음'
  },
  {
    title: '다이슨 에어랩 스타일러 6개월 사용기',
    category: '뷰티/가전',
    product: '다이슨 에어랩 스타일러',
    growth: 29.8,
    views: 289000,
    revenue: 1850000,
    confidence: 95,
    competitionLevel: '보통'
  },
  {
    title: '나이키 에어맥스 2024 신상 리뷰',
    category: '패션/신발',
    product: '나이키 에어맥스 2024',
    growth: 33.1,
    views: 195000,
    revenue: 890000,
    confidence: 93,
    competitionLevel: '높음'
  },
  {
    title: '캠핑 입문자 필수템 TOP 10',
    category: '캠핑/아웃도어',
    product: '코베아 캠핑 세트',
    growth: 41.5,
    views: 267000,
    revenue: 1120000,
    confidence: 94,
    competitionLevel: '낮음'
  },
  {
    title: '홈트레이닝 덤벨 세트 추천',
    category: '스포츠/헬스',
    product: '파워텍 가변 덤벨',
    growth: 36.2,
    views: 178000,
    revenue: 760000,
    confidence: 92,
    competitionLevel: '보통'
  },
  {
    title: 'LG 그램 17인치 2024 실사용 리뷰',
    category: '전자제품',
    product: 'LG 그램 17Z90S',
    growth: 28.9,
    views: 234000,
    revenue: 1680000,
    confidence: 96,
    competitionLevel: '높음'
  }
];

const marketInsights = [
  {
    title: '전자제품 카테고리 급성장 중',
    description: '최근 AI 기능이 탑재된 전자제품들이 큰 인기를 끌며 평균 32% 성장률을 기록하고 있습니다.',
    confidence: 96,
    timeframe: '최근 30일',
    category: '트렌드 분석',
    priority: 'high'
  },
  {
    title: '뷰티 디바이스 시장 확대',
    description: '홈케어 트렌드와 함께 LED 마스크, 고주파 기기 등 뷰티 디바이스 시장이 28% 성장했습니다.',
    confidence: 94,
    timeframe: '최근 2주',
    category: '시장 동향',
    priority: 'high'
  },
  {
    title: '캠핑용품 비수기 대비 전략',
    description: '겨울 시즌 접근에 따라 캠핑용품 수요가 감소 예상. 동계 캠핑 특화 콘텐츠 준비 필요.',
    confidence: 93,
    timeframe: '향후 60일',
    category: '시즌 분석',
    priority: 'medium'
  },
  {
    title: '건강식품 규제 강화 주의',
    description: '식약처 건강기능식품 광고 규제 강화. 과장 광고 주의 및 인증 마크 확인 필수.',
    confidence: 98,
    timeframe: '즉시 적용',
    category: '규제 업데이트',
    priority: 'high'
  },
  {
    title: '게이밍 기어 신제품 출시 러시',
    description: '주요 브랜드들의 신제품 출시가 집중되는 시기. 비교 리뷰 콘텐츠 수요 증가 예상.',
    confidence: 95,
    timeframe: '향후 30일',
    category: '제품 출시',
    priority: 'medium'
  }
];

const aiRecommendations = [
  {
    title: '무선 이어폰 비교 콘텐츠 제작',
    description: '갤럭시 버즈 vs 에어팟 프로 비교 영상으로 높은 조회수 예상',
    priority: 'high',
    expectedRevenue: 1500000,
    confidence: 97
  },
  {
    title: '뷰티 루틴 시리즈 기획',
    description: '아침/저녁 스킨케어 루틴 시리즈로 구독자 증가 효과',
    priority: 'medium',
    expectedRevenue: 850000,
    confidence: 93
  },
  {
    title: '가성비 제품 TOP 5 콘텐츠',
    description: '카테고리별 가성비 제품 추천으로 신뢰도 구축',
    priority: 'high',
    expectedRevenue: 920000,
    confidence: 94
  },
  {
    title: '라이브 커머스 시작하기',
    description: '실시간 소통으로 구매 전환율 40% 향상 가능',
    priority: 'medium',
    expectedRevenue: 1200000,
    confidence: 92
  }
];

// Export functions for database seeding
const seedData = {
  commerceCategories,
  trendingProducts,
  marketInsights,
  aiRecommendations,
  
  // Function to generate dynamic confidence scores
  generateConfidence: (baseScore = 90) => {
    return Math.min(99, Math.max(85, baseScore + Math.floor(Math.random() * 10) - 5));
  },
  
  // Function to calculate expected revenue
  calculateRevenue: (views, category) => {
    const categoryMultipliers = {
      '전자제품': 3.2,
      '뷰티/화장품': 2.3,
      '패션/의류': 2.1,
      '홈/리빙': 2.5,
      '스포츠/헬스': 2.2,
      '식품/건강식품': 1.9,
      '캠핑/아웃도어': 2.8,
      '게이밍 기어': 3.5
    };
    const multiplier = categoryMultipliers[category] || 2.0;
    return Math.round(views * multiplier);
  }
};

// SQL statements for database seeding
const sqlStatements = `
-- Update trend_items table with realistic commerce data
UPDATE trend_items SET 
  title = '갤럭시 버즈3 프로 완벽 리뷰',
  category = '전자제품',
  growth = 45.2,
  confidence = 98
WHERE title LIKE '%라떼%' OR title LIKE '%커피%';

-- Add confidence column if not exists
ALTER TABLE market_insights 
ADD COLUMN IF NOT EXISTS confidence DECIMAL(5,2) DEFAULT 95.0;

-- Update market insights with proper confidence scores
UPDATE market_insights 
SET confidence = 90 + (RANDOM() * 9)
WHERE confidence IS NULL;

-- Insert new realistic commerce insights
INSERT INTO market_insights (title, description, confidence, timeframe, category, created_at, updated_at)
VALUES 
  ('전자제품 카테고리 급성장 중', '최근 AI 기능이 탑재된 전자제품들이 큰 인기를 끌며 평균 32% 성장률을 기록하고 있습니다.', 96, '최근 30일', '트렌드 분석', NOW(), NOW()),
  ('뷰티 디바이스 시장 확대', '홈케어 트렌드와 함께 LED 마스크, 고주파 기기 등 뷰티 디바이스 시장이 28% 성장했습니다.', 94, '최근 2주', '시장 동향', NOW(), NOW())
ON CONFLICT DO NOTHING;
`;

// Export for use in application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { seedData, sqlStatements };
}

console.log('Seed data script created successfully');
console.log('Use the sqlStatements to update your database');
console.log('Commerce categories:', commerceCategories.length);
console.log('Trending products:', trendingProducts.length);
console.log('Market insights:', marketInsights.length);
console.log('AI recommendations:', aiRecommendations.length);