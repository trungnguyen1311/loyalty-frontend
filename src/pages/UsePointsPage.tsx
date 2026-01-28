import { Button } from "@/components/ui/button";
import { PinEntryDialog } from "@/components/dialogs/PinEntryDialog";
import { TransactionDetailsDialog } from "@/components/dialogs/TransactionDetailsDialog";
import { DiscountCalculationCard } from "@/components/common/DiscountCalculationCard";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@/assets/images/avatar.svg";

// Mock customer data
const mockCustomer = {
  id: "1",
  name: "Cameron Williamson",
  level: "Gold",
  points: 2500,
  avatar: Avatar,
};

const DiamondIcon = () => (
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M11.0272 0.481781L12.9753 2.701C13.4274 3.21601 13.4543 3.98367 13.0394 4.52984L7.79025 11.4398C7.22281 12.1867 6.11052 12.1867 5.54309 11.4398L0.293969 4.52984C-0.12093 3.98367 -0.0940268 3.21601 0.358062 2.701L2.30612 0.481781C2.57513 0.175334 2.96071 0 3.36561 0H5.40663H8.08421H9.96772C10.3726 0 10.7582 0.175334 11.0272 0.481781Z"
      fill="currentColor"
    />
  </svg>
);

const PointsIcon = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.66667 0C2.98467 0 0 2.98467 0 6.66667C0 10.3487 2.98467 13.3333 6.66667 13.3333C10.3487 13.3333 13.3333 10.3487 13.3333 6.66667C13.3333 2.98467 10.3487 0 6.66667 0ZM6.66667 0.666667C6.66667 2.25797 6.03453 3.78409 4.90931 4.90931C3.78409 6.03453 2.25797 6.66667 0.666667 6.66667C2.25797 6.66667 3.78409 7.29881 4.90931 8.42403C6.03453 9.54924 6.66667 11.0754 6.66667 12.6667C6.66667 11.0754 7.29881 9.54924 8.42403 8.42403C9.54924 7.29881 11.0754 6.66667 12.6667 6.66667C11.0754 6.66667 9.54924 6.03453 8.42403 4.90931C7.29881 3.78409 6.66667 2.25797 6.66667 0.666667Z"
      fill="currentColor"
    />
  </svg>
);

type ScreenState = "SLIDER" | "CONFIRMATION";

export const UsePointsPage = () => {
  const navigate = useNavigate();
  const [screenState, setScreenState] = useState<ScreenState>(() => "SLIDER");
  const [pointsToUse, setPointsToUse] = useState(() => 30);
  const [showPinModal, setShowPinModal] = useState(() => false);
  const [billValue, setBillValue] = useState(() => "");
  const [pin, setPin] = useState(() => ["", "", "", "", "", ""]);
  const [hasVoucher] = useState(() => true);
  const [showTransactionDetails, setShowTransactionDetails] = useState(
    () => false,
  );

  const mockVoucher = {
    name: "New Brand Opening",
    discount: "15%",
    code: "ABC-XYZ-123",
  };

  const discountData = {
    voucher: hasVoucher ? 75 : 0,
    pointsSpent: 50,
    totalDiscount: (hasVoucher ? 75 : 0) + 50,
    netPayable: 450 - (hasVoucher ? 75 : 0),
    pointsToEarn: 4,
  };

  const handleSliderChange = (value: number[]) => {
    setPointsToUse(value[0]);
  };

  const handleNextFromSlider = () => {
    setShowPinModal(true);
  };

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 5) {
      const nextInput = document.getElementById("pin-input-" + (index + 1));
      nextInput?.focus();
    }
  };

  const handlePinKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById("pin-input-" + (index - 1));
      prevInput?.focus();
    }
  };

  const handlePinSubmit = () => {
    setShowPinModal(false);
    setScreenState("CONFIRMATION");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const tickLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="mt-4 min-h-screen min-h-dvh flex">
      <div
        className="w-full bg-white rounded-[16px] shadow-sm flex flex-col items-center p-[48px] gap-[24px]"
        data-node-id="33:1729"
      >
        {/* User Card Section */}
        <div
          className="w-full bg-neutral100 rounded-[12px] px-[16px] py-[14px] flex flex-col items-center justify-center gap-[14px]"
          data-node-id="34:20"
        >
          {/* Avatar & Name Row */}
          <div
            className="flex items-center justify-center gap-[11px] w-full"
            data-node-id="34:21"
          >
            <div
              className="relative rounded-full shrink-0 w-[48px] h-[48px] shadow-[0_4px_12px_rgba(87,74,219,0.1)] overflow-hidden"
              data-node-id="34:22"
            >
              <img
                src={mockCustomer.avatar}
                alt={mockCustomer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="text-textHighEm font-semibold text-[18px] leading-[24px]"
              data-node-id="34:24"
            >
              {mockCustomer.name}
            </span>
          </div>

          {/* Level & Points Row */}
          <div
            className="w-full bg-white rounded-[16px] flex items-center px-[12px] py-[8px] h-[51px]"
            data-node-id="34:25"
          >
            {/* Level Group */}
            <div
              className="flex-[1_0_0] flex items-center justify-center gap-[8px]"
              data-node-id="34:27"
            >
              <div className="flex items-center gap-[6px]" data-node-id="34:28">
                <div className="text-surfacePrimaryHighEm">
                  <DiamondIcon />
                </div>
                <span className="text-[16px] font-medium text-textMedEm leading-[24px]">
                  Level
                </span>
              </div>
              <span className="text-[18px] font-semibold text-textWarningHighEm leading-[24px]">
                {mockCustomer.level}
              </span>
            </div>

            {/* Divider */}
            <div
              className="w-[1px] h-[35px] bg-black/10"
              data-node-id="34:32"
            />

            {/* Points Group */}
            <div
              className="flex-[1_0_0] flex items-center justify-center gap-[8px]"
              data-node-id="34:33"
            >
              <div className="flex items-center gap-[6px]" data-node-id="34:34">
                <div className="text-surfacePrimaryHighEm">
                  <PointsIcon />
                </div>
                <span className="text-[16px] font-medium text-textMedEm leading-[24px]">
                  Points
                </span>
              </div>
              <span className="text-[18px] font-semibold text-outlineSuccessHighEm leading-[24px]">
                {mockCustomer.points.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Voucher Section */}
        {hasVoucher && (
          <div
            className="w-[329px] h-[118px] bg-white relative rounded-[16px] overflow-hidden shadow-elevationShadow flex"
            data-node-id="36:45"
          >
            {/* Left Side (Purple Section) */}
            <div
              className="w-[59px] h-full bg-surfacePrimaryMedEm relative flex items-center justify-center shrink-0 z-10"
              data-node-id="36:48"
            >
              <span className="z-10 text-white text-[14px] font-semibold uppercase tracking-[0.1em] -rotate-90 whitespace-nowrap">
                VOUCHER
              </span>

              {/* Notch - Half circle on the right edge of purple part */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-[-14px] w-[28px] h-[28px] bg-white rounded-full z-20 shadow-[inset_-1px_0_2px_rgba(0,0,0,0.03)]"
                style={{
                  clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                }}
              />
            </div>

            {/* Right Side (Content Section) */}
            <div
              className="flex-1 flex flex-col justify-center px-[24px] relative z-10 border-l border-surfaceSpecialLightS3DarkS4"
              data-node-id="36:50"
            >
              <p className="text-[14px] text-textMedEm font-normal leading-[20px] mb-[2px]">
                {mockVoucher.name}
              </p>
              <h3 className="text-[26px] font-bold text-textHighEm leading-[32px] tracking-[-0.02em]">
                Discount: {mockVoucher.discount}
              </h3>
              <p className="text-[16px] text-textHighEm font-normal leading-[24px] mt-[4px]">
                {mockVoucher.code}
              </p>
            </div>
          </div>
        )}

        {screenState === "SLIDER" && (
          <div className="w-full flex flex-col gap-[16px]">
            {/* Slider Section */}
            <div className="w-full">
              <label className="block text-[16px] font-medium text-textHighEm mb-[16px]">
                Use points
              </label>

              <div className="relative h-[24px] flex items-center">
                <Slider
                  min={0}
                  max={100}
                  step={10}
                  value={[pointsToUse]}
                  onValueChange={handleSliderChange}
                  className="w-full"
                />
              </div>

              {/* Slider Labels */}
              <div className="flex justify-between mt-[12px] px-[2px]">
                {tickLabels.map((tick) => (
                  <span
                    key={tick}
                    className="text-[14px] text-textLowEm font-normal"
                  >
                    {tick}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="w-full flex flex-col gap-[12px] mt-[16px]">
              <Button
                onClick={handleNextFromSlider}
                className="w-full h-[48px] bg-surfacePrimaryMedEm hover:bg-surfacePrimaryHighEm text-white rounded-[10px] text-[16px] font-semibold border-none shadow-sm"
              >
                Next
              </Button>
              <Button
                variant="link"
                onClick={handleCancel}
                className="w-full h-[48px] text-surfacePrimaryHighEm text-[16px] flex items-center justify-center"
              >
                Cancel transaction
              </Button>
            </div>
          </div>
        )}

        {screenState === "CONFIRMATION" && (
          <div className="w-full flex flex-col gap-[24px]">
            {/* Calculation Card */}
            <div className="flex justify-center w-full">
              <DiscountCalculationCard
                voucher={discountData.voucher}
                pointsSpent={discountData.pointsSpent}
                totalDiscount={discountData.totalDiscount}
                netPayable={discountData.netPayable}
                pointsToEarn={discountData.pointsToEarn}
              />
            </div>

            {/* Warning & Actions */}
            <div className="w-full flex flex-col gap-[16px]">
              <p className="text-[14px] font-normal text-destructive text-center italic">
                Please ensure payment is completed on POS first
              </p>

              <Button
                onClick={() => setShowTransactionDetails(true)}
                className="w-full h-[48px] bg-surfacePrimaryMedEm hover:bg-surfacePrimaryHighEm text-white rounded-xxl text-[16px] font-semibold"
              >
                Mark transaction as complete
              </Button>
              <Button
                variant="link"
                onClick={handleCancel}
                className="w-full h-[48px] text-surfacePrimaryMedEm text-[16px] flex items-center justify-center"
              >
                Cancel transaction
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* PIN Modal using shadcn/ui Dialog */}
      <PinEntryDialog
        open={showPinModal}
        onOpenChange={setShowPinModal}
        billValue={billValue}
        onBillValueChange={setBillValue}
        pin={pin}
        onPinChange={handlePinChange}
        onPinKeyDown={handlePinKeyDown}
        onSubmit={handlePinSubmit}
      />

      {/* Transaction Details Dialog */}
      <TransactionDetailsDialog
        open={showTransactionDetails}
        onOpenChange={setShowTransactionDetails}
        onEdit={() => setShowTransactionDetails(false)}
        onVoid={() => setShowTransactionDetails(false)}
      />
    </div>
  );
};
