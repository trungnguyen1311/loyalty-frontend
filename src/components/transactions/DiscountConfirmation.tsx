import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface DiscountBreakdown {
  voucherAmount: number;
  pointsAmount: number;
  totalDiscount: number;
  netPayable: number;
  pointsToEarn: number;
}

interface DiscountConfirmationProps {
  breakdown: DiscountBreakdown;
  onComplete: () => void;
  onCancel: () => void;
}

export function DiscountConfirmation({
  breakdown,
  onComplete,
  onCancel,
}: DiscountConfirmationProps) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Receipt Card */}
      <div className="relative pt-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-outlineSuccessHighEm/10 rounded-full p-1">
            <CheckCircle2 className="w-10 h-10 text-outlineSuccessHighEm" />
          </div>
        </div>

        <Card className="border-none shadow-xl overflow-visible relative">
          <CardContent className="pt-10 pb-8 px-6">
            <h2 className="text-xl font-bold text-center mb-8">
              Discount calculator
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-muted-foreground">Voucher:</span>
                <span className="font-bold">
                  €{breakdown.voucherAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-muted-foreground">Points spent:</span>
                <span className="font-bold">
                  €{breakdown.pointsAmount.toLocaleString()}
                </span>
              </div>

              <div className="h-px bg-dashed border-t-2 border-dashed border-muted my-6 relative overflow-hidden">
                {/* Visual notch effects */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 w-16 h-16 bg-[#F8F9FF] rounded-full" />
                <div className="absolute top-1/2 -translate-y-1/2 -right-10 w-16 h-16 bg-[#F8F9FF] rounded-full" />
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-lg font-black text-surfacePrimaryHighEm">
                  Total discount
                </span>
                <span className="text-xl font-black text-surfacePrimaryHighEm">
                  €{breakdown.totalDiscount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-muted text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground italic">
                Net payable: €{breakdown.netPayable.toLocaleString()}
              </p>
              <p className="text-xs font-bold text-surfacePrimaryHighEm flex items-center justify-center gap-1">
                +{breakdown.pointsToEarn} points upon completion
              </p>
            </div>
          </CardContent>

          {/* Bottom perforated edge decoration */}
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1.5 overflow-hidden px-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-[#F8F9FF] shrink-0"
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="text-center space-y-6">
        <p className="text-xs font-bold text-destructive italic max-w-[240px] mx-auto leading-relaxed">
          Please ensure payment is completed on POS first
        </p>

        <div className="space-y-3">
          <Button
            className="w-full h-14 text-base font-bold shadow-xl"
            onClick={onComplete}
          >
            Mark transaction as complete
          </Button>
          <button
            onClick={onCancel}
            className="w-full text-sm font-bold text-surfacePrimaryHighEm hover:underline py-2"
          >
            Cancel transaction
          </button>
        </div>
      </div>
    </div>
  );
}
