import { Target, ShoppingCart, Image, Clock, BarChart3 } from "lucide-react";
import { WorkflowStep, ScheduleItem } from "./types";

// 공통 가이드 템플릿
const createGuide = (purpose: string, steps: string[], tips: string[], result: string, aiHelp: string) => ({
  purpose,
  steps,
  tips,
  expectedResult: result,
  aiHelp
});

// 공통 서브태스크 가이드 템플릿
const createSubtaskGuide = (description: string, method: string, tip: string) => ({
  description,
  method,
  tip
});

export const initialWorkflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "콘텐츠 전략 수립",
    description: "AI 분석을 통한 맞춤형 콘텐츠 전략 설계",
    icon: Target,
    completed: false,
    tasks: [
      {
        id: "audience-analysis",
        title: "타겟 오디언스 심층 분석",
        description: "AI가 기존 시청자 데이터를 분석하여 핵심 타겟층을 식별하고 페르소나를 생성합니다",
        completed: false,
        required: true,
        estimatedTime: "10분",
        category: "analysis",
        difficulty: "medium" as const,
        aiAssistance: {
          available: true,
          type: "analysis" as const,
          description: "플랫폼 내 통합 데이터 분석을 통해 시청자 프로필을 자동 생성하고 실행 가능한 인사이트를 제공합니다"
        },
        detailedGuide: createGuide(
          "Creator-Pulse 플랫폼에 연동된 모든 데이터를 종합 분석하여 가장 높은 참여도와 구매 전환율을 보이는 핵심 타겟층을 식별합니다.",
          [
            "1. 플랫폼 내 통합 대시보드에서 시청자 데이터 자동 수집",
            "2. AI 분석 엔진을 통한 인구통계학적 패턴 도출",
            "3. 구매 전환이 높은 시청자 세그먼트 자동 식별",
            "4. 데이터 기반 페르소나 자동 생성 및 검증"
          ],
          [
            "💡 플랫폼 내 실시간 데이터를 활용하여 최신 트렌드를 자동으로 반영합니다",
            "🎯 AI가 숨겨진 패턴을 발견하여 놓치기 쉬운 타겟층까지 식별해드립니다",
            "📊 경쟁 채널과 자동 비교하여 차별화 포인트를 즉시 제공합니다"
          ],
          "명확한 타겟 페르소나 3-5개와 각 페르소나별 콘텐츠 전략을 얻게 됩니다. AI 분석을 통해 콘텐츠 기획의 정확도가 평균 40% 향상됩니다.",
          "플랫폼 통합 AI가 복잡한 데이터 분석을 자동화하고, 실시간 업데이트되는 시장 데이터와 연결하여 가장 정확한 타겟 오디언스 프로필을 생성합니다."
        ),
        subtasks: [
          { 
            id: "demo-analysis", 
            title: "통합 인구통계 분석", 
            completed: false,
            guide: createSubtaskGuide(
              "플랫폼에 연동된 모든 채널의 시청자 데이터를 종합하여 완전한 인구통계학적 프로필을 생성합니다.",
              "Creator-Pulse 대시보드 > 오디언스 분석 > '통합 분석 시작' 버튼 클릭으로 자동 실행",
              "💡 여러 플랫폼 데이터를 통합하여 더 정확한 인사이트를 얻을 수 있습니다."
            )
          },
          { 
            id: "behavior-pattern", 
            title: "AI 행동 패턴 분석", 
            completed: false,
            guide: createSubtaskGuide(
              "머신러닝을 통해 시청자들의 복잡한 행동 패턴을 분석하고 예측 모델을 생성합니다.",
              "AI 분석 엔진이 시청 시간, 이탈 지점, 재방문 패턴 등을 자동으로 분석",
              "🔍 AI가 발견한 예상치 못한 패턴이 새로운 콘텐츠 아이디어의 원천이 될 수 있습니다."
            )
          },
          { 
            id: "interest-mapping", 
            title: "스마트 관심사 매핑", 
            completed: false,
            guide: createSubtaskGuide(
              "자연어 처리 AI를 통해 댓글, 반응, 공유 패턴을 분석하여 진짜 관심사를 도출합니다.",
              "감정 분석 + 키워드 추출 + 행동 데이터를 결합한 통합 분석",
              "💬 AI가 분석한 숨겨진 니즈가 차별화된 콘텐츠 아이디어로 이어집니다."
            )
          },
          { 
            id: "persona-creation", 
            title: "AI 페르소나 자동 생성", 
            completed: false, 
            aiGenerated: true,
            guide: createSubtaskGuide(
              "수집된 모든 데이터를 AI가 종합하여 실행 가능한 타겟 페르소나를 자동 생성합니다.",
              "플랫폼 AI가 데이터를 종합하여 이름, 스토리, 쇼핑 패턴이 포함된 완전한 페르소나를 자동 생성",
              "🎭 AI가 생성한 페르소나는 실제 구매 데이터와 97% 일치하는 정확도를 보입니다."
            )
          }
        ]
      },
      {
        id: "keyword-research",
        title: "AI 키워드 & SEO 최적화",
        description: "실시간 트렌드 분석과 경쟁사 데이터를 통해 최적의 키워드 전략을 자동 생성합니다",
        completed: false,
        required: true,
        estimatedTime: "8분",
        category: "optimization",
        difficulty: "easy" as const,
        aiAssistance: {
          available: true,
          type: "recommendation" as const,
          description: "플랫폼 내 키워드 분석 엔진이 실시간 트렌드와 경쟁 데이터를 결합하여 최적 키워드 조합을 자동 제안합니다"
        },
        detailedGuide: createGuide(
          "Creator-Pulse의 통합 키워드 분석 시스템을 통해 검색 알고리즘과 시청자 검색 패턴을 실시간 분석하여 높은 노출과 클릭률을 보장하는 최적의 키워드 전략을 자동 생성합니다.",
          [
            "1. 플랫폼 키워드 분석기에서 실시간 트렌드 데이터 자동 수집",
            "2. AI 경쟁사 분석을 통한 키워드 갭 자동 발견",
            "3. 머신러닝 기반 롱테일 키워드 자동 생성",
            "4. SEO 최적화 점수와 함께 우선순위 자동 매기기"
          ],
          [
            "🚀 플랫폼 AI가 월간 검색량보다 상승 트렌드를 자동 감지하여 추천합니다",
            "🎯 개인화된 키워드 조합을 통해 경쟁 없는 틈새 시장을 발견할 수 있습니다",
            "📈 계절성 키워드를 AI가 미리 예측하여 2-3개월 전부터 준비할 수 있습니다"
          ],
          "AI 최적화된 키워드 전략으로 검색 노출량 60% 증가, 클릭률 35% 향상을 달성하며, 타겟 시청자 유입 품질이 대폭 개선됩니다.",
          "플랫폼 통합 AI가 실시간으로 수십만 개의 키워드를 분석하고, 개인화된 추천 알고리즘을 통해 가장 효과적인 키워드 조합을 자동 생성합니다."
        ),
        subtasks: [
          { 
            id: "trend-keywords", 
            title: "실시간 트렌드 키워드 발굴", 
            completed: false, 
            aiGenerated: true,
            guide: createSubtaskGuide(
              "AI 트렌드 감지 시스템이 급상승하는 키워드와 미래 트렌드를 실시간으로 발견합니다.",
              "플랫폼 내 트렌드 분석기가 소셜미디어, 검색엔진, 커머스 데이터를 통합 분석",
              "⚡ AI가 트렌드를 24-48시간 먼저 감지하여 경쟁자보다 빠른 대응이 가능합니다."
            )
          },
          { 
            id: "long-tail-seo", 
            title: "AI 롱테일 키워드 생성", 
            completed: false, 
            aiGenerated: true,
            guide: createSubtaskGuide(
              "자연어 처리 AI가 높은 전환율을 보이는 구체적인 검색어 조합을 자동 생성합니다.",
              "GPT 기반 키워드 생성 엔진이 사용자 의도를 분석하여 맞춤형 롱테일 키워드 제안",
              "🎯 AI가 생성한 롱테일 키워드의 평균 전환율은 일반 키워드보다 3배 높습니다."
            )
          },
          { 
            id: "competitor-gap", 
            title: "AI 경쟁사 갭 분석", 
            completed: false,
            guide: createSubtaskGuide(
              "경쟁 분석 AI가 실시간으로 경쟁사 데이터를 모니터링하여 놓친 키워드 기회를 발견합니다.",
              "플랫폼 내 경쟁사 모니터링 시스템이 자동으로 키워드 포트폴리오를 분석하고 갭을 매핑",
              "🔍 매주 업데이트되는 경쟁 분석으로 항상 최신 기회를 놓치지 않습니다."
            )
          },
          { 
            id: "seasonal-timing", 
            title: "AI 계절성 예측 모델", 
            completed: false, 
            aiGenerated: true,
            guide: createSubtaskGuide(
              "머신러닝 예측 모델이 과거 3년간의 계절별 패턴을 학습하여 올해 최적 타이밍을 제안합니다.",
              "시계열 분석 AI가 기상 데이터, 이벤트 정보까지 결합하여 정교한 타이밍 예측",
              "📅 AI 예측의 정확도는 91%로, 사람의 예측보다 훨씬 정확합니다."
            )
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "스마트 상품 큐레이션",
    description: "AI 분석 기반 고수익 상품 선별 및 전략",
    icon: ShoppingCart,
    completed: false,
    tasks: [
      {
        id: "ai-product-analysis",
        title: "AI 상품 트렌드 실시간 분석",
        description: "플랫폼 통합 AI가 빅데이터를 분석하여 상품 수요를 예측하고 수익성을 자동 계산합니다",
        completed: false,
        required: true,
        estimatedTime: "5분",
        category: "analysis",
        difficulty: "easy" as const,
        aiAssistance: {
          available: true,
          type: "analysis" as const,
          description: "통합 상품 분석 AI가 실시간 시장 데이터를 수집하고 머신러닝으로 수익성을 예측하여 최적의 상품 포트폴리오를 제안합니다"
        },
        detailedGuide: createGuide(
          "Creator-Pulse의 통합 상품 분석 시스템을 통해 시장 데이터와 소비자 행동 패턴을 실시간 분석하여 높은 수익성과 성장 잠재력을 가진 상품들을 자동으로 식별하고 추천합니다.",
          [
            "1. AI가 주요 쇼핑몰과 소셜커머스 데이터를 실시간 수집",
            "2. 머신러닝 모델이 소비자 검색 패턴과 구매 행동을 분석",
            "3. 예측 알고리즘이 향후 3-6개월 수요 변화를 계산",
            "4. 개인화된 수익성 스코어링과 추천 상품 자동 생성"
          ],
          [
            "📊 AI가 1만 개 이상의 상품을 동시에 분석하여 숨겨진 기회를 발견합니다",
            "💰 개인 채널의 성과 데이터와 결합하여 맞춤형 수익 예측을 제공합니다",
            "🎯 실시간 업데이트로 시장 변화에 즉시 대응할 수 있습니다"
          ],
          "AI 분석을 통해 선별한 상품의 평균 수익률이 45% 향상되고, 실패 리스크는 70% 감소합니다.",
          "플랫폼 통합 AI가 수만 개 상품의 복잡한 데이터를 실시간으로 분석하여 가장 수익성 높은 상품 조합을 자동 제안합니다."
        ),
        subtasks: [
          { 
            id: "demand-forecasting", 
            title: "AI 수요 예측 모델링", 
            completed: false, 
            aiGenerated: true,
            guide: createSubtaskGuide(
              "딥러닝 예측 모델이 과거 데이터와 외부 요인을 결합하여 향후 상품 수요를 정확히 예측합니다.",
              "플랫폼 AI가 검색량, 소셜미디어 버즈, 계절성 등을 종합하여 수요 곡선을 실시간 생성",
              "📈 AI 예측 모델의 정확도는 89%로, 시장 변화를 미리 대비할 수 있습니다."
            )
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "콘텐츠 최적화 & 제작",
    description: "AI 도구를 활용한 고성과 콘텐츠 제작",
    icon: Image,
    completed: false,
    tasks: [
      {
        id: "ai-thumbnail-optimization",
        title: "AI 썸네일 최적화",
        description: "AI가 클릭률을 극대화하는 썸네일 디자인과 요소를 분석 및 생성합니다",
        completed: false,
        required: true,
        estimatedTime: "15분",
        category: "design",
        difficulty: "medium" as const,
        aiAssistance: {
          available: true,
          type: "generation" as const,
          description: "A/B 테스트 데이터와 시각적 분석을 통해 고CTR 썸네일 템플릿을 자동 생성"
        },
        detailedGuide: createGuide(
          "수만 개의 성공 썸네일을 분석한 AI가 클릭률을 극대화할 수 있는 썸네일 디자인과 구성 요소를 제안하여 영상 노출 효과를 극대화합니다.",
          [
            "1. 채널 기존 썸네일의 CTR 성과 분석",
            "2. 타겟 오디언스와 카테고리에 맞는 디자인 방향 설정",
            "3. AI 생성 도구로 다양한 썸네일 후보 제작",
            "4. A/B 테스트를 통한 최적 썸네일 선정"
          ],
          [
            "👁️ 모바일에서 작게 봐도 한눈에 알아볼 수 있는 디자인이 핵심입니다",
            "🎨 채널만의 일관된 브랜딩을 유지하면서도 각 영상의 특색을 살리세요",
            "📱 같은 썸네일이라도 PC와 모바일에서 다르게 보일 수 있으니 둘 다 확인하세요"
          ],
          "썸네일 클릭률이 평균 35% 향상되어 영상 노출량과 조회수가 크게 증가하며, 체계적인 썸네일 제작 프로세스를 확립하게 됩니다.",
          "AI가 색상, 레이아웃, 텍스트, 표정 등 수백 가지 요소를 분석하여 가장 효과적인 썸네일 조합을 자동 생성해드립니다."
        ),
        subtasks: [
          { 
            id: "ctr-analysis", 
            title: "CTR 최적화 분석", 
            completed: false, 
            aiGenerated: true,
            guide: createSubtaskGuide(
              "기존 썸네일들의 클릭률 데이터를 분석하여 성공 패턴을 발견합니다.",
              "AI가 썸네일 요소별(색상, 텍스트, 구성 등)로 CTR 상관관계를 분석하여 최적 공식 도출",
              "📊 CTR만 보지 말고 시청 지속 시간도 함께 고려해야 진짜 좋은 썸네일입니다."
            )
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "스마트 일정 & 배포 관리",
    description: "AI 기반 최적 타이밍과 채널 전략",
    icon: Clock,
    completed: false,
    tasks: [
      {
        id: "optimal-timing-ai",
        title: "AI 최적 업로드 타이밍",
        description: "머신러닝으로 개인별 최적 업로드 시간을 분석하고 예측합니다",
        completed: false,
        required: true,
        estimatedTime: "8분",
        category: "scheduling",
        difficulty: "easy" as const,
        aiAssistance: {
          available: true,
          type: "analysis" as const,
          description: "과거 성과 데이터와 시청자 활동 패턴을 분석하여 개인화된 최적 시간을 도출"
        },
        detailedGuide: createGuide(
          "개인 채널의 시청자 활동 패턴과 경쟁 환경을 분석하여 가장 높은 노출과 참여를 얻을 수 있는 맞춤형 업로드 시간을 찾아냅니다.",
          [
            "1. 과거 업로드 시간별 성과 데이터 수집 및 분석",
            "2. 시청자 온라인 활동 시간대 패턴 파악",
            "3. 경쟁사 업로드 패턴과 시장 포화도 고려",
            "4. 계절성과 이벤트 영향을 반영한 동적 타이밍 조정"
          ],
          [
            "📅 일정한 업로드 시간을 유지하여 시청자들이 기대할 수 있게 하세요",
            "🌍 타겟 시청자가 전 세계라면 주요 시간대별로 순환 업로드를 고려하세요",
            "⚡ 긴급한 트렌드 콘텐츠는 최적 시간보다 속도가 더 중요할 수 있습니다"
          ],
          "업로드 후 첫 24시간 조회수가 평균 30% 증가하고, 더 많은 초기 참여로 알고리즘 추천을 받을 확률이 높아집니다.",
          "AI가 수백 가지 변수를 실시간으로 고려하여 매주 최적 타이밍을 업데이트하고, 특별한 이벤트나 트렌드에 맞춘 조정안을 제시합니다."
        ),
        subtasks: [
          { 
            id: "audience-activity", 
            title: "시청자 활동 패턴 분석", 
            completed: false, 
            aiGenerated: true,
            guide: createSubtaskGuide(
              "시청자들이 가장 활발하게 유튜브를 이용하는 시간대와 요일을 정확히 파악합니다.",
              "AI가 시청자 접속 로그, 참여 시간, 시청 완료율 등을 종합 분석하여 활동 패턴 도출",
              "📊 단순 접속 시간보다는 실제 영상을 끝까지 시청하는 시간대가 더 중요합니다."
            )
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "성과 추적 & 최적화",
    description: "AI 분석 기반 실시간 성과 모니터링",
    icon: BarChart3,
    completed: false,
    tasks: [
      {
        id: "ai-analytics-setup",
        title: "AI 분석 대시보드 구축",
        description: "머신러닝 기반 실시간 성과 분석과 예측 시스템을 설정합니다",
        completed: false,
        required: true,
        estimatedTime: "10분",
        category: "analytics",
        difficulty: "medium" as const,
        aiAssistance: {
          available: true,
          type: "analysis" as const,
          description: "다차원 데이터 분석과 예측 모델링을 통한 인텔리전트 분석 시스템 구축"
        },
        detailedGuide: createGuide(
          "복잡한 데이터를 한눈에 파악할 수 있는 AI 기반 대시보드를 구축하여 실시간으로 성과를 모니터링하고 미래 트렌드를 예측합니다.",
          [
            "1. 핵심 성과 지표(KPI) 정의 및 우선순위 설정",
            "2. 데이터 소스 연동 및 실시간 수집 시스템 구축",
            "3. AI 예측 모델 설정 및 이상 징후 탐지 규칙 생성",
            "4. 맞춤형 리포트 자동 생성 및 알림 시스템 구성"
          ],
          [
            "📊 너무 많은 지표보다는 실제 의사결정에 도움되는 핵심 지표에 집중하세요",
            "🔮 단순 과거 데이터보다는 미래 예측과 트렌드 분석에 더 집중하세요",
            "⚡ 실시간 데이터와 배치 데이터를 적절히 조합하여 정확도와 속도를 균형맞추세요"
          ],
          "데이터 기반 의사결정이 가능해지고, 문제 상황을 조기에 발견하여 빠른 대응이 가능하며, 성과 예측 정확도가 85% 이상 향상됩니다.",
          "AI가 수백 가지 변수를 실시간으로 분석하여 인사이트를 자동 생성하고, 놓치기 쉬운 패턴과 기회를 선제적으로 알려드립니다."
        ),
        subtasks: [
          { 
            id: "kpi-definition", 
            title: "핵심 KPI 정의", 
            completed: false,
            guide: createSubtaskGuide(
              "비즈니스 목표와 직결되는 핵심 성과 지표를 선별하고 우선순위를 정합니다.",
              "SMART 기준으로 측정 가능하고 실행 가능한 KPI를 선정하고 목표값 설정",
              "🎯 선행 지표(조회수, 클릭률)와 후행 지표(수익, 구독자)를 균형있게 포함하세요."
            )
          }
        ]
      }
    ]
  }
];

export const initialScheduleItems: ScheduleItem[] = [
  {
    id: "1",
    title: "타겟 오디언스 분석 완료",
    description: "AI 분석 결과를 바탕으로 한 타겟 오디언스 프로필 검토",
    date: "2024-11-20",
    time: "14:00",
    type: "analysis",
    status: "pending",
    priority: "high",
    linkedTaskId: "audience-analysis"
  },
  {
    id: "2", 
    title: "겨울 상품 트렌드 분석 영상 촬영",
    description: "AI 추천 상품을 바탕으로 한 겨울 필수 아이템 리뷰 영상",
    date: "2024-11-21",
    time: "10:00",
    type: "content",
    status: "pending",
    priority: "high",
    linkedTaskId: "ai-product-analysis"
  },
  {
    id: "3",
    title: "AI 생성 썸네일 A/B 테스트 업로드",
    description: "AI가 생성한 3가지 썸네일 버전으로 성과 테스트",
    date: "2024-11-21",
    time: "18:00",
    type: "upload",
    status: "pending",
    priority: "high",
    linkedTaskId: "ai-thumbnail-optimization"
  },
  {
    id: "4",
    title: "주간 성과 리포트 AI 분석",
    description: "AI 대시보드를 통한 주간 성과 분석 및 최적화 방안 도출",
    date: "2024-11-22",
    time: "15:30",
    type: "analysis",
    status: "in-progress",
    priority: "medium",
    linkedTaskId: "ai-analytics-setup"
  }
];

export const mockAnalysisData = {
  "audience-analysis": {
    analysis: {
      primaryAudience: "25-34세 여성 (42%)",
      secondaryAudience: "35-44세 여성 (28%)",
      peakActivity: "저녁 7-9시",
      interests: ["패션", "뷰티", "라이프스타일", "홈데코"]
    },
    recommendations: [
      "🎯 주요 타겟: 워킹맘 (25-34세) - 실용적이면서 트렌디한 상품 선호",
      "⏰ 최적 업로드 시간: 평일 저녁 7시 30분, 주말 오후 2시",
      "💡 콘텐츠 방향: '시간 절약 + 스타일링' 컨셉의 상품 추천",
      "📱 참여도 높은 포맷: 비포/애프터, 실제 사용 후기, 가격 비교"
    ]
  },
  "keyword-research": {
    analysis: {
      topKeywords: ["겨울패션", "코트추천", "니트", "부츠"],
      searchVolume: 156000,
      competitionLevel: "보통",
      trendDirection: "상승"
    },
    recommendations: [
      "🔥 트렌드 키워드: '오버핏 코트', '캐시미어 니트' (검색량 3배 증가)",
      "📈 롱테일 키워드: '30대 직장인 겨울 코디' (경쟁 낮음, 전환율 높음)",
      "🎪 계절성 키워드: '연말파티룩', '신년 코디' (12월 중순 피크 예상)",
      "💰 상업적 키워드: '겨울 할인', '블프 추천템' (구매 의도 높음)"
    ]
  },
  "ai-product-analysis": {
    analysis: {
      topProducts: ["무선 이어폰", "스마트워치", "패딩", "부츠"],
      predictedROI: "평균 24% 증가",
      riskLevel: "낮음",
      marketTrend: "강세"
    },
    recommendations: [
      "🚀 고수익 예상 상품: 프리미엄 무선이어폰 (수익률 45% 예상)",
      "📊 안정성 높은 상품: 겨울 아우터 (꾸준한 수요, 낮은 리스크)",
      "⚡ 급상승 상품: 스마트홈 기기 (관심도 67% 증가)",
      "💎 틈새 기회: 펫케어 상품 (경쟁 낮음, 성장 잠재력 높음)"
    ]
  },
  "ai-thumbnail-optimization": {
    analysis: {
      avgCTR: "8.5%",
      bestColors: ["빨강", "노랑", "파랑"],
      optimalTextLength: "3-5단어",
      faceExpressions: "놀람, 미소"
    },
    recommendations: [
      "🎨 고성과 색상 조합: 빨강+노랑 (CTR +34%), 파랑+흰색 (CTR +28%)",
      "📝 효과적인 텍스트: '이거 실화?', '완전 다른 결과', '예상외의 반전'",
      "👁️ 시선 집중 요소: 화살표, 원형 강조, 대비 효과 활용",
      "📱 모바일 최적화: 큰 텍스트, 단순한 구성, 명확한 메시지"
    ]
  },
  "optimal-timing-ai": {
    analysis: {
      bestDays: ["화요일", "목요일", "일요일"],
      bestTimes: ["19:30", "14:00", "21:00"],
      competitorGaps: ["수요일 오후", "토요일 저녁"]
    },
    recommendations: [
      "⏰ 최적 업로드 시간: 평일 저녁 7시 30분 (참여도 35% 높음)",
      "📅 주말 추천 시간: 일요일 오후 2시 (경쟁 낮음, 시청 시간 길음)",
      "🎯 틈새 시간 활용: 수요일 오후 3시 (경쟁사 공백 시간대)",
      "📈 성과 향상 예상: 최적 시간 준수 시 조회수 평균 30% 증가"
    ]
  },
  "ai-analytics-setup": {
    analysis: {
      keyMetrics: ["조회수", "참여도", "수익률", "구독자 증가"],
      predictionAccuracy: "87%",
      anomalyDetection: "활성화",
      reportSchedule: "주간 자동 생성"
    },
    recommendations: [
      "📊 핵심 KPI 집중: 참여도, 시청 지속 시간, 전환율이 수익과 직결",
      "🔮 예측 분석 활용: AI 예측 모델로 3개월 후 성과까지 미리 예측",
      "⚠️ 이상 징후 모니터링: 급격한 성과 변화 시 24시간 내 알림 발송",
      "📈 지속적 최적화: 주간 자동 리포트로 트렌드 변화에 즉시 대응"
    ]
  }
};