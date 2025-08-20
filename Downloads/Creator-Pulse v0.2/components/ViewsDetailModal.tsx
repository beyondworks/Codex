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
  Eye,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Activity,
  BarChart3,
  Calendar,
  Target,
  Lightbulb,
  Play,
  Zap,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson
} from "lucide-react";
import { 
  generateViewsReportData, 
  downloadPDF, 
  downloadCSV, 
  downloadJSON 
} from "../utils/reportUtils";

interface ViewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ViewsDetailModal({ isOpen, onClose }: ViewsDetailModalProps) {
  const [activeTab, setActiveTab] = useState("analytics");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format: 'pdf' | 'csv' | 'json') => {
    setIsDownloading(true);
    toast.loading("조회수 리포트를 생성중입니다...", { id: "download" });
    
    try {
      const reportData = generateViewsReportData();
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (format) {
        case 'pdf':
          downloadPDF(reportData, 'views-report');
          break;
        case 'csv':
          const csvData = [
            ...reportData.data.hourlyPattern,
            ...reportData.data.topVideos
          ];
          downloadCSV(csvData, 'views-report');
          break;
        case 'json':
          downloadJSON(reportData, 'views-report');
          break;
      }
      
      toast.success("조회수 리포트 다운로드가 완료되었습니다!", { id: "download" });
    } catch (error) {
      toast.error("리포트 다운로드 중 오류가 발생했습니다.", { id: "download" });
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const viewsData = {
    total: "2,428,156",
    growth: "+12.5%",
    avgDaily: "78,328",
    peakDay: "125,892",
    weeklyData: [
      { week: "1주차", views: 456789, growth: 8.2 },
      { week: "2주차", views: 523456, growth: 14.6 },
      { week: "3주차", views: 612345, growth: 17.0 },
      { week: "4주차", views: 678321, growth: 10.8 }
    ],
    topVideos: [
      { title: "겨울 필수템 TOP 10 🔥", views: 125892, duration: "12:34", retention: 68.5 },
      { title: "홈트 필수 운동용품", views: 98765, duration: "8:42", retention: 72.3 },
      { title: "신상 뷰티 아이템 리뷰", views: 89432, duration: "15:21", retention: 65.8 },
      { title: "가성비 갑! 생활용품", views: 67821, duration: "10:15", retention: 61.2 }
    ],
    audienceData: {
      ageGroups: [
        { range: "18-24", percentage: 25.4, views: 618000 },
        { range: "25-34", percentage: 38.7, views: 940000 },
        { range: "35-44", percentage: 22.3, views: 541000 },
        { range: "45+", percentage: 13.6, views: 330000 }
      ],
      gender: {
        female: 64.2,
        male: 35.8
      },
      topRegions: [
        { region: "서울", percentage: 35.2 },
        { region: "경기", percentage: 22.1 },
        { region: "부산", percentage: 8.7 },
        { region: "대구", percentage: 6.4 }
      ]
    },
    peakTimes: [
      { time: "오전 9시", views: 12.3 },
      { time: "오후 1시", views: 18.7 },
      { time: "오후 7시", views: 45.2 },
      { time: "오후 10시", views: 32.1 }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">조회수 상세 분석</h3>
              <p className="text-sm text-muted-foreground">시청자 행동 패턴과 콘텐츠 성과 분석</p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 ml-auto">
              <TrendingUp className="h-3 w-3 mr-1" />
              {viewsData.growth}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            조회수 패턴과 시청자 분석을 통해 콘텐츠 전략을 최적화하세요.
          </DialogDescription>
        </DialogHeader>

        {/* 메인 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 조회수</p>
                  <p className="text-2xl font-bold text-blue-600">{viewsData.total}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">일평균 조회수</p>
                  <p className="text-2xl font-bold text-green-600">{viewsData.avgDaily}</p>
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
                  <p className="text-sm text-muted-foreground">최고 조회수</p>
                  <p className="text-2xl font-bold text-purple-600">{viewsData.peakDay}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">평균 시청률</p>
                  <p className="text-2xl font-bold text-orange-600">67.2%</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Play className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              조회 분석
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              시청자 분석
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              최적화 팁
            </TabsTrigger>
          </TabsList>

          {/* 조회 분석 탭 */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    주간 조회수 추이
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {viewsData.weeklyData.map((week, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{week.week}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{week.views.toLocaleString()}</span>
                            <Badge className="bg-blue-100 text-blue-700">
                              +{week.growth}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={(week.views / 800000) * 100} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    상위 영상 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {viewsData.topVideos.map((video, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
                          <Badge variant="outline" className="ml-2">
                            #{index + 1}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{video.views.toLocaleString()} 조회</span>
                          <span>{video.duration}</span>
                          <span>시청률 {video.retention}%</span>
                        </div>
                        <Progress value={video.retention} className="h-1 mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  시간대별 조회 패턴
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {viewsData.peakTimes.map((time, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium">{time.time}</p>
                      <p className="text-2xl font-bold text-blue-600 my-2">{time.views}%</p>
                      <Progress value={time.views} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 시청자 분석 탭 */}
          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    연령대별 분포
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {viewsData.audienceData.ageGroups.map((group, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{group.range}세</span>
                          <div className="text-right">
                            <div className="font-bold">{group.percentage}%</div>
                            <div className="text-sm text-muted-foreground">
                              {group.views.toLocaleString()} 조회
                            </div>
                          </div>
                        </div>
                        <Progress value={group.percentage} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    성별 및 지역 분포
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">성별 분포</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>여성</span>
                        <span className="font-bold">{viewsData.audienceData.gender.female}%</span>
                      </div>
                      <Progress value={viewsData.audienceData.gender.female} className="h-3" />
                      <div className="flex items-center justify-between">
                        <span>남성</span>
                        <span className="font-bold">{viewsData.audienceData.gender.male}%</span>
                      </div>
                      <Progress value={viewsData.audienceData.gender.male} className="h-3" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">지역별 분포</h4>
                    <div className="space-y-2">
                      {viewsData.audienceData.topRegions.map((region, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{region.region}</span>
                          <span className="font-bold">{region.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 최적화 팁 탭 */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  조회수 최적화 인사이트
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-blue-800 mb-2">🎯 최적 업로드 시간</h4>
                    <p className="text-sm text-blue-700">
                      오후 7시 업로드 시 평균 45.2% 높은 조회수 기록
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-medium text-green-800 mb-2">📱 모바일 최적화</h4>
                    <p className="text-sm text-green-700">
                      세로형 썸네일 사용 시 모바일 클릭률 28% 증가
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-medium text-purple-800 mb-2">🔥 트렌드 키워드</h4>
                    <p className="text-sm text-purple-700">
                      "겨울", "필수템" 키워드 포함 시 조회수 35% 증가
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-medium text-orange-800 mb-2">⏰ 콘텐츠 길이</h4>
                    <p className="text-sm text-orange-700">
                      10-15분 길이에서 최고 시청률 67.2% 달성
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
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-yellow-500 text-white">우선순위 높음</Badge>
                      <span className="font-medium">썸네일 A/B 테스트</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      현재 썸네일 vs 감정표현 강화 썸네일 테스트 진행
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-blue-500 text-white">우선순위 중간</Badge>
                      <span className="font-medium">영상 시작 15초 개선</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      후킹 포인트를 더 앞당겨 시청자 이탈률 감소
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-green-500 text-white">장기 전략</Badge>
                      <span className="font-medium">시리즈 콘텐츠 기획</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      연속성 있는 콘텐츠로 구독자 충성도 향상
                    </p>
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
                {isDownloading ? '다운로드 중...' : '조회수 최적화 리포트'}
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