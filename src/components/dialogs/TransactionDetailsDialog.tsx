import React from "react";
import {
  X,
  Diamond,
  User,
  Ticket,
  Receipt,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MockTransaction } from "@/pages/TransactionPage";
import { cn } from "@/lib/utils";

interface TransactionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onVoid: () => void;
  transactionData?: MockTransaction;
}

const DEFAULT_DATA: MockTransaction = {
  id: "default",
  staffName: "Megan Roberts",
  voucher: "15%",
  bill: { amount: 100, currency: "€" },
  pointsSpent: "-10",
  pointsEarned: "+2",
  date: "22 Oct 2025",
  time: "3:30 PM",
  status: "completed",
  customer: {
    name: "Cameron Williamson",
    email: "Cameron.Williamson@example.com",
    level: "Gold",
    points: "2,500",
    avatarUrl: "https://i.pravatar.cc/150?u=cameron",
  },
};

export function TransactionDetailsDialog({
  open,
  onOpenChange,
  onEdit,
  onVoid,
  transactionData = DEFAULT_DATA,
}: TransactionDetailsDialogProps) {
  const data = transactionData || DEFAULT_DATA;
  const {
    staffName: staff,
    voucher,
    bill,
    pointsSpent,
    pointsEarned,
    date,
    time,
    status,
    customer,
  } = data;

  const billValue = `${bill.currency}${bill.amount}`;
  const fullDate = `${date}, ${time}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[calc(100%-32px)] md:max-w-[830px] p-0 bg-white backdrop-blur-[24px] rounded-[20px] md:rounded-[16px] border-black/[0.03] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_20px_20px_-12px_rgba(0,0,0,0.03),0px_32px_32px_-16px_rgba(0,0,0,0.03)] overflow-hidden gap-0 [&>button]:hidden"
        aria-describedby={undefined}
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-[20px] top-[20px] w-[32px] h-[32px] flex items-center justify-center bg-white border border-surfaceSpecialLightS3DarkS4 rounded-[8px] hover:bg-gray-100 transition-colors z-10 text-textMedEm"
        >
          <X size={18} />
        </button>

        <div className="p-[20px] pt-[16px] pb-[20px] md:p-[48px] md:pt-[38px] md:pb-[48px]">
          {/* Title - Mobile centered */}
          <DialogTitle className="text-[18px] md:text-[20px] font-semibold md:font-medium text-textHighEm md:text-textPrimary leading-[24px] md:leading-[38px] tracking-tight text-center md:text-left md:hidden mb-[16px]">
            Transaction details
          </DialogTitle>

          <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] items-stretch md:items-start">
            {/* Left Column: Transaction Details */}
            {/* Transaction Details - Order 2 on mobile */}
            <div className="flex-1 flex flex-col gap-[16px] order-2 md:order-1">
              <DialogTitle className="hidden md:block text-[20px] font-medium text-textPrimary leading-[38px] tracking-tight">
                Transaction details
              </DialogTitle>

              <div className="flex flex-col gap-[12px] md:gap-[13px]">
                <DetailRow
                  label="Staff"
                  value={staff}
                  icon={<User size={18} className="text-textMedEm" />}
                />
                <DetailRow
                  label="Voucher"
                  icon={<Ticket size={18} className="text-textMedEm" />}
                  value={
                    voucher ? (
                      <Badge className="bg-warningOMain text-warningMain border-none shadow-none font-medium text-[14px] px-[8px] py-[1px] h-[28px] rounded-[4px] hover:bg-warningOMain">
                        {voucher}
                      </Badge>
                    ) : (
                      "-"
                    )
                  }
                />
                <DetailRow
                  label="Bill value"
                  value={billValue}
                  icon={<Receipt size={18} className="text-textMedEm" />}
                />
                <DetailRow
                  label="Points spent"
                  value={pointsSpent}
                  icon={
                    <ArrowDownCircle size={18} className="text-textMedEm" />
                  }
                />
                <DetailRow
                  label="Points earned"
                  value={pointsEarned}
                  icon={<ArrowUpCircle size={18} className="text-textMedEm" />}
                />
                <DetailRow
                  label="Date"
                  value={fullDate}
                  icon={<Calendar size={18} className="text-textMedEm" />}
                />
                <DetailRow
                  label="Status"
                  icon={<CheckCircle size={18} className="text-textMedEm" />}
                  value={
                    <Badge
                      className={cn(
                        "border-none shadow-none font-medium text-[14px] px-[12px] py-[3px] h-[28px] rounded-[8px]",
                        status === "completed"
                          ? "bg-surfaceSuccessBaseEmAlpha text-outlineSuccessHighEm hover:bg-surfaceSuccessBaseEmAlpha"
                          : "bg-[#ED4030]/15 text-[#DF2917] hover:bg-[#ED4030]/25",
                      )}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  }
                />
              </div>
            </div>

            {/* Member Info Card - Order 1 on mobile (shows first) */}
            <div className="w-full md:w-[352px] bg-surfacePrimaryBaseEm rounded-[16px] p-[16px] md:p-[24px] flex flex-col items-center gap-[12px] md:gap-[16px] order-1 md:order-2">
              <div className="relative">
                <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full border-[3px] border-white shadow-sm overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={customer.avatarUrl}
                      alt={customer.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{customer.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="flex flex-col items-center gap-[2px] md:gap-[4px] text-center">
                <h3 className="text-[16px] md:text-[18px] font-semibold text-textHighEm tracking-[-0.02em] leading-[24px]">
                  {customer.name}
                </h3>
                <p className="text-[14px] md:text-[16px] text-textSecondary font-regular leading-[20px] md:leading-[24px]">
                  {customer.email}
                </p>
              </div>

              {/* Stats Row */}
              <div className="w-full bg-white rounded-[12px] p-[10px_12px] md:p-[12px_16px] flex items-center justify-between shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03)] h-auto md:h-[59px]">
                <div className="flex items-center gap-[6px] md:gap-[8px] flex-1">
                  <Diamond
                    size={14}
                    className="text-[#574ADB] shrink-0 md:w-[16px] md:h-[16px]"
                    fill="#574ADB"
                  />
                  <span className="text-[14px] md:text-[16px] text-textSecondary font-regular">
                    Level
                  </span>
                  <span className="text-[14px] md:text-[16px] font-semibold text-[#E4A000] ml-auto">
                    {customer.level}
                  </span>
                </div>

                <div className="mx-[12px] md:mx-[16px] w-[1px] h-[28px] md:h-[35px] bg-black/[0.1]" />

                <div className="flex items-center gap-[6px] md:gap-[8px] flex-1">
                  <Diamond
                    size={14}
                    className="text-[#574ADB] shrink-0 md:w-[16px] md:h-[16px]"
                    fill="#574ADB"
                  />
                  <span className="text-[14px] md:text-[16px] text-textSecondary font-regular">
                    Points
                  </span>
                  <span className="text-[14px] md:text-[16px] font-semibold text-[#338732] ml-auto">
                    {customer.points}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          {/* Actions Footer */}
          {status === "voided" && (
            <div className="mt-[16px] md:mt-[24px] w-full bg-[#2F2B3D0F] rounded-xs p-[12px] md:p-md flex flex-col gap-1 md:gap-2">
              <div className="text-[14px] md:text-[15px] font-medium text-[#2f2b3d]/70 leading-[20px] md:leading-[22px]">
                Incorrect Bill Amount
              </div>
              <div className="text-[13px] md:text-[15px] font-normal text-[#2f2b3d]/40 leading-[18px] md:leading-[22px]">
                Updated by manager: David Johnson | 22 Oct 2025, 3:40 PM
              </div>
            </div>
          )}

          {status !== "voided" && data.editHistory && (
            <div className="mt-[16px] md:mt-[24px] w-full bg-[#2F2B3D0F] rounded-xs p-[12px] md:p-[16px_16px_24px] flex flex-col gap-1 md:gap-2">
              <div className="text-[14px] md:text-[15px] font-medium text-[#2f2b3d]/70 leading-[20px] md:leading-[22px]">
                {data.editHistory.reason}
              </div>
              <div className="text-[13px] md:text-[15px] font-normal text-[#2f2b3d]/40 leading-[18px] md:leading-[22px]">
                {data.editHistory.description}
              </div>
              <div className="text-[13px] md:text-[15px] font-normal text-[#2f2b3d]/40 leading-[18px] md:leading-[22px]">
                Updated by manager: {data.editHistory.updatedBy} |{" "}
                {data.editHistory.date}
              </div>
            </div>
          )}

          {status !== "voided" && (
            <div className="mt-[16px] md:mt-[24px] flex flex-col items-center gap-[8px] md:gap-[12px]">
              <Button
                onClick={onEdit}
                className="w-full h-[44px] md:h-[48px] bg-surfacePrimaryMedEm hover:bg-surfacePrimaryHighEm text-white rounded-[12px] text-[16px] font-medium shadow-none border-none"
              >
                Edit
              </Button>
              <button
                onClick={onVoid}
                className="text-[#574ADB] text-[16px] font-medium hover:underline transition-all py-[6px] md:py-[8px] leading-[24px]"
              >
                Void transaction
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center min-h-[28px] md:min-h-[22px] gap-[8px] md:gap-0">
      {/* Icon - Only visible on mobile */}
      {icon && (
        <span className="md:hidden flex-shrink-0 w-[20px] flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="w-[100px] md:w-[150px] text-[14px] md:text-[16px] text-textSecondary font-regular leading-[20px] md:leading-[22px]">
        {label}
      </span>
      <div className="text-[14px] md:text-[16px] text-textPrimary font-regular flex-1 leading-[20px] md:leading-[22px] text-right md:text-left">
        {value}
      </div>
    </div>
  );
}
