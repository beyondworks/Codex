import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { toast } from "sonner";
import { 
  Target,
  TrendingUp,
  ShoppingCart,
  Users,
  BarChart3,
  Activity,
  Clock,
  Zap,
  Lightbulb,
  MousePointer,
  CreditCard,
  Eye,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson
} from "lucide-react";
import { 
  generateConversionReportData, 
  downloadPDF, 
  downloadCSV, 
  downloadJSON 
} from "../utils/reportUtils";

interface ConversionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConversionDetailModal({ isOpen, onClose }: ConversionDetailModalProps) {
  const [activeTab, setActiveTab] = useState("funnel");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format: 'pdf' | 'csv' | 'json') => {
    setIsDownloading(true);
    toast.loading("전환률 리포트를 생성중입니다...", { id: "download" });
    
    try {
      const reportData = generateConversionReportData();
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (format) {
        case 'pdf':
          downloadPDF(reportData, 'conversion-report');
          break;
        case 'csv':
          const csvData = [
            ...reportData.data.conversionFunnel,
            ...reportData.data.topConvertingProducts
          ];
          downloadCSV(csvData, 'conversion-report');
          break;
        case 'json':
          downloadJSON(reportData, 'conversion-report');
          break;
      }
      
      toast.success("전환률 리포트 다운로드가 완료되었습니다!", { id: "download" });
    } catch (error) {
      toast.error("리포트 다운로드 중 오류가 발생했습니다.", { id: "download" });
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const conversionData = {
    rate: "4.8%",
    growth: "+0.3%",
    totalConversions: 1247,
    conversionValue: "₩18.2M",
    funnel: [
      { stage: "영상 조회", count: 125892, rate: 100, color: "bg-blue-500" },
      { stage: "상품 클릭", count: 10872, rate: 8.6, color: "bg-green-500" },
      { stage: "상품페이지 방문", count: 8234, rate: 6.5, color: "bg-yellow-500" },
      { stage: "장바구니 추가", count: 3421, rate: 2.7, color: "bg-orange-500" },
      { stage: "결제 완료", count: 1247, rate: 4.8, color: "bg-red-500" }
    ],
    categoryConversion: [
      { name: "뷰티/화장품", rate: 6.2, revenue: "₩8.2M", orders: 442 },
      { name: "전자기기", rate: 3.8, revenue: "₩5.1M", orders: 234 },
      { name: "패션/의류", rate: 5.1, revenue: "₩3.6M", orders: 298 },
      { name: "생활용품", rate: 4.2, revenue: "₩1.3M", orders: 273 }
    ],
    timeAnalysis: [
      { time: "0-24시간", rate: 2.8, description: "즉시 구매" },
      { time: "1-3일", rate: 1.2, description: "고려 후 구매" },
      { time: "4-7일", rate: 0.6, description: "재방문 구매" },
      { time: "1주 이후", rate: 0.2, description: "장기 전환" }
    ],
    deviceData: {
      mobile: { rate: 5.2, orders: 823 },
      desktop: { rate: 3.9, orders: 298 },
      tablet: { rate: 4.1, orders: 126 }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">전환율 상세 분석</h3>
              <p className="text-sm text-muted-foreground">구매 전환 과정과 최적화 인사이트</p>
            </div>
            <Badge className="bg-orange-100 text-orange-700 ml-auto">
              <TrendingUp className="h-3 w-3 mr-1" />
              {conversionData.growth}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            전환 과정을 단계별로 분석하여 구매율을 높이는 전략을 발견하세요.
          </DialogDescription>
        </DialogHeader>

        {/* 메인 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">전체 전환율</p>
                  <p className="text-2xl font-bold text-orange-600">{conversionData.rate}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 전환수</p>
                  <p className="text-2xl font-bold text-green-600">{conversionData.totalConversions.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">전환 가치</p>
                  <p className="text-2xl font-bold text-purple-600">{conversionData.conversionValue}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">평균 주문가</p>
                  <p className="text-2xl font-bold text-blue-600">₩14,600</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="funnel" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              전환 퍼널
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              카테고리별
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              최적화
            </TabsTrigger>
          </TabsList>

          {/* 전환 퍼널 탭 */}
          <TabsContent value="funnel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  전환 퍼널 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {conversionData.funnel.map((stage, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 ${stage.color} rounded`}></div>
                          <span className="font-medium">{stage.stage}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{stage.count.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {index === 0 ? '100%' : `${stage.rate.toFixed(1)}%`}
                          </div>
                        </div>
                      </div>
                      
                      {/* 퍼널 시각화 */}
                      <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className={`h-full ${stage.color} transition-all duration-500`}
                          style={{ width: index === 0 ? '100%' : `${(stage.count / conversionData.funnel[0].count) * 100}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`font-medium transition-colors duration-500 ${
                            index === 0 || (stage.count / conversionData.funnel[0].count) * 100 > 50 
                              ? 'text-white' 
                              : 'text-gray-800'
                          }`}>
                            {stage.count.toLocaleString()}명
                          </span>
                        </div>
                      </div>
                      
                      {/* 이탈률 */}
                      {index < conversionData.funnel.length - 1 && (
                        <div className="mt-2 text-center">
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            이탈률: {(100 - (conversionData.funnel[index + 1].count / stage.count) * 100).toFixed(1)}%
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    시간대별 전환 분석
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversionData.timeAnalysis.map((time, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{time.time}</span>
                            <p className="text-sm text-muted-foreground">{time.description}</p>
                          </div>
                          <span className="font-bold text-orange-600">{time.rate}%</span>
                        </div>
                        <Progress value={(time.rate / 3) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5" />
                    디바이스별 전환율
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <span className="font-medium">모바일</span>
                        <p className="text-sm text-muted-foreground">{conversionData.deviceData.mobile.orders}건 주문</p>
                      </div>
                      <span className="text-xl font-bold text-blue-600">
                        {conversionData.deviceData.mobile.rate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <span className="font-medium">데스크톱</span>
                        <p className="text-sm text-muted-foreground">{conversionData.deviceData.desktop.orders}건 주문</p>
                      </div>
                      <span className="text-xl font-bold text-green-600">
                        {conversionData.deviceData.desktop.rate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <span className="font-medium">태블릿</span>
                        <p className="text-sm text-muted-foreground">{conversionData.deviceData.tablet.orders}건 주문</p>
                      </div>
                      <span className="text-xl font-bold text-purple-600">
                        {conversionData.deviceData.tablet.rate}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 카테고리별 탭 */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  카테고리별 전환 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionData.categoryConversion.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{category.name}</h4>
                        <Badge className="bg-green-100 text-green-700">
                          {category.rate}% 전환율
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">수익</p>
                          <p className="font-bold">{category.revenue}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">주문수</p>
                          <p className="font-bold">{category.orders}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">평균 주문가</p>
                          <p className="font-bold">₩{Math.round(parseInt(category.revenue.replace(/[₩,M]/g, '')) * 1000000 / category.orders).toLocaleString()}</p>
                        </div>
                      </div>
                      <Progress value={category.rate * 10} className="h-2 mt-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 최적화 탭 */}
          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  전환율 최적화 인사이트
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-medium text-green-800 mb-2">🛒 장바구니 최적화</h4>
                    <p className="text-sm text-green-700">
                      장바구니 단계에서 73% 이탈 발생. 간편결제 추가 권장
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-blue-800 mb-2">📱 모바일 UX 개선</h4>
                    <p className="text-sm text-blue-700">
                      모바일 전환율이 높음. 모바일 최적화에 더 집중
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-medium text-purple-800 mb-2">⏰ 리타겟팅 전략</h4>
                    <p className="text-sm text-purple-700">
                      24시간 내 재방문 시 전환율 2.8배 증가
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-medium text-orange-800 mb-2">💰 프로모션 효과</h4>
                    <p className="text-sm text-orange-700">
                      할인 쿠폰 제공 시 전환율 45% 증가
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  즉시 실행 가능한 개선안
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-500 text-white">긴급</Badge>
                      <span className="font-medium">장바구니 이탈률 개선</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      현재 73% 이탈률을 50%까지 줄이기 위한 즉시 개선
                    </p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• 원클릭 결제 시스템 도입</li>
                      <li>• 배송비 무료 기준 명시</li>
                      <li>• 보안 인증 마크 추가</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-yellow-500 text-white">중요</Badge>
                      <span className="font-medium">상품페이지 개선</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      상품 상세 페이지 체류시간 증가로 전환율 향상
                    </p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• 고화질 상품 이미지 추가</li>
                      <li>• 리뷰 및 평점 노출 확대</li>
                      <li>• 사용법 영상 임베드</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                {isDownloading ? '다운로드 중...' : '전환율 최적화 리포트'}
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