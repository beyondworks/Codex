import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TrendPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TrendPagination({ currentPage, totalPages, onPageChange }: TrendPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4 md:mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageIndex;
          if (totalPages <= 5) {
            pageIndex = i;
          } else if (currentPage < 3) {
            pageIndex = i;
          } else if (currentPage > totalPages - 4) {
            pageIndex = totalPages - 5 + i;
          } else {
            pageIndex = currentPage - 2 + i;
          }
          
          return (
            <Button
              key={pageIndex}
              variant={currentPage === pageIndex ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageIndex)}
              className={`h-8 w-8 p-0 text-xs ${
                currentPage === pageIndex ? "bg-brand-gradient text-white" : ""
              }`}
            >
              {pageIndex + 1}
            </Button>
          );
        })}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <span className="text-xs text-muted-foreground ml-2">
        {currentPage + 1} / {totalPages}
      </span>
    </div>
  );
}