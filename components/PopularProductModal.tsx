import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { KakaoNotificationModal } from "./KakaoNotificationModal";
import { 
  Star, 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  BarChart3,
  Target,
  Clock,
  Award,
  ThumbsUp,
  MessageCircle,
  Share2,
  Eye,
  TrendingDown,
  Calendar
} from "lucide-react";

interface PopularProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: string;
    rating: number;
    sales: string;
    growth: string;
    creator: string;
    image: string;
  } | null;
  onPageChange?: (page: string) => void;
}

export function PopularProductModal({ isOpen, onClose, product, onPageChange }: PopularProductModalProps) {
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
    description: "업계 최고 수준의 노이즈 캔슬링과 투명 모드를 제공하는 프리미엄 무선 이어폰",
    features: [
      "능동형 노이즈 캔슬링",
      "공간 음향 지원",
      "최대 6시간 연속 재생",
      "무선 충전 케이스",
      "IPX4 방수 등급"
    ],
    performanceStats: {
      conversionRate: 8.7,
      avgOrderValue: 349000,
      returnRate: 2.1,
      customerSatisfaction: 94.3
    },
    creatorStats: {
      totalViews: "2.4M",
      avgViews: "45K",
      engagement: 12.8,
      subscribers: "125만",
      totalVideos: 23
    },
    recentPerformance: [
      { date: "지난 주", views: 128000, sales: 842, revenue: 29.4 },
      { date: "2주 전", views: 112000, sales: 721, revenue: 25.2 },
      { date: "3주 전", views: 98000, sales: 654, revenue: 22.8 },
      { date: "4주 전", views: 89000, sales: 578, revenue: 20.2 }
    ],
    competitorPrice: [
      { name: "소니 WF-1000XM4", price: 329000, difference: "+6.1%" },
      { name: "삼성 갤럭시 버즈", price: 229000, difference: "+52.4%" },
      { name: "젠하이저 모멘텀", price: 399000, difference: "-12.5%" }
    ],
    contentInsights: [
      {
        type: "언박싱 리뷰",
        performance: "매우 높음",
        avgViews: "67K",
        conversionRate: 12.3
      },
      {
        type: "비교 리뷰",
        performance: "높음", 
        avgViews: "54K",
        conversionRate: 9.8
      },
      {
        type: "사용 후기",
        performance: "보통",
        avgViews: "38K",
        conversionRate: 7.2
      }
    ],
    recommendations: [
      "언박싱과 첫인상 위주의 콘텐츠 제작 권장",
      "경쟁 제품과의 음질 비교 테스트 포함",
      "일상 사용 시나리오별 테스트 진행"
    ]
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
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">상품 성과 분석</p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-left">
            {product.name}의 판매 성과, 고객 만족도, 크리에이터 정보와 AI 기반 콘텐츠 추천을 확인하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기본 정보 및 현재 성과 - 2열 레이아웃 */}
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
                  <span className="text-sm text-muted-foreground">현재 가격</span>
                  <span className="font-semibold text-green-600">{product.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">총 판매량</span>
                  <span className="font-semibold">{product.sales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">성장률</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-semibold text-green-500">{product.growth}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">전환율</span>
                  <span className="font-semibold">{detailedData.performanceStats.conversionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">평점</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-foreground" />
                  크리에이터 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">크리에이터</span>
                  <span className="font-semibold">{product.creator}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">구독자</span>
                  <span className="font-semibold">{detailedData.creatorStats.subscribers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">총 조회수</span>
                  <span className="font-semibold">{detailedData.creatorStats.totalViews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">참여율</span>
                  <span className="font-semibold">{detailedData.creatorStats.engagement}%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">만족도</span>
                    <span className="font-semibold">{detailedData.performanceStats.customerSatisfaction}%</span>
                  </div>
                  <Progress value={detailedData.performanceStats.customerSatisfaction} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 주간 성과 트렌드 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-foreground" />
                주간 성과 트렌드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detailedData.recentPerformance.map((week, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{week.date}</h4>
                      <p className="text-xs text-muted-foreground">조회수 {week.views.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">₩{week.revenue}M</div>
                      <div className="text-xs text-green-600">{week.sales.toLocaleString()} 판매</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 경쟁사 분석 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-foreground" />
                경쟁사 가격 비교
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detailedData.competitorPrice.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{competitor.name}</h4>
                      <p className="text-xs text-muted-foreground">경쟁 제품</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">₩{competitor.price.toLocaleString()}</div>
                      <div className={`text-xs ${competitor.difference.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {competitor.difference}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 콘텐츠 타입별 성과 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4 w-4 text-foreground" />
                콘텐츠 타입별 성과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detailedData.contentInsights.map((content, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{content.type}</h4>
                      <p className="text-xs text-muted-foreground">평균 조회수 {content.avgViews}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={content.performance === "매우 높음" ? "default" : 
                                content.performance === "높음" ? "secondary" : "outline"}
                        className="mb-1 text-xs"
                      >
                        {content.performance}
                      </Badge>
                      <div className="text-xs text-green-600">전환율 {content.conversionRate}%</div>
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
                {detailedData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-brand-gradient rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm leading-relaxed">{recommendation}</p>
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
              <ShoppingBag className="h-4 w-4 mr-2" />
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
        productName={product.name}
        productId={product.id.toString()}
      />
    </Dialog>
  );
}