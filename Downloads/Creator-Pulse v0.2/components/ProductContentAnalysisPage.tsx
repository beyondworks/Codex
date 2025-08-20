import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, BarChart3, Download
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { generateTopContentData } from "./data/contentAnalysisData";
import { getSortedContent, getOverallInsights } from "./utils/contentAnalysisUtils";
import { OverviewTab } from "./content-analysis/OverviewTab";
import { ContentTab } from "./content-analysis/ContentTab";
import { InsightsTab } from "./content-analysis/InsightsTab";

interface ProductContentAnalysisPageProps {
  product: any;
  onBack: () => void;
}

export function ProductContentAnalysisPage({ product, onBack }: ProductContentAnalysisPageProps) {
  const [contentData, setContentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    const loadContentData = async () => {
      setLoading(true);
      
      // 실제 크롤링 대신 모의 데이터 로딩
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData = generateTopContentData(product);
      setContentData(mockData);
      setLoading(false);
      
      toast.success("상위 콘텐츠 10개 분석 완료!", { duration: 3000 });
    };

    loadContentData();
  }, [product]);

  const sortedContent = getSortedContent(contentData, sortBy);
  const overallInsights = getOverallInsights(contentData);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              뒤로가기
            </Button>
            <div>
              <h1 className="text-2xl font-bold">AI 콘텐츠 분석</h1>
              <p className="text-muted-foreground">{product?.title} 상위 콘텐츠 분석 중...</p>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">콘텐츠 크롤링 및 분석 중</h3>
                <p className="text-muted-foreground">상위 성과 콘텐츠 10개를 수집하고 있습니다...</p>
              </div>
              <div className="space-y-2">
                <Progress value={75} className="h-2" />
                <p className="text-sm text-muted-foreground">약 30초 소요됩니다</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로가기
          </Button>
          <div>
            <h1 className="text-2xl font-bold">AI 콘텐츠 분석 결과</h1>
            <p className="text-muted-foreground">{product?.title} 상위 콘텐츠 10개 분석 완료</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="px-3 py-2 border rounded-lg text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="score">종합 점수순</option>
            <option value="views">조회수순</option>
            <option value="conversion">전환율순</option>
            <option value="revenue">수익순</option>
          </select>
          <Button className="bg-brand-gradient">
            <Download className="h-4 w-4 mr-2" />
            분석 리포트
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">전체 개요</TabsTrigger>
          <TabsTrigger value="content">콘텐츠 분석</TabsTrigger>
          <TabsTrigger value="insights">AI 인사이트</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="content">
          <ContentTab contentData={sortedContent} />
        </TabsContent>

        <TabsContent value="insights">
          <InsightsTab insights={overallInsights} />
        </TabsContent>
      </Tabs>
    </div>
  );
}