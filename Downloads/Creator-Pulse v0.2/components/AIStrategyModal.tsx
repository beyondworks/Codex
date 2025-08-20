import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign,
  BarChart3,
  Lightbulb,
  Calendar,
  ArrowRight,
  Star,
  Zap,
  Award,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Eye
} from "lucide-react";

interface AIStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPageChange?: (page: string) => void;
}

export function AIStrategyModal({ isOpen, onClose, onPageChange }: AIStrategyModalProps) {
  // AI 분석 기반 맞춤 전략 데이터
  const strategyData = {
    userProfile: {
      channelType: "테크 리뷰",
      subscriberCount: "85.2K",
      avgViews: "23.5K",
      mainAudience: "25-34세 남성 (68%)",
      topCategories: ["전자제품", "게임/IT", "생활가전"]
    },
    currentPerformance: {
      recentGrowth: "+18.3%",
      engagementRate: 12.7,
      conversionRate: 8.9,
      avgRevenue: "₩4.2M"
    },
    recommendations: [
      {
        category: "콘텐츠 최적화",
        priority: "높음",
        impact: "수익 +35%",
        tasks: [
          {
            title: "썸네일에 할인가 표시",
            description: "제품 가격과 할인율을 썸네일에 포함하면 CTR 28% 증가",
            difficulty: "쉬움",
            timeToComplete: "즉시",
            expectedResult: "CTR +28%"
          },
          {
            title: "언박싱 + 사용후기 결합",
            description: "첫인상과 장기 사용 경험을 한 영상에 포함",
            difficulty: "보통",
            timeToComplete: "1주",
            expectedResult: "시청시간 +42%"
          },
          {
            title: "경쟁제품 비교 추가",
            description: "동일 가격대 2-3개 제품과의 상세 비교",
            difficulty: "보통",
            timeToComplete: "3-5일",
            expectedResult: "전환율 +31%"
          }
        ]
      },
      {
        category: "업로드 최적화",
        priority: "높음",
        impact: "조회수 +25%",
        tasks: [
          {
            title: "최적 업로드 시간 변경",
            description: "화요일-목요일 오후 7시에 업로드",
            difficulty: "쉬움",
            timeToComplete: "즉시",
            expectedResult: "조회수 +18%"
          },
          {
            title: "주간 업로드 일정 고정",
            description: "매주 화, 목, 토 정해진 시간에 업로드",
            difficulty: "쉬움",
            timeToComplete: "즉시",
            expectedResult: "구독자 +12%"
          }
        ]
      },
      {
        category: "타겟 확장",
        priority: "중간",
        impact: "수익 +20%",
        tasks: [
          {
            title: "여성향 가전제품 리뷰",
            description: "뷰티 가전, 주방용품 등 여성 시청자 타겟 콘텐츠",
            difficulty: "어려움",
            timeToComplete: "2-3주",
            expectedResult: "여성 시청자 +45%"
          },
          {
            title: "부모 세대 타겟 콘텐츠",
            description: "50대+ 타겟 스마트 기기 사용법 및 추천",
            difficulty: "보통",
            timeToComplete: "1-2주",
            expectedResult: "연령대 확장 +35%"
          }
        ]
      }
    ],
    trendingOpportunities: [
      {
        title: "AI 스피커 시장 급성장",
        description: "스마트홈 트렌드로 AI 스피커 관심도 47% 증가",
        timeframe: "2주 내 제작 권장",
        potentialGrowth: "+52%",
        confidence: 89
      },
      {
        title: "겨울용 전자제품",
        description: "가습기, 온풍기 등 계절 가전 수요 증가 예상",
        timeframe: "3주 내 제작 권장",
        potentialGrowth: "+38%",
        confidence: 76
      },
      {
        title: "게이밍 액세서리",
        description: "신작 게임 출시에 따른 게이밍 기어 관심 증가",
        timeframe: "1주 내 제작 권장",
        potentialGrowth: "+41%",
        confidence: 92
      }
    ],
    competitorAnalysis: [
      {
        channel: "테크마스터",
        subscribers: "156K",
        strategy: "깊이 있는 기술 분석",
        weakPoint: "업로드 빈도 낮음",
        opportunity: "빠른 신제품 리뷰로 차별화"
      },
      {
        channel: "가젯리뷰어",
        subscribers: "98K", 
        strategy: "다양한 가격대 제품 리뷰",
        weakPoint: "프리미엄 제품 부족",
        opportunity: "고가 제품 전문성 강화"
      }
    ],
    actionPlan: {
      week1: [
        "업로드 시간 최적화 적용",
        "썸네일 템플릿 개선",
        "AI 스피커 리뷰 영상 기획"
      ],
      week2: [
        "경쟁제품 비교 콘텐츠 제작",
        "겨울 가전 시장 조사",
        "여성향 콘텐츠 기획"
      ],
      week3: [
        "게이밍 액세서리 리뷰",
        "시청자 피드백 분석",
        "새로운 포맷 테스트"
      ],
      week4: [
        "성과 데이터 분석",
        "전략 수정 및 최적화",
        "다음 달 계획 수립"
      ]
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움": return "text-green-600 bg-green-50";
      case "보통": return "text-yellow-600 bg-yellow-50";
      case "어려움": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "높음": return "bg-red-100 text-red-700 border-red-200";
      case "중간": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "낮음": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
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
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">AI 맞춤 추천 전략</h3>
              <p className="text-sm text-muted-foreground">데이터 기반 개인화 콘텐츠 전략</p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-left">
            채널 분석을 바탕으로 맞춤형 콘텐츠 전략, 트렌드 기회, 4주 실행 계획을 확인하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 현재 상태 분석 - 2열 레이아웃 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-foreground" />
                  채널 프로필
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">채널 유형</span>
                  <Badge variant="outline">{strategyData.userProfile.channelType}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">구독자</span>
                  <span className="font-semibold">{strategyData.userProfile.subscriberCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">평균 조회수</span>
                  <span className="font-semibold">{strategyData.userProfile.avgViews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">주 시청층</span>
                  <span className="font-semibold">{strategyData.userProfile.mainAudience}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-foreground" />
                  현재 성과
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">최근 성장률</span>
                  <span className="font-semibold text-green-600">{strategyData.currentPerformance.recentGrowth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">참여율</span>
                  <span className="font-semibold">{strategyData.currentPerformance.engagementRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">전환율</span>
                  <span className="font-semibold">{strategyData.currentPerformance.conversionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">월 평균 수익</span>
                  <span className="font-semibold text-green-600">{strategyData.currentPerformance.avgRevenue}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 트렌드 기회 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-foreground" />
                트렌드 기회
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategyData.trendingOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{opportunity.title}</h4>
                      <p className="text-xs text-muted-foreground">{opportunity.timeframe}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm text-green-600">{opportunity.potentialGrowth}</div>
                      <div className="text-xs text-muted-foreground">신뢰도 {opportunity.confidence}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI 추천 전략 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-foreground" />
                맞춤 개선 전략
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategyData.recommendations.slice(0, 2).map((category, categoryIndex) => (
                  <div key={categoryIndex} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{category.category}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getPriorityColor(category.priority)} text-xs`}>
                          {category.priority}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                          {category.impact}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {category.tasks.slice(0, 2).map((task, taskIndex) => (
                        <div key={taskIndex} className="p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-brand-gradient rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">{task.expectedResult}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 4주 실행 계획 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-foreground" />
                4주 실행 계획
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(strategyData.actionPlan).map(([week, tasks], index) => (
                  <div key={week} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">
                        {week === 'week1' ? '1주차' : week === 'week2' ? '2주차' : week === 'week3' ? '3주차' : '4주차'}
                      </h4>
                      <span className="text-xs text-muted-foreground">{tasks.length}개 항목</span>
                    </div>
                    <div className="space-y-1">
                      {tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-brand-gradient rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm leading-relaxed">{task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1 bg-brand-gradient hover:opacity-90"
              onClick={() => {
                onClose();
                if (onPageChange) {
                  onPageChange('workflow');
                }
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              전략 실행 시작하기
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              일정에 추가하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}