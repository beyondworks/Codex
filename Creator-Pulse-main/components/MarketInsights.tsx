import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Brain, 
  Target, 
  Calendar,
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
  const [recommendations, setRecommendations] = useState<any[]>([]);
  
  useEffect(() => {
    // Market Insights 데이터 가져오기
    supabase.from('market_insights').select('*').order('updated_at', { ascending: false }).limit(20)
      .then(({ data }) => {
        if (data) setInsights(data.map(d => ({ title: d.title, description: d.description, confidence: Number(d.confidence), timeframe: d.timeframe, category: d.category })));
      });

    // AI 추천 데이터 가져오기
    supabase.from('ai_recommendations').select('*').order('confidence', { ascending: false }).limit(6)
      .then(({ data }) => {
        if (data) setRecommendations(data.map(d => ({ 
          title: d.title, 
          description: d.description, 
          priority: d.priority === 'high' ? '높음' : d.priority === 'medium' ? '중간' : '낮음'
        })));
      });
  }, []);

  return (
    <>
      <div className="space-y-6">
        <Card className="border-0 bg-gradient-to-br from-gray-50/50 to-white shadow-lg">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">시장 분석 인사이트</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.length === 0 ? (
                <div className="text-sm text-muted-foreground p-4 text-center">
                  분석 중...
                </div>
              ) : insights.slice(0, 3).map((insight, index) => (
                <div key={index} className="p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{insight.description}</p>
                      
                      {/* 단순화된 메타 정보 */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-700 font-medium">{insight.confidence}% 신뢰도</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {insight.timeframe}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {insight.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50/50 to-white shadow-lg">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI 추천</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.length === 0 ? (
                <div className="text-sm text-muted-foreground p-4 text-center">
                  추천 생성 중...
                </div>
              ) : recommendations.slice(0, 4).map((rec, index) => (
                <div key={index} className="p-3 rounded-lg bg-white border border-gray-100 hover:border-purple-200 transition-colors duration-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-4 w-4 mt-0.5 text-purple-500 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                          <p className="text-sm text-gray-600">{rec.description}</p>
                        </div>
                        <Badge 
                          variant={rec.priority === "높음" ? "default" : "secondary"}
                          className={rec.priority === "높음" ? "bg-red-100 text-red-700 border-red-200" : ""}
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => setIsStrategyModalOpen(true)}
            >
              <Target className="h-4 w-4 mr-2" />
              🚀 맞춤 전략 받기
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