import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  ShoppingCart, 
  Eye,
  Calendar,
  Star,
  Users,
  Target,
  Lightbulb,
  Clock,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface CategoryAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: any;
}

export function CategoryAnalysisModal({ isOpen, onClose, category }: CategoryAnalysisModalProps) {
  // 카테고리별 상세 데이터 (실제로는 API에서 가져올 데이터)
  const getAnalysisData = (categoryName: string) => {
    const baseData = {
      overview: {
        monthlyGrowth: Math.random() * 50 + 10,
        avgPrice: Math.floor(Math.random() * 200 + 50),
        topCreators: Math.floor(Math.random() * 50 + 20),
        totalViews: `${Math.floor(Math.random() * 10 + 5)}.${Math.floor(Math.random() * 10)}M`
      },
      trends: [
        { month: "1월", revenue: 120, products: 45, growth: 15 },
        { month: "2월", revenue: 135, products: 52, growth: 22 },
        { month: "3월", revenue: 158, products: 48, growth: 18 },
        { month: "4월", revenue: 142, products: 55, growth: 28 },
        { month: "5월", revenue: 168, products: 61, growth: 35 },
        { month: "6월", revenue: 195, products: 58, growth: 42 }
      ],
      topProducts: [
        { name: "인기 상품 #1", sales: "12.5K", revenue: "₩145M", growth: 45 },
        { name: "인기 상품 #2", sales: "10.2K", revenue: "₩128M", growth: 32 },
        { name: "인기 상품 #3", sales: "8.7K", revenue: "₩98M", growth: 28 },
        { name: "인기 상품 #4", sales: "7.1K", revenue: "₩89M", growth: 15 },
        { name: "인기 상품 #5", sales: "6.8K", revenue: "₩76M", growth: 22 }
      ],
      insights: {
        bestTimeToPost: "화요일 오후 7-9시",
        targetAge: "25-34세",
        avgEngagement: "8.5%",
        seasonality: "겨울철 수요 120% 증가",
        competition: "중간",
        barriers: "낮음"
      }
    };
    return baseData;
  };

  const analysisData = category ? getAnalysisData(category.name) : null;

  if (!category || !analysisData) return null;

  const formatNumber = (num: number, decimals: number = 1): string => {
    return Number(num.toFixed(decimals)).toString();
  };

  const formatGrowth = (num: number): string => {
    const sign = num >= 0 ? '+' : '';
    return `${sign}${formatNumber(num, 1)}%`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff4d6d] to-[#ff8a3d] flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <span>{category.name} 카테고리 분석</span>
              <p className="text-sm text-muted-foreground font-normal">상세 시장 분석 리포트</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            선택된 카테고리의 상세 시장 분석 데이터와 트렌드, 경쟁 정보를 제공합니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="trends">트렌드</TabsTrigger>
            <TabsTrigger value="products">인기상품</TabsTrigger>
            <TabsTrigger value="insights">인사이트</TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-4">
            {/* 주요 지표 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">월성장률</p>
                      <p className="text-xl font-bold text-green-600">
                        {formatGrowth(analysisData.overview.monthlyGrowth)}
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">평균 단가</p>
                      <p className="text-xl font-bold">₩{analysisData.overview.avgPrice.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">상위 크리에이터</p>
                      <p className="text-xl font-bold">{analysisData.overview.topCreators}명</p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">총 조회수</p>
                      <p className="text-xl font-bold">{analysisData.overview.totalViews}</p>
                    </div>
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Eye className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 카테고리 기본 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">카테고리 현황</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>상품 수</span>
                      <span className="font-semibold">{category.products}개</span>
                    </div>
                    <Progress value={Math.min((category.products / 1000) * 100, 100)} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>총 수익</span>
                      <span className="font-semibold text-green-600">{category.revenue}</span>
                    </div>
                    <Progress value={Math.min((parseInt(category.revenue.replace(/[^\d]/g, '')) / 2000) * 100, 100)} className="h-2" />
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 트렌드 탭 */}
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">월별 성장 추이</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.trends.map((trend, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm text-muted-foreground">{trend.month}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>수익: ₩{trend.revenue}M</span>
                          <span className="font-semibold text-green-600">{formatGrowth(trend.growth)}</span>
                        </div>
                        <div className="flex gap-2">
                          <Progress value={trend.revenue / 2} className="h-2 flex-1" />
                          <div className={`flex items-center text-xs ${
                            trend.growth > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {trend.growth > 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#ff4d6d]" />
                    계절성 분석
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>봄 (3-5월)</span>
                      <Badge className="bg-green-100 text-green-700">+15%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>여름 (6-8월)</span>
                      <Badge className="bg-blue-100 text-blue-700">+5%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>가을 (9-11월)</span>
                      <Badge className="bg-orange-100 text-orange-700">+25%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>겨울 (12-2월)</span>
                      <Badge className="bg-red-100 text-red-700">+45%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#ff4d6d]" />
                    경쟁도 분석
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>진입 장벽</span>
                        <span className="text-green-600">낮음</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>경쟁 강도</span>
                        <span className="text-orange-600">중간</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>수익성</span>
                        <span className="text-green-600">높음</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 인기상품 탭 */}
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">TOP 5 인기 상품</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisData.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4d6d] to-[#ff8a3d] text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>판매량: {product.sales}</span>
                          <span>수익: {product.revenue}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        {formatGrowth(product.growth)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 인사이트 탭 */}
          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#ff4d6d]" />
                    최적 업로드 시간
                  </h4>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-800">{analysisData.insights.bestTimeToPost}</p>
                    <p className="text-sm text-blue-600">평균 대비 35% 높은 조회수</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#ff4d6d]" />
                    타겟 오디언스
                  </h4>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-lg font-bold text-purple-800">{analysisData.insights.targetAge}</p>
                    <p className="text-sm text-purple-600">주요 구매층</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-[#ff4d6d]" />
                    평균 참여율
                  </h4>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-800">{analysisData.insights.avgEngagement}</p>
                    <p className="text-sm text-green-600">업계 평균 대비 높음</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#ff4d6d]" />
                    시장 기회
                  </h4>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-lg font-bold text-orange-800">높음</p>
                    <p className="text-sm text-orange-600">{analysisData.insights.seasonality}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI 추천 */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-purple-800">
                  <Lightbulb className="h-4 w-4" />
                  AI 전략 추천
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <span>이 카테고리는 <strong>겨울철 수요가 급증</strong>하므로 11월부터 콘텐츠 제작을 시작하세요</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <span><strong>화요일 저녁 시간대</strong> 업로드가 가장 높은 참여율을 보입니다</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <span>25-34세 타겟을 위한 <strong>실용성 중심 콘텐츠</strong>가 효과적입니다</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 액션 버튼 */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            닫기
          </Button>
          <Button className="flex-1 bg-[#ff4d6d] hover:bg-[#ff4d6d]/90">
            <BarChart3 className="h-4 w-4 mr-2" />
            리포트 다운로드
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}