import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TransactionConfig } from "@/components/transactions/TransactionConfig";
import { BillPinModal } from "@/components/transactions/BillPinModal";
import { DiscountConfirmation } from "@/components/transactions/DiscountConfirmation";

// bundle-barrel-imports: Direct imports instead of barrel

type TransactionStep = "CONFIG" | "CONFIRMATION";

export const NewTransactionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer, voucher } = location.state || {};

  // rerender-lazy-state-init: Use function for expensive initial values
  const [step, setStep] = useState<TransactionStep>(() => "CONFIG");
  const [isPinModalOpen, setIsPinModalOpen] = useState(() => false);
  const [pointsUsed, setPointsUsed] = useState(() => 0);

  // Mock calculation logic
  const [discountBreakdown, setDiscountBreakdown] = useState(() => ({
    voucherAmount: 0,
    pointsAmount: 0,
    totalDiscount: 0,
    netPayable: 0,
    pointsToEarn: 0,
  }));

  // Redirect if no customer data
  if (!customer) {
    navigate("/scan-voucher");
    return null;
  }

  // rerender-defer-reads: Extract event handlers to useCallback
  const handleNextFromConfig = useCallback((points: number) => {
    setPointsUsed(points);
    setIsPinModalOpen(true);
  }, []);

  const handlePinSubmit = useCallback((values: { billValue: number; pin: string }) => {
    console.log("Submitting bill and PIN:", values);

    // Simulate discount calculation
    const vAmount = voucher ? values.billValue * 0.15 : 0; // Using 15% from mock
    const pAmount = pointsUsed / 10; // 10 points = €1
    const total = vAmount + pAmount;

    setDiscountBreakdown({
      voucherAmount: vAmount,
      pointsAmount: pAmount,
      totalDiscount: total,
      netPayable: Math.max(0, values.billValue - total),
      pointsToEarn: Math.floor(values.billValue / 10), // Earn 1 point per €10
    });

    setIsPinModalOpen(false);
    setStep("CONFIRMATION");
  }, [voucher, pointsUsed]);

  const handleComplete = useCallback(() => {
    console.log("Transaction marked as complete");
    navigate("/home");
  }, [navigate]);

  const handleCancel = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F8F9FF] p-6 pb-24">
      <div className="max-w-md mx-auto h-full flex flex-col justify-center">
        {step === "CONFIG" && (
          <TransactionConfig
            customer={customer}
            voucher={voucher}
            onNext={handleNextFromConfig}
            onCancel={handleCancel}
          />
        )}

        {step === "CONFIRMATION" && (
          <DiscountConfirmation
            breakdown={discountBreakdown}
            onComplete={handleComplete}
            onCancel={handleCancel}
          />
        )}

        <BillPinModal
          open={isPinModalOpen}
          onOpenChange={setIsPinModalOpen}
          onSubmit={handlePinSubmit}
        />
      </div>
    </div>
  );
};

// No displayName needed for regular function component
