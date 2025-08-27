import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, TrendingUp, ShoppingBag, ChevronLeft, ChevronRight, Lightbulb, DollarSign, Target, Bookmark, TrendingDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PopularProductModal } from "./PopularProductModal";
import { supabase } from "../utils/supabase/client";

interface PopularProductsProps {
  onPageChange?: (page: string) => void;
}

export function PopularProducts({ onPageChange }: PopularProductsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;
  const [allProducts, setAllProducts] = useState<any[]>([]);
  useEffect(() => {
    supabase.from('popular_products').select('*').order('rank', { ascending: true }).limit(50)
      .then(({ data }) => {
        if (data) setAllProducts(data.map(p => ({
          id: p.id,
          name: p.title,
          price: `₩${p.price.toLocaleString()}`,
          rating: Number(p.rating),
          sales: `${p.sales.toLocaleString()}`,
          growth: `${p.growth>0?'+':''}${p.growth}%`,
          creator: p.creator || '-',
          image: p.image_url
        })));
      })
  }, []);

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