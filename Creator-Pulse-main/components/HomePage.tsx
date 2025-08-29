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
import { useKpiStats, quickActions } from "./data/appData";
import {
  Calendar,
  ArrowUpRight,
  Zap,
  Activity,
  Lightbulb,
  DollarSign,
  TrendingUp,
  Users
} from "lucide-react";

interface HomePageProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onPageChange: (page: string) => void;
}

export function HomePage({ isLoggedIn, onLoginClick, onPageChange }: HomePageProps) {
  const kpiStats = useKpiStats();
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
                안녕하세요, Creator
              </h1>
              <p className="text-muted-foreground text-lg">
                데이터 기반 인사이트로 최적의 콘텐츠 전략을
                수립하고 성과를 극대화하세요
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700">
                  Live Update
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Updated: Now</span>
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
                    <div className={`h-4 w-4 rounded ${stat.color}`} />
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

      {/* 2. 오늘의 기회 - 메인 CTA */}
      {isLoggedIn && (
        <section className="space-y-6">
          {/* 메인 CTA - 오늘의 기회 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ff8a3d]/10 via-[#ff4d6d]/10 to-[#ff8a3d]/10 border border-[#ff8a3d]/20 shadow-lg shadow-[#ff8a3d]/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff8a3d]/5 via-transparent to-[#ff4d6d]/5"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-[#ff8a3d] to-[#ff4d6d] shadow-lg shadow-[#ff8a3d]/30">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff8a3d] to-[#ff4d6d] bg-clip-text text-transparent">
                        Today's Opportunity
                      </h2>
                      <p className="text-muted-foreground">
                        Prime content opportunity with highest ROI potential
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Wireless Earbuds: Complete Review & Unboxing
                    </h3>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 font-medium">94.5% Confidence</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-[#ff8a3d]" />
                        <span className="font-semibold text-[#ff8a3d]">Est. Monthly Revenue: ₩850,000</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 font-medium">+32% Growth Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-apple-xl text-white font-semibold px-10 py-4 rounded-2xl shadow-apple-lg hover:shadow-apple-xl transition-all duration-300 hover:scale-[1.02] border-0"
                  size="lg"
                  onClick={() => onPageChange('trends')}
                >
                  <span className="text-apple-callout font-semibold">Start Creating</span>
                </Button>
              </div>
            </div>
          </div>

          {/* 빠른 액션 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#ff8a3d]" />
              <h2 className="text-xl font-semibold">
                Quick Actions
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
          </div>
        </section>
      )}

      {/* 3-Tier Premium Funnel */}
      <section className="space-y-16">
        {/* Tier 1: DISCOVER */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-full mb-4">
              <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
              <span className="text-apple-footnote font-semibold text-brand-primary uppercase tracking-wider">Discover</span>
            </div>
            <h2 className="text-apple-title-1 font-semibold text-apple-gray-900">
              Market Opportunities
            </h2>
            <p className="text-apple-body text-apple-gray-600 max-w-2xl mx-auto">
              실시간 데이터로 가장 유망한 콘텐츠 기회를 발견하세요
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TrendingSection onPageChange={onPageChange} />
            </div>
            <div className="space-y-6">
              <PopularProducts onPageChange={onPageChange} />
              <PopularCategories />
            </div>
          </div>
        </div>

        {/* Tier 2: ANALYZE */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 rounded-full mb-4">
              <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
              <span className="text-apple-footnote font-semibold text-brand-secondary uppercase tracking-wider">Analyze</span>
            </div>
            <h2 className="text-apple-title-1 font-semibold text-apple-gray-900">
              Data-Driven Insights
            </h2>
            <p className="text-apple-body text-apple-gray-600 max-w-2xl mx-auto">
              심도 있는 시장 분석과 수익성 예측으로 전략을 수립하세요
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <MarketInsights onPageChange={onPageChange} />
            </div>
            <div>
              <AdBanner />
            </div>
          </div>
        </div>

        {/* Tier 3: ACT */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-apple-gray-900/10 to-apple-gray-700/10 rounded-full mb-4">
              <div className="w-2 h-2 bg-apple-gray-900 rounded-full"></div>
              <span className="text-apple-footnote font-semibold text-apple-gray-900 uppercase tracking-wider">Act</span>
            </div>
            <h2 className="text-apple-title-1 font-semibold text-apple-gray-900">
              Execute Strategy
            </h2>
            <p className="text-apple-body text-apple-gray-600 max-w-2xl mx-auto">
              최적화된 가이드와 도구로 성공적인 콘텐츠를 제작하세요
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <QuickStartGuide onPageChange={onPageChange} />
          </div>
        </div>
      </section>

    </div>
  );
}