import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  ArrowLeft,
  Calendar, 
  Target, 
  Lightbulb, 
  Image, 
  Clock, 
  BarChart3,
  Play,
  Pause,
  Check,
  Star,
  Zap,
  TrendingUp,
  Users,
  ShoppingCart,
  Eye,
  Upload,
  Settings,
  Bell
} from "lucide-react";

interface StrategyExecutionFlowProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: any; // 선택된 전략 데이터
}

interface StepProgress {
  id: number;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  required: boolean;
  estimatedTime?: string;
}

export function StrategyExecutionFlow({ isOpen, onClose, strategy }: StrategyExecutionFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);

  // 초기 단계 데이터
  const [steps, setSteps] = useState<StepProgress[]>([
    {
      id: 1,
      title: "콘텐츠 전략 수립",
      description: "타겟 오디언스와 콘텐츠 방향성을 명확히 정의합니다",
      icon: Target,
      completed: false,
      tasks: [
        { id: "target-audience", title: "타겟 오디언스 확정", completed: false, required: true, estimatedTime: "5분" },
        { id: "content-theme", title: "콘텐츠 주제 선정", completed: false, required: true, estimatedTime: "3분" },
        { id: "content-goal", title: "콘텐츠 목표 설정", completed: false, required: true, estimatedTime: "2분" },
        { id: "competitor-research", title: "경쟁사 콘텐츠 분석", completed: false, required: false, estimatedTime: "10분" }
      ]
    },
    {
      id: 2,
      title: "상품 큐레이션",
      description: "AI 추천을 바탕으로 최적의 상품을 선별합니다",
      icon: ShoppingCart,
      completed: false,
      tasks: [
        { id: "product-selection", title: "메인 추천 상품 선택", completed: false, required: true, estimatedTime: "5분" },
        { id: "product-research", title: "상품 상세 정보 조사", completed: false, required: true, estimatedTime: "8분" },
        { id: "pricing-check", title: "가격 경쟁력 확인", completed: false, required: true, estimatedTime: "3분" },
        { id: "affiliate-setup", title: "제휴 링크 설정", completed: false, required: false, estimatedTime: "5분" }
      ]
    },
    {
      id: 3,
      title: "콘텐츠 최적화",
      description: "썸네일과 제목을 최적화하여 클릭률을 극대화합니다",
      icon: Image,
      completed: false,
      tasks: [
        { id: "thumbnail-design", title: "썸네일 디자인 완료", completed: false, required: true, estimatedTime: "15분" },
        { id: "title-optimization", title: "제목 키워드 최적화", completed: false, required: true, estimatedTime: "5분" },
        { id: "description-write", title: "영상 설명 작성", completed: false, required: true, estimatedTime: "10분" },
        { id: "tags-setup", title: "태그 및 해시태그 설정", completed: false, required: false, estimatedTime: "3분" }
      ]
    },
    {
      id: 4,
      title: "업로드 일정 관리",
      description: "최적의 업로드 시간과 주기를 설정합니다",
      icon: Clock,
      completed: false,
      tasks: [
        { id: "upload-time", title: "최적 업로드 시간 설정", completed: false, required: true, estimatedTime: "2분" },
        { id: "content-calendar", title: "콘텐츠 캘린더 작성", completed: false, required: true, estimatedTime: "8분" },
        { id: "batch-schedule", title: "연속 콘텐츠 일정 계획", completed: false, required: false, estimatedTime: "10분" },
        { id: "notification-setup", title: "업로드 알림 설정", completed: false, required: false, estimatedTime: "2분" }
      ]
    },
    {
      id: 5,
      title: "성과 추적 설정",
      description: "실시간 모니터링과 분석을 위한 KPI를 설정합니다",
      icon: BarChart3,
      completed: false,
      tasks: [
        { id: "kpi-setup", title: "핵심 성과 지표 설정", completed: false, required: true, estimatedTime: "5분" },
        { id: "analytics-connect", title: "분석 도구 연동", completed: false, required: true, estimatedTime: "3분" },
        { id: "alert-rules", title: "성과 알림 규칙 생성", completed: false, required: false, estimatedTime: "5분" },
        { id: "report-schedule", title: "정기 리포트 설정", completed: false, required: false, estimatedTime: "3분" }
      ]
    }
  ]);

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    targetAudience: "",
    contentTheme: "",
    contentGoal: "",
    selectedProducts: [] as string[],
    thumbnailStyle: "",
    uploadTime: "",
    kpiTargets: {
      views: "",
      revenue: "",
      engagement: ""
    }
  });

  // 태스크 완료 처리
  const toggleTask = (stepIndex: number, taskId: string) => {
    const newSteps = [...steps];
    const task = newSteps[stepIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
    
    // 모든 필수 태스크가 완료되면 단계를 완료로 표시
    const requiredTasks = newSteps[stepIndex].tasks.filter(t => t.required);
    const completedRequiredTasks = requiredTasks.filter(t => t.completed);
    newSteps[stepIndex].completed = requiredTasks.length === completedRequiredTasks.length;
    
    setSteps(newSteps);
  };

  // 전체 진행률 계산
  const getTotalProgress = () => {
    const totalTasks = steps.reduce((acc, step) => acc + step.tasks.filter(t => t.required).length, 0);
    const completedTasks = steps.reduce((acc, step) => 
      acc + step.tasks.filter(t => t.required && t.completed).length, 0);
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  // 현재 단계 진행률
  const getCurrentStepProgress = () => {
    const step = steps[currentStep];
    const requiredTasks = step.tasks.filter(t => t.required);
    const completedTasks = requiredTasks.filter(t => t.completed);
    return requiredTasks.length > 0 ? Math.round((completedTasks.length / requiredTasks.length) * 100) : 0;
  };

  // 다음 단계로 이동
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 단계로 이동
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 전략 실행 시작
  const startExecution = () => {
    setIsExecuting(true);
    
    // 시뮬레이션된 실행 프로세스
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setExecutionProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExecuting(false);
          onClose();
          // 성공 알림이나 대시보드로 이동하는 로직 추가 가능
        }, 1000);
      }
    }, 500);
  };

  // 예상 소요 시간 계산
  const getTotalEstimatedTime = () => {
    const totalMinutes = steps.reduce((acc, step) => {
      return acc + step.tasks.reduce((taskAcc, task) => {
        const minutes = parseInt(task.estimatedTime?.replace('분', '') || '0');
        return taskAcc + minutes;
      }, 0);
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `약 ${hours}시간 ${minutes}분`;
    }
    return `약 ${minutes}분`;
  };

  const currentStepData = steps[currentStep];
  const totalProgress = getTotalProgress();
  const currentStepProgress = getCurrentStepProgress();

  if (isExecuting) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-brand-gradient rounded-lg">
                <Play className="h-5 w-5 text-white" />
              </div>
              전략 실행 중...
            </DialogTitle>
            <DialogDescription>
              설정하신 전략을 바탕으로 최적화 작업을 진행하고 있습니다. 잠시만 기다려주세요.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-brand-gradient rounded-full flex items-center justify-center animate-pulse">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI가 전략을 실행하고 있어요</h3>
              <p className="text-sm text-muted-foreground mb-4">
                잠시만 기다려주세요. 곧 완료됩니다.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>진행률</span>
                <span className="font-semibold">{executionProgress}%</span>
              </div>
              <Progress value={executionProgress} className="h-3" />
            </div>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                실행이 완료되면 대시보드에서 결과를 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-brand-gradient rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            전략 실행 가이드
            <Badge className="bg-brand-gradient text-white">
              단계별 진행
            </Badge>
          </DialogTitle>
          <DialogDescription>
            AI 추천 전략을 단계별로 실행하여 최적의 결과를 얻으세요. {getTotalEstimatedTime()} 소요 예상입니다.
          </DialogDescription>
        </DialogHeader>

        {/* 전체 진행률 */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">전체 진행률</span>
            <span className="text-brand-primary font-semibold">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>

        {/* 단계 네비게이션 */}
        <div className="flex items-center justify-between mb-6 overflow-x-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-brand-gradient text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`text-xs mt-2 text-center max-w-20 ${
                  index === currentStep ? 'font-semibold' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  step.completed ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* 현재 단계 내용 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <currentStepData.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
                </div>
              </div>
              <Badge variant="outline">
                {currentStep + 1} / {steps.length}
              </Badge>
            </div>
            
            {/* 현재 단계 진행률 */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>단계 진행률</span>
                <span className="font-semibold">{currentStepProgress}%</span>
              </div>
              <Progress value={currentStepProgress} className="h-1.5" />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {currentStepData.tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg transition-all duration-200 ${
                  task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(currentStep, task.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                        {task.required && <span className="text-red-500 ml-1">*</span>}
                      </h4>
                      <div className="flex items-center gap-2">
                        {task.estimatedTime && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.estimatedTime}
                          </Badge>
                        )}
                        {task.completed && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* 단계별 폼 입력 */}
            {currentStep === 0 && (
              <div className="space-y-4 mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium">콘텐츠 전략 세부사항</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">타겟 오디언스</label>
                    <Select value={formData.targetAudience} onValueChange={(value) => 
                      setFormData({...formData, targetAudience: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="타겟 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20s-women">20대 여성</SelectItem>
                        <SelectItem value="30s-women">30대 여성</SelectItem>
                        <SelectItem value="20s-men">20대 남성</SelectItem>
                        <SelectItem value="30s-men">30대 남성</SelectItem>
                        <SelectItem value="teenagers">10대</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">콘텐츠 주제</label>
                    <Input
                      placeholder="예: 겨울 필수 아이템 추천"
                      value={formData.contentTheme}
                      onChange={(e) => setFormData({...formData, contentTheme: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 하단 액션 버튼 */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={goToPrevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              이전
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={goToNextStep}
                disabled={!currentStepData.completed}
                className="bg-brand-gradient hover:opacity-90"
              >
                다음
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={startExecution}
                disabled={totalProgress < 100}
                className="bg-brand-gradient hover:opacity-90"
              >
                <Play className="h-4 w-4 mr-2" />
                전략 실행하기
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onClose}>
              나중에 하기
            </Button>
            <div className="text-sm text-muted-foreground">
              완료: {steps.filter(s => s.completed).length}/{steps.length}단계
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}