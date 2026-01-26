import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, AlertCircle, Loader2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

// bundle-barrel-imports: Direct imports instead of barrel

// Mock customer data for testing
const MOCK_CUSTOMER = {
  id: "cust-001",
  name: "Cameron Williamson",
  email: "cameron.w@example.com",
  level: "Gold",
  points: 2500,
  avatar:
    "https://ui-avatars.com/api/?name=Cameron+Williamson&background=574ADB&color=fff",
};

const MOCK_VOUCHER = {
  code: "ABC-XYZ-123",
  name: "New Brand Opening",
  discount: "15%",
  value: 100,
};

export const ScanVoucherPage = memo(() => {
  const navigate = useNavigate();
  // rerender-lazy-state-init: Use function for expensive initial values
  const [isProcessing, setIsProcessing] = useState(() => false);
  const [error, setError] = useState<string | null>(() => null);
  const [useMockMode] = useState(() => true); // Toggle for mock mode

  // rerender-defer-reads: Extract event handlers to useCallback
  const handleMockScan = useCallback(async () => {
    setIsProcessing(true);
    setError(null);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Navigate to Transaction Configuration with mock data
    navigate("/transactions/new", {
      state: {
        customer: MOCK_CUSTOMER,
        voucher: MOCK_VOUCHER,
        voucherCode: MOCK_VOUCHER.code,
      },
    });
  }, [navigate]);

  const handleBack = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsProcessing(false);
  }, []);

  return (
    <div className="fixed inset-0 bg-brand-dark z-50 flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/50 to-transparent">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <h1 className="text-white font-semibold text-lg">Scan Voucher QR</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        {/* Mock Camera Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-surface to-brand-dark" />

        {/* Scan Overlay */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Scan Frame */}
          <div className="relative w-[240px] h-[240px] mb-8">
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-primary-light rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-primary-light rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-primary-light rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-primary-light rounded-br-lg" />

            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <QrCode className="w-20 h-20 text-white/30" />
            </div>

            {/* Scanning Animation Line */}
            {!isProcessing && (
              <div className="absolute left-2 right-2 h-0.5 bg-brand-primary-light animate-scan-line" />
            )}
          </div>

          {/* Mock Mode Banner */}
          {useMockMode && (
            <div className="bg-brand-warning/20 backdrop-blur-sm rounded-xl px-4 py-2 mb-4">
              <p className="text-brand-warning text-sm font-medium">
                🧪 Mock Mode - Camera Disabled
              </p>
            </div>
          )}

          {/* Processing Overlay */}
          {isProcessing && (
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 text-brand-primary-light animate-spin mb-4" />
              <p className="text-white font-medium">Đang xử lý...</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/80 to-transparent">
        {error ? (
          <div className="bg-brand-error/20 backdrop-blur-sm rounded-2xl p-4 mb-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-brand-error shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-white font-medium">{error}</p>
              <button
                onClick={handleRetry}
                className="text-brand-primary-light text-sm font-medium mt-2 hover:underline"
              >
                Thử lại
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <p className="text-white font-medium mb-1">
                Đưa mã QR vào khung hình
              </p>
              <p className="text-white/70 text-sm">
                Quét mã QR trên voucher của khách hàng
              </p>
            </div>

            {/* Mock Scan Button */}
            {useMockMode && !isProcessing && (
              <Button
                onClick={handleMockScan}
                className="w-full h-14 text-base font-bold rounded-2xl"
              >
                <Camera className="mr-2 h-5 w-5" />
                Simulate Scan (Test)
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
});

ScanVoucherPage.displayName = 'ScanVoucherPage';
