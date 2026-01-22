import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Ticket,
  Loader2,
  AlertCircle,
  LogOut,
  Globe,
  ChevronDown,
  QrCode,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useBrandingStore } from "@/stores/brandingStore";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// bundle-barrel-imports: Direct imports instead of barrel

const identifySchema = z
  .object({
    email: z.string().email("Email không hợp lệ").or(z.literal("")),
    voucher: z.string().min(1, "Mã voucher không hợp lệ").or(z.literal("")),
  })
  .refine((data) => data.email || data.voucher, {
    message: "Vui lòng nhập email hoặc mã voucher",
    path: ["email"],
  });

type IdentifyFormValues = z.infer<typeof identifySchema>;

export const HomePage = memo(() => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { config } = useBrandingStore();
  // rerender-lazy-state-init: Use function for expensive initial values
  const [isSearching, setIsSearching] = useState(() => false);
  const [error, setError] = useState<string | null>(() => null);

  const form = useForm<IdentifyFormValues>({
    resolver: zodResolver(identifySchema),
    defaultValues: {
      email: "",
      voucher: "",
    },
  });

  const { watch, handleSubmit } = form;
  const emailVal = watch("email");
  const voucherVal = watch("voucher");

  const canSubmit = !!(emailVal || voucherVal);

  const onIdentify = async (values: IdentifyFormValues) => {
    setIsSearching(true);
    setError(null);
    try {
      const response = await api.get("/customers/identify", {
        params: {
          email: values.email || undefined,
          voucher: values.voucher || undefined,
        },
      });

      if (response.data) {
        navigate("/transactions/new", { state: { customer: response.data } });
      } else {
        setError("Không tìm thấy khách hàng. Vui lòng kiểm tra lại.");
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Không tìm thấy khách hàng. Vui lòng kiểm tra lại.");
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-full min-h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
        {/* Language Selector */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gray-2/20 bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer hover:bg-white/90 transition-colors">
          <Globe className="w-4 h-4 text-brand-gray-1" />
          <span className="text-sm font-semibold text-brand-dark">EN</span>
          <ChevronDown className="w-4 h-4 text-brand-gray-2" />
        </div>

        {/* Logo Center */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-sm border border-brand-gray-2/10">
            <img
              src={config.logo}
              alt="Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://ui-avatars.com/api/?name=T&background=574ADB&color=fff&rounded=true";
              }}
            />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
            Treubär
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-gray-2/20 bg-white/80 backdrop-blur-sm text-brand-gray-1 hover:text-brand-error hover:border-brand-error/20 transition-all shadow-sm"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center px-4 pt-2 sm:pt-6">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_4px_40px_rgba(0,0,0,0.04)] overflow-hidden">
            {/* Store Image - Tablet/Desktop only */}
            {config.storeImage && (
              <div className="hidden sm:block px-8 pt-8">
                <img
                  src={config.storeImage}
                  alt="Store"
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8 sm:p-10 space-y-6">
              {/* Header */}
              <div className="space-y-3 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-primary leading-tight">
                  {user?.storeName || config.storeName}
                </h2>
                <p className="text-brand-gray-1 text-base sm:text-lg max-w-lg mx-auto">
                  Can't scan the voucher or account QR code? Just enter the
                  details here to continue
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onIdentify)}
                className="space-y-6 max-w-md mx-auto"
              >
                <div className="space-y-5">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-brand-dark font-medium text-sm ml-1"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="Enter customer's email"
                      {...form.register("email")}
                      icon={<Mail className="w-5 h-5 text-brand-gray-2" />}
                      className="bg-white border-brand-gray-2/30 focus-visible:ring-brand-primary/20 focus-visible:border-brand-primary/40 h-14"
                    />
                  </div>

                  {/* Voucher Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="voucher"
                      className="text-brand-dark font-medium text-sm ml-1"
                    >
                      Voucher
                    </Label>
                    <Input
                      id="voucher"
                      placeholder="Enter voucher code"
                      {...form.register("voucher")}
                      icon={<Ticket className="w-5 h-5 text-brand-gray-2" />}
                      className="bg-white border-brand-gray-2/30 focus-visible:ring-brand-primary/20 focus-visible:border-brand-primary/40 h-14"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 p-4 text-sm text-brand-error bg-brand-error/10 rounded-2xl animate-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 text-base font-bold rounded-2xl"
                  disabled={!canSubmit || isSearching}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Next"
                  )}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-brand-gray-2/20" />
                  <span className="text-sm text-brand-gray-2 font-medium">
                    or
                  </span>
                  <div className="flex-1 h-px bg-brand-gray-2/20" />
                </div>

                {/* Scan QR Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/scan-voucher")}
                  className="w-full h-14 text-base font-bold rounded-2xl border-brand-primary-light text-brand-primary-light hover:bg-brand-primary-light/10"
                >
                  <QrCode className="mr-2 h-5 w-5" />
                  Scan QR Code
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

HomePage.displayName = 'HomePage';
