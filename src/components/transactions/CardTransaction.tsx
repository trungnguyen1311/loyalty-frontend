import {
  Pencil,
  Eye,
  XCircle,
  User,
  Mail,
  Receipt,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/components/tables/TableTransaction";

interface CardTransactionProps {
  data: Transaction;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function CardTransaction({
  data,
  onView,
  onEdit,
  onDelete,
}: CardTransactionProps) {
  return (
    <div
      className="rounded-[8px] border border-[rgba(0,0,0,0.12)] bg-white overflow-hidden"
      style={{
        boxShadow:
          "0px 3px 3px -1.5px rgba(0, 0, 0, 0.03), 0px 1px 1px -0.5px rgba(0, 0, 0, 0.03)",
      }}
    >
      {/* Info Container */}
      <div className="flex flex-col gap-2 p-3 bg-white rounded-[6px]">
        {/* Header: Avatar + Staff Info + Status Badge */}
        <div className="flex items-start gap-[13px]">
          {/* Staff Info */}
          <div className="flex-1 flex items-center gap-1">
            {/* Avatar */}
            <div className="size-[46px] rounded-full border-[2.28px] border-white bg-gray-100 overflow-hidden flex-shrink-0">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.staffName)}&size=46&background=random`}
                alt={data.staffName}
                className="size-full object-cover"
              />
            </div>

            {/* Name & Role */}
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-[16px] font-semibold leading-6 text-[#0B0C17] font-[Poppins]">
                {data.staffName}
              </span>
              <span className="text-[14px] font-normal leading-5 text-textMedEm font-[Poppins]">
                Cashier A
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <Badge
            variant="outline"
            className={cn(
              "h-6 px-[6px] py-1 text-[14px] font-medium leading-5 rounded-[8px] border-0 shadow-none font-[Poppins]",
              data.status === "Completed"
                ? "bg-surfaceSuccessBaseEmAlpha text-[#338732]"
                : "bg-surfaceDangerBaseEmAlpha text-[#DF2917]",
            )}
          >
            {data.status === "Completed" ? "Completed" : "Voiced"}
          </Badge>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-[#ECECF0]" />

        {/* Info Rows */}
        <div className="flex flex-col gap-3">
          {/* Customer Name Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <User
                className="size-4 text-textMedEm flex-shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[14px] font-normal leading-5 text-textMedEm font-[Poppins]">
                Customer name
              </span>
            </div>
            <span className="text-[14px] font-medium leading-5 text-textHighEm font-[Poppins]">
              {data.customerName}
            </span>
          </div>

          {/* Email Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Mail
                className="size-4 text-textMedEm flex-shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[14px] font-normal leading-5 text-textMedEm font-[Poppins]">
                Email
              </span>
            </div>
            <span className="text-[14px] font-medium leading-5 text-textHighEm font-[Poppins]">
              {data.customerEmail}
            </span>
          </div>

          {/* Bill Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Receipt
                className="size-4 text-textMedEm flex-shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[14px] font-normal leading-5 text-textMedEm font-[Poppins]">
                Bill
              </span>
            </div>
            <span className="text-[14px] font-medium leading-5 text-[#338732] font-[Poppins]">
              {data.billAmount}
            </span>
          </div>

          {/* Date Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Calendar
                className="size-4 text-textMedEm flex-shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[14px] font-normal leading-5 text-textMedEm font-[Poppins]">
                Date
              </span>
            </div>
            <span className="text-[14px] font-medium leading-5 text-textHighEm font-[Poppins]">
              {data.date}
            </span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-[#ECECF0]" />

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Edit Button */}
          <Button
            variant="outline"
            className="flex-1 h-9 rounded-[8px] border-t-[rgba(0,0,0,0.06)] border-b-[rgba(0,0,0,0.12)] border-l-[rgba(0,0,0,0.06)] border-r-[rgba(0,0,0,0.06)] bg-white hover:bg-gray-50 px-3 py-2 gap-1"
            style={{
              boxShadow: "0px 2px 1.5px -0.5px rgba(0, 0, 0, 0.03)",
              backdropFilter: "blur(24px)",
            }}
            onClick={() => onEdit?.(data.id)}
          >
            <Pencil
              className="size-4 text-[#06B1F1] flex-shrink-0"
              strokeWidth={1.5}
            />
            <span className="text-[14px] font-normal leading-5 text-textHighEm font-[Poppins]">
              Edit
            </span>
          </Button>

          {/* Details Button */}
          <Button
            variant="outline"
            className="flex-1 h-9 rounded-[8px] border-t-[rgba(0,0,0,0.06)] border-b-[rgba(0,0,0,0.12)] border-l-[rgba(0,0,0,0.06)] border-r-[rgba(0,0,0,0.06)] bg-white hover:bg-gray-50 px-3 py-2 gap-1"
            style={{
              boxShadow: "0px 2px 1.5px -0.5px rgba(0, 0, 0, 0.03)",
              backdropFilter: "blur(24px)",
            }}
            onClick={() => onView?.(data.id)}
          >
            <Eye
              className="size-4 text-surfacePrimaryMedEm flex-shrink-0"
              strokeWidth={1.5}
            />
            <span className="text-[14px] font-normal leading-5 text-textHighEm font-[Poppins]">
              Details
            </span>
          </Button>

          {/* Cancel Button */}
          <Button
            variant="outline"
            className="flex-1 h-9 rounded-[8px] border-t-[rgba(0,0,0,0.06)] border-b-[rgba(0,0,0,0.12)] border-l-[rgba(0,0,0,0.06)] border-r-[rgba(0,0,0,0.06)] bg-white hover:bg-gray-50 px-3 py-2 gap-1"
            style={{
              boxShadow: "0px 2px 1.5px -0.5px rgba(0, 0, 0, 0.03)",
              backdropFilter: "blur(24px)",
            }}
            onClick={() => onDelete?.(data.id)}
          >
            <XCircle
              className="size-4 text-[#ED4030] flex-shrink-0"
              strokeWidth={1.5}
            />
            <span className="text-[14px] font-normal leading-5 text-textHighEm font-[Poppins]">
              Cancel
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardTransaction;
