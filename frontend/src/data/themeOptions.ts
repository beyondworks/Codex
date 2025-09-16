export interface ThemeOption {
  id: string;
  label: string;
  description: string;
}

export interface AspectRatioOption {
  id: string;
  label: string;
  value: string;
  description: string;
}

export const CAMERA_ANGLES: ThemeOption[] = [
  {
    id: 'eye-level',
    label: 'Eye level',
    description: '사용자 눈높이에서 보는 안정적인 정면 구도',
  },
  {
    id: 'isometric',
    label: 'Isometric',
    description: '입체감을 살린 3/4 시점으로 공간감을 강조',
  },
  {
    id: 'hero',
    label: 'Hero perspective',
    description: '와이드한 히어로 앵글로 극적인 임팩트 연출',
  },
  {
    id: 'top-down',
    label: 'Top down',
    description: '버드 아이뷰로 구성 전체를 한눈에 표현',
  },
];

export const MOOD_OPTIONS: ThemeOption[] = [
  {
    id: 'minimal',
    label: 'Minimal & clean',
    description: '잔잔하고 정돈된 미니멀 무드',
  },
  {
    id: 'vibrant',
    label: 'Vibrant & bold',
    description: '강렬한 색감과 대비로 생동감 강조',
  },
  {
    id: 'serene',
    label: 'Serene & calm',
    description: '은은하고 부드러운 톤의 안정감 있는 무드',
  },
  {
    id: 'futuristic',
    label: 'Futuristic',
    description: '글래스모피즘과 네온 포인트가 살아있는 미래지향',
  },
];

export const LIGHTING_OPTIONS: ThemeOption[] = [
  {
    id: 'daylight',
    label: 'Natural daylight',
    description: '자연광 기반의 부드럽고 균일한 조명',
  },
  {
    id: 'noir',
    label: 'Noir lighting',
    description: '강한 명암 대비로 시네마틱한 분위기',
  },
  {
    id: 'studio',
    label: 'Studio softbox',
    description: '제품이 잘 드러나는 스튜디오 소프트박스 조명',
  },
  {
    id: 'warm',
    label: 'Warm interior glow',
    description: '따뜻한 인도어 조명으로 아늑한 느낌',
  },
];

export const INTERIOR_OPTIONS: ThemeOption[] = [
  {
    id: 'studio',
    label: 'Design studio',
    description: '프로덕트 디자인 스튜디오의 창의적인 분위기',
  },
  {
    id: 'workspace',
    label: 'Product workspace',
    description: '노트와 태블릿이 놓인 작업 공간 연출',
  },
  {
    id: 'lounge',
    label: 'Lounge interior',
    description: '소파와 식물이 어우러진 라운지 인테리어',
  },
  {
    id: 'retail',
    label: 'Retail showroom',
    description: '쇼룸 디스플레이가 있는 프리미엄 공간',
  },
];

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  {
    id: '16-9',
    label: '16:9 와이드',
    value: '16:9',
    description: '히어로 섹션과 대형 디스플레이용 표준 비율',
  },
  {
    id: '4-3',
    label: '4:3 클래식',
    value: '4:3',
    description: '잡지형 레이아웃과 브로슈어 표현에 적합',
  },
  {
    id: '1-1',
    label: '1:1 스퀘어',
    value: '1:1',
    description: 'SNS 카드와 썸네일에 최적화된 정사각형',
  },
  {
    id: '3-2',
    label: '3:2 포스터',
    value: '3:2',
    description: '제품 피쳐 하이라이트에 활용하기 좋은 비율',
  },
  {
    id: '9-16',
    label: '9:16 세로',
    value: '9:16',
    description: '모바일 인스타/숏폼용 세로 콘텐츠',
  },
];

export const DEFAULT_ASPECT_RATIO = '16:9';
