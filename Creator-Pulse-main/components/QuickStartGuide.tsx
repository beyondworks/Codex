import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, PlayCircle, BookOpen, Target, Zap, BarChart3, ArrowRight, Brain } from "lucide-react";

interface QuickStartGuideProps {
  onPageChange?: (page: string) => void;
}

export function QuickStartGuide({ onPageChange }: QuickStartGuideProps) {
  const steps = [
    {
      icon: PlayCircle,
      title: "Real-time Trend Analysis",
      description: "Check the hottest product trends right now",
      color: "text-blue-500",
      action: "trends"
    },
    {
      icon: Target,
      title: "Product Discovery & Selection",
      description: "Find and analyze optimal products to sell",
      color: "text-green-500",
      action: "products"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics Dashboard",
      description: "Check personalized insights and real-time performance",
      color: "text-purple-500",
      action: "dashboard"
    },
    {
      icon: Brain,
      title: "AI Content Analyzer",
      description: "Analyze videos to get shopping optimization insights",
      color: "text-orange-500",
      action: "ai-analyzer"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-apple-title-3 font-semibold text-apple-gray-900">
          <BookOpen className="h-5 w-5 text-brand-secondary" />
          Quick Start Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex gap-3 p-3 rounded-lg border border-apple-gray-200 bg-apple-gray-50/30 hover:bg-apple-gray-100/50 transition-all duration-200 group cursor-pointer shadow-apple-xs hover:shadow-apple-sm"
              onClick={() => onPageChange?.(step.action)}
            >
              <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${step.color} flex-shrink-0 shadow-apple-sm border border-apple-gray-200`}>
                <step.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-apple-footnote mb-1 text-apple-gray-900">{step.title}</h4>
                <p className="text-apple-caption text-apple-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <ArrowRight className="h-4 w-4 text-apple-gray-500 group-hover:text-apple-gray-900 transition-colors duration-200" />
              </div>
            </div>
          ))}
          
          {/* Help Section */}
          <div className="p-4 bg-brand-gradient rounded-xl text-white mt-6 shadow-apple-md">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4" />
              <span className="font-semibold text-apple-footnote">Need Help?</span>
            </div>
            <p className="text-apple-caption text-white/80 mb-3">
              Our expert consultants provide 1:1 setup assistance
            </p>
            <Button size="sm" className="w-full bg-white text-apple-gray-900 hover:bg-apple-gray-100 transition-colors duration-200 font-medium text-apple-footnote shadow-apple-sm hover:shadow-apple-md rounded-lg">
              Request Free Consultation
            </Button>
          </div>
          
          {/* Success Story */}
          <div className="p-4 border border-green-200 rounded-xl bg-green-50 shadow-apple-xs">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-green-800 text-apple-footnote">Success Story</span>
            </div>
            <p className="text-apple-caption text-green-700">
              "Revenue increased 250% within 30 days of using Creator-Pulse!"
            </p>
            <p className="text-apple-caption text-green-600 mt-1 font-medium">- Beauty Creator Sarah K.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}