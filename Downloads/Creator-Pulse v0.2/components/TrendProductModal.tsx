import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  DollarSign, 
  Users, 
  Calendar,
  Target,
  ArrowRight,
  BarChart3,
  ShoppingCart,
  Star,
  Clock,
  TrendingUpIcon,
  Award
} from "lucide-react";
import { KakaoNotificationModal } from "./KakaoNotificationModal";

interface TrendProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    category: string;
    growth: number;
    views: string;
    revenue: string;
    trend: string;
  } | null;
  onPageChange?: (page: string) => void;
}

export function TrendProductModal({ isOpen, onClose, product, onPageChange }: TrendProductModalProps) {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  
  if (!product) return null;

  const handleStartWorkflow = () => {
    if (onPageChange) {
      onPageChange('workflow');
      onClose();
    }
  };

  const handleNotificationSettings = () => {
    setShowNotificationModal(true);
  };

  // 예시 상세 데이터
  const detailedData = {
    description: "최신 노이즈 캔슬링 기술과 뛰어난 음질로 인기를 끌고 있는 프리미엄 무선 이어폰",
    marketShare: 18.3,
    competitorGrowth: [
      { name: "에어팟 프로", growth: 15.2, market: 22.1 },
      { name: "소니 WF-1000XM4", growth: 12.8, market: 16.7 },
      { name: "삼성 갤럭시 버즈", growth: 18.9, market: 14.3 }
    ],
    weeklyTrend: [
      { week: "1주차", views: 180000, revenue: 2.1 },
      { week: "2주차", views: 220000, revenue: 2.8 },
      { week: "3주차", views: 280000, revenue: 3.4 },
      { week: "4주차", views: 350000, revenue: 4.2 }
    ],
    topCreators: [
      { name: "테크리뷰왕", subscribers: "125만", revenue: "₩4.2M", growth: "+28%" },
      { name: "가젯마스터", subscribers: "89만", revenue: "₩3.1M", growth: "+22%" },
      { name: "모바일전문가", subscribers: "76만", revenue: "₩2.8M", growth: "+31%" }
    ],
    insights: [
      "오후 7-9시 업로드 시 조회수 25% 증가",
      "언박싱 + 비교리뷰 콘텐츠 형태가 가장 높은 전환율",
      "가격 할인 정보 포함 시 클릭률 35% 향상"
    ],
    forecast: {
      nextWeek: "+31%",
      nextMonth: "+45%",
      confidence: 89
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-h-[85vh] overflow-y-auto !max-w-none"
        style={{ width: '60vw', maxWidth: '60vw' }}
      >
        <DialogHeader>
          <DialogTitle className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">{product.title}</h3>
              <p className="text-sm text-muted-foreground">트렌드 상세 분석</p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-left">
            {product.title}의 상세한 트렌드 분석 정보와 경쟁사 비교, AI 추천 인사이트를 확인하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기본 정보 및 현재 성과 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-foreground" />
                  현재 성과
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">카테고리</span>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">총 조회수</span>
                  <span className="font-semibold">{product.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">예상 수익</span>
                  <span className="font-semibold text-green-600">{product.revenue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">성장률</span>
                  <div className="flex items-center gap-1">
                    {product.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`font-semibold ${product.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {product.growth > 0 ? "+" : ""}{product.growth}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">시장 점유율</span>
                  <span className="font-semibold">{detailedData.marketShare}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4 text-foreground" />
                  예측 성과
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">다음 주 예상</span>
                  <span className="font-semibold text-green-600">{detailedData.forecast.nextWeek}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">다음 달 예상</span>
                  <span className="font-semibold text-green-600">{detailedData.forecast.nextMonth}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">신뢰도</span>
                    <span className="font-semibold">{detailedData.forecast.confidence}%</span>
                  </div>
                  <Progress value={detailedData.forecast.confidence} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 경쟁사 분석 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-foreground" />
                경쟁사 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detailedData.competitorGrowth.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{competitor.name}</h4>
                      <p className="text-xs text-muted-foreground">시장점유율 {competitor.market}%</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-sm font-semibold text-green-500">+{competitor.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 상위 크리에이터 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4 w-4 text-foreground" />
                상위 크리에이터
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detailedData.topCreators.map((creator, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-gradient rounded-full flex items-center justify-center text-white text-sm font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{creator.name}</h4>
                        <p className="text-xs text-muted-foreground">구독자 {creator.subscribers}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{creator.revenue}</div>
                      <div className="text-xs text-green-600">{creator.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI 인사이트 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-foreground" />
                AI 추천 인사이트
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {detailedData.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-brand-gradient rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1 bg-brand-gradient hover:opacity-90"
              onClick={handleStartWorkflow}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              콘텐츠 제작 시작하기
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleNotificationSettings}>
              <Clock className="h-4 w-4 mr-2" />
              알림 설정하기
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* 카카오톡 알림 설정 모달 */}
      <KakaoNotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        productName={product.title}
        productId={product.title}
      />
    </Dialog>
  );
}