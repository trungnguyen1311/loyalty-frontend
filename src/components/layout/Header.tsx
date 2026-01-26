import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoSrc from "@/assets/images/logo.svg";

interface HeaderProps {
  containerClass?: string;
}

const LANGUAGES = [
  {
    code: "EN",
    value: "en",
    label: "English",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  {
    code: "DE",
    value: "de",
    label: "Deutsch",
    flag: "https://flagcdn.com/w40/de.png",
  },
];

export const Header = memo(({ containerClass }: HeaderProps) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { logout, isAuthenticated } = useAuthStore();

  const currentLang =
    LANGUAGES.find((l) => i18n.language.startsWith(l.value)) || LANGUAGES[0];

  const handleLanguageChange = (langValue: string) => {
    i18n.changeLanguage(langValue);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-[72px] flex items-center">
      <div
        className={cn(
          "flex items-center justify-between w-full h-full",
          containerClass,
        )}
      >
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-[6px] px-[6px] py-[10px] rounded-lg border border-black/[0.06] bg-white backdrop-blur-[12px] shadow-[0px_2px_1.5px_-0.5px_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50/80 transition-all outline-none group data-[state=open]:bg-gray-50/80">
              <div className="w-4 h-4 rounded-full overflow-hidden shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03)] shrink-0">
                <img
                  src={currentLang.flag}
                  alt={currentLang.code}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-[2px] px-1">
                <span className="text-[11px] font-medium text-brand-dark leading-none">
                  {currentLang.code}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-[#0A0C11] transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[120px] p-1 glass flex flex-col gap-1"
          >
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.value)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-md transition-colors",
                  currentLang.code === lang.code
                    ? "bg-brand-gray-3/50"
                    : "hover:bg-brand-gray-3/20",
                )}
              >
                <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-sm">
                  <img
                    src={lang.flag}
                    alt={lang.code}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-brand-dark">
                  {lang.label}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logo Center */}
        <div className="w-[168px] h-12">
          <img
            src={logoSrc}
            alt="Treubär Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Logout Button - Only show when authenticated */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center size-9 rounded-lg border border-black/[0.06] bg-white backdrop-blur-[12px] shadow-[0px_2px_1.5px_-0.5px_rgba(0,0,0,0.03)] hover:bg-gray-50/80 transition-all relative group"
            title="Logout"
          >
            <div className="w-4 h-4 text-[#0A0C11] shrink-0">
              <svg
                viewBox="0 0 16.5 16.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M10.75 12.9375C10.6887 14.4808 9.40259 15.7912 7.67971 15.749C7.27888 15.7392 6.78345 15.5995 5.79261 15.32C3.40802 14.6474 1.33797 13.517 0.841308 10.9846C0.750012 10.5191 0.750012 9.99533 0.750012 8.94772L0.750012 7.55229C0.750012 6.50468 0.750012 5.98088 0.841308 5.51539C1.33797 2.98305 3.40802 1.85264 5.79261 1.18003C6.78346 0.900544 7.27888 0.760802 7.67971 0.750996C9.40259 0.708848 10.6887 2.01923 10.75 3.56251"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M15.75 8.25001H6.58335M15.75 8.25001C15.75 7.66648 14.0881 6.57628 13.6667 6.16667M15.75 8.25001C15.75 8.83353 14.0881 9.92373 13.6667 10.3333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Inner shadow for premium feel as seen in Figma */}
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_3px_0px_rgba(255,255,255,0.03)]" />
          </button>
        ) : (
          <div className="size-9" />
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";
