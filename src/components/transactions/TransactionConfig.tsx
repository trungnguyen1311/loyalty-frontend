import { memo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Diamond, CircleDollarSign } from "lucide-react";

// bundle-barrel-imports: Direct imports instead of barrel

interface Customer {
  id: string;
  name: string;
  level: string;
  points: number;
  avatar: string;
}

interface Voucher {
  code: string;
  name: string;
  discount: string;
}

interface TransactionConfigProps {
  customer: Customer;
  voucher?: Voucher;
  onNext: (pointsToUse: number) => void;
  onCancel: () => void;
}

export const TransactionConfig = memo(
  ({ customer, voucher, onNext, onCancel }: TransactionConfigProps) => {
    const [pointsToUse, setPointsToUse] = useState(0);

    return (
      <div className="w-full max-w-lg mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Customer summary card */}
        <Card className="bg-muted/30 border-none overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-sm overflow-hidden bg-brand-primary/10 flex items-center justify-center">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold">{customer.name}</h2>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white rounded-2xl p-3 flex items-center justify-center gap-2 shadow-sm">
                  <Diamond
                    className="w-4 h-4 text-brand-primary"
                    fill="currentColor"
                  />
                  <span className="text-sm font-medium text-muted-foreground mr-1">
                    Level
                  </span>
                  <span className="text-sm font-bold text-brand-warning">
                    {customer.level}
                  </span>
                </div>
                <div className="bg-white rounded-2xl p-3 flex items-center justify-center gap-2 shadow-sm">
                  <CircleDollarSign className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm font-medium text-muted-foreground mr-1">
                    Points
                  </span>
                  <span className="text-sm font-bold text-brand-success">
                    {customer.points.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voucher card */}
        {voucher && (
          <div className="relative group">
            <div className="flex bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50">
              {/* Left side label */}
              <div className="bg-brand-primary text-white w-12 flex items-center justify-center py-4 relative">
                <span className="font-bold text-xs uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
                  VOUCHER
                </span>
                {/* Decorative notches */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-white rounded-full group-hover:scale-110 transition-transform" />
              </div>

              {/* Content */}
              <div className="flex-1 p-5 pl-8">
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  {voucher.name}
                </p>
                <h3 className="text-2xl font-black text-brand-dark mb-2">
                  Discount: {voucher.discount}
                </h3>
                <p className="inline-block px-3 py-1 bg-muted rounded-lg text-xs font-mono font-bold text-brand-primary">
                  {voucher.code}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Points usage slider */}
        <div className="space-y-4 px-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-brand-dark">
              Use points
            </span>
            <span className="px-3 py-1 bg-brand-primary/10 rounded-full text-brand-primary font-bold">
              {pointsToUse.toLocaleString()}
            </span>
          </div>

          <Slider
            defaultValue={[0]}
            max={customer.points}
            step={10}
            onValueChange={(vals) => setPointsToUse(vals[0])}
            className="pb-6"
          />

          <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-1">
            <span>0</span>
            <span>{(customer.points / 4).toLocaleString()}</span>
            <span>{(customer.points / 2).toLocaleString()}</span>
            <span>{(customer.points * 0.75).toLocaleString()}</span>
            <span>{customer.points.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button
            className="w-full h-14 text-base font-bold shadow-xl bg-brand-primary-light hover:bg-brand-primary"
            onClick={() => onNext(pointsToUse)}
          >
            Next
          </Button>
          <button
            onClick={onCancel}
            className="w-full text-sm font-bold text-brand-primary hover:underline py-2"
          >
            Cancel transaction
          </button>
        </div>
      </div>
    );
  },
);

TransactionConfig.displayName = "TransactionConfig";
