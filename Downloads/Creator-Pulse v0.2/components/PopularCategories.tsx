import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TrendingUp, BarChart3 } from "lucide-react";

export function PopularCategories() {
  const categories = [
    {
      name: "전자제품",
      percentage: 28.5,
      growth: "+12.3%",
      color: "bg-blue-500"
    },
    {
      name: "패션/뷰티",
      percentage: 22.1,
      growth: "+8.7%", 
      color: "bg-pink-500"
    },
    {
      name: "홈/리빙",
      percentage: 18.7,
      growth: "+15.2%",
      color: "bg-green-500"
    },
    {
      name: "운동/건강",
      percentage: 12.3,
      growth: "+22.5%",
      color: "bg-orange-500"
    },
    {
      name: "게임/취미",
      percentage: 9.8,
      growth: "+5.1%",
      color: "bg-purple-500"
    },
    {
      name: "육아/교육",
      percentage: 8.6,
      growth: "+18.3%",
      color: "bg-yellow-500"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-[#ff4d6d]" />
          실시간 인기 카테고리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                  <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {category.growth}
                  </Badge>
                </div>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}