-- 임시 RLS 정책들 제거

-- Dashboard KPIs 임시 정책 제거
DROP POLICY IF EXISTS temp_dashboard_kpis_insert ON public.dashboard_kpis;
DROP POLICY IF EXISTS temp_dashboard_kpis_delete ON public.dashboard_kpis;

-- Trend Items 임시 정책 제거
DROP POLICY IF EXISTS temp_trend_items_insert ON public.trend_items;
DROP POLICY IF EXISTS temp_trend_items_delete ON public.trend_items;

-- Popular Categories 임시 정책 제거
DROP POLICY IF EXISTS temp_popular_categories_insert ON public.popular_categories;
DROP POLICY IF EXISTS temp_popular_categories_delete ON public.popular_categories;

-- Popular Products 임시 정책 제거
DROP POLICY IF EXISTS temp_popular_products_insert ON public.popular_products;
DROP POLICY IF EXISTS temp_popular_products_delete ON public.popular_products;

-- Market Insights 임시 정책 제거
DROP POLICY IF EXISTS temp_market_insights_insert ON public.market_insights;
DROP POLICY IF EXISTS temp_market_insights_delete ON public.market_insights;

-- AI Recommendations 임시 정책 제거
DROP POLICY IF EXISTS temp_ai_recommendations_insert ON public.ai_recommendations;
DROP POLICY IF EXISTS temp_ai_recommendations_delete ON public.ai_recommendations;