import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock customer data
const mockCustomer = {
  id: "1",
  name: "Cameron Williamson",
  level: "Gold",
  points: 2500,
  avatar:
    "https://ui-avatars.com/api/?name=Cameron+Williamson&background=3B82F6&color=fff&size=200",
};

const imgAvatar =
  "http://localhost:3845/assets/ed778dea860b38fa78b747b6fa7461f8fbd4fbfc.png";

const imgCouponBg =
  "http://localhost:3845/assets/7052742d5c48a49f6236df75096d77127a2ff05e.svg";

const imgMoney =
  "http://localhost:3845/assets/dfe6771b44353c4265e8ff712aa12d7338b53147.svg";
const imgClose =
  "http://localhost:3845/assets/528447ab1c96744c3cae9563653a2250d97ed686.svg";

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
      fill-rule="evenodd"
      clip-rule="evenodd"
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

  const handleComplete = () => {
    navigate("/home");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const tickLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="mt-4 min-h-screen min-h-dvh flex">
      <div
        className="w-full bg-white rounded-[16px] shadow-sm overflow-hidden flex flex-col items-center p-[48px] gap-[24px]"
        data-node-id="33:1729"
      >
        {/* User Card Section */}
        <div
          className="w-full bg-brand-surface-s2 rounded-[12px] px-[16px] py-[14px] flex flex-col items-center justify-center gap-[14px]"
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
                src={imgAvatar}
                alt={mockCustomer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="text-brand-dark font-semibold text-[18px] leading-[24px]"
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
                <div className="text-brand-primary">
                  <DiamondIcon />
                </div>
                <span className="text-[16px] font-medium text-brand-gray-1 leading-[24px]">
                  Level
                </span>
              </div>
              <span className="text-[18px] font-semibold text-brand-warning leading-[24px]">
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
                <div className="text-brand-primary">
                  <PointsIcon />
                </div>
                <span className="text-[16px] font-medium text-brand-gray-1 leading-[24px]">
                  Points
                </span>
              </div>
              <span className="text-[18px] font-semibold text-brand-success leading-[24px]">
                {mockCustomer.points.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Voucher Section */}
        {hasVoucher && (
          <div
            className="w-full max-w-[316px] h-[118px] bg-white relative rounded-[16px] overflow-hidden shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_20px_20px_-12px_rgba(0,0,0,0.03)] flex"
            data-node-id="36:45"
          >
            {/* Left Side (Purple Section) */}
            <div
              className="w-[59px] h-full bg-brand-primary-med relative flex items-center justify-center shrink-0 z-10"
              data-node-id="36:48"
            >
              <span className="z-10 text-white text-[14px] font-semibold uppercase tracking-[0.1em] -rotate-90 whitespace-nowrap">
                VOUCHER
              </span>

              {/* Background SVG if available */}
              <div
                className="absolute inset-0 pointer-events-none opacity-50"
                data-node-id="36:46"
              >
                <img
                  src={imgCouponBg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

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
              className="flex-1 flex flex-col justify-center px-[24px] relative z-10 border-l border-brand-surface-s3"
              data-node-id="36:50"
            >
              <p className="text-[14px] text-brand-gray-1 font-normal leading-[20px] mb-[2px]">
                {mockVoucher.name}
              </p>
              <h3 className="text-[26px] font-bold text-brand-dark leading-[32px] tracking-[-0.02em]">
                Discount: {mockVoucher.discount}
              </h3>
              <p className="text-[16px] text-brand-dark font-normal leading-[24px] mt-[4px]">
                {mockVoucher.code}
              </p>
            </div>
          </div>
        )}

        {screenState === "SLIDER" && (
          <div className="w-full flex flex-col gap-[16px]">
            {/* Slider Section */}
            <div className="w-full">
              <label className="block text-[16px] font-medium text-brand-dark mb-[16px]">
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
                    className="text-[14px] text-brand-gray-2 font-normal"
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
                className="w-full h-[48px] bg-brand-primary-light hover:bg-brand-primary text-white rounded-[10px] text-[16px] font-semibold border-none shadow-sm"
              >
                Next
              </Button>
              <Button
                variant="link"
                onClick={handleCancel}
                className="w-full h-[48px] text-brand-primary text-[16px] flex items-center justify-center"
              >
                Cancel transaction
              </Button>
            </div>
          </div>
        )}

        {screenState === "CONFIRMATION" && (
          <div className="w-full flex flex-col gap-[24px]">
            {/* Calculation Card */}
            <div className="w-full bg-white rounded-[16px] border border-brand-surface-s3 p-[24px] flex flex-col items-center gap-[24px]">
              <div className="w-[48px] h-[48px] bg-brand-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-[28px] h-[28px] text-brand-success" />
              </div>

              <h3 className="text-[18px] font-bold text-brand-dark">
                Discount calculator
              </h3>

              <div className="w-full flex flex-col gap-[12px]">
                <div className="flex justify-between items-center text-[16px]">
                  <span className="text-brand-gray-1">Voucher:</span>
                  <span className="font-semibold text-brand-dark">
                    €{discountData.voucher}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[16px] border-b border-brand-surface-s2 pb-[12px]">
                  <span className="text-brand-gray-1">Points spent</span>
                  <span className="font-semibold text-brand-dark">
                    €{discountData.pointsSpent}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-[4px]">
                  <span className="text-[18px] font-bold text-brand-primary">
                    Total discount
                  </span>
                  <span className="text-[20px] font-bold text-brand-primary">
                    €{discountData.totalDiscount}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[14px] text-brand-gray-1 italic mb-[4px]">
                  Net payable: €{discountData.netPayable}
                </p>
                <p className="text-[12px] font-semibold text-brand-primary">
                  +{discountData.pointsToEarn} points upon completion
                </p>
              </div>
            </div>

            {/* Warning & Actions */}
            <div className="w-full flex flex-col gap-[16px]">
              <p className="text-[14px] font-normal text-brand-error text-center italic">
                Please ensure payment is completed on POS first
              </p>

              <Button
                onClick={handleComplete}
                className="w-full h-[48px] bg-brand-primary-light hover:bg-brand-primary text-white rounded-full text-[16px] font-semibold"
              >
                Mark transaction as complete
              </Button>
              <Button
                variant="link"
                onClick={handleCancel}
                className="w-full h-[48px] text-brand-primary-med text-[16px] flex items-center justify-center"
              >
                Cancel transaction
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* PIN Modal using shadcn/ui Dialog */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent
          className="max-w-[361px] h-[400px] p-0 bg-white/95 backdrop-blur-[24px] rounded-[24px] border-black/[0.03] shadow-[0px_32px_32px_-16px_rgba(0,0,0,0.08),0px_20px_20px_-12px_rgba(0,0,0,0.08)] overflow-hidden gap-0 [&>button]:hidden"
          data-node-id="39:625"
        >
          {/* Modal Header */}
          <DialogHeader
            className="h-[56px] flex flex-row items-center px-[20px] justify-between relative space-y-0"
            data-node-id="39:627"
          >
            <div className="flex-1" />
            <DialogTitle
              className="text-[16px] font-semibold text-brand-dark leading-[24px] text-center absolute left-1/2 -translate-x-1/2"
              data-node-id="39:631"
            >
              Enter PIN to calculate discount
            </DialogTitle>
            <button
              onClick={() => setShowPinModal(false)}
              className="w-[32px] h-[32px] flex items-center justify-center bg-brand-surface-s2 border border-brand-surface-s3 rounded-[8px] hover:bg-brand-gray-3 transition-colors z-10"
              data-node-id="39:632"
            >
              <img src={imgClose} alt="Close" className="w-[12px] h-[12px]" />
            </button>
          </DialogHeader>

          {/* Modal Content */}
          <div className="px-[20px] mt-[24px] flex flex-col">
            {/* Bill Value Input Group */}
            <div
              className="w-full h-[80px] flex flex-col gap-[12px]"
              data-node-id="39:671"
            >
              <label
                className="text-[14px] font-semibold text-brand-gray-1 text-center"
                data-node-id="39:673"
              >
                Enter bill value
              </label>
              <div
                className="relative w-full h-[48px] bg-white border border-brand-surface-s3 rounded-[12px] flex items-center px-[12px] transition-all focus-within:border-brand-primary"
                data-node-id="39:674"
              >
                <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                  <img src={imgMoney} alt="" className="w-full h-full" />
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  value={billValue}
                  onChange={(e) => setBillValue(e.target.value)}
                  className="flex-1 h-full text-center text-[16px] font-semibold text-brand-dark outline-none bg-transparent placeholder:text-brand-gray-2 pr-[20px]"
                />
              </div>
            </div>

            {/* PIN Input Group */}
            <div
              className="w-full h-[84px] flex flex-col gap-[12px] mt-[20px]"
              data-node-id="39:679"
            >
              <label
                className="text-[14px] font-semibold text-brand-gray-1 text-center"
                data-node-id="39:681"
              >
                Enter your PIN
              </label>
              <div
                className="flex justify-between gap-[8px]"
                data-node-id="39:682"
              >
                {pin.map((digit: string, idx: number) => (
                  <input
                    key={idx}
                    id={"pin-input-" + idx}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    placeholder="-"
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(idx, e)}
                    className="w-full h-[52px] max-w-[46.8px] bg-brand-surface-s2 border border-brand-surface-s3 rounded-[12px] text-center text-[18px] font-bold text-brand-dark focus:border-brand-primary outline-none transition-all placeholder:text-brand-gray-2"
                    data-node-id={"39:68" + (3 + idx)}
                  />
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="w-full mt-[68px]" data-node-id="39:653">
              <Button
                onClick={handlePinSubmit}
                className="w-full h-[40px] bg-brand-primary hover:bg-brand-primary/90 text-white rounded-[10px] text-[14px] font-bold flex items-center justify-center shadow-none border-none"
                data-node-id="39:654"
              >
                Next
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
