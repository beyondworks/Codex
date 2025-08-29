-- 샘플 데이터 삽입 (기존 테이블들)

-- Dashboard KPIs 샘플 데이터
INSERT INTO public.dashboard_kpis (title, value, change, color, bg_color, icon) VALUES
  ('총 조회수', '2.5M', '+12.5%', 'text-blue-600', 'bg-blue-50', 'Eye'),
  ('수익률', '8.2%', '+2.3%', 'text-green-600', 'bg-green-50', 'TrendingUp'),
  ('참여율', '95%', '+5.1%', 'text-orange-600', 'bg-orange-50', 'Users'),
  ('성장점수', '9.1/10', '+0.8', 'text-purple-600', 'bg-purple-50', 'Star')
ON CONFLICT DO NOTHING;

-- Trend Items 샘플 데이터
INSERT INTO public.trend_items (title, category, growth, views, revenue, trend, video_id, thumbnail_url, channel_title) VALUES
  ('iPhone 15 Pro 완벽 리뷰', '전자제품', 25.6, 1200000, 850000, 'up', 'abc123', 'https://picsum.photos/300/200?random=1', '테크리뷰'),
  ('겨울 캠핑용품 추천', '캠핑용품', 18.3, 890000, 620000, 'up', 'def456', 'https://picsum.photos/300/200?random=2', '캠핑마스터'),
  ('홈트레이닝 필수템', '운동용품', 22.1, 750000, 480000, 'up', 'ghi789', 'https://picsum.photos/300/200?random=3', '홈트마니아'),
  ('게이밍 키보드 비교', '게이밍', 15.7, 980000, 720000, 'up', 'jkl012', 'https://picsum.photos/300/200?random=4', '게임기어'),
  ('뷰티 신상품 리뷰', '뷰티', 28.9, 1450000, 920000, 'up', 'mno345', 'https://picsum.photos/300/200?random=5', '뷰티구루')
ON CONFLICT DO NOTHING;

-- Popular Categories 샘플 데이터
INSERT INTO public.popular_categories (name, share, change, color) VALUES
  ('전자제품', 32, 12.5, 'bg-blue-500'),
  ('뷰티', 28, 8.3, 'bg-pink-500'),
  ('패션', 18, -2.1, 'bg-purple-500'),
  ('생활용품', 12, 5.6, 'bg-green-500'),
  ('운동용품', 10, 15.2, 'bg-orange-500')
ON CONFLICT DO NOTHING;

-- Popular Products 샘플 데이터
INSERT INTO public.popular_products (title, price, rating, sales, growth, creator, image_url, rank) VALUES
  ('에어�팟 프로 3세대', 350000, 4.8, 15000, 23.5, '테크리뷰어', 'https://picsum.photos/200/200?random=10', 1),
  ('다이슨 에어랩', 750000, 4.9, 8500, 18.2, '뷰티인플루언서', 'https://picsum.photos/200/200?random=11', 2),
  ('로지텍 MX 마스터', 120000, 4.7, 12000, 15.8, '테크마스터', 'https://picsum.photos/200/200?random=12', 3),
  ('아이폰 15 프로', 1500000, 4.6, 25000, 32.1, '모바일리뷰', 'https://picsum.photos/200/200?random=13', 4),
  ('맥북 에어 M3', 1800000, 4.8, 6500, 28.7, '애플전문가', 'https://picsum.photos/200/200?random=14', 5)
ON CONFLICT DO NOTHING;

-- Market Insights 샘플 데이터
INSERT INTO public.market_insights (title, description, confidence, timeframe, category) VALUES
  ('전자제품 시장 급성장', 'Q4 전자제품 카테고리가 전년 대비 35% 성장하며 가장 높은 상승률 기록', 92, '이번 분기', '시장분석'),
  ('숏폼 콘텐츠 효과', '60초 이하 숏폼 콘텐츠가 일반 리뷰보다 2.3배 높은 전환율 달성', 87, '지난 달', '콘텐츠'),
  ('프리미엄 제품 선호도 증가', '10만원 이상 고가 제품에 대한 관심도가 28% 상승', 83, '최근 2주', '소비패턴'),
  ('라이브 커머스 성장', '실시간 라이브 쇼핑이 일반 영상 대비 3.5배 높은 매출 창출', 95, '이번 주', '판매채널')
ON CONFLICT DO NOTHING;