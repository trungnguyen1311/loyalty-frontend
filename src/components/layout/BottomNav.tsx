import { memo } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

// Import SVG icons
import homeIcon from "@/assets/icons/home.svg";
import homeActiveIcon from "@/assets/icons/home_active.svg";
import transactionIcon from "@/assets/icons/transaction.svg";
import transactionActiveIcon from "@/assets/icons/transaction_active.svg";
import dashboardIcon from "@/assets/icons/dashboard.svg";
import dashboardActiveIcon from "@/assets/icons/dashboard_active.svg";

interface NavItem {
  path: string;
  label: string;
  icon: string;
  activeIcon: string;
}

const navItems: NavItem[] = [
  {
    path: "/home",
    label: "Home",
    icon: homeIcon,
    activeIcon: homeActiveIcon,
  },
  {
    path: "/transactions",
    label: "Transaction",
    icon: transactionIcon,
    activeIcon: transactionActiveIcon,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: dashboardIcon,
    activeIcon: dashboardActiveIcon,
  },
];

export const BottomNav = memo(() => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[22px] shadow-[0_-1px_24px_0_rgba(201,201,201,0.25)] safe-area-bottom z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-[75px] max-w-4xl mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-[5px] text-sm font-medium transition-all duration-200",
                isActive ? "text-[#574ADB]" : "text-[#8C929C]",
              )
            }
            aria-label={item.label}
          >
            {({ isActive }) => (
              <>
                <div className="relative w-6 h-6">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={cn(
                      "absolute inset-0 w-6 h-6 transition-opacity duration-200",
                      isActive ? "opacity-0" : "opacity-100",
                    )}
                  />
                  <img
                    src={item.activeIcon}
                    alt={`${item.label} active`}
                    className={cn(
                      "absolute inset-0 w-6 h-6 transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </div>
                <span className="leading-5">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
});

BottomNav.displayName = "BottomNav";
