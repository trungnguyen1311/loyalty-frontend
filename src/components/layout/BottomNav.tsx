import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Home, Receipt, BarChart3 } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";

// bundle-barrel-imports: Direct imports instead of barrel

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  managerOnly?: boolean;
}

// rendering-hoist-jsx: Extract static JSX outside component
const navItems: NavItem[] = [
  {
    path: "/home",
    label: "Home",
    icon: <Home className="w-6 h-6" aria-hidden="true" />,
  },
  {
    path: "/transactions",
    label: "Transaction",
    icon: <Receipt className="w-6 h-6" aria-hidden="true" />,
    managerOnly: true,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <BarChart3 className="w-6 h-6" aria-hidden="true" />,
    managerOnly: true,
  },
];

export const BottomNav = memo(() => {
  const isManager = useAuthStore((state) => state.isManager());

  // Filter items based on role - hidden tabs, not disabled
  const visibleItems = navItems.filter((item) => {
    if (item.managerOnly && !isManager) {
      return false;
    }
    return true;
  });

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-brand-gray-2/10 safe-area-bottom z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-20 max-w-4xl mx-auto">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 text-[13px] font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-400",
                isActive
                  ? "text-brand-primary-light scale-105"
                  : "text-brand-gray-2 hover:text-brand-gray-1",
              )
            }
            aria-label={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
});

BottomNav.displayName = 'BottomNav';
