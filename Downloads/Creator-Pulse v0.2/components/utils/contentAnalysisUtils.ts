// 콘텐츠 분석 유틸리티 함수들

export const getSortedContent = (contentData: any[], sortBy: string) => {
  const sorted = [...contentData];
  switch (sortBy) {
    case "views":
      return sorted.sort((a, b) => parseFloat(b.views.replace(/[^0-9.]/g, "")) - parseFloat(a.views.replace(/[^0-9.]/g, "")));
    case "conversion":
      return sorted.sort((a, b) => b.conversionRate - a.conversionRate);
    case "revenue":
      return sorted.sort((a, b) => parseFloat(b.revenue.replace(/[^0-9]/g, "")) - parseFloat(a.revenue.replace(/[^0-9]/g, "")));
    default:
      return sorted.sort((a, b) => b.score - a.score);
  }
};

export const getOverallInsights = (contentData: any[]) => {
  if (!contentData.length) return [];
  
  const avgConversion = contentData.reduce((sum, item) => sum + item.conversionRate, 0) / contentData.length;
  const topPerformer = contentData.reduce((max, item) => item.score > max.score ? item : max, contentData[0]);
  
  return [
    `평균 전환율 ${avgConversion.toFixed(1)}%로 업계 평균 대비 68% 높음`,
    `"${topPerformer?.creator}" 크리에이터가 가장 높은 성과 달성`,
    `리뷰와 비교분석 콘텐츠가 전환율 상위권 독점`,
    `언박싱 콘텐츠는 참여도가 높지만 전환율은 중간 수준`,
    `장기 사용 후기 콘텐츠의 신뢰도가 구매 결정에 큰 영향`
  ];
};

export const getOverviewStats = () => ({
  totalViews: "12.3M",
  avgConversion: "6.8%",
  totalRevenue: "₩1.2B",
  avgScore: "8.1"
});

export const getContentTypeDistribution = () => [
  { type: "리뷰 & 분석", percentage: 40 },
  { type: "언박싱 & 첫인상", percentage: 25 },
  { type: "사용법 & 팁", percentage: 20 },
  { type: "기타", percentage: 15 }
];

export const getSuccessFactors = () => [
  "상세한 제품 분석과 솔직한 후기",
  "시각적 요소와 실제 사용 장면", 
  "경쟁제품과의 객관적 비교"
];

export const getImprovementSuggestions = () => [
  "썸네일 클릭률 개선 필요",
  "댓글 참여도 향상 방안 필요",
  "콘텐츠 길이 최적화 검토"
];