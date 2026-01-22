import { NavLink } from "react-router-dom";
import { Home, Receipt, BarChart3 } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  managerOnly?: boolean;
}

const navItems: NavItem[] = [
  {
    path: "/home",
    label: "Home",
    icon: <Home className="w-6 h-6" />,
  },
  {
    path: "/transactions",
    label: "Transaction",
    icon: <Receipt className="w-6 h-6" />,
    managerOnly: true,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <BarChart3 className="w-6 h-6" />,
    managerOnly: true,
  },
];

export function BottomNav() {
  const isManager = useAuthStore((state) => state.isManager());

  // Filter items based on role - hidden tabs, not disabled
  const visibleItems = navItems.filter((item) => {
    if (item.managerOnly && !isManager) {
      return false;
    }
    return true;
  });

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-brand-gray-2/10 safe-area-bottom z-50">
      <div className="flex items-center justify-around h-20 max-w-4xl mx-auto">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 text-[13px] font-bold transition-all duration-200",
                isActive
                  ? "text-brand-primary-light scale-105"
                  : "text-brand-gray-2 hover:text-brand-gray-1",
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
