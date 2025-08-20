import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Eye, ThumbsUp, Target, DollarSign, Star, ExternalLink, Clock
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ContentTabProps {
  contentData: any[];
}

export function ContentTab({ contentData }: ContentTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {contentData.map((content, index) => (
          <Card key={content.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-80 h-44 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {content.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-brand-gradient text-white">
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{content.creator}</span>
                      <span>•</span>
                      <span>{content.uploadDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Eye className="h-4 w-4 text-blue-500 mr-1" />
                      </div>
                      <div className="font-semibold">{content.views}</div>
                      <div className="text-xs text-muted-foreground">조회수</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                      </div>
                      <div className="font-semibold">{content.likes}</div>
                      <div className="text-xs text-muted-foreground">좋아요</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="h-4 w-4 text-orange-500 mr-1" />
                      </div>
                      <div className="font-semibold">{content.conversionRate}%</div>
                      <div className="text-xs text-muted-foreground">전환율</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <DollarSign className="h-4 w-4 text-purple-500 mr-1" />
                      </div>
                      <div className="font-semibold">{content.revenue}</div>
                      <div className="text-xs text-muted-foreground">예상수익</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      </div>
                      <div className="font-semibold">{content.score}</div>
                      <div className="text-xs text-muted-foreground">종합점수</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {content.tags.map((tag: string, tagIndex: number) => (
                        <Badge key={`${content.id}-tag-${tag}-${tagIndex}`} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      영상 보기
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}