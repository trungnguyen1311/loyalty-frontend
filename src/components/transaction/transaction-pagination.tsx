import { Diamond, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionPaginationProps {
  currentPage: number;
  totalPages: number;
  resultsPerPage: number;
  onPageChange?: (page: number) => void;
  onResultsPerPageChange?: (value: number) => void;
}

export function TransactionPagination({
  currentPage = 1,
  totalPages = 10,
  resultsPerPage = 10,
  onPageChange,
  onResultsPerPageChange,
}: TransactionPaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* Left side - Page navigation */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <Diamond className="h-3 w-3 fill-current" />
        </Button>

        {getVisiblePages().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "ghost"}
            size="icon"
            className={`h-8 w-8 ${page === currentPage ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => typeof page === "number" && onPageChange?.(page)}
            disabled={typeof page !== "number"}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <Diamond className="h-3 w-3 fill-current" />
        </Button>
      </div>

      {/* Right side - Results per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Results per page:</span>
        <Select
          value={String(resultsPerPage)}
          onValueChange={(value) => onResultsPerPageChange?.(Number(value))}
        >
          <SelectTrigger className="w-[120px] h-8 rounded-lg bg-white border-border">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
