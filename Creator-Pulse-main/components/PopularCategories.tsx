import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TrendingUp, BarChart3 } from "lucide-react";
import { supabase } from "../utils/supabase/client";

export function PopularCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    supabase.from('popular_categories').select('*').order('share', { ascending: false })
      .then(({ data }) => {
        if (data) setCategories(data.map(d => ({ name: d.name, percentage: Number(d.share), growth: `${Number(d.change)>0?'+':''}${d.change}%`, color: d.color })));
      })
  }, []);

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