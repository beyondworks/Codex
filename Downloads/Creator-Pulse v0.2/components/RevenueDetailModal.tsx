import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { toast } from "sonner@2.0.3";
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  ArrowRight,
  Clock,
  Star,
  Zap,
  Eye,
  ShoppingCart,
  Lightbulb,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson
} from "lucide-react";
import { 
  generateRevenueReportData, 
  downloadPDF, 
  downloadCSV, 
  downloadJSON 
} from "../utils/reportUtils";

interface RevenueDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RevenueDetailModal({ isOpen, onClose }: RevenueDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format: 'pdf' | 'csv' | 'json') => {
    setIsDownloading(true);
    toast.loading("리포트를 생성중입니다...", { id: "download" });
    
    try {
      const reportData = generateRevenueReportData();
      
      // 실제 환경에서는 약간의 지연을 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (format) {
        case 'pdf':
          downloadPDF(reportData, 'revenue-report');
          break;
        case 'csv':
          const csvData = [
            ...reportData.data.monthlyData,
            ...reportData.data.topProducts.map(p => ({
              category: 'top_product',
              name: p.name,
              revenue: p.revenue,
              percentage: p.percentage
            }))
          ];
          downloadCSV(csvData, 'revenue-report');
          break;
        case 'json':
          downloadJSON(reportData, 'revenue-report');
          break;
      }
      
      toast.success("리포트 다운로드가 완료되었습니다!", { id: "download" });
    } catch (error) {
      toast.error("리포트 다운로드 중 오류가 발생했습니다.", { id: "download" });
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // 수익 데이터
  const revenueData = {
    total: "₩18.2M",
    monthlyGrowth: "+24.5%",
    weeklyData: [
      { week: "1주차", revenue: 3.2, growth: 15.2 },
      { week: "2주차", revenue: 4.1, growth: 18.7 },
      { week: "3주차", revenue: 5.3, growth: 22.1 },
      { week: "4주차", revenue: 5.6, growth: 24.5 }
    ],
    sources: [
      { name: "쇼핑 태그", amount: 12.8, percentage: 70, color: "bg-red-500" },
      { name: "브랜드 협찬", amount: 3.2, percentage: 18, color: "bg-blue-500" },
      { name: "멤버십", amount: 1.5, percentage: 8, color: "bg-green-500" },
      { name: "광고 수익", amount: 0.7, percentage: 4, color: "bg-yellow-500" }
    ],
    topProducts: [
      { name: "무선 이어폰", revenue: 2.8, sales: 142, trend: "up" },
      { name: "스마트워치", revenue: 2.1, sales: 89, trend: "up" },
      { name: "노트북 거치대", revenue: 1.9, sales: 156, trend: "up" },
      { name: "블루투스 스피커", revenue: 1.6, sales: 74, trend: "down" }
    ],
    forecast: {
      nextWeek: 6.2,
      nextMonth: 22.8,
      confidence: 87
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">수익 상세 분석</h3>
              <p className="text-sm text-muted-foreground">실시간 수익 현황과 예측 분석</p>
            </div>
            <Badge className="bg-green-100 text-green-700 ml-auto">
              <TrendingUp className="h-3 w-3 mr-1" />
              {revenueData.monthlyGrowth}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            다양한 수익원별 분석과 향후 예측 데이터를 확인하세요.
          </DialogDescription>
        </DialogHeader>

        {/* 메인 지표 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 수익</p>
                  <p className="text-2xl font-bold text-green-600">{revenueData.total}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">주간 평균</p>
                  <p className="text-2xl font-bold text-blue-600">₩4.6M</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">예측 수익</p>
                  <p className="text-2xl font-bold text-purple-600">₩{revenueData.forecast.nextMonth}M</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">예측 신뢰도</p>
                  <p className="text-2xl font-bold text-orange-600">{revenueData.forecast.confidence}%</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              개요
            </TabsTrigger>
            <TabsTrigger value="sources" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              수익원 분석
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              예측 분석
            </TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 주간 성장 차트 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    주간 수익 성장
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.weeklyData.map((week, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{week.week}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">₩{week.revenue}M</span>
                            <Badge className="bg-green-100 text-green-700">
                              +{week.growth}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={(week.revenue / 6) * 100} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 상위 수익 상품 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    상위 수익 상품
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {revenueData.topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-brand-gradient rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.sales} 판매</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₩{product.revenue}M</p>
                          <div className="flex items-center gap-1">
                            {product.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 수익원 분석 탭 */}
          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  수익원별 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 파이 차트 시각화 */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                        {revenueData.sources.map((source, index) => {
                          const offset = revenueData.sources.slice(0, index).reduce((sum, s) => sum + s.percentage, 0);
                          const circumference = 2 * Math.PI * 40;
                          const strokeDasharray = `${(source.percentage / 100) * circumference} ${circumference}`;
                          const strokeDashoffset = -((offset / 100) * circumference);
                          
                          return (
                            <circle
                              key={index}
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke={source.color.replace('bg-', '').replace('-500', '')}
                              strokeWidth="8"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              className="opacity-80"
                            />
                          );
                        })}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{revenueData.total}</div>
                          <div className="text-sm text-muted-foreground">총 수익</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 수익원 목록 */}
                  <div className="space-y-4">
                    {revenueData.sources.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 ${source.color} rounded`}></div>
                            <span className="font-medium">{source.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₩{source.amount}M</div>
                            <div className="text-sm text-muted-foreground">{source.percentage}%</div>
                          </div>
                        </div>
                        <Progress value={source.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 예측 분석 탭 */}
          <TabsContent value="forecast" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    수익 예측
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">다음 주 예상 수익</p>
                        <p className="text-sm text-muted-foreground">현재 성장률 기준</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">₩{revenueData.forecast.nextWeek}M</p>
                        <Badge className="bg-blue-100 text-blue-700">+10.7%</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">다음 달 예상 수익</p>
                        <p className="text-sm text-muted-foreground">AI 예측 모델</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₩{revenueData.forecast.nextMonth}M</p>
                        <Badge className="bg-green-100 text-green-700">+25.3%</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>예측 신뢰도</span>
                      <span className="font-semibold">{revenueData.forecast.confidence}%</span>
                    </div>
                    <Progress value={revenueData.forecast.confidence} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    AI 수익 최적화 제안
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-green-500 bg-green-50">
                      <p className="font-medium text-green-800">상위 카테고리 집중</p>
                      <p className="text-sm text-green-700">전자기기 카테고리에서 +31% 수익 증가 가능</p>
                    </div>
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                      <p className="font-medium text-blue-800">업로드 타이밍 최적화</p>
                      <p className="text-sm text-blue-700">화요일 오후 7시 업로드 시 +18% 수익 향상</p>
                    </div>
                    <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                      <p className="font-medium text-purple-800">브랜드 협찬 확대</p>
                      <p className="text-sm text-purple-700">현재 성과 기준 3개 브랜드 추가 가능</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="bg-brand-gradient hover:opacity-90"
                disabled={isDownloading}
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? '다운로드 중...' : '상세 리포트 다운로드'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                <FileText className="h-4 w-4 mr-2" />
                PDF 리포트
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('csv')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel/CSV 데이터
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('json')}>
                <FileJson className="h-4 w-4 mr-2" />
                JSON 데이터
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DialogContent>
    </Dialog>
  );
}