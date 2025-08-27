import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrendingUp, TrendingDown, Eye, DollarSign, ChevronLeft, ChevronRight, Lightbulb, TrendingUpIcon, Bell, Users } from "lucide-react";
import { TrendProductModal } from "./TrendProductModal";
import { supabase } from "../utils/supabase/client";

interface TrendingSectionProps {
  onPageChange?: (page: string) => void;
}

export function TrendingSection({ onPageChange }: TrendingSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('trend_items')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(60);
      if (!error && data) {
        setItems(data.map(d => ({
          title: d.title,
          category: d.category_name || d.category,
          growth: Number(d.growth ?? 0),
          views: Number(d.views ?? 0),
          revenue: Number(d.revenue ?? 0),
          trend: d.trend,
          videoId: d.video_id,
          thumbnail: d.thumbnail_url,
          channel: d.channel_title,
        })));
      }
      setLoading(false);
    };
    fetchTrends();
  }, []);

  const totalPages = Math.max(1, Math.ceil((items?.length || 0) / itemsPerPage));
  const currentItems = (items || []).slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // 트렌드 요약 통계 계산
  const upTrendCount = items.filter(item => item.trend === "up").length;
  const avgGrowth = items.length ? items.reduce((sum, item) => sum + Number(item.growth), 0) / items.length : 0;
  const totalRevenue = items.reduce((sum, item) => sum + Number(item.revenue), 0);

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
            {loading ? (
              <div className="text-sm text-muted-foreground">불러오는 중...</div>
            ) : currentItems.length === 0 ? (
              <div className="text-sm text-muted-foreground">데이터가 없습니다</div>
            ) : currentItems.map((item, index) => (
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
                      <span>{item.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>₩{item.revenue.toLocaleString()}</span>
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