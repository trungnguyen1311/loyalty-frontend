import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface VoidTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  customerName?: string;
}

export function VoidTransactionDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  customerName = "Wallbridge’s",
}: VoidTransactionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[361px] p-0 bg-white backdrop-blur-[24px] rounded-[20px] border-black/[0.03] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_20px_20px_-12px_rgba(0,0,0,0.03),0px_32px_32px_-16px_rgba(0,0,0,0.03)] overflow-hidden gap-0 [&>button]:hidden focus:outline-none"
        aria-describedby={undefined}
      >
        <div className="flex flex-col items-center w-full">
          {/* Header */}
          <div className="flex flex-col gap-[8px] items-center px-[20px] py-[16px] w-full">
            {/* Icon */}
            <div className="py-[12px] flex items-center justify-center">
              <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[10px] bg-surfaceDangerBaseEmAlpha">
                <div className="w-[28px] h-[28px] rounded-full border-[1.5px] border-[#ED4030] flex items-center justify-center">
                  <X size={16} className="text-[#ED4030]" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Text Wrap */}
            <div className="flex flex-col gap-[8px] items-center text-center w-full">
              <DialogTitle className="text-title-2 font-semibold text-textHighEm tracking-tight">
                Void Transactions
              </DialogTitle>
              <p className="text-body-1 font-regular text-textHighEm">
                Are you sure you want to cancel the <br /> {customerName}{" "}
                transaction?
              </p>
            </div>
          </div>

          {/* Input Cell */}
          <div className="px-[26px] w-full">
            <Select>
              <SelectTrigger className="w-full bg-white border border-[#000000]/[0.09] rounded-[12px] h-[48px] px-[12px] py-[12px] text-body-2 text-textLowEm font-normal shadow-none focus:ring-0">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incorrect_bill">
                  Incorrect Bill Amount
                </SelectItem>
                <SelectItem value="customer_request">
                  Customer Request (Changed Mind)
                </SelectItem>
                <SelectItem value="error">Entry Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-[16px] px-[20px] py-[24px] w-full">
            <div className="flex gap-[12px] w-full">
              <button
                onClick={() => {
                  onCancel?.();
                  onOpenChange(false);
                }}
                className="flex-1 h-[40px] flex items-center justify-center rounded-[10px] bg-[#f2f2f4]/80 text-[#0a0c11] text-[14px] font-medium leading-[20px] shadow-[0px_2px_1.5px_0px_rgba(0,0,0,0.03)] border border-black/[0.06] hover:bg-[#e4e4e7] backdrop-blur-[12px] transition-colors"
              >
                No
              </button>
              <button
                onClick={() => {
                  onConfirm?.();
                  onOpenChange(false);
                }}
                className="flex-1 h-[40px] flex items-center justify-center rounded-[10px] bg-[#6f61ff] text-white text-[14px] font-medium leading-[20px] shadow-[0px_2px_1.5px_0px_rgba(0,0,0,0.03)] border border-black/[0.09] hover:bg-[#5e52d6] backdrop-blur-[12px] transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
