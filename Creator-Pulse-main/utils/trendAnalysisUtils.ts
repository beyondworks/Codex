// 트렌드 분석에서 사용하는 유틸리티 함수들

export const formatNumber = (num: number, decimals: number = 1): string => {
  return Number(num.toFixed(decimals)).toString();
};

export const formatPercentage = (num: number): string => {
  return `${formatNumber(num, 1)}%`;
};

export const formatGrowth = (num: number): string => {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${formatNumber(num, 1)}%`;
};

// 페이지네이션 헬퍼 함수들
export const getPaginatedItems = (items: any[], page: number, itemsPerPage: number) => {
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
};

export const getTotalPages = (items: any[], itemsPerPage: number) => {
  return Math.ceil(items.length / itemsPerPage);
};

// 화면 크기에 따른 itemsPerPage 계산
export const calculateItemsPerPage = () => {
  const width = window.innerWidth;
  if (width >= 1536) { // 2xl
    return 15; // 5열 x 3행
  } else if (width >= 1280) { // xl
    return 12; // 4열 x 3행
  } else { // lg 이하
    return 9; // 3열 x 3행
  }
};