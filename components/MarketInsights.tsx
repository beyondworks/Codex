import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Calendar,
  ArrowRight,
  Lightbulb,
  BarChart
} from "lucide-react";
import { AIStrategyModal } from "./AIStrategyModal";
import { MarketInsightsModal } from "./MarketInsightsModal";
import { supabase } from "../utils/supabase/client";

interface MarketInsightsProps {
  onPageChange?: (page: string) => void;
}

export function MarketInsights({ onPageChange }: MarketInsightsProps = {}) {
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false);

  const [insights, setInsights] = useState<any[]>([]);
  useEffect(() => {
    supabase.from('market_insights').select('*').order('updated_at', { ascending: false }).limit(20)
      .then(({ data }) => {
        if (data) setInsights(data.map(d => ({ title: d.title, description: d.description, confidence: Number(d.confidence), timeframe: d.timeframe, category: d.category })));
      })
  }, []);

  const recommendations = [
    {
      title: "콘텐츠 최적화",
      description: "썸네일에 가격 정보 포함 시 CTR 23% 증가",
      priority: "높음"
    },
    {
      title: "상품 조합",
      description: "무선이어폰 + 스마트워치 번들 추천",
      priority: "중간"
    },
    {
      title: "타겟 오디언스",
      description: "25-34세 여성층 대상 뷰티 제품 집중 공략",
      priority: "높음"
    }
  ];

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-chart-1" />
              시장 분석 & 인사이트
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-3 sm:p-4 border rounded-lg space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="space-y-1 flex-1">
                      <h4 className="font-medium text-sm sm:text-base">{insight.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                    </div>
                    <Badge variant="outline" className="self-start">{insight.category}</Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm">신뢰도</span>
                        <Progress value={insight.confidence} className="w-16 sm:w-20 h-2" />
                        <span className="text-xs sm:text-sm font-medium">{insight.confidence}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {insight.timeframe}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="self-start sm:self-auto"
                      onClick={() => setIsInsightsModalOpen(true)}
                    >
                      <span className="hidden sm:inline">자세히 보기</span>
                      <span className="sm:hidden">자세히</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-chart-2" />
              <span className="whitespace-nowrap">AI 인사이트 분석 요약</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 sm:space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 p-3 border rounded-lg">
                  <div className="flex items-start gap-3 flex-1">
                    <Lightbulb className="h-4 w-4 mt-0.5 text-chart-4 flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm sm:text-base">{rec.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={rec.priority === "높음" ? "default" : "secondary"}
                    className="self-start sm:self-auto flex-shrink-0"
                  >
                    {rec.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-3 sm:mt-4 text-sm sm:text-base"
              onClick={() => setIsStrategyModalOpen(true)}
            >
              <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              맞춤 추천 전략 받기
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI 맞춤 추천 전략 모달 */}
      <AIStrategyModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
        onPageChange={onPageChange}
      />

      {/* 시장 분석 인사이트 상세 모달 */}
      <MarketInsightsModal
        isOpen={isInsightsModalOpen}
        onClose={() => setIsInsightsModalOpen(false)}
      />
    </>
  );
}