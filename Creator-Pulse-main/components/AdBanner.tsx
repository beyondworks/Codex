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
          <Badge className="bg-brand-gradient text-white border-0 text-xs px-2 py-1">
            💎 PREMIUM
          </Badge>
          <Sparkles className="h-4 w-4 text-[#ff8a3d] animate-pulse" />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-base leading-tight">
              AI 수익 최적화
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              머신러닝 기반 개인 맞춤 전략으로 수익을 3배 늘려보세요
            </p>
          </div>

          {/* 특징 리스트 */}
          <ul className="space-y-0.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#ff8a3d] rounded-full"></div>
              실시간 트렌드 알림
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#ff8a3d] rounded-full"></div>
              개인 맞춤 상품 추천
            </li>
          </ul>
        </div>

        {/* 하단 - CTA */}
        <div className="space-y-2 mt-3">
          <div className="flex items-center gap-2 text-xs">
            <Zap className="h-3 w-3 text-[#ff8a3d]" />
            <span className="text-muted-foreground">7일 무료 체험</span>
          </div>
          
          <Button 
            size="sm" 
            className="w-full bg-brand-gradient hover:opacity-90 transition-all duration-200 group-hover:scale-[1.02] text-xs h-7"
          >
            무료로 시작하기
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