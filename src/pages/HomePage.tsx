import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

export const HomePage = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center gap-[14px] rounded-[16px] bg-white100 p-[34px]">
      {/* Header Image */}
      <div className="h-[194px] w-[364px] overflow-hidden rounded-[16px]">
        <img
          src="/assets/home/restaurant.png"
          alt="Lepau Restaurant Kuching"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Title */}
      <div className="mt-6 flex flex-col items-center text-center">
        <h1 className="font-semibold text-surfacePrimaryHighEm text-[22px] leading-[28px] tracking-[-0.2px]">
          Lepau Restaurant Kuching
        </h1>
      </div>

      {/* Form Group (Description + Fields + Button) */}
      <div className="flex w-full flex-col gap-[24px]">
        {/* Description */}
        <p className="w-full text-center text-[18px] font-normal text-textHighEm leading-[24px]">
          {t("home.description")}
        </p>

        {/* Fields */}
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="px-[2px] text-sm font-medium text-textMedEm leading-5">
              {t("home.email")}
            </label>
            <Input
              type="email"
              placeholder={t("home.email_placeholder")}
              className="h-[48px] rounded-[12px] border-gray200 text-base placeholder:text-textLowEm"
              icon={
                <img
                  src="/assets/home/email-icon.svg"
                  alt="Email"
                  className="h-5 w-5"
                />
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="px-[2px] text-sm font-medium text-textMedEm leading-5">
              {t("home.voucher")}
            </label>
            <Input
              type="text"
              placeholder={t("home.voucher_placeholder")}
              className="h-[48px] rounded-[12px] border-gray200 text-base placeholder:text-textLowEm"
              icon={
                <img
                  src="/assets/home/voucher-icon.svg"
                  alt="Voucher"
                  className="h-5 w-5"
                />
              }
            />
          </div>
        </div>

        <Button
          className="h-[48px] w-full rounded-[12px] bg-surfacePrimaryMedEm text-base font-medium shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03)] backdrop-blur-[12px] hover:opacity-90 transition-opacity"
          size="lg"
          onClick={() => navigate("/next-step")}
        >
          {t("home.next")}
        </Button>
      </div>
    </div>
  );
});

HomePage.displayName = "HomePage";
