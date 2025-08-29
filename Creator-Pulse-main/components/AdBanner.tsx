import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

export function AdBanner() {
  return (
    <Card className="h-fit relative overflow-hidden border-2 border-[#ff8a3d]/20 hover:border-[#ff8a3d]/40 transition-all duration-300 group cursor-pointer">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d6d]/5 via-transparent to-[#ff8a3d]/5 group-hover:from-[#ff4d6d]/10 group-hover:to-[#ff8a3d]/10 transition-all duration-300"></div>
      
      <CardContent className="relative p-4">
        {/* 상단 - 프로모션 태그 */}
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-brand-gradient text-white border-0 text-apple-caption px-2 py-1 font-medium shadow-apple-sm">
            PREMIUM
          </Badge>
          <Sparkles className="h-4 w-4 text-[#ff8a3d] animate-pulse" />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-apple-callout leading-tight text-apple-gray-900">
              AI Revenue Optimization
            </h3>
            <p className="text-apple-caption text-apple-gray-600 leading-relaxed">
              Triple your revenue with machine learning-powered personalized strategies
            </p>
          </div>

          {/* 특징 리스트 */}
          <ul className="space-y-0.5 text-apple-caption text-apple-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-brand-secondary rounded-full"></div>
              Real-time trend alerts
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-brand-secondary rounded-full"></div>
              Personalized product recommendations
            </li>
          </ul>
        </div>

        {/* 하단 - CTA */}
        <div className="space-y-2 mt-3">
          <div className="flex items-center gap-2 text-apple-caption">
            <Zap className="h-3 w-3 text-brand-secondary" />
            <span className="text-apple-gray-600 font-medium">7-day free trial</span>
          </div>
          
          <Button 
            size="sm" 
            className="w-full bg-brand-gradient hover:opacity-90 transition-all duration-200 group-hover:scale-[1.02] text-apple-caption h-7 font-medium shadow-apple-sm hover:shadow-apple-md rounded-lg"
          >
            Start Free Trial
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>

        {/* 장식적 요소 */}
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-brand-gradient rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#ff8a3d]/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      </CardContent>
    </Card>
  );
}