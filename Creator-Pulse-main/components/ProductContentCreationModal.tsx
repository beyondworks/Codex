import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { 
  Play, 
  Video, 
  Camera, 
  Edit3, 
  Share, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Target,
  Clock,
  Star
} from "lucide-react";
import { toast } from "sonner";

interface ProductContentCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCreation: (product: any) => void;
  product: any;
}

export function ProductContentCreationModal({ 
  isOpen, 
  onClose, 
  onStartCreation,
  product 
}: ProductContentCreationModalProps) {
  const [selectedContentType, setSelectedContentType] = useState("review");

  const contentTypes = [
    {
      id: "review",
      title: "제품 리뷰",
      description: "상세한 제품 분석 및 평가",
      duration: "10-15분",
      difficulty: "쉬움",
      potential: "높음",
      icon: <Star className="h-5 w-5" />
    },
    {
      id: "unboxing",
      title: "언박싱 & 첫인상",
      description: "개봉기와 첫 사용 경험",
      duration: "5-10분",
      difficulty: "쉬움",
      potential: "중간",
      icon: <Camera className="h-5 w-5" />
    },
    {
      id: "tutorial",
      title: "사용법 튜토리얼",
      description: "제품 활용법 가이드",
      duration: "8-12분",
      difficulty: "중간",
      potential: "높음",
      icon: <Play className="h-5 w-5" />
    },
    {
      id: "comparison",
      title: "경쟁제품 비교",
      description: "유사 제품들과의 비교 분석",
      duration: "15-20분",
      difficulty: "어려움",
      potential: "매우높음",
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  const creationSteps = [
    {
      step: 1,
      title: "콘텐츠 기획",
      description: "타겟 오디언스와 핵심 메시지 설정",
      time: "30분"
    },
    {
      step: 2,
      title: "촬영 준비",
      description: "조명, 각도, 배경 세팅",
      time: "20분"
    },
    {
      step: 3,
      title: "콘텐츠 촬영",
      description: "스크립트에 따른 체계적 촬영",
      time: "1-2시간"
    },
    {
      step: 4,
      title: "편집 & 후작업",
      description: "컷 편집, 자막, 썸네일 제작",
      time: "2-3시간"
    },
    {
      step: 5,
      title: "업로드 & 최적화",
      description: "SEO 최적화된 제목과 설명 작성",
      time: "30분"
    }
  ];

  const handleStartCreation = () => {
    toast.success(`${contentTypes.find(t => t.id === selectedContentType)?.title} 제작을 시작합니다!`);
    onStartCreation(product);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff4d6d] to-[#ff8a3d] flex items-center justify-center">
              <Video className="h-5 w-5 text-white" />
            </div>
            <div>
              <span>콘텐츠 제작 가이드</span>
              <p className="text-sm text-muted-foreground font-normal">{product.title}</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            선택된 제품에 대한 콘텐츠 제작 가이드와 최적화 전략을 제공합니다. 콘텐츠 유형을 선택하고 제작을 시작하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 제품 정보 요약 */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{product.hotness}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{product.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>조회수: {product.views}</span>
                    <span>예상 수익: {product.revenue}</span>
                    <span>평점: {product.rating}/10</span>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  트렌드 상승 중
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 콘텐츠 유형 선택 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-[#ff4d6d]" />
              콘텐츠 유형 선택
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {contentTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all ${
                    selectedContentType === type.id 
                      ? "border-[#ff4d6d] bg-red-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedContentType(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedContentType === type.id 
                          ? "bg-[#ff4d6d] text-white" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{type.title}</h4>
                          {selectedContentType === type.id && (
                            <CheckCircle className="h-4 w-4 text-[#ff4d6d]" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                        <div className="flex gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{type.duration}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {type.difficulty}
                          </Badge>
                          <Badge 
                            className={`text-xs ${
                              type.potential === "매우높음" ? "bg-green-100 text-green-700" :
                              type.potential === "높음" ? "bg-blue-100 text-blue-700" :
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            수익성 {type.potential}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 제작 프로세스 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-[#ff4d6d]" />
              제작 프로세스
            </h3>
            <div className="space-y-3">
              {creationSteps.map((step, index) => (
                <div key={step.step} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#ff4d6d] text-white flex items-center justify-center text-sm font-semibold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                    {step.time}
                  </div>
                  {index < creationSteps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-gray-400 absolute right-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI 추천 포인트 */}
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                AI 추천 포인트
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>이 제품은 현재 <strong>급상승 트렌드</strong>이므로 빠른 제작을 권장합니다</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>"실제 사용 후기"</strong> 키워드를 포함하면 검색 노출이 높아집니다</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>화요일 오후 7시 업로드 시 <strong>40% 높은 조회수</strong>를 기대할 수 있습니다</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              나중에 하기
            </Button>
            <Button 
              onClick={handleStartCreation}
              className="flex-1 bg-[#ff4d6d] hover:bg-[#ff4d6d]/90"
            >
              <Play className="h-4 w-4 mr-2" />
              AI 콘텐츠 분석으로 시작하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}