import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Calendar, 
  Clock, 
  Check,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Wand2,
  Plus,
  Trash2,
  Upload,
  Image,
  BarChart3,
  Users,
  Workflow,
  Activity,
  Brain,
  MessageCircle,
  Play
} from "lucide-react";

// 분리된 파일들에서 import
import { Task, ScheduleItem, AIAssistantData, WorkflowStep } from "./workflow/types";
import { initialWorkflowSteps, initialScheduleItems } from "./workflow/data";
import { 
  getStatusColor, 
  getPriorityColor, 
  getDifficultyColor,
  generateMockAnalysis,
  generateAiResponse,
  getTotalProgress,
  getCurrentStepProgress
} from "./workflow/helpers";
import { AIAssistantModal } from "./workflow/AIAssistantModal";

interface StrategyWorkflowPageProps {
  onContentAnalysis?: (product: any) => void;
}

export function StrategyWorkflowPage({ onContentAnalysis }: StrategyWorkflowPageProps = {}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState("guide");
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [aiChatMessages, setAiChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  const [steps, setSteps] = useState<WorkflowStep[]>(initialWorkflowSteps);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(initialScheduleItems);
  const [aiAssistantData, setAiAssistantData] = useState<Record<string, AIAssistantData>>({});

  const [newScheduleItem, setNewScheduleItem] = useState<Partial<ScheduleItem>>({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "content",
    priority: "medium"
  });

  // 태스크 완료 처리
  const toggleTask = (stepIndex: number, taskId: string) => {
    const newSteps = [...steps];
    const task = newSteps[stepIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      
      // 태스크 완료 시 자동으로 관련 일정 생성
      if (task.completed && !scheduleItems.some(item => item.linkedTaskId === taskId)) {
        const newSchedule: ScheduleItem = {
          id: Date.now().toString(),
          title: `${task.title} 후속 작업`,
          description: `${task.title} 완료 후 검토 및 다음 단계 준비`,
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: "10:00",
          type: "analysis",
          status: "pending",
          priority: task.required ? "high" : "medium",
          linkedTaskId: taskId
        };
        setScheduleItems([...scheduleItems, newSchedule]);
      }
    }
    
    // 모든 필수 태스크가 완료되면 단계를 완료로 표시
    const requiredTasks = newSteps[stepIndex].tasks.filter(t => t.required);
    const completedRequiredTasks = requiredTasks.filter(t => t.completed);
    newSteps[stepIndex].completed = requiredTasks.length === completedRequiredTasks.length;
    
    setSteps(newSteps);
  };

  // 서브태스크 완료 처리
  const toggleSubTask = (stepIndex: number, taskId: string, subTaskId: string) => {
    const newSteps = [...steps];
    const task = newSteps[stepIndex].tasks.find(t => t.id === taskId);
    if (task && task.subtasks) {
      const subTask = task.subtasks.find(st => st.id === subTaskId);
      if (subTask) {
        subTask.completed = !subTask.completed;
      }
    }
    setSteps(newSteps);
  };

  // AI 어시스턴트 열기
  const openAiAssistant = (task: Task) => {
    setSelectedTask(task);
    setAiAssistantOpen(true);
    setAiChatMessages([
      {
        role: 'assistant',
        content: `안녕하세요! "${task.title}" 작업을 도와드리겠습니다. ${task.aiAssistance.description}\n\n어떤 부분부터 시작하시겠어요?`
      }
    ]);
  };

  // AI 분석 시작
  const startAiAnalysis = async (taskId: string, analysisType: string) => {
    setIsAiAnalyzing(true);
    
    setTimeout(() => {
      const mockAnalysis = generateMockAnalysis(taskId, analysisType);
      setAiAssistantData({
        ...aiAssistantData,
        [taskId]: mockAnalysis
      });
      
      setAiChatMessages(prev => [...prev, {
        role: 'assistant',
        content: `분석이 완료되었습니다! 주요 결과를 확인해보세요:\n\n${mockAnalysis.recommendations?.slice(0, 3).join('\n')}`
      }]);
      
      setIsAiAnalyzing(false);
    }, 3000);
  };

  // 채팅 메시지 전송
  const sendChatMessage = (message: string) => {
    const newMessages = [...aiChatMessages, { role: 'user' as const, content: message }];
    setAiChatMessages(newMessages);
    
    setTimeout(() => {
      const aiResponse = generateAiResponse(message, selectedTask);
      setAiChatMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    }, 1000);
  };

  // 일정 관리 함수들
  const addScheduleItem = () => {
    if (newScheduleItem.title && newScheduleItem.date && newScheduleItem.time) {
      const item: ScheduleItem = {
        id: Date.now().toString(),
        title: newScheduleItem.title,
        description: newScheduleItem.description || "",
        date: newScheduleItem.date,
        time: newScheduleItem.time,
        type: newScheduleItem.type as ScheduleItem['type'],
        status: "pending",
        priority: newScheduleItem.priority as ScheduleItem['priority']
      };
      setScheduleItems([...scheduleItems, item]);
      setNewScheduleItem({
        title: "",
        description: "",
        date: "",
        time: "",
        type: "content",
        priority: "medium"
      });
    }
  };

  const deleteScheduleItem = (id: string) => {
    setScheduleItems(scheduleItems.filter(item => item.id !== id));
  };

  const updateScheduleStatus = (id: string, status: ScheduleItem['status']) => {
    setScheduleItems(scheduleItems.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const getTypeIcon = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'content': return Image;
      case 'upload': return Upload;
      case 'analysis': return BarChart3;
      case 'meeting': return Users;
      default: return Calendar;
    }
  };

  const currentStepData = steps[currentStep];
  const totalProgress = getTotalProgress(steps);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Workflow className="h-7 w-7 text-foreground" />
              <h1 className="text-2xl font-bold">AI 워크플로우 관리</h1>
            </div>
            <p className="text-muted-foreground">
              AI 비서가 단계별로 도와주는 스마트 콘텐츠 제작 워크플로우
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className="bg-brand-gradient text-white">
              AI 분석 활성화
            </Badge>
            <Badge variant="outline" className="border-brand-primary text-brand-primary">
              전체 진행률 {totalProgress}%
            </Badge>
            <Button className="bg-brand-gradient hover:opacity-90">
              <Brain className="h-4 w-4 mr-2" />
              AI 전체 분석
            </Button>
          </div>
        </div>

        {/* 전체 진행률 */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  AI 워크플로우 진행 상황
                </h3>
                <span className="text-brand-primary font-semibold">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>완료: {steps.filter(s => s.completed).length}단계</span>
                <span>AI 활용 가능 태스크: {steps.reduce((acc, step) => acc + step.tasks.filter(t => t.aiAssistance.available).length, 0)}개</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 메인 탭 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI 가이드
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              스마트 일정
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              성과 분석
            </TabsTrigger>
          </TabsList>

          {/* AI 가이드 탭 */}
          <TabsContent value="guide" className="space-y-6">
            {/* 단계 네비게이션 */}
            <div className="flex items-center justify-between overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div className="flex flex-col items-center min-h-[6rem] pt-2">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer relative shadow-sm ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : index === currentStep
                          ? 'bg-brand-gradient text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      {step.completed ? (
                        <Check className="h-7 w-7" />
                      ) : (
                        <step.icon className="h-7 w-7" />
                      )}
                      {step.tasks.some(t => t.aiAssistance.available) && (
                        <div className="absolute top-0 right-0 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center shadow-md transform translate-x-1 -translate-y-1">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <span className={`text-xs mt-2 text-center max-w-20 line-clamp-2 leading-tight ${
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
            <Card>
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
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {currentStep + 1} / {steps.length}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI 지원
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>단계 진행률</span>
                    <span className="font-semibold">{getCurrentStepProgress(currentStepData)}%</span>
                  </div>
                  <Progress value={getCurrentStepProgress(currentStepData)} className="h-2" />
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
                    <div className="space-y-3">
                      {/* 태스크 헤더 */}
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(currentStep, task.id)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Tooltip>
                                <TooltipTrigger>
                                  <h4 className={`font-medium flex items-center gap-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                    {task.title}
                                    {task.required && <span className="text-red-500 ml-1">*</span>}
                                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                                  </h4>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-md p-4 space-y-3">
                                  <div>
                                    <h5 className="font-semibold mb-1">작업 목적</h5>
                                    <p className="text-sm text-muted-foreground">{task.detailedGuide.purpose}</p>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold mb-1">실행 단계</h5>
                                    <ul className="text-sm space-y-1">
                                      {task.detailedGuide.steps.map((step, index) => (
                                        <li key={index} className="text-muted-foreground">{step}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold mb-1">실행 팁</h5>
                                    <ul className="text-sm space-y-1">
                                      {task.detailedGuide.tips.map((tip, index) => (
                                        <li key={index} className="text-muted-foreground">{tip}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold mb-1">기대 효과</h5>
                                    <p className="text-sm text-muted-foreground">{task.detailedGuide.expectedResult}</p>
                                  </div>
                                  {task.detailedGuide.aiHelp && (
                                    <div>
                                      <h5 className="font-semibold mb-1 flex items-center gap-1">
                                        <Sparkles className="h-3 w-3" />
                                        AI 도움
                                      </h5>
                                      <p className="text-sm text-purple-600">{task.detailedGuide.aiHelp}</p>
                                    </div>
                                  )}
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getDifficultyColor(task.difficulty)}>
                                {task.difficulty === 'easy' ? '쉬움' : task.difficulty === 'medium' ? '보통' : '어려움'}
                              </Badge>
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
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      {/* AI 어시스턴트 섹션 */}
                      {task.aiAssistance.available && (
                        <div className="ml-6 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-700">AI 어시스턴트 지원</span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-purple-200 text-purple-700 hover:bg-purple-100"
                              onClick={() => openAiAssistant(task)}
                            >
                              <MessageCircle className="h-3 w-3 mr-1" />
                              AI 도움받기
                            </Button>
                          </div>
                          <p className="text-xs text-purple-600 mt-1">
                            {task.aiAssistance.description}
                          </p>
                        </div>
                      )}

                      {/* 서브태스크 */}
                      {task.subtasks && task.subtasks.length > 0 && (
                        <div className="ml-6 space-y-2">
                          <h5 className="text-sm font-medium text-muted-foreground">세부 작업:</h5>
                          {task.subtasks.map((subtask) => (
                            <div key={subtask.id} className="flex items-center gap-2 p-2 bg-white border rounded">
                              <Checkbox
                                checked={subtask.completed}
                                onCheckedChange={() => toggleSubTask(currentStep, task.id, subtask.id)}
                                className="scale-75"
                              />
                              <Tooltip>
                                <TooltipTrigger className="flex-1">
                                  <span className={`text-sm flex items-center gap-1 ${subtask.completed ? 'line-through text-muted-foreground' : ''}`}>
                                    {subtask.title}
                                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-sm p-3 space-y-2">
                                  <div>
                                    <h6 className="font-semibold text-sm mb-1">상세 설명</h6>
                                    <p className="text-xs text-muted-foreground">{subtask.guide.description}</p>
                                  </div>
                                  <div>
                                    <h6 className="font-semibold text-sm mb-1">실행 방법</h6>
                                    <p className="text-xs text-muted-foreground">{subtask.guide.method}</p>
                                  </div>
                                  <div>
                                    <h6 className="font-semibold text-sm mb-1">실용 팁</h6>
                                    <p className="text-xs text-muted-foreground">{subtask.guide.tip}</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                              {subtask.aiGenerated && (
                                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-200">
                                  <Wand2 className="h-2 w-2 mr-1" />
                                  AI 생성
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 네비게이션 버튼 */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                이전
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={!currentStepData.completed}
                  className="bg-brand-gradient hover:opacity-90"
                >
                  다음
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  disabled={totalProgress < 100}
                  className="bg-brand-gradient hover:opacity-90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  전략 완료
                </Button>
              )}
            </div>
          </TabsContent>

          {/* 스마트 일정 탭 */}
          <TabsContent value="schedule" className="space-y-6">
            {/* 새 일정 추가 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  AI 추천 일정 추가
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">제목</label>
                    <Input
                      placeholder="일정 제목을 입력하세요"
                      value={newScheduleItem.title}
                      onChange={(e) => setNewScheduleItem({...newScheduleItem, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">유형</label>
                    <Select 
                      value={newScheduleItem.type} 
                      onValueChange={(value) => setNewScheduleItem({...newScheduleItem, type: value as ScheduleItem['type']})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="유형 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="content">콘텐츠 제작</SelectItem>
                        <SelectItem value="upload">업로드</SelectItem>
                        <SelectItem value="analysis">분석</SelectItem>
                        <SelectItem value="meeting">미팅</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">날짜</label>
                    <Input
                      type="date"
                      value={newScheduleItem.date}
                      onChange={(e) => setNewScheduleItem({...newScheduleItem, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">시간</label>
                    <Input
                      type="time"
                      value={newScheduleItem.time}
                      onChange={(e) => setNewScheduleItem({...newScheduleItem, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">설명</label>
                  <Textarea
                    placeholder="일정에 대한 자세한 설명을 입력하세요"
                    value={newScheduleItem.description}
                    onChange={(e) => setNewScheduleItem({...newScheduleItem, description: e.target.value})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium mb-2">우선순위</label>
                    <Select 
                      value={newScheduleItem.priority} 
                      onValueChange={(value) => setNewScheduleItem({...newScheduleItem, priority: value as ScheduleItem['priority']})}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">높음</SelectItem>
                        <SelectItem value="medium">보통</SelectItem>
                        <SelectItem value="low">낮음</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI 추천
                    </Button>
                    <Button 
                      onClick={addScheduleItem}
                      className="bg-brand-gradient hover:opacity-90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      일정 추가
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 일정 목록 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  스마트 일정 목록
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduleItems.map((item) => {
                    const IconComponent = getTypeIcon(item.type);
                    return (
                      <div key={item.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <IconComponent className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <Badge className={getPriorityColor(item.priority)}>
                                  {item.priority === 'high' ? '높음' : item.priority === 'medium' ? '보통' : '낮음'}
                                </Badge>
                                <Badge className={getStatusColor(item.status)}>
                                  {item.status === 'completed' ? '완료' : item.status === 'in-progress' ? '진행중' : '대기'}
                                </Badge>
                                {item.linkedTaskId && (
                                  <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                                    <ChevronRight className="h-3 w-3 mr-1" />
                                    워크플로우 연동
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {item.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {item.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateScheduleStatus(item.id, 'in-progress')}
                              >
                                시작
                              </Button>
                            )}
                            {item.status === 'in-progress' && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => updateScheduleStatus(item.id, 'completed')}
                              >
                                완료
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteScheduleItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 성과 분석 탭 */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">AI 추천 적용률</p>
                      <p className="text-2xl font-bold">87%</p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">완료된 태스크</p>
                      <p className="text-2xl font-bold">{steps.reduce((acc, step) => acc + step.tasks.filter(t => t.completed).length, 0)}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">진행 중인 일정</p>
                      <p className="text-2xl font-bold">{scheduleItems.filter(item => item.status === 'in-progress').length}</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">예상 수익 증가</p>
                      <p className="text-2xl font-bold">+24%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  AI 워크플로우 성과 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">이번 주 하이라이트</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>AI 추천 상품 선택</span>
                          <span className="text-green-600 font-medium">수익률 +35%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>AI 생성 썸네일</span>
                          <span className="text-blue-600 font-medium">CTR +28%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>최적 업로드 시간</span>
                          <span className="text-purple-600 font-medium">조회수 +18%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">다음 주 AI 추천</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• 겨울 트렌드 상품 분석 (AI 예측: 고수익)</p>
                        <p>• 연말 콘텐츠 최적화 전략</p>
                        <p>• 시청자 참여도 향상 방안</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI 어���스턴트 모달 */}
        <AIAssistantModal
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
          selectedTask={selectedTask}
          aiChatMessages={aiChatMessages}
          onSendMessage={sendChatMessage}
          aiAssistantData={aiAssistantData}
          isAiAnalyzing={isAiAnalyzing}
          onStartAnalysis={startAiAnalysis}
        />
      </div>
    </TooltipProvider>
  );
}