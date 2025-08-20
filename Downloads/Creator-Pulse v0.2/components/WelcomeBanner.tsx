import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Play, Zap, TrendingUp, Target } from "lucide-react";

interface WelcomeBannerProps {
  onLoginClick?: () => void;
}

export function WelcomeBanner({ onLoginClick }: WelcomeBannerProps) {
  return (
    <Card className="relative overflow-hidden bg-brand-gradient p-4 md:p-8 text-white mb-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-12 left-16 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute top-8 left-32 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-16 left-48 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute top-20 left-12 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute top-32 left-28 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-24 left-64 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute top-4 right-8 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute top-16 right-24 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-28 right-12 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-16 left-40 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-12 right-16 w-1 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-sm font-medium opacity-90">Creator-Pulse와 함께</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="block sm:inline">YouTube 쇼핑의</span>
              <span className="block sm:inline"> 새로운 기준을 제시하세요</span>
            </h1>
            
            <p className="text-base md:text-lg opacity-90 mb-6 max-w-2xl leading-relaxed">
              AI 기반 분석으로 트렌드를 앞서가고, 데이터 인사이트로 
              수익을 극대화하세요. 성공하는 크리에이터들의 선택입니다.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 md:gap-4 mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">실시간 트렌드 분석</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="text-sm">수익 예측</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="text-sm">인사이트</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 font-medium"
                onClick={onLoginClick}
              >
                무료로 시작하기
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/50 text-white bg-transparent hover:bg-white/20 hover:border-white hover:text-white"
              >
                <Play className="h-4 w-4 mr-2" />
                데모 보기
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <TrendingUp className="h-10 w-10 text-[#ff4d6d]" />
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">2.5M+</div>
                <div className="text-xs opacity-80">총 조회수</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-xs opacity-80">만족도</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}