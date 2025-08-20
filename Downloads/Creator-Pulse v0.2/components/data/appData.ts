import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Calculator,
  BarChart3,
  Eye
} from "lucide-react";

// 핵심 성과 지표 데이터
export const kpiStats = [
  {
    title: "이번 달 수익",
    value: "₩12.8M",
    change: "+18.7%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "총 조회수",
    value: "2.4M",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "총 판매량",
    value: "8,742",
    change: "+23.1%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "활성 구독자",
    value: "156K",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

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