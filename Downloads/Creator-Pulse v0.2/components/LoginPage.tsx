import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Youtube, 
  Instagram, 
  MessageCircle,
  TrendingUp,
  Users,
  BarChart3,
  ArrowLeft,
  CheckCircle2,
  Zap
} from "lucide-react";

interface LoginPageProps {
  onBack?: () => void;
  onLogin: () => void;
}

export function LoginPage({ onBack, onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const socialProviders = [
    { 
      name: "YouTube", 
      icon: Youtube, 
      color: "bg-red-500 hover:bg-red-600", 
      textColor: "text-white"
    },
    { 
      name: "Instagram", 
      icon: Instagram, 
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600", 
      textColor: "text-white"
    },
    { 
      name: "카카오톡", 
      icon: MessageCircle, 
      color: "bg-yellow-400 hover:bg-yellow-500", 
      textColor: "text-black"
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "실시간 트렌드 분석",
      description: "지금 가장 핫한 상품 정보를 실시간으로 확인하세요"
    },
    {
      icon: Users,
      title: "크리에이터 인사이트",
      description: "성공한 크리에이터들의 전략을 분석해보세요"
    },
    {
      icon: BarChart3,
      title: "AI 수익 예측",
      description: "머신러닝으로 콘텐츠 수익을 미리 예측해보세요"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 실제 로그인 로직은 여기에 구현
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // 실제 소셜 로그인 로직은 여기에 구현
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* 왼쪽 - 브랜드 소개 */}
        <div className="flex flex-col justify-center space-y-8">
          {/* 뒤로가기 버튼 */}
          {onBack && (
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="self-start p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              홈으로 돌아가기
            </Button>
          )}

          {/* 브랜드 헤더 */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-gradient rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-brand-gradient">Creator-Pulse</h1>
                <p className="text-muted-foreground">쇼핑 콘텐츠 분석의 혁신</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold leading-tight">
                데이터 기반의<br />
                <span className="text-brand-gradient">스마트한 콘텐츠 전략</span>을<br />
                시작해보세요
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                2,500명 이상의 성공한 크리에이터들이 Creator-Pulse와 함께 
                월 평균 1,280만원의 수익을 만들어가고 있습니다.
              </p>
            </div>
          </div>

          {/* 주요 기능 */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white/70 rounded-xl border border-gray-200 hover:bg-white/90 transition-colors">
                <div className="w-10 h-10 bg-brand-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 성과 통계 */}
          <div className="bg-white/70 rounded-xl p-6 border border-gray-200">
            <h4 className="font-semibold text-center mb-4">Creator-Pulse 성과</h4>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-brand-gradient">50,000+</div>
                <div className="text-sm text-muted-foreground">분석된 상품</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-gradient">₩12.8M</div>
                <div className="text-sm text-muted-foreground">월 평균 수익</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-gradient">2,500+</div>
                <div className="text-sm text-muted-foreground">활성 크리에이터</div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 - 로그인 폼 */}
        <div className="flex flex-col justify-center">
          <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-6">
              <CardTitle className="text-2xl">로그인</CardTitle>
              <p className="text-muted-foreground">
                Creator-Pulse에서 여러분만의 성공 스토리를 시작하세요
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 소셜 로그인 */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">간편 로그인</p>
                  <div className="grid grid-cols-3 gap-3">
                    {socialProviders.map((provider) => (
                      <Button
                        key={provider.name}
                        variant="outline"
                        className={`h-12 ${provider.color} ${provider.textColor} border-0 hover:scale-105 transition-all duration-200`}
                        onClick={() => handleSocialLogin(provider.name)}
                        disabled={isLoading}
                      >
                        <provider.icon className="h-5 w-5" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">또는 이메일로 로그인</span>
                </div>
              </div>

              {/* 이메일 로그인 폼 */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-[#ff4d6d] focus:ring-[#ff4d6d]/20"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력해주세요"
                      className="pl-10 pr-12 h-12 bg-gray-50 border-gray-200 focus:border-[#ff4d6d] focus:ring-[#ff4d6d]/20"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="remember" className="text-sm">로그인 상태 유지</Label>
                  </div>
                  <Button variant="link" size="sm" className="px-0 text-[#ff4d6d] hover:text-[#ff4d6d]/80">
                    비밀번호를 잊으셨나요?
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-brand-gradient hover:opacity-90 text-white transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      로그인 중...
                    </div>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      로그인
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-[#ff4d6d]/5 to-[#ff8a3d]/5 rounded-lg p-4 border border-[#ff4d6d]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4d6d]" />
                    <span className="text-sm font-medium">무료 체험 혜택</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    첫 가입 시 프리미엄 기능을 7일간 무료로 체험할 수 있습니다
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    아직 계정이 없으신가요?
                  </p>
                  <Button variant="outline" size="sm" className="border-[#ff4d6d]/30 text-[#ff4d6d] hover:bg-[#ff4d6d]/5">
                    무료로 시작하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 보안 안내 */}
          <div className="mt-6 text-center text-xs text-muted-foreground max-w-md mx-auto">
            <p>🔒 Creator-Pulse는 개인정보보호법에 따라 안전하게 데이터를 보호합니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}