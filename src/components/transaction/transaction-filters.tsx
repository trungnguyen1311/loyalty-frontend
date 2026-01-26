import { Search, ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface TransactionFiltersProps {
  onSearchChange?: (value: string) => void;
  onStaffChange?: (value: string) => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export function TransactionFilters({
  onSearchChange,
  onStaffChange,
  onDateRangeChange,
}: TransactionFiltersProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 10, 1), // Nov 1, 2025
    to: new Date(2025, 10, 30), // Nov 30, 2025
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onDateRangeChange?.(range);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-[602px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by customer name, customer email"
          className="pl-12 h-12 rounded-xl bg-white border-border"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {/* Staff Select */}
      <Select defaultValue="all" onValueChange={onStaffChange}>
        <SelectTrigger className="w-[204px] h-12 rounded-xl bg-white border-border">
          <SelectValue placeholder="All staffs" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All staffs</SelectItem>
          <SelectItem value="megan">Megan Roberts</SelectItem>
          <SelectItem value="jonathan">Jonathan Smith</SelectItem>
          <SelectItem value="emily">Emily Johnson</SelectItem>
          <SelectItem value="michael">Michael Brown</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[267px] h-12 rounded-xl bg-white border-border justify-between font-normal"
          >
            <span>
              {dateRange?.from && dateRange?.to
                ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                : "Select date range"}
            </span>
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
