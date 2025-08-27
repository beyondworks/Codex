import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuCheckboxItem } from "./ui/dropdown-menu";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BarChart3,
  Eye,
  Activity,
  Target,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Check
} from "lucide-react";
import { RevenueDetailModal } from "./RevenueDetailModal";
import { GrowthDetailModal } from "./GrowthDetailModal";
import { ViewsDetailModal } from "./ViewsDetailModal";
import { ConversionDetailModal } from "./ConversionDetailModal";
import { VideoDetailModal } from "./VideoDetailModal";

interface DashboardFilters {
  selectedDateRange: string;
  selectedCategories: string[];
  selectedMetrics: string[];
  hasUserInteracted: boolean;
}

interface DashboardPageProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

export function DashboardPage({ filters, onFiltersChange }: DashboardPageProps) {
  const { selectedDateRange, selectedCategories, selectedMetrics, hasUserInteracted } = filters;
  
  // 모달 상태 관리
  const [revenueModalOpen, setRevenueModalOpen] = useState(false);
  const [growthModalOpen, setGrowthModalOpen] = useState(false);
  const [viewsModalOpen, setViewsModalOpen] = useState(false);
  const [conversionModalOpen, setConversionModalOpen] = useState(false);
  const [videoDetailModalOpen, setVideoDetailModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  // 필터 옵션 데이터
  const dateRangeOptions = [
    { value: "week", label: "최근 1주", active: false },
    { value: "month", label: "최근 1개월", active: true },
    { value: "quarter", label: "최근 3개월", active: false },
    { value: "year", label: "최근 1년", active: false }
  ];

  const categoryOptions = [
    { value: "beauty", label: "뷰티/화장품" },
    { value: "fashion", label: "패션/의류" },
    { value: "lifestyle", label: "생활용품" },
    { value: "electronics", label: "전자기기" },
    { value: "health", label: "건강/운동" }
  ];

  const metricOptions = [
    { value: "revenue", label: "수익" },
    { value: "views", label: "조회수" },
    { value: "sales", label: "판매량" },
    { value: "conversion", label: "전환율" },
    { value: "ctr", label: "클릭률" }
  ];

  // 필터 토글 함수
  const updateFilters = (updates: Partial<DashboardFilters>) => {
    onFiltersChange({ ...filters, hasUserInteracted: true, ...updates });
  };

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category) 
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    updateFilters({ selectedCategories: newCategories });
  };

  const toggleMetric = (metric: string) => {
    const newMetrics = selectedMetrics.includes(metric) 
      ? selectedMetrics.filter(m => m !== metric)
      : [...selectedMetrics, metric];
    updateFilters({ selectedMetrics: newMetrics });
  };

  const toggleAllCategories = () => {
    const newCategories = selectedCategories.length === categoryOptions.length 
      ? [] 
      : categoryOptions.map(cat => cat.value);
    updateFilters({ selectedCategories: newCategories });
  };

  const toggleAllMetrics = () => {
    const newMetrics = selectedMetrics.length === metricOptions.length 
      ? ["revenue", "views"] // 기본값으로 복원
      : metricOptions.map(metric => metric.value);
    updateFilters({ selectedMetrics: newMetrics });
  };

  // 기본값과 다른 상태인지 확인하는 함수
  const isDefaultMetrics = () => {
    return selectedMetrics.length === 2 && 
           selectedMetrics.includes("revenue") && 
           selectedMetrics.includes("views");
  };

  const hasActiveFilters = () => {
    return hasUserInteracted && (
      selectedCategories.length > 0 || 
      !isDefaultMetrics() || 
      selectedDateRange !== "month"
    );
  };
  const kpiStats = [
    {
      title: "이번 달 수익",
      value: "₩12,847,230",
      change: "+18.7%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "지난달 대비",
      onClick: () => setRevenueModalOpen(true)
    },
    {
      title: "총 조회수",
      value: "2,428,156",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "이번 달",
      onClick: () => setViewsModalOpen(true)
    },
    {
      title: "총 판매량",
      value: "8,742",
      change: "+23.1%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "상품 판매",
      onClick: () => setGrowthModalOpen(true)
    },
    {
      title: "전환율",
      value: "4.8%",
      change: "+0.3%",
      trend: "up",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "클릭→구매",
      onClick: () => setConversionModalOpen(true)
    }
  ];

  const recentVideos = [
    {
      title: "겨울 필수템 TOP 10 🔥",
      views: "125,892",
      revenue: "₩2,847,230",
      ctr: "8.4%",
      uploadDate: "2일 전",
      status: "trending"
    },
    {
      title: "신상 뷰티 아이템 리뷰",
      views: "89,456",
      revenue: "₩1,923,150",
      ctr: "6.2%",
      uploadDate: "1주 전",
      status: "stable"
    },
    {
      title: "홈트 필수 운동용품",
      views: "156,234",
      revenue: "₩3,456,780",
      ctr: "9.1%",
      uploadDate: "3일 전",
      status: "trending"
    },
    {
      title: "가성비 갑! 생활용품",
      views: "67,834",
      revenue: "₩987,650",
      ctr: "5.8%",
      uploadDate: "5일 전",
      status: "declining"
    }
  ];

  const topCategories = [
    { name: "뷰티/화장품", sales: 2847, revenue: "₩8,234,567", growth: 23.5 },
    { name: "패션/의류", sales: 1923, revenue: "₩5,678,901", growth: 18.2 },
    { name: "생활용품", sales: 1456, revenue: "₩3,456,789", growth: 15.7 },
    { name: "전자기기", sales: 892, revenue: "₩12,345,678", growth: 12.1 },
    { name: "운동/헬스", sales: 734, revenue: "₩2,876,543", growth: 9.8 }
  ];

  const monthlyData = [
    { month: "1월", revenue: 8500000, views: 1800000 },
    { month: "2월", revenue: 9200000, views: 1950000 },
    { month: "3월", revenue: 10800000, views: 2100000 },
    { month: "4월", revenue: 11500000, views: 2200000 },
    { month: "5월", revenue: 12800000, views: 2400000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-7 w-7 text-foreground" />
              <h1 className="text-2xl md:text-3xl font-bold">대시보드</h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              실시간 성과 분석과 상세한 인사이트를 확인하세요
            </p>
          </div>
        </div>
        
        {/* Mobile Optimized Controls */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
          {/* Real-time Status - Mobile Optimized */}
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg w-fit">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700 md:hidden">실시간</span>
            <span className="text-sm text-green-700 hidden md:inline">실시간 업데이트</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 md:flex-none relative">
                  <Filter className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">필터</span>
                  {hasActiveFilters() && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-gradient rounded-full"></div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64" onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuLabel>기간 설정</DropdownMenuLabel>
                {dateRangeOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value} 
                    onClick={() => updateFilters({ selectedDateRange: option.value })}
                    className="flex items-center justify-between"
                  >
                    {option.label}
                    {selectedDateRange === option.value && <Check className="h-4 w-4 text-brand-primary" />}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="flex items-center justify-between">
                  카테고리
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleAllCategories();
                    }}
                    className="h-auto p-1 text-xs text-brand-primary hover:text-brand-primary"
                  >
                    {selectedCategories.length === categoryOptions.length ? "전체 해제" : "전체 선택"}
                  </Button>
                </DropdownMenuLabel>
                {categoryOptions.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category.value}
                    checked={selectedCategories.includes(category.value)}
                    onCheckedChange={() => toggleCategory(category.value)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {category.label}
                  </DropdownMenuCheckboxItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="flex items-center justify-between">
                  성과 지표
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleAllMetrics();
                    }}
                    className="h-auto p-1 text-xs text-brand-primary hover:text-brand-primary"
                  >
                    {selectedMetrics.length === metricOptions.length ? "기본값" : "전체 선택"}
                  </Button>
                </DropdownMenuLabel>
                {metricOptions.map((metric) => (
                  <DropdownMenuCheckboxItem
                    key={metric.value}
                    checked={selectedMetrics.includes(metric.value)}
                    onCheckedChange={() => toggleMetric(metric.value)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {metric.label}
                  </DropdownMenuCheckboxItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={() => {
                    onFiltersChange({
                      selectedCategories: [],
                      selectedMetrics: ["revenue", "views"],
                      selectedDateRange: "month",
                      hasUserInteracted: false
                    });
                  }}
                  className="text-muted-foreground"
                >
                  필터 초기화
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Download className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">내보내기</span>
            </Button>
            <Button className="bg-brand-gradient hover:opacity-90 flex-1 md:flex-none" size="sm">
              <RefreshCw className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">새로고침</span>
            </Button>
          </div>
        </div>

        {/* 활성 필터 표시 */}
        {hasActiveFilters() && (
          <div className="flex flex-wrap gap-2">
            {selectedDateRange !== "month" && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {dateRangeOptions.find(opt => opt.value === selectedDateRange)?.label}
              </Badge>
            )}
            {selectedCategories.map((category) => (
              <Badge key={category} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {categoryOptions.find(opt => opt.value === category)?.label}
              </Badge>
            ))}
            {!isDefaultMetrics() && selectedMetrics.map((metric) => (
              <Badge key={metric} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {metricOptions.find(opt => opt.value === metric)?.label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* KPI Cards - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {kpiStats.map((stat, index) => (
          <Card 
            key={index} 
            className="relative overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer hover:scale-[1.02] hover:border-brand-primary/20"
            onClick={stat.onClick}
          >
            <div className={`absolute top-0 left-0 w-full h-1 ${stat.bgColor.replace('bg-', 'bg-').replace('-50', '-500')}`}></div>
            <CardHeader className="p-3 md:p-6 flex flex-row items-center justify-between space-y-0 flex-1">
              <div className="space-y-1 md:space-y-2 flex-1 min-w-0">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">{stat.title}</CardTitle>
                <div className="text-lg md:text-2xl font-bold truncate">{stat.value}</div>
              </div>
              <div className={`p-2 md:p-3 rounded-lg ${stat.bgColor} flex-shrink-0`}>
                <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-3 md:pb-4 px-3 md:px-6">
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-1 text-xs md:text-sm ${stat.color}`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span className="font-medium">{stat.change}</span>
                </div>
                <span className="text-xs text-muted-foreground hidden sm:inline">{stat.description}</span>
              </div>
            </CardContent>
            {/* 클릭 표시 아이콘 */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 h-[400px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-chart-1" />
              월별 수익 추이
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="space-y-4 flex-1">
              <div className="h-64 flex items-end justify-between gap-2 p-4 bg-muted/20 rounded-lg">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <div 
                      className="w-full bg-brand-gradient rounded-t-md min-h-[20px] flex items-end justify-center pb-2"
                      style={{ height: `${(data.revenue / 15000000) * 100}%` }}
                    >
                      <span className="text-xs text-white font-medium">
                        {(data.revenue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand-gradient rounded-full"></div>
                  <span>월별 수익</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="h-[400px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-chart-2" />
              인기 카테고리
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4 h-full">
              {topCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-green-600 font-medium">+{category.growth}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{category.sales}개 판매</span>
                    <span className="font-medium">{category.revenue}</span>
                  </div>
                  <Progress value={category.growth * 2} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Videos Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-chart-3" />
            최근 영상 성과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentVideos.map((video, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{video.title}</h4>
                    <Badge 
                      variant={video.status === 'trending' ? 'default' : video.status === 'stable' ? 'secondary' : 'outline'}
                      className={video.status === 'trending' ? 'bg-green-100 text-green-700' : ''}
                    >
                      {video.status === 'trending' && <TrendingUp className="h-3 w-3 mr-1" />}
                      {video.status === 'declining' && <TrendingDown className="h-3 w-3 mr-1" />}
                      {video.status === 'trending' ? '인기상승' : video.status === 'stable' ? '안정' : '하락'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.uploadDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <div className="font-medium text-green-600">{video.revenue}</div>
                    <div className="text-muted-foreground">CTR {video.ctr}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedVideo(video);
                      setVideoDetailModalOpen(true);
                    }}
                  >
                    자세히
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#ff4d6d]" />
            AI 추천 인사이트
            <Badge className="bg-brand-gradient text-white">NEW</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">📈 업로드 최적화</h4>
              <p className="text-sm text-blue-700">
                화요일 오후 7시 업로드 시 평균 조회수 23% 증가
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">🎯 타겟 추천</h4>
              <p className="text-sm text-green-700">
                25-34세 여성층에게 뷰티 제품 집중 마케팅 권장
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">💡 콘텐츠 제안</h4>
              <p className="text-sm text-purple-700">
                "겨울 스킨케어" 키워드 콘텐츠 수요 300% 급증 중
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 상세 모달들 */}
      <RevenueDetailModal 
        isOpen={revenueModalOpen}
        onClose={() => setRevenueModalOpen(false)}
      />
      
      <GrowthDetailModal 
        isOpen={growthModalOpen}
        onClose={() => setGrowthModalOpen(false)}
      />
      
      <ViewsDetailModal 
        isOpen={viewsModalOpen}
        onClose={() => setViewsModalOpen(false)}
      />
      
      <ConversionDetailModal 
        isOpen={conversionModalOpen}
        onClose={() => setConversionModalOpen(false)}
      />
      
      <VideoDetailModal 
        isOpen={videoDetailModalOpen}
        onClose={() => {
          setVideoDetailModalOpen(false);
          setSelectedVideo(null);
        }}
        videoData={selectedVideo}
      />
    </div>
  );
}