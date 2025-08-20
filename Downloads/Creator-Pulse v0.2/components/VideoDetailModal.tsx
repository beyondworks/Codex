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
  Play,
  Eye,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  ThumbsUp,
  Share,
  BarChart3,
  Target,
  Lightbulb,
  Calendar,
  Activity,
  Zap,
  MousePointer,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson
} from "lucide-react";
import { 
  generateVideoReportData, 
  downloadPDF, 
  downloadCSV, 
  downloadJSON 
} from "../utils/reportUtils";

interface VideoData {
  title: string;
  views: string;
  revenue: string;
  ctr: string;
  uploadDate: string;
  status: string;
}

interface VideoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoData: VideoData | null;
}

export function VideoDetailModal({ isOpen, onClose, videoData }: VideoDetailModalProps) {
  const [activeTab, setActiveTab] = useState("performance");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format: 'pdf' | 'csv' | 'json') => {
    setIsDownloading(true);
    toast.loading("영상 리포트를 생성중입니다...", { id: "download" });
    
    try {
      const reportData = generateVideoReportData(videoData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (format) {
        case 'pdf':
          downloadPDF(reportData, 'video-report');
          break;
        case 'csv':
          const csvData = [
            ...reportData.data.audienceAnalysis.demographics,
            ...reportData.data.productPerformance
          ];
          downloadCSV(csvData, 'video-report');
          break;
        case 'json':
          downloadJSON(reportData, 'video-report');
          break;
      }
      
      toast.success("영상 리포트 다운로드가 완료되었습니다!", { id: "download" });
    } catch (error) {
      toast.error("리포트 다운로드 중 오류가 발생했습니다.", { id: "download" });
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!videoData) return null;

  // 영상 상세 데이터 (실제로는 API에서 가져올 데이터)
  const detailData = {
    // 기본 정보
    duration: "12:34",
    likes: 3547,
    commentsCount: 892,
    shares: 234,
    retention: 68.5,
    
    // 시간대별 성과
    hourlyData: [
      { hour: "00", views: 1200, revenue: 145000 },
      { hour: "06", views: 890, revenue: 98000 },
      { hour: "12", views: 4200, revenue: 512000 },
      { hour: "18", views: 8900, revenue: 1234000 },
      { hour: "21", views: 12400, revenue: 1876000 }
    ],
    
    // 시청자 분석
    audience: {
      demographics: [
        { age: "18-24", percentage: 22.3, engagement: 7.8 },
        { age: "25-34", percentage: 41.7, engagement: 8.9 },
        { age: "35-44", percentage: 28.1, engagement: 6.4 },
        { age: "45+", percentage: 7.9, engagement: 5.2 }
      ],
      devices: [
        { device: "모바일", percentage: 72.4 },
        { device: "데스크톱", percentage: 23.1 },
        { device: "태블릿", percentage: 4.5 }
      ],
      traffic: [
        { source: "유튜브 검색", percentage: 34.2 },
        { source: "추천", percentage: 28.9 },
        { source: "구독자", percentage: 21.4 },
        { source: "외부 링크", percentage: 15.5 }
      ]
    },
    
    // 상품 성과
    products: [
      { name: "무선 이어폰", clicks: 892, sales: 67, revenue: 1234000, conversion: 7.5 },
      { name: "스마트워치", clicks: 634, sales: 42, revenue: 987000, conversion: 6.6 },
      { name: "블루투스 스피커", clicks: 445, sales: 28, revenue: 623000, conversion: 6.3 }
    ],
    
    // 댓글 분석
    commentAnalysis: {
      sentiment: {
        positive: 78.4,
        neutral: 18.2,
        negative: 3.4
      },
      keywords: [
        { word: "좋아요", count: 234 },
        { word: "구매", count: 189 },
        { word: "추천", count: 156 },
        { word: "가격", count: 134 },
        { word: "품질", count: 98 }
      ]
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Play className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold truncate">{videoData.title}</h3>
              <p className="text-sm text-muted-foreground">영상 상세 성과 분석</p>
            </div>
            <Badge className={`${
              videoData.status === 'trending' ? 'bg-green-100 text-green-700' : 
              videoData.status === 'stable' ? 'bg-blue-100 text-blue-700' : 
              'bg-red-100 text-red-700'
            }`}>
              {videoData.status === 'trending' && <TrendingUp className="h-3 w-3 mr-1" />}
              {videoData.status === 'declining' && <TrendingDown className="h-3 w-3 mr-1" />}
              {videoData.status === 'trending' ? '인기상승' : videoData.status === 'stable' ? '안정' : '하락'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            영상의 상세 성과 지표와 시청자 분석을 확인하고 최적화 방안을 찾아보세요.
          </DialogDescription>
        </DialogHeader>

        {/* 메인 지표 카드들 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">조회수</p>
                  <p className="text-xl font-bold text-blue-600">{videoData.views}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Eye className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">수익</p>
                  <p className="text-xl font-bold text-green-600">{videoData.revenue}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CTR</p>
                  <p className="text-xl font-bold text-purple-600">{videoData.ctr}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <MousePointer className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">시청률</p>
                  <p className="text-xl font-bold text-orange-600">{detailData.retention}%</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-full">
                  <Activity className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-pink-500"></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">좋아요</p>
                  <p className="text-xl font-bold text-pink-600">{detailData.likes.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-pink-100 rounded-full">
                  <ThumbsUp className="h-4 w-4 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              성과 분석
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              시청자 분석
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              상품 성과
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              인사이트
            </TabsTrigger>
          </TabsList>

          {/* 성과 분석 탭 */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    시간대별 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {detailData.hourlyData.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{data.hour}시</span>
                          <div className="text-right">
                            <div className="text-sm font-bold">{data.views.toLocaleString()} 조회</div>
                            <div className="text-xs text-green-600">₩{data.revenue.toLocaleString()}</div>
                          </div>
                        </div>
                        <Progress value={(data.views / 15000) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    참여도 분석
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{detailData.commentsCount}</div>
                      <div className="text-sm text-muted-foreground">댓글</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Share className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{detailData.shares}</div>
                      <div className="text-sm text-muted-foreground">공유</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">댓글 감정 분석</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">긍정적</span>
                        <span className="font-bold text-green-600">{detailData.commentAnalysis.sentiment.positive}%</span>
                      </div>
                      <Progress value={detailData.commentAnalysis.sentiment.positive} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">중립적</span>
                        <span className="font-bold text-gray-600">{detailData.commentAnalysis.sentiment.neutral}%</span>
                      </div>
                      <Progress value={detailData.commentAnalysis.sentiment.neutral} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">부정적</span>
                        <span className="font-bold text-red-600">{detailData.commentAnalysis.sentiment.negative}%</span>
                      </div>
                      <Progress value={detailData.commentAnalysis.sentiment.negative} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 시청자 분석 탭 */}
          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    연령대별 분포
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {detailData.audience.demographics.map((demo, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{demo.age}세</span>
                          <div className="text-right">
                            <div className="font-bold">{demo.percentage}%</div>
                            <div className="text-xs text-muted-foreground">참여도 {demo.engagement}</div>
                          </div>
                        </div>
                        <Progress value={demo.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    디바이스별 접속
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {detailData.audience.devices.map((device, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{device.device}</span>
                          <span className="font-bold">{device.percentage}%</span>
                        </div>
                        <Progress value={device.percentage} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    유입 경로
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {detailData.audience.traffic.map((traffic, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{traffic.source}</span>
                          <span className="font-bold">{traffic.percentage}%</span>
                        </div>
                        <Progress value={traffic.percentage} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 상품 성과 탭 */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  상품별 성과 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {detailData.products.map((product, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{product.name}</h4>
                        <Badge className="bg-green-100 text-green-700">
                          {product.conversion}% 전환율
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">클릭수</p>
                          <p className="font-bold">{product.clicks}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">판매수</p>
                          <p className="font-bold">{product.sales}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">수익</p>
                          <p className="font-bold text-green-600">₩{product.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                      <Progress value={product.conversion * 10} className="h-2 mt-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 인사이트 탭 */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI 분석 인사이트
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-medium text-green-800 mb-2">🎯 최적 시간대</h4>
                    <p className="text-sm text-green-700">
                      오후 6-9시에 최고 성과. 이 시간대 영상 업로드 권장
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-blue-800 mb-2">📱 모바일 최적화</h4>
                    <p className="text-sm text-blue-700">
                      모바일 시청자 72.4%. 세로형 미리보기 이미지 사용 권장
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-medium text-purple-800 mb-2">💬 댓글 활용</h4>
                    <p className="text-sm text-purple-700">
                      긍정적 댓글 78.4%. 댓글 상호작용으로 참여도 높이기
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-medium text-orange-800 mb-2">🛍️ 상품 배치</h4>
                    <p className="text-sm text-orange-700">
                      영상 전반부 상품 소개로 클릭률 향상 가능
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
                      <span className="font-medium">끝화면 최적화</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      시청률 68.5%에서 급격히 떨어짐. 끝화면 콘텐츠 개선 필요
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-blue-500 text-white">실행 중</Badge>
                      <span className="font-medium">상품 링크 위치</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      설명란 상단으로 상품 링크 이동하여 클릭률 향상
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