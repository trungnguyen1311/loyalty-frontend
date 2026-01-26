import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banknote } from "lucide-react";

// bundle-barrel-imports: Direct imports instead of barrel

const formSchema = z.object({
  billValue: z
    .number({ invalid_type_error: "Please enter a valid amount" })
    .min(1, "Bill must be greater than 0"),
  pin: z
    .string()
    .length(6, "PIN must be exactly 6 digits")
    .regex(/^\d+$/, "PIN must be numeric"),
});

type FormValues = z.infer<typeof formSchema>;

interface BillPinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValues) => void;
}

export const BillPinModal = memo(
  ({ open, onOpenChange, onSubmit }: BillPinModalProps) => {
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        pin: "",
      },
    });

    const pin = watch("pin");

    const handlePinChange = (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;

      const currentPinArr = pin.split("");
      currentPinArr[index] = value.slice(-1);
      const newPin = currentPinArr.join("");
      setValue("pin", newPin);

      // Focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        nextInput?.focus();
      }
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (e.key === "Backspace" && !pin[index] && index > 0) {
        const prevInput = document.getElementById(`pin-${index - 1}`);
        prevInput?.focus();
      }
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 gap-8">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Enter PIN to calculate discount
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Bill input */}
            <div className="space-y-3">
              <Label className="text-sm font-bold block text-center">
                Enter bill value
              </Label>
              <div className="relative">
                <Input
                  {...register("billValue", { valueAsNumber: true })}
                  type="number"
                  placeholder="0.00"
                  className="text-center text-lg font-bold h-14 rounded-2xl border-2 focus-visible:ring-brand-primary"
                  icon={<Banknote className="w-5 h-5" />}
                />
              </div>
              {errors.billValue && (
                <p className="text-xs text-brand-error text-center font-medium">
                  {errors.billValue.message}
                </p>
              )}
            </div>

            {/* PIN input */}
            <div className="space-y-3">
              <Label className="text-sm font-bold block text-center">
                Enter your PIN
              </Label>
              <div className="flex justify-between gap-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    id={`pin-${idx}`}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-full aspect-square border-2 rounded-xl text-center text-xl font-bold focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                    value={pin[idx] || ""}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    autoComplete="off"
                  />
                ))}
              </div>
              {errors.pin && (
                <p className="text-xs text-brand-error text-center font-medium">
                  {errors.pin.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-base font-bold rounded-2xl shadow-lg bg-brand-primary-light hover:bg-brand-primary"
            >
              Next
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  },
);

BillPinModal.displayName = "BillPinModal";
