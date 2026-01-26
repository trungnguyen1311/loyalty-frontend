import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export const LoginPage = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [storeId, setStoreId] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [showPassword, setShowPassword] = useState(() => false);
  const [isLoading, setIsLoading] = useState(() => false);
  const [error, setError] = useState(() => "");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (!storeId) {
        setError(t("auth.errors.store_required"));
        return;
      }
      if (password.length < 6) {
        setError(t("auth.errors.password_min_length"));
        return;
      }

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      navigate("/home");
    },
    [storeId, password, navigate, t],
  );

  return (
    <div className="w-full flex items-center justify-center mt-8">
      {/* Main Content Card (node 23:858) */}
      <div className="min-h-[600px] w-full max-w-[830px] bg-white rounded-[16px] shadow-[0_4px_40px_rgba(0,0,0,0.04)] px-4 py-12 sm:px-[36px] sm:py-[35px] flex flex-col items-center">
        <div className="w-full max-w-[758px] flex flex-col items-center">
          {/* Headline (node 23:860) */}
          <div className="w-full h-[28px] flex items-center justify-center mb-[14px]">
            <h1 className="text-[#574ADB] text-[22px] font-semibold leading-[28px] tracking-[-0.2px] text-center">
              {t("auth.store_access")}
            </h1>
          </div>

          {/* Sub-Headline & Form Container (node 23:862) */}
          <div className="w-full flex flex-col items-center gap-[24px]">
            {/* Headline (node 23:863) */}
            <p className="w-full text-black text-[18px] font-normal leading-[24px] text-center">
              {t("auth.login_description")}
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col">
              {/* Fields Container (node 23:865) */}
              <div className="flex flex-col gap-[16px] mb-[24px]">
                {/* Store Select Field (node 23:866) */}
                <div className="flex flex-col gap-[4px] h-[72px]">
                  <Label
                    htmlFor="store"
                    className="text-[14px] font-medium text-[#5B616D] ml-[2px] leading-[20px]"
                  >
                    {t("auth.store")}
                  </Label>
                  <div className="relative">
                    <select
                      id="store"
                      value={storeId}
                      onChange={(e) => setStoreId(e.target.value)}
                      className="w-full h-[48px] px-[12px] pr-12 rounded-[12px] border border-[rgba(0,0,0,0.09)] bg-white text-[#1E293B] placeholder:text-[#8C929C] focus:outline-none focus:ring-2 focus:ring-[#6F61FF]/10 focus:border-[#6F61FF] appearance-none text-[16px] font-normal transition-all"
                      disabled={isLoading}
                    >
                      <option value="" className="text-[#8C929C]">
                        {t("auth.select_store")}
                      </option>
                      <option value="lepau">Lepau Restaurant Kuching</option>
                      <option value="store-2">Treubär Coffee Hub</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-[#8C929C]" />
                    </div>
                  </div>
                </div>

                {/* Password Input Field (node 23:867) */}
                <div className="flex flex-col gap-[4px] h-[72px]">
                  <Label
                    htmlFor="password"
                    className="text-[14px] font-medium text-[#5B616D] ml-[2px] leading-[20px]"
                  >
                    {t("auth.password")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("auth.enter_password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-[48px] px-[12px] rounded-[12px] border-[rgba(0,0,0,0.09)] focus-visible:ring-[#6F61FF]/10 focus-visible:border-[#6F61FF] pr-12 text-[16px] font-normal bg-white text-[#1E293B] placeholder:text-[#8C929C]"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C929C] hover:text-[#5B616D] transition-colors outline-none"
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

              {/* Error Message Section */}
              {error && (
                <p className="text-sm text-red-500 text-center font-medium mb-4 animate-in fade-in duration-300">
                  {error}
                </p>
              )}

              {/* Submit Button (node 23:868) */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[48px] bg-[#6F61FF] hover:bg-[#574ADB] text-white text-[16px] font-medium rounded-[12px] transition-all backdrop-blur-[12px] border border-[rgba(0,0,0,0.09)] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),inset_0px_3px_3px_0px_rgba(255,255,255,0.12)] active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("auth.logging_in")}
                  </>
                ) : (
                  t("auth.login_button")
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

LoginPage.displayName = "LoginPage";
