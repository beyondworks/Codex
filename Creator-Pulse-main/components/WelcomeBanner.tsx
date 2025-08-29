import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Play, Zap, TrendingUp, Target } from "lucide-react";

interface WelcomeBannerProps {
  onLoginClick?: () => void;
}

export function WelcomeBanner({ onLoginClick }: WelcomeBannerProps) {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white via-apple-gray-50 to-apple-gray-100 border-0 shadow-apple-lg p-8 md:p-12 mb-6">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-brand-primary to-brand-secondary rounded-full"></div>
              <span className="text-apple-footnote font-medium text-apple-gray-600 tracking-wide">Creator-Pulse</span>
            </div>
            
            <h1 className="text-apple-title-1 md:text-apple-large-title font-semibold mb-4 text-apple-gray-900 leading-tight">
              <span className="block">Creator를 위한</span>
              <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Premium Analytics
              </span>
            </h1>
            
            <p className="text-apple-body md:text-apple-callout text-apple-gray-700 mb-8 max-w-2xl leading-relaxed">
              데이터 기반 인사이트로 콘텐츠 전략을 최적화하고, 
              정확한 트렌드 분석을 통해 수익성을 극대화하세요.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-primary" />
                <span className="text-apple-footnote font-medium text-apple-gray-700">Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-brand-secondary" />
                <span className="text-apple-footnote font-medium text-apple-gray-700">Revenue Insights</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-apple-lg transition-all duration-300 hover:scale-[1.02] font-medium px-8 py-3 rounded-2xl shadow-apple-md border-0"
                onClick={onLoginClick}
              >
                Get Started
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-apple-gray-600 hover:text-apple-gray-900 hover:bg-transparent font-medium"
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-40 h-40 bg-gradient-to-br from-white to-apple-gray-50 rounded-3xl flex items-center justify-center shadow-apple-lg border border-apple-gray-200/50">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center shadow-apple-md">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
              </div>
              
              {/* Refined Stats */}
              <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-center shadow-apple-lg border border-apple-gray-200/30">
                <div className="text-apple-title-3 font-semibold text-apple-gray-900">2.5M+</div>
                <div className="text-apple-caption text-apple-gray-600">Total Views</div>
              </div>
              
              <div className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-center shadow-apple-lg border border-apple-gray-200/30">
                <div className="text-apple-title-3 font-semibold text-apple-gray-900">95%</div>
                <div className="text-apple-caption text-apple-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}