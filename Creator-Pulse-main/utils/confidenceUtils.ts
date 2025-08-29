// Confidence Score Utility Functions

interface ConfidenceLevel {
  score: number;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const getConfidenceLevel = (score: number): ConfidenceLevel => {
  if (score >= 95) {
    return {
      score,
      label: '매우 높음',
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    };
  } else if (score >= 90) {
    return {
      score,
      label: '높음',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    };
  } else if (score >= 85) {
    return {
      score,
      label: '보통',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    };
  } else {
    return {
      score,
      label: '낮음',
      color: 'text-gray-700',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    };
  }
};

export const generateDynamicConfidence = (
  baseScore: number = 90,
  variance: number = 5
): number => {
  const adjustment = Math.floor(Math.random() * (variance * 2 + 1)) - variance;
  return Math.min(99, Math.max(80, baseScore + adjustment));
};

export const formatConfidenceDisplay = (score: number): string => {
  return `${Math.round(score)}% 신뢰도`;
};

export const getCompetitionLevel = (views: number): string => {
  if (views < 50000) return '낮음';
  if (views < 200000) return '보통';
  return '높음';
};

export const calculateExpectedRevenue = (
  views: number,
  category: string
): number => {
  const categoryMultipliers: Record<string, number> = {
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
};

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    'high': 'bg-red-100 text-red-700 border-red-200',
    '높음': 'bg-red-100 text-red-700 border-red-200',
    'medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    '중간': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'low': 'bg-gray-100 text-gray-700 border-gray-200',
    '낮음': 'bg-gray-100 text-gray-700 border-gray-200'
  };
  
  return colors[priority] || colors['medium'];
};