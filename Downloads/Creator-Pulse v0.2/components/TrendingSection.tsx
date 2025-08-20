import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrendingUp, TrendingDown, Eye, DollarSign, ChevronLeft, ChevronRight, Lightbulb, TrendingUpIcon, Bell, Users } from "lucide-react";
import { TrendProductModal } from "./TrendProductModal";

interface TrendingSectionProps {
  onPageChange?: (page: string) => void;
}

export function TrendingSection({ onPageChange }: TrendingSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  const allTrendingItems = [
    {
      title: "무선 블루투스 이어폰",
      category: "전자제품",
      growth: 23.5,
      views: "1.2M",
      revenue: "₩15.4M",
      trend: "up"
    },
    {
      title: "홈트레이닝 요가매트",
      category: "운동/건강",
      growth: 18.2,
      views: "980K",
      revenue: "₩8.9M",
      trend: "up"
    },
    {
      title: "프리미엄 스킨케어 세트",
      category: "뷰티",
      growth: -5.8,
      views: "750K",
      revenue: "₩22.1M",
      trend: "down"
    },
    {
      title: "게이밍 기계식 키보드",
      category: "게임/IT",
      growth: 31.7,
      views: "650K",
      revenue: "₩12.8M",
      trend: "up"
    },
    {
      title: "스마트워치 프리미엄",
      category: "전자제품",
      growth: 15.3,
      views: "820K",
      revenue: "₩18.6M",
      trend: "up"
    },
    {
      title: "캠핑용 휴대용 의자",
      category: "레저/아웃도어",
      growth: 42.1,
      views: "520K",
      revenue: "₩6.8M",
      trend: "up"
    },
    {
      title: "무선 충전기 패드",
      category: "전자제품",
      growth: 28.4,
      views: "430K",
      revenue: "₩5.2M",
      trend: "up"
    },
    {
      title: "프리미엄 텀블러",
      category: "생활용품",
      growth: 19.7,
      views: "680K",
      revenue: "₩4.1M",
      trend: "up"
    },
    {
      title: "LED 스탠드 조명",
      category: "인테리어",
      growth: -2.3,
      views: "390K",
      revenue: "₩7.3M",
      trend: "down"
    },
    {
      title: "블루투스 스피커",
      category: "전자제품",
      growth: 25.8,
      views: "720K",
      revenue: "₩9.8M",
      trend: "up"
    },
    {
      title: "러닝화 운동화",
      category: "스포츠",
      growth: 33.1,
      views: "890K",
      revenue: "₩11.4M",
      trend: "up"
    },
    {
      title: "스마트 체중계",
      category: "건강/의료",
      growth: 16.9,
      views: "340K",
      revenue: "₩6.7M",
      trend: "up"
    },
    {
      title: "미니 공기청정기",
      category: "가전제품",
      growth: 22.4,
      views: "460K",
      revenue: "₩8.3M",
      trend: "up"
    }
  ];

  const totalPages = Math.ceil(allTrendingItems.length / itemsPerPage);
  const currentItems = allTrendingItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // 트렌드 요약 통계 계산
  const upTrendCount = allTrendingItems.filter(item => item.trend === "up").length;
  const avgGrowth = allTrendingItems.reduce((sum, item) => sum + item.growth, 0) / allTrendingItems.length;
  const totalRevenue = allTrendingItems.reduce((sum, item) => {
    const revenueValue = parseFloat(item.revenue.replace(/[₩,KM]/g, ""));
    const multiplier = item.revenue.includes("M") ? 1000000 : item.revenue.includes("K") ? 1000 : 1;
    return sum + (revenueValue * multiplier);
  }, 0);

  const handlePrevPage = () => {
    setCurrentPage(prev => prev > 0 ? prev - 1 : totalPages - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev < totalPages - 1 ? prev + 1 : 0);
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#ff4d6d]" />
              실시간 트렌드
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {currentPage + 1} / {totalPages}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  className="h-8 w-8 p-0 hover:bg-[#ff4d6d]/5 hover:border-[#ff4d6d]/50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  className="h-8 w-8 p-0 hover:bg-[#ff4d6d]/5 hover:border-[#ff4d6d]/50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleProductClick(item)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm truncate">{item.title}</span>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{item.revenue}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  {item.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`font-medium text-sm ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {item.growth > 0 ? "+" : ""}{item.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 트렌드 요약 */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>전자제품 카테고리가 평균 +25.6% 성장하며 가장 큰 상승세를 보이고 있습니다.</p>
              <p>캠핑용품과 홈트레이닝 관련 제품들이 꾸준한 성장을 지속하고 있어 콘텐츠 제작 기회가 높습니다.</p>
              <p>게이밍 액세서리와 뷰티 카테고리에서 대형 이벤트가 예정되어 있어 다음 주 성장이 기대됩니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 트렌드 상세 모달 */}
      <TrendProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onPageChange={onPageChange}
      />
    </>
  );
}