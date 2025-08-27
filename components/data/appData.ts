import { Calculator, BarChart3, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase/client";

// 핵심 성과 지표 데이터
export type KpiItem = { title: string; value: string; change: string; color: string; bgColor: string };

export function useKpiStats() {
  const [kpis, setKpis] = useState<KpiItem[]>([]);
  useEffect(() => {
    supabase.from('dashboard_kpis').select('*').order('updated_at', { ascending: false }).limit(8)
      .then(({ data }) => {
        if (data) setKpis(data.map(d => ({ title: d.title, value: d.value, change: d.change, color: d.color, bgColor: d.bg_color })));
      });
  }, []);
  return kpis;
}

// 빠른 액션 데이터
export const quickActions = [
  {
    title: "트렌드 상품 분석",
    description: "지금 가장 핫한 상품들을 확인하고 콘텐츠를 계획하세요",
    icon: TrendingUp,
    color: "text-red-600",
    bgColor: "bg-red-50",
    action: "트렌드 보기",
    targetPage: "trends"
  },
  {
    title: "수익 예측 계산",
    description: "다음 콘텐츠의 예상 수익을 미리 계산해보세요",
    icon: Calculator,
    color: "text-green-600",
    bgColor: "bg-green-50",
    action: "계산하기",
    targetPage: "calculator"
  },
  {
    title: "성과 분석 보고서",
    description: "지난 주 성과를 분석하고 개선점을 찾아보세요",
    icon: BarChart3,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    action: "분석 보기",
    targetPage: "dashboard"
  },
];