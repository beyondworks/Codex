import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  RefreshCw
} from "lucide-react";
import { kakaoAPI } from "../utils/kakao-api";
import { toast } from "sonner";

interface NotificationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}

interface NotificationItem {
  id: string;
  productName: string;
  type: string;
  message: string;
  sentAt: string;
  status: 'sent' | 'failed';
}

export function NotificationHistoryModal({ 
  isOpen, 
  onClose, 
  phoneNumber 
}: NotificationHistoryModalProps) {
  const [history, setHistory] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && phoneNumber) {
      loadHistory();
    }
  }, [isOpen, phoneNumber]);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await kakaoAPI.getNotificationHistory(phoneNumber);
      setHistory(data);
    } catch (error) {
      toast.error("알림 히스토리를 불러올 수 없습니다");
      console.error("History load error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trendAlert': return <TrendingUp className="h-4 w-4" />;
      case 'priceAlert': return <DollarSign className="h-4 w-4" />;
      case 'weeklyReport': return <BarChart3 className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'trendAlert': return '트렌드 알림';
      case 'priceAlert': return '가격 변동';
      case 'weeklyReport': return '주간 리포트';
      default: return '알림';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trendAlert': return 'text-green-600 bg-green-50';
      case 'priceAlert': return 'text-blue-600 bg-blue-50';
      case 'weeklyReport': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return '방금 전';
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MessageCircle className="h-5 w-5 text-yellow-600" />
            </div>
            카카오톡 알림 히스토리
          </DialogTitle>
          <DialogDescription>
            {phoneNumber}으로 전송된 카카오톡 알림의 전체 히스토리를 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {phoneNumber}
            </Badge>
            <Badge variant="secondary">
              총 {history.length}개
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadHistory}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="h-3 w-3 mr-1" />
            )}
            새로고침
          </Button>
        </div>

        <ScrollArea className="h-96">
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  히스토리를 불러오는 중...
                </div>
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <MessageCircle className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-muted-foreground">아직 전송된 알림이 없습니다</p>
                <p className="text-sm text-muted-foreground">
                  알림을 설정하면 여기에서 히스토리를 확인할 수 있습니다
                </p>
              </div>
            ) : (
              history.map((item, index) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {getTypeName(item.type)}
                            </Badge>
                            <span className="text-sm font-medium">
                              {item.productName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.status === 'sent' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatDate(item.sentAt)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.message}
                        </p>
                        {item.status === 'failed' && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center gap-1 text-red-600">
                              <XCircle className="h-3 w-3" />
                              <span className="text-xs">전송 실패</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}