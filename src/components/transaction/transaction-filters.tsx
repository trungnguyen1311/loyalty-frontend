import {
  Search,
  Calendar as CalendarIcon,
  SlidersHorizontal,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onDateRangeChange?.(range);
  };

  // Shared Staff Select component
  const StaffSelectContent = () => (
    <Select defaultValue="all" onValueChange={onStaffChange}>
      <SelectTrigger className="w-full md:w-[204px] h-12 rounded-xl bg-white border-[var(--outline-med-em)]">
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
  );

  // Shared Date Range Picker component
  const DateRangePickerContent = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-[267px] h-12 rounded-xl bg-white border-[var(--outline-med-em)] justify-between font-normal"
        >
          <span>
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
              : "Select date range"}
          </span>
          <CalendarIcon className="h-5 w-5 text-[var(--text-low-em)]" />
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
  );

  return (
    <div className="mt-5 flex items-center gap-3">
      {/* Search Input - Always visible */}
      <div className="relative flex-1 md:max-w-[602px]">
        <Search
          className="z-10 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-low-em)]"
          size={20}
        />
        <Input
          placeholder="Search transaction"
          className="pl-12 h-12 rounded-xl bg-white border-[var(--outline-med-em)] text-[var(--text-low-em)] text-body-2 placeholder:text-[var(--text-low-em)]"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {/* Mobile Filter Button - Only visible on mobile */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="md:hidden size-12 p-0 rounded-xl bg-white border-[var(--outline-med-em)] flex-shrink-0"
          >
            <SlidersHorizontal
              className="text-[var(--text-low-em)]"
              size={20}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-med-em)]">
                Staff
              </label>
              <StaffSelectContent />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-med-em)]">
                Date Range
              </label>
              <DateRangePickerContent />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Desktop Filters - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-4">
        <StaffSelectContent />
        <DateRangePickerContent />
      </div>
    </div>
  );
}
