import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuCheckboxItem } from "./ui/dropdown-menu";
import { 
  Search,
  Filter,
  TrendingUp,
  Star,
  Heart,
  ShoppingCart,
  DollarSign,
  Package,
  Eye,
  ArrowUpRight,
  Sparkles,
  Target,
  BarChart3,
  Zap,
  Plus,
  Check
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  commission: string;
  popularity: number;
  growth: string;
  rating: number;
  reviews: number;
  estimatedRevenue: string;
  difficulty: "쉬움" | "보통" | "어려움";
  trend: "hot" | "rising" | "stable";
  tags: string[];
}

interface ProductsFilters {
  selectedPriceRange: string;
  selectedDifficulty: string[];
  selectedTrends: string[];
  selectedCommission: string;
  hasUserInteracted: boolean;
}

interface ProductsPageProps {
  filters: ProductsFilters;
  onFiltersChange: (filters: ProductsFilters) => void;
  onPageChange?: (page: string) => void;
}

export function ProductsPage({ filters, onFiltersChange, onPageChange }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { selectedPriceRange, selectedDifficulty, selectedTrends, selectedCommission, hasUserInteracted } = filters;

  // 필터 옵션 데이터
  const priceRangeOptions = [
    { value: "all", label: "전체 가격대" },
    { value: "low", label: "3만원 이하" },
    { value: "mid", label: "3-10만원" },
    { value: "high", label: "10만원 이상" }
  ];

  const difficultyOptions = [
    { value: "쉬움", label: "쉬움" },
    { value: "보통", label: "보통" },
    { value: "어려움", label: "어려움" }
  ];

  const trendOptions = [
    { value: "hot", label: "핫 트렌드" },
    { value: "rising", label: "상승 중" },
    { value: "stable", label: "안정" }
  ];

  const commissionOptions = [
    { value: "all", label: "전체 수수료" },
    { value: "low", label: "15% 이하" },
    { value: "mid", label: "15-20%" },
    { value: "high", label: "20% 이상" }
  ];

  // 필터 업데이트 함수
  const updateFilters = (updates: Partial<ProductsFilters>) => {
    onFiltersChange({ ...filters, hasUserInteracted: true, ...updates });
  };

  // 필터 토글 함수
  const toggleDifficulty = (difficulty: string) => {
    const newDifficulty = selectedDifficulty.includes(difficulty) 
      ? selectedDifficulty.filter(d => d !== difficulty)
      : [...selectedDifficulty, difficulty];
    updateFilters({ selectedDifficulty: newDifficulty });
  };

  const toggleTrend = (trend: string) => {
    const newTrends = selectedTrends.includes(trend) 
      ? selectedTrends.filter(t => t !== trend)
      : [...selectedTrends, trend];
    updateFilters({ selectedTrends: newTrends });
  };

  const toggleAllDifficulty = () => {
    const newDifficulty = selectedDifficulty.length === difficultyOptions.length 
      ? [] 
      : difficultyOptions.map(diff => diff.value);
    updateFilters({ selectedDifficulty: newDifficulty });
  };

  const toggleAllTrends = () => {
    const newTrends = selectedTrends.length === trendOptions.length 
      ? [] 
      : trendOptions.map(trend => trend.value);
    updateFilters({ selectedTrends: newTrends });
  };

  // 활성 필터 개수 계산
  const getActiveFiltersCount = () => {
    if (!hasUserInteracted) return 0;
    let count = 0;
    if (selectedPriceRange !== "all") count++;
    if (selectedDifficulty.length > 0) count++;
    if (selectedTrends.length > 0) count++;
    if (selectedCommission !== "all") count++;
    return count;
  };

  const categories = [
    { id: "all", name: "전체", count: 1247 },
    { id: "beauty", name: "뷰티/화장품", count: 342 },
    { id: "fashion", name: "패션/의류", count: 289 },
    { id: "lifestyle", name: "생활용품", count: 234 },
    { id: "electronics", name: "전자기기", count: 198 },
    { id: "health", name: "건강/운동", count: 156 },
    { id: "food", name: "식품/건강식품", count: 128 }
  ];

  const trendingProducts: Product[] = [
    {
      id: "1",
      name: "겨울 필수 보습크림 세트",
      category: "뷰티/화장품",
      price: "₩45,000",
      commission: "15%",
      popularity: 95,
      growth: "+234%",
      rating: 4.8,
      reviews: 1247,
      estimatedRevenue: "₩2,340,000",
      difficulty: "쉬움",
      trend: "hot",
      tags: ["겨울템", "스킨케어", "세트상품"]
    },
    {
      id: "2",
      name: "무선 블루투스 이어폰",
      category: "전자기기",
      price: "₩89,000",
      commission: "12%",
      popularity: 88,
      growth: "+189%",
      rating: 4.6,
      reviews: 892,
      estimatedRevenue: "₩1,890,000",
      difficulty: "보통",
      trend: "rising",
      tags: ["테크", "음악", "무선"]
    },
    {
      id: "3",
      name: "홈트레이닝 요가매트",
      category: "건강/운동",
      price: "₩32,000",
      commission: "18%",
      popularity: 82,
      growth: "+156%",
      rating: 4.7,
      reviews: 634,
      estimatedRevenue: "₩1,560,000",
      difficulty: "쉬움",
      trend: "rising",
      tags: ["홈트", "요가", "운동용품"]
    },
    {
      id: "4",
      name: "프리미엄 아로마 캔들",
      category: "생활용품",
      price: "₩28,000",
      commission: "22%",
      popularity: 76,
      growth: "+98%",
      rating: 4.5,
      reviews: 421,
      estimatedRevenue: "₩980,000",
      difficulty: "보통",
      trend: "stable",
      tags: ["향초", "인테리어", "힐링"]
    },
    {
      id: "5",
      name: "겨울 패딩 자켓",
      category: "패션/의류",
      price: "₩129,000",
      commission: "10%",
      popularity: 91,
      growth: "+267%",
      rating: 4.9,
      reviews: 1089,
      estimatedRevenue: "₩2,670,000",
      difficulty: "어려움",
      trend: "hot",
      tags: ["겨울패션", "아우터", "보온"]
    },
    {
      id: "6",
      name: "콜라겐 뷰티 드링크",
      category: "식품/건강식품",
      price: "₹67,000",
      commission: "25%",
      popularity: 79,
      growth: "+178%",
      rating: 4.4,
      reviews: 567,
      estimatedRevenue: "₩1,780,000",
      difficulty: "쉬움",
      trend: "rising",
      tags: ["뷰티", "건강", "콜라겐"]
    }
  ];

  const aiRecommendations = [
    {
      title: "🔥 지금 가장 핫한 트렌드",
      description: "겨울 스킨케어 제품이 300% 급상승 중",
      action: "트렌드 상품 보기",
      color: "text-red-600",
      bgColor: "bg-red-50",
      page: "trends"
    },
    {
      title: "💰 고수익 기회 발견",
      description: "전자기기 카테고리에서 높은 수익률 상품 발견",
      action: "수익 분석하기",
      color: "text-green-600",
      bgColor: "bg-green-50",
      page: "calculator"
    },
    {
      title: "🎯 맞춤 추천",
      description: "당신의 구독자층에 가장 적합한 상품들",
      action: "추천 상품 보기",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      page: "ai-analyzer"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "hot": return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>;
      case "rising": return <TrendingUp className="h-3 w-3 text-green-600" />;
      default: return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움": return "bg-green-100 text-green-700";
      case "보통": return "bg-yellow-100 text-yellow-700";
      case "어려움": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Package className="h-7 w-7 text-foreground" />
              <h1 className="text-2xl md:text-3xl font-bold">상품 탐색</h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              AI가 추천하는 수익성 높은 트렌딩 상품을 발견하세요
            </p>
          </div>
        </div>
        
        {/* Mobile Optimized Search and Actions */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="상품, 카테고리 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 relative">
                  <Filter className="h-4 w-4 mr-2" />
                  필터
                  {getActiveFiltersCount() > 0 && (
                    <Badge className="ml-2 bg-brand-gradient text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64" onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuLabel>가격대</DropdownMenuLabel>
                {priceRangeOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value} 
                    onClick={() => updateFilters({ selectedPriceRange: option.value })}
                    className="flex items-center justify-between"
                  >
                    {option.label}
                    {selectedPriceRange === option.value && <Check className="h-4 w-4 text-brand-primary" />}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel>수수료율</DropdownMenuLabel>
                {commissionOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value} 
                    onClick={() => updateFilters({ selectedCommission: option.value })}
                    className="flex items-center justify-between"
                  >
                    {option.label}
                    {selectedCommission === option.value && <Check className="h-4 w-4 text-brand-primary" />}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="flex items-center justify-between">
                  제작 난이도
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleAllDifficulty();
                    }}
                    className="h-auto p-1 text-xs text-brand-primary hover:text-brand-primary"
                  >
                    {selectedDifficulty.length === difficultyOptions.length ? "전체 해제" : "전체 선택"}
                  </Button>
                </DropdownMenuLabel>
                {difficultyOptions.map((difficulty) => (
                  <DropdownMenuCheckboxItem
                    key={difficulty.value}
                    checked={selectedDifficulty.includes(difficulty.value)}
                    onCheckedChange={() => toggleDifficulty(difficulty.value)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {difficulty.label}
                  </DropdownMenuCheckboxItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="flex items-center justify-between">
                  트렌드 상태
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleAllTrends();
                    }}
                    className="h-auto p-1 text-xs text-brand-primary hover:text-brand-primary"
                  >
                    {selectedTrends.length === trendOptions.length ? "전체 해제" : "전체 선택"}
                  </Button>
                </DropdownMenuLabel>
                {trendOptions.map((trend) => (
                  <DropdownMenuCheckboxItem
                    key={trend.value}
                    checked={selectedTrends.includes(trend.value)}
                    onCheckedChange={() => toggleTrend(trend.value)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {trend.label}
                  </DropdownMenuCheckboxItem>
                ))}
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={() => {
                    onFiltersChange({
                      selectedPriceRange: "all",
                      selectedDifficulty: [],
                      selectedTrends: [],
                      selectedCommission: "all",
                      hasUserInteracted: false
                    });
                  }}
                  className="text-muted-foreground"
                >
                  필터 초기화
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              className="bg-brand-gradient hover:opacity-90 flex-1" 
              size="sm"
              onClick={() => onPageChange?.("workflow")}
            >
              <Plus className="h-4 w-4 mr-2" />
              상품 등록
            </Button>
          </div>
        </div>

        {/* 활성 필터 표시 */}
        {hasUserInteracted && getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedPriceRange !== "all" && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {priceRangeOptions.find(opt => opt.value === selectedPriceRange)?.label}
              </Badge>
            )}
            {selectedCommission !== "all" && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {commissionOptions.find(opt => opt.value === selectedCommission)?.label}
              </Badge>
            )}
            {selectedDifficulty.map((difficulty) => (
              <Badge key={difficulty} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                {difficulty}
              </Badge>
            ))}
            {selectedTrends.map((trend) => (
              <Badge key={trend} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {trendOptions.find(opt => opt.value === trend)?.label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {aiRecommendations.map((rec, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-[#ff8a3d]/20 flex flex-col">
            <CardContent className="p-4 md:p-6 flex flex-col h-full">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${rec.bgColor} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
                <Sparkles className={`h-5 w-5 md:h-6 md:w-6 ${rec.color}`} />
              </div>
              <h3 className="font-semibold mb-2 leading-tight text-sm md:text-base">{rec.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed flex-1">
                {rec.description}
              </p>
              <Button 
                size="sm" 
                className="w-full bg-brand-gradient hover:opacity-90 transition-all duration-200 mt-auto text-xs md:text-sm"
                onClick={() => onPageChange?.(rec.page)}
              >
                {rec.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Target className="h-4 w-4 md:h-5 md:w-5 text-chart-1" />
            카테고리별 탐색
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${selectedCategory === category.id ? "bg-brand-gradient hover:opacity-90" : ""} text-xs md:text-sm flex-col md:flex-row h-auto md:h-auto py-3 md:py-2`}
              >
                <span className="font-medium">{category.name}</span>
                <Badge variant="secondary" className="mt-1 md:mt-0 md:ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#ff4d6d]" />
            트렌딩 상품
            <Badge className="bg-brand-gradient text-white">실시간</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {trendingProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-[#ff8a3d]/20 flex flex-col">
                <CardHeader className="pb-3 flex-shrink-0 p-4 md:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="font-medium leading-tight line-clamp-2 text-sm md:text-base">{product.name}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {getTrendIcon(product.trend)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4 flex-1 flex flex-col p-4 md:p-6 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{product.price}</span>
                        <Badge className="bg-green-100 text-green-700">
                          {product.commission}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                        <span>({product.reviews})</span>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(product.difficulty)}>
                      {product.difficulty}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">인기도</span>
                      <span className="font-medium">{product.popularity}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-gradient transition-all duration-300"
                        style={{ width: `${product.popularity}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <ArrowUpRight className="h-3 w-3" />
                      <span className="font-medium">{product.growth}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">예상 수익</div>
                    <div className="font-semibold">{product.estimatedRevenue}</div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs md:text-sm"
                      onClick={() => onPageChange?.("ai-analyzer")}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      분석
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-brand-gradient hover:opacity-90 text-xs md:text-sm"
                      onClick={() => onPageChange?.("workflow")}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      선택
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}