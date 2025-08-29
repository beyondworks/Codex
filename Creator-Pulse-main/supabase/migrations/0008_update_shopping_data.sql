-- Creator Pulse - 쇼핑 중심 데이터 업데이트
-- 실행 방법: Supabase Dashboard → SQL Editor → 이 내용 복사 후 실행

-- 1. 기존 부적절한 트렌드 데이터 삭제
DELETE FROM trend_items;

-- 2. 쇼핑 중심 트렌드 아이템 삽입
INSERT INTO trend_items (
  title, category, growth, views, revenue, trend, video_id, thumbnail_url, updated_at
) VALUES 
  ('2024 최신 무선 이어폰 완벽 리뷰 & 언박싱', '전자제품', 145.2, 2400000, 184000000, 'up', 'earpod2024', '/thumbnails/earphone.jpg', NOW()),
  ('겨울 패션 하울 & 코디 추천 LOOKBOOK', '패션뷰티', 234.8, 3200000, 158000000, 'up', 'winter2024', '/thumbnails/fashion.jpg', NOW()),
  ('홈트레이닝 필수템 TOP10 장비 리뷰', '운동헬스', 189.7, 1850000, 95000000, 'up', 'fitness2024', '/thumbnails/fitness.jpg', NOW()),
  ('스마트워치 5종 비교 리뷰 | 가성비 최고는?', '전자제품', 167.9, 2150000, 203000000, 'up', 'watch2024', '/thumbnails/smartwatch.jpg', NOW()),
  ('뷰티 신상품 하울 | 올겨울 메이크업 트렌드', '뷰티', 78.3, 1680000, 127000000, 'up', 'beauty2024', '/thumbnails/beauty.jpg', NOW());

-- 3. 기존 부적절한 마켓 인사이트 삭제
DELETE FROM market_insights;

-- 4. 쇼핑 중심 마켓 인사이트 삽입
INSERT INTO market_insights (
  title, description, category, confidence, timeframe, updated_at
) VALUES 
  ('연말 시즌 전자제품 특수', '연말 선물 시즌으로 무선 이어폰, 스마트워치 등 전자제품 검색량 67% 증가. 지금이 전자제품 리뷰 콘텐츠 최적 시점', '전자제품', 94.5, '3주', NOW()),
  ('겨울 패션 하울 골든타임', '아우터, 니트 등 겨울 패션 아이템 구매 욕구 최고조. 패션 하울 콘텐츠 조회수 평균 2.3배 상승', '패션', 91.2, '2개월', NOW()),
  ('홈트레이닝 시장 지속 성장', '홈트레이닝 장비 시장 전년 대비 45% 성장. 운동기구 리뷰 콘텐츠 수익성 높음', '운동헬스', 88.7, '6개월', NOW()),
  ('뷰티 신상품 론칭 시즌', '12월-2월 뷰티 브랜드 신상품 집중 출시 시기. 뷰티 하울 및 리뷰 콘텐츠 협찬 기회 증가', '뷰티', 86.3, '3개월', NOW());

-- 5. AI 추천 테이블이 없다면 생성 후 데이터 삽입
CREATE TABLE IF NOT EXISTS ai_recommendations (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  confidence DECIMAL(5,2) DEFAULT 50.0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 정책 설정 (필요한 경우)
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON ai_recommendations FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON ai_recommendations FOR INSERT WITH CHECK (true);

-- AI 추천 데이터 삽입
INSERT INTO ai_recommendations (title, description, priority, confidence) VALUES 
  ('전자제품 리뷰 콘텐츠 집중', '연말 시즌 무선 이어폰, 스마트워치 리뷰 콘텐츠 수요 급증. 즉시 제작 권장', 'high', 92.5),
  ('패션 하울 콘텐츠 확대', '겨울 패션 아이템 관심도 최고조. 하울 콘텐츠로 높은 조회수 확보 가능', 'high', 89.3),
  ('홈트레이닝 장비 리뷰', '홈트레이닝 트렌드 지속. 운동기구 리뷰로 안정적 수익 창출', 'medium', 85.7),
  ('뷰티 신상품 리뷰', '브랜드 신상품 출시 시즌. 뷰티 리뷰로 협찬 기회 확보', 'medium', 82.1),
  ('가성비 제품 추천 콘텐츠', '경기 불황으로 가성비 제품 관심 증가. 비교 리뷰 콘텐츠 효과적', 'medium', 78.9),
  ('라이브 쇼핑 콘텐츠', '실시간 쇼핑 참여율 67% 증가. 라이브 커머스 도입 검토', 'low', 75.6);

-- 완료 메시지
SELECT '✅ Creator Pulse 쇼핑 중심 데이터 업데이트 완료!' as status;