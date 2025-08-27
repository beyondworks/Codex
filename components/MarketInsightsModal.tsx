import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  BarChart3, 
  Brain, 
  Database, 
  TrendingUp, 
  Calendar, 
  Users, 
  Eye, 
  ShoppingCart,
  Target,
  Lightbulb,
  Clock,
  Activity,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Filter
} from "lucide-react";

interface MarketInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MarketInsightsModal({ isOpen, onClose }: MarketInsightsModalProps) {
  const [activeTab, setActiveTab] = useState("predictions");

  // AI 예측 인사이트 데이터
  const predictions = [
    {
      title: "겨울 시즌 트렌드 예측",
      category: "시즌 분석",
      confidence: 94,
      timeline: "12월 - 2월",
      prediction: "보온/방한 제품 수요 280% 급증 예상",
      impact: "높음",
      evidences: [
        "지난 3년간 겨울 시즌 판매 데이터 분석",
        "기상청 한파 예보와의 상관관계 분석",
        "소셜미디어 '보온' 키워드 언급량 450% 증가",
        "경쟁 크리에이터 겨울 콘텐츠 성과 분석"
      ]
    },
    {
      title: "최적 업로드 시간",
      category: "시청 패턴",
      confidence: 91,
      timeline: "평일 오후 6-8시",
      prediction: "해당 시간대 조회수 평균 40% 향상",
      impact: "중간",
      evidences: [
        "1만+ 쇼핑 콘텐츠 업로드 시간 분석",
        "구독자 활동 패턴 실시간 모니터링",
        "타겟 연령층 온라인 활동 시간대 분석",
        "업로드 시간별 첫 1시간 조회수 상관관계"
      ]
    },
    {
      title: "신제품 카테고리 발굴",
      category: "기회 분석",
      confidence: 87,
      timeline: "1-2주 내",
      prediction: "홈케어 제품에서 새로운 기회 발견",
      impact: "높음",
      evidences: [
        "검색 트렌드 급상승 키워드 분석",
        "해외 마켓 선행 트렌드 모니터링",
        "SNS 해시태그 확산 패턴 분석",
        "경쟁사 신상품 출시 일정 추적"
      ]
    }
  ];

  // 데이터 소스 정보
  const dataSources = [
    {
      name: "유튜브 API 데이터",
      description: "실시간 조회수, 좋아요, 댓글 수 등 성과 지표",
      coverage: "전체 쇼핑 콘텐츠",
      updateFreq: "1시간마다",
      reliability: 98,
      icon: Eye
    },
    {
      name: "소셜미디어 트렌드",
      description: "인스타그램, 틱톡, 트위터 해시태그 분석",
      coverage: "주요 SNS 플랫폼",
      updateFreq: "실시간",
      reliability: 95,
      icon: Globe
    },
    {
      name: "검색 키워드 분석",
      description: "네이버, 구글 검색량 및 연관 검색어",
      coverage: "전체 검색 엔진",
      updateFreq: "일 1회",
      reliability: 92,
      icon: Target
    },
    {
      name: "이커머스 판매 데이터",
      description: "주요 쇼핑몰 판매량 및 리뷰 분석",
      coverage: "상위 10개 쇼핑몰",
      updateFreq: "일 2회",
      reliability: 89,
      icon: ShoppingCart
    }
  ];

  // AI 분석 프로세스
  const analysisProcess = [
    {
      step: 1,
      title: "데이터 수집",
      description: "다양한 소스에서 실시간 데이터 수집 및 정제",
      duration: "24/7 자동",
      technologies: ["Web Crawling", "API Integration", "Data Pipeline"]
    },
    {
      step: 2,
      title: "패턴 분석",
      description: "머신러닝을 통한 트렌드 패턴 및 상관관계 분석",
      duration: "1시간마다",
      technologies: ["Machine Learning", "Statistical Analysis", "Correlation"]
    },
    {
      step: 3,
      title: "예측 모델링",
      description: "과거 데이터 기반 미래 트렌드 예측 및 검증",
      duration: "일 1회",
      technologies: ["Predictive Modeling", "Time Series", "Cross Validation"]
    },
    {
      step: 4,
      title: "인사이트 생성",
      description: "분석 결과를 실행 가능한 인사이트로 가공 및 제공",
      duration: "실시간",
      technologies: ["NLP", "Data Visualization", "Recommendation Engine"]
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "높음": return "bg-red-100 text-red-700 border-red-200";
      case "중간": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "낮음": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-h-[85vh] overflow-y-auto !max-w-none"
        style={{ width: '60vw', maxWidth: '60vw' }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-brand-gradient rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            AI 시장 분석 상세 리포트
            <Badge className="bg-brand-gradient text-white">
              실시간 업데이트
            </Badge>
          </DialogTitle>
          <DialogDescription>
            AI가 분석한 시장 인사이트의 상세 근거와 데이터 소스, 분석 프로세스를 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              인사이트 근거
            </TabsTrigger>
            <TabsTrigger value="datasources" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              데이터 소스
            </TabsTrigger>
            <TabsTrigger value="process" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              분석 프로세스
            </TabsTrigger>
          </TabsList>

          {/* 인사이트 근거 탭 */}
          <TabsContent value="predictions" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {predictions.map((prediction, index) => (
                <Card key={index} className="border-2 hover:border-[#ff8a3d]/20 transition-all">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{prediction.title}</h3>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {prediction.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{prediction.timeline}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className={getImpactColor(prediction.impact)}>
                              임팩트: {prediction.impact}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm text-muted-foreground">신뢰도</div>
                        <div className={`text-2xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-foreground" />
                        <span className="font-medium text-blue-900">예측 결과</span>
                      </div>
                      <p className="text-blue-800">{prediction.prediction}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-foreground" />
                        <span className="font-medium">분석 근거</span>
                      </div>
                      <div className="grid gap-2">
                        {prediction.evidences.map((evidence, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm leading-relaxed">{evidence}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>분석 정확도</span>
                        <span>{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 데이터 소스 탭 */}
          <TabsContent value="datasources" className="space-y-6 mt-6">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-lg font-semibold">실시간 데이터 수집 현황</h3>
              <p className="text-muted-foreground">
                다양한 소스에서 수집된 데이터를 기반으로 정확한 인사이트를 제공합니다
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {dataSources.map((source, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${source.reliability >= 95 ? 'bg-green-500' : source.reliability >= 90 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <source.icon className="h-4 w-4 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{source.name}</h4>
                        <p className="text-xs text-muted-foreground">{source.coverage}</p>
                      </div>
                      <Badge className={`${source.reliability >= 95 ? 'bg-green-100 text-green-700' : source.reliability >= 90 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {source.reliability}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {source.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>업데이트: {source.updateFreq}</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <Activity className="h-3 w-3" />
                        <span>활성</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 분석 프로세스 탭 */}
          <TabsContent value="process" className="space-y-6 mt-6">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-lg font-semibold">AI 분석 프로세스</h3>
              <p className="text-muted-foreground">
                4단계 자동화된 분석 프로세스를 통해 정확한 인사이트를 도출합니다
              </p>
            </div>

            <div className="space-y-6">
              {analysisProcess.map((process, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-gradient rounded-full flex items-center justify-center text-white font-semibold">
                      {process.step}
                    </div>
                    <Card className="flex-1">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h4 className="font-semibold mb-1">{process.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {process.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {process.duration}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {process.technologies.map((tech, techIdx) => (
                            <Badge key={techIdx} className="bg-gray-100 text-gray-700 text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  {index < analysisProcess.length - 1 && (
                    <div className="flex justify-center mt-4">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>마지막 업데이트: 방금 전</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
            <Button className="bg-brand-gradient hover:opacity-90">
              인사이트 내보내기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}