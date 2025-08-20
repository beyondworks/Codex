import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Eye, TrendingUp, DollarSign, Star } from "lucide-react";
import { getOverviewStats, getContentTypeDistribution } from "../utils/contentAnalysisUtils";

export function OverviewTab() {
  const stats = getOverviewStats();
  const distribution = getContentTypeDistribution();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 조회수</p>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">평균 전환율</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgConversion}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 예상 수익</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalRevenue}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">평균 점수</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgScore}</p>
              </div>
              <Star className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>콘텐츠 유형별 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {distribution.map((item, index) => (
              <div key={`distribution-${item.type}-${index}`} className="flex justify-between items-center">
                <span>{item.type}</span>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="w-32" />
                  <span className="text-sm font-semibold">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}