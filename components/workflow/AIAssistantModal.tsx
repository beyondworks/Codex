import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  Brain, 
  Sparkles, 
  RefreshCw, 
  ArrowRight, 
  BarChart3, 
  CheckCircle, 
  Lightbulb 
} from "lucide-react";
import { Task, AIAssistantData } from "./types";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: Task | null;
  aiChatMessages: Array<{role: 'user' | 'assistant', content: string}>;
  onSendMessage: (message: string) => void;
  aiAssistantData: Record<string, AIAssistantData>;
  isAiAnalyzing: boolean;
  onStartAnalysis: (taskId: string, analysisType: string) => void;
}

export function AIAssistantModal({
  isOpen,
  onClose,
  selectedTask,
  aiChatMessages,
  onSendMessage,
  aiAssistantData,
  isAiAnalyzing,
  onStartAnalysis
}: AIAssistantModalProps) {
  const [chatInput, setChatInput] = useState("");

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    onSendMessage(chatInput);
    setChatInput("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-h-[85vh] overflow-y-auto !max-w-none"
        style={{ width: '60vw', maxWidth: '60vw' }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-foreground" />
            AI 어시스턴트
            {selectedTask && (
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                {selectedTask.title}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            AI가 단계별로 도와드리겠습니다. 궁금한 점이나 도움이 필요한 부분을 말씀해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* AI 분석 결과 */}
          {selectedTask && aiAssistantData[selectedTask.id] && (
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-foreground" />
                  AI 분석 결과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {aiAssistantData[selectedTask.id].recommendations?.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-white rounded">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 채팅 영역 */}
          <div className="space-y-3">
            <div className="max-h-80 overflow-y-auto space-y-2 p-4 border rounded-lg bg-gray-50">
              {aiChatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-lg p-3 rounded-lg text-sm leading-relaxed ${
                    message.role === 'user' 
                      ? 'bg-brand-gradient text-white' 
                      : 'bg-white border shadow-sm'
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isAiAnalyzing && (
                <div className="flex justify-start">
                  <div className="bg-white border p-2 rounded-lg text-sm flex items-center gap-2">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    AI가 분석 중입니다...
                  </div>
                </div>
              )}
            </div>

            {/* 채팅 입력 */}
            <div className="flex gap-2">
              <Input
                placeholder="AI에게 질문하세요..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              />
              <Button onClick={sendChatMessage} className="bg-brand-gradient hover:opacity-90">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 빠른 액션 버튼들 */}
          {selectedTask && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => onStartAnalysis(selectedTask.id, 'full')}
                disabled={isAiAnalyzing}
                className="w-full"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                전체 분석 시작
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onSendMessage('이 작업을 위한 체크리스트를 생성해드렸습니다. 단계별로 진행해보세요!');
                }}
                className="w-full"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                체크리스트 생성
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onSendMessage('과거 데이터를 바탕으로 한 개선 방안을 제안드리겠습니다.');
                }}
                className="w-full"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                개선 방안
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}