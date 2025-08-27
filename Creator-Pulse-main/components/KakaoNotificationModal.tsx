import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  MessageCircle, 
  Phone, 
  Bell,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Settings,
  Clock,
  Star
} from "lucide-react";
import { toast } from "sonner";
import { kakaoAPI } from "../utils/kakao-api";
import { NotificationHistoryModal } from "./NotificationHistoryModal";

interface KakaoNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productId?: string;
}

export function KakaoNotificationModal({ 
  isOpen, 
  onClose, 
  productName = "",
  productId = ""
}: KakaoNotificationModalProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [showHistory, setShowHistory] = useState(false);
  
  // 알림 설정
  const [notificationSettings, setNotificationSettings] = useState({
    trendChanges: true,
    priceDrops: true,
    competitorAnalysis: true,
    revenueOpportunities: true,
    contentTiming: true,
    weeklyReports: false
  });

  // 임계값 설정
  const [thresholds, setThresholds] = useState({
    growthRate: "50",
    priceChange: "20",
    revenueIncrease: "30"
  });

  const handlePhoneSubmit = async () => {
    if (!phoneNumber) {
      toast.error("전화번호를 입력해주세요");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      await kakaoAPI.sendVerificationCode(phoneNumber);
      setIsVerifying(false);
      setShowVerification(true);
      toast.success("인증번호가 발송되었습니다");
    } catch (error) {
      setIsVerifying(false);
      toast.error("인증번호 발송에 실패했습니다");
      console.error("Verification send error:", error);
    }
  };

  const handleVerificationSubmit = async () => {
    if (!verificationCode) {
      toast.error("인증번호를 입력해주세요");
      return;
    }

    try {
      const verifyResult = await kakaoAPI.verifyCode(phoneNumber, verificationCode);
      
      if (verifyResult.success && verifyResult.kakaoId) {
        // 카카오톡 사용자 등록
        const registerResult = await kakaoAPI.registerUser(phoneNumber, verifyResult.kakaoId);
        
        setUserId(registerResult.userId);
        setIsConnected(true);
        setShowVerification(false);
        toast.success("카카오톡 연동이 완료되었습니다!");
      } else {
        toast.error("인증번호가 올바르지 않습니다");
      }
    } catch (error) {
      toast.error("인증 확인에 실패했습니다");
      console.error("Verification error:", error);
    }
  };

  const handleSaveSettings = async () => {
    if (!userId) {
      toast.error("사용자 정보가 없습니다");
      return;
    }

    try {
      const settings = {
        userId,
        phoneNumber,
        ...notificationSettings,
        thresholds: {
          growthRate: parseInt(thresholds.growthRate),
          priceChange: parseInt(thresholds.priceChange),
          revenueIncrease: parseInt(thresholds.revenueIncrease)
        }
      };

      await kakaoAPI.saveNotificationSettings(settings);
      toast.success("알림 설정이 저장되었습니다");
      
      // 테스트 알림 발송
      if (productName) {
        await kakaoAPI.sendNotification(phoneNumber, 'trendAlert', {
          productName,
          growth: 67,
          revenue: "₩3.2M"
        });
        toast.success("테스트 알림이 전송되었습니다!");
      }
      
      onClose();
    } catch (error) {
      toast.error("알림 설정 저장에 실패했습니다");
      console.error("Save settings error:", error);
    }
  };

  const notificationTypes = [
    {
      id: "trendChanges",
      title: "트렌드 변화 알림",
      description: "상품의 급상승/급하락 시 즉시 알림",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      id: "priceDrops",
      title: "가격 변동 알림", 
      description: "할인 이벤트나 가격 변화 감지",
      icon: DollarSign,
      color: "text-blue-500"
    },
    {
      id: "competitorAnalysis",
      title: "경쟁 분석 알림",
      description: "경쟁사 대비 우위 상황 발생",
      icon: BarChart3,
      color: "text-purple-500"
    },
    {
      id: "revenueOpportunities",
      title: "수익 기회 알림",
      description: "높은 수익률 달성 가능 시점",
      icon: Star,
      color: "text-yellow-500"
    },
    {
      id: "contentTiming",
      title: "콘텐츠 타이밍 알림",
      description: "최적의 업로드 시간 추천",
      icon: Clock,
      color: "text-orange-500"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-none" style={{ width: '60vw', maxWidth: '60vw' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MessageCircle className="h-5 w-5 text-yellow-600" />
            </div>
            카카오톡 알림 설정
            {productName && (
              <Badge variant="secondary" className="ml-2">
                {productName}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            카카오톡으로 실시간 트렌드 알림을 받고 최적의 콘텐츠 제작 타이밍을 놓치지 마세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 카카오톡 연동 상태 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                카카오톡 계정 연동
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <>
                  {!showVerification ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>전화번호</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="010-1234-5678"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={isVerifying}
                          />
                          <Button 
                            onClick={handlePhoneSubmit}
                            disabled={isVerifying}
                            className="whitespace-nowrap"
                          >
                            {isVerifying ? "발송중..." : "인증번호 받기"}
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        * 카카오톡으로 인증번호가 발송됩니다
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>인증번호</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="6자리 인증번호 입력"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            maxLength={6}
                          />
                          <Button onClick={handleVerificationSubmit}>
                            인증 확인
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        카카오톡으로 받은 6자리 인증번호를 입력해주세요
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-green-700">연동 완료</div>
                      <div className="text-sm text-green-600">
                        {phoneNumber}으로 카카오톡 알림을 받을 수 있습니다
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowHistory(true)}
                    className="w-full"
                  >
                    히스토리 보기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 알림 타입 설정 */}
          {isConnected && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    알림 타입 선택
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notificationTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.id} className="flex items-start gap-4 p-3 border rounded-lg">
                        <Icon className={`h-5 w-5 mt-1 ${type.color}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{type.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {type.description}
                              </div>
                            </div>
                            <Switch
                              checked={notificationSettings[type.id as keyof typeof notificationSettings]}
                              onCheckedChange={(checked) =>
                                setNotificationSettings(prev => ({
                                  ...prev,
                                  [type.id]: checked
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <Separator />
                  
                  <div className="flex items-start gap-4 p-3 border rounded-lg">
                    <BarChart3 className="h-5 w-5 mt-1 text-gray-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">주간 리포트</div>
                          <div className="text-sm text-muted-foreground">
                            매주 종합 분석 리포트 발송
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings.weeklyReports}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              weeklyReports: checked
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 임계값 설정 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    알림 임계값 설정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>성장률 변화</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={thresholds.growthRate}
                          onChange={(e) => setThresholds(prev => ({
                            ...prev,
                            growthRate: e.target.value
                          }))}
                        />
                        <span className="text-sm text-muted-foreground">% 이상</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>가격 변동</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={thresholds.priceChange}
                          onChange={(e) => setThresholds(prev => ({
                            ...prev,
                            priceChange: e.target.value
                          }))}
                        />
                        <span className="text-sm text-muted-foreground">% 이상</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>수익 증가</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={thresholds.revenueIncrease}
                          onChange={(e) => setThresholds(prev => ({
                            ...prev,
                            revenueIncrease: e.target.value
                          }))}
                        />
                        <span className="text-sm text-muted-foreground">% 이상</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 미리보기 */}
              <Card>
                <CardHeader>
                  <CardTitle>알림 메시지 미리보기</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-yellow-800">Creator-Pulse 알림</div>
                        <div className="text-yellow-700 mt-1">
                          🚀 <strong>{productName || "애플 에어팟"}</strong>이 급상승 중입니다!<br/>
                          성장률: +67% ↗️<br/>
                          지금이 콘텐츠 제작 최적 타이밍입니다.
                        </div>
                        <div className="text-xs text-yellow-600 mt-2">
                          Creator-Pulse • 방금 전
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* 알림 용도 안내 */}
        <div className="bg-[rgba(255,255,255,1)] border border-blue-200 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-800 mb-2">카카오톡 알림을 통해 받을 수 있는 혜택</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>트렌드 급상승 시 즉시 알림</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3 w-3 text-blue-500" />
                    <span>수익 기회 실시간 포착</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-orange-500" />
                    <span>콘텐츠 제작 최적 타이밍 안내</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-3 w-3 text-purple-500" />
                    <span>경쟁사 분석 및 전략 추천</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>주간 성과 리포트 제공</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>맞춤형 인사이트 및 팁</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="bg-blue-200" />
          
          <div className="text-xs text-blue-600 space-y-1">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>개인정보는 암호화되어 안전하게 보호됩니다</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>언제든지 알림을 해제하거나 설정을 변경할 수 있습니다</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>오직 선택한 알림만 받으며, 스팸 메시지는 발송하지 않습니다</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          {isConnected && (
            <Button onClick={handleSaveSettings} className="bg-brand-gradient hover:opacity-90">
              설정 저장
            </Button>
          )}
        </div>
      </DialogContent>

      {/* 알림 히스토리 모달 */}
      <NotificationHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        phoneNumber={phoneNumber}
      />
    </Dialog>
  );
}