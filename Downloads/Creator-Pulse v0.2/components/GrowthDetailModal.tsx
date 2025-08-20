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
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  BarChart3,
  Activity,
  ArrowRight,
  Clock,
  Users,
  Eye,
  Zap,
  Award,
  Lightbulb,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson
} from "lucide-react";
import { 
  generateGrowthReportData, 
  downloadPDF, 
  downloadCSV, 
  downloadJSON 
} from "../utils/reportUtils";

interface GrowthDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GrowthDetailModal({ isOpen, onClose }: GrowthDetailModalProps) {
  const [activeTab, setActiveTab] = useState("trends");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format: 'pdf' | 'csv' | 'json') => {
    setIsDownloading(true);
    toast.loading("성장 리포트를 생성중입니다...", { id: "download" });
    
    try {
      const reportData = generateGrowthReportData();
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (format) {
        case 'pdf':
          downloadPDF(reportData, 'growth-report');
          break;
        case 'csv':
          const csvData = [
            ...reportData.data.weeklyGrowth,
            ...reportData.data.competitorAnalysis
          ];
          downloadCSV(csvData, 'growth-report');
          break;
        case 'json':
          downloadJSON(reportData, 'growth-report');
          break;
      }
      
      toast.success("성장 리포트 다운로드가 완료되었습니다!", { id: "download" });
    } catch (error) {
      toast.error("리포트 다운로드 중 오류가 발생했습니다.", { id: "download" });
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // 성장률 데이터
  const growthData = {
    overall: "+24.5%",
    monthly: "+18.7%",
    weekly: "+6.3%",
    daily: "+2.1%",
    trendData: [
      { metric: "조회수 성장", current: 32.4, previous: 24.1, change: "+8.3%" },
      { metric: "구독자 성장", current: 15.8, previous: 12.3, change: "+3.5%" },
      { metric: "수익 성장", current: 24.5, previous: 18.2, change: "+6.3%" },
      { metric: "참여율 성장", current: 19.2, previous: 16.7, change: "+2.5%" }
    ],
    categoryGrowth: [
      { name: "전자기기", growth: 45.2, trend: "up", color: "bg-green-500" },
      { name: "패션/뷰티", growth: 38.7, trend: "up", color: "bg-blue-500" },
      { name: "생활용품", growth: 31.5, trend: "up", color: "bg-purple-500" },
      { name: "스포츠/건강", growth: 28.9, trend: "up", color: "bg-orange-500" },
      { name: "도서/교육", growth: 12.3, trend: "down", color: "bg-red-500" }
    ],
    milestones: [
      { date: "2024.01.15", title: "첫 1만 구독자 달성", impact: "+150% 성장 가속화" },
      { date: "2024.02.03", title: "브랜드 협찬 시작", impact: "+85% 수익 증가" },
      { date: "2024.02.28", title: "바이럴 콘텐츠 제작", impact: "+200% 조회수 급증" },
      { date: "2024.03.10", title: "쇼핑 태그 도입", impact: "+120% 전환율 향상" }
    ],
    forecast: {
      nextWeek: 28.3,
      nextMonth: 35.7,
      confidence: 92
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">성장률 상세 분석</h3>
              <p className="text-sm text-muted-foreground">채널 성장 추세와 핵심 지표 분석</p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 ml-auto">
              <TrendingUp className="h-3 w-3 mr-1" />
              {growthData.overall}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            다양한 성장 지표와 카테고리별 성장률을 분석하여 향후 전략을 수립하세요.
          </DialogDescription>
        </DialogHeader>

        {/* 메인 성장 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">전체 성장률</p>
                  <p className="text-2xl font-bold text-blue-600">{growthData.overall}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">월간 성장률</p>
                  <p className="text-2xl font-bold text-green-600">{growthData.monthly}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">주간 성장률</p>
                  <p className="text-2xl font-bold text-purple-600">{growthData.weekly}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">예측 성장률</p>
                  <p className="text-2xl font-bold text-orange-600">+{growthData.forecast.nextMonth}%</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              성장 추세
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              카테고리별
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              성장 이정표
            </TabsTrigger>
          </TabsList>

          {/* 성장 추세 탭 */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  핵심 지표 성장률
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {growthData.trendData.map((trend, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{trend.metric}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {trend.previous}% → {trend.current}%
                          </span>
                          <Badge className="bg-green-100 text-green-700">
                            {trend.change}
                          </Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={trend.current} className="h-4" />
                        <div 
                          className="absolute top-0 h-4 bg-gray-300 rounded-full opacity-30"
                          style={{ width: `${trend.previous}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>이전 기간: {trend.previous}%</span>
                        <span>현재 기간: {trend.current}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  성장률 변화 추이
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">상승 요인</span>
                      </div>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• 바이럴 콘텐츠 효과</li>
                        <li>• 브랜드 협찬 증가</li>
                        <li>• 시청자 참여율 상승</li>
                        <li>• 알고리즘 최적화</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">성장 가속화 팩터</span>
                      </div>
                      <ul className="space-y-1 text-sm text-blue-700">
                        <li>• SEO 최적화 효과</li>
                        <li>• 크로스 플랫폼 확장</li>
                        <li>• 커뮤니티 활성화</li>
                        <li>• 콘텐츠 품질 향상</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 카테고리별 탭 */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  카테고리별 성장률
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {growthData.categoryGrowth.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 ${category.color} rounded`}></div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${
                            category.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {category.trend === 'up' ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            +{category.growth}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={category.growth} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  카테고리 성장 인사이트
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border-l-4 border-green-500 bg-green-50">
                  <p className="font-medium text-green-800">전자기기 급성장</p>
                  <p className="text-sm text-green-700">신제품 출시 시즌과 맞물려 45.2% 성장 달성</p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <p className="font-medium text-blue-800">패션/뷰티 안정 성장</p>
                  <p className="text-sm text-blue-700">꾸준한 수요로 38.7% 성장률 유지</p>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                  <p className="font-medium text-orange-800">개선 필요 카테고리</p>
                  <p className="text-sm text-orange-700">도서/교육 분야 콘텐츠 전략 재검토 필요</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 성장 이정표 탭 */}
          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  주요 성장 이정표
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {growthData.milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-brand-gradient rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{milestone.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {milestone.date}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              성장에 미친 영향: {milestone.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                      {index < growthData.milestones.length - 1 && (
                        <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  다음 성장 목표
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800">단기 목표</span>
                    </div>
                    <p className="text-sm text-purple-700 mb-2">10만 구독자 달성</p>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-purple-600 mt-1">현재 75% 달성</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">중기 목표</span>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">월 1000만 조회수</p>
                    <Progress value={45} className="h-2" />
                    <p className="text-xs text-blue-600 mt-1">현재 45% 달성</p>
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
                {isDownloading ? '다운로드 중...' : '성장 전략 리포트'}
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