import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, TrendingUp, ShoppingBag, ChevronLeft, ChevronRight, Lightbulb, DollarSign, Target, Bookmark, TrendingDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PopularProductModal } from "./PopularProductModal";

interface PopularProductsProps {
  onPageChange?: (page: string) => void;
}

export function PopularProducts({ onPageChange }: PopularProductsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  const allProducts = [
    {
      id: 1,
      name: "애플 에어팟 프로 2세대",
      price: "₩349,000",
      rating: 4.8,
      sales: "15.2K",
      growth: "+23%",
      creator: "테크리뷰왕",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "다이슨 에어랩 스타일러",
      price: "₩690,000",
      rating: 4.6,
      sales: "8.7K",
      growth: "+18%",
      creator: "뷰티구루",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "나이키 에어포스 1",
      price: "₩129,000",
      rating: 4.7,
      sales: "12.1K",
      growth: "+31%",
      creator: "패션인플루언서",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "삼성 갤럭시 버즈 프로",
      price: "₩229,000",
      rating: 4.5,
      sales: "9.8K",
      growth: "+12%",
      creator: "모바일마스터",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 5,
      name: "로지텍 MX Master 3",
      price: "₩159,000",
      rating: 4.9,
      sales: "6.4K",
      growth: "+28%",
      creator: "생산성킹",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 6,
      name: "소니 WH-1000XM5",
      price: "₩429,000",
      rating: 4.7,
      sales: "11.3K",
      growth: "+19%",
      creator: "오디오매니아",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 7,
      name: "iPad Pro 12.9인치",
      price: "₩1,729,000",
      rating: 4.8,
      sales: "7.2K",
      growth: "+25%",
      creator: "디지털노마드",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 8,
      name: "맥북 프로 M3",
      price: "₩2,890,000",
      rating: 4.9,
      sales: "4.8K",
      growth: "+35%",
      creator: "프로크리에이터",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 9,
      name: "아이폰 15 Pro Max",
      price: "₩1,990,000",
      rating: 4.6,
      sales: "13.7K",
      growth: "+22%",
      creator: "스마트폰전문가",
      image: "https://images.unsplash.com/photo-1592286748942-6ad7dcd88341?w=150&h=150&fit=crop&crop=center"
    },
    {
      id: 10,
      name: "삼성 갤럭시 S24 Ultra",
      price: "₩1,698,400",
      rating: 4.5,
      sales: "10.2K",
      growth: "+17%",
      creator: "안드로이드킹",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop&crop=center"
    }
  ];

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const currentProducts = allProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // 상품 요약 통계 계산
  const totalProducts = allProducts.length;
  const avgRating = allProducts.reduce((sum, product) => sum + product.rating, 0) / allProducts.length;
  const totalSales = allProducts.reduce((sum, product) => {
    const salesValue = parseFloat(product.sales.replace(/[K]/g, ""));
    return sum + salesValue;
  }, 0);
  const avgGrowth = allProducts.reduce((sum, product) => {
    const growthValue = parseFloat(product.growth.replace(/[+%]/g, ""));
    return sum + growthValue;
  }, 0) / allProducts.length;

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
              <ShoppingBag className="h-5 w-5 text-[#ff8a3d]" />
              실시간 인기 상품
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
                  className="h-8 w-8 p-0 hover:bg-[#ff8a3d]/5 hover:border-[#ff8a3d]/50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  className="h-8 w-8 p-0 hover:bg-[#ff8a3d]/5 hover:border-[#ff8a3d]/50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="flex gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <Badge className="absolute -top-1 -left-1 px-1 py-0 h-4 text-xs bg-brand-gradient border-0">
                    #{currentPage * itemsPerPage + index + 1}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-1 truncate">{product.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm">{product.price}</span>
                    <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {product.growth}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span>판매 {product.sales}</span>
                    <span className="truncate">by {product.creator}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 상품 성과 요약 */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>20만원~50만원 가격대의 프리미엄 전자제품이 가장 높은 수익률(평균 8.2%)을 기록하고 있습니다.</p>
              <p>상세한 사용후기와 비교 콘텐츠가 포함된 리뷰 영상이 15K+ 판매를 달성하며 높은 성과를 보였습니다.</p>
              <p>생산성 도구와 웰니스 제품이 빠르게 성장하고 있어 지금이 콘텐츠 제작 적기입니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 인기 상품 상세 모달 */}
      <PopularProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onPageChange={onPageChange}
      />
    </>
  );
}