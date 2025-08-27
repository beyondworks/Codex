import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  DollarSign, 
  Star,
  CheckCircle,
  Send,
  X
} from "lucide-react";
import { toast } from "sonner";

interface CreatorCollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: any;
}

export function CreatorCollaborationModal({ isOpen, onClose, creator }: CreatorCollaborationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
    collaborationType: "sponsorship"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const collaborationTypes = [
    { id: "sponsorship", label: "스폰서십", description: "제품 후원 및 리뷰" },
    { id: "partnership", label: "파트너십", description: "장기 협업 관계" },
    { id: "ambassador", label: "앰버서더", description: "브랜드 대사 역할" },
    { id: "content", label: "콘텐츠 제작", description: "맞춤형 콘텐츠" }
  ];

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("필수 정보를 모두 입력해주세요");
      return;
    }

    setIsSubmitting(true);
    
    // 실제 구현 시 API 호출
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("협업 문의가 성공적으로 전송되었습니다!");
    setIsSubmitting(false);
    onClose();
    
    // 폼 초기화
    setFormData({
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
      collaborationType: "sponsorship"
    });
  };

  if (!creator) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff4d6d] to-[#ff8a3d] flex items-center justify-center text-white">
              {creator.avatar}
            </div>
            <div>
              <span>{creator.name}님과 협업하기</span>
              <p className="text-sm text-muted-foreground font-normal">{creator.category} 크리에이터</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            크리에이터와의 협업을 위한 문의 양식입니다. 협업 유형과 조건을 설정하여 문의를 보내주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 크리에이터 정보 요약 */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                    <Users className="h-4 w-4" />
                    <span>구독자</span>
                  </div>
                  <div className="font-bold">{creator.subscribers}</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span>월 수익</span>
                  </div>
                  <div className="font-bold text-green-600">{creator.revenue}</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                    <Star className="h-4 w-4" />
                    <span>참여율</span>
                  </div>
                  <div className="font-bold text-blue-600">{creator.engagement}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 협업 유형 선택 */}
          <div className="space-y-3">
            <label className="text-sm font-medium">협업 유형 *</label>
            <div className="grid grid-cols-2 gap-3">
              {collaborationTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all ${
                    formData.collaborationType === type.id 
                      ? "border-[#ff4d6d] bg-red-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setFormData({...formData, collaborationType: type.id})}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      {formData.collaborationType === type.id && (
                        <CheckCircle className="h-4 w-4 text-[#ff4d6d]" />
                      )}
                      <span className="font-medium text-sm">{type.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">담당자명 *</label>
              <Input
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">이메일 *</label>
              <Input
                type="email"
                placeholder="contact@company.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">회사명</label>
              <Input
                placeholder="회사명 (선택사항)"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">예산 범위</label>
              <Input
                placeholder="예: 100만원 ~ 300만원"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              />
            </div>
          </div>

          {/* 메시지 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">협업 제안 메시지 *</label>
            <Textarea
              placeholder="협업 내용, 기간, 조건 등을 자세히 설명해주세요."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          {/* 예상 응답 시간 */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">예상 응답 시간: 2-3 영업일</span>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-[#ff4d6d] hover:bg-[#ff4d6d]/90"
            >
              {isSubmitting ? (
                <>처리 중...</>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  협업 문의 보내기
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}