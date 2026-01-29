import { memo, useState } from "react";
import { CalendarIcon, Gift, ShoppingCart, Ticket, Users } from "lucide-react";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContentUnstyled,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerFigma } from "@/components/ui/datepicker-figma";
import { cn } from "@/lib/utils";
import { EarningReportsChart } from "@/components/reports/EarningReportsChart";

export const DashboardPage = memo(() => {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 10, 11)); // November 11, 2025

  return (
    <div className="min-h-screen py-6 flex flex-col gap-6">
      <div className="flex flex-col gap-6 w-full mx-auto">
        {/* Header Section: Filters and Stats */}
        <div className="flex flex-col gap-6">
          {/* Filter Bar */}
          <div className="flex items-center gap-3">
            {/* Daily Filter */}
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[274px] h-[48px] bg-white border-outlineMedEm px-3 py-0 text-body-2 text-textHighEm font-regular [&>span]:line-clamp-1 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:opacity-100 [&>svg]:text-textHighEm">
                <div className="flex items-center gap-1">
                  <SelectValue placeholder="Select period" />
                </div>
              </SelectTrigger>
              <SelectContent
                align="start"
                className="w-[274px] rounded-big-comp-sm border border-outlineBaseEm bg-surfaceSpecialBlurBaseLight backdrop-blur-3xl shadow-e3 p-2 [&>div]:min-w-0 [&>div]:p-0"
              >
                <SelectItem
                  value="Daily"
                  className="rounded-comp-lg px-3 py-2.5 text-body-2 text-textHighEm bg-transparent focus:bg-surfacePrimaryBaseEm focus:text-textHighEm cursor-pointer data-[state=checked]:bg-neutral100"
                >
                  Daily
                </SelectItem>
                <SelectItem
                  value="Weekly"
                  className="rounded-comp-lg px-3 py-2.5 text-body-2 text-textHighEm bg-transparent focus:bg-surfacePrimaryBaseEm focus:text-textHighEm cursor-pointer data-[state=checked]:bg-neutral100"
                >
                  Weekly
                </SelectItem>
                <SelectItem
                  value="Monthly"
                  className="rounded-comp-lg px-3 py-2.5 text-body-2 text-textHighEm bg-transparent focus:bg-surfacePrimaryBaseEm focus:text-textHighEm cursor-pointer data-[state=checked]:bg-neutral100"
                >
                  Monthly
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex items-center justify-between w-[274px] h-[48px] bg-white border border-outlineMedEm rounded-comp-lg px-3 py-0 text-body-2 text-textHighEm font-regular hover:bg-white focus:outline-none",
                    !date && "text-muted-foreground",
                  )}
                >
                  <div className="flex items-center gap-1">
                    {date ? (
                      format(date, "MMMM dd, yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-textHighEm" />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContentUnstyled align="start">
                <DatePickerFigma selected={date} onSelect={setDate} />
              </PopoverContentUnstyled>
            </Popover>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start w-full">
            {/* Total Points Earned */}
            <div className="flex flex-1 items-center gap-3 bg-white shadow-e3 rounded-comp-lg p-4">
              <div className="w-10 h-10 rounded-xs bg-surfaceSuccessBaseEmAlpha flex items-center justify-center shrink-0">
                <Gift
                  className="w-[26px] h-[26px] text-outlineSuccessHighEm"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-body-2 text-textMedEm font-regular">
                  Total Points Earned
                </span>
                <span className="text-title-2 text-textHighEm font-semibold">
                  13,450
                </span>
              </div>
            </div>

            {/* Total Points Spent */}
            <div className="flex flex-1 items-center gap-3 bg-white shadow-e3 rounded-comp-lg p-4">
              <div className="w-10 h-10 rounded-xs bg-surfaceDangerBaseEmAlpha flex items-center justify-center shrink-0">
                <ShoppingCart
                  className="w-[26px] h-[26px] text-destructive"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-body-2 text-textMedEm font-regular">
                  Total Points Spent
                </span>
                <span className="text-title-2 text-textHighEm font-semibold">
                  29,980
                </span>
              </div>
            </div>

            {/* Total Used Vouchers */}
            <div className="flex flex-1 items-center gap-3 bg-white shadow-e3 rounded-comp-lg p-4">
              <div className="w-10 h-10 rounded-xs bg-surfaceInfoBaseEmAlpha flex items-center justify-center shrink-0">
                <Ticket
                  className="w-[26px] h-[26px] text-outlineInfoHighEm"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-body-2 text-textMedEm font-regular">
                  Total Used Vouchers
                </span>
                <span className="text-title-2 text-textHighEm font-semibold">
                  13,450
                </span>
              </div>
            </div>

            {/* Total Paid User */}
            <div className="flex flex-1 items-center gap-3 bg-white shadow-e3 rounded-comp-lg p-4">
              <div className="w-10 h-10 rounded-xs bg-surfacePrimaryBaseEm flex items-center justify-center shrink-0">
                <Users
                  className="w-[26px] h-[26px] text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-body-2 text-textMedEm font-regular">
                  Total Paid User
                </span>
                <span className="text-title-2 text-textHighEm font-semibold">
                  1,250
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Chart */}
        <div className="w-full">
          <EarningReportsChart />
        </div>
      </div>
    </div>
  );
});
