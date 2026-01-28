import React from "react";
import { X, Diamond } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TransactionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onVoid: () => void;
  transactionData?: {
    staff: string;
    voucher?: string;
    billValue: string;
    pointsSpent: string;
    pointsEarned: string;
    date: string;
    status: "Completed" | "Pending" | "Cancelled";
    customer: {
      name: string;
      email: string;
      level: string;
      points: string;
      avatarUrl?: string;
    };
  };
}

const DEFAULT_DATA: TransactionDetailsDialogProps["transactionData"] = {
  staff: "Megan Roberts",
  voucher: "15%",
  billValue: "€100",
  pointsSpent: "-10",
  pointsEarned: "+2",
  date: "22 Oct 2025, 3:30 PM",
  status: "Completed",
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
  const data = {
    ...DEFAULT_DATA,
    ...transactionData,
    customer: { ...DEFAULT_DATA?.customer, ...transactionData?.customer },
  };
  const {
    staff,
    voucher,
    billValue,
    pointsSpent,
    pointsEarned,
    date,
    status,
    customer,
  } = data as Required<TransactionDetailsDialogProps>["transactionData"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[830px] p-0 bg-white backdrop-blur-[24px] rounded-[16px] border-black/[0.03] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_20px_20px_-12px_rgba(0,0,0,0.03),0px_32px_32px_-16px_rgba(0,0,0,0.03)] overflow-hidden gap-0 [&>button]:hidden"
        aria-describedby={undefined}
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-[20px] top-[20px] w-[32px] h-[32px] flex items-center justify-center bg-white border border-surfaceSpecialLightS3DarkS4 rounded-[8px] hover:bg-gray-100 transition-colors z-10 text-textMedEm"
        >
          <X size={18} />
        </button>

        <div className="p-[48px] pt-[38px] pb-[48px]">
          <div className="flex gap-[24px] items-start">
            {/* Left Column: Transaction Details */}
            <div className="flex-1 flex flex-col gap-[16px]">
              <DialogTitle className="text-[20px] font-medium text-textPrimary leading-[38px] tracking-tight">
                Transaction details
              </DialogTitle>

              <div className="flex flex-col gap-[13px]">
                <DetailRow label="Staff" value={staff} />
                <DetailRow
                  label="Voucher"
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
                <DetailRow label="Bill value" value={billValue} />
                <DetailRow label="Points spent" value={pointsSpent} />
                <DetailRow label="Points earned" value={pointsEarned} />
                <DetailRow label="Date" value={date} />
                <DetailRow
                  label="Status"
                  value={
                    <Badge className="bg-surfaceSuccessBaseEmAlpha text-outlineSuccessHighEm border-none shadow-none font-medium text-[14px] px-[12px] py-[3px] h-[28px] rounded-[8px] hover:bg-surfaceSuccessBaseEmAlpha">
                      {status}
                    </Badge>
                  }
                />
              </div>
            </div>

            {/* Right Column: Member Info Card */}
            <div className="w-[352px] bg-surfacePrimaryBaseEm rounded-[16px] p-[24px] flex flex-col items-center gap-[16px]">
              <div className="relative">
                <div className="w-[84px] h-[84px] rounded-full border-[3px] border-white shadow-sm overflow-hidden">
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

              <div className="flex flex-col items-center gap-[4px] text-center">
                <h3 className="text-[18px] font-semibold text-textHighEm tracking-[-0.02em] leading-[24px]">
                  {customer.name}
                </h3>
                <p className="text-[16px] text-textSecondary font-regular leading-[24px]">
                  {customer.email}
                </p>
              </div>

              {/* Stats Row */}
              <div className="w-full bg-white rounded-[12px] p-[12px_16px] flex items-center justify-between shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03)] h-[59px]">
                <div className="flex items-center gap-[8px] flex-1">
                  <Diamond
                    size={16}
                    className="text-[#574ADB]"
                    fill="#574ADB"
                  />
                  <span className="text-[16px] text-textSecondary font-regular">
                    Level
                  </span>
                  <span className="text-[16px] font-semibold text-[#E4A000] ml-auto">
                    {customer.level}
                  </span>
                </div>

                <div className="mx-[16px] w-[1px] h-[35px] bg-black/[0.1]" />

                <div className="flex items-center gap-[8px] flex-1">
                  <Diamond
                    size={16}
                    className="text-[#574ADB]"
                    fill="#574ADB"
                  />
                  <span className="text-[16px] text-textSecondary font-regular">
                    Points
                  </span>
                  <span className="text-[16px] font-semibold text-[#338732] ml-auto">
                    {customer.points}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="mt-[24px] flex flex-col items-center gap-[12px]">
            <Button
              onClick={onEdit}
              className="w-full h-[48px] bg-surfacePrimaryMedEm hover:bg-surfacePrimaryHighEm text-white rounded-[12px] text-[16px] font-medium shadow-none border-none"
            >
              Edit
            </Button>
            <button
              onClick={onVoid}
              className="text-[#574ADB] text-[16px] font-medium hover:underline transition-all py-[8px] leading-[24px]"
            >
              Void transaction
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center min-h-[22px]">
      <span className="w-[150px] text-[16px] text-textSecondary font-regular leading-[22px]">
        {label}
      </span>
      <div className="text-[16px] text-textPrimary font-regular flex-1 leading-[22px]">
        {value}
      </div>
    </div>
  );
}
