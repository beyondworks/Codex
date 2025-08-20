import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { WelcomeBanner } from "./WelcomeBanner";
import { TrendingSection } from "./TrendingSection";
import { PopularCategories } from "./PopularCategories";
import { PopularProducts } from "./PopularProducts";
import { MarketInsights } from "./MarketInsights";
import { QuickStartGuide } from "./QuickStartGuide";
import { AdBanner } from "./AdBanner";
import { kpiStats, quickActions } from "./data/appData";
import {
  Calendar,
  ArrowUpRight,
  Zap,
  Activity
} from "lucide-react";

interface HomePageProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onPageChange: (page: string) => void;
}

export function HomePage({ isLoggedIn, onLoginClick, onPageChange }: HomePageProps) {
  return (
    <div className="space-y-8">
      {/* 1. Hero Section - 비로그인/로그인 상태에 따른 다른 경험 */}
      {!isLoggedIn ? (
        <WelcomeBanner onLoginClick={onLoginClick} />
      ) : (
        <section className="space-y-6">
          {/* 환영 메시지와 실시간 상태 */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                안녕하세요, 크리에이터님! 👋
              </h1>
              <p className="text-muted-foreground text-lg">
                오늘도 성공적인 쇼핑 콘텐츠를 위한 실시간
                인사이트를 확인해보세요
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700">
                  실시간 업데이트
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>마지막 업데이트: 방금 전</span>
              </div>
            </div>
          </div>

          {/* 핵심 성과 지표 - 시각적 강조 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiStats.map((stat, index) => (
              <Card
                key={index}
                className="relative overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${stat.bgColor.replace("bg-", "bg-").replace("-50", "-500")}`}
                ></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`p-2 rounded-lg ${stat.bgColor}`}
                  >
                    <stat.icon
                      className={`h-4 w-4 ${stat.color}`}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${stat.color}`}
                  >
                    <ArrowUpRight className="h-3 w-3" />
                    <span>{stat.change}</span>
                    <span className="text-muted-foreground">
                      vs 지난달
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 2. 즉시 실행 가능한 액션 - 로그인 상태에서만 표시 */}
      {isLoggedIn && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#ff8a3d]" />
            <h2 className="text-xl font-semibold">
              지금 바로 할 수 있는 일
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-[#ff8a3d]/20"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <action.icon
                      className={`h-6 w-6 ${action.color}`}
                    />
                  </div>
                  <h3 className="font-semibold mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {action.description}
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-brand-gradient hover:opacity-90 transition-all duration-200"
                    onClick={() => onPageChange(action.targetPage)}
                  >
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 3. 메인 콘텐츠 - 2:1 비율 2행 레이아웃 */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#ff4d6d]" />
          <h2 className="text-xl font-semibold">
            실시간 마켓 인사이트
          </h2>
          <Badge className="bg-brand-gradient text-white border-0">
            LIVE
          </Badge>
        </div>

        {/* 첫 번째 행 - 실시간 트렌드 + 인기 카테고리 + 광고 배너 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 왼쪽 컬럼 - 실시간 트렌드 (8/12 = 2/3) */}
          <div className="lg:col-span-8">
            <TrendingSection onPageChange={onPageChange} />
          </div>

          {/* 오른쪽 컬럼 - 인기 카테고리 + 광고 배너 (4/12 = 1/3) */}
          <div className="lg:col-span-4 space-y-6">
            <PopularCategories />
            <AdBanner />
          </div>
        </div>

        {/* 두 번째 행 - 실시간 인기 상품 + 빠른 시작 가이드 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 왼쪽 컬럼 - 실시간 인기 상품 (8/12 = 2/3) */}
          <div className="lg:col-span-8">
            <PopularProducts onPageChange={onPageChange} />
          </div>

          {/* 오른쪽 컬럼 - 빠른 시작 가이드 (4/12 = 1/3) */}
          <div className="lg:col-span-4">
            <QuickStartGuide onPageChange={onPageChange} />
          </div>
        </div>
      </section>

      {/* 4. 시장 분석 - 전체 너비 */}
      <section className="space-y-4">
        <MarketInsights onPageChange={onPageChange} />
      </section>

      {/* 개발용 로그인 토글 */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        <Button
          onClick={onLoginClick}
          className="bg-brand-gradient hover:opacity-90 shadow-lg w-full"
          size="sm"
        >
          로그인 페이지
        </Button>
        <Button
          onClick={() => {
            // 로그인 상태 토글은 App.tsx에서 처리
          }}
          className="bg-gray-600 hover:bg-gray-700 shadow-lg w-full text-white"
          size="sm"
        >
          상태 토글
        </Button>
      </div>
    </div>
  );
}