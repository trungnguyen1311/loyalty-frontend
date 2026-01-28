import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Banknote, X } from "lucide-react";

interface PinEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billValue: string;
  onBillValueChange: (value: string) => void;
  pin: string[];
  onPinChange: (index: number, value: string) => void;
  onPinKeyDown: (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  onSubmit: () => void;
}

export function PinEntryDialog({
  open,
  onOpenChange,
  billValue,
  onBillValueChange,
  pin,
  onPinChange,
  onPinKeyDown,
  onSubmit,
}: PinEntryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[361px] h-[400px] p-0 bg-white backdrop-blur-[24px] rounded-[20px] border-black/[0.03] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_20px_20px_-12px_rgba(0,0,0,0.03),0px_32px_32px_-16px_rgba(0,0,0,0.03)] overflow-hidden gap-0 [&>button]:hidden text-textHighEm"
        data-node-id="39:625"
        aria-describedby={undefined}
      >
        {/* Modal Header */}
        <DialogHeader
          className="h-[56px] flex flex-row items-center justify-between px-[20px] py-[16px] relative space-y-0"
          data-node-id="39:627"
        >
          <div className="flex-1" />
          <DialogTitle
            className="text-[16px] font-medium text-textHighEm leading-[24px] text-center absolute left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-80px)]"
            data-node-id="39:631"
          >
            Enter PIN to calculate discount
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-[12px] top-[12px] w-[32px] h-[32px] flex items-center justify-center bg-neutral100 border border-surfaceSpecialLightS3DarkS4 rounded-[8px] hover:bg-gray200 transition-colors z-10 text-textMedEm"
            data-node-id="39:632"
          >
            <X size={18} />
          </button>
        </DialogHeader>

        {/* Modal Content */}
        <div className="p-[24px_20px] flex flex-col justify-between">
          {/* Bill Value Input Group */}
          <div
            className="w-full h-[80px] flex flex-col gap-[12px]"
            data-node-id="39:671"
          >
            <label
              className="text-[14px] font-medium text-textHighEm text-center"
              data-node-id="39:673"
            >
              Enter bill value
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={billValue}
                onChange={(e) => onBillValueChange(e.target.value)}
                className="text-center text-[16px] font-bold h-[48px] rounded-[12px] border-surfaceSpecialLightS3DarkS4 focus-visible:ring-surfacePrimaryHighEm pr-[24px]"
                icon={<Banknote size={20} />}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    document?.getElementById("pin-input-0")?.focus();
                  }
                }}
              />
            </div>
          </div>

          {/* PIN Input Group */}
          <div
            className="w-full h-[84px] flex flex-col gap-[12px] mt-[20px]"
            data-node-id="39:679"
          >
            <label
              className="text-[14px] font-medium text-textHighEm text-center"
              data-node-id="39:681"
            >
              Enter your PIN
            </label>
            <div
              className="flex justify-between gap-[8px]"
              data-node-id="39:682"
            >
              {pin.map((digit: string, idx: number) => (
                <Input
                  key={idx}
                  id={"pin-input-" + idx}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  placeholder="-"
                  onChange={(e) => onPinChange(idx, e.target.value)}
                  onKeyDown={(e) => onPinKeyDown(idx, e)}
                  className="w-full h-[52px] max-w-[46.8px] rounded-[12px] text-center text-[22px] font-medium border-surfaceSpecialLightS3DarkS4 focus-visible:ring-surfacePrimaryHighEm px-0"
                  data-node-id={"39:68" + (3 + idx)}
                />
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full mt-[68px]" data-node-id="39:653">
            <Button
              onClick={onSubmit}
              className="w-full h-[40px] bg-surfacePrimaryMedEm hover:bg-surfacePrimaryHighEm text-white rounded-[10px] text-[14px] font-medium flex items-center justify-center shadow-none border-none"
              data-node-id="39:654"
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
