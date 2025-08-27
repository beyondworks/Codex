import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Lightbulb, CheckCircle, AlertCircle } from "lucide-react";
import { getSuccessFactors, getImprovementSuggestions } from "../utils/contentAnalysisUtils";

interface InsightsTabProps {
  insights: string[];
}

export function InsightsTab({ insights }: InsightsTabProps) {
  const successFactors = getSuccessFactors();
  const improvements = getImprovementSuggestions();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            AI 분석 인사이트
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={`insight-${index}`} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-blue-800">{insight}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">성공 요인 분석</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {successFactors.map((factor, index) => (
              <div key={`success-factor-${index}`} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">{factor}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">개선 제안사항</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {improvements.map((suggestion, index) => (
              <div key={`improvement-${index}`} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span className="text-sm">{suggestion}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}