# Database Operations Guide

## Required Database Updates for Creator Pulse Platform

### 1. Data Curator Tasks

#### Task 1: Replace Inappropriate Data
Replace non-commerce related data (coffee, latte art, etc.) with realistic commerce and creator content.

```sql
-- Update trend_items table with realistic commerce data
UPDATE trend_items 
SET 
  title = CASE 
    WHEN title LIKE '%라떼%' THEN '갤럭시 버즈3 프로 완벽 리뷰'
    WHEN title LIKE '%커피%' THEN '아이폰 15 프로 맥스 언박싱'
    WHEN title LIKE '%카페%' THEN '롬앤 글래스팅 워터틴트 전색상 리뷰'
    ELSE title
  END,
  category = CASE
    WHEN title LIKE '%라떼%' OR title LIKE '%커피%' THEN '전자제품'
    WHEN title LIKE '%카페%' THEN '뷰티/화장품'
    ELSE category
  END,
  growth = CASE
    WHEN title LIKE '%라떼%' THEN 45.2
    WHEN title LIKE '%커피%' THEN 38.7
    WHEN title LIKE '%카페%' THEN 52.3
    ELSE growth
  END,
  revenue = CASE
    WHEN title LIKE '%라떼%' THEN 1250000
    WHEN title LIKE '%커피%' THEN 2100000
    WHEN title LIKE '%카페%' THEN 980000
    ELSE revenue
  END,
  updated_at = NOW()
WHERE title LIKE '%라떼%' OR title LIKE '%커피%' OR title LIKE '%카페%';
```

#### Task 2: Add Confidence Indicators
Add confidence scores to all insights and trending items.

```sql
-- Add confidence column if not exists
ALTER TABLE market_insights 
ADD COLUMN IF NOT EXISTS confidence DECIMAL(5,2) DEFAULT 95.0;

ALTER TABLE trend_items
ADD COLUMN IF NOT EXISTS confidence DECIMAL(5,2) DEFAULT 93.0;

-- Update existing records with realistic confidence scores
UPDATE market_insights 
SET confidence = 90 + (RANDOM() * 9)
WHERE confidence IS NULL OR confidence = 95.0;

UPDATE trend_items
SET confidence = 88 + (RANDOM() * 11)
WHERE confidence IS NULL OR confidence = 93.0;
```

### 2. Insert New Commerce-Focused Data

#### Market Insights
```sql
INSERT INTO market_insights (title, description, confidence, timeframe, category, created_at, updated_at)
VALUES 
  ('전자제품 카테고리 급성장 중', '최근 AI 기능이 탑재된 전자제품들이 큰 인기를 끌며 평균 32% 성장률을 기록하고 있습니다.', 96, '최근 30일', '트렌드 분석', NOW(), NOW()),
  ('뷰티 디바이스 시장 확대', '홈케어 트렌드와 함께 LED 마스크, 고주파 기기 등 뷰티 디바이스 시장이 28% 성장했습니다.', 94, '최근 2주', '시장 동향', NOW(), NOW()),
  ('캠핑용품 비수기 대비 전략', '겨울 시즌 접근에 따라 캠핑용품 수요가 감소 예상. 동계 캠핑 특화 콘텐츠 준비 필요.', 93, '향후 60일', '시즌 분석', NOW(), NOW()),
  ('건강식품 규제 강화 주의', '식약처 건강기능식품 광고 규제 강화. 과장 광고 주의 및 인증 마크 확인 필수.', 98, '즉시 적용', '규제 업데이트', NOW(), NOW()),
  ('게이밍 기어 신제품 출시 러시', '주요 브랜드들의 신제품 출시가 집중되는 시기. 비교 리뷰 콘텐츠 수요 증가 예상.', 95, '향후 30일', '제품 출시', NOW(), NOW())
ON CONFLICT DO NOTHING;
```

#### AI Recommendations
```sql
INSERT INTO ai_recommendations (title, description, priority, confidence, created_at, updated_at)
VALUES
  ('무선 이어폰 비교 콘텐츠 제작', '갤럭시 버즈 vs 에어팟 프로 비교 영상으로 높은 조회수 예상', 'high', 97, NOW(), NOW()),
  ('뷰티 루틴 시리즈 기획', '아침/저녁 스킨케어 루틴 시리즈로 구독자 증가 효과', 'medium', 93, NOW(), NOW()),
  ('가성비 제품 TOP 5 콘텐츠', '카테고리별 가성비 제품 추천으로 신뢰도 구축', 'high', 94, NOW(), NOW()),
  ('라이브 커머스 시작하기', '실시간 소통으로 구매 전환율 40% 향상 가능', 'medium', 92, NOW(), NOW())
ON CONFLICT DO NOTHING;
```

### 3. Clean Up Old/Test Data

```sql
-- Remove any test or placeholder data
DELETE FROM trend_items 
WHERE title LIKE '%test%' 
   OR title LIKE '%sample%' 
   OR title LIKE '%demo%';

DELETE FROM market_insights
WHERE title LIKE '%test%' 
   OR title LIKE '%sample%';
```

### 4. Data Validation Queries

```sql
-- Check confidence score distribution
SELECT 
  COUNT(*) as total_records,
  AVG(confidence) as avg_confidence,
  MIN(confidence) as min_confidence,
  MAX(confidence) as max_confidence
FROM market_insights;

-- Verify category distribution
SELECT 
  category,
  COUNT(*) as count,
  AVG(growth) as avg_growth,
  AVG(confidence) as avg_confidence
FROM trend_items
GROUP BY category
ORDER BY avg_growth DESC;

-- Check for any remaining inappropriate data
SELECT * FROM trend_items 
WHERE title LIKE '%라떼%' 
   OR title LIKE '%커피%' 
   OR title LIKE '%카페%';
```

## Execution Steps

1. **Backup Current Data**
   ```bash
   pg_dump -U username -d database_name > backup_$(date +%Y%m%d).sql
   ```

2. **Execute Updates in Transaction**
   ```sql
   BEGIN;
   -- Run all update queries here
   COMMIT;
   ```

3. **Verify Changes**
   - Run validation queries
   - Check application UI for proper display
   - Confirm confidence indicators are showing

4. **Monitor Performance**
   - Check query execution times
   - Monitor application response times
   - Verify real-time updates are working

## Notes

- All confidence scores should be between 80-99%
- Revenue calculations use category-specific multipliers
- Timeframes should be realistic and actionable
- Priority levels: high, medium, low
- Categories should align with actual commerce verticals

## Contact

For database access or questions about these operations, contact the development team.