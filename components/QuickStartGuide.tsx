import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, PlayCircle, BookOpen, Target, Zap, BarChart3, ArrowRight, Brain } from "lucide-react";

interface QuickStartGuideProps {
  onPageChange?: (page: string) => void;
}

export function QuickStartGuide({ onPageChange }: QuickStartGuideProps) {
  const steps = [
    {
      icon: PlayCircle,
      title: "실시간 트렌드 분석",
      description: "지금 가장 핫한 상품 트렌드를 확인하세요",
      color: "text-blue-500",
      action: "trends"
    },
    {
      icon: Target,
      title: "상품 탐색 & 선택",
      description: "판매할 최적의 상품을 찾고 분석하세요",
      color: "text-green-500",
      action: "products"
    },
    {
      icon: BarChart3,
      title: "성과 분석 대시보드",
      description: "맞춤형 인사이트와 실시간 성과를 확인하세요",
      color: "text-purple-500",
      action: "dashboard"
    },
    {
      icon: Brain,
      title: "AI 콘텐츠 분석기",
      description: "영상을 분석해 쇼핑 최적화 인사이트를 받아보세요",
      color: "text-orange-500",
      action: "ai-analyzer"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#ff8a3d]" />
          빠른 시작 가이드
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex gap-3 p-3 rounded-lg border bg-accent/30 hover:bg-accent/50 transition-colors group cursor-pointer"
              onClick={() => onPageChange?.(step.action)}
            >
              <div className={`w-8 h-8 rounded-full bg-accent flex items-center justify-center ${step.color} flex-shrink-0`}>
                <step.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          ))}
          
          {/* 도움말 섹션 */}
          <div className="p-4 bg-brand-gradient rounded-lg text-white mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4" />
              <span className="font-medium text-sm">도움이 필요하세요?</span>
            </div>
            <p className="text-xs text-white/80 mb-3">
              전문 상담원이 1:1로 설정을 도와드립니다
            </p>
            <Button size="sm" className="w-full bg-white text-gray-900 hover:bg-gray-100 transition-colors">
              무료 상담 신청
            </Button>
          </div>
          
          {/* 성공 사례 */}
          <div className="p-4 border rounded-lg bg-green-50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800 text-sm">성공 사례</span>
            </div>
            <p className="text-xs text-green-700">
              "Creator-Pulse 도입 후 30일 만에 매출이 250% 증가했습니다!"
            </p>
            <p className="text-xs text-green-600 mt-1">- 뷰티크리에이터 김○○님</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}