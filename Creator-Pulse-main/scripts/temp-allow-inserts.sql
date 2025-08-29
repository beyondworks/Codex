-- 임시로 INSERT 권한을 허용하는 RLS 정책 추가

-- Dashboard KPIs 테이블에 임시 INSERT 정책 추가
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_dashboard_kpis_insert' 
    AND tablename = 'dashboard_kpis'
  ) THEN
    CREATE POLICY temp_dashboard_kpis_insert ON public.dashboard_kpis
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Trend Items 테이블에 임시 INSERT 정책 추가
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_trend_items_insert' 
    AND tablename = 'trend_items'
  ) THEN
    CREATE POLICY temp_trend_items_insert ON public.trend_items
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Popular Categories 테이블에 임시 INSERT 정책 추가
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_popular_categories_insert' 
    AND tablename = 'popular_categories'
  ) THEN
    CREATE POLICY temp_popular_categories_insert ON public.popular_categories
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Popular Products 테이블에 임시 INSERT 정책 추가
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_popular_products_insert' 
    AND tablename = 'popular_products'
  ) THEN
    CREATE POLICY temp_popular_products_insert ON public.popular_products
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Market Insights 테이블에 임시 INSERT 정책 추가
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_market_insights_insert' 
    AND tablename = 'market_insights'
  ) THEN
    CREATE POLICY temp_market_insights_insert ON public.market_insights
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- AI Recommendations 테이블에 임시 INSERT 정책 추가
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_ai_recommendations_insert' 
    AND tablename = 'ai_recommendations'
  ) THEN
    CREATE POLICY temp_ai_recommendations_insert ON public.ai_recommendations
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- 임시로 DELETE 권한도 허용 (기존 데이터 정리용)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_dashboard_kpis_delete' 
    AND tablename = 'dashboard_kpis'
  ) THEN
    CREATE POLICY temp_dashboard_kpis_delete ON public.dashboard_kpis
      FOR DELETE USING (true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_trend_items_delete' 
    AND tablename = 'trend_items'
  ) THEN
    CREATE POLICY temp_trend_items_delete ON public.trend_items
      FOR DELETE USING (true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_popular_categories_delete' 
    AND tablename = 'popular_categories'
  ) THEN
    CREATE POLICY temp_popular_categories_delete ON public.popular_categories
      FOR DELETE USING (true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_popular_products_delete' 
    AND tablename = 'popular_products'
  ) THEN
    CREATE POLICY temp_popular_products_delete ON public.popular_products
      FOR DELETE USING (true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_market_insights_delete' 
    AND tablename = 'market_insights'
  ) THEN
    CREATE POLICY temp_market_insights_delete ON public.market_insights
      FOR DELETE USING (true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'temp_ai_recommendations_delete' 
    AND tablename = 'ai_recommendations'
  ) THEN
    CREATE POLICY temp_ai_recommendations_delete ON public.ai_recommendations
      FOR DELETE USING (true);
  END IF;
END $$;