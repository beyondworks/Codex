import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ContentDetailModal } from "./ContentDetailModal";
import { CreatorCollaborationModal } from "./CreatorCollaborationModal";
import { ProductContentCreationModal } from "./ProductContentCreationModal";
import { CategoryAnalysisModal } from "./CategoryAnalysisModal";
import { TrendPagination } from "./TrendPagination";
import { 
  TrendingUp, 
  Search,
  RefreshCw,
  Eye,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Zap,
  Users,
  Heart,
  MessageCircle,
  Share,
  Bell,
  Activity,
  Clock,
  Video,
  Star,
  Percent,
  UserPlus,
  Handshake,
  PlusCircle,
  Bookmark,
  Calendar,
  CheckCircle,
  Info,
  ArrowUpRight,
  Brain,
  Lightbulb,
  Target,
  TrendingDown,
  MousePointer,
  ShoppingBag,
  Timer,
  PlayCircle,
  AlertTriangle,
  Award,
  Flame,
  ChevronUp,
  ChevronDown,
  Sparkles,
  TrendingUpIcon,
  Globe,
  Filter,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

// 데이터와 유틸리티 임포트
import {
  topSellingContent,
  topCreators,
  realtimeProducts,
  categoryGrowth,
  hourlyEngagement,
  generateAdditionalContent,
  generateAdditionalCreators,
  generateAdditionalProducts,
  generateAdditionalCategories
} from "./data/trendAnalysisData";

import {
  formatNumber,
  formatPercentage,
  formatGrowth,
  getPaginatedItems,
  getTotalPages,
  calculateItemsPerPage
} from "../utils/trendAnalysisUtils";

interface TrendAnalysisPageProps {
  onPageChange?: (page: string) => void;
  onContentAnalysis?: (product: any) => void;
}

export function TrendAnalysisPage({ onPageChange, onContentAnalysis }: TrendAnalysisPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 모달 상태
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [isCreatorCollaborationModalOpen, setIsCreatorCollaborationModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductContentModalOpen, setIsProductContentModalOpen] = useState(false);
  const [selectedCategoryForAnalysis, setSelectedCategoryForAnalysis] = useState<any>(null);
  const [isCategoryAnalysisModalOpen, setIsCategoryAnalysisModalOpen] = useState(false);

  // 상태 관리 (팔로우, 북마크, 관심 등록)
  const [followedCreators, setFollowedCreators] = useState<Set<number>>(new Set());
  const [bookmarkedProducts, setBookmarkedProducts] = useState<Set<number>>(new Set());
  const [watchedCategories, setWatchedCategories] = useState<Set<string>>(new Set());

  // 페이지네이션 상태
  const [contentPage, setContentPage] = useState(0);
  const [creatorPage, setCreatorPage] = useState(0);
  const [productPage, setProductPage] = useState(0);
  const [categoryPage, setCategoryPage] = useState(0);

  // 화면 크기에 따른 동적 페이지 크기 계산
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // 인사이트 데이터
  const marketTrends = [
    { category: "뷰티", change: 23.5, volume: "8.2M", trend: "up", urgent: true },
    { category: "패션", change: -5.2, volume: "6.1M", trend: "down", urgent: false },
    { category: "테크", change: 45.8, volume: "4.9M", trend: "up", urgent: true },
    { category: "홈&리빙", change: 12.3, volume: "3.7M", trend: "up", urgent: false },
    { category: "푸드", change: 8.7, volume: "5.8M", trend: "up", urgent: false }
  ];

  const keyMetrics = [
    {
      title: "평균 태그 클릭률",
      value: "12.8%",
      change: "+3.2%",
      trend: "up",
      icon: <MousePointer className="h-4 w-4" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "구매 전환율", 
      value: "4.2%",
      change: "+0.8%",
      trend: "up",
      icon: <ShoppingBag className="h-4 w-4" />,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "평균 영상 조회수",
      value: "285K",
      change: "+18.5%",
      trend: "up", 
      icon: <Eye className="h-4 w-4" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "크리에이터당 수익",
      value: "₩1.2M",
      change: "+25.3%",
      trend: "up",
      icon: <DollarSign className="h-4 w-4" />,
      color: "text-orange-600", 
      bgColor: "bg-orange-50"
    },
    {
      title: "신규 제품 등록",
      value: "847개",
      change: "+12.4%",
      trend: "up",
      icon: <PlusCircle className="h-4 w-4" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      title: "활성 크리에이터",
      value: "2,156명", 
      change: "+8.9%",
      trend: "up",
      icon: <Users className="h-4 w-4" />,
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    }
  ];

  const aiRecommendations = [
    {
      type: "urgent",
      title: "즉시 액션 필요",
      subtitle: "테크 카테고리 급상승 중",
      description: "스마트워치와 무선이어폰 관련 콘텐츠가 45% 성장, 지금 진입 시 높은 수익 예상",
      action: "콘텐츠 제작 시작",
      priority: "high",
      timeframe: "24시간 내"
    },
    {
      type: "opportunity", 
      title: "시장 기회 발견",
      subtitle: "뷰티 × 테크 융합 트렌드",
      description: "뷰티테크 제품들이 새로운 틈새시장 형성 중, 경쟁이 낮은 지금이 진입 적기",
      action: "시장 조사 진행",
      priority: "medium",
      timeframe: "1주일 내"
    }
  ];

  const contentOptimization = [
    {
      metric: "썸네일 최적화",
      current: 65,
      target: 85,
      improvement: "+20%",
      tip: "밝은 배경과 제품 클로즈업 사용"
    },
    {
      metric: "태그 배치 타이밍", 
      current: 72,
      target: 90,
      improvement: "+18%",
      tip: "영상 시작 후 30초 내 첫 태그 배치"
    },
    {
      metric: "제목 키워드 최적화",
      current: 58,
      target: 80,
      improvement: "+22%", 
      tip: "'실제 후기', '솔직 리뷰' 키워드 활용"
    },
    {
      metric: "업로드 타이밍",
      current: 68,
      target: 85,
      improvement: "+17%",
      tip: "화요일 오후 7-9시가 최고 성과"
    }
  ];

  const competitorInsights = [
    { name: "뷰티구루A", subscribers: "1.2M", growth: 15.3, avgViews: "450K", strength: "제품 다양성" },
    { name: "테크리뷰어B", subscribers: "890K", growth: 22.1, avgViews: "380K", strength: "전문성" }, 
    { name: "라이프스타일C", subscribers: "750K", growth: 8.7, avgViews: "320K", strength: "신뢰도" }
  ];

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(calculateItemsPerPage());
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // 전체 데이터 (기본 데이터 + 동적 생성 데이터)
  const allContent = [...topSellingContent, ...generateAdditionalContent(12)];
  const allCreators = [...topCreators, ...generateAdditionalCreators(10)];
  const allProducts = [...realtimeProducts, ...generateAdditionalProducts(10)];
  const allCategories = [...categoryGrowth, ...generateAdditionalCategories(8)];

  // 콘텐츠 상세 분석 보기 핸들러
  const handleContentAnalysis = (content: any) => {
    console.log('Content analysis clicked:', content);
    setSelectedContent(content);
    setIsContentModalOpen(true);
  };

  // 크리에이터 카드 클릭 핸들러
  const handleCreatorCardClick = (creator: any) => {
    console.log('Creator card clicked:', creator);
    setSelectedCreator(creator);
    setIsCreatorCollaborationModalOpen(true);
  };

  // 상품 카드 클릭 핸들러
  const handleProductCardClick = (product: any) => {
    console.log('Product card clicked:', product);
    setSelectedProduct(product);
    setIsProductContentModalOpen(true);
  };

  // 카테고리 카드 클릭 핸들러
  const handleCategoryCardClick = (category: any) => {
    console.log('Category card clicked:', category);
    setSelectedCategoryForAnalysis(category);
    setIsCategoryAnalysisModalOpen(true);
  };

  // CTA 핸들러들
  const handleCreatorContact = (creator: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCreator(creator);
    setIsCreatorCollaborationModalOpen(true);
  };

  const handleCreatorFollow = (creator: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFollowed = followedCreators.has(creator.id);
    const newFollowedCreators = new Set(followedCreators);
    
    if (isFollowed) {
      newFollowedCreators.delete(creator.id);
      toast.success(`${creator.name} 팔로우를 취소했습니다`);
    } else {
      newFollowedCreators.add(creator.id);
      toast.success(`${creator.name}를 팔로우했습니다`);
    }
    
    setFollowedCreators(newFollowedCreators);
  };

  const handleProductBookmark = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const isBookmarked = bookmarkedProducts.has(product.id);
    const newBookmarkedProducts = new Set(bookmarkedProducts);
    
    if (isBookmarked) {
      newBookmarkedProducts.delete(product.id);
      toast.success("북마크에서 제거했습니다");
    } else {
      newBookmarkedProducts.add(product.id);
      toast.success("북마크에 추가했습니다");
    }
    
    setBookmarkedProducts(newBookmarkedProducts);
  };

  const handleProductCreateContent = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setIsProductContentModalOpen(true);
  };

  const handleStartContentCreation = (product: any) => {
    if (onContentAnalysis) {
      onContentAnalysis(product);
    }
  };

  const handleCategoryAnalyze = (category: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategoryForAnalysis(category);
    setIsCategoryAnalysisModalOpen(true);
  };

  const handleCategoryWatch = (category: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const isWatched = watchedCategories.has(category.name);
    const newWatchedCategories = new Set(watchedCategories);
    
    if (isWatched) {
      newWatchedCategories.delete(category.name);
      toast.success(`${category.name} 관심 등록을 취소했습니다`);
    } else {
      newWatchedCategories.add(category.name);
      toast.success(`${category.name}를 관심 카테고리로 등록했습니다`);
    }
    
    setWatchedCategories(newWatchedCategories);
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(allProducts.map(p => p.category))];

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-7 w-7 text-foreground" />
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">
                  트렌드 분석
                </h1>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
                실시간 상품 트렌드와 시장 분석으로 최적의 콘텐츠 기회를 발견하세요
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700">실시간</span>
              </div>
              <Button variant="outline" size="sm" className="px-2 md:px-3 text-xs md:text-sm">
                <RefreshCw className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline ml-1 md:ml-2">새로고침</span>
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="상품명 또는 카테고리 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm h-9 md:h-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category, index) => (
                <Button
                  key={`filter-category-${category}-${index}`}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap text-xs flex-shrink-0 h-7 md:h-8 px-2 md:px-3 ${
                    selectedCategory === category ? "bg-[#ff4d6d] text-white border-[#ff4d6d] hover:bg-[#ff4d6d]/90" : "hover:bg-accent"
                  }`}
                >
                  {category === "all" ? "전체" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          <Card className="border border-border/50">
            <CardContent className="p-2 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">급상승 콘텐츠</p>
                  <p className="text-sm md:text-lg font-bold">89개</p>
                  <p className="text-xs text-green-600">+31.2%</p>
                </div>
                <div className="p-1 md:p-2 bg-red-50 rounded-lg">
                  <Video className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border/50">
            <CardContent className="p-2 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">평균 전환율</p>
                  <p className="text-sm md:text-lg font-bold">7.2%</p>
                  <p className="text-xs text-green-600">vs 지난주</p>
                </div>
                <div className="p-1 md:p-2 bg-green-50 rounded-lg">
                  <BarChart3 className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border/50">
            <CardContent className="p-2 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">총 조회수</p>
                  <p className="text-sm md:text-lg font-bold">18.7M</p>
                  <p className="text-xs text-blue-600">+24.3%</p>
                </div>
                <div className="p-1 md:p-2 bg-blue-50 rounded-lg">
                  <Eye className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border/50">
            <CardContent className="p-2 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">총 수익</p>
                  <p className="text-sm md:text-lg font-bold">₩1.4B</p>
                  <p className="text-xs text-purple-600">+28.9%</p>
                </div>
                <div className="p-1 md:p-2 bg-purple-50 rounded-lg">
                  <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="content" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-auto bg-muted/20 p-1 rounded-lg">
            <TabsTrigger 
              value="content" 
              className="
                text-xs sm:text-sm px-2 py-3 
                data-[state=active]:bg-[#ff4d6d] data-[state=active]:text-white data-[state=active]:shadow-sm
                hover:bg-accent transition-all duration-200
                font-medium
              "
            >
              콘텐츠
            </TabsTrigger>
            <TabsTrigger 
              value="creators" 
              className="
                text-xs sm:text-sm px-2 py-3
                data-[state=active]:bg-[#ff4d6d] data-[state=active]:text-white data-[state=active]:shadow-sm
                hover:bg-accent transition-all duration-200
                font-medium
              "
            >
              크리에이터
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="
                text-xs sm:text-sm px-2 py-3
                data-[state=active]:bg-[#ff4d6d] data-[state=active]:text-white data-[state=active]:shadow-sm
                hover:bg-accent transition-all duration-200
                font-medium
              "
            >
              실시간 상품
            </TabsTrigger>
            <TabsTrigger 
              value="categories" 
              className="
                text-xs sm:text-sm px-2 py-3
                data-[state=active]:bg-[#ff4d6d] data-[state=active]:text-white data-[state=active]:shadow-sm
                hover:bg-accent transition-all duration-200
                font-medium
              "
            >
              카테고리
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="
                text-xs sm:text-sm px-2 py-3
                data-[state=active]:bg-[#ff4d6d] data-[state=active]:text-white data-[state=active]:shadow-sm
                hover:bg-accent transition-all duration-200
                font-medium
              "
            >
              인사이트
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
              {getPaginatedItems(allContent, contentPage, itemsPerPage).map((content, index) => (
                <Card 
                  key={`content-${content.id}-${contentPage}-${index}`}
                  className="bg-white border border-border/50 hover:shadow-md hover:border-[#ff8a3d]/50 transition-all duration-200 cursor-pointer hover:scale-[1.02] flex flex-col h-full"
                  onClick={() => handleContentAnalysis(content)}
                >
                  <CardHeader className="p-3 pb-2 flex-shrink-0">
                    <div className="space-y-2">
                      <div className="relative overflow-hidden rounded-lg">
                        <div className="w-full aspect-video">
                          <ImageWithFallback
                            src={content.thumbnail}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{content.duration}</span>
                        </div>
                        
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-green-500 text-white text-xs border-0">
                            급상승
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <CardTitle className="text-sm leading-tight line-clamp-2">
                          {content.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{content.creator}</span>
                          <span>•</span>
                          <span>{content.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-3 pt-0 space-y-3 flex-grow flex flex-col">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <Eye className="h-3 w-3" />
                          <span>조회수</span>
                        </div>
                        <div className="font-bold text-sm">{content.views}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <ShoppingCart className="h-3 w-3" />
                          <span>판매량</span>
                        </div>
                        <div className="font-bold text-sm">{content.sales}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <DollarSign className="h-3 w-3" />
                          <span>수익</span>
                        </div>
                        <div className="font-bold text-green-600">{content.revenue}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <Percent className="h-3 w-3" />
                          <span>전환율</span>
                        </div>
                        <div className="font-bold text-blue-600">{formatPercentage(content.conversionRate)}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">성장률</span>
                        <span className="font-semibold text-green-600">{formatGrowth(content.growth)}</span>
                      </div>
                      <Progress value={Math.min(content.growth, 100)} className="h-2" />
                    </div>

                    <div className="text-xs text-muted-foreground leading-relaxed min-h-[2.4rem] line-clamp-2">
                      {content.summary}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 text-xs h-8 bg-[#FF4D6D] text-white border-[#FF4D6D] hover:bg-[#FF4D6D]/90 hover:border-[#FF4D6D]/90 hover:text-white hover:shadow-lg transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContentAnalysis(content);
                        }}
                      >
                        <BarChart3 className="h-3 w-3 mr-1" />
                        상세 분석 보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <TrendPagination 
              currentPage={contentPage} 
              totalPages={getTotalPages(allContent, itemsPerPage)} 
              onPageChange={setContentPage} 
            />
          </TabsContent>

          {/* 크리에이터 탭 */}
          <TabsContent value="creators" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
              {getPaginatedItems(allCreators, creatorPage, itemsPerPage).map((creator, index) => (
                <Card 
                  key={`creator-${creator.id}-${creatorPage}-${index}`}
                  className="border border-border/50 hover:shadow-md hover:border-[#ff8a3d]/50 transition-all duration-200 cursor-pointer hover:scale-[1.02] flex flex-col h-full"
                  onClick={() => handleCreatorCardClick(creator)}
                >
                  <CardHeader className="p-4 pb-3 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4d6d] to-[#ff8a3d] flex items-center justify-center text-white text-xl">
                        {creator.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm">{creator.name}</h3>
                        <p className="text-xs text-muted-foreground">{creator.category}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {formatGrowth(creator.growth)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-0 space-y-3 flex-grow flex flex-col">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">구독자</p>
                        <p className="font-bold">{creator.subscribers}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">월 수익</p>
                        <p className="font-bold text-green-600">{creator.revenue}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">성장률</span>
                        <span className="font-semibold text-green-600">{formatGrowth(creator.growth)}</span>
                      </div>
                      <Progress value={creator.growth * 2} className="h-2" />
                    </div>
                    
                    <div className="text-xs text-muted-foreground leading-relaxed min-h-[2.4rem] line-clamp-2">
                      {creator.description}
                    </div>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#ff4d6d] hover:bg-[#ff4d6d]/90 text-white text-xs h-8"
                        onClick={(e) => handleCreatorContact(creator, e)}
                      >
                        <Handshake className="h-3 w-3 mr-1" />
                        협업 문의
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={`text-xs h-8 px-3 transition-all ${
                          followedCreators.has(creator.id) 
                            ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                            : "hover:bg-accent"
                        }`}
                        onClick={(e) => handleCreatorFollow(creator, e)}
                      >
                        <UserPlus className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <TrendPagination 
              currentPage={creatorPage} 
              totalPages={getTotalPages(allCreators, itemsPerPage)} 
              onPageChange={setCreatorPage} 
            />
          </TabsContent>

          {/* 실시간 상품 탭 */}
          <TabsContent value="products" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
              {getPaginatedItems(filteredProducts, productPage, itemsPerPage).map((product, index) => (
                <Card 
                  key={`product-${product.id}-${productPage}-${index}`}
                  className="border border-border/50 hover:shadow-md hover:border-[#ff8a3d]/50 transition-all duration-200 cursor-pointer hover:scale-[1.02] flex flex-col h-full"
                  onClick={() => handleProductCardClick(product)}
                >
                  <CardHeader className="p-4 pb-3 flex-shrink-0">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <div className="w-full aspect-video">
                        <ImageWithFallback
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className={`text-xs ${
                          product.trend === "up" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
                        }`}>
                          <span className="mr-1">{product.hotness}</span>
                          {product.trend === "up" ? "급상승" : "하락"}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {product.timeFrame}
                      </div>
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm leading-tight">{product.title}</h3>
                        <p className="text-xs text-muted-foreground">{product.brand} • {product.category}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-0 space-y-3 flex-grow flex flex-col">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">조회수</p>
                        <p className="font-bold">{product.views}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">월 예상수익</p>
                        <p className="font-bold text-green-600">{product.revenue}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{product.price}</span>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="font-bold">{formatNumber(product.rating, 1)}/10</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{product.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{product.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="h-3 w-3" />
                        <span>{product.shares}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">트렌드 점수</span>
                        <span className="font-semibold text-green-600">{product.trendScore}/100</span>
                      </div>
                      <Progress value={product.trendScore} className="h-2" />
                    </div>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#ff4d6d] hover:bg-[#ff4d6d]/90 text-white text-xs h-8"
                        onClick={(e) => handleProductCreateContent(product, e)}
                      >
                        <PlusCircle className="h-3 w-3 mr-1" />
                        콘텐츠 제작
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={`text-xs h-8 px-3 transition-all ${
                          bookmarkedProducts.has(product.id) 
                            ? "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100" 
                            : "hover:bg-accent"
                        }`}
                        onClick={(e) => handleProductBookmark(product, e)}
                      >
                        <Bookmark className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <TrendPagination 
              currentPage={productPage} 
              totalPages={getTotalPages(filteredProducts, itemsPerPage)} 
              onPageChange={setProductPage} 
            />
          </TabsContent>

          {/* 카테고리 탭 */}
          <TabsContent value="categories" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
              {getPaginatedItems(allCategories, categoryPage, itemsPerPage).map((category, index) => (
                <Card 
                  key={`category-${category.id}-${categoryPage}-${index}`}
                  className="border border-border/50 hover:shadow-md hover:border-[#ff8a3d]/50 transition-all duration-200 cursor-pointer hover:scale-[1.02] flex flex-col h-full"
                  onClick={() => handleCategoryCardClick(category)}
                >
                  <CardHeader className="p-4 pb-3 flex-shrink-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{category.icon}</div>
                        <div>
                          <h3 className="font-bold text-sm">{category.name}</h3>
                          <p className="text-xs text-muted-foreground">{category.itemCount}개 상품</p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${
                        category.growth > 0 
                          ? "bg-green-100 text-green-700 border-green-200" 
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}>
                        {category.growth > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {Math.abs(category.growth)}%
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-0 space-y-3 flex-grow flex flex-col">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">총 조회수</p>
                        <p className="font-bold">{category.views}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">평균 수익</p>
                        <p className="font-bold text-green-600">{category.avgRevenue}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">성장률</span>
                        <span className={`font-semibold ${category.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatGrowth(category.growth)}
                        </span>
                      </div>
                      <Progress 
                        value={Math.abs(category.growth)} 
                        className={`h-2 ${category.growth < 0 ? '[&>div]:bg-red-500' : ''}`} 
                      />
                    </div>
                    
                    <div className="text-xs text-muted-foreground leading-relaxed min-h-[2.4rem] line-clamp-2">
                      {category.description}
                    </div>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#ff4d6d] hover:bg-[#ff4d6d]/90 text-white text-xs h-8"
                        onClick={(e) => handleCategoryAnalyze(category, e)}
                      >
                        <BarChart3 className="h-3 w-3 mr-1" />
                        카테고리 분석
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={`text-xs h-8 px-3 transition-all ${
                          watchedCategories.has(category.name) 
                            ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" 
                            : "hover:bg-accent"
                        }`}
                        onClick={(e) => handleCategoryWatch(category, e)}
                      >
                        <Bell className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <TrendPagination 
              currentPage={categoryPage} 
              totalPages={getTotalPages(allCategories, itemsPerPage)} 
              onPageChange={setCategoryPage} 
            />
          </TabsContent>

          {/* 인사이트 탭 - 완전히 새로운 구성 */}
          <TabsContent value="insights" className="space-y-6">
            {/* 1. 실시간 시장 동향 - 풀 너비 */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#ff4d6d]" />
                  실시간 시장 동향
                  <Badge className="bg-green-100 text-green-700 ml-2">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`text-2xl ${trend.urgent ? 'animate-pulse' : ''}`}>
                            {trend.trend === "up" ? "🔥" : "📉"}
                          </div>
                          {trend.urgent && <Flame className="h-3 w-3 text-red-500" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{trend.category}</h4>
                            {trend.urgent && <Badge className="bg-red-100 text-red-700 text-xs">급상승</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">총 거래량: {trend.volume}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className={`font-bold text-lg ${
                            trend.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {trend.change > 0 ? '+' : ''}{trend.change}%
                          </div>
                          <div className="text-xs text-muted-foreground">vs 지난주</div>
                        </div>
                        {trend.change > 0 ? (
                          <ChevronUp className="h-5 w-5 text-green-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 2. 핵심 성과 지표 - 3열 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                        <div className={metric.color}>{metric.icon}</div>
                      </div>
                      <Badge className={`${
                        metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {metric.change}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">{metric.title}</h4>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 3. AI 추천 전략 - 2열 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiRecommendations.map((rec, index) => (
                <Card key={index} className={`border-l-4 ${
                  rec.priority === 'high' ? 'border-red-500' : 'border-blue-500'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        rec.priority === 'high' ? 'bg-red-50' : 'bg-blue-50'
                      }`}>
                        {rec.priority === 'high' ? (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        ) : (
                          <Lightbulb className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{rec.title}</h4>
                          <Badge className={`text-xs ${
                            rec.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {rec.timeframe}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">{rec.subtitle}</p>
                        <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                        <Button 
                          size="sm" 
                          className="bg-[#ff4d6d] hover:bg-[#ff4d6d]/90"
                          onClick={() => {
                            if (rec.action === "콘텐츠 제작 시작") {
                              onPageChange?.("ai-analyzer");
                              toast.success("AI 콘텐츠 분석 페이지로 이동합니다");
                            } else if (rec.action === "시장 조사 진행") {
                              onPageChange?.("products");
                              toast.success("상품 탐색 페이지로 이동합니다");
                            }
                          }}
                        >
                          <ArrowRight className="h-4 w-4 mr-2" />
                          {rec.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 4. 시장 기회 발견 - 풀 너비 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#ff4d6d]" />
                  경쟁자 분석 & 벤치마킹
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitorInsights.map((competitor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold">
                          {competitor.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{competitor.name}</h4>
                          <p className="text-sm text-muted-foreground">구독자 {competitor.subscribers}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="text-muted-foreground">성장률</div>
                          <div className="font-bold text-green-600">+{competitor.growth}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">평균 조회수</div>
                          <div className="font-bold">{competitor.avgViews}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground">강점</div>
                          <div className="font-bold text-blue-600">{competitor.strength}</div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            onPageChange?.("dashboard");
                            toast.success("대시보드에서 상세 분석을 확인하세요");
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          분석하기
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 5. 콘텐츠 최적화 가이드 - 하단 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#ff4d6d]" />
                  콘텐츠 최��화 가이드
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contentOptimization.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{item.metric}</h4>
                          <p className="text-sm text-green-600 font-medium">{item.improvement} 개선 가능</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700">{item.current}%</Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>현재</span>
                          <span>목표 {item.target}%</span>
                        </div>
                        <Progress value={item.current} className="h-2" />
                      </div>
                      <div className="p-2 bg-white rounded border-l-4 border-[#ff4d6d]">
                        <p className="text-xs text-muted-foreground">💡 {item.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 모달 컴포넌트들 */}
      <ContentDetailModal
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
        contentData={selectedContent}
      />

      <CreatorCollaborationModal
        isOpen={isCreatorCollaborationModalOpen}
        onClose={() => setIsCreatorCollaborationModalOpen(false)}
        creator={selectedCreator}
      />

      <ProductContentCreationModal
        isOpen={isProductContentModalOpen}
        onClose={() => setIsProductContentModalOpen(false)}
        onStartCreation={handleStartContentCreation}
        product={selectedProduct}
      />

      <CategoryAnalysisModal
        isOpen={isCategoryAnalysisModalOpen}
        onClose={() => setIsCategoryAnalysisModalOpen(false)}
        category={selectedCategoryForAnalysis}
      />
    </>
  );
}