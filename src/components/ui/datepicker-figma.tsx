"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

export interface DatePickerFigmaProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  onApply?: () => void;
  onCancel?: () => void;
}

export function DatePickerFigma({
  selected,
  onSelect,
  onApply,
  onCancel,
}: DatePickerFigmaProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected || new Date(),
  );

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleDayClick = (day: Date) => {
    onSelect?.(day);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const weeks: Date[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div
      className={cn(
        "flex w-[304px] flex-col gap-0 rounded-[24px]",
        "border border-outlineBaseEm bg-white",
        "shadow-e3 overflow-hidden",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-[16px] p-[12px]",
          "bg-gradient-to-b from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.8)]",
          "backdrop-blur-[48px]",
        )}
      >
        <div
          className={cn(
            "flex h-[40px] w-full items-center justify-between",
            "rounded-[12px] p-[4px]",
            "border border-[rgba(0,0,0,0.06)]",
          )}
          style={{
            background: "linear-gradient(180deg, #F9F9FA 0%, #FFFFFF 100%)",
          }}
        >
          <button
            className={cn(
              "flex h-[32px] w-[32px] items-center justify-center",
              "rounded-[8px] bg-white",
              "transition-colors hover:bg-surfaceS1",
            )}
            style={{
              boxShadow:
                "inset 0 2px 3px 0 rgba(255, 255, 255, 0.03), 0 2px 1.5px -0.5px rgba(0, 0, 0, 0.03)",
              backdropFilter: "blur(24px)",
            }}
            onClick={handlePreviousMonth}
          >
            <ChevronLeft className="h-[18px] w-[18px] text-textMedEm" />
          </button>

          <div className="flex items-center gap-[4px] px-[4px] text-[14px] leading-[20px]">
            <span className="font-semibold text-textMedEm">
              {format(currentMonth, "MMMM")}
            </span>
            <span className="font-medium text-textBaseEm">
              {format(currentMonth, "yyyy")}
            </span>
          </div>

          <button
            className={cn(
              "flex h-[32px] w-[32px] items-center justify-center",
              "rounded-[8px] bg-white",
              "transition-colors hover:bg-surfaceS1",
            )}
            style={{
              boxShadow:
                "inset 0 2px 3px 0 rgba(255, 255, 255, 0.03), 0 2px 1.5px -0.5px rgba(0, 0, 0, 0.03)",
              backdropFilter: "blur(24px)",
            }}
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-[18px] w-[18px] text-textMedEm" />
          </button>
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="grid grid-cols-7 gap-0">
            {weekDays.map((day, i) => (
              <div
                key={i}
                className={cn(
                  "flex h-[16px] w-[40px] items-center justify-center",
                  "text-[12px] font-medium leading-[16px] text-textBaseEm",
                )}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-0">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-0">
                {week.map((day, dayIndex) => {
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isSelected = selected && isSameDay(day, selected);
                  const isDayToday = isToday(day);

                  return (
                    <button
                      key={dayIndex}
                      onClick={() => handleDayClick(day)}
                      className={cn(
                        "flex w-[40px] h-[32px] items-center justify-center",
                        "font-medium transition-colors focus:outline-none",
                        isCurrentMonth &&
                          !isSelected && [
                            "text-[14px] leading-[20px] text-[#5B616D]",
                            "hover:bg-surfaceS1 rounded-[8px]",
                          ],
                        !isCurrentMonth &&
                          "text-[12px] leading-[16px] text-[#C3C6CC]",
                        isDayToday &&
                          !isSelected &&
                          "bg-surfaceS1 font-semibold text-[#5B616D] rounded-[8px]",
                        isSelected && [
                          "px-[8px] py-[4px]",
                          "rounded-[8px] border border-[rgba(0,0,0,0.09)]",
                          "bg-surfacePrimaryMedEm !text-white",
                          "text-[14px] leading-[20px]",
                        ],
                      )}
                      style={
                        isSelected
                          ? {
                              boxShadow:
                                "inset 0 3px 3px 0 rgba(255, 255, 255, 0.12), 0 1px 1px -0.5px rgba(0, 0, 0, 0.03)",
                              backdropFilter: "blur(12px)",
                            }
                          : undefined
                      }
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-[8px] w-full items-center">
          <div className="h-px w-full bg-outlineLowEm" />
        </div>

        <div className="flex flex-col gap-[16px]">
          <div
            className={cn(
              "flex h-[40px] items-center justify-between rounded-[10px]",
              "bg-[#ececf0] px-[10px] py-[8px]",
            )}
          >
            <span className="text-[14px] font-medium leading-[20px] text-textHighEm">
              {selected ? format(selected, "dd / MM / yyyy") : "DD / MM / YYYY"}
            </span>
            <CalendarIcon className="h-[18px] w-[18px] text-textHighEm" />
          </div>

          <div className="flex gap-[8px]">
            <button
              onClick={onCancel}
              className={cn(
                "flex h-[40px] flex-1 items-center justify-center rounded-[10px]",
                "text-[14px] font-semibold text-textHighEm",
                "hover:bg-surfaceS1 transition-colors",
              )}
              style={{
                background: "rgba(242, 242, 244, 0.8)",
                boxShadow:
                  "inset 0 2px 3px 0 rgba(255, 255, 255, 0.03), 0 2px 1.5px -0.5px rgba(0, 0, 0, 0.03)",
                backdropFilter: "blur(24px)",
              }}
            >
              Cancel
            </button>

            <button
              onClick={onApply}
              className={cn(
                "flex h-[40px] flex-1 items-center justify-center rounded-[10px]",
                "bg-surfacePrimaryMedEm text-[14px] font-semibold text-white",
                "hover:opacity-90 transition-opacity",
              )}
              style={{
                boxShadow:
                  "inset 0 3px 3px 0 rgba(255, 255, 255, 0.12), 0 1px 1px -0.5px rgba(0, 0, 0, 0.03)",
                backdropFilter: "blur(24px)",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
