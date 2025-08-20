import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Lightbulb, TrendingUp, Users, Target, Sparkles, ArrowRight } from "lucide-react";

export function AIInsights() {
  const insights = [
    {
      type: "트렌드 예측",
      title: "무선 이어폰 카테고리 급상승 예정",
      description: "다음 주 예상 성장률 +45%",
      action: "콘텐츠 준비하기",
      priority: "high",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      type: "타겟팅 팁",
      title: "20대 여성층 활동 시간대",
      description: "오후 7-9시 참여율 최고",
      action: "업로드 시간 조정",
      priority: "medium",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      type: "성과 개선",
      title: "썸네일 최적화 제안",
      description: "밝은 배경 + 제품 클로즈업",
      action: "디자인 가이드 보기",
      priority: "medium",
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-700 border-red-200">긴급</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">중요</Badge>;
      default:
        return <Badge variant="secondary">일반</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-[#ff8a3d]" />
          AI 인사이트 & 팁
          <Badge className="bg-brand-gradient text-white border-0 text-xs">AI</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 rounded-lg border hover:bg-accent/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${insight.bgColor} flex-shrink-0`}>
                  <insight.icon className={`h-4 w-4 ${insight.color}`} />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{insight.type}</span>
                    {getPriorityBadge(insight.priority)}
                  </div>
                  
                  <h4 className="font-medium text-sm leading-tight">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs hover:bg-[#ff8a3d]/5 hover:text-[#ff8a3d]"
                  >
                    {insight.action}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 하단 전체 인사이트 보기 버튼 */}
        <div className="mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full hover:bg-[#ff8a3d]/5 hover:border-[#ff8a3d]/50"
          >
            모든 AI 인사이트 보기
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}