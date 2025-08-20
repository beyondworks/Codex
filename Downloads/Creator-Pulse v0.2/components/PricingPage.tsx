import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { 
  Check,
  X,
  CreditCard,
  Zap,
  Star,
  Shield,
  Users,
  BarChart3,
  Brain,
  Target,
  TrendingUp,
  Sparkles,
  Crown,
  Rocket
} from "lucide-react";

interface PlanFeature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface PricingPageProps {
  onLoginClick?: () => void;
}

export function PricingPage({ onLoginClick }: PricingPageProps) {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "개인 크리에이터를 위한 기본 플랜",
      icon: Users,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      popular: false,
      features: [
        "월 5개 영상 분석",
        "기본 트렌드 리포트",
        "표준 수익 계산기",
        "이메일 지원",
        "기본 대시보드"
      ]
    },
    {
      name: "Pro",
      price: { monthly: 29000, yearly: 290000 },
      description: "성장하는 크리에이터를 위한 프로 플랜",
      icon: Zap,
      color: "text-[#ff4d6d]",
      bgColor: "bg-gradient-to-br from-[#ff4d6d]/10 to-[#ff8a3d]/10",
      borderColor: "border-[#ff4d6d]",
      popular: true,
      features: [
        "무제한 영상 분석",
        "AI 맞춤 트렌드 분석",
        "고급 수익 예측 모델",
        "실시간 경쟁사 분석",
        "우선 고객 지원",
        "상세 성과 리포트",
        "맞춤형 상품 추천"
      ]
    },
    {
      name: "Enterprise",
      price: { monthly: 99000, yearly: 990000 },
      description: "대형 크리에이터 및 MCN을 위한 엔터프라이즈",
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      popular: false,
      features: [
        "Pro 플랜의 모든 기능",
        "팀 협업 도구",
        "API 액세스",
        "화이트라벨 솔루션",
        "전담 계정 매니저",
        "맞춤형 개발",
        "온사이트 교육"
      ]
    }
  ];

  const detailedFeatures: PlanFeature[] = [
    {
      name: "영상 분석 한도",
      free: "월 5개",
      pro: "무제한",
      enterprise: "무제한"
    },
    {
      name: "AI 트렌드 분석",
      free: false,
      pro: true,
      enterprise: true
    },
    {
      name: "실시간 데이터",
      free: false,
      pro: true,
      enterprise: true
    },
    {
      name: "고급 수익 예측",
      free: false,
      pro: true,
      enterprise: true
    },
    {
      name: "경쟁사 분석",
      free: false,
      pro: true,
      enterprise: true
    },
    {
      name: "맞춤형 대시보드",
      free: false,
      pro: true,
      enterprise: true
    },
    {
      name: "데이터 내보내기",
      free: false,
      pro: "CSV",
      enterprise: "CSV, API"
    },
    {
      name: "팀 협업",
      free: false,
      pro: false,
      enterprise: true
    },
    {
      name: "API 액세스",
      free: false,
      pro: false,
      enterprise: true
    },
    {
      name: "고객 지원",
      free: "이메일",
      pro: "우선 지원",
      enterprise: "전담 매니저"
    }
  ];

  const testimonials = [
    {
      name: "김미영",
      channel: "뷰티플래닛",
      subscribers: "125만",
      comment: "Creator-Pulse 덕분에 수익이 300% 증가했어요! AI 추천이 정말 정확해요.",
      avatar: "👩‍💼"
    },
    {
      name: "박성훈",
      channel: "테크리뷰어",
      subscribers: "89만",
      comment: "트렌드 분석 기능이 콘텐츠 기획에 큰 도움이 됩니다. 꼭 필요한 도구예요.",
      avatar: "👨‍💻"
    },
    {
      name: "이지영",
      channel: "라이프스타일",
      subscribers: "67만",
      comment: "수익 계산기의 정확도가 놀라워요. 콘텐츠 ROI를 명확하게 알 수 있어요.",
      avatar: "👩‍🎨"
    }
  ];

  const faqs = [
    {
      question: "무료 플랜에서 유료 플랜으로 언제든 변경할 수 있나요?",
      answer: "네, 언제든지 플랜을 업그레이드할 수 있습니다. 기존 데이터는 모두 유지됩니다."
    },
    {
      question: "연간 결제 시 할인 혜택이 있나요?",
      answer: "연간 결제 시 2개월 무료 혜택을 제공합니다. 약 17% 할인된 가격입니다."
    },
    {
      question: "AI 분석의 정확도는 어느 정도인가요?",
      answer: "평균 90% 이상의 예측 정확도를 보이며, 지속적인 학습을 통해 정확도를 높여가고 있습니다."
    },
    {
      question: "환불 정책은 어떻게 되나요?",
      answer: "7일 무조건 환불 보장을 제공합니다. 만족하지 않으시면 전액 환불해드립니다."
    }
  ];

  const getFeatureIcon = (value: boolean | string) => {
    if (value === true) return <Check className="h-4 w-4 text-green-600" />;
    if (value === false) return <X className="h-4 w-4 text-gray-400" />;
    return <span className="text-sm text-green-600 font-medium">{value}</span>;
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex flex-col items-center gap-3 mb-4">
          <CreditCard className="h-7 w-7 text-foreground" />
          <Badge className="bg-brand-gradient text-white">특별 할인 진행 중</Badge>
        </div>
        <h1 className="text-4xl font-bold">Creator-Pulse 가격 플랜</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          창작자의 성장 단계에 맞는 최적의 플랜을 선택하세요.
          모든 플랜에서 7일 무료 체험을 제공합니다.
        </p>
        
        {/* 연간/월간 토글 */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm ${!isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
            월간 결제
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <span className={`text-sm ${isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
            연간 결제
          </span>
          {isYearly && (
            <Badge className="bg-green-100 text-green-700">2개월 무료</Badge>
          )}
        </div>
      </div>

      {/* 가격 플랜 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${plan.popular ? 'ring-2 ring-[#ff4d6d] shadow-xl scale-105 z-10' : 'hover:shadow-lg'} transition-all duration-200 h-[580px] flex flex-col ${plan.popular ? 'bg-gradient-to-b from-white to-red-50/30' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-brand-gradient text-white px-4 py-2 shadow-lg">
                  <Star className="h-3 w-3 mr-1" />
                  가장 인기
                </Badge>
              </div>
            )}
            
            <CardHeader className={`text-center pb-6 flex-shrink-0 ${plan.popular ? 'pt-8' : 'pt-6'}`}>
              <div className={`w-16 h-16 mx-auto rounded-full ${plan.bgColor} ${plan.popular ? 'ring-2 ring-[#ff4d6d]/20' : ''} flex items-center justify-center mb-4`}>
                <plan.icon className={`h-8 w-8 ${plan.color}`} />
              </div>
              <CardTitle className="text-2xl mb-3">{plan.name}</CardTitle>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.description}</p>
              <div className="space-y-2">
                <div className="text-4xl font-bold">
                  ₩{(isYearly ? plan.price.yearly : plan.price.monthly).toLocaleString()}
                  {plan.price.monthly > 0 && (
                    <span className="text-lg text-muted-foreground font-normal">
                      /{isYearly ? '년' : '월'}
                    </span>
                  )}
                </div>
                {isYearly && plan.price.monthly > 0 && (
                  <div className="text-sm text-muted-foreground">
                    월 ₩{Math.round(plan.price.yearly / 12).toLocaleString()}
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-between px-6 pb-6">
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.popular ? 'bg-brand-gradient hover:opacity-90 shadow-lg' : ''}`}
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                onClick={onLoginClick}
              >
                {plan.price.monthly === 0 ? '무료로 시작하기' : '7일 무료 체험'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 상세 기능 비교표 */}
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">상세 기능 비교</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 font-medium">기능</th>
                  <th className="text-center py-4 font-medium">Free</th>
                  <th className="text-center py-4 font-medium">Pro</th>
                  <th className="text-center py-4 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {detailedFeatures.map((feature, index) => (
                  <tr key={index} className="border-b hover:bg-muted/20">
                    <td className="py-4 font-medium">{feature.name}</td>
                    <td className="text-center py-4">
                      {getFeatureIcon(feature.free)}
                    </td>
                    <td className="text-center py-4">
                      {getFeatureIcon(feature.pro)}
                    </td>
                    <td className="text-center py-4">
                      {getFeatureIcon(feature.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 고객 후기 */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">크리에이터들의 후기</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 h-[200px]">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-2xl flex-shrink-0">{testimonial.avatar}</div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.channel} • 구독자 {testimonial.subscribers}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed line-clamp-3">"{testimonial.comment}"</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">자주 묻는 질문</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium">{faq.question}</h4>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section - 버튼 높이 더 크게 조정 */}
      <div className="text-center space-y-6 py-8 md:py-12 px-4 md:px-8 bg-gradient-to-r from-[#ff4d6d]/10 to-[#ff8a3d]/10 rounded-2xl mx-4 md:mx-0">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-brand-gradient flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">지금 시작하세요!</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            7일 무료 체험으로 Creator-Pulse의 강력한 기능을 직접 경험해보세요.
            언제든지 플랜을 변경하거나 취소할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:gap-4 max-w-md mx-auto">
          <Button 
            size="lg" 
            className="bg-brand-gradient hover:opacity-90 w-full h-16 text-base font-semibold"
            onClick={onLoginClick}
          >
            <Rocket className="h-5 w-5 mr-2" />
            무료 체험 시작하기
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full h-16 text-base font-semibold border-2 hover:bg-gray-50"
          >
            <Shield className="h-5 w-5 mr-2" />
            더 자세히 알아보기
          </Button>
        </div>
        <div className="space-y-3 md:space-y-0 md:flex md:items-center md:justify-center md:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span>7일 무료 체험</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span>무조건 환불 보장</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span>언제든지 취소 가능</span>
          </div>
        </div>
      </div>
    </div>
  );
}