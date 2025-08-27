import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  Target,
  Eye,
  ShoppingCart,
  Users,
  Zap,
  BarChart3,
  ArrowRight,
  Info,
  Sparkles,
  RefreshCw
} from "lucide-react";

interface CalculationInputs {
  expectedViews: number;
  clickRate: number;
  conversionRate: number;
  productPrice: number;
  commission: number;
  category: string;
  videoLength: string;
  uploadTime: string;
}

export function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculationInputs>({
    expectedViews: 100000,
    clickRate: 5.0,
    conversionRate: 3.0,
    productPrice: 50000,
    commission: 15,
    category: "beauty",
    videoLength: "medium",
    uploadTime: "evening"
  });

  const [showResults, setShowResults] = useState(false);

  const categories = [
    { value: "beauty", label: "뷰티/화장품", avgCTR: 6.2, avgConversion: 3.8 },
    { value: "fashion", label: "패션/의류", avgCTR: 4.8, avgConversion: 2.9 },
    { value: "lifestyle", label: "생활용품", avgCTR: 5.5, avgConversion: 4.1 },
    { value: "electronics", label: "전자기기", avgCTR: 3.9, avgConversion: 2.3 },
    { value: "health", label: "건강/운동", avgCTR: 5.8, avgConversion: 3.5 },
    { value: "food", label: "식품/건강식품", avgCTR: 7.1, avgConversion: 4.6 }
  ];

  const videoLengths = [
    { value: "short", label: "짧음 (1-3분)", multiplier: 0.9 },
    { value: "medium", label: "보통 (5-10분)", multiplier: 1.0 },
    { value: "long", label: "긺 (15분+)", multiplier: 1.1 }
  ];

  const uploadTimes = [
    { value: "morning", label: "오전 (9-12시)", multiplier: 0.85 },
    { value: "afternoon", label: "오후 (12-18시)", multiplier: 0.95 },
    { value: "evening", label: "저녁 (18-22시)", multiplier: 1.15 },
    { value: "night", label: "밤 (22-24시)", multiplier: 0.8 }
  ];

  const calculateResults = () => {
    const selectedCategory = categories.find(c => c.value === inputs.category);
    const selectedLength = videoLengths.find(v => v.value === inputs.videoLength);
    const selectedTime = uploadTimes.find(u => u.value === inputs.uploadTime);

    // AI 보정 적용
    const adjustedViews = inputs.expectedViews * (selectedTime?.multiplier || 1) * (selectedLength?.multiplier || 1);
    const clicks = Math.round(adjustedViews * (inputs.clickRate / 100));
    const conversions = Math.round(clicks * (inputs.conversionRate / 100));
    const revenue = conversions * inputs.productPrice * (inputs.commission / 100);

    const confidence = Math.min(95, 60 + 
      (selectedCategory ? Math.abs(inputs.clickRate - selectedCategory.avgCTR) < 1 ? 10 : 0 : 0) +
      (selectedCategory ? Math.abs(inputs.conversionRate - selectedCategory.avgConversion) < 0.5 ? 10 : 0 : 0) +
      (inputs.expectedViews >= 50000 && inputs.expectedViews <= 500000 ? 15 : 0)
    );

    return {
      adjustedViews: Math.round(adjustedViews),
      clicks,
      conversions,
      revenue: Math.round(revenue),
      confidence,
      categoryAvg: selectedCategory,
      optimizations: generateOptimizations()
    };
  };

  const generateOptimizations = () => {
    const optimizations = [];
    const selectedCategory = categories.find(c => c.value === inputs.category);
    
    if (selectedCategory) {
      if (inputs.clickRate < selectedCategory.avgCTR) {
        optimizations.push({
          type: "CTR 개선",
          current: `${inputs.clickRate}%`,
          potential: `${selectedCategory.avgCTR}%`,
          impact: `+${Math.round((selectedCategory.avgCTR - inputs.clickRate) / inputs.clickRate * 100)}% 수익 증가`
        });
      }
      
      if (inputs.conversionRate < selectedCategory.avgConversion) {
        optimizations.push({
          type: "전환율 개선",
          current: `${inputs.conversionRate}%`,
          potential: `${selectedCategory.avgConversion}%`,
          impact: `+${Math.round((selectedCategory.avgConversion - inputs.conversionRate) / inputs.conversionRate * 100)}% 수익 증가`
        });
      }
    }

    if (inputs.uploadTime !== "evening") {
      optimizations.push({
        type: "업로드 시간 최적화",
        current: uploadTimes.find(u => u.value === inputs.uploadTime)?.label || "",
        potential: "저녁 (18-22시)",
        impact: "+15% 조회수 증가"
      });
    }

    return optimizations;
  };

  const results = showResults ? calculateResults() : null;

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setInputs({
      expectedViews: 100000,
      clickRate: 5.0,
      conversionRate: 3.0,
      productPrice: 50000,
      commission: 15,
      category: "beauty",
      videoLength: "medium",
      uploadTime: "evening"
    });
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Calculator className="h-7 w-7 text-foreground" />
            <h1 className="text-3xl font-bold">AI 수익 계산기</h1>
          </div>
          <p className="text-muted-foreground">
            정확한 데이터 기반으로 콘텐츠 수익을 예측하고 최적화 방안을 제안받으세요
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-700">AI 예측 모델</span>
          </div>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            초기화
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#ff4d6d]" />
              수익 계산 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 예상 조회수 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                예상 조회수
              </Label>
              <div className="space-y-2">
                <Input
                  type="number"
                  value={inputs.expectedViews}
                  onChange={(e) => setInputs(prev => ({ ...prev, expectedViews: parseInt(e.target.value) || 0 }))}
                  placeholder="100000"
                />
                <Slider
                  value={[inputs.expectedViews]}
                  onValueChange={([value]) => setInputs(prev => ({ ...prev, expectedViews: value }))}
                  min={10000}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  10만 ~ 100만 조회수
                </div>
              </div>
            </div>

            {/* 클릭률 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                클릭률 (CTR)
              </Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.clickRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, clickRate: parseFloat(e.target.value) || 0 }))}
                    placeholder="5.0"
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <Slider
                  value={[inputs.clickRate]}
                  onValueChange={([value]) => setInputs(prev => ({ ...prev, clickRate: value }))}
                  min={1}
                  max={15}
                  step={0.1}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  업계 평균: 3-8%
                </div>
              </div>
            </div>

            {/* 전환율 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                전환율
              </Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.conversionRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, conversionRate: parseFloat(e.target.value) || 0 }))}
                    placeholder="3.0"
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <Slider
                  value={[inputs.conversionRate]}
                  onValueChange={([value]) => setInputs(prev => ({ ...prev, conversionRate: value }))}
                  min={0.5}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  업계 평균: 2-5%
                </div>
              </div>
            </div>

            {/* 상품 가격 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                상품 가격
              </Label>
              <Input
                type="number"
                value={inputs.productPrice}
                onChange={(e) => setInputs(prev => ({ ...prev, productPrice: parseInt(e.target.value) || 0 }))}
                placeholder="50000"
              />
            </div>

            {/* 수수료율 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                수수료율
              </Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.5"
                    value={inputs.commission}
                    onChange={(e) => setInputs(prev => ({ ...prev, commission: parseFloat(e.target.value) || 0 }))}
                    placeholder="15"
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <Slider
                  value={[inputs.commission]}
                  onValueChange={([value]) => setInputs(prev => ({ ...prev, commission: value }))}
                  min={5}
                  max={30}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>

            {/* 카테고리 */}
            <div className="space-y-3">
              <Label>상품 카테고리</Label>
              <Select value={inputs.category} onValueChange={(value) => setInputs(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 영상 길이 */}
            <div className="space-y-3">
              <Label>영상 길이</Label>
              <Select value={inputs.videoLength} onValueChange={(value) => setInputs(prev => ({ ...prev, videoLength: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {videoLengths.map((length) => (
                    <SelectItem key={length.value} value={length.value}>
                      {length.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 업로드 시간 */}
            <div className="space-y-3">
              <Label>업로드 시간</Label>
              <Select value={inputs.uploadTime} onValueChange={(value) => setInputs(prev => ({ ...prev, uploadTime: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {uploadTimes.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleCalculate} 
              className="w-full bg-brand-gradient hover:opacity-90"
              size="lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              수익 계산하기
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#ff8a3d]" />
              AI 예측 결과
              {results && (
                <Badge className="bg-green-100 text-green-700">
                  신뢰도 {results.confidence}%
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-10 w-10 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-600">수익 예측 대기 중</h3>
                  <p className="text-sm text-muted-foreground">
                    왼쪽 폼을 작성하고 계산하기 버튼을 눌러주세요
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 핵심 지표 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ₩{results.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">예상 수익</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {results.conversions}
                    </div>
                    <div className="text-sm text-blue-700">예상 판매량</div>
                  </div>
                </div>

                {/* 상세 분석 */}
                <div className="space-y-4">
                  <h4 className="font-semibold">상세 분석</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">조정된 조회수</span>
                      <span className="font-medium">{results.adjustedViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">예상 클릭수</span>
                      <span className="font-medium">{results.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">예상 구매수</span>
                      <span className="font-medium">{results.conversions}</span>
                    </div>
                  </div>
                </div>

                {/* 카테고리 벤치마크 */}
                {results.categoryAvg && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">카테고리 벤치마크</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>클릭률 vs 평균</span>
                          <span>{inputs.clickRate}% / {results.categoryAvg.avgCTR}%</span>
                        </div>
                        <Progress value={(inputs.clickRate / results.categoryAvg.avgCTR) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>전환율 vs 평균</span>
                          <span>{inputs.conversionRate}% / {results.categoryAvg.avgConversion}%</span>
                        </div>
                        <Progress value={(inputs.conversionRate / results.categoryAvg.avgConversion) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 최적화 제안 */}
                {results.optimizations.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#ff8a3d]" />
                      AI 최적화 제안
                    </h4>
                    <div className="space-y-3">
                      {results.optimizations.map((opt, index) => (
                        <div key={index} className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <div className="font-medium text-orange-800">{opt.type}</div>
                          <div className="text-sm text-orange-700 mt-1">
                            {opt.current} → {opt.potential}
                          </div>
                          <div className="text-xs text-orange-600 mt-1">
                            {opt.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button className="w-full bg-brand-gradient hover:opacity-90">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  최적화 전략 받기
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}