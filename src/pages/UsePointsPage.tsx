import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  RotateCw,
  Home,
  Receipt,
  LayoutGrid,
  Diamond,
  Settings,
  CheckCircle,
} from "lucide-react";
import { useBrandingStore } from "@/stores/brandingStore";
import { Button } from "@/components/ui/button";

// Mock customer data
const mockCustomer = {
  id: "1",
  name: "Cameron Williamson",
  level: "Gold",
  points: 2500,
  avatar:
    "https://ui-avatars.com/api/?name=Cameron+Williamson&background=3B82F6&color=fff&size=200",
};

type ScreenState = "SLIDER" | "CONFIRMATION";

export const UsePointsPage = () => {
  const navigate = useNavigate();
  const { config } = useBrandingStore();
  // rerender-lazy-state-init: Use function for expensive initial values
  const [screenState, setScreenState] = useState<ScreenState>(() => "SLIDER");
  const [pointsToUse, setPointsToUse] = useState(() => 30);
  const [showPinModal, setShowPinModal] = useState(() => false);
  const [billValue, setBillValue] = useState(() => "");
  const [pin, setPin] = useState(() => ["", "", "", "", "", ""]);
  const [hasVoucher, setHasVoucher] = useState(() => true); // Toggle voucher visibility

  const mockVoucher = {
    name: "New Brand Opening",
    discount: "15%",
    code: "ABC-XYZ-123",
  };

  // Mock discount calculation
  const discountData = {
    voucher: hasVoucher ? 75 : 0, // Mock calculation: 15% of 500
    pointsSpent: 50,
    totalDiscount: (hasVoucher ? 75 : 0) + 50,
    netPayable: 450 - (hasVoucher ? 75 : 0),
    pointsToEarn: 4,
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointsToUse(parseInt(e.target.value));
  };

  const handleNextFromSlider = () => {
    setShowPinModal(true);
  };

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    // Auto-focus next input
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
    console.log("Bill:", billValue, "PIN:", pin.join(""));
    setShowPinModal(false);
    setScreenState("CONFIRMATION");
  };

  const handleComplete = () => {
    console.log("Transaction completed");
    navigate("/home");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const tickLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const sliderPercent = pointsToUse;

  return (
    <div className="min-h-screen min-h-dvh flex flex-col bg-gradient-to-br from-[#E8F4FD] via-[#F0EEFF] to-[#E8E4FF]">
      {/* Top Bar */}
      <header className="w-full px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between relative">
          {/* Language Selector */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm cursor-pointer hover:bg-white transition-colors z-10">
            <span className="text-lg">🇬🇧</span>
            <span className="text-sm font-semibold text-gray-800">EN</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Logo Center - Truly Centered in the container */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-1">
              <img
                src={
                  config.logo ||
                  "https://ui-avatars.com/api/?name=T&background=574ADB&color=fff&rounded=true"
                }
                alt="Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Treubär
            </span>
          </div>

          {/* Refresh Button */}
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-800 transition-all shadow-sm z-10">
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center px-6 pt-4 pb-24">
        <div className="w-full max-w-2xl">
          {/* Main White Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[16px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">
            {/* User Info Card */}
            <div className="bg-[#F7F7F9] rounded-2xl p-6 mb-6">
              {/* Avatar & Name */}
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={mockCustomer.avatar}
                    alt={mockCustomer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {mockCustomer.name}
                </h2>
              </div>

              {/* Level & Points Pill */}
              <div className="flex items-center justify-center bg-white rounded-full py-3 px-6 shadow-sm">
                <div className="flex items-center gap-2 pr-6 border-r border-gray-200">
                  <Diamond className="w-4 h-4 text-brand-primary fill-brand-primary" />
                  <span className="text-sm text-gray-500">Level</span>
                  <span className="text-sm font-bold text-amber-500">
                    {mockCustomer.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-6">
                  <Settings className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm text-gray-500">Points</span>
                  <span className="text-sm font-bold text-emerald-600">
                    {mockCustomer.points.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {hasVoucher && (
              <div className="max-w-[320px] relative mx-auto mb-8 flex bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {/* Left Side Label - Vertical Text */}
                <div className="bg-[#6F61FF] text-white w-12 flex items-center justify-center py-4 relative">
                  <span className="font-bold text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180">
                    VOUCHER
                  </span>
                  {/* Decorative Notch */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-white rounded-full" />
                </div>

                {/* Content Area */}
                <div className="flex-1 p-5 pl-8 text-left">
                  <p className="text-sm text-gray-400 font-medium mb-1">
                    {mockVoucher.name}
                  </p>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    Discount: {mockVoucher.discount}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-gray-50 rounded-lg text-xs font-mono font-bold text-[#574ADB]">
                    {mockVoucher.code}
                  </div>
                </div>
              </div>
            )}

            {screenState === "SLIDER" && (
              <>
                {/* Use Points Section */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-800 mb-4">
                    Use points
                  </label>

                  {/* Custom Slider */}
                  <div className="relative px-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      value={pointsToUse}
                      onChange={handleSliderChange}
                      className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(to right, #6F61FF 0%, #6F61FF " +
                          sliderPercent +
                          "%, #E5E7EB " +
                          sliderPercent +
                          "%, #E5E7EB 100%)",
                      }}
                    />

                    {/* Tick Labels */}
                    <div className="flex justify-between mt-3 px-0.5">
                      {tickLabels.map((tick) => (
                        <span
                          key={tick}
                          className="text-xs text-gray-400 font-medium"
                          style={{ width: "20px", textAlign: "center" }}
                        >
                          {tick}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleNextFromSlider}
                    size="default"
                    className="w-full"
                  >
                    Next
                  </Button>
                  <Button
                    variant="link"
                    onClick={handleCancel}
                    className="w-full font-semibold"
                  >
                    Cancel transaction
                  </Button>
                </div>
              </>
            )}

            {screenState === "CONFIRMATION" && (
              <>
                {/* Discount Calculator Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 relative">
                  {/* Success Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-emerald-500" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-center text-gray-900 mb-6">
                    Discount calculator
                  </h3>

                  {/* Breakdown Rows */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Voucher:</span>
                      <span className="font-semibold text-gray-900">
                        €{discountData.voucher}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-4">
                      <span className="text-gray-500">Points spent</span>
                      <span className="font-semibold text-gray-900">
                        €{discountData.pointsSpent}
                      </span>
                    </div>
                  </div>

                  {/* Total Discount */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-bold text-brand-primary">
                      Total discount
                    </span>
                    <span className="text-xl font-bold text-brand-primary">
                      €{discountData.totalDiscount}
                    </span>
                  </div>

                  {/* Footer Info */}
                  <div className="text-center mt-6 space-y-1">
                    <p className="text-sm text-gray-500 italic">
                      Net payable: €{discountData.netPayable}
                    </p>
                    <p className="text-xs font-semibold text-brand-primary">
                      +{discountData.pointsToEarn} points upon completion
                    </p>
                  </div>
                </div>

                {/* Warning & Actions */}
                <div className="text-center space-y-4">
                  <p className="text-sm font-semibold text-red-500 italic">
                    Please ensure payment is completed on POS first
                  </p>

                  <Button
                    onClick={handleComplete}
                    size="default"
                    className="w-full rounded-full"
                  >
                    Mark transaction as complete
                  </Button>
                  <Button
                    variant="link"
                    onClick={handleCancel}
                    className="w-full font-semibold"
                  >
                    Cancel transaction
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around py-3 max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 px-6 py-1 text-brand-primary">
            <Home className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-6 py-1 text-gray-400 hover:text-gray-600">
            <Receipt className="w-6 h-6" />
            <span className="text-xs font-medium">Transaction</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-6 py-1 text-gray-400 hover:text-gray-600">
            <LayoutGrid className="w-6 h-6" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
        </div>
      </nav>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative animate-in zoom-in-95 fade-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowPinModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <span className="text-2xl font-light">×</span>
            </button>

            {/* Title */}
            <h2 className="text-lg font-bold text-center text-gray-900 mb-8">
              Enter PIN to calculate discount
            </h2>

            {/* Bill Value Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-center text-gray-800 mb-3">
                Enter bill value
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="text-lg">💶</span>
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  value={billValue}
                  onChange={(e) => setBillValue(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 text-center text-lg font-semibold border-2 border-gray-200 rounded-2xl focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                />
              </div>
            </div>

            {/* PIN Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-center text-gray-800 mb-3">
                Enter your PIN
              </label>
              <div className="flex justify-between gap-2">
                {pin.map((digit, idx) => (
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
                    className="w-full aspect-square max-w-[52px] border-2 border-gray-200 rounded-xl text-center text-xl font-bold focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder:text-gray-300"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handlePinSubmit}
              size="default"
              className="w-full rounded-full"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// No displayName needed for regular function component
