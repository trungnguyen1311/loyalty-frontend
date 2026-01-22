import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronDown, Globe, Loader2 } from "lucide-react";
import { useBrandingStore } from "@/stores/brandingStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginPage = memo(() => {
  const navigate = useNavigate();
  const { config } = useBrandingStore();
  // rerender-lazy-state-init: Use function for expensive initial values
  const [storeId, setStoreId] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [showPassword, setShowPassword] = useState(() => false);
  const [isLoading, setIsLoading] = useState(() => false);
  const [error, setError] = useState(() => "");

  // rerender-defer-reads: Extract event handlers to useCallback
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!storeId) {
      setError("Vui lòng chọn cửa hàng");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate("/home");
  }, [storeId, password, navigate]);

  return (
    <div className="min-h-screen min-h-dvh flex flex-col bg-white relative overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-blur-info rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] translate-x-1/2 -translate-y-1/2 bg-blur-primary rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 sm:px-12 sm:py-6">
        {/* Language Selector */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gray-2/20 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none transition-colors"
          aria-label="Select language"
        >
          <Globe className="w-4 h-4 text-brand-gray-1" aria-hidden="true" />
          <span className="text-sm font-semibold text-brand-dark">EN</span>
          <ChevronDown className="w-4 h-4 text-brand-gray-2" aria-hidden="true" />
        </button>

        {/* Logo Center */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-sm border border-brand-gray-2/10">
            <img
              src={config.logo}
              alt="Store logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://ui-avatars.com/api/?name=T&background=574ADB&color=fff&rounded=true";
              }}
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-brand-dark">POS System</h1>
            <p className="text-xs sm:text-sm text-brand-gray-2">Point of Sale</p>
          </div>
        </div>

        <div className="w-20" />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center px-4 pt-8 sm:pt-16 pb-24 relative z-10">
        <div className="w-full max-w-xl">
          {/* Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_4px_40px_rgba(0,0,0,0.04)] p-8 sm:p-12 space-y-8">
            {/* Header */}
            <div className="space-y-3 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary">
                Store Access
              </h1>
              <p className="text-brand-gray-1 text-base sm:text-lg">
                Please login to your store to start rewarding your loyal
                customers
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                {/* Store Select */}
                <div className="space-y-2">
                  <Label
                    htmlFor="store"
                    className="text-brand-dark font-medium text-sm ml-1"
                  >
                    Store
                  </Label>
                  <div className="relative">
                    <select
                      id="store"
                      value={storeId}
                      onChange={(e) => setStoreId(e.target.value)}
                      className="w-full h-14 pl-4 pr-12 rounded-2xl border border-brand-gray-2/30 bg-white text-brand-dark placeholder:text-brand-gray-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/40 appearance-none text-base transition-all"
                      disabled={isLoading}
                    >
                      <option value="" className="text-brand-gray-2">
                        Select store
                      </option>
                      <option value="lepau">Lepau Restaurant Kuching</option>
                      <option value="store-2">Treubär Coffee Hub</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-2 pointer-events-none" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-brand-dark font-medium text-sm ml-1"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white border-brand-gray-2/30 focus-visible:ring-brand-primary/20 focus-visible:border-brand-primary/40 h-14 pr-12"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray-2 hover:text-brand-gray-1 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-brand-error text-center font-medium animate-in fade-in duration-300">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-base font-bold rounded-2xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login Store"
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
});

LoginPage.displayName = 'LoginPage';
