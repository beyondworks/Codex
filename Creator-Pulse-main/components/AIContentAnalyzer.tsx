import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  Brain,
  Video,
  Youtube,
  Link,
  MessageCircle,
  TrendingUp,
  Target,
  DollarSign,
  Eye,
  ThumbsUp,
  Share2,
  Clock,
  Users,
  ShoppingCart,
  Lightbulb,
  Zap,
  BarChart3,
  ArrowRight,
  Upload,
  Play,
  Pause,
  Search,
  Send
} from "lucide-react";

export function AIContentAnalyzer() {
  const [analysisType, setAnalysisType] = useState("video");
  const [videoUrl, setVideoUrl] = useState("");
  const [channelName, setChannelName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message: "안녕하세요! 콘텐츠 분석이 완료되면 쇼핑 최적화에 대해 더 자세히 논의할 수 있습니다. 궁금한 점이 있으시면 언제든 물어보세요!",
      time: "방금 전"
    }
  ]);

  // 분석 결과 데이터 (예시)
  const analysisResults = {
    overview: {
      title: "무선 이어폰 언박싱 & 리뷰",
      duration: "12:34",
      views: "45.2K",
      likes: "3.1K",
      comments: "289",
      uploadDate: "3일 전",
      category: "전자제품",
      engagement: 8.7
    },
    shoppingOptimization: {
      score: 75,
      recommendations: [
        {
          type: "timing",
          title: "쇼핑 태그 배치 최적화",
          description: "상품 소개 부분(2분 30초)에 쇼핑 태그를 추가하면 전환율이 40% 증가할 것으로 예상됩니다.",
          impact: "높음",
          difficulty: "낮음"
        },
        {
          type: "content",
          title: "가격 비교 콘텐츠 추가",
          description: "경쟁 제품과의 가격 비교를 추가하면 구매 결정에 도움이 됩니다.",
          impact: "중간",
          difficulty: "중간"
        },
        {
          type: "cta",
          title: "구매 유도 멘트 강화",
          description: "영상 마지막에 할인 코드나 특가 정보를 더 강조하면 효과적입니다.",
          impact: "높음",
          difficulty: "낮음"
        }
      ],
      trends: [
        {
          keyword: "무선 이어폰",
          trend: "+34%",
          search: "142K/월"
        },
        {
          keyword: "노이즈캔슬링",
          trend: "+28%",
          search: "89K/월"
        },
        {
          keyword: "블루투스 5.0",
          trend: "+15%",
          search: "67K/월"
        }
      ]
    },
    marketingInsights: {
      targetAudience: {
        primary: "25-34세 남성 (42%)",
        secondary: "35-44세 여성 (31%)",
        interests: ["기술", "음악", "게임"]
      },
      bestPerformingSegments: [
        { time: "2:30-3:45", engagement: 95, description: "제품 언박싱" },
        { time: "7:20-8:30", engagement: 87, description: "음질 테스트" },
        { time: "10:15-11:00", engagement: 76, description: "가격 정보" }
      ],
      improvementAreas: [
        {
          area: "썸네일",
          score: 6.5,
          suggestion: "더 밝고 대비가 강한 색상을 사용하여 클릭률을 높이세요."
        },
        {
          area: "제목",
          score: 7.2,
          suggestion: "키워드 '2024 최신' 또는 '가성비 갑'을 추가하면 검색 노출이 증가합니다."
        },
        {
          area: "설명란",
          score: 5.8,
          suggestion: "구매 링크를 더 눈에 띄게 배치하고 할인 정보를 강조하세요."
        }
      ]
    }
  };

  const handleAnalyze = () => {
    if (!videoUrl && !channelName) return;
    
    setIsAnalyzing(true);
    // 시뮬레이션: 3초 후 분석 완료
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalysis(true);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // 사용자 메시지 추가
    const newUserMessage = {
      type: "user",
      message: chatMessage,
      time: "방금 전"
    };
    
    setChatHistory(prev => [...prev, newUserMessage]);
    setChatMessage("");
    
    // AI 응답 시뮬레이션
    setTimeout(() => {
      const aiResponse = {
        type: "ai",
        message: "좋은 질문이네요! 해당 부분에 대해 더 자세히 분석해보겠습니다. 현재 콘텐츠의 가장 큰 개선점은 쇼핑 태그의 타이밍 최적화입니다. 시청자들이 가장 관심을 보이는 구간에 배치하면 전환율을 크게 높일 수 있어요.",
        time: "방금 전"
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Brain className="h-7 w-7 text-foreground" />
              <h1 className="text-2xl md:text-3xl font-bold">
                AI 콘텐츠 분석기
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              YouTube 영상과 채널을 AI가 분석하여 쇼핑 최적화 인사이트를 제공합니다
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
              <Zap className="h-3 w-3 mr-1" />
              AI 분석
            </Badge>
          </div>
        </div>
      </div>

      {/* Analysis Input */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-[#ff8a3d]" />
            분석할 콘텐츠 입력
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={analysisType} onValueChange={setAnalysisType} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="video">YouTube 영상</TabsTrigger>
              <TabsTrigger value="channel">채널 전체</TabsTrigger>
              <TabsTrigger value="shorts">숏폼</TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">YouTube 영상 URL</label>
                <div className="relative">
                  <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="channel" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">채널명 또는 URL</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="채널명 입력 또는 https://www.youtube.com/@..."
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shorts" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">YouTube Shorts URL</label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://www.youtube.com/shorts/..."
                    className="pl-10"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            onClick={handleAnalyze}
            className="w-full bg-brand-gradient hover:opacity-90"
            disabled={isAnalyzing || (!videoUrl && !channelName)}
          >
            {isAnalyzing ? (
              <>
                <Search className="h-4 w-4 mr-2 animate-spin" />
                AI가 분석 중입니다...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                AI 분석 시작하기
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {hasAnalysis && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Analysis */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-[#ff4d6d]" />
                    콘텐츠 개요
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-12 bg-muted rounded flex items-center justify-center">
                      <Play className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium">{analysisResults.overview.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {analysisResults.overview.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {analysisResults.overview.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {analysisResults.overview.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {analysisResults.overview.comments}
                        </span>
                      </div>
                      <Badge variant="secondary">{analysisResults.overview.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{analysisResults.overview.engagement}/10</div>
                      <div className="text-xs text-muted-foreground">참여도</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shopping Optimization */}
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-[#ff8a3d]" />
                      쇼핑 최적화 분석
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-600">{analysisResults.shoppingOptimization.score}</span>
                      <span className="text-sm text-muted-foreground">/ 100</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Progress value={analysisResults.shoppingOptimization.score} className="h-3" />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      개선 추천사항
                    </h4>
                    {analysisResults.shoppingOptimization.recommendations.map((rec, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h5 className="font-medium text-sm">{rec.title}</h5>
                          <div className="flex gap-2">
                            <Badge 
                              variant={rec.impact === "높음" ? "destructive" : rec.impact === "중간" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              영향도: {rec.impact}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              난이도: {rec.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      관련 키워드 트렌드
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {analysisResults.shoppingOptimization.trends.map((trend, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg">
                          <div className="font-medium text-sm">{trend.keyword}</div>
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className="text-green-600 font-medium">{trend.trend}</span>
                            <span className="text-muted-foreground">{trend.search}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Insights */}
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    마케팅 인사이트
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">타겟 오디언스</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">주요 타겟</span>
                          <span className="text-sm font-medium">{analysisResults.marketingInsights.targetAudience.primary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">부차 타겟</span>
                          <span className="text-sm font-medium">{analysisResults.marketingInsights.targetAudience.secondary}</span>
                        </div>
                        <div className="pt-2">
                          <span className="text-sm text-muted-foreground">관심사:</span>
                          <div className="flex gap-2 mt-1">
                            {analysisResults.marketingInsights.targetAudience.interests.map((interest, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">최고 성과 구간</h4>
                      <div className="space-y-2">
                        {analysisResults.marketingInsights.bestPerformingSegments.map((segment, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">{segment.time}</div>
                              <div className="text-xs text-muted-foreground">{segment.description}</div>
                            </div>
                            <div className="text-sm font-bold text-green-600">{segment.engagement}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">개선 영역</h4>
                    <div className="space-y-3">
                      {analysisResults.marketingInsights.improvementAreas.map((area, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{area.area}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">{area.score}/10</span>
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-brand-gradient rounded-full"
                                  style={{ width: `${area.score * 10}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{area.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Chat Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border border-border/50 sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                    AI 어시스턴트
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64 overflow-y-auto space-y-3 p-2 bg-muted/20 rounded-lg">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-2 rounded-lg text-xs ${
                          chat.type === "user" 
                            ? "bg-brand-gradient text-white" 
                            : "bg-white border"
                        }`}>
                          <p>{chat.message}</p>
                          <p className={`text-xs mt-1 ${
                            chat.type === "user" ? "text-white/70" : "text-muted-foreground"
                          }`}>
                            {chat.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="질문을 입력하세요..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="text-sm"
                    />
                    <Button onClick={handleSendMessage} size="sm" className="px-3">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}