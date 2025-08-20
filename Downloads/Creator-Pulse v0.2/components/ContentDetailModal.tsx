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
  Video,
  Eye,
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Target,
  Lightbulb,
  Play,
  Heart,
  MessageCircle,
  Share,
  Zap,
  Award,
  Calendar,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// reportUtils에서 함수 생성
const generateContentReportData = (contentData: any) => {
  return {
    title: `트렌드 콘텐츠 분석: ${contentData?.title || '콘텐츠'}`,
    subtitle: '콘텐츠 트렌드 및 성과 분석 리포트',
    generatedAt: new Date().toLocaleString('ko-KR'),
    data: {
      basicMetrics: {
        views: contentData?.views || '0',
        sales: contentData?.sales || '0',
        revenue: contentData?.revenue || '₩0',
        conversionRate: contentData?.conversionRate || 0,
        engagement: contentData?.engagement || 0,
        growth: contentData?.growth || 0
      },
      trendAnalysis: [
        { period: '1일차', views: 45000, sales: 320, conversion: 0.71 },
        { period: '2일차', views: 89000, sales: 580, conversion: 0.65 },
        { period: '3일차', views: 156000, sales: 1200, conversion: 0.77 },
        { period: '4일차', views: 234000, sales: 1850, conversion: 0.79 },
        { period: '5일차', views: 312000, sales: 2400, conversion: 0.77 },
        { period: '6일차', views: 398000, sales: 3100, conversion: 0.78 },
        { period: '7일차', views: 465000, sales: 3650, conversion: 0.78 }
      ],
      competitorComparison: [
        { creator: contentData?.creator || '현재 크리에이터', views: contentData?.views || '2.4M', conversion: contentData?.conversionRate || 6.3, rank: 1 },
        { creator: '경쟁 크리에이터 A', views: '2.1M', conversion: 5.8, rank: 2 },
        { creator: '경쟁 크리에이터 B', views: '1.9M', conversion: 5.2, rank: 3 },
        { creator: '경쟁 크리에이터 C', views: '1.7M', conversion: 4.9, rank: 4 }
      ],
      audienceInsights: {
        demographics: [
          { age: '18-24', percentage: 28.4, engagement: 9.2 },
          { age: '25-34', percentage: 42.1, engagement: 8.7 },
          { age: '35-44', percentage: 23.5, engagement: 7.8 },
          { age: '45+', percentage: 6.0, engagement: 6.4 }
        ],
        interests: [
          { category: '기술/IT', percentage: 34.2 },
          { category: '쇼핑/리뷰', percentage: 28.7 },
          { category: '라이프스타일', percentage: 21.5 },
          { category: '교육/정보', percentage: 15.6 }
        ]
      },
      aiInsights: [
        '현재 콘텐츠는 동일 카테고리 대비 68% 높은 전환율 달성',
        '18-34세 연령층에서 특히 높은 참여도 보임',
        '업로드 후 3-4일차에 최고 성과 기록',
        '썸네일 개선 시 추가 15% 조회수 증가 예상'
      ]
    }
  };
};

// 다운로드 함수들 (reportUtils에서 가져오기)
const downloadPDF = (reportData: any, filename: string) => {
  // PDF 다운로드 로직 (기존 reportUtils와 동일)
  const content = `
${reportData.title}
${reportData.subtitle}
생성일: ${reportData.generatedAt}

기본 지표:
- 조회수: ${reportData.data.basicMetrics.views}
- 판매량: ${reportData.data.basicMetrics.sales}
- 수익: ${reportData.data.basicMetrics.revenue}
- 전환율: ${reportData.data.basicMetrics.conversionRate}%

AI 인사이트:
${reportData.data.aiInsights.map((insight: string, index: number) => `${index + 1}. ${insight}`).join('\n')}
  `;
  
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const downloadCSV = (data: any[], filename: string) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const downloadJSON = (data: any, filename: string) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

interface ContentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentData?: any;
}

export function ContentDetailModal({ isOpen, onClose, contentData }: ContentDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format: 'pdf' | 'csv' | 'json') => {
    setIsDownloading(true);
    toast.loading("콘텐츠 분석 리포트를 생성중입니다...", { id: "download" });
    
    try {
      const reportData = generateContentReportData(contentData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (format) {
        case 'pdf':
          downloadPDF(reportData, 'content-trend-report');
          break;
        case 'csv':
          const csvData = [
            ...reportData.data.trendAnalysis,
            ...reportData.data.competitorComparison
          ];
          downloadCSV(csvData, 'content-trend-report');
          break;
        case 'json':
          downloadJSON(reportData, 'content-trend-report');
          break;
      }
      
      toast.success("콘텐츠 트렌드 리포트 다운로드가 완료되었습니다!", { id: "download" });
    } catch (error) {
      toast.error("리포트 다운로드 중 오류가 발생했습니다.", { id: "download" });
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!contentData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Video className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">콘텐츠 트렌드 상세 분석</h3>
              <p className="text-sm text-muted-foreground">실시간 성과 지표와 AI 인사이트</p>
            </div>
            <Badge className="bg-green-100 text-green-700 ml-auto">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{contentData.growth}%
            </Badge>
          </DialogTitle>
          <DialogDescription>
            콘텐츠의 트렌드 분석과 시장 경쟁력을 종합적으로 분석하여 최적화 전략을 제안드립니다.
          </DialogDescription>
        </DialogHeader>

        {/* 콘텐츠 헤더 */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* 썸네일 */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="relative overflow-hidden rounded-lg">
              <div className="w-full aspect-video">
                <ImageWithFallback
                  src={contentData.thumbnail}
                  alt={contentData.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{contentData.duration}</span>
              </div>
              <div className="absolute top-2 left-2">
                <Badge className="bg-green-500 text-white text-xs border-0">
                  트렌드 급상승
                </Badge>
              </div>
            </div>
          </div>

          {/* 콘텐츠 정보 */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">{contentData.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{contentData.creator}</span>
                <span>•</span>
                <span>{contentData.category}</span>
                <span>•</span>
                <span>{contentData.uploadDate}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {contentData.description}
              </p>
            </div>

            {/* 메인 지표 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="h-4 w-4 text-blue-600 mr-1" />
                </div>
                <div className="font-bold text-lg text-blue-600">{contentData.views}</div>
                <div className="text-xs text-muted-foreground">조회수</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <ShoppingCart className="h-4 w-4 text-green-600 mr-1" />
                </div>
                <div className="font-bold text-lg text-green-600">{contentData.sales}</div>
                <div className="text-xs text-muted-foreground">판매량</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-4 w-4 text-purple-600 mr-1" />
                </div>
                <div className="font-bold text-lg text-purple-600">{contentData.revenue}</div>
                <div className="text-xs text-muted-foreground">수익</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-4 w-4 text-orange-600 mr-1" />
                </div>
                <div className="font-bold text-lg text-orange-600">{contentData.conversionRate}%</div>
                <div className="text-xs text-muted-foreground">전환율</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              개요
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              트렌드 분석
            </TabsTrigger>
            <TabsTrigger value="competition" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              경쟁 분석
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              AI 인사이트
            </TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    성과 지표
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>참여율</span>
                        <span className="font-semibold">{contentData.engagement}%</span>
                      </div>
                      <Progress value={contentData.engagement * 10} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>전환율</span>
                        <span className="font-semibold">{contentData.conversionRate}%</span>
                      </div>
                      <Progress value={contentData.conversionRate * 10} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>성장률</span>
                        <span className="font-semibold">+{contentData.growth}%</span>
                      </div>
                      <Progress value={contentData.growth} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    시청자 반응
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Heart className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="font-bold">234K</div>
                      <div className="text-xs text-muted-foreground">좋아요</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="font-bold">18.7K</div>
                      <div className="text-xs text-muted-foreground">댓글</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2">
                        <Share className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="font-bold">5.2K</div>
                      <div className="text-xs text-muted-foreground">공유</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  일별 성과 추이
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generateContentReportData(contentData).data.trendAnalysis.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{day.period}</span>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">조회수: </span>
                          <span className="font-semibold">{day.views.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">판매: </span>
                          <span className="font-semibold">{day.sales.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">전환율: </span>
                          <span className="font-semibold">{day.conversion}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 트렌드 분석 탭 */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    성장 트렌드
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🚀 급상승 중</h4>
                    <p className="text-sm text-green-700">
                      업로드 후 7일간 지속적인 상승세를 보이며, 동일 카테고리 평균 대비 68% 높은 성과
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📈 예측 분석</h4>
                    <p className="text-sm text-blue-700">
                      현재 증가율 기준으로 향후 7일간 추가 35% 성장 예상
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    시청자 분석
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {generateContentReportData(contentData).data.audienceInsights.demographics.map((demo, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{demo.age}세</span>
                        <span className="font-semibold">{demo.percentage}%</span>
                      </div>
                      <Progress value={demo.percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        참여율: {demo.engagement}%
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 경쟁 분석 탭 */}
          <TabsContent value="competition" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  경쟁 크리에이터 비교
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {generateContentReportData(contentData).data.competitorComparison.map((competitor, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      index === 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                          }`}>
                            #{competitor.rank}
                          </div>
                          <div>
                            <h4 className="font-medium">{competitor.creator}</h4>
                            <div className="text-sm text-muted-foreground">
                              조회수 {competitor.views}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{competitor.conversion}%</div>
                          <div className="text-xs text-muted-foreground">전환율</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI 인사이트 탭 */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI 기반 인사이트
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {generateContentReportData(contentData).data.aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-blue-800">{insight}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  최적화 제안
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-yellow-500 text-white">즉시 실행</Badge>
                    <span className="font-medium">썸네일 A/B 테스트</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    감정적 표현이 강화된 썸네일로 CTR 15% 향상 예상
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-green-500 text-white">콘텐츠 전략</Badge>
                    <span className="font-medium">시리즈 콘텐츠 기획</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    현재 성공 요인을 활용한 후속 콘텐츠로 브랜딩 강화
                  </p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-purple-500 text-white">장기 전략</Badge>
                    <span className="font-medium">인플루언서 협업</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    유사 카테고리 상위 크리에이터와의 콜라보레이션 권장
                  </p>
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
                {isDownloading ? '다운로드 중...' : '상세 분석 리포트'}
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